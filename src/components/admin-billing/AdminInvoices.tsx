import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Download,
  Eye,
  Mail,
  CreditCard,
  CheckCircle,
  FileText,
  AlertCircle,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockAdminBillingData,
  formatCurrency,
  getStatusColor,
  getStatusLabel,
  type Invoice,
} from '../../data/mockAdminBillingData';

export default function AdminInvoices() {
  const navigate = useNavigate();
  const [billingData] = useState(mockAdminBillingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const { invoices, tenantBillings } = billingData;

  // Get tenant name for invoice
  const getTenantName = (tenantId: string): string => {
    const tenant = tenantBillings.find((t) => t.tenantId === tenantId);
    return tenant?.tenantName || 'Unknown';
  };

  // Filter invoices
  const filteredInvoices = invoices.filter((invoice) => {
    const tenantName = getTenantName(invoice.tenantId);
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.tenantId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleResendInvoice = (invoice: Invoice) => {
    toast.success(`Invoice ${invoice.invoiceNumber} resent`, {
      description: `Email sent to ${getTenantName(invoice.tenantId)}`,
    });
  };

  const handleApplyCreditNote = (invoice: Invoice) => {
    toast.success(`Credit note modal would open for ${invoice.invoiceNumber}`);
  };

  const handleMarkAsPaid = (invoice: Invoice) => {
    toast.error('Mark as paid requires confirmation and audit trail', {
      description: 'This action is restricted and requires super admin approval',
    });
  };

  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleDownloadPDF = (invoice: Invoice) => {
    toast.success(`Downloading ${invoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#111827]">Invoice Management</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Financial traceability and invoice operations
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
              placeholder="Search by invoice # or tenant..."
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
            <option value="void">Void</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E7EB]">
          <p className="text-sm text-[#6B7280]">
            Showing {filteredInvoices.length} of {invoices.length} invoices
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Invoice #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Issued Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Paid Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#6B7280]" />
                      <span className="font-medium text-[#111827]">{invoice.invoiceNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#111827]">{getTenantName(invoice.tenantId)}</p>
                    <p className="text-xs text-[#6B7280]">{invoice.tenantId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#111827]">
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {getStatusLabel(invoice.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">
                      {new Date(invoice.issuedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">
                      {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">
                      {invoice.paidDate
                        ? new Date(invoice.paidDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewDetails(invoice)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(invoice)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleResendInvoice(invoice)}
                        className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        title="Resend Invoice"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      {invoice.status === 'paid' && (
                        <button
                          onClick={() => handleApplyCreditNote(invoice)}
                          className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                          title="Apply Credit Note"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                      )}
                      {invoice.status === 'pending' && (
                        <button
                          onClick={() => handleMarkAsPaid(invoice)}
                          className="p-2 text-[#6B7280] hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark as Paid (Restricted)"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-[#E5E7EB]">
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-[#6B7280]" />
                    <p className="font-medium text-[#111827]">{invoice.invoiceNumber}</p>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-2">{getTenantName(invoice.tenantId)}</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${getStatusColor(
                      invoice.status
                    )}`}
                  >
                    {getStatusLabel(invoice.status)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#111827]">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Issued</p>
                  <p className="text-[#111827]">
                    {new Date(invoice.issuedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Due</p>
                  <p className="text-[#111827]">
                    {new Date(invoice.dueDate).toLocaleDateString('en-US', {
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
                  onClick={() => handleViewDetails(invoice)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleDownloadPDF(invoice)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                >
                  <Download className="w-4 h-4" />
                  PDF
                </button>
                <button
                  onClick={() => handleResendInvoice(invoice)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Resend
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-[#6B7280]">No invoices found matching your filters</p>
          </div>
        )}
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Sticky Header with Actions */}
            <div className="p-6 border-b border-[#E5E7EB] bg-white sticky top-0 z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-[#111827] mb-1">Invoice Preview</h3>
                  <p className="text-sm text-[#6B7280]">Full invoice details and payment history</p>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="flex-1 h-[44px] px-6 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => handleResendInvoice(selectedInvoice)}
                  className="h-[44px] px-6 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors font-medium inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Resend Email
                </button>
                <button
                  onClick={() => handleDownloadPDF(selectedInvoice)}
                  className="flex-1 h-[44px] px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors font-medium inline-flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>

            {/* Scrollable Invoice Content */}
            <div className="overflow-y-auto flex-1">{/* Invoice Preview - Professional Design */}
              <div className="p-8 bg-[#F9FAFB]">
                <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm">
                  {/* Invoice Header */}
                  <div className="p-8 border-b border-[#E5E7EB]">
                    <div className="flex items-start justify-between mb-8">
                      {/* Company Logo & Info */}
                      <div>
                        <div className="w-12 h-12 bg-[#D9480F] rounded-lg flex items-center justify-center mb-4">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-semibold text-[#111827] mb-1">Elextrify</h2>
                        <p className="text-sm text-[#6B7280]">Digital Out-of-Home Platform</p>
                        <div className="mt-3 text-sm text-[#6B7280] space-y-0.5">
                          <p>123 Innovation Street</p>
                          <p>San Francisco, CA 94103</p>
                          <p>support@elextrify.com</p>
                          <p>+1 (555) 123-4567</p>
                        </div>
                      </div>

                      {/* Invoice Number & Status */}
                      <div className="text-right">
                        <div className="mb-4">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(
                              selectedInvoice.status
                            )}`}
                          >
                            {getStatusLabel(selectedInvoice.status)}
                          </span>
                        </div>
                        <h3 className="text-3xl font-semibold text-[#111827] mb-1">
                          {selectedInvoice.invoiceNumber}
                        </h3>
                        <p className="text-sm text-[#6B7280]">Invoice</p>
                      </div>
                    </div>

                    {/* Billing Info Grid */}
                    <div className="grid grid-cols-2 gap-8">
                      {/* Bill To */}
                      <div>
                        <h4 className="text-xs font-medium text-[#6B7280] uppercase mb-2">Bill To</h4>
                        <div className="text-sm">
                          <p className="font-medium text-[#111827] mb-1">
                            {getTenantName(selectedInvoice.tenantId)}
                          </p>
                          <p className="text-[#6B7280]">{selectedInvoice.tenantId}</p>
                          <p className="text-[#6B7280] mt-2">billing@{getTenantName(selectedInvoice.tenantId).toLowerCase().replace(/\s/g, '')}.com</p>
                        </div>
                      </div>

                      {/* Invoice Details */}
                      <div>
                        <h4 className="text-xs font-medium text-[#6B7280] uppercase mb-2">Invoice Details</h4>
                        <div className="text-sm space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-[#6B7280]">Issue Date:</span>
                            <span className="text-[#111827] font-medium">
                              {new Date(selectedInvoice.issuedDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#6B7280]">Due Date:</span>
                            <span className="text-[#111827] font-medium">
                              {new Date(selectedInvoice.dueDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          {selectedInvoice.paidDate && (
                            <div className="flex justify-between">
                              <span className="text-[#6B7280]">Paid Date:</span>
                              <span className="text-green-600 font-medium">
                                {new Date(selectedInvoice.paidDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-[#6B7280]">Payment Terms:</span>
                            <span className="text-[#111827] font-medium">Net 30</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="p-8">
                    <h4 className="text-sm font-medium text-[#111827] mb-4">Invoice Items</h4>
                    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-[#F9FAFB]">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                              Description
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-[#6B7280] uppercase">
                              Quantity
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                              Unit Price
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB]">
                          {selectedInvoice.lineItems.map((item, idx) => (
                            <tr key={idx} className="hover:bg-[#F9FAFB]/50 transition-colors">
                              <td className="px-4 py-4">
                                <p className="text-sm font-medium text-[#111827]">{item.description}</p>
                                <p className="text-xs text-[#6B7280] mt-0.5">
                                  Subscription period: {new Date(selectedInvoice.issuedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </p>
                              </td>
                              <td className="px-4 py-4 text-center text-sm text-[#111827]">
                                {item.quantity}
                              </td>
                              <td className="px-4 py-4 text-right text-sm text-[#111827]">
                                {formatCurrency(item.unitPrice, selectedInvoice.currency)}
                              </td>
                              <td className="px-4 py-4 text-right text-sm font-medium text-[#111827]">
                                {formatCurrency(item.amount, selectedInvoice.currency)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Totals */}
                    <div className="mt-6 flex justify-end">
                      <div className="w-80 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6B7280]">Subtotal:</span>
                          <span className="text-[#111827] font-medium">
                            {formatCurrency(selectedInvoice.amount * 0.9, selectedInvoice.currency)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6B7280]">Tax (10%):</span>
                          <span className="text-[#111827] font-medium">
                            {formatCurrency(selectedInvoice.amount * 0.1, selectedInvoice.currency)}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-[#E5E7EB]">
                          <div className="flex justify-between">
                            <span className="font-medium text-[#111827]">Total Due:</span>
                            <span className="text-2xl font-semibold text-[#D9480F]">
                              {formatCurrency(selectedInvoice.amount, selectedInvoice.currency)}
                            </span>
                          </div>
                        </div>
                        {selectedInvoice.status === 'paid' && (
                          <div className="pt-2 border-t border-[#E5E7EB]">
                            <div className="flex justify-between">
                              <span className="font-medium text-green-600">Amount Paid:</span>
                              <span className="text-xl font-semibold text-green-600">
                                {formatCurrency(selectedInvoice.amount, selectedInvoice.currency)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="px-8 pb-8">
                    <div className="bg-[#F9FAFB] rounded-lg p-6 border border-[#E5E7EB]">
                      <h4 className="text-sm font-medium text-[#111827] mb-3">Payment Information</h4>
                      <div className="grid grid-cols-2 gap-6 text-sm">
                        <div>
                          <p className="text-[#6B7280] mb-1">Payment Method</p>
                          <p className="text-[#111827] font-medium">Credit Card •••• 4242</p>
                        </div>
                        <div>
                          <p className="text-[#6B7280] mb-1">Currency</p>
                          <p className="text-[#111827] font-medium">{selectedInvoice.currency}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Attempts History */}
                  {selectedInvoice.paymentAttempts.length > 0 && (
                    <div className="px-8 pb-8">
                      <h4 className="text-sm font-medium text-[#111827] mb-4">Payment History</h4>
                      <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-[#F9FAFB]">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                                Date & Time
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                                Status
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                                Details
                              </th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E5E7EB]">
                            {selectedInvoice.paymentAttempts.map((attempt) => (
                              <tr key={attempt.id} className="hover:bg-[#F9FAFB]/50 transition-colors">
                                <td className="px-4 py-4 text-sm text-[#111827]">
                                  {new Date(attempt.attemptDate).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </td>
                                <td className="px-4 py-4">
                                  <div className="flex items-center gap-2">
                                    {attempt.status === 'success' ? (
                                      <>
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-medium text-green-600">Success</span>
                                      </>
                                    ) : (
                                      <>
                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                        <span className="text-sm font-medium text-red-600">Failed</span>
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-4">
                                  {attempt.failureReason ? (
                                    <p className="text-sm text-red-600">{attempt.failureReason}</p>
                                  ) : (
                                    <p className="text-sm text-green-600">Payment processed successfully</p>
                                  )}
                                </td>
                                <td className="px-4 py-4 text-right">
                                  <span className={`text-sm font-medium ${
                                    attempt.status === 'success' ? 'text-green-600' : 'text-[#111827]'
                                  }`}>
                                    {formatCurrency(attempt.amount, attempt.currency)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Footer Notes */}
                  <div className="px-8 pb-8">
                    <div className="border-t border-[#E5E7EB] pt-6">
                      <h4 className="text-sm font-medium text-[#111827] mb-2">Terms & Conditions</h4>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Payment is due within 30 days of invoice date. Late payments may incur additional charges. 
                        All amounts are in {selectedInvoice.currency}. For questions regarding this invoice, 
                        please contact our billing department at billing@elextrify.com.
                      </p>
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-xs text-[#6B7280]">
                        Thank you for your business! | Generated on {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}