---
name: umbraco-package-upgrade-to-v18
description: Skill that knows how to migrate a package to Umbraco 18. It outlines important changes and information needed to perform the upgrade.
---

# Umbraco Package Upgrade to v18

## Package Structure
The package most often has a Testsite, when upgrading the package, the test site should also be updated.

## Dependencies
Before getting started, ensure that we know for sure which version of the NuGet-package and npm-packages that we need to install.

* Remove the `.vs`, `bin` and `obj` folders after creating a copy - as these might cause issues during build
* Update dependencies in any `.csproj` to point to the new version. E.g. packages like
  * `Umbraco.Cms`
  * `Umbraco.Cms.Web.Website`
  * `Umbraco.Cms.Api.Common`
  * `Umbraco.Cms.Api.Management`
  * `Umbraco.Cms.DevelopmentMode.Backoffice`
* If you find npm package installs for these packages, uninstall them
  * `@hey-api/openapi-ts` (we want to use the version Umbraco ships), `npm uninstall @hey-api/openapi-ts`
* Update npm packages using npm install. Example: `npm i -D @umbraco-cms/backoffice@18.0.0-beta2` for packages like
  * `@umbraco-cms/backoffice`
  * `npm i -D lit@3.3.1` 
  * `npm i -D typescript@6.0.3`
  * `npm i -D vite@7.3.2`

When using `es-lint`, we need to update the linters in the same time as we update `typescript`, for example:

```sh
npm i -D typescript@6.0.3 @typescript-eslint/eslint-plugin@8.59.4 @typescript-eslint/parser@8.59.4 @typescript-eslint/typescript-estree@8.59.4 @typescript-eslint/tsconfig-utils@8.59.4
```

## Switch from `Swashbuckle.AspNetCore` to `Microsoft.AspNetCore.OpenApi`
Umbraco has dropped the dependency on `Swashbuckle.AspNetCore` to use the implementation that Microsoft ships. This means that we need to migrate any usage of `Swashbuckle`. E.g. `SchemaIdHandler`, `SwaggerGen`, `SwaggerGenOptions`, `OperationIdHandler`, `BackOfficeSecurityRequirementsOperationFilterBase` and others.

### Background and information:
* PR with implementation: https://github.com/umbraco/Umbraco-CMS/pull/22774
* Blog post about the changes: https://dev.to/lauraneto/umbraco-18-and-openapi-a-heads-up-for-extension-developers-1k7

### Main changes
Here are some code samples with changes that needs to be made.

#### Update code in Composer

Before:
```csharp
builder.Services.ConfigureOptions<ConfigureTheDashboardApiSwaggerGenOptions>();
```

After
```csharp
using using Umbraco.Cms.Core;
using Umbraco.Cms.Api.Common.OpenApi;
using Umbraco.Cms.Api.Management.OpenApi;

 builder.AddBackOfficeOpenApiDocument(
            FooApiConfiguration.ApiName,
            document => document
                .WithTitle(FooApiConfiguration.ApiTitle)
                .WithBackOfficeAuthentication()
                .WithJsonOptions(Constants.JsonOptionsNames.BackOffice)
                .ConfigureOpenApiOptions(options => options.AddOperationTransformer((operation, context, _) =>
                {
                    // Extracts the action name to use as operation id.
                    var routeValues = context.Description.ActionDescriptor.RouteValues;

                    if (routeValues.TryGetValue("action", out var actionName) &&
                        !string.IsNullOrWhiteSpace(actionName))
                    {
                        operation.OperationId = actionName;
                    }

                    return Task.CompletedTask;
                }))
        );

```

#### Update URLs
The Swagger UI is not located as `/umbraco/openapi`.

* Any paths pointing to `/umbraco/swagger/{documentName}/swagger.json` should be updated to `/umbraco/openapi/{documentName}.json`

## Update usage of code that has been removed


### Switch `MigrationBase` to `AsyncMigrationBase`

```csharp
protected override void Migrate() 
// becomes
protected override Task MigrateAsync()

// maybe also
return Task.CompletedTask;
```

### Switch `IAsyncComponent` to `IAsyncComponent`

```csharp
public void Initialize()
// to
public Task InitializeAsync(bool isRestarting, CancellationToken cancellationToken)

// and

public void Terminate()
// to
public Task TerminateAsync(bool isRestarting, CancellationToken cancellationToken)
```

If you use a upgrader in the component it needs to change as well.

```csharp
upgrader.Execute()
// becomes
await upgrader.ExecuteAsync()
```
