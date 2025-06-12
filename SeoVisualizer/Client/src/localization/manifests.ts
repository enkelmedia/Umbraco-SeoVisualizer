const localizationManifests : Array<UmbExtensionManifest> = [
  {
		type: "localization",
		alias: "SeoVisualizer.Localize.en_us",
		name: "Seo Visualizer English (United States)",
		meta: {
			"culture": "en"
		},
		js : ()=> import('./en-us.js')
	},
  {
		type: "localization",
		alias: "SeoVisualizer.Localize.sv_se",
		name: "Seo Visualizer Swedish (Sweden)",
		meta: {
			"culture": "sv"
		},
		js : ()=> import('./sv-se.js')
	},
  {
		type: "localization",
		alias: "SeoVisualizer.Localize.nl_nl",
		name: "Seo Visualizer Dutch (Netherlands)",
		meta: {
			"culture": "nl"
		},
		js : ()=> import('./nl-nl.js')
	},
  {
		type: "localization",
		alias: "SeoVisualizer.Localize.fr_fr",
		name: "Seo Visualizer French (France)",
		meta: {
			"culture": "fr"
		},
		js : ()=> import('./fr-fr.js')
  },
  {
    type: "localization",
    alias: "SeoVisualizer.Localize.hr_hr",
    name: "Seo Visualizer Croatian (Croatia)",
    meta: {
      "culture": "hr"
    },
    js: () => import('./hr-hr.js')
  }
]

export const manifests = [
    ...localizationManifests
]
