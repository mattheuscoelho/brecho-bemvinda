/**
 * Cria o usuário admin no Supabase Auth.
 * Uso: node --env-file=.env.local scripts/create-admin.mjs
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const email = process.argv[2] || "admin@bemvinda.com";
const password = process.argv[3] || "mudar123";

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (error) {
  console.error("Erro:", error.message);
  process.exit(1);
}

console.log(`Admin criado: ${data.user.email}`);
console.log("Troque a senha no primeiro login!");
