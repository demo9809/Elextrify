import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Save,
  TestTube,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Copy
} from 'lucide-react';

export default function PaytmConfig() {
  const navigate = useNavigate();
  
  // Form state
  const [merchantId, setMerchantId] = useState('PAYTM_MID_12345');
  const [merchantKey, setMerchantKey] = useState('PAYTM_KEY_XXXXXXXXXX');
  const [websiteName, setWebsiteName] = useState('DEFAULT');
  const [industryType, setIndustryType] = useState('Retail');
  const [callbackUrl, setCallbackUrl] = useState('https://yourdomain.com/paytm/callback');
  const [environment, setEnvironment] = useState<'production' | 'staging'>('production');
  const [showMerchantKey, setShowMerchantKey] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  
  // Connection status
  const [isConnected] = useState(true);
  const [lastSync] = useState('2025-12-21 13:45');
  
  const handleSave = () => {
    alert('Paytm configuration saved successfully');
  };
  
  const handleTest = () => {
    alert('Testing Paytm connection...');
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
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
        
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-red-50 flex items-center justify-center text-3xl">
              💳
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-[#111827]">Paytm Payment Gateway</h1>
                {isConnected && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Connected
                  </span>
                )}
              </div>
              <p className="text-[#6B7280]">
                India's leading digital payment platform for online and offline transactions
              </p>
            </div>
          </div>
        </div>

        {lastSync && (
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <RefreshCw className="w-4 h-4" />
            <span>Last sync: {lastSync}</span>
          </div>
        )}
      </div>

      {/* Info Notice */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 font-medium mb-1">Secure Credentials</p>
            <p className="text-blue-700 text-sm">
              Your Paytm credentials are encrypted and stored securely. Never share your Merchant Key with anyone.
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
        <h2 className="text-[#111827] font-medium mb-6">Configuration</h2>
        
        <div className="space-y-6">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">
                Enable Paytm Integration
              </label>
              <p className="text-sm text-[#6B7280]">
                Allow payments through Paytm payment gateway
              </p>
            </div>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isEnabled ? 'bg-[#D9480F]' : 'bg-[#E5E7EB]'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Environment */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Environment
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="staging"
                  checked={environment === 'staging'}
                  onChange={(e) => setEnvironment(e.target.value as 'staging')}
                  className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                />
                <span className="text-sm text-[#111827]">Staging (Test)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="production"
                  checked={environment === 'production'}
                  onChange={(e) => setEnvironment(e.target.value as 'production')}
                  className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                />
                <span className="text-sm text-[#111827]">Production (Live)</span>
              </label>
            </div>
          </div>

          {/* Merchant ID */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Merchant ID <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={merchantId}
                onChange={(e) => setMerchantId(e.target.value)}
                placeholder="Enter Merchant ID"
                className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
              <button
                onClick={() => handleCopy(merchantId)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#F9FAFB] rounded transition-colors"
                title="Copy Merchant ID"
              >
                <Copy className="w-4 h-4 text-[#6B7280]" />
              </button>
            </div>
          </div>

          {/* Merchant Key */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Merchant Key <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <input
                type={showMerchantKey ? 'text' : 'password'}
                value={merchantKey}
                onChange={(e) => setMerchantKey(e.target.value)}
                placeholder="Enter Merchant Key"
                className="w-full px-4 py-2.5 pr-24 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  onClick={() => handleCopy(merchantKey)}
                  className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"
                  title="Copy Merchant Key"
                >
                  <Copy className="w-4 h-4 text-[#6B7280]" />
                </button>
                <button
                  onClick={() => setShowMerchantKey(!showMerchantKey)}
                  className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"
                  title={showMerchantKey ? 'Hide' : 'Show'}
                >
                  {showMerchantKey ? (
                    <EyeOff className="w-4 h-4 text-[#6B7280]" />
                  ) : (
                    <Eye className="w-4 h-4 text-[#6B7280]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Website Name */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Website Name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              placeholder="e.g., DEFAULT"
              className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
            <p className="text-xs text-[#6B7280] mt-1">
              This is provided by Paytm when you create a merchant account
            </p>
          </div>

          {/* Industry Type */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Industry Type <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={industryType}
              onChange={(e) => setIndustryType(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            >
              <option value="Retail">Retail</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Services">Services</option>
            </select>
          </div>

          {/* Callback URL */}
          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">
              Callback URL <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="url"
              value={callbackUrl}
              onChange={(e) => setCallbackUrl(e.target.value)}
              placeholder="https://yourdomain.com/paytm/callback"
              className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
            <p className="text-xs text-[#6B7280] mt-1">
              Paytm will send payment status updates to this URL
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={!isEnabled}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          Save Configuration
        </button>
        <button
          onClick={handleTest}
          disabled={!isEnabled}
          className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <TestTube className="w-4 h-4" />
          Test Connection
        </button>
      </div>
    </div>
  );
}
