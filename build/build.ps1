dotnet pack ../SeoVisualizer.Core/SeoVisualizer.Core.csproj --output Artifacts --configuration Release

dotnet build ../SeoVisualizer/SeoVisualizer.csproj --configuration Release
dotnet pack ../SeoVisualizer/SeoVisualizer.csproj --output Artifacts --no-build --configuration Release

