import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, EyeOff, CheckCircle, AlertCircle, RefreshCw, Copy, Send } from 'lucide-react';

export default function SendGridConfig() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('SG.XXXXXXXXXX');
  const [fromEmail, setFromEmail] = useState('noreply@yourdomain.com');
  const [fromName, setFromName] = useState('Your Platform');
  const [replyToEmail, setReplyToEmail] = useState('support@yourdomain.com');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [testEmail, setTestEmail] = useState('');
  const [isConnected] = useState(true);
  const [lastSync] = useState('2025-12-21 13:30');
  
  const handleSave = () => alert('SendGrid configuration saved successfully');
  const handleTest = () => {
    if (!testEmail) {
      alert('Please enter an email address to send test email');
      return;
    }
    alert(`Sending test email to ${testEmail}...`);
  };
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
            <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center text-3xl">✉️</div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-[#111827]">SendGrid Email Delivery</h1>
                {isConnected && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded"><CheckCircle className="w-3.5 h-3.5" />Connected</span>}
              </div>
              <p className="text-[#6B7280]">Send transactional and marketing emails with SendGrid's cloud email platform</p>
            </div>
          </div>
        </div>
        {lastSync && <div className="flex items-center gap-2 text-sm text-[#6B7280]"><RefreshCw className="w-4 h-4" /><span>Last sync: {lastSync}</span></div>}
      </div>

      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 font-medium mb-1">API Key & Domain Verification</p>
            <p className="text-blue-700 text-sm">Generate an API key from your SendGrid Dashboard under Settings &gt; API Keys. Make sure your domain is verified to avoid deliverability issues.</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
        <h2 className="text-[#111827] font-medium mb-6">Configuration</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
            <div><label className="block text-sm font-medium text-[#111827] mb-1">Enable SendGrid Integration</label><p className="text-sm text-[#6B7280]">Allow sending emails through SendGrid</p></div>
            <button onClick={() => setIsEnabled(!isEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? 'bg-[#D9480F]' : 'bg-[#E5E7EB]'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">API Key <span className="text-[#DC2626]">*</span></label>
            <div className="relative">
              <input type={showApiKey ? 'text' : 'password'} value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="SG.XXXXXXXXXX" className="w-full px-4 py-2.5 pr-24 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button onClick={() => handleCopy(apiKey)} className="p-1 hover:bg-[#F9FAFB] rounded transition-colors" title="Copy API Key"><Copy className="w-4 h-4 text-[#6B7280]" /></button>
                <button onClick={() => setShowApiKey(!showApiKey)} className="p-1 hover:bg-[#F9FAFB] rounded transition-colors" title={showApiKey ? 'Hide' : 'Show'}>
                  {showApiKey ? <EyeOff className="w-4 h-4 text-[#6B7280]" /> : <Eye className="w-4 h-4 text-[#6B7280]" />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">From Email Address <span className="text-[#DC2626]">*</span></label>
            <input type="email" value={fromEmail} onChange={(e) => setFromEmail(e.target.value)} placeholder="noreply@yourdomain.com" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
            <p className="text-xs text-[#6B7280] mt-1">This email address must be verified in your SendGrid account</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">From Name <span className="text-[#DC2626]">*</span></label>
            <input type="text" value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="Your Platform" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
            <p className="text-xs text-[#6B7280] mt-1">The display name that will appear in recipient's inbox</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Reply-To Email <span className="text-[#6B7280]">(Optional)</span></label>
            <input type="email" value={replyToEmail} onChange={(e) => setReplyToEmail(e.target.value)} placeholder="support@yourdomain.com" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
            <p className="text-xs text-[#6B7280] mt-1">Where replies will be sent (defaults to From Email if not specified)</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
        <h2 className="text-[#111827] font-medium mb-4">Test Connection</h2>
        <p className="text-[#6B7280] text-sm mb-4">Send a test email to verify your SendGrid configuration</p>
        <div className="flex gap-3">
          <input type="email" value={testEmail} onChange={(e) => setTestEmail(e.target.value)} placeholder="Enter email address" className="flex-1 px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
          <button onClick={handleTest} disabled={!isEnabled || !testEmail} className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Send className="w-4 h-4" />Send Test Email
          </button>
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
