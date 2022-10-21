using J2N.Collections.Generic;

namespace SeoVisualizer;

public class SeoVisualizerPreValueConfiguration : Dictionary<string, object>
{
    public bool UseNoIndex { get; set; }
    public string TitleSuffix { get; set; }
}