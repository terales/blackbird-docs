import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";


import { labels, locales, defaultLocale } from "./i18n.config.mjs";

// https://astro.build/config
export default defineConfig({
  site: 'https://terales.github.io',
  base: 'blackbird-docs',
  i18n: {
    locales: Object.keys(locales),
    defaultLocale: defaultLocale,
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    starlight({
      title: {
        en: labels.en.title,
        'nl-NL': labels.nlNL.title,
        'hu-HU': labels.huHU.title,
        'uk-UA': labels.ukUA.title,
      },
      customCss: ["./src/styles/custom.css"],
      logo: {
        light: "./src/assets/light-logo.svg",
        dark: "./src/assets/dark-logo.svg",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/bb-io",
      },
      plugins: [
        // Generate the OpenAPI documentation pages.
        starlightOpenAPI([
          {
            base: "api",
            label: "Blacbird API",
            schema: "./schemas/openapi.json",
          },
        ]),
      ],
      sidebar: [
        {
          autogenerate: { directory: "learning-to-fly" },
          label: labels.en["sidebar.learning-to-fly"],
          translations: {
            'nl-NL': labels.nlNL["sidebar.learning-to-fly"],
            'hu-HU': labels.huHU["sidebar.learning-to-fly"],
            'uk-UA': labels.ukUA["sidebar.learning-to-fly"],
          },
        },
        {
          autogenerate: { directory: "concepts" },
          label: labels.en["sidebar.concepts"],
          translations: {
            'nl-NL': labels.nlNL["sidebar.concepts"],
            'hu-HU': labels.huHU["sidebar.concepts"],
            'uk-UA': labels.ukUA["sidebar.concepts"],
          },
        },
        {
          autogenerate: { directory: "guides" },
          label: labels.en["sidebar.guides"],
          translations: {
            'nl-NL': labels.nlNL["sidebar.guides"],
            'hu-HU': labels.huHU["sidebar.guides"],
            'uk-UA': labels.ukUA["sidebar.guides"],
          },
        },
        {
          autogenerate: { directory: "sdk" },
          label: labels.en["sidebar.sdk"],
          translations: {
            'nl-NL': labels.nlNL["sidebar.sdk"],
            'hu-HU': labels.huHU["sidebar.sdk"],
            'uk-UA': labels.ukUA["sidebar.sdk"],
          },
        },
        {
          autogenerate: { directory: "eggs" },
          label: labels.en["sidebar.eggs"],
          translations: {
            'nl-NL': labels.nlNL["sidebar.eggs"],
            'hu-HU': labels.huHU["sidebar.eggs"],
            'uk-UA': labels.ukUA["sidebar.eggs"],
          },
        },
        {
          autogenerate: { directory: "more" },
          label: labels.en["sidebar.more"],
          translations: {
            'nl-NL': labels.nlNL["sidebar.more"],
            'hu-HU': labels.huHU["sidebar.more"],
            'uk-UA': labels.ukUA["sidebar.more"],
          },
        },
        ...openAPISidebarGroups,
        {
          autogenerate: { directory: "apps" },
          label: labels.en["sidebar.apps"],
          translations: {
            'nl-NL': labels.nlNL["sidebar.apps"],
            'hu-HU': labels.huHU["sidebar.apps"],
            'uk-UA': labels.ukUA["sidebar.apps"],
          },
        },
      ],
    }),
  ],
});
