import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  site: "https://dave.coffee",
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});
