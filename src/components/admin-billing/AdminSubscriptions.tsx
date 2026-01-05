import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Eye,
  Edit,
  Pause,
  Play,
  Ban,
  ArrowDownCircle,
  Calendar,
  DollarSign,
  X,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockAdminBillingData,
  formatCurrency,
  getStatusColor,
  getStatusLabel,
  type TenantBilling,
} from '../../data/mockAdminBillingData';
import { Pagination } from '../shared/Pagination';

type ModalType = 'change-plan' | 'downgrade' | 'pause' | 'resume' | 'cancel' | null;

export default function AdminSubscriptions() {
  const navigate = useNavigate();
  const [billingData] = useState(mockAdminBillingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editionFilter, setEditionFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal state
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedTenant, setSelectedTenant] = useState<TenantBilling | null>(null);
  
  // Change plan state
  const [selectedEdition, setSelectedEdition] = useState('');
  const [selectedCycle, setSelectedCycle] = useState('');
  const [applyImmediately, setApplyImmediately] = useState(false);
  
  // Downgrade state
  const [downgradeEdition, setDowngradeEdition] = useState('');
  const [downgradeDate, setDowngradeDate] = useState('');
  
  // Cancel state
  const [cancelReason, setCancelReason] = useState('');
  const [cancelImmediate, setCancelImmediate] = useState(false);
  const [refundOption, setRefundOption] = useState('none');

  const { tenantBillings } = billingData;

  // Filter subscriptions
  const filteredSubscriptions = tenantBillings.filter((tenant) => {
    const matchesSearch =
      tenant.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.tenantId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    const matchesEdition = editionFilter === 'all' || tenant.edition === editionFilter;
    return matchesSearch && matchesStatus && matchesEdition;
  });

  const openModal = (type: ModalType, tenant: TenantBilling) => {
    setSelectedTenant(tenant);
    setActiveModal(type);
    
    // Pre-populate form fields
    if (type === 'change-plan') {
      setSelectedEdition(tenant.edition);
      setSelectedCycle(tenant.billingCycle);
      setApplyImmediately(false);
    }
    if (type === 'downgrade') {
      setDowngradeEdition('');
      setDowngradeDate(tenant.nextInvoiceDate);
    }
    if (type === 'cancel') {
      setCancelReason('');
      setCancelImmediate(false);
      setRefundOption('none');
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedTenant(null);
    setSelectedEdition('');
    setSelectedCycle('');
    setApplyImmediately(false);
    setDowngradeEdition('');
    setDowngradeDate('');
    setCancelReason('');
    setCancelImmediate(false);
    setRefundOption('none');
  };

  const handleChangePlan = (tenant: TenantBilling) => {
    openModal('change-plan', tenant);
  };

  const handleScheduleDowngrade = (tenant: TenantBilling) => {
    openModal('downgrade', tenant);
  };

  const handlePause = (tenant: TenantBilling) => {
    openModal('pause', tenant);
  };

  const handleResume = (tenant: TenantBilling) => {
    openModal('resume', tenant);
  };

  const handleCancel = (tenant: TenantBilling) => {
    openModal('cancel', tenant);
  };

  // Confirm actions
  const confirmChangePlan = () => {
    if (!selectedTenant) return;
    
    toast.success(`Plan changed for ${selectedTenant.tenantName}`, {
      description: `New plan: ${selectedEdition} (${selectedCycle}). ${applyImmediately ? 'Applied immediately.' : 'Will take effect on next billing cycle.'}`,
    });
    closeModal();
  };

  const confirmDowngrade = () => {
    if (!selectedTenant) return;
    
    toast.success(`Downgrade scheduled for ${selectedTenant.tenantName}`, {
      description: `Will downgrade to ${downgradeEdition} on ${new Date(downgradeDate).toLocaleDateString()}`,
    });
    closeModal();
  };

  const confirmPause = () => {
    if (!selectedTenant) return;
    
    toast.success(`Subscription paused for ${selectedTenant.tenantName}`, {
      description: 'No charges will be made until resumed.',
    });
    closeModal();
  };

  const confirmResume = () => {
    if (!selectedTenant) return;
    
    toast.success(`Subscription resumed for ${selectedTenant.tenantName}`, {
      description: 'Billing will continue on next cycle.',
    });
    closeModal();
  };

  const confirmCancel = () => {
    if (!selectedTenant) return;
    
    toast.error(`Subscription cancelled for ${selectedTenant.tenantName}`, {
      description: `${cancelImmediate ? 'Cancelled immediately.' : 'Will cancel at end of billing period.'} ${refundOption !== 'none' ? `Refund: ${refundOption}` : ''}`,
    });
    closeModal();
  };

  // Calculate MRR per tenant
  const calculateMRR = (tenant: TenantBilling): number => {
    if (tenant.billingCycle === 'monthly') {
      return tenant.amount;
    }
    return Math.round(tenant.amount / 12);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubscriptions.slice(indexOfFirstItem, indexOfLastItem);

  const editions = [
    { name: 'Starter', price: { monthly: 49, yearly: 490 } },
    { name: 'Professional', price: { monthly: 149, yearly: 1490 } },
    { name: 'Enterprise', price: { monthly: 399, yearly: 3990 } },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#111827]">Subscription Management</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Operational control over all tenant subscriptions
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by tenant name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 h-[40px] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="past-due">Past Due</option>
            <option value="suspended">Suspended</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Edition Filter */}
          <select
            value={editionFilter}
            onChange={(e) => setEditionFilter(e.target.value)}
            className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
          >
            <option value="all">All Editions</option>
            <option value="Starter">Starter</option>
            <option value="Professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E7EB]">
          <p className="text-sm text-[#6B7280]">
            Showing {filteredSubscriptions.length} of {tenantBillings.length} subscriptions
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Edition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Cycle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Renewal Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Current MRR
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {currentItems.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[#111827]">{tenant.tenantName}</p>
                      <p className="text-xs text-[#6B7280]">{tenant.tenantId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-[#111827]">{tenant.edition}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280] capitalize">{tenant.billingCycle}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">
                      {new Date(tenant.subscriptionStartDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">
                      {new Date(tenant.nextInvoiceDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(
                        tenant.status
                      )}`}
                    >
                      {getStatusLabel(tenant.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#111827]">
                      {formatCurrency(calculateMRR(tenant), tenant.currency)}
                    </p>
                    <p className="text-xs text-[#6B7280]">/month</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/billing/${tenant.tenantId}`)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleChangePlan(tenant)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="Change Plan"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleScheduleDowngrade(tenant)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="Schedule Downgrade"
                      >
                        <ArrowDownCircle className="w-4 h-4" />
                      </button>
                      {tenant.status === 'active' ? (
                        <button
                          onClick={() => handlePause(tenant)}
                          className="p-2 text-[#6B7280] hover:text-orange-600 hover:bg-[#FFF7ED] rounded-lg transition-colors"
                          title="Pause Subscription"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : tenant.status === 'suspended' ? (
                        <button
                          onClick={() => handleResume(tenant)}
                          className="p-2 text-[#6B7280] hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Resume Subscription"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      ) : null}
                      <button
                        onClick={() => handleCancel(tenant)}
                        className="p-2 text-[#6B7280] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="Cancel Subscription"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-[#E5E7EB]">
          {currentItems.map((tenant) => (
            <div key={tenant.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-medium text-[#111827] mb-1">{tenant.tenantName}</p>
                  <p className="text-xs text-[#6B7280] mb-2">{tenant.tenantId}</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(
                      tenant.status
                    )}`}
                  >
                    {getStatusLabel(tenant.status)}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/admin/billing/${tenant.tenantId}`)}
                  className="p-2 text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Edition</p>
                  <p className="font-medium text-[#111827]">{tenant.edition}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">MRR</p>
                  <p className="font-medium text-[#111827]">
                    {formatCurrency(calculateMRR(tenant), tenant.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Start Date</p>
                  <p className="text-[#111827]">
                    {new Date(tenant.subscriptionStartDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Renewal</p>
                  <p className="text-[#111827]">
                    {new Date(tenant.nextInvoiceDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-[#E5E7EB]">
                <button
                  onClick={() => handleChangePlan(tenant)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Change
                </button>
                {tenant.status === 'active' ? (
                  <button
                    onClick={() => handlePause(tenant)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                  >
                    <Pause className="w-4 h-4" />
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={() => handleResume(tenant)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                  >
                    <Play className="w-4 h-4" />
                    Resume
                  </button>
                )}
                <button
                  onClick={() => handleCancel(tenant)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-red-600 rounded-lg hover:bg-[#FEF2F2] text-sm"
                >
                  <Ban className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredSubscriptions.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[#6B7280]">No subscriptions found matching your filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredSubscriptions.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredSubscriptions.length / itemsPerPage)}
          totalItems={filteredSubscriptions.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          startIndex={indexOfFirstItem}
          endIndex={Math.min(indexOfLastItem, filteredSubscriptions.length)}
        />
      )}
      
      {/* Modals */}
      {activeModal === 'change-plan' && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-[#111827]">Change Plan</h2>
              <button
                onClick={closeModal}
                className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Edition</label>
                <select
                  value={selectedEdition}
                  onChange={(e) => setSelectedEdition(e.target.value)}
                  className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                >
                  {editions.map((edition) => (
                    <option key={edition.name} value={edition.name}>
                      {edition.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Billing Cycle</label>
                <select
                  value={selectedCycle}
                  onChange={(e) => setSelectedCycle(e.target.value)}
                  className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={applyImmediately}
                  onChange={(e) => setApplyImmediately(e.target.checked)}
                  className="h-4 w-4 text-[#D9480F] focus:ring-[#D9480F] border-[#E5E7EB] rounded"
                />
                <label className="ml-2 text-sm text-[#6B7280]">Apply immediately</label>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmChangePlan}
                className="px-4 py-2 text-sm font-medium text-white bg-[#D9480F] rounded-lg hover:bg-[#C53030] transition-colors"
              >
                Change Plan
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeModal === 'downgrade' && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-[#111827]">Schedule Downgrade</h2>
              <button
                onClick={closeModal}
                className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Edition</label>
                <select
                  value={downgradeEdition}
                  onChange={(e) => setDowngradeEdition(e.target.value)}
                  className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                >
                  {editions.map((edition) => (
                    <option key={edition.name} value={edition.name}>
                      {edition.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Downgrade Date</label>
                <input
                  type="date"
                  value={downgradeDate}
                  onChange={(e) => setDowngradeDate(e.target.value)}
                  className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDowngrade}
                className="px-4 py-2 text-sm font-medium text-white bg-[#D9480F] rounded-lg hover:bg-[#C53030] transition-colors"
              >
                Schedule Downgrade
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeModal === 'pause' && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-[#111827]">Pause Subscription</h2>
              <button
                onClick={closeModal}
                className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-[#6B7280]">
                Are you sure you want to pause the subscription for {selectedTenant.tenantName}?
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPause}
                className="px-4 py-2 text-sm font-medium text-white bg-[#D9480F] rounded-lg hover:bg-[#C53030] transition-colors"
              >
                Pause Subscription
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeModal === 'resume' && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-[#111827]">Resume Subscription</h2>
              <button
                onClick={closeModal}
                className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-[#6B7280]">
                Are you sure you want to resume the subscription for {selectedTenant.tenantName}?
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmResume}
                className="px-4 py-2 text-sm font-medium text-white bg-[#D9480F] rounded-lg hover:bg-[#C53030] transition-colors"
              >
                Resume Subscription
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeModal === 'cancel' && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-[#111827]">Cancel Subscription</h2>
              <button
                onClick={closeModal}
                className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-[#6B7280]">
                Are you sure you want to cancel the subscription for {selectedTenant.tenantName}?
              </p>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={cancelImmediate}
                  onChange={(e) => setCancelImmediate(e.target.checked)}
                  className="h-4 w-4 text-[#D9480F] focus:ring-[#D9480F] border-[#E5E7EB] rounded"
                />
                <label className="ml-2 text-sm text-[#6B7280]">Cancel immediately</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Refund Option</label>
                <select
                  value={refundOption}
                  onChange={(e) => setRefundOption(e.target.value)}
                  className="h-[40px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                >
                  <option value="none">None</option>
                  <option value="full">Full Refund</option>
                  <option value="partial">Partial Refund</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6B7280]">Reason for Cancellation</label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="h-[80px] px-3 pr-8 border border-[#E5E7EB] rounded-lg text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 text-sm font-medium text-white bg-[#D9480F] rounded-lg hover:bg-[#C53030] transition-colors"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}