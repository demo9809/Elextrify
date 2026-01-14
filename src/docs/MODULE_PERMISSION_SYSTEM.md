# Module-Specific Permission System

## Overview

The DOOH SaaS platform now uses a **module-specific, action-based permission system** that replaces the previous fixed CRUD model. This redesign provides:

- **Real operational permissions** that match actual workflows
- **Module-specific actions** instead of generic CRUD operations
- **Better scalability** as new features are added
- **Improved admin experience** with clearer permission controls

## Architecture

### Data Structure

Permissions are organized in a three-level hierarchy:

```
Module (e.g., "Campaigns")
  └── Permission Group (e.g., "Basic Actions")
      └── Permission (e.g., "Create campaigns")
```

#### Module Definition

```typescript
interface PermissionModule {
  id: string;              // Unique identifier (e.g., "campaigns")
  name: string;            // Display name (e.g., "Campaigns")
  description: string;     // Module description
  icon: string;            // Lucide icon name
  groups: ModulePermissionGroup[];
}
```

#### Permission Group

Permissions within a module are organized into logical groups:

```typescript
interface ModulePermissionGroup {
  id: string;              // Group identifier (e.g., "basic")
  name: string;            // Display name (e.g., "Basic Actions")
  description: string;     // Group description
  permissions: ModulePermission[];
}
```

#### Permission

Individual permissions represent specific actions:

```typescript
interface ModulePermission {
  id: string;              // Permission identifier (e.g., "create")
  name: string;            // Human-readable name (e.g., "Create campaigns")
  description: string;     // What this permission allows
  isSensitive?: boolean;   // Highlights high-risk permissions
  requiresParent?: string; // Parent permission required
}
```

### Permission Dependencies

Permissions can have parent-child relationships:

- **Parent Permission**: A prerequisite permission that must be enabled first
- **Child Permission**: Automatically requires its parent to be enabled

**Example**: "Create campaigns" requires "View campaigns" to be enabled first.

When a child permission is enabled, the system automatically enables the parent. When a parent is disabled, all children are automatically disabled.

## Current Modules

### 1. Campaigns
- **Basic Actions**: View, Create, Edit, Duplicate
- **Campaign Management**: Pause/Resume, Approve, Archive, Delete
- **Targeting & Assignment**: Assign to screens, Modify schedules

### 2. Media Library
- **Basic Actions**: View, Upload, Download
- **Asset Management**: Replace, Delete, Tag/Categorize, Approve

### 3. Ad Slotting & Scheduling
- **View Access**: View calendar, View bookings
- **Booking Management**: Create, Edit, Cancel bookings
- **Safety Controls**: Emergency recall
- **Slot Configuration**: Configure slots, Set pricing

### 4. Kiosk Management
- **Monitoring**: View kiosks, View status, View logs
- **Control**: Register, Edit, Reboot, Update content, Deactivate

### 5. Proof of Play
- **View Access**: View playback data, View analytics
- **Reporting**: Export reports, Share with clients

### 6. Media Billing
- **View Access**: View invoices, View payments
- **Invoice Management**: Generate, Edit drafts, Send, Download
- **Adjustments**: Apply discounts, Void invoices
- **Integration**: Sync with accounting, Mark as paid

### 7. Client Management
- **Basic Actions**: View, Create, Edit
- **Client Management**: Archive, Delete, View billing history

### 8. Playlists
- **Basic Actions**: View, Create, Edit, Duplicate
- **Playlist Management**: Publish, Delete

### 9. Organization Units
- **View Access**: View units, View details
- **Management**: Create, Edit, Configure billing
- **Access Control**: Manage user access

### 10. User Management
- **User Management**: View, Invite, Edit, Deactivate users
- **Role Management**: View, Create, Edit, Delete roles
- **Security**: View activity log, Enforce MFA

### 11. System Settings
- **General Settings**: View, Edit general settings
- **Integrations**: View, Configure integrations
- **Notifications**: Configure notifications

### 12. Reports & Analytics
- **View Access**: View reports, View analytics
- **Export**: Export reports

### 13. Billing & Plans
- **View Access**: View billing
- **Plan Management**: Change plan, Update payment, Cancel subscription

## UI Components

### ModulePermissionEditor

The main permission configuration interface featuring:

- **Two-Panel Layout**:
  - **Left Panel**: Module list with search and permission counts
  - **Right Panel**: Module-specific permissions with groups

- **Features**:
  - Module search and filtering
  - Permission search within modules
  - "Select All" at global and module level
  - Auto-enable parent permissions
  - Auto-disable dependent permissions
  - Visual indicators for sensitive permissions
  - Permission count tracking
  - **Two-column adaptive grid** for maximized density (desktop: 2 columns, mobile: 1 column)
  - **Collapsible permission groups** for better organization
  - **Sticky header and search** for orientation while scrolling
  - **Optimized spacing** (reduced padding from 4 to 3) for higher information density

### PermissionSummaryPanel

A read-only summary showing all granted permissions:

- Organized by module
- Highlights sensitive permissions
- Shows total permission count
- Visual warnings for high-risk permissions

## Usage

### Creating/Editing a Role

1. Navigate to **User Management > Roles**
2. Click **Create Role** or edit an existing role
3. Fill in basic information (name, description)
4. Use the **Module Permission Editor**:
   - Select a module from the left panel
   - Choose specific permissions from the right panel
   - Use "Select All" for quick assignment
5. Review the **Permission Summary** at the bottom
6. Click **Save** to create/update the role

### Adding New Modules

To add a new module:

1. Open `/data/mockModulePermissions.ts`
2. Add a new module to `MODULE_PERMISSIONS` array:

```typescript
{
  id: 'new_module',
  name: 'New Module',
  description: 'Description of the module',
  icon: 'IconName', // Lucide React icon
  groups: [
    {
      id: 'basic',
      name: 'Basic Actions',
      description: 'Core operations',
      permissions: [
        {
          id: 'view',
          name: 'View items',
          description: 'See item list and details'
        },
        {
          id: 'create',
          name: 'Create items',
          description: 'Add new items',
          requiresParent: 'view'
        },
        // ... more permissions
      ],
    },
    // ... more groups
  ],
}
```

### Adding New Permissions

To add permissions to an existing module:

1. Find the module in `/data/mockModulePermissions.ts`
2. Add to the appropriate group or create a new group
3. Define the permission with:
   - Unique ID
   - Human-readable name
   - Clear description
   - Optional: `isSensitive` flag
   - Optional: `requiresParent` dependency

### Backend Integration

The permission data structure is designed to be flexible:

```typescript
// Stored in database as PermissionSet
interface PermissionSet {
  [moduleId: string]: {
    [permissionId: string]: boolean;
  };
}

// Example stored data
{
  "campaigns": {
    "view": true,
    "create": true,
    "edit": true,
    "delete": false
  },
  "media": {
    "view": true,
    "upload": true
  }
}
```

### Permission Checking

Backend logic should check permissions as:

```typescript
// Check if user has permission
function hasPermission(user: User, module: string, action: string): boolean {
  const rolePermissions = user.role.permissions;
  const userOverrides = user.permissionOverrides;
  
  // Check overrides first, then role permissions
  if (userOverrides?.[module]?.[action] !== undefined) {
    return userOverrides[module][action];
  }
  
  return rolePermissions?.[module]?.[action] || false;
}
```

## Design Decisions

### Why Module-Specific Permissions?

1. **Real-world operations**: Different modules have fundamentally different actions
2. **Scalability**: Easy to add new permissions without UI refactor
3. **Clarity**: Admins see exactly what permissions do
4. **Flexibility**: No artificial CRUD constraints

### Why Permission Groups?

Groups organize related permissions and make the UI easier to navigate. They also help admins understand the intent behind permission sets (e.g., "Basic Actions" vs "Safety Controls").

### Why Parent-Child Dependencies?

Some permissions don't make sense without others (e.g., you can't create campaigns if you can't view them). Dependencies enforce logical permission combinations and prevent configuration errors.

### Why Sensitive Flags?

High-risk permissions (like "Emergency recall" or "Delete invoices") need visual prominence so admins grant them carefully. The red highlighting draws attention during configuration.

## Migration from Old System

The old CRUD-based system used:

```typescript
{
  module: {
    view: boolean,
    create: boolean,
    edit: boolean,
    delete: boolean,
    approve: boolean,
    publish: boolean,
    assign: boolean
  }
}
```

The new system uses action-specific names:

```typescript
{
  campaigns: {
    view: boolean,
    create: boolean,
    edit: boolean,
    duplicate: boolean,
    pause: boolean,
    approve: boolean,
    archive: boolean,
    delete: boolean,
    assign_screens: boolean,
    modify_schedule: boolean
  }
}
```

**Note**: Existing roles in the database should be migrated to map old CRUD actions to new module-specific permissions where appropriate.

## Future Enhancements

Potential improvements:

- [ ] Permission templates/presets
- [ ] Role comparison tool
- [ ] Permission inheritance visualization
- [ ] Audit log for permission changes
- [ ] Permission usage analytics
- [ ] Bulk permission assignment
- [ ] Permission policy enforcement
- [ ] Custom permission definitions (admin-created)

## Files

- `/data/mockModulePermissions.ts` - Module and permission definitions
- `/components/users/ModulePermissionEditor.tsx` - Two-panel permission editor
- `/components/users/PermissionSummaryPanel.tsx` - Permission summary component
- `/components/users/CreateEditRole.tsx` - Role creation/editing screen
- `/types/users.ts` - TypeScript type definitions