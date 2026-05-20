using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Migrations;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Migrations.Upgrade;

namespace SeoVisualizer.Migrations;

public class SeoVisualizerMigrationsComponent : IAsyncComponent
{

    private readonly ICoreScopeProvider _coreScopeProvider;
    private readonly IMigrationPlanExecutor _migrationPlanExecutor;
    private readonly IKeyValueService _keyValueService;
    private readonly IRuntimeState _runtimeState;

    public SeoVisualizerMigrationsComponent(
        ICoreScopeProvider coreScopeProvider,
        IMigrationPlanExecutor migrationPlanExecutor,
        IKeyValueService keyValueService,
        IRuntimeState runtimeState
    )
    {
        _coreScopeProvider = coreScopeProvider;
        _migrationPlanExecutor = migrationPlanExecutor;
        _keyValueService = keyValueService;
        _runtimeState = runtimeState;
    }

    public async Task InitializeAsync(bool isRestarting, CancellationToken cancellationToken)
    {
        if (_runtimeState.Level < RuntimeLevel.Run)
        {
            return;
        }

        var upgrader = new Upgrader(new SeoVisualizerPackageMigration());
        await upgrader.ExecuteAsync(_migrationPlanExecutor, _coreScopeProvider, _keyValueService);
    }

    public Task TerminateAsync(bool isRestarting, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}

public class SeoVisualizerComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Components().Append<SeoVisualizerMigrationsComponent>();
    }
}
