/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API: string;
  readonly VITE_VERSION: string;
  readonly VITE_TITLE: string;
  readonly VITE_COVER_API: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
