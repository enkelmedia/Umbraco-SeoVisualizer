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
            if (source == null) return new SeoValues();

            var sourceString = source.ToString();

            try
            {
                var obj = JsonConvert.DeserializeObject<SeoValues>(sourceString);

                if (obj != null)
                    return obj;

                return new SeoValues();

            }
            catch (Exception ex)
            {
                return new SeoValues();
            }
            
        }
	}
}