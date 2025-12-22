import { useState } from 'react';
import {
  Receipt,
  TrendingUp,
  FileText,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  IndianRupee,
  Users,
  Calendar,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockMediaInvoices,
  mockMediaBillingOverview,
  getMediaInvoiceStatusLabel,
  getMediaInvoiceStatusColor,
  formatCurrency,
  formatDate,
  type MediaInvoice,
} from '../../data/mockMediaBillingData';
import MediaInvoicePreview from './MediaInvoicePreview';

export default function MediaBilling() {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices'>('overview');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  const overview = mockMediaBillingOverview;
  const allInvoices = mockMediaInvoices;
  
  const filteredInvoices = filterStatus === 'all' 
    ? allInvoices 
    : allInvoices.filter(inv => inv.status === filterStatus);

  const handleDownloadInvoice = (invoiceNumber: string) => {
    toast.success(`Downloading invoice ${invoiceNumber}...`);
  };

  const handleViewInvoice = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F9FAFB]">
        {/* Header */}
        <div className="bg-white border-b border-[#E5E7EB]">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#16A34A] flex items-center justify-center flex-shrink-0">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-[#111827]">Media Billing</h1>
                  <p className="text-sm text-[#6B7280] mt-1">
                    Customer delivery charges and campaign-based invoices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
          {/* Tabs Container */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-[#E5E7EB]">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === 'overview'
                      ? 'text-[#16A34A] border-[#16A34A]'
                      : 'text-[#6B7280] border-transparent hover:text-[#111827]'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('invoices')}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === 'invoices'
                      ? 'text-[#16A34A] border-[#16A34A]'
                      : 'text-[#6B7280] border-transparent hover:text-[#111827]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Invoices ({allInvoices.length})
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-[#16A34A] to-[#15803D] rounded-lg p-6 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <IndianRupee className="w-5 h-5" />
                        <span className="text-sm opacity-90">Total Revenue</span>
                      </div>
                      <div className="text-2xl font-semibold">
                        {formatCurrency(overview.totalRevenue, overview.currency)}
                      </div>
                    </div>

                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-[#F59E0B]" />
                        <span className="text-sm text-[#6B7280]">Pending</span>
                      </div>
                      <div className="text-2xl font-semibold text-[#111827]">
                        {formatCurrency(overview.pendingAmount, overview.currency)}
                      </div>
                    </div>

                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-[#DC2626]" />
                        <span className="text-sm text-[#6B7280]">Overdue</span>
                      </div>
                      <div className="text-2xl font-semibold text-[#111827]">
                        {formatCurrency(overview.overdueAmount, overview.currency)}
                      </div>
                    </div>

                    <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-[#6B7280]" />
                        <span className="text-sm text-[#6B7280]">Total Invoices</span>
                      </div>
                      <div className="text-2xl font-semibold text-[#111827]">
                        {overview.totalInvoices}
                      </div>
                    </div>
                  </div>

                  {/* Top Clients */}
                  <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-[#6B7280]" />
                      <h3 className="font-semibold text-[#111827]">Top Clients</h3>
                    </div>
                    <div className="space-y-3">
                      {overview.topClients.map((client) => (
                        <div
                          key={client.clientId}
                          className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-[#111827]">{client.clientName}</div>
                            <div className="text-sm text-[#6B7280]">
                              {client.invoiceCount} {client.invoiceCount === 1 ? 'invoice' : 'invoices'}
                            </div>
                          </div>
                          <div className="font-semibold text-[#111827]">
                            {formatCurrency(client.totalBilled, overview.currency)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info Card */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          About Media Billing
                        </h4>
                        <p className="text-sm text-blue-800">
                          This module tracks customer delivery charges based on campaign playback. 
                          Invoices are generated based on hours run, screens used, and regions covered. 
                          For platform subscription fees, visit Billing & Subscription in your account settings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'invoices' && (
                <div className="space-y-6">
                  {/* Filter Bar */}
                  <div className="flex items-center gap-3">
                    <Filter className="w-4 h-4 text-[#6B7280]" />
                    <span className="text-sm text-[#6B7280]">Filter:</span>
                    <div className="flex gap-2">
                      {['all', 'paid', 'pending', 'overdue'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setFilterStatus(status as any)}
                          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                            filterStatus === status
                              ? 'bg-[#16A34A] text-white border-[#16A34A]'
                              : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#16A34A]'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Invoices List */}
                  <div className="space-y-4">
                    {filteredInvoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="border border-[#E5E7EB] rounded-lg p-6 hover:border-[#16A34A] transition-colors"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-[#111827]">
                                {invoice.invoiceNumber}
                              </h4>
                              <span
                                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-medium ${getMediaInvoiceStatusColor(
                                  invoice.status
                                )}`}
                              >
                                {getStatusIcon(invoice.status)}
                                {getMediaInvoiceStatusLabel(invoice.status)}
                              </span>
                            </div>
                            <div className="text-sm text-[#6B7280]">
                              {invoice.clientName} • {invoice.period}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-semibold text-[#111827]">
                              {formatCurrency(invoice.total, invoice.currency)}
                            </div>
                            <div className="text-sm text-[#6B7280] mt-1">
                              Due: {formatDate(invoice.dueDate)}
                            </div>
                          </div>
                        </div>

                        {/* Campaign Summary */}
                        <div className="bg-[#F9FAFB] rounded-lg p-4 mb-4">
                          <div className="text-xs font-medium text-[#6B7280] uppercase mb-2">
                            Campaign Summary
                          </div>
                          <div className="space-y-2">
                            {invoice.campaigns.map((campaign, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-sm"
                              >
                                <div>
                                  <div className="font-medium text-[#111827]">
                                    {campaign.campaignName}
                                  </div>
                                  <div className="text-xs text-[#6B7280]">
                                    {campaign.hoursRun}h • {campaign.screensUsed} screens • {campaign.regions.join(', ')}
                                  </div>
                                </div>
                                <div className="font-medium text-[#111827]">
                                  {formatCurrency(campaign.totalAmount, invoice.currency)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewInvoice(invoice.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] transition-colors text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleDownloadInvoice(invoice.invoiceNumber)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] text-[#111827] rounded-lg hover:border-[#16A34A] transition-colors text-sm font-medium"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      </div>
                    ))}

                    {filteredInvoices.length === 0 && (
                      <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                        <p className="text-[#6B7280]">No invoices found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      {selectedInvoiceId && (
        <MediaInvoicePreview
          invoiceId={selectedInvoiceId}
          onClose={() => setSelectedInvoiceId(null)}
        />
      )}
    </>
  );
}
