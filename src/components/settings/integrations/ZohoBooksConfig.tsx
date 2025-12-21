import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  Unlink,
  Shield,
  Activity,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function ZohoBooksConfig() {
  const navigate = useNavigate();
  
  // Mock connection state (TODO: Replace with actual API data)
  const [isConnected, setIsConnected] = useState(true);
  const [selectedOrganization, setSelectedOrganization] = useState('acme-corp');
  
  // Invoice sync settings
  const [autoSyncInvoices, setAutoSyncInvoices] = useState(true);
  const [syncOnInvoiceCreation, setSyncOnInvoiceCreation] = useState(true);
  const [syncOnPaymentSuccess, setSyncOnPaymentSuccess] = useState(true);
  const [syncOnRefund, setSyncOnRefund] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState('real-time');
  
  // Tax & Ledger mapping
  const [gstMapping, setGstMapping] = useState('default-gst');
  const [revenueLedger, setRevenueLedger] = useState('sales-revenue');
  const [creditMapping, setCreditMapping] = useState('credit-notes');
  const [discountMapping, setDiscountMapping] = useState('discounts');
  
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Zoho Books configuration saved successfully');
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    // TODO: Implement actual sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
    alert('Manual sync completed successfully');
  };

  const handleDisconnect = () => {
    setShowDisconnectDialog(false);
    setIsConnected(false);
    alert('Zoho Books integration disconnected');
    navigate('/settings/system/integrations');
  };

  const handleOAuthConnect = () => {
    // TODO: Implement OAuth flow
    alert('Opening Zoho Books OAuth authorization...');
  };

  // Mock sync logs (TODO: Replace with actual API data)
  const syncLogs = [
    { id: 1, timestamp: '2025-12-21 12:15', status: 'success', message: 'Synced 15 invoices successfully', count: 15 },
    { id: 2, timestamp: '2025-12-21 09:30', status: 'success', message: 'Synced 8 invoices successfully', count: 8 },
    { id: 3, timestamp: '2025-12-21 06:00', status: 'error', message: 'GST mapping not found for invoice #INV-2025-1234', count: 0 },
    { id: 4, timestamp: '2025-12-20 18:45', status: 'success', message: 'Synced 22 invoices successfully', count: 22 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings/system/integrations')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Integrations</span>
        </button>
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-green-50 flex items-center justify-center text-3xl">
              📚
            </div>
            <div>
              <h1 className="text-[#111827] mb-1">Zoho Books Configuration</h1>
              <p className="text-[#6B7280]">
                Auto-sync invoices, payments, and tax records with Zoho Books
              </p>
            </div>
          </div>
          
          {isConnected ? (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg">
              <CheckCircle className="w-4 h-4" />
              Connected
            </span>
          ) : (
            <button
              onClick={handleOAuthConnect}
              className="flex items-center gap-2 px-4 py-2 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Connect via OAuth
            </button>
          )}
        </div>
      </div>

      {!isConnected && (
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-900 font-medium mb-1">Not Connected</p>
              <p className="text-amber-700 text-sm">
                Click "Connect via OAuth" to authorize this platform to sync data with your Zoho Books account.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Configuration */}
        <div className="xl:col-span-2 space-y-6">
          {/* Authorization Section */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <h2 className="text-[#111827] font-medium mb-4">Authorization</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Connected Organization
                </label>
                <select
                  value={selectedOrganization}
                  onChange={(e) => setSelectedOrganization(e.target.value)}
                  disabled={!isConnected}
                  className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:cursor-not-allowed"
                >
                  <option value="acme-corp">Acme Corporation</option>
                  <option value="techstart">TechStart Inc.</option>
                  <option value="retail-co">Retail Co.</option>
                </select>
                <p className="mt-2 text-sm text-[#6B7280]">
                  Select the Zoho Books organization to sync with
                </p>
              </div>
            </div>
          </div>

          {/* Invoice Sync Rules */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <h2 className="text-[#111827] font-medium mb-4">Invoice Sync Rules</h2>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg cursor-pointer hover:bg-[#F3F4F6] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#111827]">Auto-sync Invoices</p>
                  <p className="text-xs text-[#6B7280] mt-1">Automatically sync invoices with Zoho Books</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoSyncInvoices}
                  onChange={(e) => setAutoSyncInvoices(e.target.checked)}
                  disabled={!isConnected}
                  className="w-5 h-5 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </label>

              {autoSyncInvoices && (
                <>
                  <div className="pl-4 space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={syncOnInvoiceCreation}
                        onChange={(e) => setSyncOnInvoiceCreation(e.target.checked)}
                        disabled={!isConnected}
                        className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                      />
                      <span className="text-sm text-[#111827]">On invoice creation</span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={syncOnPaymentSuccess}
                        onChange={(e) => setSyncOnPaymentSuccess(e.target.checked)}
                        disabled={!isConnected}
                        className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                      />
                      <span className="text-sm text-[#111827]">On payment success</span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={syncOnRefund}
                        onChange={(e) => setSyncOnRefund(e.target.checked)}
                        disabled={!isConnected}
                        className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                      />
                      <span className="text-sm text-[#111827]">On refund</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Sync Frequency
                    </label>
                    <select
                      value={syncFrequency}
                      onChange={(e) => setSyncFrequency(e.target.value)}
                      disabled={!isConnected}
                      className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:cursor-not-allowed"
                    >
                      <option value="real-time">Real-time (immediate)</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily (midnight)</option>
                      <option value="manual">Manual only</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tax & Ledger Mapping */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <h2 className="text-[#111827] font-medium mb-4">Tax & Ledger Mapping</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  GST Mapping
                </label>
                <select
                  value={gstMapping}
                  onChange={(e) => setGstMapping(e.target.value)}
                  disabled={!isConnected}
                  className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:cursor-not-allowed"
                >
                  <option value="default-gst">Default GST (18%)</option>
                  <option value="gst-5">GST 5%</option>
                  <option value="gst-12">GST 12%</option>
                  <option value="gst-18">GST 18%</option>
                  <option value="gst-28">GST 28%</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Revenue Ledger
                </label>
                <select
                  value={revenueLedger}
                  onChange={(e) => setRevenueLedger(e.target.value)}
                  disabled={!isConnected}
                  className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:cursor-not-allowed"
                >
                  <option value="sales-revenue">Sales Revenue</option>
                  <option value="subscription-revenue">Subscription Revenue</option>
                  <option value="service-revenue">Service Revenue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Credit Mapping
                </label>
                <select
                  value={creditMapping}
                  onChange={(e) => setCreditMapping(e.target.value)}
                  disabled={!isConnected}
                  className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:cursor-not-allowed"
                >
                  <option value="credit-notes">Credit Notes</option>
                  <option value="refunds">Refunds</option>
                  <option value="adjustments">Adjustments</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Discount Mapping
                </label>
                <select
                  value={discountMapping}
                  onChange={(e) => setDiscountMapping(e.target.value)}
                  disabled={!isConnected}
                  className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent disabled:bg-[#F9FAFB] disabled:cursor-not-allowed"
                >
                  <option value="discounts">Discounts</option>
                  <option value="promotional">Promotional Allowances</option>
                  <option value="sales-discount">Sales Discount</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sync Logs */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#111827] font-medium">Sync Logs</h2>
              <button
                onClick={handleManualSync}
                disabled={!isConnected || isSyncing}
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Manual Sync'}
              </button>
            </div>
            
            <div className="space-y-3">
              {syncLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-3 bg-[#F9FAFB] rounded-lg"
                >
                  {log.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-[#111827]">{log.message}</p>
                    <p className="text-xs text-[#6B7280] mt-1">{log.timestamp}</p>
                  </div>
                  {log.count > 0 && (
                    <span className="px-2 py-1 bg-white border border-[#E5E7EB] text-xs font-medium text-[#6B7280] rounded">
                      {log.count} items
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          {isConnected && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Configuration'}
              </button>
              
              <button
                onClick={() => navigate('/settings/system/integrations')}
                className="px-6 py-2.5 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Panel */}
          {isConnected && (
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-[#111827] font-medium mb-4">Sync Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#111827]">Connection Active</p>
                    <p className="text-xs text-[#6B7280] mt-1">OAuth token valid</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#111827]">Last Sync</p>
                    <p className="text-xs text-[#6B7280] mt-1">2025-12-21 12:15 IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#111827]">Invoices Synced</p>
                    <p className="text-xs text-[#6B7280] mt-1">1,247 total</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Actions */}
          {isConnected && (
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="text-[#111827] font-medium mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Integration Actions
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowDisconnectDialog(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-red-200 rounded-lg text-left hover:bg-red-50 transition-colors"
                >
                  <Unlink className="w-4 h-4 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-red-700">Disconnect</p>
                    <p className="text-xs text-red-600">Revoke authorization</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 font-medium text-sm mb-2">Need Help?</p>
            <p className="text-blue-700 text-xs leading-relaxed">
              Visit the <a href="#" className="underline">Zoho Books API documentation</a> to learn more about ledger mapping and tax configuration.
            </p>
          </div>
        </div>
      </div>

      {/* Disconnect Confirmation Dialog */}
      {showDisconnectDialog && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowDisconnectDialog(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-[#111827] font-medium mb-2">Disconnect Zoho Books?</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  This will stop all automatic syncing with Zoho Books. You can reconnect anytime, but historical sync logs will be lost.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowDisconnectDialog(false)}
                className="px-4 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Disconnect Integration
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
