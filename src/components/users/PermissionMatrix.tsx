import { useState } from 'react';
import { Check, X, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import { PERMISSION_MODULES, PERMISSION_ACTIONS } from '../../data/mockUsers';
import { PermissionSet } from '../../types/users';

interface PermissionMatrixProps {
  permissions: PermissionSet;
  onChange: (permissions: PermissionSet) => void;
  disabled?: boolean;
}

export default function PermissionMatrix({ permissions, onChange, disabled = false }: PermissionMatrixProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(PERMISSION_MODULES.map(m => m.id))
  );
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const togglePermission = (moduleId: string, actionId: string) => {
    if (disabled) return;

    const newPermissions = { ...permissions };
    if (!newPermissions[moduleId]) {
      newPermissions[moduleId] = {};
    }
    newPermissions[moduleId] = {
      ...newPermissions[moduleId],
      [actionId]: !newPermissions[moduleId]?.[actionId],
    };
    onChange(newPermissions);
  };

  const toggleAllModulePermissions = (moduleId: string) => {
    if (disabled) return;

    const newPermissions = { ...permissions };
    const currentModulePerms = newPermissions[moduleId] || {};
    const allEnabled = PERMISSION_ACTIONS.every(action => currentModulePerms[action.id]);

    newPermissions[moduleId] = {};
    PERMISSION_ACTIONS.forEach(action => {
      newPermissions[moduleId][action.id] = !allEnabled;
    });
    onChange(newPermissions);
  };

  const toggleAllPermissions = () => {
    if (disabled) return;

    const newPermissions: PermissionSet = {};
    const allEnabled = PERMISSION_MODULES.every(module =>
      PERMISSION_ACTIONS.every(action => permissions[module.id]?.[action.id])
    );

    PERMISSION_MODULES.forEach(module => {
      newPermissions[module.id] = {};
      PERMISSION_ACTIONS.forEach(action => {
        newPermissions[module.id][action.id] = !allEnabled;
      });
    });
    onChange(newPermissions);
  };

  const isModuleFullyEnabled = (moduleId: string): boolean => {
    return PERMISSION_ACTIONS.every(action => permissions[moduleId]?.[action.id]);
  };

  const isModulePartiallyEnabled = (moduleId: string): boolean => {
    const enabledCount = PERMISSION_ACTIONS.filter(action => permissions[moduleId]?.[action.id]).length;
    return enabledCount > 0 && enabledCount < PERMISSION_ACTIONS.length;
  };

  const areAllPermissionsEnabled = (): boolean => {
    return PERMISSION_MODULES.every(module => isModuleFullyEnabled(module.id));
  };

  return (
    <div className="divide-y divide-gray-200">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 w-80">
                <div className="flex items-center gap-2">
                  <span>Module</span>
                  {!disabled && (
                    <button
                      onClick={toggleAllPermissions}
                      className="ml-2 text-sm text-[#D9480F] hover:text-[#C03F0E]"
                    >
                      {areAllPermissionsEnabled() ? 'Deselect All' : 'Select All'}
                    </button>
                  )}
                </div>
              </th>
              {PERMISSION_ACTIONS.map((action) => (
                <th key={action.id} className="px-4 py-3 text-center text-gray-700">
                  <div className="flex items-center justify-center gap-1">
                    <span>{action.name}</span>
                    <button
                      onMouseEnter={() => setShowTooltip(action.id)}
                      onMouseLeave={() => setShowTooltip(null)}
                      className="relative"
                    >
                      <HelpCircle className="w-3 h-3 text-gray-400" />
                      {showTooltip === action.id && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                          {action.description}
                        </div>
                      )}
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {PERMISSION_MODULES.map((module) => (
              <tr key={module.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-900">{module.name}</div>
                      <div className="text-gray-600">{module.description}</div>
                    </div>
                    {!disabled && (
                      <button
                        onClick={() => toggleAllModulePermissions(module.id)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          isModuleFullyEnabled(module.id)
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : isModulePartiallyEnabled(module.id)
                            ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {isModuleFullyEnabled(module.id) ? 'All' : isModulePartiallyEnabled(module.id) ? 'Some' : 'None'}
                      </button>
                    )}
                  </div>
                </td>
                {PERMISSION_ACTIONS.map((action) => (
                  <td key={action.id} className="px-4 py-4 text-center">
                    <button
                      onClick={() => togglePermission(module.id, action.id)}
                      disabled={disabled}
                      className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                        permissions[module.id]?.[action.id]
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                      } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {permissions[module.id]?.[action.id] ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden">
        {!disabled && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <button
              onClick={toggleAllPermissions}
              className="text-[#D9480F] hover:text-[#C03F0E]"
            >
              {areAllPermissionsEnabled() ? 'Deselect All Permissions' : 'Select All Permissions'}
            </button>
          </div>
        )}
        {PERMISSION_MODULES.map((module) => {
          const isExpanded = expandedModules.has(module.id);
          return (
            <div key={module.id} className="border-b border-gray-200">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-900">{module.name}</span>
                    {isModuleFullyEnabled(module.id) && (
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs">
                        All
                      </span>
                    )}
                    {isModulePartiallyEnabled(module.id) && (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 text-xs">
                        Partial
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600">{module.description}</div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                )}
              </button>
              {isExpanded && (
                <div className="px-6 pb-4 bg-gray-50">
                  {!disabled && (
                    <button
                      onClick={() => toggleAllModulePermissions(module.id)}
                      className="mb-3 text-sm text-[#D9480F] hover:text-[#C03F0E]"
                    >
                      {isModuleFullyEnabled(module.id) ? 'Deselect All' : 'Select All'}
                    </button>
                  )}
                  <div className="space-y-2">
                    {PERMISSION_ACTIONS.map((action) => (
                      <div
                        key={action.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex-1">
                          <div className="text-gray-900 mb-1">{action.name}</div>
                          <div className="text-gray-600">{action.description}</div>
                        </div>
                        <button
                          onClick={() => togglePermission(module.id, action.id)}
                          disabled={disabled}
                          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ml-3 flex-shrink-0 ${
                            permissions[module.id]?.[action.id]
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {permissions[module.id]?.[action.id] ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <X className="w-6 h-6" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
