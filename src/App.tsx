import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CampaignScheduler } from './components/pages/CampaignScheduler';
import { TerminalManagement } from './components/terminal/TerminalManagement';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import { PlaylistManager } from './components/playlists/PlaylistManager';
import { MediaManager } from './components/media/MediaManager';
import { ClientManager } from './components/clients/ClientManager';
import UserManagement from './components/users/UserManagement';
import UserDetails from './components/users/UserDetails';
import RolesManagement from './components/users/RolesManagement';
import CreateEditRole from './components/users/CreateEditRole';
import ActivityLog from './components/users/ActivityLog';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { TopHeader } from './components/TopHeader';

type Page = 'welcome' | 'campaigns' | 'terminals' | 'playlists' | 'media' | 'customers' | 'users';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Determine current page from route
  const getCurrentPage = (): Page => {
    const path = location.pathname;
    if (path.includes('/campaigns')) return 'campaigns';
    if (path.includes('/terminals') || path.includes('/kiosks')) return 'terminals';
    if (path.includes('/playlists')) return 'playlists';
    if (path.includes('/media')) return 'media';
    if (path.includes('/customers') || path.includes('/clients')) return 'customers';
    if (path.includes('/users')) return 'users';
    return 'welcome';
  };

  const currentPage = getCurrentPage();

  const handleNavigate = (page: string) => {
    // Map page names to routes
    const routeMap: { [key: string]: string } = {
      welcome: '/',
      campaigns: '/campaigns',
      terminals: '/terminals',
      playlists: '/playlists',
      media: '/media',
      customers: '/customers',
      users: '/users',
    };
    navigate(routeMap[page] || '/');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Desktop/Tablet Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          activePage={currentPage} 
          onNavigate={handleNavigate}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        activePage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <div 
        className={`flex flex-col min-h-screen transition-all duration-300 pt-14 lg:pt-16 ${
          isSidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[240px]'
        }`}
      >
        {/* Desktop Header - hidden on mobile */}
        <div className="hidden lg:block">
          <TopHeader isSidebarCollapsed={isSidebarCollapsed} />
        </div>

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<WelcomeScreen onNavigate={(route) => navigate(route)} />} />
            <Route path="/campaigns" element={<CampaignScheduler />} />
            <Route path="/terminals" element={<TerminalManagement />} />
            <Route path="/playlists" element={<PlaylistManager />} />
            <Route path="/media" element={<MediaManager />} />
            <Route path="/customers" element={<ClientManager />} />
            <Route path="/clients" element={<ClientManager />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/users/:userId" element={<UserDetails />} />
            <Route path="/users/roles" element={<RolesManagement />} />
            <Route path="/users/roles/new" element={<CreateEditRole />} />
            <Route path="/users/roles/:roleId/edit" element={<CreateEditRole />} />
            <Route path="/users/activity" element={<ActivityLog />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;