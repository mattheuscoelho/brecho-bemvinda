# Handoff: Brechó Bemvinda Poesia e Cia.

## Visão Geral

Sistema completo para um brechó físico com presença digital. O produto é composto por duas experiências distintas:

1. **Vitrine Pública** (`Catálogo Interativo.html`) — catálogo navegável para clientes, responsivo desktop/mobile
2. **Painel Admin** (`Painel Admin.html`) — área restrita para a dona gerenciar o acervo e configurações da loja

---

## Sobre os Arquivos de Design

Os arquivos `.html` neste pacote são **protótipos de referência de design** — criados para validar visual, fluxo e interações. **Não devem ser copiados diretamente para produção.**

A tarefa do desenvolvedor é **recriar estas interfaces no ambiente de produção escolhido** (recomendado: **Next.js 14 + Supabase + Tailwind CSS**), usando os valores de design documentados abaixo como fonte da verdade.

---

## Fidelidade

**Alta fidelidade (hifi).** Os protótipos são pixel-perfect em cores, tipografia, espaçamento e microinterações. O desenvolvedor deve recriar fielmente usando as libs do projeto.

---

## Design Tokens

### Cores
```
--rosa-claro:  #F2B8B0   (blob decorativo, fundo de categoria)
--salmao:      #E8967A   (acento quente, hero mobile)
--verde-agua:  #7DC4B8   (categorias, seção Sobre, detalhes)
--verde-folha: #A8C89A   (flores decorativas)
--bege:        #FAF0E8   (background principal)
--rosa-medio:  #E87A8C   (cor primária — botões, preços, script)
--escuro:      #2A1A16   (textos, header admin, footer)
```

### Tipografia
```
--script:  'Great Vibes', cursive         (nome da loja, preços, títulos poéticos)
--serif:   'Playfair Display', serif      (títulos, nomes de produto, eyebrows)
--sans:    'Nunito', sans-serif           (corpo, labels, botões, filtros)
```
Google Fonts — importar com pesos: Great Vibes 400; Playfair Display 400/600 + italic; Nunito 300/400/600/700.

### Espaçamento (desktop)
- Padding lateral pages: 56px
- Gap entre cards: 1px (grid editorial) / 20px (grid clássico)
- Padding card body: 14px 16px 18px

### Border radius
```
Cards produto:     0px (editorial) / 12px (mobile)
Botões primários:  26px (pill)
Filtros:           20px
Cards admin:       16px
Drawers/modals:    24px 24px 0 0 (bottom sheet) / 24px (desktop centrado)
```

### Sombras
```
Card hover:     0 8px 32px rgba(140,60,50,0.14)
Botão primário: 0 4px 16px rgba(232,122,140,0.3)
Admin card:     0 2px 10px rgba(180,100,80,0.07)
```

### Easing
```
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)   (hover com overshoot)
--ease-out:    cubic-bezier(0.22, 1, 0.36, 1)       (entradas suaves)
```

---

## Tela 1 — Vitrine Pública

### Layout Responsivo
- **Desktop (≥768px):** Layout editorial B (nav + hero grande + filtros + grid 4 colunas)
- **Mobile (<768px):** Layout C (hero card arredondado + grid 2 colunas + filtros scroll horizontal)

### Componentes

#### NAV (sticky, top: 0, z-index: 100)
- Background: `#fff8f4`, border-bottom: `1px solid #f0e4dc`, backdrop-filter: blur(8px)
- Padding: 18px 56px (desktop) / 12px 20px (mobile)
- Estrutura: `[link] [wordmark centralizado] [link]`
- **Wordmark:** 3 linhas centradas:
  1. "Brechó" — Playfair Display 10px, letter-spacing 2.5px, uppercase, `#b08880`
  2. "Bemvinda Poesia" — Great Vibes 32px, `#E87A8C`, line-height 0.9
  3. "& Cia." — Playfair Display italic 10px, letter-spacing 3px, `#b08880`
- **Links de nav:** Playfair Display 13px, `#b08880`, letter-spacing 2px, uppercase. Hover: cor `#E87A8C` + sublinhado deslizante (transition width 0.3s)
- Mobile: links ocultos

#### HERO (desktop)
- Background: `var(--bege)`, min-height: 420px, padding: 60px 56px
- Blobs decorativos (position absolute, pointer-events none):
  - Rosa claro 400×320px, top:-120px, left:-100px, opacity 0.42
  - Verde-água 300×240px, bottom:-80px, right:-60px, opacity 0.28
  - Salmão 220×180px, top:-30px, right:180px, opacity 0.2
- 4 flores SVG animadas (animation: float 6-8s ease-in-out infinite)
- 4 sparkles SVG (animation: twinkle 2-3s ease-in-out infinite)
- **Conteúdo centralizado (max-width 560px):**
  - Eyebrow: Playfair italic 13px, `#b08880`, letter-spacing 3px — "primavera · 2026"
  - H1: Playfair 68px, `#2A1A16`, line-height 0.95 — "Peças únicas"
  - Script: Great Vibes 56px, `#E87A8C` — "com história"
  - Subtítulo: Nunito 14px, `#8a6a60`, line-height 1.7
  - 2 botões: primário (rosa) + ghost (branco com borda rosa)

#### HERO CARD (mobile only)
- Margin: 0 14px, border-radius: 16px
- Background: `linear-gradient(135deg, #F2B8B0, #E8967A)`
- Padding: 24px 20px, overflow hidden
- Flor SVG decorativa (top:-8px, right:8px, opacity 0.45)
- Script branco "Peças únicas\nesperando por você"
- Info texto: 11px, `#6a2a24`
- Botão branco com texto rosa: "💬 Falar no WhatsApp"

#### FILTROS
- Background: `var(--rosa-claro)`, padding: 14px 56px (desktop) / 12px 16px scroll horizontal (mobile)
- Pills: padding 6px 18px, border-radius 20px, borda 1.5px
- Estado ativo: background `#E87A8C`, cor branco, box-shadow `0 3px 10px rgba(232,122,140,0.35)`
- Hover: scale(1.05), borda rosa
- Click: efeito ripple (span animado dentro do pill)
- **REGRA:** só mostrar categorias com ≥1 produto não vendido. "Todos" sempre visível.
- Filtros gerados dinamicamente via JS (não hardcoded no HTML)

#### GRID DE PRODUTOS
- Desktop: 4 colunas, gap: 1px, background separador: `#ddd0c8`
- Mobile: 2 colunas, gap: 10px, padding: 0 14px
- Animação ao filtrar: fade opacity 0→1 + translateY(8px→0) em 180ms

**Card produto:**
- Hover desktop: scale(1.015) + shadow + zoom foto (scale 1.04) + revelar botão "Perguntar pelo WhatsApp" (slide de baixo)
- Hover mobile: translateY(-4px)
- Overlay de vendido: backdrop-blur(2px), texto "vendido" em Playfair italic
- Badge vendido (desktop): canto superior direito, background rgba(42,26,22,0.72)
- Corpo do card: categoria (verde-água 10px uppercase), nome (Playfair 15px), preço (Great Vibes 24px rosa)

#### SOBRE
- Background: `var(--verde-agua)`, padding: 56px, flex row (desktop) / coluna (mobile), text-align center
- Título: Great Vibes 42px, branco
- Texto: Nunito 14px, `#1a4a44`, max-width 520px
- 3 stats: número Playfair 32px branco + label 11px. Hover: scale(1.15) no número
- Divisores verticais: 1px, rgba(255,255,255,0.3)

#### FOOTER
- Background: `#2A1A16`, padding: 32px 56px
- Flex coluna, align-items center, text-align center
- "Brechó" Playfair 12px uppercase `#b08880`
- "Bemvinda Poesia" Great Vibes 30px `#F2B8B0`
- "& Cia." Playfair italic 12px `#b08880`
- Endereço + horário: Nunito 12px `#b08880`
- Badges de pagamento: background rgba(255,255,255,0.08), borda rgba(255,255,255,0.12), hover: translateY(-2px)

#### WHATSAPP FAB
- Position fixed, bottom: 28px, right: 28px (desktop) / 20px 20px (mobile)
- 56px × 56px, border-radius 50%, background: `#25D366`
- Animation: bob (translateY 0→-4px, 3s loop)
- Pseudo-elemento ::before: pulse-ring animation (scale 1→1.7, opacity 0.6→0, 2s loop)
- Hover: scale(1.15), shadow maior, para animação bob

#### SCROLL REVEAL
- Seções com classe `.reveal` — ganham `.animate-in` via JS (opacity 0, translateY 20px)
- IntersectionObserver threshold 0.12 adiciona `.visible` (opacity 1, translateY 0, transition 0.6s)

---

## Tela 2 — Painel Admin

### Auth (protótipo)
- Login simples com usuário/senha
- No produto real: Supabase Auth (magic link ou email+senha)
- Credenciais de teste: `bemvinda` / `1234`

### Layout
- Fundo: `#f5ede8`
- Max-width dos drawers/sheets: 480px, centrado

### TOP BAR (sticky)
- Background: `#2A1A16`, padding: 14px 20px
- Wordmark centralizado (mesma hierarquia da vitrine mas menor)
- Botões à direita (position absolute, right: 20px, gap: 8px):
  1. **Olho (👁)** — link para vitrine em nova aba. SVG path olho, stroke `#d4a898`
  2. **Engrenagem (⚙)** — toggle config view. SVG gear, stroke `#d4a898`. Ativo: background `#E87A8C`
  3. **"Sair"** — botão logout, background rgba(255,255,255,0.08), hover rgba(255,255,255,0.15)

### CARDS DE RESUMO
- Grid 3 colunas, gap: 10px, padding: 16px
- Fundo branco, border-radius: 14px, shadow suave
- Número: Playfair 28px — total: `#E87A8C`, disponíveis: `#7DC4B8`, vendidas: `#E8967A`
- Label: Nunito 11px, `#b08880`
- Animação de entrada: slide-up (0.4s, delay escalonado 0/60/120ms)

### SECTION HEADER
- "Acervo" Playfair 18px + botão "＋ Nova peça" (rosa, pill, shadow)
- Botão hover: scale(1.05), shadow maior

### FILTROS (tabs)
- Scroll horizontal, sem scrollbar visível
- Mesma lógica da vitrine: só categorias com produtos
- Fundo branco, ativo: rosa

### LISTA DE PRODUTOS (admin cards)
- Flex row, altura compacta
- Imagem: 72px largura, aspect-ratio auto (ou placeholder listrado)
- Corpo: categoria (verde-água 9px), nome (Playfair 14px, truncate), preço (Great Vibes 18px)
- Chip "Vendida": fundo `#f0e4dc`, cor `#8a6a60`, inline com o nome
- Ações (2 botões empilhados, borda esquerda):
  - ✅ / ↩️ — marcar vendida / desfazer. Hover: fundo verde-água claro
  - 🗑️ — excluir. Hover: fundo rosa claro. Abre sheet de confirmação

### FAB ＋
- Position fixed, bottom: 28px, right: 24px
- 58px × 58px, rosa, hover: scale(1.12) + rotate(90deg)

### DRAWER CADASTRO (bottom sheet)
- Abre com transform translateY(100%) → 0, easing spring
- Handle decorativo (36×4px, `#ddd0c8`, auto margin)
- Título: Great Vibes 30px rosa
- Campos: foto (drop zone com dashed border), nome, preço (prefixo "R$" separado), categoria (datalist com categorias existentes)
- Hint de nova categoria: "✦ Nova categoria 'X' será criada" em verde-água 11px
- Botão submeter: rosa, border-radius 14px, hover: translateY(-2px)
- Ao submeter: produto vai para o topo da lista, categoria aparece nos filtros, drawer fecha

### SHEET CONFIRMAÇÃO DE EXCLUSÃO
- Mesmo padrão de bottom sheet, max-width 480px centrado
- "Excluir esta peça?" Playfair 18px + subtítulo com nome da peça
- Botão confirmar: vermelho `#e05060`
- Botão cancelar: bege

### TOAST DE FEEDBACK
- Position fixed, bottom: 100px, centrado horizontalmente
- Background: `#2A1A16`, branco, border-radius 20px
- Aparece em 0.3s, some após 2.2s
- Mensagens: "Peça excluída 🗑️", "X marcada como vendida ✅", "X adicionada! 🌸"

### VIEW CONFIGURAÇÕES
- Oculto por padrão, ativado pelo ícone engrenagem
- Título: Great Vibes 38px rosa, centralizado
- Formulário centralizado max-width 440px com campos:
  - Texto da página Sobre (textarea, 4 linhas)
  - Endereço
  - Horário de funcionamento
  - Formas de pagamento
  - WhatsApp (com código do país, inputmode numeric)
  - Instagram
- Ao salvar: mensagem "✦ Configurações salvas!" em Playfair italic verde-água, volta para Acervo após 1.8s

### EMPTY STATE
- Ícone 🌸 36px + texto Playfair italic "Nenhuma peça nessa categoria ainda"
- Cor `#c4a898`

---

## Interações e Animações

| Elemento | Trigger | Efeito |
|---|---|---|
| Cards de produto | hover | scale(1.015) + shadow + zoom foto + revelar botão |
| Filtros | click | ripple + troca suave do grid |
| Botões primários | hover | translateY(-2px) + shadow maior |
| Botões primários | active | scale(0.97) |
| WhatsApp FAB | idle | bob 3s loop |
| WhatsApp FAB | hover | scale(1.15), para bob |
| Engrenagem | click | rotate + background rosa |
| FAB ＋ admin | hover | scale(1.12) rotate(90deg) |
| Stats "sobre" | hover | scale(1.15) no número |
| Nav links | hover | cor rosa + sublinhado width 0→100% |
| Flores | idle | float 6-8s loop assíncrono |
| Sparkles | idle | twinkle 2-3s loop assíncrono |
| Seções | scroll-into-view | fade-up 0.6s |

---

## Fluxo de Dados (Backend sugerido)

### Supabase — tabelas recomendadas

```sql
-- Produtos
CREATE TABLE products (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  price       numeric NOT NULL,
  category    text NOT NULL,
  sold        boolean DEFAULT false,
  image_url   text,
  created_at  timestamptz DEFAULT now()
);

-- Configurações da loja
CREATE TABLE store_config (
  id          int PRIMARY KEY DEFAULT 1,
  about_text  text,
  address     text,
  hours       text,
  payment     text,
  whatsapp    text,
  instagram   text,
  updated_at  timestamptz DEFAULT now()
);
```

### Storage
- Bucket `product-images` (público) para upload de fotos

### Auth
- Supabase Auth com email/senha
- RLS: vitrine pública lê produtos (sem auth); admin escreve (requer auth)

---

## Estado da Aplicação

### Vitrine (client-only ou SSR)
```
products[]          — lista de produtos (fetch do Supabase)
currentCategory     — filtro ativo (default: 'Todos')
availableCategories — derivado: categorias com ≥1 produto não vendido
storeConfig         — dados da loja (about, endereço, horário)
```

### Admin
```
products[]          — mesmo array, com mutações locais otimistas
currentCategory     — filtro ativo
drawerOpen          — boolean
configOpen          — boolean
deleteTarget        — id do produto a excluir (null se fechado)
pendingImage        — base64 ou File da foto antes do upload
```

---

## Assets

- `logo-1777473155318.jpeg` — logo/flyer original da loja (referência visual, não usar diretamente)
- Flores e sparkles: SVG inline gerado no código (não há arquivos externos)
- Fontes: Google Fonts (Great Vibes, Playfair Display, Nunito)

---

## Arquivos de Design Incluídos

| Arquivo | Descrição |
|---|---|
| `Catálogo Interativo.html` | Vitrine pública responsiva (desktop + mobile) |
| `Painel Admin.html` | Painel admin com login, acervo e configurações |

---

## Stack Recomendada

```
Framework:  Next.js 14 (App Router)
Backend:    Supabase (auth + db + storage)
Estilo:     Tailwind CSS + CSS Variables para tokens
Deploy:     Vercel
```

## Checklist de Implementação

- [ ] Setup Next.js + Supabase + Tailwind
- [ ] Configurar tabelas e RLS no Supabase
- [ ] Implementar auth (login admin)
- [ ] Página `/` — vitrine pública (SSR ou ISR)
- [ ] Componente `ProductCard` com hover states
- [ ] Componente `FilterBar` com lógica de categorias dinâmicas
- [ ] Página `/admin` — protegida por auth
- [ ] Componente `ProductList` com ações (vender/excluir)
- [ ] `DrawerCadastro` — bottom sheet com upload de foto
- [ ] `ConfigView` — form de configurações da loja
- [ ] Animações: flores, sparkles, bob, twinkle (Framer Motion ou CSS puro)
- [ ] Responsividade mobile (breakpoint 768px)
- [ ] Deploy na Vercel + domínio
