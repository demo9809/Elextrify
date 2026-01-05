import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, EyeOff, CheckCircle, AlertCircle, RefreshCw, Copy, Send } from 'lucide-react';

export default function TwilioConfig() {
  const navigate = useNavigate();
  const [accountSid, setAccountSid] = useState('AC_TWILIO_SID_XXXXXXXXXX');
  const [authToken, setAuthToken] = useState('TWILIO_AUTH_TOKEN_XXXXXXXXXX');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [messagingServiceSid, setMessagingServiceSid] = useState('MG_SERVICE_SID_XXXXXXXXXX');
  const [showAuthToken, setShowAuthToken] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [testPhoneNumber, setTestPhoneNumber] = useState('');
  const [isConnected] = useState(true);
  const [lastSync] = useState('2025-12-21 14:20');
  
  const handleSave = () => alert('Twilio configuration saved successfully');
  const handleTest = () => {
    if (!testPhoneNumber) {
      alert('Please enter a phone number to send test SMS');
      return;
    }
    alert(`Sending test SMS to ${testPhoneNumber}...`);
  };
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <button onClick={() => navigate('/settings/system/integrations')} className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Integrations</span>
        </button>
        
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center text-3xl">💬</div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-[#111827]">Twilio SMS</h1>
                {isConnected && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
                    <CheckCircle className="w-3.5 h-3.5" />Connected
                  </span>
                )}
              </div>
              <p className="text-[#6B7280]">Send SMS notifications and alerts using Twilio's cloud communications platform</p>
            </div>
          </div>
        </div>
        {lastSync && (<div className="flex items-center gap-2 text-sm text-[#6B7280]"><RefreshCw className="w-4 h-4" /><span>Last sync: {lastSync}</span></div>)}
      </div>

      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 font-medium mb-1">API Credentials</p>
            <p className="text-blue-700 text-sm">You can find your Account SID and Auth Token in your Twilio Console under Account Settings. Your credentials are encrypted and stored securely.</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
        <h2 className="text-[#111827] font-medium mb-6">Configuration</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1">Enable Twilio Integration</label>
              <p className="text-sm text-[#6B7280]">Allow sending SMS notifications through Twilio</p>
            </div>
            <button onClick={() => setIsEnabled(!isEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? 'bg-[#D9480F]' : 'bg-[#E5E7EB]'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Account SID <span className="text-[#DC2626]">*</span></label>
            <div className="relative">
              <input type="text" value={accountSid} onChange={(e) => setAccountSid(e.target.value)} placeholder="Enter Account SID" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
              <button onClick={() => handleCopy(accountSid)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#F9FAFB] rounded transition-colors" title="Copy Account SID">
                <Copy className="w-4 h-4 text-[#6B7280]" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Auth Token <span className="text-[#DC2626]">*</span></label>
            <div className="relative">
              <input type={showAuthToken ? 'text' : 'password'} value={authToken} onChange={(e) => setAuthToken(e.target.value)} placeholder="Enter Auth Token" className="w-full px-4 py-2.5 pr-24 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button onClick={() => handleCopy(authToken)} className="p-1 hover:bg-[#F9FAFB] rounded transition-colors" title="Copy Auth Token"><Copy className="w-4 h-4 text-[#6B7280]" /></button>
                <button onClick={() => setShowAuthToken(!showAuthToken)} className="p-1 hover:bg-[#F9FAFB] rounded transition-colors" title={showAuthToken ? 'Hide' : 'Show'}>
                  {showAuthToken ? <EyeOff className="w-4 h-4 text-[#6B7280]" /> : <Eye className="w-4 h-4 text-[#6B7280]" />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Twilio Phone Number <span className="text-[#DC2626]">*</span></label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+1234567890" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
            <p className="text-xs text-[#6B7280] mt-1">The phone number from which SMS will be sent (must be in E.164 format)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Messaging Service SID <span className="text-[#6B7280]">(Optional)</span></label>
            <input type="text" value={messagingServiceSid} onChange={(e) => setMessagingServiceSid(e.target.value)} placeholder="Enter Messaging Service SID" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
            <p className="text-xs text-[#6B7280] mt-1">If using a Messaging Service, enter the SID here. This overrides the phone number above.</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
        <h2 className="text-[#111827] font-medium mb-4">Test Connection</h2>
        <p className="text-[#6B7280] text-sm mb-4">Send a test SMS to verify your Twilio configuration</p>
        <div className="flex gap-3">
          <input type="tel" value={testPhoneNumber} onChange={(e) => setTestPhoneNumber(e.target.value)} placeholder="Enter phone number (e.g., +1234567890)" className="flex-1 px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
          <button onClick={handleTest} disabled={!isEnabled || !testPhoneNumber} className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Send className="w-4 h-4" />Send Test SMS
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
