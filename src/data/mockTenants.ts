export type TenantStatus = 'trial' | 'active' | 'suspended' | 'expired' | 'archived';
export type TenantEdition = 'starter' | 'professional' | 'enterprise' | 'custom';
export type BillingStatus = 'paid' | 'pending' | 'overdue' | 'trial';

export interface Tenant {
  id: string;
  tenantId: string; // System-generated unique ID
  companyName: string;
  edition: TenantEdition;
  status: TenantStatus;
  billingStatus: BillingStatus;
  totalUsers: number;
  totalScreens: number;
  storageUsedGB: number;
  activeCampaigns: number;
  createdDate: string;
  primaryAdminEmail: string;
  primaryAdminName: string;
  contactPhone?: string;
  address?: string;
  region: string;
  timezone: string;
  lastLogin?: string;
  failedLoginAttempts: number;
  mfaEnforced: boolean;
  isTrial: boolean;
  trialEndsDate?: string;
}

export const mockTenants: Tenant[] = [
  {
    id: '1',
    tenantId: 'TNT-2024-001',
    companyName: 'Acme Corporation',
    edition: 'enterprise',
    status: 'active',
    billingStatus: 'paid',
    totalUsers: 24,
    totalScreens: 156,
    storageUsedGB: 48.5,
    activeCampaigns: 12,
    createdDate: '2023-06-15T10:00:00Z',
    primaryAdminEmail: 'admin@acmecorp.com',
    primaryAdminName: 'John Smith',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Business Ave, New York, NY 10001',
    region: 'North America',
    timezone: 'America/New_York',
    lastLogin: '2025-01-10T14:30:00Z',
    failedLoginAttempts: 0,
    mfaEnforced: true,
    isTrial: false,
  },
  {
    id: '2',
    tenantId: 'TNT-2024-002',
    companyName: 'Brew Coffee Co.',
    edition: 'professional',
    status: 'active',
    billingStatus: 'paid',
    totalUsers: 8,
    totalScreens: 32,
    storageUsedGB: 12.3,
    activeCampaigns: 5,
    createdDate: '2024-03-20T09:30:00Z',
    primaryAdminEmail: 'it@brewcoffee.com',
    primaryAdminName: 'Emma Wilson',
    contactPhone: '+1 (555) 234-5678',
    address: '456 Coffee Street, Seattle, WA 98101',
    region: 'North America',
    timezone: 'America/Los_Angeles',
    lastLogin: '2025-01-08T11:20:00Z',
    failedLoginAttempts: 0,
    mfaEnforced: true,
    isTrial: false,
  },
  {
    id: '3',
    tenantId: 'TNT-2024-003',
    companyName: 'FitLife Gym',
    edition: 'starter',
    status: 'trial',
    billingStatus: 'trial',
    totalUsers: 3,
    totalScreens: 8,
    storageUsedGB: 2.1,
    activeCampaigns: 2,
    createdDate: '2025-01-05T08:00:00Z',
    primaryAdminEmail: 'manager@fitlifegym.com',
    primaryAdminName: 'Michael Chen',
    contactPhone: '+1 (555) 345-6789',
    region: 'North America',
    timezone: 'America/Chicago',
    lastLogin: '2025-01-09T16:45:00Z',
    failedLoginAttempts: 0,
    mfaEnforced: false,
    isTrial: true,
    trialEndsDate: '2025-02-05T08:00:00Z',
  },
  {
    id: '4',
    tenantId: 'TNT-2024-004',
    companyName: 'TechStart Inc.',
    edition: 'professional',
    status: 'active',
    billingStatus: 'pending',
    totalUsers: 12,
    totalScreens: 45,
    storageUsedGB: 28.7,
    activeCampaigns: 8,
    createdDate: '2024-08-10T12:00:00Z',
    primaryAdminEmail: 'ops@techstart.com',
    primaryAdminName: 'Sarah Johnson',
    contactPhone: '+1 (555) 456-7890',
    address: '789 Innovation Blvd, San Francisco, CA 94105',
    region: 'North America',
    timezone: 'America/Los_Angeles',
    lastLogin: '2025-01-07T09:15:00Z',
    failedLoginAttempts: 1,
    mfaEnforced: true,
    isTrial: false,
  },
  {
    id: '5',
    tenantId: 'TNT-2024-005',
    companyName: 'RetailMax Group',
    edition: 'enterprise',
    status: 'active',
    billingStatus: 'paid',
    totalUsers: 45,
    totalScreens: 280,
    storageUsedGB: 124.8,
    activeCampaigns: 28,
    createdDate: '2023-11-08T14:30:00Z',
    primaryAdminEmail: 'digital@retailmax.com',
    primaryAdminName: 'David Martinez',
    contactPhone: '+1 (555) 567-8901',
    address: '321 Retail Plaza, Chicago, IL 60601',
    region: 'North America',
    timezone: 'America/Chicago',
    lastLogin: '2025-01-10T13:00:00Z',
    failedLoginAttempts: 0,
    mfaEnforced: true,
    isTrial: false,
  },
  {
    id: '6',
    tenantId: 'TNT-2024-006',
    companyName: 'Global Media Networks',
    edition: 'custom',
    status: 'suspended',
    billingStatus: 'overdue',
    totalUsers: 18,
    totalScreens: 95,
    storageUsedGB: 56.2,
    activeCampaigns: 0,
    createdDate: '2024-02-14T11:00:00Z',
    primaryAdminEmail: 'admin@globalmedia.com',
    primaryAdminName: 'Lisa Anderson',
    contactPhone: '+1 (555) 678-9012',
    address: '555 Media Way, Los Angeles, CA 90001',
    region: 'North America',
    timezone: 'America/Los_Angeles',
    lastLogin: '2024-12-15T10:30:00Z',
    failedLoginAttempts: 3,
    mfaEnforced: false,
    isTrial: false,
  },
  {
    id: '7',
    tenantId: 'TNT-2024-007',
    companyName: 'Urban Transit Systems',
    edition: 'enterprise',
    status: 'active',
    billingStatus: 'paid',
    totalUsers: 32,
    totalScreens: 420,
    storageUsedGB: 89.3,
    activeCampaigns: 15,
    createdDate: '2023-09-22T10:15:00Z',
    primaryAdminEmail: 'it@urbantransit.com',
    primaryAdminName: 'Robert Taylor',
    contactPhone: '+1 (555) 789-0123',
    address: '777 Transit Hub, Boston, MA 02101',
    region: 'North America',
    timezone: 'America/New_York',
    lastLogin: '2025-01-09T08:45:00Z',
    failedLoginAttempts: 0,
    mfaEnforced: true,
    isTrial: false,
  },
  {
    id: '8',
    tenantId: 'TNT-2024-008',
    companyName: 'HealthPlus Clinics',
    edition: 'starter',
    status: 'trial',
    billingStatus: 'trial',
    totalUsers: 2,
    totalScreens: 5,
    storageUsedGB: 0.8,
    activeCampaigns: 1,
    createdDate: '2025-01-08T13:20:00Z',
    primaryAdminEmail: 'reception@healthplus.com',
    primaryAdminName: 'Jennifer Lee',
    region: 'North America',
    timezone: 'America/Denver',
    lastLogin: '2025-01-10T07:30:00Z',
    failedLoginAttempts: 0,
    mfaEnforced: false,
    isTrial: true,
    trialEndsDate: '2025-02-08T13:20:00Z',
  },
  {
    id: '9',
    tenantId: 'TNT-2024-009',
    companyName: 'EduLearn Academy',
    edition: 'professional',
    status: 'expired',
    billingStatus: 'overdue',
    totalUsers: 6,
    totalScreens: 18,
    storageUsedGB: 8.4,
    activeCampaigns: 0,
    createdDate: '2024-01-15T09:00:00Z',
    primaryAdminEmail: 'admin@edulearn.edu',
    primaryAdminName: 'Dr. Patricia White',
    contactPhone: '+1 (555) 890-1234',
    region: 'North America',
    timezone: 'America/New_York',
    lastLogin: '2024-11-20T15:00:00Z',
    failedLoginAttempts: 0,
    mfaEnforced: false,
    isTrial: false,
  },
  {
    id: '10',
    tenantId: 'TNT-2024-010',
    companyName: 'QuickServe Restaurants',
    edition: 'professional',
    status: 'active',
    billingStatus: 'paid',
    totalUsers: 15,
    totalScreens: 68,
    storageUsedGB: 34.5,
    activeCampaigns: 9,
    createdDate: '2024-05-03T10:45:00Z',
    primaryAdminEmail: 'digital@quickserve.com',
    primaryAdminName: 'Carlos Rodriguez',
    contactPhone: '+1 (555) 901-2345',
    address: '888 Restaurant Row, Miami, FL 33101',
    region: 'North America',
    timezone: 'America/New_York',
    lastLogin: '2025-01-10T12:20:00Z',
    failedLoginAttempts: 0,
    mfaEnforced: true,
    isTrial: false,
  },
];

export const getEditionLabel = (edition: TenantEdition): string => {
  const labels = {
    starter: 'Starter',
    professional: 'Professional',
    enterprise: 'Enterprise',
    custom: 'Custom',
  };
  return labels[edition];
};

export const getEditionColor = (edition: TenantEdition): string => {
  const colors = {
    starter: 'bg-blue-50 text-blue-700 border-blue-200',
    professional: 'bg-purple-50 text-purple-700 border-purple-200',
    enterprise: 'bg-orange-50 text-orange-700 border-orange-200',
    custom: 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return colors[edition];
};

export const getStatusLabel = (status: TenantStatus): string => {
  const labels = {
    trial: 'Trial',
    active: 'Active',
    suspended: 'Suspended',
    expired: 'Expired',
    archived: 'Archived',
  };
  return labels[status];
};

export const getStatusColor = (status: TenantStatus): string => {
  const colors = {
    trial: 'bg-blue-50 text-blue-700 border-blue-200',
    active: 'bg-green-50 text-green-700 border-green-200',
    suspended: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    expired: 'bg-red-50 text-red-700 border-red-200',
    archived: 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return colors[status];
};

export const getBillingStatusLabel = (status: BillingStatus): string => {
  const labels = {
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue',
    trial: 'Trial',
  };
  return labels[status];
};

export const getBillingStatusColor = (status: BillingStatus): string => {
  const colors = {
    paid: 'bg-green-50 text-green-700 border-green-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    overdue: 'bg-red-50 text-red-700 border-red-200',
    trial: 'bg-blue-50 text-blue-700 border-blue-200',
  };
  return colors[status];
};
