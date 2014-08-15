using System;
using Newtonsoft.Json;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace SeoVisualizer
{
    [PropertyValueType(typeof(SeoValues))]
    [PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.Content)]
	public class SeoValuesPropertyEditorValueConverter : PropertyValueConverterBase
	{
        public override bool IsConverter(PublishedPropertyType propertyType)
        {
            return propertyType.PropertyEditorAlias.Equals("EnkelMedia.SeoVisualizer");
        }

        public override object ConvertDataToSource(PublishedPropertyType propertyType, object source, bool preview)
        {
            if (source == null) return null;
            var sourceString = source.ToString();

            try
            {
                return JsonConvert.DeserializeObject<SeoValues>(sourceString);
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }
	}
}