export type EmailProvider = 
  | 'smtp'
  | 'mailgun'
  | 'sendgrid'
  | 'ses'
  | 'resend'
  | 'postmark'
  | 'mailchimp-transactional'
  | 'zoho'
  | 'other';

export type EncryptionType = 'none' | 'tls' | 'ssl';

export interface SMTPConfig {
  server: string;
  port: number;
  encryption: EncryptionType;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

export interface APIBasedConfig {
  apiKey: string;
  senderEmail: string;
  senderName: string;
  domain?: string;
  region?: string;
}

export interface EmailConfiguration {
  id: string;
  provider: EmailProvider;
  isActive: boolean;
  smtpConfig?: SMTPConfig;
  apiConfig?: APIBasedConfig;
  lastSuccessfulSend?: string;
  lastTestedAt?: string;
  testEmailStatus?: 'success' | 'failed' | 'pending';
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface EmailAuditLog {
  id: string;
  action: 'provider_changed' | 'credentials_updated' | 'test_executed' | 'configuration_activated' | 'configuration_deactivated';
  provider: EmailProvider;
  performedBy: string;
  performedByEmail: string;
  timestamp: string;
  details: string;
  success: boolean;
}

// Mock data
export const mockEmailConfig: EmailConfiguration = {
  id: 'email_config_1',
  provider: 'sendgrid',
  isActive: true,
  apiConfig: {
    apiKey: 'SG.***************************xyz',
    senderEmail: 'noreply@doohplatform.com',
    senderName: 'DOOH Platform',
    region: 'Global',
  },
  lastSuccessfulSend: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  lastTestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  testEmailStatus: 'success',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  updatedBy: 'Admin User',
};

export const mockEmailAuditLogs: EmailAuditLog[] = [
  {
    id: 'audit_1',
    action: 'test_executed',
    provider: 'sendgrid',
    performedBy: 'Admin User',
    performedByEmail: 'admin@doohplatform.com',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    details: 'Test email sent successfully to admin@doohplatform.com',
    success: true,
  },
  {
    id: 'audit_2',
    action: 'credentials_updated',
    provider: 'sendgrid',
    performedBy: 'Admin User',
    performedByEmail: 'admin@doohplatform.com',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    details: 'API key and sender details updated',
    success: true,
  },
  {
    id: 'audit_3',
    action: 'provider_changed',
    provider: 'sendgrid',
    performedBy: 'Admin User',
    performedByEmail: 'admin@doohplatform.com',
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    details: 'Email provider changed from SMTP to SendGrid',
    success: true,
  },
];

export const getProviderLabel = (provider: EmailProvider): string => {
  const labels: Record<EmailProvider, string> = {
    smtp: 'SMTP (Custom)',
    mailgun: 'Mailgun',
    sendgrid: 'SendGrid',
    ses: 'Amazon SES',
    resend: 'Resend',
    postmark: 'Postmark',
    'mailchimp-transactional': 'Mailchimp Transactional',
    zoho: 'Zoho Mail',
    other: 'Other (API-based)',
  };
  return labels[provider];
};

export const getProviderHelpText = (provider: EmailProvider): string => {
  const helpTexts: Record<EmailProvider, string> = {
    smtp: 'Configure your own SMTP server for sending emails. Requires server credentials.',
    mailgun: 'Use Mailgun\'s powerful email API for reliable transactional email delivery.',
    sendgrid: 'SendGrid provides enterprise-grade email delivery infrastructure.',
    ses: 'Amazon SES offers scalable, cost-effective email sending through AWS.',
    resend: 'Modern email API built for developers with excellent deliverability.',
    postmark: 'Postmark specializes in transactional email delivery with detailed tracking.',
    'mailchimp-transactional': 'Mailchimp Transactional (formerly Mandrill) for automated emails.',
    zoho: 'Zoho Mail provides business email hosting with transactional capabilities.',
    other: 'Configure a custom API-based email service provider.',
  };
  return helpTexts[provider];
};

export const formatRelativeTime = (timestamp: string): string => {
  const now = Date.now();
  const time = new Date(timestamp).getTime();
  const diff = now - time;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getAuditActionLabel = (action: EmailAuditLog['action']): string => {
  const labels = {
    provider_changed: 'Provider Changed',
    credentials_updated: 'Credentials Updated',
    test_executed: 'Test Executed',
    configuration_activated: 'Configuration Activated',
    configuration_deactivated: 'Configuration Deactivated',
  };
  return labels[action];
};

export const getAuditActionColor = (action: EmailAuditLog['action']): string => {
  const colors = {
    provider_changed: '#D9480F',
    credentials_updated: '#3B82F6',
    test_executed: '#16A34A',
    configuration_activated: '#16A34A',
    configuration_deactivated: '#F59E0B',
  };
  return colors[action];
};
