
Seo Visualizer for Umbraco
============================
Seo Visualizer is a simple property editor for Umbraco 7 and 8 used to take seo-related user input and visualize the page in the Google search results for the editor.

![Screenshot of Seo Visualizer](https://github.com/enkelmedia/Umbraco-SeoVisualizer/raw/master/Documentation/seo-example.PNG "Screenshot")

## Installation
The esiest way to install the package is to use nuget:

```
Install-Package UmbracoSeoVisualizer
```

### Version 1 = Umbraco 7
The first version of the package was created for Umbraco 7, make sure that you install the right version when you install from nuget.

[Go to the V1-branch](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v1)


### Version 8 = Umbraco 8
When Umbraco 8 was released we decided to follow the version number to make it more clear.

[Go to the V8-branch](https://github.com/enkelmedia/Umbraco-SeoVisualizer/tree/v8)


### Features
The property editor just shows a form with two fields

* **Page title** Shows a hit for the user if the title is longer than 70 chars which is not goot.

* **Meta description** Shows a hit for the user if the title is longer than 155 chars which is not goot.

While typing in the textboxes a preview of the Google snippet is shown in the backoffice.

## How to use

### Set up
If you are installing the package using NuGet you'll have to manually add a new data type in the developer section of your Umbraco backoffice. Choose the Property Editor named "Seo Visualizer".

#### Document Types

After that you need to add this data type to one or more of your document types so that the editors can use it, in the examples below we gave the property on the document type the alias "seo".

#### In the views

There are two ways to use the values from the property editor in the views.

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

### Building
Open the command line and run 

```
nuget pack
```

In the SeoVisualizer-folder
