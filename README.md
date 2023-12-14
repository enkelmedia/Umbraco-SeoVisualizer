

Seo Visualizer for Umbraco
============================
Seo Visualizer is a simple property editor for Umbraco used to take seo-related user input and visualize the page in the Google search results for the editor.

![Screenshot of Seo Visualizer](https://github.com/enkelmedia/Umbraco-SeoVisualizer/raw/master/Documentation/seo-example.PNG "Screenshot")

## Installation
The esiest way to install the package is to use nuget:

```
dotnet add package UmbracoSeoVisualizer
```

### Version
* [Version 13 for Umbraco 13](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v13)
* [Version 12 for Umbraco 12](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v12)
* [Version 11 for Umbraco 11](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v11)
* [Version 10 for Umbraco 10](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v10)
* [Version 9 for Umbraco 9](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v9)
* [Version 8 for Umbraco 8](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v8)
* [Version 1 for Umbraco 7](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v1)

### Features
The property editor just shows a form with two fields

* **Page title** Shows a hint for the user if the title is longer than 70 chars which is not good.
* **Meta description** Shows a hint for the user if the title is longer than 155 chars which is not good. 
* **Title Suffix** Can be configured so titles will be rendered like eg `My Page | Umbraco`
* **No index-toggle** Can be configured to be shown next to the seo-settings.

While typing in the textboxes a preview of the Google snippet is shown in the backoffice.

## How to use

### Set up
If you are installing the package using NuGet you'll have to manually add a new data type in the developer section of your Umbraco backoffice. Choose the Property Editor named "Seo Visualizer".

#### Document Types

After that you need to add this data type to one or more of your document types so that the editors can use it, in the examples below we gave the property on the document type the alias "seo".

#### In the views

The recommended approach is to use Models Builder but you can also access the properties like this:

```csharp
@(this.Model.Content.GetPropertyValue<SeoValues>("seo").Description)
```

or like this

```html
@{
  var seo = this.Model.Content.GetPropertyValue<SeoValues>("seo");
}

<html>
<head>
  <title>@seo.Title</title>
  <meta name="description" content="@seo.Description" />
</head>
<body>
</body>
</html>
```

The last approach would perform better as the convertion of the object will only have to be done once.



## Contribution
We welcome any contribution both as in reporting issues and as in writing code, if you're planing to make a Pull Request please start with an issue to let us know and to increase the chances for the PR to be merged.

## Build for NuGet

#### 1. Adjust version in `Directory.Build.props`

#### 2. Run:
```
build\build.ps1
```

#### 3. Upload to nuget

* [ ] SeoVisualizer.Core
* [ ] SeoVisualizer

