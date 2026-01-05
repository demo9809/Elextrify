import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, TestTube, Eye, EyeOff, CheckCircle, AlertCircle, RefreshCw, Copy } from 'lucide-react';

export default function AWSS3Config() {
  const navigate = useNavigate();
  const [accessKeyId, setAccessKeyId] = useState('AKIA_XXXXXXXXXX');
  const [secretAccessKey, setSecretAccessKey] = useState('AWS_SECRET_XXXXXXXXXX');
  const [bucketName, setBucketName] = useState('my-dooh-platform-bucket');
  const [region, setRegion] = useState('us-east-1');
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isConnected] = useState(true);
  const [lastSync] = useState('2025-12-21 14:50');
  
  const handleSave = () => alert('AWS S3 configuration saved successfully');
  const handleTest = () => alert('Testing AWS S3 connection...');
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const awsRegions = [
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-east-2', label: 'US East (Ohio)' },
    { value: 'us-west-1', label: 'US West (N. California)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'ap-south-1', label: 'Asia Pacific (Mumbai)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
    { value: 'eu-west-1', label: 'Europe (Ireland)' },
    { value: 'eu-central-1', label: 'Europe (Frankfurt)' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <button onClick={() => navigate('/settings/system/integrations')} className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back to Integrations</span>
        </button>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center text-3xl">☁️</div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-[#111827]">AWS S3 Storage</h1>
                {isConnected && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded"><CheckCircle className="w-3.5 h-3.5" />Connected</span>}
              </div>
              <p className="text-[#6B7280]">Store and retrieve media files using Amazon S3 cloud storage</p>
            </div>
          </div>
        </div>
        {lastSync && <div className="flex items-center gap-2 text-sm text-[#6B7280]"><RefreshCw className="w-4 h-4" /><span>Last sync: {lastSync}</span></div>}
      </div>

      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 font-medium mb-1">IAM Credentials Required</p>
            <p className="text-blue-700 text-sm">Create an IAM user with S3 access permissions in your AWS Console. Your credentials are encrypted and stored securely.</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 mb-6">
        <h2 className="text-[#111827] font-medium mb-6">Configuration</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
            <div><label className="block text-sm font-medium text-[#111827] mb-1">Enable AWS S3 Integration</label><p className="text-sm text-[#6B7280]">Use Amazon S3 for media file storage</p></div>
            <button onClick={() => setIsEnabled(!isEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? 'bg-[#D9480F]' : 'bg-[#E5E7EB]'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Access Key ID <span className="text-[#DC2626]">*</span></label>
            <div className="relative">
              <input type="text" value={accessKeyId} onChange={(e) => setAccessKeyId(e.target.value)} placeholder="AKIA_XXXXXXXXXX" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
              <button onClick={() => handleCopy(accessKeyId)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#F9FAFB] rounded transition-colors">
                <Copy className="w-4 h-4 text-[#6B7280]" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Secret Access Key <span className="text-[#DC2626]">*</span></label>
            <div className="relative">
              <input type={showSecretKey ? 'text' : 'password'} value={secretAccessKey} onChange={(e) => setSecretAccessKey(e.target.value)} placeholder="Enter Secret Access Key" className="w-full px-4 py-2.5 pr-24 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button onClick={() => handleCopy(secretAccessKey)} className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"><Copy className="w-4 h-4 text-[#6B7280]" /></button>
                <button onClick={() => setShowSecretKey(!showSecretKey)} className="p-1 hover:bg-[#F9FAFB] rounded transition-colors">
                  {showSecretKey ? <EyeOff className="w-4 h-4 text-[#6B7280]" /> : <Eye className="w-4 h-4 text-[#6B7280]" />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">Bucket Name <span className="text-[#DC2626]">*</span></label>
            <input type="text" value={bucketName} onChange={(e) => setBucketName(e.target.value)} placeholder="my-dooh-platform-bucket" className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent" />
            <p className="text-xs text-[#6B7280] mt-1">The S3 bucket where media files will be stored</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111827] mb-2">AWS Region <span className="text-[#DC2626]">*</span></label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent">
              {awsRegions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
            <p className="text-xs text-[#6B7280] mt-1">The AWS region where your S3 bucket is located</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={handleSave} disabled={!isEnabled} className="flex items-center gap-2 px-4 py-2.5 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Save className="w-4 h-4" />Save Configuration
        </button>
        <button onClick={handleTest} disabled={!isEnabled} className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <TestTube className="w-4 h-4" />Test Connection
        </button>
      </div>
    </div>
  );
}
