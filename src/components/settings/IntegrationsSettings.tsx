import { ArrowLeft, Webhook, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function IntegrationsSettings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
          </button>
          <div>
            <h1 className="text-[#111827]">Integrations / Webhooks</h1>
            <p className="text-[#6B7280]">Configure third-party integrations and webhook endpoints</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-12 text-center">
            <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-[#9CA3AF]" />
            </div>
            <h2 className="text-[#111827] mb-3">Coming Soon</h2>
            <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
              Integration and webhook features are currently in development. 
              This section will include API key management, webhook configuration, and third-party app connections.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#6B7280]">
              <Webhook className="w-4 h-4" />
              <span className="text-sm">Available in future release</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
