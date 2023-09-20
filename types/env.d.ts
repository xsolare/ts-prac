/// <reference types="vite/client" />

// Vuetify color fix.
declare module 'vuetify/lib/util/colors.mjs';

interface ImportMetaEnv {
  // readonly -: {};
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
