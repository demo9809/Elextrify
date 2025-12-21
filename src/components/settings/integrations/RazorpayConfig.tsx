import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  RotateCw,
  Unlink,
  Shield,
  Activity
} from 'lucide-react';

export default function RazorpayConfig() {
  const navigate = useNavigate();
  
  // Mock connection state (TODO: Replace with actual API data)
  const [isConnected, setIsConnected] = useState(true);
  const [mode, setMode] = useState<'test' | 'live'>('live');
  const [showKeyId, setShowKeyId] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  
  // Form state
  const [keyId, setKeyId] = useState('rzp_live_••••••••••••');
  const [secretKey, setSecretKey] = useState('••••••••••••••••••••');
  const [webhookSecret, setWebhookSecret] = useState('••••••••••••••••••••');
  
  // Feature toggles
  const [enableSubscriptions, setEnableSubscriptions] = useState(true);
  const [enableAutoRenewals, setEnableAutoRenewals] = useState(true);
  const [enableInvoicePayments, setEnableInvoicePayments] = useState(true);
  const [enableRefunds, setEnableRefunds] = useState(true);
  
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Razorpay configuration saved successfully');
  };

  const handleRotateKeys = () => {
    if (confirm('Are you sure you want to rotate your Razorpay keys? This will invalidate the current keys.')) {
      alert('Key rotation initiated. Please update your keys from the Razorpay dashboard.');
    }
  };

  const handleDisconnect = () => {
    setShowDisconnectDialog(false);
    setIsConnected(false);
    alert('Razorpay integration disconnected');
    navigate('/settings/system/integrations');
  };

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
            <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center text-3xl">
              💳
            </div>
            <div>
              <h1 className="text-[#111827] mb-1">Razorpay Configuration</h1>
              <p className="text-[#6B7280]">
                India's leading payment gateway for subscriptions and instant refunds
              </p>
            </div>
          </div>
          
          {isConnected && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg">
              <CheckCircle className="w-4 h-4" />
              Connected
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Configuration */}
        <div className="xl:col-span-2 space-y-6">
          {/* Connection Setup */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <h2 className="text-[#111827] font-medium mb-4">Connection Setup</h2>
            
            <div className="space-y-4">
              {/* Mode Selection */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Environment Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMode('test')}
                    className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                      mode === 'test'
                        ? 'border-[#D9480F] bg-[#FEF2F2] text-[#D9480F]'
                        : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D9480F]'
                    }`}
                  >
                    Test Mode
                  </button>
                  <button
                    onClick={() => setMode('live')}
                    className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                      mode === 'live'
                        ? 'border-[#D9480F] bg-[#FEF2F2] text-[#D9480F]'
                        : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D9480F]'
                    }`}
                  >
                    Live Mode
                  </button>
                </div>
                {mode === 'test' && (
                  <p className="mt-2 text-sm text-amber-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Test mode - No real transactions will be processed
                  </p>
                )}
              </div>

              {/* Key ID */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Key ID
                </label>
                <div className="relative">
                  <input
                    type={showKeyId ? 'text' : 'password'}
                    value={keyId}
                    onChange={(e) => setKeyId(e.target.value)}
                    placeholder="rzp_live_xxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-2.5 pr-10 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowKeyId(!showKeyId)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827]"
                  >
                    {showKeyId ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Secret Key */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Secret Key
                </label>
                <div className="relative">
                  <input
                    type={showSecretKey ? 'text' : 'password'}
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Enter your Razorpay secret key"
                    className="w-full px-4 py-2.5 pr-10 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowSecretKey(!showSecretKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827]"
                  >
                    {showSecretKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Webhook Secret */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Webhook Secret
                </label>
                <div className="relative">
                  <input
                    type={showWebhookSecret ? 'text' : 'password'}
                    value={webhookSecret}
                    onChange={(e) => setWebhookSecret(e.target.value)}
                    placeholder="Enter your webhook secret"
                    className="w-full px-4 py-2.5 pr-10 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827]"
                  >
                    {showWebhookSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="mt-2 text-sm text-[#6B7280]">
                  Configure webhook URL: <code className="px-2 py-1 bg-[#F9FAFB] rounded text-xs">https://yourplatform.com/webhooks/razorpay</code>
                </p>
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <h2 className="text-[#111827] font-medium mb-4">Feature Configuration</h2>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg cursor-pointer hover:bg-[#F3F4F6] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#111827]">Enable Subscriptions</p>
                  <p className="text-xs text-[#6B7280] mt-1">Process recurring subscription payments</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableSubscriptions}
                  onChange={(e) => setEnableSubscriptions(e.target.checked)}
                  className="w-5 h-5 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg cursor-pointer hover:bg-[#F3F4F6] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#111827]">Enable Auto-Renewals</p>
                  <p className="text-xs text-[#6B7280] mt-1">Automatically charge for subscription renewals</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableAutoRenewals}
                  onChange={(e) => setEnableAutoRenewals(e.target.checked)}
                  className="w-5 h-5 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg cursor-pointer hover:bg-[#F3F4F6] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#111827]">Enable Invoice Payments</p>
                  <p className="text-xs text-[#6B7280] mt-1">Allow customers to pay invoices via Razorpay</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableInvoicePayments}
                  onChange={(e) => setEnableInvoicePayments(e.target.checked)}
                  className="w-5 h-5 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg cursor-pointer hover:bg-[#F3F4F6] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#111827]">Enable Refunds</p>
                  <p className="text-xs text-[#6B7280] mt-1">Process instant refunds through Razorpay</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableRefunds}
                  onChange={(e) => setEnableRefunds(e.target.checked)}
                  className="w-5 h-5 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                />
              </label>
            </div>
          </div>

          {/* Actions */}
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Panel */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <h3 className="text-[#111827] font-medium mb-4">Connection Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#111827]">Connection Health</p>
                  <p className="text-xs text-[#6B7280] mt-1">All systems operational</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#111827]">Last Transaction</p>
                  <p className="text-xs text-[#6B7280] mt-1">2025-12-21 14:30 IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#111827]">Webhook Status</p>
                  <p className="text-xs text-[#6B7280] mt-1">Verified and active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Actions */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <h3 className="text-[#111827] font-medium mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Actions
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={handleRotateKeys}
                className="w-full flex items-center gap-3 px-4 py-3 border border-[#E5E7EB] rounded-lg text-left hover:bg-[#F9FAFB] transition-colors"
              >
                <RotateCw className="w-4 h-4 text-[#6B7280]" />
                <div>
                  <p className="text-sm font-medium text-[#111827]">Rotate Keys</p>
                  <p className="text-xs text-[#6B7280]">Generate new API keys</p>
                </div>
              </button>

              <button
                onClick={() => setShowDisconnectDialog(true)}
                className="w-full flex items-center gap-3 px-4 py-3 border border-red-200 rounded-lg text-left hover:bg-red-50 transition-colors"
              >
                <Unlink className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-700">Disconnect</p>
                  <p className="text-xs text-red-600">Remove integration</p>
                </div>
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 font-medium text-sm mb-2">Need Help?</p>
            <p className="text-blue-700 text-xs leading-relaxed">
              Visit the <a href="#" className="underline">Razorpay documentation</a> to find your API keys and configure webhooks.
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
                <h3 className="text-[#111827] font-medium mb-2">Disconnect Razorpay?</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  This will disable all payment processing through Razorpay. Active subscriptions will be affected. This action cannot be undone.
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
