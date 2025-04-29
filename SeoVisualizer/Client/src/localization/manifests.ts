import type { ManifestLocalization } from "@umbraco-cms/backoffice/localization";

const localizationManifests : Array<ManifestLocalization> = [
  {
		type: "localization",
		alias: "SeoVisualizer.Localize.En_US",
		name: "Seo Visualizer English (United States)",
		meta: {
			"culture": "en-us"
		},
		js : ()=> import('./en-us.js')
	},
  {
		type: "localization",
		alias: "SeoVisualizer.Localize.Sv_SE",
		name: "Seo Visualizer Swedish (Sweden)",
		meta: {
			"culture": "sv-se"
		},
		js : ()=> import('./sv-se.js')
	},
  {
		type: "localization",
		alias: "SeoVisualizer.Localize.sl_NL",
		name: "Seo Visualizer Dutch (Netherlands)",
		meta: {
			"culture": "nl-nl"
		},
		js : ()=> import('./nl-nl.js')
	},
  {
		type: "localization",
		alias: "SeoVisualizer.Localize.Fr_FR",
		name: "Seo Visualizer French (France)",
		meta: {
			"culture": "fr-fr"
		},
		js : ()=> import('./fr-fr.js')
	},
]

export const manifests = [
    ...localizationManifests
]
