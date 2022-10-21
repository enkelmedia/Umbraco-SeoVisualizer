
namespace SeoVisualizer
{
	public class SeoValues
	{ 
        /// <summary>
        /// Holds the calculated SEO-title. Will use the entered title or the node name and append suffix if configured to.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Holds the original title entered in the backoffice.
        /// </summary>
        public string OriginalTitle { get; set; }

        /// <summary>
        /// Holds the description entered in the textbox in the backoffice
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Indicates if we should render meta no index for the page.
        /// </summary>
        public bool NoIndex { get; set; }

        /// <summary>
        /// Indicates if suffix has been configured to be excluded.
        /// </summary>
        public bool ExcludeTitleSuffix { get; set; }

    }
}