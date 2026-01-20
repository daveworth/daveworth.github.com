import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  site: "https://dave.coffee",
  vite: {
    server: {
      allowedHosts: ["dave.local"],
    },
  },
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});
