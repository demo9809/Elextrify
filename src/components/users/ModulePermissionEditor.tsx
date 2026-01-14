import { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Shield,
  ChevronRight,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { MODULE_PERMISSIONS, getRequiredParent, getDependentPermissions } from '../../data/mockModulePermissions';
import { PermissionSet } from '../../types/users';

interface ModulePermissionEditorProps {
  permissions: PermissionSet;
  onChange: (permissions: PermissionSet) => void;
  disabled?: boolean;
}

export default function ModulePermissionEditor({
  permissions,
  onChange,
  disabled = false,
}: ModulePermissionEditorProps) {
  const [selectedModule, setSelectedModule] = useState<string>(MODULE_PERMISSIONS[0].id);
  const [moduleSearch, setModuleSearch] = useState('');
  const [permissionSearch, setPermissionSearch] = useState('');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const currentModule = MODULE_PERMISSIONS.find(m => m.id === selectedModule);

  // Filter modules based on search
  const filteredModules = useMemo(() => {
    if (!moduleSearch.trim()) return MODULE_PERMISSIONS;
    
    const search = moduleSearch.toLowerCase();
    return MODULE_PERMISSIONS.filter(m =>
      m.name.toLowerCase().includes(search) ||
      m.description.toLowerCase().includes(search)
    );
  }, [moduleSearch]);

  // Get icon component dynamically
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || Shield;
  };

  // Toggle group collapse state
  const toggleGroupCollapse = (groupId: string) => {
    const newCollapsed = new Set(collapsedGroups);
    if (newCollapsed.has(groupId)) {
      newCollapsed.delete(groupId);
    } else {
      newCollapsed.add(groupId);
    }
    setCollapsedGroups(newCollapsed);
  };

  // Toggle a single permission
  const togglePermission = (moduleId: string, permissionId: string) => {
    if (disabled) return;

    const newPermissions = { ...permissions };
    if (!newPermissions[moduleId]) {
      newPermissions[moduleId] = {};
    }

    const currentValue = newPermissions[moduleId][permissionId] || false;
    const newValue = !currentValue;

    // Update the permission
    newPermissions[moduleId] = {
      ...newPermissions[moduleId],
      [permissionId]: newValue,
    };

    // Handle parent permission requirement
    if (newValue) {
      const requiredParent = getRequiredParent(moduleId, permissionId);
      if (requiredParent && !newPermissions[moduleId][requiredParent]) {
        // Auto-enable parent permission
        newPermissions[moduleId][requiredParent] = true;
      }
    }

    // Handle dependent permissions (auto-disable children)
    if (!newValue) {
      const dependents = getDependentPermissions(moduleId, permissionId);
      dependents.forEach(depId => {
        newPermissions[moduleId][depId] = false;
      });
    }

    onChange(newPermissions);
  };

  // Toggle all permissions for a module
  const toggleAllModulePermissions = (moduleId: string) => {
    if (disabled) return;

    const module = MODULE_PERMISSIONS.find(m => m.id === moduleId);
    if (!module) return;

    const allPermissions = module.groups.flatMap(g => g.permissions);
    const currentModulePerms = permissions[moduleId] || {};
    const allEnabled = allPermissions.every(p => currentModulePerms[p.id]);

    const newPermissions = { ...permissions };
    newPermissions[moduleId] = {};
    allPermissions.forEach(p => {
      newPermissions[moduleId][p.id] = !allEnabled;
    });

    onChange(newPermissions);
  };

  // Toggle all permissions across all modules
  const toggleAllPermissions = () => {
    if (disabled) return;

    const newPermissions: PermissionSet = {};
    const allEnabled = MODULE_PERMISSIONS.every(module => {
      const allPerms = module.groups.flatMap(g => g.permissions);
      return allPerms.every(p => permissions[module.id]?.[p.id]);
    });

    MODULE_PERMISSIONS.forEach(module => {
      newPermissions[module.id] = {};
      module.groups.flatMap(g => g.permissions).forEach(p => {
        newPermissions[module.id][p.id] = !allEnabled;
      });
    });

    onChange(newPermissions);
  };

  // Get permission count for a module
  const getModulePermissionCount = (moduleId: string): { enabled: number; total: number } => {
    const module = MODULE_PERMISSIONS.find(m => m.id === moduleId);
    if (!module) return { enabled: 0, total: 0 };

    const allPermissions = module.groups.flatMap(g => g.permissions);
    const enabled = allPermissions.filter(p => permissions[moduleId]?.[p.id]).length;
    return { enabled, total: allPermissions.length };
  };

  // Get total permission count across all modules
  const getTotalPermissionCount = (): { enabled: number; total: number } => {
    let enabled = 0;
    let total = 0;

    MODULE_PERMISSIONS.forEach(module => {
      const count = getModulePermissionCount(module.id);
      enabled += count.enabled;
      total += count.total;
    });

    return { enabled, total };
  };

  // Check if permission is enabled
  const isPermissionEnabled = (moduleId: string, permissionId: string): boolean => {
    return permissions[moduleId]?.[permissionId] || false;
  };

  const totalCount = getTotalPermissionCount();

  return (
    <div className="flex flex-col lg:flex-row h-[600px]">
      {/* Left Panel: Module List */}
      <div className="lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={moduleSearch}
              onChange={(e) => setModuleSearch(e.target.value)}
              placeholder="Search modules..."
              className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>
        </div>

        {/* Global Controls */}
        {!disabled && (
          <div className="p-4 border-b border-gray-200 bg-white">
            <button
              onClick={toggleAllPermissions}
              className="w-full h-11 px-4 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors text-sm font-medium"
            >
              {totalCount.enabled === totalCount.total ? 'Deselect All' : 'Grant All Permissions'}
            </button>
            <div className="mt-2 text-center text-sm text-gray-600">
              {totalCount.enabled} of {totalCount.total} permissions granted
            </div>
          </div>
        )}

        {/* Module List */}
        <div className="flex-1 overflow-y-auto">
          {filteredModules.map((module) => {
            const Icon = getIcon(module.icon);
            const count = getModulePermissionCount(module.id);
            const isSelected = selectedModule === module.id;
            const isFullyEnabled = count.enabled === count.total && count.total > 0;
            const isPartiallyEnabled = count.enabled > 0 && count.enabled < count.total;

            return (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                className={`w-full p-4 flex items-start gap-3 border-b border-gray-200 transition-colors text-left ${
                  isSelected
                    ? 'bg-white border-l-4 border-l-[#D9480F]'
                    : 'hover:bg-gray-100 border-l-4 border-l-transparent'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'bg-[#D9480F] text-white' : 'bg-white text-gray-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`font-medium truncate ${
                      isSelected ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {module.name}
                    </div>
                    {isFullyEnabled && (
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    )}
                    {isPartiallyEnabled && (
                      <Circle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 truncate mb-1">
                    {module.description}
                  </div>
                  <div className="text-xs text-gray-500">
                    {count.enabled}/{count.total} permissions
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 flex-shrink-0 ${
                  isSelected ? 'text-[#D9480F]' : 'text-gray-400'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Module Permissions */}
      <div className="flex-1 bg-white flex flex-col overflow-hidden">
        {currentModule ? (
          <>
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#D9480F] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const Icon = getIcon(currentModule.icon);
                    return <Icon className="w-6 h-6 text-[#D9480F]" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{currentModule.name}</h3>
                  <p className="text-gray-600">{currentModule.description}</p>
                </div>
              </div>

              {!disabled && (
                <button
                  onClick={() => toggleAllModulePermissions(currentModule.id)}
                  className="text-sm text-[#D9480F] hover:text-[#C03F0E] font-medium"
                >
                  {(() => {
                    const count = getModulePermissionCount(currentModule.id);
                    return count.enabled === count.total ? 'Deselect All' : 'Select All';
                  })()}
                </button>
              )}
            </div>

            {/* Sticky Search within module */}
            <div className="sticky top-[145px] z-10 p-4 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={permissionSearch}
                  onChange={(e) => setPermissionSearch(e.target.value)}
                  placeholder="Search permissions..."
                  className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
                />
              </div>
            </div>

            {/* Permission Groups */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {currentModule.groups.map((group) => {
                  // Filter permissions based on search
                  const filteredPermissions = permissionSearch.trim()
                    ? group.permissions.filter(p =>
                        p.name.toLowerCase().includes(permissionSearch.toLowerCase()) ||
                        p.description.toLowerCase().includes(permissionSearch.toLowerCase())
                      )
                    : group.permissions;

                  if (filteredPermissions.length === 0) return null;

                  const isGroupCollapsed = collapsedGroups.has(group.id);

                  return (
                    <div key={group.id}>
                      {/* Group Header with Collapse Toggle */}
                      <div className="mb-3">
                        <button
                          onClick={() => toggleGroupCollapse(group.id)}
                          className="w-full flex items-center justify-between gap-2 text-left group"
                        >
                          <div className="flex-1">
                            <h4 className="text-gray-900 mb-1 flex items-center gap-2">
                              {group.name}
                              <span className="text-sm text-gray-500 font-normal">
                                ({filteredPermissions.length})
                              </span>
                            </h4>
                            <p className="text-gray-600">{group.description}</p>
                          </div>
                          <div className="flex-shrink-0">
                            {isGroupCollapsed ? (
                              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                            ) : (
                              <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                            )}
                          </div>
                        </button>
                      </div>
                      
                      {/* Two-Column Permission Grid */}
                      {!isGroupCollapsed && (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                          {filteredPermissions.map((permission) => {
                            const isEnabled = isPermissionEnabled(currentModule.id, permission.id);
                            const hasParent = !!permission.requiresParent;
                            const parentEnabled = hasParent
                              ? isPermissionEnabled(currentModule.id, permission.requiresParent!)
                              : true;

                            return (
                              <div
                                key={permission.id}
                                className={`p-3 rounded-lg border-2 transition-all ${
                                  isEnabled
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                              >
                                <div className="flex items-start gap-3">
                                  {/* Checkbox */}
                                  <button
                                    onClick={() => togglePermission(currentModule.id, permission.id)}
                                    disabled={disabled}
                                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                      isEnabled
                                        ? 'bg-green-600 border-green-600'
                                        : 'bg-white border-gray-300 hover:border-gray-400'
                                    } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                  >
                                    {isEnabled && (
                                      <CheckCircle2 className="w-4 h-4 text-white" fill="currentColor" />
                                    )}
                                  </button>

                                  {/* Permission Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="font-medium text-gray-900 text-sm">{permission.name}</div>
                                      {permission.isSensitive && (
                                        <div className="relative">
                                          <div
                                            onMouseEnter={() => setShowTooltip(permission.id)}
                                            onMouseLeave={() => setShowTooltip(null)}
                                            className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-medium"
                                          >
                                            <AlertTriangle className="w-3 h-3" />
                                            <span>Sensitive</span>
                                          </div>
                                          {showTooltip === permission.id && (
                                            <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                                              High-risk permission - grant carefully
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1.5">{permission.description}</p>
                                    {hasParent && (
                                      <div className={`flex items-center gap-1 text-xs ${
                                        parentEnabled ? 'text-gray-500' : 'text-orange-600'
                                      }`}>
                                        <Info className="w-3 h-3" />
                                        <span>
                                          Requires:{' '}
                                          {(() => {
                                            const parent = group.permissions.find(
                                              p => p.id === permission.requiresParent
                                            ) || currentModule.groups
                                              .flatMap(g => g.permissions)
                                              .find(p => p.id === permission.requiresParent);
                                            return parent?.name || permission.requiresParent;
                                          })()}
                                          {!parentEnabled && ' (will be auto-enabled)'}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p>Select a module to view permissions</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}