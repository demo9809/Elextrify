export type UserStatus = 'active' | 'pending' | 'disabled';

export type UserRole = 'owner' | 'admin' | 'manager' | 'media-operator' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  lastLogin?: string;
  mfaEnabled: boolean;
  createdAt: string;
  assignedClients?: string[];
  phoneNumber?: string;
  jobTitle?: string;
}

export interface UserInvite {
  id: string;
  email: string;
  role: UserRole;
  invitedBy: string;
  invitedAt: string;
  status: 'sent' | 'accepted' | 'expired';
  note?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: PermissionSet;
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'publish' | 'assign';

export type PermissionModule = 
  | 'clients'
  | 'campaigns'
  | 'media'
  | 'playlists'
  | 'kiosks'
  | 'reports'
  | 'billing'
  | 'settings'
  | 'users';

export interface PermissionSet {
  [module: string]: {
    [action: string]: boolean;
  };
}

export interface ActivityLogEntry {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
  status: 'success' | 'failed' | 'warning';
}
