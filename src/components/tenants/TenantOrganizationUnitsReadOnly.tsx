import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Lock,
  Building2,
  Network,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { mockTenants } from '../../data/mockTenants';

export default function TenantOrganizationUnitsReadOnly() {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  
  const tenant = mockTenants.find(t => t.id === tenantId);
  
  if (!tenant) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#F9FAFB] p-8">
        <Building2 className="w-16 h-16 text-[#9CA3AF] mb-4" />
        <h2 className="text-xl font-semibold text-[#111827] mb-2">Tenant Not Found</h2>
        <p className="text-[#6B7280] mb-6">The tenant you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/tenants')}
          className="flex items-center gap-2 px-6 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Tenants</span>
        </button>
      </div>
    );
  }

  if (!tenant.organizationUnits || tenant.organizationUnits.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#F9FAFB]">
        {/* Header */}
        <div className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4">
            {/* Back Button */}
            <button
              onClick={() => navigate(`/tenants/${tenantId}`)}
              className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] transition-colors w-fit"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Tenant Details</span>
            </button>

            {/* Title */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[#111827]">Organization Units (Read-only)</h1>
                <Lock className="w-6 h-6 text-[#6B7280]" />
              </div>
              <p className="text-[#6B7280]">
                Viewing organization structure for: <span className="font-medium text-[#111827]">{tenant.companyName}</span>
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <Lock className="w-4 h-4 text-[#9CA3AF]" />
                <p className="text-sm text-[#9CA3AF]">Organization Units are managed by the tenant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Network className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
            <h3 className="font-semibold text-[#111827] mb-2">No Organization Units</h3>
            <p className="text-[#6B7280] mb-1">This tenant hasn't configured any organization units yet.</p>
            <p className="text-sm text-[#9CA3AF]">Organization structure is managed by the tenant admin.</p>
          </div>
        </div>
      </div>
    );
  }

  // Build hierarchy tree
  const buildTree = () => {
    const units = tenant.organizationUnits || [];
    const rootUnits = units.filter(u => !u.parentId);
    
    const buildChildren = (parentId: string): typeof units => {
      return units.filter(u => u.parentId === parentId);
    };
    
    const renderUnit = (unit: typeof units[0], level: number = 0) => {
      const children = buildChildren(unit.id);
      const hasChildren = children.length > 0;
      
      return (
        <div key={unit.id} className="mb-2">
          <div 
            className={`flex items-center justify-between p-4 rounded-lg border border-[#E5E7EB] bg-white hover:border-[#D9480F] transition-colors ${
              level > 0 ? 'ml-' + (level * 8) : ''
            }`}
            style={{ marginLeft: level * 32 }}
          >
            <div className="flex items-center gap-3 flex-1">
              {level > 0 && (
                <div className="flex items-center gap-1">
                  <div className="w-6 h-px bg-[#E5E7EB]" />
                  <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                </div>
              )}
              <Building2 className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
              <div>
                <p className="font-medium text-[#111827]">{unit.name}</p>
                {unit.parentId && (
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Parent: {units.find(u => u.id === unit.parentId)?.name || 'Unknown'}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm font-medium text-[#111827]">{unit.screensCount}</p>
                <p className="text-xs text-[#6B7280]">Screens</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-[#111827]">{unit.campaignsCount}</p>
                <p className="text-xs text-[#6B7280]">Campaigns</p>
              </div>
              <div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  unit.status === 'active' 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-gray-50 text-gray-700'
                }`}>
                  {unit.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
          
          {hasChildren && (
            <div className="mt-2">
              {children.map(child => renderUnit(child, level + 1))}
            </div>
          )}
        </div>
      );
    };
    
    return (
      <div className="space-y-2">
        {rootUnits.map(unit => renderUnit(unit))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col gap-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/tenants/${tenantId}`)}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Tenant Details</span>
          </button>

          {/* Title */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-[#111827]">Organization Units (Read-only)</h1>
              <Lock className="w-6 h-6 text-[#6B7280]" />
            </div>
            <p className="text-[#6B7280]">
              Viewing organization structure for: <span className="font-medium text-[#111827]">{tenant.companyName}</span>
            </p>
            <p className="text-sm text-[#9CA3AF] mt-1">
              You are viewing tenant-managed structure in read-only mode.
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <Lock className="w-4 h-4 text-[#9CA3AF]" />
              <p className="text-sm text-[#9CA3AF]">Organization Units are managed by the tenant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Read-Only Banner */}
      <div className="bg-[#FEF3C7] border-b border-[#FDE68A] px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#92400E]">Read-Only View</p>
            <p className="text-sm text-[#92400E]">
              You are viewing the tenant's organization structure. Only the tenant can create, edit, or delete organization units.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Network className="w-5 h-5 text-indigo-600" />
                <p className="text-sm font-medium text-[#6B7280]">Total Units</p>
              </div>
              <p className="text-2xl font-semibold text-[#111827]">{tenant.totalOrgUnits || tenant.organizationUnits.length}</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-medium text-[#6B7280]">Hierarchy Depth</p>
              </div>
              <p className="text-2xl font-semibold text-[#111827]">{tenant.hierarchyDepth || 1} Level{tenant.hierarchyDepth !== 1 ? 's' : ''}</p>
            </div>

            {tenant.largestOrgUnit && (
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronRight className="w-5 h-5 text-purple-600" />
                  <p className="text-sm font-medium text-[#6B7280]">Largest Unit</p>
                </div>
                <p className="text-sm font-medium text-[#111827] line-clamp-1">{tenant.largestOrgUnit}</p>
              </div>
            )}
          </div>

          {/* Organization Hierarchy */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-[#111827]">Organization Hierarchy</h3>
                <p className="text-sm text-[#6B7280] mt-1">Nested structure showing parent-child relationships</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                <Lock className="w-3.5 h-3.5" />
                <span>Read-only</span>
              </div>
            </div>
            
            {buildTree()}
          </div>
        </div>
      </div>
    </div>
  );
}