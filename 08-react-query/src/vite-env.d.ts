/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CATAPI_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
