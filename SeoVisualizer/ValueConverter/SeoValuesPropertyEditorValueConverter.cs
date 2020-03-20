using System;
using Newtonsoft.Json;
using Umbraco.Core.Composing;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace SeoVisualizer
{

    public class SeoValuesPropertyEditorValueConverter : PropertyValueConverterBase
    {

        public override bool IsConverter(IPublishedPropertyType propertyType) => propertyType.EditorAlias.Equals("EnkelMedia.SeoVisualizer");

        public override Type GetPropertyValueType(IPublishedPropertyType propertyType) => typeof(SeoValues);

        public override PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType) => PropertyCacheLevel.Snapshot;

        public override object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview)
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