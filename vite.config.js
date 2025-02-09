import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "custom-manifest",
      generateBundle(_, bundle) {
        const manifestFile = bundle["manifest.json"];
        if (manifestFile) {
          const manifest = JSON.parse(manifestFile.source);
          manifest.host_permissions = ["<all_urls>"]; // ✅ Add missing property
          manifestFile.source = JSON.stringify(manifest, null, 2);
        }
      },
    },
  ],
  optimizeDeps: {
    include: ["mongodb"],
  },
  build: {
    commonjsOptions: {
      include: [],
    },
  },
});
