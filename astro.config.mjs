import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Blackbird docs",
      customCss: ["./src/styles/custom.css"],
      logo: {
        light: "./src/assets/light-logo.svg",
        dark: "./src/assets/dark-logo.svg",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/bb-io",
      },
      sidebar: [
        {
          label: "Learning to fly",
          autogenerate: { directory: "learning-to-fly" },
        },
        {
          label: "Concepts",
          autogenerate: { directory: "concepts" },
        },
        {
          label: "Apps",
          autogenerate: { directory: "apps" },
        },
        {
          label: "SDK",
          autogenerate: { directory: "sdk" },
        },
        {
          label: "More",
          autogenerate: { directory: "more" },
        },
      ],
    }),
  ],
});
