namespace SeoVisualizer;

/// <summary>
/// Holds the stored values from the backoffice
/// </summary>
internal class SeoValuesJsonModel
{
    public string Title { get; set; }
    
    public string Description { get; set; }

    public bool NoIndex { get; set; }

    public bool ExcludeTitleSuffix { get; set; }
}