"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { CONDITION_OPTIONS } from "@/lib/constants";
import { logAdminAction } from "@/lib/data/admin-logs";
import type { Category, ProductWithImages, ProductCondition } from "@/lib/supabase/types";
import type { ProductStatus } from "@/lib/constants";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

interface ProductFormProps {
  product?: ProductWithImages;
  categories: Category[];
}

type ImageItem = {
  id?: string;      // existing DB row id
  url?: string;     // existing stored URL
  file?: File;      // new file to upload
  preview: string;  // for display
};

const STATUS_OPTIONS = [
  { value: "available", label: "Disponível" },
  { value: "reserved", label: "Reservado" },
  { value: "sold", label: "Vendido" },
];

const MAX_IMAGES = 6;

function getStoragePath(url: string): string {
  const marker = "/object/public/products/";
  const idx = url.indexOf(marker);
  return idx !== -1 ? url.slice(idx + marker.length) : "";
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!product;

  const existingCategory = product
    ? categories.find((c) => c.id === product.category_id)
    : null;

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? (product.price / 100).toFixed(2) : "");
  const [categoryInput, setCategoryInput] = useState(existingCategory?.name ?? "");
  const [status, setStatus] = useState<string>(product?.status ?? "available");
  const [size, setSize] = useState(product?.size ?? "");
  const [condition, setCondition] = useState(product?.condition ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [images, setImages] = useState<ImageItem[]>(
    product?.product_images
      .slice()
      .sort((a, b) => a.display_order - b.display_order)
      .map((img) => ({ id: img.id, url: img.url, preview: img.url })) ?? []
  );
  const [removedIds, setRemovedIds] = useState<string[]>([]);

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const available = MAX_IMAGES - images.length;
    const toAdd = files.slice(0, available);

    const invalid = toAdd.find((f) => !f.type.startsWith("image/") || f.size > 5 * 1024 * 1024);
    if (invalid) {
      setError("Apenas imagens até 5MB.");
      return;
    }

    setImages((prev) => [
      ...prev,
      ...toAdd.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    ]);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(index: number) {
    const img = images[index];
    if (img.id) setRemovedIds((prev) => [...prev, img.id!]);
    if (img.preview.startsWith("blob:")) URL.revokeObjectURL(img.preview);
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadFile(file: File): Promise<string> {
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (uploadError) throw new Error("Erro ao enviar imagem.");

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Nome é obrigatório."); return; }
    if (!price || Number(price) <= 0) { setError("Preço inválido."); return; }
    if (!categoryInput.trim()) { setError("Informe a categoria."); return; }

    setSaving(true);
    const supabase = createClient();

    try {
      // Resolve ou cria categoria
      const trimmedCat = categoryInput.trim();
      const existing = categories.find(
        (c) => c.name.toLowerCase() === trimmedCat.toLowerCase()
      );
      let categoryId: string;
      if (existing) {
        categoryId = existing.id;
      } else {
        const slug = slugify(trimmedCat);
        const { data: newCat, error: catError } = await supabase
          .from("categories")
          .insert({ name: trimmedCat, slug })
          .select("id")
          .single();
        if (catError || !newCat) throw new Error("Erro ao criar categoria.");
        categoryId = newCat.id;
      }

      // Upload new files
      const uploadedImages: ImageItem[] = [];
      for (const img of images) {
        if (img.file) {
          const url = await uploadFile(img.file);
          uploadedImages.push({ url, preview: img.preview });
        } else {
          uploadedImages.push(img);
        }
      }

      const productData = {
        name: name.trim(),
        description: description.trim() || null,
        price: Math.round(Number(price) * 100),
        category_id: categoryId,
        status: status as ProductStatus,
        size: size.trim() || null,
        condition: (condition as ProductCondition) || null,
        updated_at: new Date().toISOString(),
      };

      if (isEdit && product) {
        const { error: updateError } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);

        if (updateError) throw new Error("Erro ao atualizar produto.");

        await logAdminAction({
          action: "update_product",
          entity_type: "product",
          entity_id: product.id,
          entity_name: productData.name,
        });

        // Delete removed images
        if (removedIds.length > 0) {
          // Delete storage files (best-effort)
          const removedImgs = product.product_images.filter((img) => removedIds.includes(img.id));
          const storagePaths = removedImgs.map((img) => getStoragePath(img.url)).filter(Boolean);
          if (storagePaths.length > 0) {
            await supabase.storage.from("products").remove(storagePaths);
          }

          await supabase.from("product_images").delete().in("id", removedIds);
        }

        // Insert new images
        const newImages = uploadedImages.filter((img) => !img.id);
        const existingCount = uploadedImages.filter((img) => img.id).length;
        if (newImages.length > 0) {
          await supabase.from("product_images").insert(
            newImages.map((img, i) => ({
              product_id: product.id,
              url: img.url!,
              display_order: existingCount + i,
            }))
          );
        }
      } else {
        const { data: newProduct, error: insertError } = await supabase
          .from("products")
          .insert(productData)
          .select("id")
          .single();

        if (insertError || !newProduct) throw new Error("Erro ao cadastrar produto.");

        if (uploadedImages.length > 0) {
          await supabase.from("product_images").insert(
            uploadedImages.map((img, i) => ({
              product_id: newProduct.id,
              url: img.url!,
              display_order: i,
            }))
          );
        }

        await logAdminAction({
          action: "create_product",
          entity_type: "product",
          entity_id: newProduct.id,
          entity_name: productData.name,
        });
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Fotos */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Fotos {images.length > 0 && <span className="text-muted-foreground font-normal">({images.length}/{MAX_IMAGES})</span>}
        </label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          className="hidden"
        />

        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative h-20 w-20 overflow-hidden rounded-xl bg-muted shrink-0">
              <Image
                src={img.preview}
                alt={`Foto ${i + 1}`}
                fill
                className="object-cover"
                unoptimized={img.preview.startsWith("blob:")}
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 rounded-full bg-foreground/60 p-0.5 text-white hover:bg-foreground/80"
              >
                <X className="h-3 w-3" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 rounded bg-foreground/60 px-1 text-[9px] text-white">
                  Capa
                </span>
              )}
            </div>
          ))}

          {images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-card text-muted-foreground hover:border-rosa/30 hover:text-rosa transition-colors"
            >
              <Camera className="h-6 w-6" />
              <span className="text-[10px]">Adicionar</span>
            </button>
          )}
        </div>
      </div>

      <Input
        id="name"
        label="Nome da peça"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex: Vestido floral vintage"
        required
      />

      <Input
        id="price"
        label="Preço (R$)"
        type="number"
        step="0.01"
        min="0"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="49.90"
        required
      />

      {/* Campo de categoria livre com autocomplete */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className="text-sm font-medium text-foreground">
          Categoria
        </label>
        <input
          id="category"
          list="category-list"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          placeholder="Ex: Vestidos, Blusas, Bolsas..."
          autoComplete="off"
          className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-rosa"
        />
        <datalist id="category-list">
          {categories.map((c) => (
            <option key={c.id} value={c.name} />
          ))}
        </datalist>
        {categoryInput.trim() &&
          !categories.some(
            (c) => c.name.toLowerCase() === categoryInput.trim().toLowerCase()
          ) && (
            <p className="text-[11px] text-verde-agua font-medium">
              ✦ Nova categoria &quot;{categoryInput.trim()}&quot; será criada
            </p>
          )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          id="size"
          label="Tamanho"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="P, M, G, 38..."
        />

        <Select
          id="condition"
          label="Condição"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          options={CONDITION_OPTIONS}
          placeholder="Selecione..."
        />
      </div>

      <Textarea
        id="description"
        label="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Detalhes sobre a peça..."
      />

      {isEdit && (
        <Select
          id="status"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={STATUS_OPTIONS}
        />
      )}

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}

      <Button type="submit" disabled={saving} className="mt-2">
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Salvando...
          </>
        ) : isEdit ? (
          "Salvar alterações"
        ) : (
          "Cadastrar produto"
        )}
      </Button>
    </form>
  );
}
