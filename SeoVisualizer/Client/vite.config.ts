import { defineConfig } from "vite";

export default defineConfig(({ command }) => {

  return {
    build: {
        lib: {
            entry: "src/entry.ts",
            formats: ["es"],
            name : "SeoVisualizer.Umbraco"
        },
        outDir: "../wwwroot/App_Plugins/SeoVisualizer/dist",
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/]
        },
    }
  }
});
