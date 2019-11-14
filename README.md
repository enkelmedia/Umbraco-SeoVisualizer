
Seo Visualizer for Umbraco 7
============================

By Markus Johansson, Enkel Media

What?
-----
This is a property editor for Umbraco 7 used to take seo-related user input and visualize the search result for the editor.

![Screenshot of Seo Visualizer](/documentation/seo-example.png "Screenshot")

Installation
------------
Just install the package and a new data type called "Seo Visualizer" will be installed.

## Building
Open the command line and run 

```
nuget pack
```

In the SeoVisualizer-folder

Features
------------
The property editor just shows a form with two fields

**Page title**
Shows a hit for the user if the title is longer than 70 chars which is not goot.

**Meta description**
Shows a hit for the user if the title is longer than 155 chars which is not goot.


How to use
----------

### Set ut
If you are installing the package using NuGet you'll have to manually add a new data type in the developer section of your Umbraco backoffice. Choose the Property Editor named "Seo Visualizer".

#### Document Types

After that you need to add this data type to one or more of your document types so that the editors can use it, in the examples below we gave the custom property on the document type the alias "seo".

#### In the views

There are two ways to use the values from the property editor in the views.

@(this.Model.Content.GetPropertyValue&lt;SeoValues&gt;("seo").Description)

or like this

@{
  var seo = this.Model.Content.GetPropertyValue&lt;SeoValues&gt;("seo");
}

@seo.Title
@seo.Description

The last approach would perform better as the convertion of the object will only have to be done once.
