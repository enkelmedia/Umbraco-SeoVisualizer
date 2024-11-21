
const schema : UmbExtensionManifest = {
  type : 'propertyEditorSchema',
  name : 'Seo Visualizer Property Editor Schema',
  alias : 'EnkelMedia.SeoVisualizer', //NOTE: This is matched with server-side info
  meta : {
    defaultPropertyEditorUiAlias : 'EnkelMedia.SeoVisualizer.PropertyEditorUi',
      settings : {
        properties : [
          {
            alias : 'maxCharsTitle',
            label : 'Recommended number of characters for Title warning',
            description : 'Will show warning when the title contains more chars than defined. (Default is 60).',
            propertyEditorUiAlias : 'Umb.PropertyEditorUi.Integer'
          },
          {
            alias : 'maxCharsDescription',
            label : 'Recommended number of characters for Description warning',
            description : 'Will show warning when the description contains more chars than defined. (Default is 160).',
            propertyEditorUiAlias : 'Umb.PropertyEditorUi.Integer'
          },
          {
            alias : 'titleSuffix',
            label : 'Default Title Suffix',
            description : 'Will append a suffix to the Title preview (not included in the saved data)',
            propertyEditorUiAlias : 'Umb.PropertyEditorUi.TextBox'
          },
          {
            alias : 'useNoIndex',
            label : 'Show noindex-option',
            description : 'Use this to show a noindex-toggle in the editor',
            propertyEditorUiAlias : 'Umb.PropertyEditorUi.Toggle'
          }
        ]
      }
  }
}

const ui : UmbExtensionManifest = {
    type: "propertyEditorUi",
    alias : "EnkelMedia.SeoVisualizer.PropertyEditorUi",
    name : "Seo Visualizer",
    element : ()=> import('./seo-visualizer-property-editor-ui.element.ts'),
    meta : {
        label : 'Seo Visualizer',
        icon : 'icon-search',
        group : "Seo",
        propertyEditorSchemaAlias : 'EnkelMedia.SeoVisualizer'
    }
};

export const manifests = [
    schema,
    ui,
]
