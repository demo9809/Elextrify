import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Search,
  Plus,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockOrganizationUnits,
  getAccessLevelLabel,
  getAccessLevelColor,
  type AccessLevel
} from '../../data/mockOrganizationUnits';

// Mock users for assignment
const mockUsers = [
  { id: '1', name: 'John Smith', email: 'john.smith@globalds.com', currentAccess: null as AccessLevel | null },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@globalds.com', currentAccess: null as AccessLevel | null },
  { id: '3', name: 'Michael Brown', email: 'michael.brown@globalds.com', currentAccess: 'admin' as AccessLevel },
  { id: '4', name: 'Emily Davis', email: 'emily.davis@globalds.com', currentAccess: 'manage' as AccessLevel },
  { id: '5', name: 'David Wilson', email: 'david.wilson@globalds.com', currentAccess: 'manage' as AccessLevel },
  { id: '6', name: 'Lisa Anderson', email: 'lisa.anderson@globalds.com', currentAccess: 'view' as AccessLevel },
  { id: '7', name: 'Robert Martinez', email: 'robert.martinez@globalds.com', currentAccess: 'manage' as AccessLevel },
  { id: '8', name: 'Jennifer Taylor', email: 'jennifer.taylor@globalds.com', currentAccess: null as AccessLevel | null },
  { id: '9', name: 'James Thompson', email: 'james.thompson@globalds.com', currentAccess: null as AccessLevel | null },
  { id: '10', name: 'Emma White', email: 'emma.white@globalds.com', currentAccess: null as AccessLevel | null },
];

export default function UserAccessManagement() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<AccessLevel>('view');

  const unit = mockOrganizationUnits.find(u => u.id === unitId);

  if (!unit) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
          <h2 className="font-semibold text-[#111827] mb-2">Organization Unit Not Found</h2>
          <button
            onClick={() => navigate('/organization-units')}
            className="px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors"
          >
            Back to Organization Units
          </button>
        </div>
      </div>
    );
  }

  const assignedUsers = users.filter(u => u.currentAccess !== null);
  const unassignedUsers = users.filter(u => u.currentAccess === null);
  const filteredUsers = assignedUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    if (!selectedUser) {
      toast.error('Please select a user');
      return;
    }

    setUsers(users.map(u => 
      u.id === selectedUser ? { ...u, currentAccess: selectedAccessLevel } : u
    ));
    
    toast.success('User access granted successfully');
    setShowAddModal(false);
    setSelectedUser(null);
    setSelectedAccessLevel('view');
  };

  const handleUpdateAccess = (userId: string, newAccess: AccessLevel) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, currentAccess: newAccess } : u
    ));
    toast.success('Access level updated successfully');
  };

  const handleRemoveAccess = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, currentAccess: null } : u
    ));
    toast.success('User access removed successfully');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/organization-units/${unitId}`)}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[#111827] flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#D9480F]" />
                  User Access Management
                </h1>
                <p className="text-sm text-[#6B7280] mt-1">{unit.name}</p>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add User</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[44px] pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-blue-900 mb-1">Access Inheritance</p>
            <p className="text-sm text-blue-800">
              Users with access to this unit will automatically have access to all child units unless explicitly denied. 
              Access levels determine what actions users can perform.
            </p>
          </div>
        </div>

        {/* User List */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="font-semibold text-[#111827]">
              Assigned Users ({assignedUsers.length})
            </h2>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="divide-y divide-[#E5E7EB]">
              {filteredUsers.map((user) => (
                <div key={user.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#111827] truncate">{user.name}</p>
                    <p className="text-sm text-[#6B7280] truncate">{user.email}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={user.currentAccess || 'view'}
                      onChange={(e) => handleUpdateAccess(user.id, e.target.value as AccessLevel)}
                      className="h-[40px] px-3 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    >
                      <option value="view">View Only</option>
                      <option value="manage">Manage</option>
                      <option value="admin">Administrator</option>
                    </select>

                    <button
                      onClick={() => handleRemoveAccess(user.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                      title="Remove access"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              {assignedUsers.length === 0 ? (
                <>
                  <Users className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                  <p className="text-sm text-[#6B7280]">No users assigned to this unit</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 px-4 h-[40px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Add Your First User
                  </button>
                </>
              ) : (
                <>
                  <Search className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                  <p className="text-sm text-[#6B7280]">No users match your search</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Access Level Legend */}
        <div className="mt-6 bg-white border border-[#E5E7EB] rounded-lg p-6">
          <h3 className="font-semibold text-[#111827] mb-4">Access Levels Explained</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getAccessLevelColor('view')}`}>
                {getAccessLevelLabel('view')}
              </span>
              <p className="text-sm text-[#6B7280] flex-1">
                Can view campaigns, media, playlists, and kiosks. Cannot make changes.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getAccessLevelColor('manage')}`}>
                {getAccessLevelLabel('manage')}
              </span>
              <p className="text-sm text-[#6B7280] flex-1">
                Can create, edit, and delete resources within this unit. Can manage users with View access.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getAccessLevelColor('admin')}`}>
                {getAccessLevelLabel('admin')}
              </span>
              <p className="text-sm text-[#6B7280] flex-1">
                Full control over this unit and all child units. Can manage all users and unit settings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Add User to {unit.name}</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedUser(null);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Select User
                </label>
                <select
                  value={selectedUser || ''}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                >
                  <option value="">Choose a user...</option>
                  {unassignedUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Access Level
                </label>
                <div className="space-y-2">
                  {(['view', 'manage', 'admin'] as AccessLevel[]).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSelectedAccessLevel(level)}
                      className={`w-full p-3 border-2 rounded-lg transition-all text-left ${
                        selectedAccessLevel === level
                          ? 'border-[#D9480F] bg-[#FEF2F2]'
                          : 'border-[#E5E7EB] hover:border-[#D9480F] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${
                            selectedAccessLevel === level ? 'text-[#D9480F]' : 'text-[#111827]'
                          }`}>
                            {getAccessLevelLabel(level)}
                          </p>
                          <p className="text-sm text-[#6B7280] mt-0.5">
                            {level === 'view' && 'Read-only access'}
                            {level === 'manage' && 'Can create and edit resources'}
                            {level === 'admin' && 'Full administrative control'}
                          </p>
                        </div>
                        {selectedAccessLevel === level && (
                          <Check className="w-5 h-5 text-[#D9480F]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedUser(null);
                }}
                className="flex-1 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
