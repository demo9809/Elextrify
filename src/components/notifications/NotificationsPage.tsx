import { useState } from 'react';
import { Bell, Search, Filter, Check, Trash2, CreditCard, Target, Monitor, AlertCircle, Shield, ChevronDown, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  mockNotifications,
  getCategoryColor,
  getCategoryLabel,
  formatRelativeTime,
  type Notification,
  type NotificationCategory,
} from '../../data/mockNotifications';
import { toast } from 'sonner';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'read' | 'unread'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getCategoryIcon = (category: NotificationCategory) => {
    const iconProps = {
      className: 'w-5 h-5',
      style: { color: getCategoryColor(category) },
    };

    switch (category) {
      case 'billing':
        return <CreditCard {...iconProps} />;
      case 'campaigns':
        return <Target {...iconProps} />;
      case 'devices':
        return <Monitor {...iconProps} />;
      case 'security':
        return <Shield {...iconProps} />;
      case 'system':
        return <AlertCircle {...iconProps} />;
      default:
        return <AlertCircle {...iconProps} />;
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      searchQuery === '' ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || notification.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'read' && notification.isRead) ||
      (selectedStatus === 'unread' && !notification.isRead);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleClearRead = () => {
    const readCount = notifications.filter((n) => n.isRead).length;
    setNotifications((prev) => prev.filter((n) => !n.isRead));
    toast.success(`${readCount} read notification${readCount > 1 ? 's' : ''} cleared`);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (expandedId === notification.id) {
      setExpandedId(null);
    } else {
      setExpandedId(notification.id);
      handleMarkAsRead(notification.id);
    }
  };

  const handleActionClick = (notification: Notification, e: React.MouseEvent) => {
    e.stopPropagation();
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#D9480F] flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-[#111827]">All Notifications</h1>
                <p className="text-sm text-[#6B7280] mt-1">
                  System, billing, and activity updates
                </p>
              </div>
            </div>

            {/* Global Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
                className="flex items-center gap-2 px-4 h-10 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium text-[#111827]"
              >
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Mark all as read</span>
              </button>
              <button
                onClick={handleClearRead}
                className="flex items-center gap-2 px-4 h-10 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium text-[#111827]"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear read</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 text-sm font-medium text-[#111827] mb-3"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Filter Controls */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ${
              showFilters ? 'block' : 'hidden lg:grid'
            }`}
          >
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full h-10 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as NotificationCategory | 'all')}
                className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="billing">Billing</option>
                <option value="campaigns">Campaigns</option>
                <option value="devices">Devices</option>
                <option value="system">System</option>
                <option value="security">Security</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'read' | 'unread')}
                className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
            <div className="mt-3 flex items-center gap-2 text-sm text-[#6B7280]">
              <span>
                Showing {filteredNotifications.length} of {notifications.length} notifications
              </span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="text-[#D9480F] hover:text-[#C23D0D] font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white border border-[#E5E7EB] rounded-lg py-12 text-center">
            <Bell className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <p className="text-[#6B7280]">No notifications found</p>
            <p className="text-sm text-[#9CA3AF] mt-1">
              {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your filters'
                : "You're all caught up!"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification) => {
              const isExpanded = expandedId === notification.id;

              return (
                <div
                  key={notification.id}
                  className={`bg-white border rounded-lg transition-all ${
                    notification.isRead
                      ? 'border-[#E5E7EB]'
                      : 'border-[#D9480F] shadow-sm'
                  }`}
                >
                  <div
                    onClick={() => handleNotificationClick(notification)}
                    className="w-full px-4 sm:px-6 py-4 text-left hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                  >
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        {getCategoryIcon(notification.category)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={`text-sm sm:text-base font-medium ${
                                  notification.isRead ? 'text-[#111827]' : 'text-[#111827]'
                                }`}
                              >
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <div className="flex-shrink-0 w-2 h-2 bg-[#D9480F] rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-[#6B7280]">
                              {isExpanded
                                ? notification.fullDescription || notification.description
                                : notification.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#9CA3AF]">
                          <span
                            className="inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium"
                            style={{
                              color: getCategoryColor(notification.category),
                              borderColor: getCategoryColor(notification.category) + '40',
                              backgroundColor: getCategoryColor(notification.category) + '10',
                            }}
                          >
                            {getCategoryLabel(notification.category)}
                          </span>
                          {notification.source && <span>{notification.source}</span>}
                          <span>{formatRelativeTime(notification.timestamp)}</span>
                        </div>

                        {/* Expanded Actions */}
                        {isExpanded && notification.actionUrl && (
                          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                            <button
                              onClick={(e) => handleActionClick(notification, e)}
                              className="inline-flex items-center gap-2 px-4 h-9 bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
                            >
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}