import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Building2,
  Users,
  Monitor,
  HardDrive,
  Target,
  CreditCard,
  Ban,
  Package,
  UserCog,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  Shield,
  AlertTriangle,
  Save,
  X,
  Edit2,
  CheckCircle2,
  Database,
  FileText,
  Film
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { 
  mockTenants,
  getEditionLabel,
  getEditionColor,
  getStatusLabel,
  getStatusColor,
  getBillingStatusLabel,
  getBillingStatusColor,
  type TenantStatus,
  type TenantEdition 
} from '../../data/mockTenants';

export default function TenantDetails() {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  
  const tenant = mockTenants.find(t => t.id === tenantId);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    companyName: tenant?.companyName || '',
    primaryAdminEmail: tenant?.primaryAdminEmail || '',
    contactPhone: tenant?.contactPhone || '',
    address: tenant?.address || '',
    region: tenant?.region || '',
    timezone: tenant?.timezone || '',
  });

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TenantStatus | null>(null);
  const [showChangePackageModal, setShowChangePackageModal] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState<TenantEdition | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [understandConsequences, setUnderstandConsequences] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleSave = () => {
    setTimeout(() => {
      toast.success('Tenant information updated successfully');
      setIsEditing(false);
    }, 500);
  };

  const handleCancel = () => {
    setEditedData({
      companyName: tenant.companyName,
      primaryAdminEmail: tenant.primaryAdminEmail,
      contactPhone: tenant.contactPhone || '',
      address: tenant.address || '',
      region: tenant.region,
      timezone: tenant.timezone,
    });
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus: TenantStatus) => {
    setSelectedStatus(newStatus);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (selectedStatus) {
      toast.success(`Tenant status changed to ${getStatusLabel(selectedStatus)}`);
      setShowStatusModal(false);
      setSelectedStatus(null);
    }
  };

  const confirmPackageChange = () => {
    if (selectedEdition) {
      toast.success(`Package changed to ${getEditionLabel(selectedEdition)}`);
      setShowChangePackageModal(false);
      setSelectedEdition(null);
    }
  };

  const handleImpersonate = () => {
    setIsImpersonating(true);
    toast.success('Impersonation mode activated', {
      description: `You are now viewing the platform as ${tenant.companyName}`,
      duration: 5000,
    });
  };

  const handleDeleteTenant = () => {
    setShowDeleteModal(true);
    setDeleteStep(1);
    setDeleteConfirmText('');
    setUnderstandConsequences(false);
  };

  const proceedToDeleteStep2 = () => {
    setDeleteStep(2);
    setDeleteConfirmText('');
  };

  const confirmDelete = () => {
    if (deleteConfirmText.toUpperCase() === 'DELETE') {
      toast.success('Tenant deleted successfully', {
        description: 'All associated data has been permanently removed',
      });
      setTimeout(() => {
        navigate('/tenants');
      }, 1000);
    }
  };

  const isDeleteConfirmValid = deleteConfirmText.toUpperCase() === 'DELETE';

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Impersonation Banner */}
      {isImpersonating && (
        <div className="bg-[#FEF3C7] border-b-2 border-[#F59E0B] px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
              <div>
                <p className="font-medium text-[#92400E]">Impersonation Mode Active</p>
                <p className="text-sm text-[#92400E]">You are viewing as {tenant.companyName}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsImpersonating(false);
                toast.info('Impersonation mode deactivated');
              }}
              className="flex items-center gap-2 px-4 h-[36px] bg-[#92400E] hover:bg-[#78350F] text-white rounded-lg transition-colors text-sm font-medium"
            >
              Exit Impersonation
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col gap-4">
          {/* Back Button */}
          <button
            onClick={() => navigate('/tenants')}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Tenants</span>
          </button>

          {/* Title and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#D9480F] to-[#C23D0D] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-[#111827] mb-2">{tenant.companyName}</h1>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-sm text-[#6B7280]">{tenant.tenantId}</span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getEditionColor(tenant.edition)}`}>
                    {getEditionLabel(tenant.edition)}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getStatusColor(tenant.status)}`}>
                    {getStatusLabel(tenant.status)}
                  </span>
                </div>
                <p className="text-sm text-[#6B7280]">
                  Created on {formatDate(tenant.createdDate)}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleImpersonate}
                disabled={isImpersonating}
                className="flex items-center justify-center gap-2 px-4 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserCog className="w-5 h-5" />
                <span>{isImpersonating ? 'Impersonating' : 'Impersonate'}</span>
              </button>
              <button
                onClick={() => {
                  setSelectedEdition(tenant.edition);
                  setShowChangePackageModal(true);
                }}
                className="flex items-center justify-center gap-2 px-4 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                <Package className="w-5 h-5" />
                <span>Change Package</span>
              </button>
              <button
                onClick={() => handleStatusChange('suspended')}
                className="flex items-center justify-center gap-2 px-4 h-[44px] border border-[#DC2626] bg-white text-[#DC2626] rounded-lg hover:bg-[#FEF2F2] transition-colors"
              >
                <Ban className="w-5 h-5" />
                <span>Suspend</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#111827]">{tenant.totalUsers}</p>
                  <p className="text-sm text-[#6B7280]">Total Users</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#111827]">{tenant.totalScreens}</p>
                  <p className="text-sm text-[#6B7280]">Total Screens</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <HardDrive className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#111827]">{tenant.storageUsedGB} GB</p>
                  <p className="text-sm text-[#6B7280]">Storage Used</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-[#111827]">{tenant.activeCampaigns}</p>
                  <p className="text-sm text-[#6B7280]">Active Campaigns</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-medium ${getBillingStatusColor(tenant.billingStatus)}`}>
                    {getBillingStatusLabel(tenant.billingStatus)}
                  </span>
                  <p className="text-sm text-[#6B7280] mt-1">Billing Status</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trial Warning */}
          {tenant.isTrial && tenant.trialEndsDate && (
            <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-[#92400E] mb-1">Trial Period</h4>
                <p className="text-sm text-[#92400E]">
                  This tenant is on a trial that expires on {formatDate(tenant.trialEndsDate)}
                </p>
              </div>
            </div>
          )}

          {/* Editable Tenant Information */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-[#111827]">Tenant Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 h-[36px] text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 h-[36px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span className="text-sm">Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 h-[36px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span className="text-sm">Save Changes</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#6B7280] mb-2">
                  <Building2 className="w-4 h-4" />
                  Company Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.companyName}
                    onChange={(e) => setEditedData({ ...editedData, companyName: e.target.value })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                ) : (
                  <p className="text-[#111827]">{tenant.companyName}</p>
                )}
              </div>

              {/* Primary Admin Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#6B7280] mb-2">
                  <Mail className="w-4 h-4" />
                  Primary Admin Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedData.primaryAdminEmail}
                    onChange={(e) => setEditedData({ ...editedData, primaryAdminEmail: e.target.value })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                ) : (
                  <p className="text-[#111827]">{tenant.primaryAdminEmail}</p>
                )}
              </div>

              {/* Contact Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#6B7280] mb-2">
                  <Phone className="w-4 h-4" />
                  Contact Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.contactPhone}
                    onChange={(e) => setEditedData({ ...editedData, contactPhone: e.target.value })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    placeholder="Not provided"
                  />
                ) : (
                  <p className="text-[#111827]">{tenant.contactPhone || 'Not provided'}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#6B7280] mb-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.address}
                    onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    placeholder="Not provided"
                  />
                ) : (
                  <p className="text-[#111827]">{tenant.address || 'Not provided'}</p>
                )}
              </div>

              {/* Region */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#6B7280] mb-2">
                  <Globe className="w-4 h-4" />
                  Region
                </label>
                {isEditing ? (
                  <select
                    value={editedData.region}
                    onChange={(e) => setEditedData({ ...editedData, region: e.target.value })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  >
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Latin America">Latin America</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Africa">Africa</option>
                  </select>
                ) : (
                  <p className="text-[#111827]">{tenant.region}</p>
                )}
              </div>

              {/* Timezone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#6B7280] mb-2">
                  <Clock className="w-4 h-4" />
                  Timezone
                </label>
                {isEditing ? (
                  <select
                    value={editedData.timezone}
                    onChange={(e) => setEditedData({ ...editedData, timezone: e.target.value })}
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                    <option value="Australia/Sydney">Sydney (AEDT)</option>
                  </select>
                ) : (
                  <p className="text-[#111827]">{tenant.timezone}</p>
                )}
              </div>
            </div>
          </div>

          {/* User Hierarchy Overview */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-[#111827] mb-1">User Hierarchy</h3>
                <p className="text-sm text-[#6B7280]">Overview of users within this tenant</p>
              </div>
              <button
                onClick={() => navigate(`/users?tenant=${tenant.id}`)}
                className="flex items-center gap-2 px-4 h-[36px] text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm">View All Users</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-[#E5E7EB] rounded-lg p-4">
                <p className="text-sm text-[#6B7280] mb-1">Primary Admin</p>
                <p className="font-medium text-[#111827]">{tenant.primaryAdminName}</p>
                <p className="text-sm text-[#6B7280]">{tenant.primaryAdminEmail}</p>
              </div>
              <div className="border border-[#E5E7EB] rounded-lg p-4">
                <p className="text-sm text-[#6B7280] mb-1">Total Users</p>
                <p className="text-2xl font-semibold text-[#111827]">{tenant.totalUsers}</p>
              </div>
              <div className="border border-[#E5E7EB] rounded-lg p-4">
                <p className="text-sm text-[#6B7280] mb-1">Role Distribution</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#F9FAFB] text-[#6B7280]">
                    Admin: 3
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#F9FAFB] text-[#6B7280]">
                    Manager: 8
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#F9FAFB] text-[#6B7280]">
                    Viewer: 13
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Management */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <h3 className="font-semibold text-[#111827] mb-4">Tenant Status Management</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {(['trial', 'active', 'suspended', 'expired', 'archived'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={tenant.status === status}
                  className={`p-3 border-2 rounded-lg text-left transition-all ${
                    tenant.status === status
                      ? 'border-[#D9480F] bg-[#FEF2F2] cursor-default'
                      : 'border-[#E5E7EB] hover:border-[#D9480F] hover:bg-[#F9FAFB] cursor-pointer'
                  } disabled:opacity-50`}
                >
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium ${getStatusColor(status)}`}>
                    {getStatusLabel(status)}
                  </span>
                  {tenant.status === status && (
                    <p className="text-xs text-[#6B7280] mt-2">Current</p>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-4 p-4 bg-[#F9FAFB] rounded-lg">
              <p className="text-sm text-[#6B7280]">
                <strong>Note:</strong> Changing tenant status will affect access and data visibility. Suspended tenants lose access but data remains intact. Archived tenants are read-only.
              </p>
            </div>
          </div>

          {/* Security & Audit */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[#111827]">Security & Audit</h3>
                <p className="text-sm text-[#6B7280]">Security metrics and recent activity</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-[#6B7280] mb-3">Access Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#6B7280]">Last Login</span>
                    <span className="text-sm font-medium text-[#111827]">{formatLastLogin(tenant.lastLogin)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#6B7280]">Failed Login Attempts</span>
                    <span className={`text-sm font-medium ${tenant.failedLoginAttempts > 0 ? 'text-[#DC2626]' : 'text-[#16A34A]'}`}>
                      {tenant.failedLoginAttempts}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#6B7280]">MFA Enforced</span>
                    <span className={`text-sm font-medium ${tenant.mfaEnforced ? 'text-[#16A34A]' : 'text-[#F59E0B]'}`}>
                      {tenant.mfaEnforced ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-[#6B7280] mb-3">Recent Admin Actions</h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="text-[#111827]">User created: john.doe@example.com</p>
                    <p className="text-[#6B7280]">2 hours ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-[#111827]">Campaign launched: Holiday Sale 2025</p>
                    <p className="text-[#6B7280]">1 day ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-[#111827]">Kiosk added: Mall of America - Screen 3</p>
                    <p className="text-[#6B7280]">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white border-2 border-[#DC2626] rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[#DC2626] mb-1">Danger Zone</h3>
                <p className="text-sm text-[#6B7280]">Irreversible and destructive actions</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#FEF2F2] rounded-lg">
                <div>
                  <p className="font-medium text-[#111827] mb-1">Delete Tenant</p>
                  <p className="text-sm text-[#6B7280]">
                    Permanently delete this tenant and all associated data. This action cannot be undone.
                  </p>
                </div>
                <button
                  onClick={handleDeleteTenant}
                  className="flex items-center gap-2 px-4 h-[44px] bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg transition-colors whitespace-nowrap"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Tenant</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Change Confirmation Modal */}
      {showStatusModal && selectedStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowStatusModal(false)}
          />
          <div 
            className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold text-[#111827] mb-2">Confirm Status Change</h3>
            <p className="text-[#6B7280] mb-6">
              Are you sure you want to change the tenant status to{' '}
              <span className="font-medium">{getStatusLabel(selectedStatus)}</span>?
              This will affect the tenant's access to the platform.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedStatus(null);
                }}
                className="px-4 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className="px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Package Modal */}
      {showChangePackageModal && selectedEdition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowChangePackageModal(false)}
          />
          <div 
            className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold text-[#111827] mb-2">Change Package</h3>
            <p className="text-[#6B7280] mb-6">
              Select a new package for this tenant. Current package: <span className="font-medium">{getEditionLabel(tenant.edition)}</span>
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {(['starter', 'professional', 'enterprise', 'custom'] as const).map((edition) => (
                <button
                  key={edition}
                  onClick={() => setSelectedEdition(edition)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    selectedEdition === edition
                      ? 'border-[#D9480F] bg-[#FEF2F2]'
                      : 'border-[#E5E7EB] hover:border-[#D9480F] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <p className={`font-medium mb-1 ${
                    selectedEdition === edition ? 'text-[#D9480F]' : 'text-[#111827]'
                  }`}>
                    {getEditionLabel(edition)}
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    {edition === 'starter' && 'For small businesses'}
                    {edition === 'professional' && 'For growing teams'}
                    {edition === 'enterprise' && 'For large organizations'}
                    {edition === 'custom' && 'Custom pricing plan'}
                  </p>
                </button>
              ))}
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowChangePackageModal(false);
                  setSelectedEdition(null);
                }}
                className="px-4 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPackageChange}
                className="px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Tenant Modal - Multi-Step */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setShowDeleteModal(false);
              setDeleteStep(1);
              setDeleteConfirmText('');
              setUnderstandConsequences(false);
            }}
          />
          <div 
            className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {deleteStep === 1 ? (
              // Step 1: Impact Assessment
              <div className="p-6">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#DC2626] mb-1">Delete Tenant: {tenant.companyName}</h3>
                    <p className="text-sm text-[#6B7280]">This action is permanent and cannot be undone</p>
                  </div>
                </div>

                <div className="bg-[#FEF2F2] border-l-4 border-[#DC2626] p-4 mb-6">
                  <h4 className="font-semibold text-[#DC2626] mb-2">⚠️ Critical Warning</h4>
                  <p className="text-sm text-[#991B1B]">
                    You are about to permanently delete this tenant and ALL associated data. This includes:
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="border border-[#E5E7EB] rounded-lg p-4">
                    <h4 className="font-medium text-[#111827] mb-3">Data That Will Be Deleted</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-[#111827]">{tenant.totalUsers} Users</p>
                          <p className="text-xs text-[#6B7280]">All user accounts</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                          <Monitor className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-[#111827]">{tenant.totalScreens} Screens</p>
                          <p className="text-xs text-[#6B7280]">All screen devices</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                          <Target className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-[#111827]">{tenant.activeCampaigns} Campaigns</p>
                          <p className="text-xs text-[#6B7280]">All campaign data</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                          <Film className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-[#111827]">{tenant.storageUsedGB} GB</p>
                          <p className="text-xs text-[#6B7280]">All media files</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium text-[#111827]">All Reports</p>
                          <p className="text-xs text-[#6B7280]">Analytics & logs</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                          <Database className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-[#111827]">All Settings</p>
                          <p className="text-xs text-[#6B7280]">Configuration data</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-[#F59E0B] bg-[#FEF3C7] rounded-lg p-4">
                    <h4 className="font-medium text-[#92400E] mb-2">Financial Impact</h4>
                    <ul className="space-y-1 text-sm text-[#92400E]">
                      <li>• Active subscription will be cancelled immediately</li>
                      <li>• No refunds will be issued for remaining billing period</li>
                      <li>• All payment history will be archived (not deleted)</li>
                    </ul>
                  </div>

                  <div className="border border-[#E5E7EB] rounded-lg p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={understandConsequences}
                        onChange={(e) => setUnderstandConsequences(e.target.checked)}
                        className="w-5 h-5 mt-0.5 rounded border-[#D1D5DB] text-[#DC2626] focus:ring-[#DC2626] focus:ring-offset-0 flex-shrink-0"
                      />
                      <span className="text-sm text-[#111827]">
                        I understand that this action is <strong>permanent and irreversible</strong>, and all data listed above will be permanently deleted.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteStep(1);
                      setDeleteConfirmText('');
                      setUnderstandConsequences(false);
                    }}
                    className="px-6 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={proceedToDeleteStep2}
                    disabled={!understandConsequences}
                    className="px-6 h-[44px] bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Confirmation
                  </button>
                </div>
              </div>
            ) : (
              // Step 2: Final Confirmation
              <div className="p-6">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
                    <Trash2 className="w-6 h-6 text-[#DC2626]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#DC2626] mb-1">Final Confirmation Required</h3>
                    <p className="text-sm text-[#6B7280]">Type DELETE to confirm deletion</p>
                  </div>
                </div>

                <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg p-4 mb-6">
                  <p className="text-sm text-[#991B1B] mb-3">
                    This is your last chance to prevent permanent data loss.
                  </p>
                  <div className="bg-white border border-[#E5E7EB] rounded-lg p-3">
                    <p className="text-xs text-[#6B7280] mb-1">Tenant to be deleted:</p>
                    <p className="font-mono text-sm font-medium text-[#DC2626]">{tenant.companyName}</p>
                    <p className="font-mono text-xs text-[#6B7280]">{tenant.tenantId}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Type <span className="font-mono bg-[#FEE2E2] text-[#DC2626] px-2 py-0.5 rounded">DELETE</span> to confirm:
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="Type DELETE here"
                    className={`w-full h-[44px] px-4 border rounded-lg text-[#111827] focus:outline-none focus:ring-2 focus:border-transparent ${
                      deleteConfirmText && !isDeleteConfirmValid
                        ? 'border-[#DC2626] focus:ring-[#DC2626]'
                        : 'border-[#E5E7EB] focus:ring-[#D9480F]'
                    }`}
                  />
                  {deleteConfirmText && !isDeleteConfirmValid && (
                    <p className="mt-2 text-sm text-[#DC2626]">
                      Please type "DELETE" exactly as shown (in capital letters)
                    </p>
                  )}
                  {isDeleteConfirmValid && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-[#16A34A]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmation text matches</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setDeleteStep(1);
                      setDeleteConfirmText('');
                    }}
                    className="px-6 h-[44px] border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={!isDeleteConfirmValid}
                    className="px-6 h-[44px] bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Permanently Delete Tenant</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
