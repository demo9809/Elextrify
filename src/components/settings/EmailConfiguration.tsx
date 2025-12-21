import { useState } from 'react';
import {
  Mail,
  Server,
  Key,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Send,
  Save,
  ShieldAlert,
  Clock,
  Info,
  Shield,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  mockEmailConfig,
  mockEmailAuditLogs,
  getProviderLabel,
  getProviderHelpText,
  formatRelativeTime,
  getAuditActionLabel,
  getAuditActionColor,
  type EmailProvider,
  type EncryptionType,
  type SMTPConfig,
  type APIBasedConfig,
  type EmailConfiguration,
} from '../../data/mockEmailConfig';

export default function EmailConfiguration() {
  const [config, setConfig] = useState<EmailConfiguration>(mockEmailConfig);
  const [selectedProvider, setSelectedProvider] = useState<EmailProvider>(config.provider);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showProviderWarning, setShowProviderWarning] = useState(false);

  // SMTP State
  const [smtpConfig, setSmtpConfig] = useState<SMTPConfig>(
    config.smtpConfig || {
      server: '',
      port: 587,
      encryption: 'tls',
      username: '',
      password: '',
      fromEmail: '',
      fromName: '',
    }
  );

  // API State
  const [apiConfig, setApiConfig] = useState<APIBasedConfig>(
    config.apiConfig || {
      apiKey: '',
      senderEmail: '',
      senderName: '',
      domain: '',
      region: '',
    }
  );

  const handleProviderChange = (provider: EmailProvider) => {
    if (config.isActive && provider !== config.provider) {
      setShowProviderWarning(true);
      setSelectedProvider(provider);
    } else {
      setSelectedProvider(provider);
      setHasUnsavedChanges(true);
    }
  };

  const confirmProviderChange = () => {
    setConfig((prev) => ({ ...prev, provider: selectedProvider }));
    setShowProviderWarning(false);
    setHasUnsavedChanges(true);
    toast.info('Provider changed. Please configure and test before saving.');
  };

  const handleTestEmail = async () => {
    setIsTesting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() > 0.1;
    
    if (success) {
      toast.success('Test email sent successfully! Check your inbox.');
      setConfig((prev) => ({
        ...prev,
        lastTestedAt: new Date().toISOString(),
        testEmailStatus: 'success',
        errorMessage: undefined,
      }));
    } else {
      toast.error('Failed to send test email. Please check your configuration.');
      setConfig((prev) => ({
        ...prev,
        lastTestedAt: new Date().toISOString(),
        testEmailStatus: 'failed',
        errorMessage: 'SMTP authentication failed: Invalid credentials',
      }));
    }
    
    setIsTesting(false);
  };

  const handleSaveConfiguration = async () => {
    // Validation
    if (selectedProvider === 'smtp') {
      if (!smtpConfig.server || !smtpConfig.username || !smtpConfig.password || !smtpConfig.fromEmail) {
        toast.error('Please fill in all required SMTP fields.');
        return;
      }
    } else {
      if (!apiConfig.apiKey || !apiConfig.senderEmail) {
        toast.error('Please fill in all required API fields.');
        return;
      }
    }

    if (config.testEmailStatus !== 'success') {
      toast.error('Please test the configuration before saving.');
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setConfig((prev) => ({
      ...prev,
      provider: selectedProvider,
      smtpConfig: selectedProvider === 'smtp' ? smtpConfig : undefined,
      apiConfig: selectedProvider !== 'smtp' ? apiConfig : undefined,
      isActive: true,
      updatedAt: new Date().toISOString(),
      updatedBy: 'Admin User',
    }));
    
    setHasUnsavedChanges(false);
    setIsSaving(false);
    toast.success('Email configuration saved successfully.');
  };

  const isFormValid = () => {
    if (selectedProvider === 'smtp') {
      return (
        smtpConfig.server &&
        smtpConfig.username &&
        smtpConfig.password &&
        smtpConfig.fromEmail &&
        config.testEmailStatus === 'success'
      );
    } else {
      return (
        apiConfig.apiKey &&
        apiConfig.senderEmail &&
        config.testEmailStatus === 'success'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-[#D9480F] flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[#111827]">System Email Infrastructure</h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Configure how the platform sends system-generated emails
              </p>
            </div>
          </div>

          {/* Access Control Notice */}
          <div className="mt-4 p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#991B1B] font-medium">
                Administrative Access Only
              </p>
              <p className="text-sm text-[#DC2626] mt-1">
                This module is visible only to SaaS Admin and Host Admin. Changes affect all system emails.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Configuration - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Provider Status */}
            {config.isActive && (
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[#111827] mb-1">
                      Active Email Configuration
                    </h2>
                    <p className="text-sm text-[#6B7280]">
                      Current provider and delivery status
                    </p>
                  </div>
                  {config.testEmailStatus === 'success' ? (
                    <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
                  ) : (
                    <XCircle className="w-6 h-6 text-[#DC2626]" />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#9CA3AF] mb-1">Active Provider</p>
                    <p className="text-sm font-medium text-[#111827]">
                      {getProviderLabel(config.provider)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF] mb-1">Sender Email</p>
                    <p className="text-sm font-medium text-[#111827]">
                      {config.apiConfig?.senderEmail || config.smtpConfig?.fromEmail || 'Not configured'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF] mb-1">Last Successful Send</p>
                    <p className="text-sm font-medium text-[#111827]">
                      {config.lastSuccessfulSend
                        ? formatRelativeTime(config.lastSuccessfulSend)
                        : 'Never'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF] mb-1">Status</p>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                        config.testEmailStatus === 'success'
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : 'bg-[#FEE2E2] text-[#991B1B]'
                      }`}
                    >
                      {config.testEmailStatus === 'success' ? 'Operational' : 'Configuration Error'}
                    </span>
                  </div>
                </div>

                {config.errorMessage && (
                  <div className="mt-4 p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg">
                    <p className="text-sm text-[#DC2626]">{config.errorMessage}</p>
                  </div>
                )}
              </div>
            )}

            {/* Warning if not configured */}
            {!config.isActive && (
              <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg p-6 flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-[#DC2626] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#991B1B] mb-1">
                    System emails will not be delivered
                  </h3>
                  <p className="text-sm text-[#DC2626]">
                    Email configuration is incomplete or inactive. Complete the setup below to enable email delivery.
                  </p>
                </div>
              </div>
            )}

            {/* Provider Selection */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111827] mb-1">
                  Email Delivery Provider <span className="text-[#DC2626]">*</span>
                </label>
                <p className="text-sm text-[#6B7280] mb-3">
                  Select how the platform will send system emails
                </p>
                <select
                  value={selectedProvider}
                  onChange={(e) => handleProviderChange(e.target.value as EmailProvider)}
                  className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                >
                  <option value="smtp">SMTP (Custom)</option>
                  <option value="mailgun">Mailgun</option>
                  <option value="sendgrid">SendGrid</option>
                  <option value="ses">Amazon SES</option>
                  <option value="resend">Resend</option>
                  <option value="postmark">Postmark</option>
                  <option value="mailchimp-transactional">Mailchimp Transactional</option>
                  <option value="zoho">Zoho Mail</option>
                  <option value="other">Other (API-based)</option>
                </select>
              </div>

              <div className="p-3 bg-[#EFF6FF] border border-[#DBEAFE] rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#1E40AF]">
                  {getProviderHelpText(selectedProvider)}
                </p>
              </div>
            </div>

            {/* SMTP Configuration */}
            {selectedProvider === 'smtp' && (
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Server className="w-5 h-5 text-[#6B7280]" />
                  <h2 className="text-lg font-semibold text-[#111827]">SMTP Settings</h2>
                </div>

                <div className="space-y-4">
                  {/* SMTP Server */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      SMTP Server Address <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      value={smtpConfig.server}
                      onChange={(e) => {
                        setSmtpConfig({ ...smtpConfig, server: e.target.value });
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="smtp.example.com"
                      className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    />
                  </div>

                  {/* Port and Encryption */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        Port <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="number"
                        value={smtpConfig.port}
                        onChange={(e) => {
                          setSmtpConfig({ ...smtpConfig, port: parseInt(e.target.value) });
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="587"
                        className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        Encryption Type <span className="text-[#DC2626]">*</span>
                      </label>
                      <select
                        value={smtpConfig.encryption}
                        onChange={(e) => {
                          setSmtpConfig({ ...smtpConfig, encryption: e.target.value as EncryptionType });
                          setHasUnsavedChanges(true);
                        }}
                        className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      >
                        <option value="none">None</option>
                        <option value="tls">TLS</option>
                        <option value="ssl">SSL</option>
                      </select>
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Username <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      value={smtpConfig.username}
                      onChange={(e) => {
                        setSmtpConfig({ ...smtpConfig, username: e.target.value });
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="username@example.com"
                      className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Password <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={smtpConfig.password}
                        onChange={(e) => {
                          setSmtpConfig({ ...smtpConfig, password: e.target.value });
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="Enter SMTP password"
                        className="w-full h-11 px-3 pr-10 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Password is encrypted and never shown in plain text
                    </p>
                  </div>

                  {/* From Email and Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        From Email Address <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="email"
                        value={smtpConfig.fromEmail}
                        onChange={(e) => {
                          setSmtpConfig({ ...smtpConfig, fromEmail: e.target.value });
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="noreply@example.com"
                        className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        From Name <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="text"
                        value={smtpConfig.fromName}
                        onChange={(e) => {
                          setSmtpConfig({ ...smtpConfig, fromName: e.target.value });
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="DOOH Platform"
                        className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* API-Based Configuration */}
            {selectedProvider !== 'smtp' && (
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Key className="w-5 h-5 text-[#6B7280]" />
                  <h2 className="text-lg font-semibold text-[#111827]">API Configuration</h2>
                </div>

                <p className="text-sm text-[#6B7280] mb-4">
                  Emails will be sent using {getProviderLabel(selectedProvider)}'s transactional email service.
                </p>

                <div className="space-y-4">
                  {/* API Key */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      API Key <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={apiConfig.apiKey}
                        onChange={(e) => {
                          setApiConfig({ ...apiConfig, apiKey: e.target.value });
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="Enter API key"
                        className="w-full h-11 px-3 pr-10 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827]"
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      API key is encrypted and stored securely
                    </p>
                  </div>

                  {/* Sender Email and Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        Sender Email <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="email"
                        value={apiConfig.senderEmail}
                        onChange={(e) => {
                          setApiConfig({ ...apiConfig, senderEmail: e.target.value });
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="noreply@example.com"
                        className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-2">
                        Sender Name <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="text"
                        value={apiConfig.senderName}
                        onChange={(e) => {
                          setApiConfig({ ...apiConfig, senderName: e.target.value });
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="DOOH Platform"
                        className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Optional: Domain/Region based on provider */}
                  {(selectedProvider === 'ses' || selectedProvider === 'mailgun') && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProvider === 'mailgun' && (
                        <div>
                          <label className="block text-sm font-medium text-[#111827] mb-2">
                            Domain (Optional)
                          </label>
                          <input
                            type="text"
                            value={apiConfig.domain}
                            onChange={(e) => {
                              setApiConfig({ ...apiConfig, domain: e.target.value });
                              setHasUnsavedChanges(true);
                            }}
                            placeholder="mg.example.com"
                            className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                          />
                        </div>
                      )}
                      {selectedProvider === 'ses' && (
                        <div>
                          <label className="block text-sm font-medium text-[#111827] mb-2">
                            AWS Region (Optional)
                          </label>
                          <select
                            value={apiConfig.region}
                            onChange={(e) => {
                              setApiConfig({ ...apiConfig, region: e.target.value });
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full h-11 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                          >
                            <option value="">Select region</option>
                            <option value="us-east-1">US East (N. Virginia)</option>
                            <option value="us-west-2">US West (Oregon)</option>
                            <option value="eu-west-1">EU (Ireland)</option>
                            <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Test Configuration */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Send className="w-5 h-5 text-[#6B7280]" />
                <h2 className="text-lg font-semibold text-[#111827]">Test Configuration</h2>
              </div>

              <p className="text-sm text-[#6B7280] mb-4">
                Send a test email to verify your configuration before activating it.
              </p>

              {config.lastTestedAt && (
                <div className="mb-4 p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-sm text-[#6B7280]">
                        Last tested: {formatRelativeTime(config.lastTestedAt)}
                      </span>
                    </div>
                    {config.testEmailStatus === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#DC2626]" />
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={handleTestEmail}
                disabled={isTesting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-11 bg-white border-2 border-[#D9480F] text-[#D9480F] rounded-lg hover:bg-[#FEF2F2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isTesting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#D9480F] border-t-transparent rounded-full animate-spin" />
                    Sending test email...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Test Email
                  </>
                )}
              </button>
            </div>

            {/* Save Actions */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#111827]">
                    {hasUnsavedChanges ? 'You have unsaved changes' : 'Configuration saved'}
                  </p>
                  <p className="text-sm text-[#6B7280] mt-1">
                    {hasUnsavedChanges
                      ? 'Test and save your configuration to activate it'
                      : 'Your email configuration is active and operational'}
                  </p>
                </div>
                <button
                  onClick={handleSaveConfiguration}
                  disabled={!isFormValid() || isSaving || !hasUnsavedChanges}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-11 bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Configuration
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Email Usage Scope */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-[#6B7280]" />
                <h3 className="font-semibold text-[#111827]">Used For</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9480F] mt-1.5 flex-shrink-0" />
                  System notifications
                </li>
                <li className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9480F] mt-1.5 flex-shrink-0" />
                  Billing and invoices
                </li>
                <li className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9480F] mt-1.5 flex-shrink-0" />
                  Security alerts
                </li>
                <li className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9480F] mt-1.5 flex-shrink-0" />
                  Password resets
                </li>
                <li className="flex items-start gap-2 text-sm text-[#6B7280]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9480F] mt-1.5 flex-shrink-0" />
                  Account verification
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                <p className="text-xs text-[#9CA3AF] italic">
                  This configuration does not affect marketing emails.
                </p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#991B1B] mb-2">Security & Audit</h3>
                  <ul className="space-y-1.5 text-sm text-[#DC2626]">
                    <li>• API keys and passwords are encrypted</li>
                    <li>• Changes require confirmation</li>
                    <li>• All updates are logged</li>
                    <li>• No plaintext secrets stored</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {mockEmailAuditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: getAuditActionColor(log.action) }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111827]">
                        {getAuditActionLabel(log.action)}
                      </p>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {formatRelativeTime(log.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Change Warning Modal */}
      {showProviderWarning && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowProviderWarning(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#111827] mb-1">
                    Change Email Provider?
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    You are about to change the active email provider from{' '}
                    <span className="font-medium text-[#111827]">
                      {getProviderLabel(config.provider)}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium text-[#111827]">
                      {getProviderLabel(selectedProvider)}
                    </span>
                    . This will require reconfiguration and testing.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowProviderWarning(false);
                    setSelectedProvider(config.provider);
                  }}
                  className="flex-1 h-10 px-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium text-[#111827]"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmProviderChange}
                  className="flex-1 h-10 px-4 bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Change Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
