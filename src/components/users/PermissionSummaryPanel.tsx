import { useMemo } from 'react';
import { CheckCircle2, AlertTriangle, Shield } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { MODULE_PERMISSIONS } from '../../data/mockModulePermissions';
import { PermissionSet } from '../../types/users';

interface PermissionSummaryPanelProps {
  permissions: PermissionSet;
}

export default function PermissionSummaryPanel({ permissions }: PermissionSummaryPanelProps) {
  // Get icon component dynamically
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || Shield;
  };

  // Calculate summary data
  const summary = useMemo(() => {
    const moduleSummaries = MODULE_PERMISSIONS.map(module => {
      const allPermissions = module.groups.flatMap(g => g.permissions);
      const enabledPermissions = allPermissions.filter(p => permissions[module.id]?.[p.id]);
      const sensitivePermissions = enabledPermissions.filter(p => p.isSensitive);

      return {
        module,
        enabledPermissions,
        sensitivePermissions,
        totalCount: allPermissions.length,
        enabledCount: enabledPermissions.length,
      };
    }).filter(s => s.enabledCount > 0); // Only show modules with enabled permissions

    const totalEnabled = moduleSummaries.reduce((sum, s) => sum + s.enabledCount, 0);
    const totalSensitive = moduleSummaries.reduce((sum, s) => sum + s.sensitivePermissions.length, 0);

    return {
      moduleSummaries,
      totalEnabled,
      totalSensitive,
    };
  }, [permissions]);

  if (summary.totalEnabled === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No permissions granted yet</p>
        <p className="text-sm text-gray-400 mt-1">
          Select permissions from the editor above to grant access
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-900 mb-1">Permission Summary</h3>
            <p className="text-gray-600">Review all granted permissions</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-gray-900">{summary.totalEnabled}</div>
            <div className="text-sm text-gray-600">permissions</div>
          </div>
        </div>

        {summary.totalSensitive > 0 && (
          <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span className="text-sm text-red-700">
              {summary.totalSensitive} sensitive {summary.totalSensitive === 1 ? 'permission' : 'permissions'} granted - review carefully
            </span>
          </div>
        )}
      </div>

      {/* Module Summaries */}
      <div className="divide-y divide-gray-200">
        {summary.moduleSummaries.map(({ module, enabledPermissions, sensitivePermissions, enabledCount }) => {
          const Icon = getIcon(module.icon);

          return (
            <div key={module.id} className="p-6">
              {/* Module Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#D9480F] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#D9480F]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-gray-900">{module.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                      {enabledCount}
                    </span>
                    {sensitivePermissions.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-medium flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {sensitivePermissions.length} sensitive
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Permissions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {enabledPermissions.map(permission => (
                  <div
                    key={permission.id}
                    className={`flex items-start gap-2 p-2 rounded-lg ${
                      permission.isSensitive ? 'bg-red-50' : 'bg-gray-50'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      permission.isSensitive ? 'text-red-600' : 'text-green-600'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${
                        permission.isSensitive ? 'text-red-900' : 'text-gray-900'
                      }`}>
                        {permission.name}
                      </div>
                      <div className={`text-xs ${
                        permission.isSensitive ? 'text-red-700' : 'text-gray-600'
                      }`}>
                        {permission.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}