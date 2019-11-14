using System;
using Newtonsoft.Json;
using Umbraco.Core.Composing;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace SeoVisualizer
{

    public class SeoValuesPropertyEditorValueConverter : PropertyValueConverterBase
    {

        public override bool IsConverter(PublishedPropertyType propertyType) => propertyType.EditorAlias.Equals("EnkelMedia.SeoVisualizer");

        public override Type GetPropertyValueType(PublishedPropertyType propertyType) => typeof(SeoValues);

        public override PropertyCacheLevel GetPropertyCacheLevel(PublishedPropertyType propertyType) => PropertyCacheLevel.Snapshot;

        public override object ConvertSourceToIntermediate(IPublishedElement owner, PublishedPropertyType propertyType, object source, bool preview)
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