import en from "./i18n-labels/en.json" with { type: "json" };
import nlNL from "./i18n-labels/nl-NL.json" with { type: "json" };
import huHU from "./i18n-labels/hu-HU.json" with { type: "json" };
import ukUA from "./i18n-labels/uk-UA.json" with { type: "json" };

export const labels = {
    en,
    nlNL: { ...en, ...nlNL },
    huHU: { ...en, ...huHU },
    ukUA: { ...en, ...ukUA },
};

export const locales = {
    root: {
        label: labels.en.locale_name,
        lang: 'en',
    },
    'nl': {
        label: labels.nlNL.locale_name,
        lang: 'nl-NL',
    },
    'hu': {
        label: labels.huHU.locale_name,
        lang: 'hu-HU',
    },
    'uk': {
        label: labels.ukUA.locale_name,
        lang: 'uk-UA',
    },
};