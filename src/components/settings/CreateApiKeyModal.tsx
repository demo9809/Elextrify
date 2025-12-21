import { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Key,
  Lock,
  Shield,
  AlertTriangle,
  Copy,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  availableApiScopes,
  type ApiKey,
  type Environment,
  type KeyType,
  type AccessLevel,
  type ApiScope,
  getAccessLevelLabel,
  getAccessLevelColor,
} from '../../data/mockApiKeys';

interface CreateApiKeyModalProps {
  onClose: () => void;
  onSuccess: (key: ApiKey) => void;
}

export default function CreateApiKeyModal({ onClose, onSuccess }: CreateApiKeyModalProps) {
  const [step, setStep] = useState(1);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [keyCopied, setKeyCopied] = useState(false);

  // Step 1: Key Details
  const [keyName, setKeyName] = useState('');
  const [description, setDescription] = useState('');
  const [environment, setEnvironment] = useState<Environment>('sandbox');
  const [keyType, setKeyType] = useState<KeyType>('integration');

  // Step 2: Scopes
  const [selectedScopes, setSelectedScopes] = useState<
    Array<{ name: string; accessLevel: AccessLevel; isHighRisk?: boolean }>
  >([]);

  // Step 3: Usage Restrictions
  const [ipAllowlist, setIpAllowlist] = useState<string>('');
  const [rateLimit, setRateLimit] = useState<string>('1000');
  const [expiryDate, setExpiryDate] = useState<string>('');

  const handleScopeToggle = (scopeName: string, accessLevel: AccessLevel) => {
    setSelectedScopes((prev) => {
      const existing = prev.find((s) => s.name === scopeName);
      if (existing) {
        if (existing.accessLevel === accessLevel) {
          // Remove scope if clicking same access level
          return prev.filter((s) => s.name !== scopeName);
        } else {
          // Update access level
          return prev.map((s) =>
            s.name === scopeName ? { ...s, accessLevel } : s
          );
        }
      } else {
        // Add new scope
        const scope = availableApiScopes.find((s) => s.name === scopeName);
        return [...prev, { name: scopeName, accessLevel, isHighRisk: scope?.isHighRisk }];
      }
    });
  };

  const getScopeAccessLevel = (scopeName: string): AccessLevel | null => {
    const scope = selectedScopes.find((s) => s.name === scopeName);
    return scope ? scope.accessLevel : null;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!keyName.trim()) {
        toast.error('Please enter a key name');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (selectedScopes.length === 0) {
        toast.error('Please select at least one API scope');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleGenerate = () => {
    // Generate a mock API key
    const prefix = environment === 'production' ? 'pk_live' : 'pk_test';
    const randomKey = Array.from({ length: 32 }, () =>
      Math.random().toString(36).charAt(2)
    ).join('');
    const fullKey = `${prefix}_${randomKey}`;
    setGeneratedKey(fullKey);

    // Create the API key object
    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name: keyName,
      description,
      keyType,
      environment,
      status: 'active',
      scopes: selectedScopes.map((scope, idx) => ({
        id: `scope_${Date.now()}_${idx}`,
        name: scope.name,
        description: availableApiScopes.find((s) => s.name === scope.name)?.description || '',
        accessLevel: scope.accessLevel,
        isHighRisk: scope.isHighRisk,
      })),
      ipAllowlist: ipAllowlist ? ipAllowlist.split(',').map((ip) => ip.trim()) : undefined,
      rateLimit: rateLimit ? parseInt(rateLimit) : undefined,
      expiryDate: expiryDate || undefined,
      createdBy: 'Current Admin',
      createdAt: new Date().toISOString(),
      requestCount24h: 0,
      requestCount7d: 0,
      errorRate: 0,
      maskedKey: `${prefix}_${'•'.repeat(20)}${fullKey.slice(-4)}`,
    };

    onSuccess(newKey);
  };

  const handleCopyKey = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setKeyCopied(true);
      toast.success('API key copied to clipboard');
      setTimeout(() => setKeyCopied(false), 2000);
    }
  };

  const isHighRiskScope = selectedScopes.some((s) => s.isHighRisk);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
                <Key className="w-5 h-5 text-[#D9480F]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">
                  {generatedKey ? 'API Key Generated' : 'Create New API Key'}
                </h2>
                <p className="text-sm text-[#6B7280]">
                  {generatedKey
                    ? 'Store this key securely'
                    : `Step ${step} of 4`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>

          {/* Progress Bar */}
          {!generatedKey && (
            <div className="px-6 pt-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-1 rounded-full transition-colors ${
                      s <= step ? 'bg-[#D9480F]' : 'bg-[#E5E7EB]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Step 1: Key Details */}
            {step === 1 && !generatedKey && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-1">
                    Key Details
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    Provide basic information about this API key
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Key Name <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    placeholder="e.g., Production Integration"
                    className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the purpose of this API key"
                    rows={3}
                    className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Environment <span className="text-[#DC2626]">*</span>
                    </label>
                    <select
                      value={environment}
                      onChange={(e) => setEnvironment(e.target.value as Environment)}
                      className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    >
                      <option value="sandbox">Sandbox</option>
                      <option value="production">Production</option>
                    </select>
                    <p className="text-xs text-[#6B7280] mt-1">
                      {environment === 'production'
                        ? 'Live environment with real data'
                        : 'Test environment with mock data'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Key Type <span className="text-[#DC2626]">*</span>
                    </label>
                    <select
                      value={keyType}
                      onChange={(e) => setKeyType(e.target.value as KeyType)}
                      className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    >
                      <option value="integration">Integration</option>
                      <option value="system">System</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: API Scope Selection */}
            {step === 2 && !generatedKey && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-1">
                    API Scope Selection
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    Choose which APIs this key can access and the permission level
                  </p>
                </div>

                {isHighRiskScope && (
                  <div className="p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-[#991B1B] font-medium">
                        High-Risk Scopes Selected
                      </p>
                      <p className="text-sm text-[#DC2626] mt-1">
                        You've selected high-risk scopes that can access sensitive data. Use
                        with caution.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {availableApiScopes.map((scope) => {
                    const currentAccessLevel = getScopeAccessLevel(scope.name);
                    const isSelected = currentAccessLevel !== null;

                    return (
                      <div
                        key={scope.name}
                        className={`border rounded-lg p-4 transition-all ${
                          isSelected
                            ? 'border-[#D9480F] bg-[#FEF2F2]'
                            : 'border-[#E5E7EB] bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-[#111827]">
                                {scope.name}
                              </p>
                              {scope.isHighRisk && (
                                <span className="px-2 py-0.5 bg-[#FEE2E2] text-[#991B1B] text-xs rounded font-medium">
                                  High Risk
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#6B7280] mt-1">
                              {scope.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleScopeToggle(scope.name, 'read')}
                            className={`flex-1 h-9 px-3 rounded-lg text-sm font-medium transition-all ${
                              currentAccessLevel === 'read'
                                ? 'bg-[#3B82F6] text-white'
                                : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#3B82F6]'
                            }`}
                          >
                            Read
                          </button>
                          <button
                            onClick={() => handleScopeToggle(scope.name, 'write')}
                            className={`flex-1 h-9 px-3 rounded-lg text-sm font-medium transition-all ${
                              currentAccessLevel === 'write'
                                ? 'bg-[#F59E0B] text-white'
                                : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#F59E0B]'
                            }`}
                          >
                            Write
                          </button>
                          <button
                            onClick={() => handleScopeToggle(scope.name, 'admin')}
                            className={`flex-1 h-9 px-3 rounded-lg text-sm font-medium transition-all ${
                              currentAccessLevel === 'admin'
                                ? 'bg-[#DC2626] text-white'
                                : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#DC2626]'
                            }`}
                          >
                            Admin
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 bg-[#EFF6FF] border border-[#DBEAFE] rounded-lg flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#1E40AF]">
                    Default permission level is Read-only. Grant Write or Admin access only
                    when necessary.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Usage Restrictions */}
            {step === 3 && !generatedKey && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-1">
                    Usage Restrictions
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    Optional security settings to control how this key can be used
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    IP Allowlist (Optional)
                  </label>
                  <input
                    type="text"
                    value={ipAllowlist}
                    onChange={(e) => setIpAllowlist(e.target.value)}
                    placeholder="e.g., 203.0.113.0, 198.51.100.0"
                    className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">
                    Comma-separated IP addresses. Only requests from these IPs will be
                    accepted.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Rate Limit (Optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={rateLimit}
                      onChange={(e) => setRateLimit(e.target.value)}
                      placeholder="1000"
                      className="flex-1 h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    />
                    <span className="text-sm text-[#6B7280]">requests per minute</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Maximum number of API requests allowed per minute. Default: 1000
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                  <p className="text-xs text-[#6B7280] mt-1">
                    The key will automatically expire and stop working on this date.
                  </p>
                </div>

                <div className="p-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-lg flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#92400E] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#78350F]">
                    <span className="font-medium">Recommended:</span> Always set IP
                    restrictions and expiry dates for production keys to minimize security
                    risks.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && !generatedKey && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-1">
                    Review & Generate
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    Review your API key configuration before generating
                  </p>
                </div>

                {/* Key Details Summary */}
                <div className="border border-[#E5E7EB] rounded-lg p-4">
                  <h4 className="font-medium text-[#111827] mb-3">Key Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Name:</span>
                      <span className="font-medium text-[#111827]">{keyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Environment:</span>
                      <span className="font-medium text-[#111827] capitalize">
                        {environment}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Type:</span>
                      <span className="font-medium text-[#111827] capitalize">
                        {keyType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scopes Summary */}
                <div className="border border-[#E5E7EB] rounded-lg p-4">
                  <h4 className="font-medium text-[#111827] mb-3">
                    API Scopes ({selectedScopes.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedScopes.map((scope, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-[#111827]">{scope.name}</span>
                        <span
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor:
                              scope.accessLevel === 'read'
                                ? '#DBEAFE'
                                : scope.accessLevel === 'write'
                                ? '#FEF3C7'
                                : '#FEE2E2',
                            color:
                              scope.accessLevel === 'read'
                                ? '#1E40AF'
                                : scope.accessLevel === 'write'
                                ? '#92400E'
                                : '#991B1B',
                          }}
                        >
                          {getAccessLevelLabel(scope.accessLevel)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Restrictions Summary */}
                <div className="border border-[#E5E7EB] rounded-lg p-4">
                  <h4 className="font-medium text-[#111827] mb-3">Usage Restrictions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">IP Allowlist:</span>
                      <span className="font-medium text-[#111827]">
                        {ipAllowlist || 'None'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Rate Limit:</span>
                      <span className="font-medium text-[#111827]">
                        {rateLimit || '1000'} req/min
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Expiry Date:</span>
                      <span className="font-medium text-[#111827]">
                        {expiryDate || 'Never'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Generated Key Display */}
            {generatedKey && (
              <div className="space-y-6">
                <div className="p-4 bg-[#DCFCE7] border border-[#BBF7D0] rounded-lg flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#15803D]">
                      API Key Generated Successfully
                    </p>
                    <p className="text-sm text-[#16A34A] mt-1">
                      Your API key has been created and is ready to use.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#991B1B]">
                        Store This Key Securely
                      </p>
                      <p className="text-sm text-[#DC2626] mt-1">
                        This is the only time you'll see the full API key. Store it in a
                        secure location. If you lose it, you'll need to regenerate a new key.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Your API Key
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-11 px-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg flex items-center font-mono text-sm text-[#111827] overflow-x-auto">
                      {generatedKey}
                    </div>
                    <button
                      onClick={handleCopyKey}
                      className={`flex items-center gap-2 px-4 h-11 rounded-lg transition-colors font-medium text-sm ${
                        keyCopied
                          ? 'bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]'
                          : 'bg-white border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      {keyCopied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-[#E5E7EB] rounded-lg">
                  <h4 className="font-medium text-[#111827] mb-3">Next Steps</h4>
                  <ol className="space-y-2 text-sm text-[#6B7280]">
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-[#111827]">1.</span>
                      Copy and store the API key in a secure location (e.g., password manager)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-[#111827]">2.</span>
                      Review the API documentation for integration instructions
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-[#111827]">3.</span>
                      Test your integration in the {environment} environment
                    </li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
            {!generatedKey ? (
              <>
                <button
                  onClick={() => {
                    if (step > 1) setStep(step - 1);
                    else onClose();
                  }}
                  className="flex items-center gap-2 px-4 h-10 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium text-[#111827]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {step === 1 ? 'Cancel' : 'Back'}
                </button>
                <button
                  onClick={step === 4 ? handleGenerate : handleNext}
                  className="flex items-center gap-2 px-6 h-10 bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium text-sm"
                >
                  {step === 4 ? (
                    <>
                      <Key className="w-4 h-4" />
                      Generate API Key
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="ml-auto px-6 h-10 bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium text-sm"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
