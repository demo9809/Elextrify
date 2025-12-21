import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  ChevronDown,
  Building2,
  Plus,
  MapPin,
  Briefcase,
  Layers,
  Shield,
  MoreVertical,
  Edit,
  Users,
  Eye,
  Trash2,
  AlertCircle
} from 'lucide-react';
import {
  mockOrganizationUnits,
  buildOrganizationTree,
  getUnitTypeLabel,
  getUnitTypeColor,
  getStatusColor,
  type OrganizationUnit,
  type UnitType
} from '../../data/mockOrganizationUnits';

type TreeNode = OrganizationUnit & { children?: TreeNode[] };

export default function OrganizationUnitManagement() {
  const navigate = useNavigate();
  const [units] = useState<OrganizationUnit[]>(mockOrganizationUnits);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1'])); // Root expanded by default
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>('1');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const tree = buildOrganizationTree(units);
  const selectedUnit = selectedUnitId ? units.find(u => u.id === selectedUnitId) : null;

  const toggleNode = (unitId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId);
    } else {
      newExpanded.add(unitId);
    }
    setExpandedNodes(newExpanded);
  };

  const getUnitIcon = (type: UnitType) => {
    const icons = {
      'legal-entity': Shield,
      'regional-office': MapPin,
      'sub-agency': Briefcase,
      'department': Layers,
    };
    return icons[type];
  };

  const filteredUnits = units.filter(unit =>
    unit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTreeNode = (node: TreeNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedUnitId === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const Icon = getUnitIcon(node.unitType);

    // If searching, only show matching nodes
    if (searchQuery && !filteredUnits.find(u => u.id === node.id)) {
      return null;
    }

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
            isSelected
              ? 'bg-[#FEF2F2] border border-[#D9480F]'
              : 'hover:bg-[#F9FAFB]'
          }`}
          style={{ paddingLeft: `${depth * 24 + 12}px` }}
          onClick={() => setSelectedUnitId(node.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
              className="w-5 h-5 flex items-center justify-center text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-5" />}
          
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isSelected ? 'bg-[#D9480F]' : 'bg-[#F9FAFB]'
          }`}>
            <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#6B7280]'}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${
              isSelected ? 'text-[#D9480F]' : 'text-[#111827]'
            }`}>
              {node.name}
            </p>
            <p className="text-xs text-[#6B7280] truncate">
              {getUnitTypeLabel(node.unitType)}
            </p>
          </div>

          {node.status === 'inactive' && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
              Inactive
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#F9FAFB]">
      {/* Left Panel - Tree View */}
      <div className="lg:w-[400px] bg-white border-b lg:border-b-0 lg:border-r border-[#E5E7EB] flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-[#111827]">Organization Units</h2>
              <p className="text-sm text-[#6B7280] mt-1">{units.length} total units</p>
            </div>
            <button
              onClick={() => navigate('/organization-units/new')}
              className="flex items-center gap-2 px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Unit</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search units..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[44px] pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>
        </div>

        {/* Tree */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {tree.map(node => renderTreeNode(node))}
        </div>
      </div>

      {/* Right Panel - Details */}
      <div className="flex-1 overflow-y-auto">
        {selectedUnit ? (
          <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Header */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-[#111827] mb-2">{selectedUnit.name}</h1>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getUnitTypeColor(selectedUnit.unitType)}`}>
                        {getUnitTypeLabel(selectedUnit.unitType)}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getStatusColor(selectedUnit.status)}`}>
                        {selectedUnit.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/organization-units/${selectedUnit.id}/edit`)}
                    className="flex items-center gap-2 px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => navigate(`/organization-units/${selectedUnit.id}`)}
                    className="flex items-center gap-2 px-4 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Details</span>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="p-4 bg-[#F9FAFB] rounded-lg">
                  <p className="text-xs text-[#6B7280] mb-1">Campaigns</p>
                  <p className="text-2xl font-semibold text-[#111827]">{selectedUnit.totalCampaigns}</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-lg">
                  <p className="text-xs text-[#6B7280] mb-1">Media</p>
                  <p className="text-2xl font-semibold text-[#111827]">{selectedUnit.totalMedia}</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-lg">
                  <p className="text-xs text-[#6B7280] mb-1">Playlists</p>
                  <p className="text-2xl font-semibold text-[#111827]">{selectedUnit.totalPlaylists}</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-lg">
                  <p className="text-xs text-[#6B7280] mb-1">Kiosks</p>
                  <p className="text-2xl font-semibold text-[#111827]">{selectedUnit.totalKiosks}</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-lg">
                  <p className="text-xs text-[#6B7280] mb-1">Users</p>
                  <p className="text-2xl font-semibold text-[#111827]">{selectedUnit.totalUsers}</p>
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Configuration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Timezone</p>
                  <p className="font-medium text-[#111827]">{selectedUnit.timezone}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Currency</p>
                  <p className="font-medium text-[#111827]">{selectedUnit.currency}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Created Date</p>
                  <p className="font-medium text-[#111827]">
                    {new Date(selectedUnit.createdDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7280] mb-1">Created By</p>
                  <p className="font-medium text-[#111827]">{selectedUnit.createdBy}</p>
                </div>
              </div>
            </div>

            {/* Billing Information (only for legal entities) */}
            {selectedUnit.unitType === 'legal-entity' && selectedUnit.billingInformation && (
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-[#D9480F]" />
                  <h3 className="font-semibold text-[#111827]">Legal & Billing Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Legal Company Name</p>
                    <p className="font-medium text-[#111827]">{selectedUnit.billingInformation.legalCompanyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Tax ID</p>
                    <p className="font-medium text-[#111827]">{selectedUnit.billingInformation.taxId}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm text-[#6B7280] mb-1">Billing Address</p>
                    <p className="font-medium text-[#111827]">{selectedUnit.billingInformation.billingAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Invoice Email</p>
                    <p className="font-medium text-[#111827]">{selectedUnit.billingInformation.invoiceEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Country / Region</p>
                    <p className="font-medium text-[#111827]">
                      {selectedUnit.billingInformation.country}, {selectedUnit.billingInformation.region}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* User Assignments */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#D9480F]" />
                  <h3 className="font-semibold text-[#111827]">Assigned Users</h3>
                  <span className="text-sm text-[#6B7280]">({selectedUnit.userAssignments.length})</span>
                </div>
                <button
                  onClick={() => navigate(`/organization-units/${selectedUnit.id}/access`)}
                  className="text-sm text-[#D9480F] hover:text-[#C23D0D] font-medium"
                >
                  Manage Access
                </button>
              </div>

              <div className="space-y-2">
                {selectedUnit.userAssignments.length > 0 ? (
                  selectedUnit.userAssignments.map((assignment) => (
                    <div
                      key={assignment.userId}
                      className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-[#111827] text-sm">{assignment.userName}</p>
                        <p className="text-xs text-[#6B7280]">{assignment.userEmail}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium rounded-md">
                        {assignment.accessLevel === 'admin' ? 'Administrator' : assignment.accessLevel === 'manage' ? 'Manage' : 'View Only'}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                    <p className="text-sm text-[#6B7280]">No users assigned to this unit</p>
                  </div>
                )}
              </div>
            </div>

            {/* Warning for deletion */}
            {(selectedUnit.totalCampaigns > 0 || selectedUnit.totalMedia > 0 || selectedUnit.totalPlaylists > 0 || selectedUnit.totalKiosks > 0) && (
              <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-[#DC2626] mb-1">Cannot Delete This Unit</p>
                  <p className="text-sm text-[#991B1B]">
                    This unit has active resources (campaigns, media, playlists, or kiosks). 
                    Please reassign or remove all resources before deleting.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Building2 className="w-16 h-16 text-[#9CA3AF] mb-4" />
            <h3 className="font-semibold text-[#111827] mb-2">No Unit Selected</h3>
            <p className="text-sm text-[#6B7280]">
              Select an organization unit from the tree to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}