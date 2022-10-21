using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;

namespace SeoVisualizer
{
    /// <summary>
    /// Converter for the property values
    /// </summary>
    public class SeoValuesPropertyEditorValueConverter : PropertyValueConverterBase
    {

        public override bool IsConverter(IPublishedPropertyType propertyType) => propertyType.EditorAlias.Equals("EnkelMedia.SeoVisualizer");

        public override Type GetPropertyValueType(IPublishedPropertyType propertyType) => typeof(SeoValues);

        public override PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType) => PropertyCacheLevel.Snapshot;

        public override object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview)
        {
            if (source == null) return new SeoValues();

            var sourceString = source.ToString();

            if (string.IsNullOrEmpty(sourceString))
                return new SeoValues();

            bool useTitleSuffixConfigured = false;
            string configuredTitleSuffix = "";

            var jConfig = JObject.FromObject(propertyType.DataType.Configuration);
            
            if (jConfig != null && jConfig.ContainsKey("titleSuffix"))
            {
                configuredTitleSuffix = jConfig["titleSuffix"]!.ToObject<string>();
                useTitleSuffixConfigured = !string.IsNullOrEmpty(configuredTitleSuffix);
            }

            try
            {
                var obj = JsonConvert.DeserializeObject<SeoValues>(sourceString);

                if (obj == null)
                    return new SeoValues();
                

                if (useTitleSuffixConfigured)
                {
                    if (!obj.ExcludeTitleSuffix)
                    {
                        obj.Title += configuredTitleSuffix;
                    }
                }

                return obj;
                

            }
            catch (Exception ex)
            {
                return new SeoValues();
            }

        }

    }

}