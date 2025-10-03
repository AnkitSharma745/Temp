/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KIOSK_NAME: string;
  readonly VITE_KIOSK_EMAIL: string;
  readonly VITE_KIOSK_PASSWORD: string;
  readonly VITE_KIOSK_CLIENT_NAME: string;
  readonly VITE_SUPPORT_USER_PHONENUMBERS: string;
  readonly VITE_SUPPORT_USER_PIN: string;
  readonly VITE_IS_PROD: string;
  readonly VITE_OGMENTO_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
