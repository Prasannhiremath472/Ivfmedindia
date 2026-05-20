/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_SITE_NAME: string;
  readonly VITE_CONTACT_PHONE: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_WHATSAPP: string;
  readonly VITE_GOOGLE_ANALYTICS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
