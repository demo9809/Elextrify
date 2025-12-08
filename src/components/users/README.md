# User Management Module

A comprehensive user administration system for the DOOH SaaS platform with role-based access control, permission management, and activity logging.

## Features

### 1. User Management
- **User List**: View all users with search, filters, and bulk operations
- **User Details**: Detailed user profiles with tabs for profile, permissions, clients, and activity
- **User Invitation**: Invite new users via email with role assignment
- **User Status**: Active, Pending, and Disabled states
- **Multi-factor Authentication**: MFA support with visual indicators

### 2. Role Management
- **System Roles**: Pre-defined roles (Owner, Admin, Manager, Media Operator, Viewer)
- **Custom Roles**: Create and manage custom roles with granular permissions
- **Role Templates**: Duplicate existing roles to create new ones
- **Permission Matrix**: Visual permission configuration interface

### 3. Permissions
- **Module-based**: Permissions organized by platform modules
- **Action-level**: Granular control over View, Create, Edit, Delete, Approve, Publish, Assign
- **Permission Preview**: See permission summary when inviting users
- **Full/Partial Access**: Quick toggles for all permissions or module-specific permissions

### 4. Activity Log
- **Comprehensive Logging**: Track all user actions and system events
- **Filtered Views**: Filter by status, module, date range, and search
- **Detailed Information**: IP addresses, timestamps, success/failure status
- **Export Capability**: Export activity logs for compliance

## Components

### Main Components

#### UserManagement
Main view showing all users in the organization.

**Features:**
- Table view (desktop) with sortable columns
- Card view (mobile/tablet) for responsive design
- Search users by name or email
- Filter by role and status
- Bulk operations (change role, disable, resend invite)
- Quick actions menu for each user

**Route:** `/users`

#### UserDetails
Detailed view of a single user with tabbed interface.

**Tabs:**
1. **Profile**: Personal information, contact details, account status
2. **Access Permissions**: Role and permission breakdown
3. **Assigned Clients**: Clients the user has access to
4. **Activity Log**: Recent actions performed by the user

**Route:** `/users/:userId`

#### RolesManagement
Manage system and custom roles.

**Features:**
- System roles (read-only, can be duplicated)
- Custom roles (full CRUD operations)
- Role statistics (user count, permission count)
- Quick actions (edit, duplicate, delete)

**Route:** `/users/roles`

#### CreateEditRole
Create or edit role with permission matrix.

**Features:**
- Role name and description
- Permission matrix with module/action grid
- Select all/deselect all toggles
- Permission count summary
- Read-only view for system roles

**Route:** `/users/roles/:roleId/edit` or `/users/roles/new`

#### ActivityLog
System-wide activity and audit log.

**Features:**
- Chronological activity feed
- Multiple filter options
- Success/failure/warning status indicators
- IP address tracking
- Export functionality

**Route:** `/users/activity`

### Supporting Components

#### InviteUserPanel
Slide-in panel for inviting new users.

**Fields:**
- Email address (required, validated)
- Role selection
- Permission preview
- Optional note

#### PermissionMatrix
Reusable permission configuration component.

**Features:**
- Desktop: Grid table view
- Mobile: Collapsible card view
- Module-level toggles
- Action-level toggles
- Visual indicators for full/partial access

## Data Models

### User
```typescript
interface User {
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
```

### Role
```typescript
interface Role {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: PermissionSet;
  userCount: number;
  createdAt: string;
  updatedAt: string;
}
```

### PermissionSet
```typescript
interface PermissionSet {
  [module: string]: {
    [action: string]: boolean;
  };
}
```

### ActivityLogEntry
```typescript
interface ActivityLogEntry {
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
```

## Permission Modules

1. **Client Management**: Manage client accounts and relationships
2. **Campaigns**: Create and manage advertising campaigns
3. **Media Library**: Upload and organize media assets
4. **Playlists**: Create and edit content playlists
5. **Kiosk Management**: Monitor and control digital displays
6. **Reports & Analytics**: View performance data and insights
7. **Billing & Plans**: Manage subscriptions and payments
8. **Settings**: Configure system preferences
9. **User Management**: Manage users and permissions

## Permission Actions

1. **View**: View and read data
2. **Create**: Create new items
3. **Edit**: Modify existing items
4. **Delete**: Remove items
5. **Approve**: Approve changes or requests
6. **Publish**: Make content live
7. **Assign**: Assign items to users or groups

## System Roles

### Owner
Full system access with all permissions across all modules.

### Admin
Administrative access with limited billing controls. Cannot delete kiosks or modify critical system settings.

### Manager
Campaign and content management without system settings access. Can approve campaigns and assign resources.

### Media Operator
Media and playlist management only. Read-only access to campaigns and kiosks.

### Viewer
Read-only access to campaigns, media, playlists, kiosks, and reports. No access to billing, settings, or user management.

## Responsive Design

### Desktop (≥1024px)
- Full table layouts with all columns
- Horizontal permission matrix
- Multi-column role cards
- Fixed sidebar navigation

### Tablet (768px - 1023px)
- Adaptive table/card hybrid
- 2-column role cards
- Collapsible permission sections

### Mobile (<768px)
- Card-based layouts for all lists
- Stacked permission toggles
- Single-column role cards
- Hamburger menu navigation
- 44px minimum touch targets

## Accessibility

- Keyboard navigation support
- ARIA labels and roles
- Focus indicators
- Color contrast compliance
- Screen reader friendly
- Semantic HTML structure

## Usage

### Navigate to Users Module
```typescript
// From sidebar or navigation
navigate('/users');
```

### Invite a New User
```typescript
// Click "Invite User" button
// Fill in email, select role
// Review permission summary
// Send invitation
```

### Create a Custom Role
```typescript
// Navigate to Roles Management
navigate('/users/roles');

// Click "Create Custom Role"
navigate('/users/roles/new');

// Define name, description, and permissions
// Save role
```

### View User Details
```typescript
// Click on user in list
navigate(`/users/${userId}`);

// Switch between tabs to view different aspects
```

### Filter Activity Log
```typescript
// Navigate to Activity Log
navigate('/users/activity');

// Use filters to narrow down results
// Export for compliance or reporting
```

## Security Considerations

- Permission checks should be enforced on the backend
- Sensitive operations require confirmation dialogs
- Activity logging for audit trails
- MFA support for enhanced security
- Session timeout management
- IP address tracking for security monitoring

## Future Enhancements

- [ ] Advanced role templates
- [ ] Client-scoped permissions (limit access by client)
- [ ] Session management and timeout controls
- [ ] Bulk user import/export
- [ ] User groups and teams
- [ ] Advanced activity analytics
- [ ] Custom permission policies
- [ ] SSO/SAML integration
- [ ] API key management
- [ ] Webhook notifications for user events
