import { useState } from 'react';
import { 
  X, 
  Save,
  Image as ImageIcon, 
  Video, 
  Music, 
  Globe,
  Clock,
  Calendar,
  Tag as TagIcon,
  FileText,
  HardDrive,
  Monitor,
  Eye,
  Plus,
  Trash2,
  AlertCircle,
  Info,
  Link as LinkIcon,
  Upload,
  CheckCircle2,
  ExternalLink,
  Users,
  Play,
  Pause,
  Volume2,
  Maximize2
} from 'lucide-react';

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

interface AvailabilityWindow {
  id: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface MediaDetailsProps {
  media: MediaItem;
  onClose: () => void;
  onSave?: () => void;
  isNewUpload?: boolean;
}

export function MediaDetails({ media, onClose, onSave, isNewUpload = false }: MediaDetailsProps) {
  const [name, setName] = useState(media.name);
  const [description, setDescription] = useState(media.description || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(media.tags);
  const [customDuration, setCustomDuration] = useState(media.duration?.toString() || '10');
  const [enableScheduling, setEnableScheduling] = useState(false);
  const [availabilityWindows, setAvailabilityWindows] = useState<AvailabilityWindow[]>([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [htmlSource, setHtmlSource] = useState<'url' | 'zip'>('url');
  const [htmlUrl, setHtmlUrl] = useState(media.url || '');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const allTags = ['Holiday 2024', 'Product Launch', 'Brand Awareness', 'Seasonal', 'Promotional', 'Evergreen'];
  const availableTags = allTags.filter(tag => !selectedTags.includes(tag));

  const handleSave = () => {
    console.log('Saving media:', {
      name,
      description,
      tags: selectedTags,
      customDuration,
      enableScheduling,
      availabilityWindows,
      htmlUrl
    });
    setHasUnsavedChanges(false);
    if (onSave) {
      onSave();
    } else {
      onClose();
    }
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setHasUnsavedChanges(true);
    }
    setShowTagInput(false);
    setNewTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
    setHasUnsavedChanges(true);
  };

  const handleAddAvailability = () => {
    const newWindow: AvailabilityWindow = {
      id: Date.now().toString(),
      startDate: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endTime: '18:00'
    };
    setAvailabilityWindows([...availabilityWindows, newWindow]);
    setHasUnsavedChanges(true);
  };

  const handleRemoveAvailability = (id: string) => {
    setAvailabilityWindows(availabilityWindows.filter(w => w.id !== id));
    setHasUnsavedChanges(true);
  };

  const getTypeIcon = () => {
    switch (media.type) {
      case 'image': return <ImageIcon className="w-5 h-5 text-[#8B5CF6]" />;
      case 'video': return <Video className="w-5 h-5 text-[#3B82F6]" />;
      case 'audio': return <Music className="w-5 h-5 text-[#EC4899]" />;
      case 'html5': return <Globe className="w-5 h-5 text-[#10B981]" />;
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

  const needsDuration = media.type === 'image' || media.type === 'html5';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end">
      <div className="bg-white h-full w-[80%] max-w-[1152px] shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#E5E7EB] flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 bg-gradient-to-br ${getTypeColor()} rounded-lg flex items-center justify-center`}>
                {getTypeIcon()}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#111827]">
                  {isNewUpload ? 'Configure Media' : 'Media Details'}
                </h2>
                <p className="text-sm text-[#6B7280] capitalize">{media.type}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <span className="text-sm text-[#F59E0B] flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Unsaved changes
              </span>
            )}
            <button
              onClick={handleSave}
              className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors font-medium flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isNewUpload ? 'Save & Close' : 'Save Changes'}
            </button>
            <button
              onClick={onClose}
              className="w-11 h-11 bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-8 p-8">
            {/* Left Column - Preview & Metadata */}
            <div className="space-y-6">
              {/* Preview */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                  <h3 className="font-semibold text-[#111827] flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </h3>
                </div>
                <div className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] rounded-lg flex items-center justify-center relative overflow-hidden">
                    {media.thumbnail ? (
                      <img src={media.thumbnail} alt={media.name} className="w-full h-full object-cover" />
                    ) : media.type === 'audio' ? (
                      <div className="text-center">
                        <Music className="w-16 h-16 text-[#EC4899] mx-auto mb-4" />
                        <p className="text-sm text-[#6B7280]">Audio file</p>
                      </div>
                    ) : (
                      <div className={`w-20 h-20 bg-gradient-to-br ${getTypeColor()} rounded-xl flex items-center justify-center`}>
                        <div className="text-white scale-150">{getTypeIcon()}</div>
                      </div>
                    )}
                    
                    {media.type === 'video' && (
                      <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-l-[16px] border-l-[#D9480F] border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                  <h3 className="font-semibold text-[#111827] flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Media Information
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {/* Client Information - NEW */}
                  <div className="p-4 bg-gradient-to-r from-[#FFF7ED] to-[#FEF2F2] border border-[#FDBA74] rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-[#D9480F]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-[#9CA3AF] mb-1">Assigned to Client</p>
                        <p className="text-sm font-semibold text-[#111827] mb-1">{media.clientName}</p>
                        <p className="text-xs text-[#6B7280]">
                          This media can only be used in playlists for this client
                        </p>
                      </div>
                      <button className="text-xs text-[#D9480F] hover:underline font-medium flex-shrink-0">
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Media ID</p>
                      <p className="text-sm font-medium text-[#111827]">{media.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">File Size</p>
                      <p className="text-sm font-medium text-[#111827] flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-[#9CA3AF]" />
                        {media.fileSize}
                      </p>
                    </div>
                  </div>

                  {media.resolution && (
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Resolution</p>
                      <p className="text-sm font-medium text-[#111827] flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-[#9CA3AF]" />
                        {media.resolution}
                      </p>
                    </div>
                  )}

                  {media.duration && media.type === 'video' && (
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Duration (Auto-detected)</p>
                      <p className="text-sm font-medium text-[#111827] flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#9CA3AF]" />
                        {media.duration} seconds
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Upload Date</p>
                    <p className="text-sm font-medium text-[#111827] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#9CA3AF]" />
                      {new Date(media.uploadDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Usage Information */}
              {media.usedIn && media.usedIn.length > 0 && (
                <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                    <h3 className="font-semibold text-[#111827] flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      Used In
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-2">
                      {media.usedIn.map((usage, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                          <span className="text-sm text-[#111827]">{usage}</span>
                          <ExternalLink className="w-4 h-4 text-[#9CA3AF]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Settings */}
            <div className="space-y-6">
              {/* Basic Settings */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                  <h3 className="font-semibold text-[#111827]">Basic Settings</h3>
                </div>
                <div className="p-6 space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Name <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="Enter media name"
                      className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="Add a description..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedTags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 h-8 bg-[#D9480F] text-white rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:bg-white/20 rounded p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>

                    {showTagInput ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Type new tag..."
                            className="flex-1 h-9 px-3 bg-white border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newTag.trim()) {
                                handleAddTag(newTag.trim());
                              }
                            }}
                          />
                          <button
                            onClick={() => newTag.trim() && handleAddTag(newTag.trim())}
                            className="h-9 px-4 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] text-sm font-medium"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => {
                              setShowTagInput(false);
                              setNewTag('');
                            }}
                            className="h-9 px-4 bg-[#F9FAFB] text-[#6B7280] rounded-lg hover:bg-[#F3F4F6] text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                        {availableTags.length > 0 && (
                          <div>
                            <p className="text-xs text-[#6B7280] mb-2">Or choose from existing:</p>
                            <div className="flex flex-wrap gap-2">
                              {availableTags.map(tag => (
                                <button
                                  key={tag}
                                  onClick={() => handleAddTag(tag)}
                                  className="px-3 h-7 bg-[#F9FAFB] text-[#6B7280] rounded text-sm hover:bg-[#D9480F] hover:text-white transition-colors"
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowTagInput(true)}
                        className="w-full h-9 border-2 border-dashed border-[#E5E7EB] rounded-lg text-sm text-[#6B7280] hover:border-[#D9480F] hover:text-[#D9480F] transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Tag
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Duration Settings (for images and HTML5) */}
              {needsDuration && (
                <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                    <h3 className="font-semibold text-[#111827]">Display Duration</h3>
                  </div>
                  <div className="p-6">
                    <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-lg p-4 mb-4 flex gap-3">
                      <Info className="w-5 h-5 text-[#D9480F] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-[#111827] font-medium mb-1">
                          Set Default Display Time
                        </p>
                        <p className="text-xs text-[#6B7280]">
                          This defines how long the {media.type} will be shown. You can override this in individual playlists.
                        </p>
                      </div>
                    </div>

                    <label className="block text-sm font-medium text-[#111827] mb-2">
                      Duration (seconds) <span className="text-[#DC2626]">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={customDuration}
                        onChange={(e) => {
                          setCustomDuration(e.target.value);
                          setHasUnsavedChanges(true);
                        }}
                        min="1"
                        max="300"
                        className="flex-1 h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                      />
                      <span className="text-sm text-[#6B7280]">seconds</span>
                    </div>
                  </div>
                </div>
              )}

              {/* HTML5 Source Settings */}
              {media.type === 'html5' && (
                <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                    <h3 className="font-semibold text-[#111827]">HTML5 Source</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Source Type */}
                    <div>
                      <label className="block text-sm font-medium text-[#111827] mb-3">
                        Source Type
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setHtmlSource('url')}
                          className={`h-11 rounded-lg border-2 font-medium text-sm transition-colors ${
                            htmlSource === 'url'
                              ? 'border-[#D9480F] bg-[#FFF7ED] text-[#D9480F]'
                              : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D9480F]'
                          }`}
                        >
                          Hosted URL
                        </button>
                        <button
                          onClick={() => setHtmlSource('zip')}
                          className={`h-11 rounded-lg border-2 font-medium text-sm transition-colors ${
                            htmlSource === 'zip'
                              ? 'border-[#D9480F] bg-[#FFF7ED] text-[#D9480F]'
                              : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#D9480F]'
                          }`}
                        >
                          ZIP Upload
                        </button>
                      </div>
                    </div>

                    {htmlSource === 'url' ? (
                      <div>
                        <label className="block text-sm font-medium text-[#111827] mb-2">
                          URL <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                          type="url"
                          value={htmlUrl}
                          onChange={(e) => {
                            setHtmlUrl(e.target.value);
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="https://example.com/content"
                          className="w-full h-11 px-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-[#111827] mb-2">
                          Upload ZIP File
                        </label>
                        <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-6 text-center hover:border-[#D9480F] transition-colors">
                          <Upload className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" />
                          <p className="text-sm text-[#6B7280] mb-3">
                            Drop ZIP file here or click to browse
                          </p>
                          <label>
                            <input type="file" accept=".zip" className="hidden" />
                            <span className="h-9 px-4 bg-[#D9480F] text-white rounded-lg hover:bg-[#C43F0D] transition-colors font-medium cursor-pointer inline-flex items-center gap-2 text-sm">
                              Choose File
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Warning */}
                    <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg p-4 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-[#991B1B] font-medium mb-1">
                          Important Notes
                        </p>
                        <ul className="text-xs text-[#B91C1C] space-y-1">
                          <li>• Entry point must be named index.html</li>
                          <li>• Cross-origin resources may not load</li>
                          <li>• External scripts and APIs may be blocked</li>
                          <li>• Test thoroughly before deployment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Availability Settings */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                  <h3 className="font-semibold text-[#111827]">Availability</h3>
                </div>
                <div className="p-6 space-y-4">
                  {/* Enable Scheduling Toggle */}
                  <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-[#111827] mb-1">
                        Enable Scheduling
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        Set specific date ranges when this media is available
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEnableScheduling(!enableScheduling);
                        setHasUnsavedChanges(true);
                      }}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        enableScheduling ? 'bg-[#D9480F]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          enableScheduling ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {enableScheduling && (
                    <div className="space-y-3">
                      {/* Availability Windows */}
                      {availabilityWindows.map((window, index) => (
                        <div key={window.id} className="border border-[#E5E7EB] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-medium text-[#111827]">
                              Window {index + 1}
                            </p>
                            <button
                              onClick={() => handleRemoveAvailability(window.id)}
                              className="text-[#DC2626] hover:bg-[#FEF2F2] p-1 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-[#6B7280] mb-1">
                                Start Date
                              </label>
                              <input
                                type="date"
                                value={window.startDate}
                                onChange={(e) => {
                                  const updated = availabilityWindows.map(w =>
                                    w.id === window.id ? { ...w, startDate: e.target.value } : w
                                  );
                                  setAvailabilityWindows(updated);
                                  setHasUnsavedChanges(true);
                                }}
                                className="w-full h-9 px-3 bg-white border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-[#6B7280] mb-1">
                                Start Time
                              </label>
                              <input
                                type="time"
                                value={window.startTime}
                                onChange={(e) => {
                                  const updated = availabilityWindows.map(w =>
                                    w.id === window.id ? { ...w, startTime: e.target.value } : w
                                  );
                                  setAvailabilityWindows(updated);
                                  setHasUnsavedChanges(true);
                                }}
                                className="w-full h-9 px-3 bg-white border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-[#6B7280] mb-1">
                                End Date
                              </label>
                              <input
                                type="date"
                                value={window.endDate}
                                onChange={(e) => {
                                  const updated = availabilityWindows.map(w =>
                                    w.id === window.id ? { ...w, endDate: e.target.value } : w
                                  );
                                  setAvailabilityWindows(updated);
                                  setHasUnsavedChanges(true);
                                }}
                                className="w-full h-9 px-3 bg-white border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-[#6B7280] mb-1">
                                End Time
                              </label>
                              <input
                                type="time"
                                value={window.endTime}
                                onChange={(e) => {
                                  const updated = availabilityWindows.map(w =>
                                    w.id === window.id ? { ...w, endTime: e.target.value } : w
                                  );
                                  setAvailabilityWindows(updated);
                                  setHasUnsavedChanges(true);
                                }}
                                className="w-full h-9 px-3 bg-white border border-[#E5E7EB] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#D9480F]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add Window Button */}
                      <button
                        onClick={handleAddAvailability}
                        className="w-full h-10 border-2 border-dashed border-[#E5E7EB] rounded-lg text-sm text-[#6B7280] hover:border-[#D9480F] hover:text-[#D9480F] transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Availability Window
                      </button>

                      {/* Non-expiring Option */}
                      <div className="pt-3 border-t border-[#E5E7EB]">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-[#E5E7EB] text-[#D9480F] focus:ring-[#D9480F]"
                          />
                          <div>
                            <p className="text-sm font-medium text-[#111827]">
                              Never expires
                            </p>
                            <p className="text-xs text-[#6B7280]">
                              Media will be available indefinitely
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}