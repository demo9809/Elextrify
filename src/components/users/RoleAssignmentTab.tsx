import { useState } from 'react';
import { Shield, Eye, CheckCircle, Info, ChevronRight } from 'lucide-react';
import { User, Role } from '../../types/users';
import { mockRoles, PERMISSION_MODULES } from '../../data/mockUsers';
import { toast } from 'sonner@2.0.3';

interface RoleAssignmentTabProps {
  user: User;
  currentRole: Role;
  onRoleChange: (roleId: string) => void;
}

export default function RoleAssignmentTab({
  user,
  currentRole,
  onRoleChange,
}: RoleAssignmentTabProps) {
  const [showRolePermissions, setShowRolePermissions] = useState(false);
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(currentRole.id);

  const handleChangeRole = () => {
    if (selectedRoleId !== currentRole.id) {
      onRoleChange(selectedRoleId);
      toast.success('User role updated successfully');
      setShowChangeRoleModal(false);
    }
  };

  const selectedRole = mockRoles.find(r => r.id === selectedRoleId);

  return (
    <div className="max-w-4xl space-y-6">
      {/* Current Role Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg ${currentRole.isSystem ? 'bg-blue-100' : 'bg-purple-100'} flex items-center justify-center flex-shrink-0`}>
                <Shield className={`w-6 h-6 ${currentRole.isSystem ? 'text-blue-600' : 'text-purple-600'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-gray-900">{currentRole.name}</h3>
                  {currentRole.isSystem && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      System Role
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{currentRole.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  {currentRole.userCount} {currentRole.userCount === 1 ? 'user' : 'users'} with this role
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowChangeRoleModal(true)}
              className="px-4 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors whitespace-nowrap"
            >
              Change Role
            </button>
          </div>
        </div>

        {/* Helper Text */}
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              This user's base access is defined by the selected role. For custom adjustments, use the <strong>Effective Permissions</strong> tab.
            </p>
          </div>
        </div>

        {/* Role Permissions Preview */}
        <div className="px-6 py-4">
          <button
            onClick={() => setShowRolePermissions(!showRolePermissions)}
            className="flex items-center gap-2 text-[#D9480F] hover:text-[#C03F0E] transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{showRolePermissions ? 'Hide' : 'View'} Role Permissions</span>
          </button>
        </div>

        {/* Expanded Role Permissions */}
        {showRolePermissions && (
          <div className="px-6 pb-6">
            <div className="space-y-3">
              {PERMISSION_MODULES.map((module) => {
                const perms = currentRole.permissions[module.id];
                if (!perms) return null;

                const enabledActions = Object.entries(perms)
                  .filter(([_, enabled]) => enabled)
                  .map(([action]) => action);

                if (enabledActions.length === 0) return null;

                return (
                  <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="mb-3">
                      <h4 className="text-gray-900 mb-1">{module.name}</h4>
                      <p className="text-gray-600">{module.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {enabledActions.map((action) => (
                        <span
                          key={action}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Role Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Role Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {Object.values(currentRole.permissions).reduce((count, perms) => {
                return count + Object.values(perms).filter(Boolean).length;
              }, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Permissions</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {Object.keys(currentRole.permissions).length}
            </div>
            <div className="text-sm text-gray-600">Modules</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-semibold text-gray-900 mb-1">
              {currentRole.isSystem ? 'System' : 'Custom'}
            </div>
            <div className="text-sm text-gray-600">Role Type</div>
          </div>
        </div>
      </div>

      {/* Change Role Modal */}
      {showChangeRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-gray-900 mb-1">Change User Role</h3>
              <p className="text-gray-600">Select a new role for {user.name}</p>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {mockRoles.map((role) => {
                  const isSelected = selectedRoleId === role.id;
                  const isCurrent = currentRole.id === role.id;

                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRoleId(role.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-[#D9480F] bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-10 h-10 rounded-lg ${role.isSystem ? 'bg-blue-100' : 'bg-purple-100'} flex items-center justify-center flex-shrink-0`}>
                            <Shield className={`w-5 h-5 ${role.isSystem ? 'text-blue-600' : 'text-purple-600'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="font-medium text-gray-900">{role.name}</div>
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                                  Current
                                </span>
                              )}
                              {role.isSystem && (
                                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                  System
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                            <div className="text-xs text-gray-500">
                              {Object.values(role.permissions).reduce((count, perms) => {
                                return count + Object.values(perms).filter(Boolean).length;
                              }, 0)} permissions · {role.userCount} users
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-[#D9480F] flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedRoleId(currentRole.id);
                  setShowChangeRoleModal(false);
                }}
                className="px-6 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleChangeRole}
                disabled={selectedRoleId === currentRole.id}
                className="px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Change Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
