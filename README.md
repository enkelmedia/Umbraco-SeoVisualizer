

# Seo Visualizer for Umbraco
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![NuGet version (UmbracoSeoVisualizer)](https://img.shields.io/nuget/v/UmbracoSeoVisualizer.svg?style=flat-square)](https://www.nuget.org/packages/UmbracoSeoVisualizer/)

Seo Visualizer is a simple property editor for Umbraco used to take seo-related user input and visualize the page in the Google search results for the editor.

![Screenshot of Seo Visualizer](https://github.com/enkelmedia/Umbraco-SeoVisualizer/raw/master/Documentation/seo-example.PNG "Screenshot")

## Installation
The esiest way to install the package is to use nuget:

```
dotnet add package UmbracoSeoVisualizer
```

### Version
* [Version 17 for Umbraco 17](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v17)
* [Version 16 for Umbraco 16](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v16)
* [Version 15 for Umbraco 15](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v15)
* [Version 14 for Umbraco 14](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v14)
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

While typing in the text boxes a preview of the Google snippet is shown in the backoffice.

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
We welcome any contribution both as in reporting issues, adding translations and in writing code. If you're planing to make a Pull Request please start with an issue to let us know and to increase the chances for the PR to be merged.

### Running the Project
Developers should be able to open the solution and just run any of the test-sites in the project, or use `dotnet run`.

#### Frontend
To get started with the frontend-files, open a terminal, go to the `SeoVisualizer/Client` and run `npm install` (make sure to check the required node version in `.nvmrc` before).

Then just build the frontend assets using `npm run build` or `npm run watch`.

## Build for NuGet

#### 1. Adjust version in `Directory.Build.props`

#### 2. Run:
```
build\build.ps1
```

#### 3. Upload to nuget

* [ ] SeoVisualizer.Core
* [ ] SeoVisualizer

