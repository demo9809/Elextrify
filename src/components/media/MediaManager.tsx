import { useState } from 'react';
import { 
  Upload, 
  Grid3x3, 
  LayoutGrid, 
  Search, 
  Filter,
  MoreVertical,
  Trash2,
  Archive,
  Download,
  Eye,
  Image as ImageIcon,
  Video,
  Music,
  Globe,
  X,
  FileText,
  Users
} from 'lucide-react';
import { MediaUpload } from './MediaUpload';
import { MediaDetails } from './MediaDetails';
import { mockClients } from '../../data/mockClients';

type ViewMode = 'grid' | 'list';
type MediaType = 'all' | 'image' | 'video' | 'audio' | 'html5';
type MediaStatus = 'active' | 'scheduled' | 'expired' | 'archived' | 'all';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'html5';
  thumbnail?: string;
  duration?: number;
  fileSize: string;
  resolution?: string;
  uploadDate: string;
  status: 'active' | 'scheduled' | 'expired' | 'archived';
  tags: string[];
  usedIn?: string[];
  description?: string;
  url?: string;
  clientId: string;
  clientName: string;
}

export function MediaManager() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedType, setSelectedType] = useState<MediaType>('all');
  const [selectedStatus, setSelectedStatus] = useState<MediaStatus>('all');
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Mock data
  const allTags = ['Holiday 2024', 'Product Launch', 'Brand Awareness', 'Seasonal', 'Promotional', 'Evergreen'];
  
  const mockMedia: MediaItem[] = [
    {
      id: '1',
      name: 'Summer Sale Banner',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
      fileSize: '2.4 MB',
      resolution: '1920x1080',
      uploadDate: '2024-01-15T10:30:00',
      status: 'active',
      tags: ['Seasonal', 'Promotional'],
      usedIn: ['Summer Campaign', 'Mall Rotation'],
      description: 'Main promotional banner for summer sale',
      clientId: '1',
      clientName: 'Acme Corporation'
    },
    {
      id: '2',
      name: 'Product Demo Video',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400',
      duration: 45,
      fileSize: '24.8 MB',
      resolution: '1920x1080',
      uploadDate: '2024-01-14T14:20:00',
      status: 'active',
      tags: ['Product Launch', 'Brand Awareness'],
      usedIn: ['Product Launch Campaign'],
      description: '45-second product demonstration',
      clientId: '1',
      clientName: 'Acme Corporation'
    },
    {
      id: '3',
      name: 'Background Music Loop',
      type: 'audio',
      duration: 120,
      fileSize: '5.2 MB',
      uploadDate: '2024-01-13T09:15:00',
      status: 'active',
      tags: ['Evergreen'],
      usedIn: ['Retail Ambient', 'Lobby Playlist'],
      clientId: '2',
      clientName: 'Brew Coffee Co.'
    },
    {
      id: '4',
      name: 'Interactive Product Catalog',
      type: 'html5',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      fileSize: '12.5 MB',
      uploadDate: '2024-01-12T16:45:00',
      status: 'active',
      tags: ['Product Launch', 'Promotional'],
      usedIn: ['Touch Kiosk Campaign'],
      description: 'HTML5 interactive product browser',
      url: 'https://example.com/catalog',
      clientId: '3',
      clientName: 'FitLife Gym'
    },
    {
      id: '5',
      name: 'Holiday Promo 2024',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400',
      duration: 30,
      fileSize: '18.3 MB',
      resolution: '1920x1080',
      uploadDate: '2024-01-11T11:00:00',
      status: 'scheduled',
      tags: ['Holiday 2024', 'Promotional'],
      description: '30-second holiday promotional video',
      clientId: '2',
      clientName: 'Brew Coffee Co.'
    },
    {
      id: '6',
      name: 'Brand Logo Animation',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400',
      fileSize: '1.8 MB',
      resolution: '1920x1080',
      uploadDate: '2024-01-10T08:30:00',
      status: 'active',
      tags: ['Brand Awareness', 'Evergreen'],
      usedIn: ['All Campaigns'],
      clientId: '4',
      clientName: 'TechStart Inc.'
    }
  ];

  const filteredMedia = mockMedia.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesClient = selectedClient === 'all' || item.clientId === selectedClient;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag));
    
    return matchesType && matchesStatus && matchesClient && matchesSearch && matchesTags;
  });

  // Get counts for each type tab
  const getCounts = () => {
    return {
      all: mockMedia.length,
      image: mockMedia.filter(m => m.type === 'image').length,
      video: mockMedia.filter(m => m.type === 'video').length,
      audio: mockMedia.filter(m => m.type === 'audio').length,
      html5: mockMedia.filter(m => m.type === 'html5').length,
    };
  };

  const counts = getCounts();

  const tabs: { id: MediaType; label: string; count: number }[] = [
    { id: 'all', label: 'All Media', count: counts.all },
    { id: 'image', label: 'Images', count: counts.image },
    { id: 'video', label: 'Videos', count: counts.video },
    { id: 'audio', label: 'Audio', count: counts.audio },
    { id: 'html5', label: 'HTML5', count: counts.html5 },
  ];

  const stats = {
    total: mockMedia.length,
    images: mockMedia.filter(m => m.type === 'image').length,
    videos: mockMedia.filter(m => m.type === 'video').length,
    audio: mockMedia.filter(m => m.type === 'audio').length,
    html5: mockMedia.filter(m => m.type === 'html5').length,
    storage: '64.8 MB'
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredMedia.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredMedia.map(m => m.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkArchive = () => {
    console.log('Archiving:', selectedItems);
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const handleBulkDelete = () => {
    console.log('Deleting:', selectedItems);
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const hasActiveFilters = selectedStatus !== 'all' || selectedTags.length > 0;

  if (showUpload) {
    return <MediaUpload onClose={() => setShowUpload(false)} onSuccess={() => setShowUpload(false)} />;
  }

  if (selectedMedia) {
    return <MediaDetails media={selectedMedia} onClose={() => setSelectedMedia(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-[#111827] mb-2">Media Library</h1>
            <p className="text-[#6B7280] text-sm md:text-base">
              Upload and manage images, videos, audio, and HTML5 content
            </p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center justify-center gap-2 px-6 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors w-full sm:w-auto"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Media</span>
          </button>
        </div>

        {/* Insights Cards - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">Total Media</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#6B7280]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">Images</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#F3F0FF] rounded-lg flex items-center justify-center">
                <ImageIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#8B5CF6]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.images}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">Videos</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                <Video className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#3B82F6]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.videos}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">Audio</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#FDF2F8] rounded-lg flex items-center justify-center">
                <Music className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EC4899]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.audio}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">HTML5</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#ECFDF5] rounded-lg flex items-center justify-center">
                <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#10B981]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.html5}</p>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6 h-[100px] md:h-[120px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-[#6B7280]">Storage Used</p>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
                <Download className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#6B7280]" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-[#111827]">{stats.storage}</p>
          </div>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          {/* Search and Actions Bar */}
          <div className="px-4 sm:px-6 py-3 md:py-4 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 w-full sm:max-w-[320px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
            </div>

            {/* Client Filter - Prominent Position */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#6B7280]" />
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent min-w-[180px]"
              >
                <option value="all">All Clients</option>
                {mockClients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>

            {/* Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`relative flex items-center gap-2 h-10 px-4 bg-white border rounded-lg text-sm transition-colors ${
                hasActiveFilters
                  ? 'border-[#D9480F] text-[#D9480F] bg-[#FEF2F2]'
                  : 'border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB]'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D9480F] text-white text-xs rounded-full flex items-center justify-center">
                  {(selectedStatus !== 'all' ? 1 : 0) + selectedTags.length}
                </span>
              )}
            </button>

            {selectedItems.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="flex items-center gap-2 h-10 px-4 bg-[#111827] text-white rounded-lg text-sm hover:bg-[#1F2937] transition-colors"
                >
                  {selectedItems.length} selected
                  <MoreVertical className="w-4 h-4" />
                </button>

                {showBulkActions && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-10">
                    <button
                      onClick={handleBulkArchive}
                      className="w-full px-4 py-2 text-left text-sm text-[#6B7280] hover:bg-[#F9FAFB] flex items-center gap-3"
                    >
                      <Archive className="w-4 h-4" />
                      Archive Selected
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      className="w-full px-4 py-2 text-left text-sm text-[#DC2626] hover:bg-[#FEF2F2] flex items-center gap-3"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Selected
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex-1"></div>

            {/* Export Button */}
            <button className="flex items-center gap-2 h-10 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#D9480F] hover:bg-[#FEF2F2] transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>

            {/* View Toggle */}
            <div className="flex items-center gap-1 border border-[#E5E7EB] rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#FEF2F2] text-[#D9480F]'
                    : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
                title="List view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#FEF2F2] text-[#D9480F]'
                    : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
                title="Grid view"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs - Media Type Filter */}
          <div className="px-4 sm:px-6 py-3 md:py-4 border-b border-[#E5E7EB] flex items-center gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition-colors
                  ${selectedType === tab.id
                    ? 'bg-[#111827] text-white'
                    : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="px-4 sm:px-6 py-3 md:py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <div className="grid grid-cols-2 gap-6">
                {/* Status Filter */}
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'active', 'scheduled', 'expired', 'archived'] as MediaStatus[]).map(status => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-3 h-8 rounded-lg text-sm font-medium transition-colors ${
                          selectedStatus === status
                            ? 'bg-[#D9480F] text-white'
                            : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D9480F]'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tag Filter - Searchable Multi-Select */}
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-2">
                    Filter by Tags
                  </label>
                  <div className="space-y-2">
                    {/* Selected Tags Display */}
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 bg-white border border-[#E5E7EB] rounded-lg">
                        {selectedTags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-[#D9480F] text-white text-xs font-medium rounded"
                          >
                            {tag}
                            <button
                              onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                              className="hover:bg-white/20 rounded"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        <button
                          onClick={() => setSelectedTags([])}
                          className="text-xs text-[#6B7280] hover:text-[#111827]"
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                    
                    {/* Popular Tags */}
                    <div>
                      <p className="text-xs text-[#9CA3AF] mb-2">Popular tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {allTags.slice(0, 6).map(tag => (
                          <button
                            key={tag}
                            onClick={() => {
                              setSelectedTags(prev =>
                                prev.includes(tag) ? prev : [...prev, tag]
                              );
                            }}
                            disabled={selectedTags.includes(tag)}
                            className={`px-3 h-8 rounded-lg text-sm font-medium transition-colors ${
                              selectedTags.includes(tag)
                                ? 'bg-[#F9FAFB] text-[#9CA3AF] cursor-not-allowed'
                                : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#D9480F] hover:text-[#D9480F]'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          {viewMode === 'grid' ? (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredMedia.map(item => (
                  <MediaGridCard
                    key={item.id}
                    media={item}
                    isSelected={selectedItems.includes(item.id)}
                    onSelect={() => handleSelectItem(item.id)}
                    onClick={() => setSelectedMedia(item)}
                  />
                ))}
              </div>

              {filteredMedia.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-[#F9FAFB] rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-[#9CA3AF]" />
                  </div>
                  <h3 className="font-semibold text-[#111827] mb-2">No media found</h3>
                  <p className="text-sm text-[#6B7280] mb-4">Try adjusting your filters or upload new media</p>
                  <button
                    onClick={() => setShowUpload(true)}
                    className="h-10 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors font-medium"
                  >
                    Upload Media
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="px-4 sm:px-6 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredMedia.length && filteredMedia.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-[#E5E7EB] text-[#D9480F] focus:ring-[#D9480F]"
                    />
                  </div>
                  <div className="col-span-4 text-xs text-[#6B7280]">Media</div>
                  <div className="col-span-2 text-xs text-[#6B7280]">Type</div>
                  <div className="col-span-2 text-xs text-[#6B7280]">Tags</div>
                  <div className="col-span-2 text-xs text-[#6B7280]">Status</div>
                  <div className="col-span-1 text-xs text-[#6B7280] text-right">Actions</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-[#E5E7EB]">
                {filteredMedia.length === 0 ? (
                  <div className="px-4 sm:px-6 py-12 text-center">
                    <FileText className="w-12 h-12 text-[#E5E7EB] mx-auto mb-3" />
                    <p className="text-[#6B7280] mb-2">No media found</p>
                    <p className="text-sm text-[#9CA3AF]">
                      {searchQuery || hasActiveFilters
                        ? 'Try adjusting your search or filters'
                        : 'Get started by uploading your first media file'}
                    </p>
                  </div>
                ) : (
                  filteredMedia.map(item => (
                    <MediaTableRow
                      key={item.id}
                      media={item}
                      isSelected={selectedItems.includes(item.id)}
                      onSelect={() => handleSelectItem(item.id)}
                      onClick={() => setSelectedMedia(item)}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MediaGridCard({ 
  media, 
  isSelected, 
  onSelect, 
  onClick 
}: { 
  media: MediaItem; 
  isSelected: boolean; 
  onSelect: () => void; 
  onClick: () => void;
}) {
  const getTypeIcon = () => {
    switch (media.type) {
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'html5': return <Globe className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (media.type) {
      case 'image': return 'from-[#8B5CF6] to-[#7C3AED]';
      case 'video': return 'from-[#3B82F6] to-[#2563EB]';
      case 'audio': return 'from-[#EC4899] to-[#DB2777]';
      case 'html5': return 'from-[#10B981] to-[#059669]';
    }
  };

  const getStatusBadge = () => {
    switch (media.status) {
      case 'active':
        return <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#166534] text-xs font-medium rounded">Active</span>;
      case 'scheduled':
        return <span className="px-2 py-0.5 bg-[#DBEAFE] text-[#1E40AF] text-xs font-medium rounded">Scheduled</span>;
      case 'expired':
        return <span className="px-2 py-0.5 bg-[#FEE2E2] text-[#991B1B] text-xs font-medium rounded">Expired</span>;
      case 'archived':
        return <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-xs font-medium rounded">Archived</span>;
    }
  };

  return (
    <div className="bg-white border-2 border-[#E5E7EB] rounded-xl overflow-hidden hover:border-[#D9480F] hover:shadow-lg transition-all group relative">
      {/* Thumbnail */}
      <div 
        onClick={onClick}
        className="aspect-video bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] relative cursor-pointer overflow-hidden"
      >
        {media.thumbnail ? (
          <img src={media.thumbnail} alt={media.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className={`w-16 h-16 bg-gradient-to-br ${getTypeColor()} rounded-xl flex items-center justify-center`}>
              <div className="text-white">{getTypeIcon()}</div>
            </div>
          </div>
        )}

        {/* Checkbox */}
        <div className="absolute top-3 left-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            onClick={(e) => e.stopPropagation()}
            className="w-5 h-5 rounded border-2 border-white bg-white/90 text-[#D9480F] focus:ring-[#D9480F] cursor-pointer"
          />
        </div>

        {/* Type Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 bg-gradient-to-br ${getTypeColor()} text-white text-xs font-medium rounded flex items-center gap-1`}>
          {getTypeIcon()}
          {media.type.toUpperCase()}
        </div>

        {/* Duration */}
        {media.duration && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
            {media.duration}s
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-[#111827] mb-1 truncate" title={media.name}>
          {media.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-xs text-[#9CA3AF]">{media.fileSize}</p>
          {media.resolution && (
            <>
              <span className="text-[#E5E7EB]">•</span>
              <p className="text-xs text-[#9CA3AF]">{media.resolution}</p>
            </>
          )}
        </div>

        {/* Tags */}
        {media.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {media.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-[#F9FAFB] text-[#6B7280] text-xs rounded">
                {tag}
              </span>
            ))}
            {media.tags.length > 2 && (
              <span className="px-2 py-0.5 bg-[#F9FAFB] text-[#6B7280] text-xs rounded">
                +{media.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Status */}
        <div className="flex items-center justify-between">
          {getStatusBadge()}
          <button
            onClick={onClick}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#F9FAFB] rounded"
          >
            <Eye className="w-4 h-4 text-[#6B7280]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MediaTableRow({ 
  media, 
  isSelected, 
  onSelect, 
  onClick 
}: { 
  media: MediaItem; 
  isSelected: boolean; 
  onSelect: () => void; 
  onClick: () => void;
}) {
  const getTypeIcon = () => {
    switch (media.type) {
      case 'image': return <ImageIcon className="w-4 h-4 text-[#8B5CF6]" />;
      case 'video': return <Video className="w-4 h-4 text-[#3B82F6]" />;
      case 'audio': return <Music className="w-4 h-4 text-[#EC4899]" />;
      case 'html5': return <Globe className="w-4 h-4 text-[#10B981]" />;
    }
  };

  const getStatusBadge = () => {
    switch (media.status) {
      case 'active':
        return <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#166534] text-xs font-medium rounded">Active</span>;
      case 'scheduled':
        return <span className="px-2 py-0.5 bg-[#DBEAFE] text-[#1E40AF] text-xs font-medium rounded">Scheduled</span>;
      case 'expired':
        return <span className="px-2 py-0.5 bg-[#FEE2E2] text-[#991B1B] text-xs font-medium rounded">Expired</span>;
      case 'archived':
        return <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#6B7280] text-xs font-medium rounded">Archived</span>;
    }
  };

  return (
    <div className="px-4 sm:px-6 py-4 hover:bg-[#F9FAFB] cursor-pointer transition-colors" onClick={onClick}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-1 flex items-center" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4 rounded border-[#E5E7EB] text-[#D9480F] focus:ring-[#D9480F]"
          />
        </div>
        <div className="col-span-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-[#F9FAFB] rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
            {media.thumbnail ? (
              <img src={media.thumbnail} alt={media.name} className="w-full h-full object-cover" />
            ) : (
              getTypeIcon()
            )}
          </div>
          <div>
            <p className="font-medium text-[#111827] text-sm">{media.name}</p>
            {media.description && (
              <p className="text-xs text-[#9CA3AF] truncate max-w-xs">{media.description}</p>
            )}
          </div>
        </div>
        <div className="col-span-2 flex items-center gap-2">
          {getTypeIcon()}
          <span className="text-sm text-[#6B7280] capitalize">{media.type}</span>
        </div>
        <div className="col-span-2 flex items-center">
          <div className="flex flex-wrap gap-1">
            {media.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-[#F9FAFB] text-[#6B7280] text-xs rounded">
                {tag}
              </span>
            ))}
            {media.tags.length > 2 && (
              <span className="px-2 py-0.5 bg-[#F9FAFB] text-[#6B7280] text-xs rounded">
                +{media.tags.length - 2}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-2 flex items-center">
          {getStatusBadge()}
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <button className="p-1.5 hover:bg-[#F3F4F6] rounded">
            <MoreVertical className="w-4 h-4 text-[#6B7280]" />
          </button>
        </div>
      </div>
    </div>
  );
}