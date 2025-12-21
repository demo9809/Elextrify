export type KeyType = 'system' | 'integration' | 'service';
export type Environment = 'production' | 'sandbox';
export type KeyStatus = 'active' | 'revoked' | 'expired';
export type AccessLevel = 'read' | 'write' | 'admin';

export interface ApiScope {
  id: string;
  name: string;
  description: string;
  accessLevel: AccessLevel;
  isHighRisk?: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  description?: string;
  keyType: KeyType;
  environment: Environment;
  status: KeyStatus;
  scopes: ApiScope[];
  ipAllowlist?: string[];
  rateLimit?: number; // requests per minute
  expiryDate?: string;
  createdBy: string;
  createdAt: string;
  lastUsed?: string;
  requestCount24h: number;
  requestCount7d: number;
  errorRate: number; // percentage
  maskedKey: string; // Only show last 4 characters
}

export interface ApiEndpoint {
  id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  category: string;
  totalCalls: number;
  uniqueKeys: number;
  avgResponseTime: number; // ms
  errorRate: number; // percentage
}

export interface ApiUsageLog {
  id: string;
  keyId: string;
  keyName: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number; // ms
  timestamp: string;
  ipAddress: string;
}

export interface ApiAuditLog {
  id: string;
  action: 'key_created' | 'key_regenerated' | 'key_revoked' | 'scope_changed' | 'excessive_usage_detected';
  keyId: string;
  keyName: string;
  performedBy: string;
  performedByEmail: string;
  timestamp: string;
  details: string;
  beforeState?: string;
  afterState?: string;
}

export interface ApiOverviewStats {
  totalActiveKeys: number;
  totalApisEnabled: number;
  requests24h: number;
  requests7d: number;
  errorRate: number;
  trend24h: number; // percentage change
}

// Available API Scopes
export const availableApiScopes: Omit<ApiScope, 'id' | 'accessLevel'>[] = [
  {
    name: 'Tenants API',
    description: 'Manage tenants, organizations, and multi-tenant operations',
    isHighRisk: true,
  },
  {
    name: 'Organization Units API',
    description: 'Access and manage organizational hierarchy and units',
    isHighRisk: false,
  },
  {
    name: 'Media API',
    description: 'Upload, manage, and retrieve media assets',
    isHighRisk: false,
  },
  {
    name: 'Playlists API',
    description: 'Create, update, and manage content playlists',
    isHighRisk: false,
  },
  {
    name: 'Campaigns API',
    description: 'Manage advertising campaigns and ad groups',
    isHighRisk: false,
  },
  {
    name: 'Devices / Kiosks API',
    description: 'Control and monitor digital signage devices',
    isHighRisk: false,
  },
  {
    name: 'Billing API',
    description: 'Access billing data, invoices, and payment information',
    isHighRisk: true,
  },
  {
    name: 'Reports & Analytics API',
    description: 'Retrieve analytics data and generate reports',
    isHighRisk: false,
  },
];

// Mock API Keys
export const mockApiKeys: ApiKey[] = [
  {
    id: 'key_1',
    name: 'Production Integration',
    description: 'Main production API key for external integration',
    keyType: 'integration',
    environment: 'production',
    status: 'active',
    scopes: [
      {
        id: 'scope_1',
        name: 'Media API',
        description: 'Upload, manage, and retrieve media assets',
        accessLevel: 'write',
      },
      {
        id: 'scope_2',
        name: 'Playlists API',
        description: 'Create, update, and manage content playlists',
        accessLevel: 'read',
      },
      {
        id: 'scope_3',
        name: 'Campaigns API',
        description: 'Manage advertising campaigns and ad groups',
        accessLevel: 'read',
      },
    ],
    ipAllowlist: ['203.0.113.0', '198.51.100.0'],
    rateLimit: 1000,
    expiryDate: '2025-12-31T23:59:59Z',
    createdBy: 'Admin User',
    createdAt: '2024-06-15T10:00:00Z',
    lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    requestCount24h: 2847,
    requestCount7d: 18392,
    errorRate: 1.2,
    maskedKey: 'pk_live_••••••••••••••••3x8K',
  },
  {
    id: 'key_2',
    name: 'Sandbox Testing',
    description: 'Development and testing key',
    keyType: 'integration',
    environment: 'sandbox',
    status: 'active',
    scopes: [
      {
        id: 'scope_4',
        name: 'Media API',
        description: 'Upload, manage, and retrieve media assets',
        accessLevel: 'admin',
      },
      {
        id: 'scope_5',
        name: 'Devices / Kiosks API',
        description: 'Control and monitor digital signage devices',
        accessLevel: 'write',
      },
    ],
    rateLimit: 500,
    createdBy: 'Tech Lead',
    createdAt: '2024-09-01T14:30:00Z',
    lastUsed: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    requestCount24h: 156,
    requestCount7d: 892,
    errorRate: 4.5,
    maskedKey: 'pk_test_••••••••••••••••7mQ2',
  },
  {
    id: 'key_3',
    name: 'Billing System Integration',
    description: 'Internal billing system access',
    keyType: 'system',
    environment: 'production',
    status: 'active',
    scopes: [
      {
        id: 'scope_6',
        name: 'Billing API',
        description: 'Access billing data, invoices, and payment information',
        accessLevel: 'admin',
        isHighRisk: true,
      },
      {
        id: 'scope_7',
        name: 'Tenants API',
        description: 'Manage tenants, organizations, and multi-tenant operations',
        accessLevel: 'read',
        isHighRisk: true,
      },
    ],
    ipAllowlist: ['192.0.2.0'],
    rateLimit: 2000,
    createdBy: 'System Admin',
    createdAt: '2024-03-20T08:00:00Z',
    lastUsed: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    requestCount24h: 1234,
    requestCount7d: 8456,
    errorRate: 0.3,
    maskedKey: 'sk_live_••••••••••••••••9pL1',
  },
  {
    id: 'key_4',
    name: 'Legacy Integration (Revoked)',
    keyType: 'integration',
    environment: 'production',
    status: 'revoked',
    scopes: [
      {
        id: 'scope_8',
        name: 'Media API',
        description: 'Upload, manage, and retrieve media assets',
        accessLevel: 'read',
      },
    ],
    createdBy: 'Former Admin',
    createdAt: '2023-11-10T12:00:00Z',
    lastUsed: '2024-10-15T16:45:00Z',
    requestCount24h: 0,
    requestCount7d: 0,
    errorRate: 0,
    maskedKey: 'pk_live_••••••••••••••••2kX9',
  },
];

// Mock API Endpoints
export const mockApiEndpoints: ApiEndpoint[] = [
  {
    id: 'endpoint_1',
    name: 'Get Media Library',
    path: '/api/v1/media',
    method: 'GET',
    category: 'Media',
    totalCalls: 4523,
    uniqueKeys: 3,
    avgResponseTime: 145,
    errorRate: 0.8,
  },
  {
    id: 'endpoint_2',
    name: 'Upload Media',
    path: '/api/v1/media/upload',
    method: 'POST',
    category: 'Media',
    totalCalls: 892,
    uniqueKeys: 2,
    avgResponseTime: 523,
    errorRate: 2.1,
  },
  {
    id: 'endpoint_3',
    name: 'List Campaigns',
    path: '/api/v1/campaigns',
    method: 'GET',
    category: 'Campaigns',
    totalCalls: 2134,
    uniqueKeys: 2,
    avgResponseTime: 98,
    errorRate: 0.3,
  },
  {
    id: 'endpoint_4',
    name: 'Create Campaign',
    path: '/api/v1/campaigns',
    method: 'POST',
    category: 'Campaigns',
    totalCalls: 234,
    uniqueKeys: 1,
    avgResponseTime: 312,
    errorRate: 1.7,
  },
  {
    id: 'endpoint_5',
    name: 'Get Device Status',
    path: '/api/v1/devices/:id/status',
    method: 'GET',
    category: 'Devices',
    totalCalls: 8923,
    uniqueKeys: 2,
    avgResponseTime: 67,
    errorRate: 0.5,
  },
  {
    id: 'endpoint_6',
    name: 'List Invoices',
    path: '/api/v1/billing/invoices',
    method: 'GET',
    category: 'Billing',
    totalCalls: 567,
    uniqueKeys: 1,
    avgResponseTime: 234,
    errorRate: 0.2,
  },
];

// Mock Usage Logs
export const mockApiUsageLogs: ApiUsageLog[] = [
  {
    id: 'log_1',
    keyId: 'key_1',
    keyName: 'Production Integration',
    endpoint: '/api/v1/media',
    method: 'GET',
    statusCode: 200,
    responseTime: 134,
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    ipAddress: '203.0.113.0',
  },
  {
    id: 'log_2',
    keyId: 'key_2',
    keyName: 'Sandbox Testing',
    endpoint: '/api/v1/devices/123/status',
    method: 'GET',
    statusCode: 200,
    responseTime: 78,
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    ipAddress: '198.51.100.50',
  },
  {
    id: 'log_3',
    keyId: 'key_1',
    keyName: 'Production Integration',
    endpoint: '/api/v1/campaigns',
    method: 'GET',
    statusCode: 200,
    responseTime: 112,
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    ipAddress: '203.0.113.0',
  },
  {
    id: 'log_4',
    keyId: 'key_3',
    keyName: 'Billing System Integration',
    endpoint: '/api/v1/billing/invoices',
    method: 'GET',
    statusCode: 200,
    responseTime: 245,
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    ipAddress: '192.0.2.0',
  },
  {
    id: 'log_5',
    keyId: 'key_2',
    keyName: 'Sandbox Testing',
    endpoint: '/api/v1/media/upload',
    method: 'POST',
    statusCode: 400,
    responseTime: 89,
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    ipAddress: '198.51.100.50',
  },
];

// Mock Audit Logs
export const mockApiAuditLogs: ApiAuditLog[] = [
  {
    id: 'audit_1',
    action: 'key_created',
    keyId: 'key_2',
    keyName: 'Sandbox Testing',
    performedBy: 'Tech Lead',
    performedByEmail: 'tech@doohplatform.com',
    timestamp: '2024-09-01T14:30:00Z',
    details: 'Created new sandbox API key with Media and Devices scopes',
  },
  {
    id: 'audit_2',
    action: 'key_revoked',
    keyId: 'key_4',
    keyName: 'Legacy Integration (Revoked)',
    performedBy: 'Admin User',
    performedByEmail: 'admin@doohplatform.com',
    timestamp: '2024-10-15T16:45:00Z',
    details: 'Revoked legacy API key due to security audit',
  },
  {
    id: 'audit_3',
    action: 'scope_changed',
    keyId: 'key_1',
    keyName: 'Production Integration',
    performedBy: 'Admin User',
    performedByEmail: 'admin@doohplatform.com',
    timestamp: '2024-11-05T09:20:00Z',
    details: 'Added Campaigns API read scope',
    beforeState: 'Media (write), Playlists (read)',
    afterState: 'Media (write), Playlists (read), Campaigns (read)',
  },
];

// Mock Overview Stats
export const mockApiOverviewStats: ApiOverviewStats = {
  totalActiveKeys: 3,
  totalApisEnabled: 8,
  requests24h: 4237,
  requests7d: 27740,
  errorRate: 1.5,
  trend24h: 12.4, // 12.4% increase
};

// Utility functions
export const getKeyTypeLabel = (type: KeyType): string => {
  const labels: Record<KeyType, string> = {
    system: 'System',
    integration: 'Integration',
    service: 'Service',
  };
  return labels[type];
};

export const getKeyTypeBadgeColor = (type: KeyType): { bg: string; text: string } => {
  const colors: Record<KeyType, { bg: string; text: string }> = {
    system: { bg: '#DBEAFE', text: '#1E40AF' },
    integration: { bg: '#DCFCE7', text: '#15803D' },
    service: { bg: '#FEF3C7', text: '#92400E' },
  };
  return colors[type];
};

export const getStatusBadgeColor = (status: KeyStatus): { bg: string; text: string } => {
  const colors: Record<KeyStatus, { bg: string; text: string }> = {
    active: { bg: '#DCFCE7', text: '#15803D' },
    revoked: { bg: '#FEE2E2', text: '#991B1B' },
    expired: { bg: '#FEF3C7', text: '#92400E' },
  };
  return colors[status];
};

export const getAccessLevelLabel = (level: AccessLevel): string => {
  const labels: Record<AccessLevel, string> = {
    read: 'Read',
    write: 'Write',
    admin: 'Admin',
  };
  return labels[level];
};

export const getAccessLevelColor = (level: AccessLevel): string => {
  const colors: Record<AccessLevel, string> = {
    read: '#3B82F6',
    write: '#F59E0B',
    admin: '#DC2626',
  };
  return colors[level];
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
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
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getHttpMethodColor = (method: string): { bg: string; text: string } => {
  const colors: Record<string, { bg: string; text: string }> = {
    GET: { bg: '#DBEAFE', text: '#1E40AF' },
    POST: { bg: '#DCFCE7', text: '#15803D' },
    PUT: { bg: '#FEF3C7', text: '#92400E' },
    DELETE: { bg: '#FEE2E2', text: '#991B1B' },
    PATCH: { bg: '#F3E8FF', text: '#6B21A8' },
  };
  return colors[method] || { bg: '#F3F4F6', text: '#6B7280' };
};

export const getAuditActionLabel = (action: ApiAuditLog['action']): string => {
  const labels = {
    key_created: 'Key Created',
    key_regenerated: 'Key Regenerated',
    key_revoked: 'Key Revoked',
    scope_changed: 'Scope Changed',
    excessive_usage_detected: 'Excessive Usage Detected',
  };
  return labels[action];
};

export const getAuditActionColor = (action: ApiAuditLog['action']): string => {
  const colors = {
    key_created: '#16A34A',
    key_regenerated: '#3B82F6',
    key_revoked: '#DC2626',
    scope_changed: '#F59E0B',
    excessive_usage_detected: '#DC2626',
  };
  return colors[action];
};
