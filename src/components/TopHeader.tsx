import { useState } from 'react';
import { Search, Bell, HelpCircle, Settings } from 'lucide-react';
import NotificationModal from './notifications/NotificationModal';
import { mockNotifications, getUnreadCount } from '../data/mockNotifications';

interface TopHeaderProps {
  isSidebarCollapsed?: boolean;
}

export function TopHeader({ isSidebarCollapsed = false }: TopHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = getUnreadCount(mockNotifications);

  return (
    <>
      <div className={`bg-white border-b border-[#E5E7EB] h-16 flex items-center px-6 gap-4 fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:left-[72px]' : 'lg:left-[240px]'
      }`}>
        {/* Search Bar */}
        <div className="flex-1 max-w-[560px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search campaigns, creatives, reports..."
              className="w-full h-10 pl-10 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
            />
          </div>
        </div>

        {/* Spacer to push icons to the right */}
        <div className="flex-1"></div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <Bell className="w-5 h-5 text-[#6B7280]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-[#D9480F] text-white text-[10px] font-semibold rounded-full">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {/* Help */}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors">
            <HelpCircle className="w-5 h-5 text-[#6B7280]" />
          </button>

          {/* Settings */}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F9FAFB] transition-colors">
            <Settings className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}