import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle, AlertCircle, RefreshCw, Copy, Eye, EyeOff } from 'lucide-react';

export default function GoogleAnalyticsConfig() {
  const navigate = useNavigate();
  const [measurementId, setMeasurementId] = useState('G-XXXXXXXXXX');
  const [apiSecret, setApiSecret] = useState('GA_API_SECRET_XXXXXXXXXX');
  const [showApiSecret, setShowApiSecret] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [trackPageViews, setTrackPageViews] = useState(true);
  const [trackEvents, setTrackEvents] = useState(true);
  const [trackEcommerce, setTrackEcommerce] = useState(false);
  const [isConnected] = useState(true);
  const [lastSync] = useState('2025-12-21 15:15');
  
  const handleSave = () => alert('Google Analytics configuration saved successfully');
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <button onClick={() => navigate('/settings/system/integrations')} className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back to Integrations</span>
        </button>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-red-50 flex items-center justify-center text-3xl">📊</div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-[#111827]">Google Analytics</h1>
                {isConnected && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded"><CheckCircle className="w-3.5 h-3.5" />Connected</span>}
              </div>
              <p className="text-[#6B7280]">Track user behavior and analyze platform usage with Google Analytics 4</p>
            </div>
          </div>
        </div>
        {lastSync && <div className="flex items-center gap-2 text-sm text-[#6B7280]"><RefreshCw className="w-4 h-4" /><span>Last sync: {lastSync}</span></div>}
      </div>

      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 font-medium mb-1">Google Analytics 4 Property</p>
            <p className="text-blue-700 text-sm">You'll need a GA4 property ID and Measurement Protocol API secret from your Google Analytics account. Find these in Admin &gt; Data Streams.</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
        <h2 className="text-[#111827] font-medium mb-6">Configuration</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
            <div><label className="block text-sm font-medium text-[#111827] mb-1">Enable Google Analytics</label><p className="text-sm text-[#6B7280]">Track platform usage and user behavior</p></div>
            <button onClick={() => setIsEnabled(!isEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? 'bg-[#D9480F]' : 'bg-[#E5E7EB]'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Measurement ID (GA4) <span className="text-[#DC2626]">*</span></label>
            <div className="relative">
              <input type="text" value={measurementId} onChange={(e) => setMeasurementId(e.target.value)} placeholder="G-XXXXXXXXXX" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
              <button onClick={() => handleCopy(measurementId)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#F9FAFB] rounded transition-colors">
                <Copy className="w-4 h-4 text-[#6B7280]" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Measurement Protocol API Secret <span className="text-[#DC2626]">*</span></label>
            <div className="relative">
              <input type={showApiSecret ? 'text' : 'password'} value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} placeholder="Enter API Secret" className="w-full px-4 py-2.5 pr-24 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button onClick={() => handleCopy(apiSecret)} className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"><Copy className="w-4 h-4 text-[#6B7280]" /></button>
                <button onClick={() => setShowApiSecret(!showApiSecret)} className="p-1 hover:bg-[#F9FAFB] rounded transition-colors">
                  {showApiSecret ? <EyeOff className="w-4 h-4 text-[#6B7280]" /> : <Eye className="w-4 h-4 text-[#6B7280]" />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
            <h3 className="text-sm font-medium text-[#111827]">Tracking Options</h3>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={trackPageViews} onChange={(e) => setTrackPageViews(e.target.checked)} className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]/20" />
              <div>
                <div className="text-sm font-medium text-[#111827]">Track Page Views</div>
                <p className="text-xs text-[#6B7280]">Automatically track all page navigation</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={trackEvents} onChange={(e) => setTrackEvents(e.target.checked)} className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]/20" />
              <div>
                <div className="text-sm font-medium text-[#111827]">Track Custom Events</div>
                <p className="text-xs text-[#6B7280]">Track button clicks, form submissions, etc.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={trackEcommerce} onChange={(e) => setTrackEcommerce(e.target.checked)} className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]/20" />
              <div>
                <div className="text-sm font-medium text-[#111827]">Track E-commerce</div>
                <p className="text-xs text-[#6B7280]">Track purchases, subscriptions, and revenue</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={handleSave} disabled={!isEnabled} className="flex items-center gap-2 px-4 py-2.5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Save className="w-4 h-4" />Save Configuration
        </button>
      </div>
    </div>
  );
}
