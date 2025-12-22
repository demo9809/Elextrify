export type MediaInvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled';

export interface CampaignLineItem {
  campaignId: string;
  campaignName: string;
  clientName: string;
  hoursRun: number;
  screensUsed: number;
  regions: string[];
  ratePerHour: number;
  totalAmount: number;
}

export interface MediaInvoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  period: string;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  status: MediaInvoiceStatus;
  campaigns: CampaignLineItem[];
  subtotal: number;
  tax: number;
  taxRate: number;
  total: number;
  currency: string;
  gstNumber?: string;
  panNumber?: string;
}

export interface MediaBillingOverview {
  totalRevenue: number;
  pendingAmount: number;
  overdueAmount: number;
  totalInvoices: number;
  currency: string;
  topClients: {
    clientId: string;
    clientName: string;
    totalBilled: number;
    invoiceCount: number;
  }[];
}

// Mock data
export const mockMediaInvoices: MediaInvoice[] = [
  {
    id: 'mi_001',
    invoiceNumber: 'MED-2024-001',
    clientId: 'client_1',
    clientName: 'Acme Corporation',
    period: 'November 2024',
    issuedDate: '2024-12-01T00:00:00Z',
    dueDate: '2024-12-15T00:00:00Z',
    paidDate: '2024-12-10T00:00:00Z',
    status: 'paid',
    gstNumber: '29AABCU9603R1ZX',
    panNumber: 'AABCU9603R',
    campaigns: [
      {
        campaignId: 'camp_1',
        campaignName: 'Diwali 2024 Offer',
        clientName: 'Acme Corporation',
        hoursRun: 240,
        screensUsed: 15,
        regions: ['Mumbai', 'Delhi', 'Bangalore'],
        ratePerHour: 50,
        totalAmount: 12000,
      },
      {
        campaignId: 'camp_2',
        campaignName: 'Black Friday Sale',
        clientName: 'Acme Corporation',
        hoursRun: 180,
        screensUsed: 12,
        regions: ['Mumbai', 'Pune'],
        ratePerHour: 50,
        totalAmount: 9000,
      },
    ],
    subtotal: 21000,
    tax: 3780,
    taxRate: 18,
    total: 24780,
    currency: 'INR',
  },
  {
    id: 'mi_002',
    invoiceNumber: 'MED-2024-002',
    clientId: 'client_2',
    clientName: 'Brew Coffee Co.',
    period: 'November 2024',
    issuedDate: '2024-12-01T00:00:00Z',
    dueDate: '2024-12-15T00:00:00Z',
    status: 'pending',
    gstNumber: '27AAPFU0939F1Z1',
    panNumber: 'AAPFU0939F',
    campaigns: [
      {
        campaignId: 'camp_3',
        campaignName: 'New Blend Launch',
        clientName: 'Brew Coffee Co.',
        hoursRun: 320,
        screensUsed: 20,
        regions: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
        ratePerHour: 45,
        totalAmount: 14400,
      },
    ],
    subtotal: 14400,
    tax: 2592,
    taxRate: 18,
    total: 16992,
    currency: 'INR',
  },
  {
    id: 'mi_003',
    invoiceNumber: 'MED-2024-003',
    clientId: 'client_3',
    clientName: 'FitLife Gym',
    period: 'October 2024',
    issuedDate: '2024-11-01T00:00:00Z',
    dueDate: '2024-11-15T00:00:00Z',
    status: 'overdue',
    gstNumber: '29AACCT1234E1Z5',
    panNumber: 'AACCT1234E',
    campaigns: [
      {
        campaignId: 'camp_4',
        campaignName: 'Fitness First Campaign',
        clientName: 'FitLife Gym',
        hoursRun: 150,
        screensUsed: 8,
        regions: ['Bangalore', 'Pune'],
        ratePerHour: 40,
        totalAmount: 6000,
      },
      {
        campaignId: 'camp_5',
        campaignName: 'New Year Membership',
        clientName: 'FitLife Gym',
        hoursRun: 200,
        screensUsed: 10,
        regions: ['Bangalore', 'Chennai'],
        ratePerHour: 40,
        totalAmount: 8000,
      },
    ],
    subtotal: 14000,
    tax: 2520,
    taxRate: 18,
    total: 16520,
    currency: 'INR',
  },
  {
    id: 'mi_004',
    invoiceNumber: 'MED-2024-004',
    clientId: 'client_4',
    clientName: 'TechStart Inc.',
    period: 'December 2024',
    issuedDate: '2024-12-15T00:00:00Z',
    dueDate: '2024-12-30T00:00:00Z',
    status: 'pending',
    gstNumber: '06AABCT1234M1Z2',
    panNumber: 'AABCT1234M',
    campaigns: [
      {
        campaignId: 'camp_6',
        campaignName: 'Product Launch 2025',
        clientName: 'TechStart Inc.',
        hoursRun: 400,
        screensUsed: 25,
        regions: ['Delhi', 'Noida', 'Gurgaon', 'Mumbai'],
        ratePerHour: 60,
        totalAmount: 24000,
      },
    ],
    subtotal: 24000,
    tax: 4320,
    taxRate: 18,
    total: 28320,
    currency: 'INR',
  },
];

export const mockMediaBillingOverview: MediaBillingOverview = {
  totalRevenue: 86612,
  pendingAmount: 45312,
  overdueAmount: 16520,
  totalInvoices: 4,
  currency: 'INR',
  topClients: [
    {
      clientId: 'client_4',
      clientName: 'TechStart Inc.',
      totalBilled: 28320,
      invoiceCount: 1,
    },
    {
      clientId: 'client_1',
      clientName: 'Acme Corporation',
      totalBilled: 24780,
      invoiceCount: 1,
    },
    {
      clientId: 'client_2',
      clientName: 'Brew Coffee Co.',
      totalBilled: 16992,
      invoiceCount: 1,
    },
    {
      clientId: 'client_3',
      clientName: 'FitLife Gym',
      totalBilled: 16520,
      invoiceCount: 1,
    },
  ],
};

// Helper functions
export function getMediaInvoiceStatusLabel(status: MediaInvoiceStatus): string {
  const labels = {
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue',
    cancelled: 'Cancelled',
  };
  return labels[status];
}

export function getMediaInvoiceStatusColor(status: MediaInvoiceStatus): string {
  const colors = {
    paid: 'bg-green-50 text-green-700 border-green-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    overdue: 'bg-red-50 text-red-700 border-red-200',
    cancelled: 'bg-gray-50 text-gray-700 border-gray-200',
  };
  return colors[status];
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
