using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Migrations;

namespace SeoVisualizer.Migrations.V_14_0_0;

/// <summary>
/// Rename the PropertyEditorUi property for any data type using our property editors
/// so that it uses the new Property Editor UI
/// </summary>
public class RenamePropertyEditorUiAliasMigration : AsyncMigrationBase
{
    private readonly IDataTypeService _dataTypeService;
    private readonly IUserService _userService;

    public RenamePropertyEditorUiAliasMigration(
        IMigrationContext context,
        IDataTypeService dataTypeService,
        IUserService userService
        ) : base(context)
    {
        _dataTypeService = dataTypeService;
        _userService = userService;
    } 

    protected override async Task MigrateAsync()
    {
        var allDataTypes = await _dataTypeService.GetAllAsync();

        var dataTypes = allDataTypes.Where(x => x.EditorAlias == "EnkelMedia.SeoVisualizer").ToList();

        Logger.LogInformation($"SeoVisualizer, migrating {dataTypes.Count} data types.");

        if (dataTypes.Count == 0)
            return;

        var user = _userService.GetAll(0, 1, out long _).First();

        foreach (var datatype in dataTypes)
        {
            datatype.EditorUiAlias = "EnkelMedia.SeoVisualizer.PropertyEditorUi";

            await _dataTypeService.UpdateAsync(datatype, user.Key);

        }

        Logger.LogInformation($"SeoVisualizer, data types migration successful");
    }
}
