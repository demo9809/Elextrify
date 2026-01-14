// Module-Specific Permission Definitions
// Each module defines its own unique set of permissions based on real operational needs

export interface ModulePermissionGroup {
  id: string;
  name: string;
  description: string;
  permissions: ModulePermission[];
}

export interface ModulePermission {
  id: string;
  name: string;
  description: string;
  isSensitive?: boolean; // Highlights high-risk permissions
  requiresParent?: string; // Parent permission that must be enabled
}

export interface PermissionModule {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  groups: ModulePermissionGroup[];
}

// Define module-specific permissions
export const MODULE_PERMISSIONS: PermissionModule[] = [
  {
    id: 'campaigns',
    name: 'Campaigns',
    description: 'Advertising campaign management',
    icon: 'Megaphone',
    groups: [
      {
        id: 'basic',
        name: 'Basic Actions',
        description: 'Core campaign operations',
        permissions: [
          { id: 'view', name: 'View campaigns', description: 'See campaign details and status' },
          { id: 'create', name: 'Create campaigns', description: 'Create new campaigns', requiresParent: 'view' },
          { id: 'edit', name: 'Edit campaigns', description: 'Modify existing campaigns', requiresParent: 'view' },
          { id: 'duplicate', name: 'Duplicate campaigns', description: 'Clone existing campaigns', requiresParent: 'view' },
        ],
      },
      {
        id: 'management',
        name: 'Campaign Management',
        description: 'Lifecycle and workflow controls',
        permissions: [
          { id: 'pause', name: 'Pause or resume campaigns', description: 'Control campaign execution', requiresParent: 'view' },
          { id: 'approve', name: 'Approve campaigns', description: 'Review and approve campaigns for launch', isSensitive: true },
          { id: 'archive', name: 'Archive campaigns', description: 'Move campaigns to archive', requiresParent: 'view' },
          { id: 'delete', name: 'Delete campaigns', description: 'Permanently remove campaigns', isSensitive: true, requiresParent: 'view' },
        ],
      },
      {
        id: 'targeting',
        name: 'Targeting & Assignment',
        description: 'Screen and location management',
        permissions: [
          { id: 'assign_screens', name: 'Assign campaigns to screens', description: 'Select which screens display the campaign', requiresParent: 'view' },
          { id: 'modify_schedule', name: 'Modify campaign schedules', description: 'Change when campaigns run', requiresParent: 'view' },
        ],
      },
    ],
  },
  {
    id: 'media',
    name: 'Media Library',
    description: 'Digital asset management',
    icon: 'Image',
    groups: [
      {
        id: 'basic',
        name: 'Basic Actions',
        description: 'Core media operations',
        permissions: [
          { id: 'view', name: 'View media', description: 'Browse and preview media assets' },
          { id: 'upload', name: 'Upload media', description: 'Add new media files', requiresParent: 'view' },
          { id: 'download', name: 'Download media', description: 'Download media files locally', requiresParent: 'view' },
        ],
      },
      {
        id: 'management',
        name: 'Asset Management',
        description: 'Organize and maintain media',
        permissions: [
          { id: 'replace', name: 'Replace media', description: 'Swap existing media files', requiresParent: 'view', isSensitive: true },
          { id: 'delete', name: 'Delete media', description: 'Permanently remove media', isSensitive: true, requiresParent: 'view' },
          { id: 'tag', name: 'Tag and categorize', description: 'Organize media with tags and categories', requiresParent: 'view' },
          { id: 'approve', name: 'Approve media assets', description: 'Review and approve media for use', isSensitive: true },
        ],
      },
    ],
  },
  {
    id: 'ad_slotting',
    name: 'Ad Slotting & Scheduling',
    description: 'Hardware-first booking engine',
    icon: 'Calendar',
    groups: [
      {
        id: 'viewing',
        name: 'View Access',
        description: 'Calendar and slot visibility',
        permissions: [
          { id: 'view_calendar', name: 'View calendar', description: 'See weekly schedule and occupancy' },
          { id: 'view_bookings', name: 'View bookings', description: 'See booking details and client info', requiresParent: 'view_calendar' },
        ],
      },
      {
        id: 'booking',
        name: 'Booking Management',
        description: 'Create and manage bookings',
        permissions: [
          { id: 'create_booking', name: 'Create bookings', description: 'Book available time slots', requiresParent: 'view_calendar' },
          { id: 'edit_booking', name: 'Edit bookings', description: 'Modify existing bookings', requiresParent: 'view_bookings', isSensitive: true },
          { id: 'cancel_booking', name: 'Cancel bookings', description: 'Cancel scheduled bookings', isSensitive: true, requiresParent: 'view_bookings' },
        ],
      },
      {
        id: 'emergency',
        name: 'Safety Controls',
        description: 'Emergency operations',
        permissions: [
          { id: 'emergency_recall', name: 'Emergency recall', description: 'Immediately stop and remove ads from hardware', isSensitive: true },
        ],
      },
      {
        id: 'configuration',
        name: 'Slot Configuration',
        description: 'Manage slot pricing and setup',
        permissions: [
          { id: 'configure_slots', name: 'Configure slots', description: 'Set up slot pricing and categories', isSensitive: true },
          { id: 'set_pricing', name: 'Set pricing', description: 'Define peak and non-peak rates', isSensitive: true },
        ],
      },
    ],
  },
  {
    id: 'kiosks',
    name: 'Kiosk Management',
    description: 'Monitor and control digital displays',
    icon: 'Monitor',
    groups: [
      {
        id: 'monitoring',
        name: 'Monitoring',
        description: 'View kiosk status and health',
        permissions: [
          { id: 'view', name: 'View kiosks', description: 'See kiosk list and basic info' },
          { id: 'view_status', name: 'View status', description: 'Monitor online/offline status and health metrics', requiresParent: 'view' },
          { id: 'view_logs', name: 'View logs', description: 'Access kiosk activity and error logs', requiresParent: 'view' },
        ],
      },
      {
        id: 'control',
        name: 'Control',
        description: 'Manage kiosk operations',
        permissions: [
          { id: 'register', name: 'Register new kiosks', description: 'Add new kiosks to the system', isSensitive: true },
          { id: 'edit', name: 'Edit kiosk details', description: 'Update kiosk configuration', requiresParent: 'view' },
          { id: 'reboot', name: 'Reboot kiosks', description: 'Remotely restart kiosks', isSensitive: true, requiresParent: 'view' },
          { id: 'update_content', name: 'Update content', description: 'Push content updates to kiosks', requiresParent: 'view' },
          { id: 'deactivate', name: 'Deactivate kiosks', description: 'Disable kiosks from service', isSensitive: true, requiresParent: 'view' },
        ],
      },
    ],
  },
  {
    id: 'proof_of_play',
    name: 'Proof of Play',
    description: 'Playback verification and analytics',
    icon: 'CheckCircle2',
    groups: [
      {
        id: 'viewing',
        name: 'View Access',
        description: 'Access playback data',
        permissions: [
          { id: 'view_playback', name: 'View playback data', description: 'See when and where ads played' },
          { id: 'view_analytics', name: 'View audience analytics', description: 'Access walk-in and attentiveness data', requiresParent: 'view_playback' },
        ],
      },
      {
        id: 'reporting',
        name: 'Reporting',
        description: 'Export and share reports',
        permissions: [
          { id: 'export_reports', name: 'Export reports', description: 'Download PoP reports as PDF/Excel', requiresParent: 'view_playback' },
          { id: 'share_reports', name: 'Share reports with clients', description: 'Send PoP reports to clients', requiresParent: 'view_playback' },
        ],
      },
    ],
  },
  {
    id: 'media_billing',
    name: 'Media Billing',
    description: 'Invoice and payment management',
    icon: 'Receipt',
    groups: [
      {
        id: 'viewing',
        name: 'View Access',
        description: 'Access billing information',
        permissions: [
          { id: 'view_invoices', name: 'View invoices', description: 'See invoice list and details' },
          { id: 'view_payments', name: 'View payments', description: 'See payment history', requiresParent: 'view_invoices' },
        ],
      },
      {
        id: 'invoicing',
        name: 'Invoice Management',
        description: 'Create and manage invoices',
        permissions: [
          { id: 'generate', name: 'Generate invoices', description: 'Create new invoices from PoP data', isSensitive: true },
          { id: 'edit_draft', name: 'Edit draft invoices', description: 'Modify invoices before sending', requiresParent: 'view_invoices' },
          { id: 'send', name: 'Send invoices', description: 'Send invoices to clients', isSensitive: true, requiresParent: 'view_invoices' },
          { id: 'download', name: 'Download invoices', description: 'Export invoices as PDF', requiresParent: 'view_invoices' },
        ],
      },
      {
        id: 'adjustments',
        name: 'Adjustments',
        description: 'Pricing modifications',
        permissions: [
          { id: 'apply_discounts', name: 'Apply discounts', description: 'Add discounts to invoices', isSensitive: true, requiresParent: 'view_invoices' },
          { id: 'void_invoice', name: 'Void invoices', description: 'Cancel issued invoices', isSensitive: true, requiresParent: 'view_invoices' },
        ],
      },
      {
        id: 'integration',
        name: 'Integration',
        description: 'Accounting system sync',
        permissions: [
          { id: 'sync_accounting', name: 'Sync with accounting tools', description: 'Push invoices to Zoho Books, etc.', isSensitive: true },
          { id: 'mark_paid', name: 'Mark invoices as paid', description: 'Update payment status manually', isSensitive: true, requiresParent: 'view_invoices' },
        ],
      },
    ],
  },
  {
    id: 'clients',
    name: 'Client Management',
    description: 'Manage client accounts and relationships',
    icon: 'Users',
    groups: [
      {
        id: 'basic',
        name: 'Basic Actions',
        description: 'Core client operations',
        permissions: [
          { id: 'view', name: 'View clients', description: 'See client list and details' },
          { id: 'create', name: 'Create clients', description: 'Add new client accounts', requiresParent: 'view' },
          { id: 'edit', name: 'Edit clients', description: 'Update client information', requiresParent: 'view' },
        ],
      },
      {
        id: 'management',
        name: 'Client Management',
        description: 'Advanced client operations',
        permissions: [
          { id: 'archive', name: 'Archive clients', description: 'Move inactive clients to archive', requiresParent: 'view' },
          { id: 'delete', name: 'Delete clients', description: 'Permanently remove client accounts', isSensitive: true, requiresParent: 'view' },
          { id: 'view_billing', name: 'View billing history', description: 'Access client payment records', requiresParent: 'view' },
        ],
      },
    ],
  },
  {
    id: 'playlists',
    name: 'Playlists',
    description: 'Create and manage content playlists',
    icon: 'List',
    groups: [
      {
        id: 'basic',
        name: 'Basic Actions',
        description: 'Core playlist operations',
        permissions: [
          { id: 'view', name: 'View playlists', description: 'See playlist list and contents' },
          { id: 'create', name: 'Create playlists', description: 'Build new playlists', requiresParent: 'view' },
          { id: 'edit', name: 'Edit playlists', description: 'Modify existing playlists', requiresParent: 'view' },
          { id: 'duplicate', name: 'Duplicate playlists', description: 'Clone existing playlists', requiresParent: 'view' },
        ],
      },
      {
        id: 'management',
        name: 'Playlist Management',
        description: 'Advanced playlist controls',
        permissions: [
          { id: 'publish', name: 'Publish playlists', description: 'Make playlists available for campaigns', isSensitive: true, requiresParent: 'view' },
          { id: 'delete', name: 'Delete playlists', description: 'Permanently remove playlists', isSensitive: true, requiresParent: 'view' },
        ],
      },
    ],
  },
  {
    id: 'organization_units',
    name: 'Organization Units',
    description: 'Multi-entity legal and billing structure',
    icon: 'Building2',
    groups: [
      {
        id: 'viewing',
        name: 'View Access',
        description: 'Access organization unit data',
        permissions: [
          { id: 'view', name: 'View organization units', description: 'See org unit list and structure' },
          { id: 'view_details', name: 'View detailed information', description: 'Access legal and billing details', requiresParent: 'view' },
        ],
      },
      {
        id: 'management',
        name: 'Management',
        description: 'Create and configure org units',
        permissions: [
          { id: 'create', name: 'Create organization units', description: 'Add new legal entities', isSensitive: true },
          { id: 'edit', name: 'Edit organization units', description: 'Update org unit configuration', isSensitive: true, requiresParent: 'view' },
          { id: 'configure_billing', name: 'Configure billing', description: 'Set up GST, banking, and invoicing', isSensitive: true, requiresParent: 'view' },
        ],
      },
      {
        id: 'access',
        name: 'Access Control',
        description: 'User access management',
        permissions: [
          { id: 'manage_access', name: 'Manage user access', description: 'Assign users to org units', isSensitive: true, requiresParent: 'view' },
        ],
      },
    ],
  },
  {
    id: 'users',
    name: 'User Management',
    description: 'Manage users, roles, and permissions',
    icon: 'UserCog',
    groups: [
      {
        id: 'users',
        name: 'User Management',
        description: 'Manage user accounts',
        permissions: [
          { id: 'view_users', name: 'View users', description: 'See user list and profiles' },
          { id: 'invite_users', name: 'Invite users', description: 'Send user invitations', requiresParent: 'view_users' },
          { id: 'edit_users', name: 'Edit users', description: 'Update user information', requiresParent: 'view_users', isSensitive: true },
          { id: 'deactivate_users', name: 'Deactivate users', description: 'Disable user accounts', isSensitive: true, requiresParent: 'view_users' },
        ],
      },
      {
        id: 'roles',
        name: 'Role Management',
        description: 'Configure roles and permissions',
        permissions: [
          { id: 'view_roles', name: 'View roles', description: 'See role list and permissions' },
          { id: 'create_roles', name: 'Create custom roles', description: 'Define new roles', isSensitive: true, requiresParent: 'view_roles' },
          { id: 'edit_roles', name: 'Edit custom roles', description: 'Modify role permissions', isSensitive: true, requiresParent: 'view_roles' },
          { id: 'delete_roles', name: 'Delete custom roles', description: 'Remove custom roles', isSensitive: true, requiresParent: 'view_roles' },
        ],
      },
      {
        id: 'security',
        name: 'Security',
        description: 'Security and compliance controls',
        permissions: [
          { id: 'view_activity_log', name: 'View activity log', description: 'Access user activity records' },
          { id: 'enforce_mfa', name: 'Enforce MFA', description: 'Require multi-factor authentication', isSensitive: true },
        ],
      },
    ],
  },
  {
    id: 'settings',
    name: 'System Settings',
    description: 'Configure system preferences and integrations',
    icon: 'Settings',
    groups: [
      {
        id: 'general',
        name: 'General Settings',
        description: 'Basic system configuration',
        permissions: [
          { id: 'view', name: 'View settings', description: 'See system configuration' },
          { id: 'edit_general', name: 'Edit general settings', description: 'Update basic preferences', isSensitive: true, requiresParent: 'view' },
        ],
      },
      {
        id: 'integrations',
        name: 'Integrations',
        description: 'Third-party service configuration',
        permissions: [
          { id: 'view_integrations', name: 'View integrations', description: 'See connected services', requiresParent: 'view' },
          { id: 'configure_integrations', name: 'Configure integrations', description: 'Set up and manage API keys', isSensitive: true, requiresParent: 'view' },
        ],
      },
      {
        id: 'notifications',
        name: 'Notifications',
        description: 'Email and alert configuration',
        permissions: [
          { id: 'configure_notifications', name: 'Configure notifications', description: 'Set up email and alert rules', requiresParent: 'view' },
        ],
      },
    ],
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    description: 'View performance data and insights',
    icon: 'BarChart3',
    groups: [
      {
        id: 'viewing',
        name: 'View Access',
        description: 'Access reporting features',
        permissions: [
          { id: 'view_reports', name: 'View reports', description: 'Access standard reports and dashboards' },
          { id: 'view_analytics', name: 'View analytics', description: 'Access detailed analytics and insights', requiresParent: 'view_reports' },
        ],
      },
      {
        id: 'export',
        name: 'Export',
        description: 'Download and share reports',
        permissions: [
          { id: 'export', name: 'Export reports', description: 'Download reports as PDF/Excel', requiresParent: 'view_reports' },
        ],
      },
    ],
  },
  {
    id: 'billing',
    name: 'Billing & Plans',
    description: 'Subscription and payment management',
    icon: 'CreditCard',
    groups: [
      {
        id: 'viewing',
        name: 'View Access',
        description: 'Access billing information',
        permissions: [
          { id: 'view', name: 'View billing', description: 'See subscription and payment details' },
        ],
      },
      {
        id: 'management',
        name: 'Plan Management',
        description: 'Subscription controls',
        permissions: [
          { id: 'change_plan', name: 'Change subscription plan', description: 'Upgrade or downgrade plans', isSensitive: true, requiresParent: 'view' },
          { id: 'update_payment', name: 'Update payment method', description: 'Change billing information', isSensitive: true, requiresParent: 'view' },
          { id: 'cancel', name: 'Cancel subscription', description: 'End subscription', isSensitive: true, requiresParent: 'view' },
        ],
      },
    ],
  },
];

// Helper function to get all permissions for a module
export function getModulePermissions(moduleId: string): ModulePermission[] {
  const module = MODULE_PERMISSIONS.find(m => m.id === moduleId);
  if (!module) return [];
  
  return module.groups.flatMap(g => g.permissions);
}

// Helper function to check if a permission requires a parent
export function getRequiredParent(moduleId: string, permissionId: string): string | undefined {
  const permissions = getModulePermissions(moduleId);
  const permission = permissions.find(p => p.id === permissionId);
  return permission?.requiresParent;
}

// Helper function to get all dependent permissions
export function getDependentPermissions(moduleId: string, permissionId: string): string[] {
  const permissions = getModulePermissions(moduleId);
  return permissions
    .filter(p => p.requiresParent === permissionId)
    .map(p => p.id);
}
