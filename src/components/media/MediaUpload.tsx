import { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Globe,
  FileImage,
  FileVideo,
  FileAudio,
  File,
  CheckCircle2,
  AlertCircle,
  Settings,
  Trash2,
  Sparkles,
  Zap,
  Check,
  Users
} from 'lucide-react';
import { MediaDetails } from './MediaDetails';
import { mockClients } from '../../data/mockClients';

type MediaType = 'image' | 'video' | 'audio' | 'html5';

interface UploadedFile {
  id: string;
  file?: File;
  name: string;
  type: MediaType;
  size: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  progress?: number;
  thumbnail?: string;
  url?: string;
}

interface MediaUploadProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function MediaUpload({ onClose, onSuccess }: MediaUploadProps) {
  const [selectedType, setSelectedType] = useState<MediaType | null>(null);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showSettings, setShowSettings] = useState<UploadedFile | null>(null);

  const mediaTypes = [
    {
      type: 'image' as MediaType,
      icon: ImageIcon,
      title: 'Images',
      description: 'JPG, PNG, GIF, WebP',
      color: 'from-[#8B5CF6] to-[#7C3AED]',
      bgColor: 'bg-[#F3F0FF]',
      iconColor: 'text-[#8B5CF6]',
      accept: 'image/*'
    },
    {
      type: 'video' as MediaType,
      icon: Video,
      title: 'Videos',
      description: 'MP4, WebM, MOV',
      color: 'from-[#3B82F6] to-[#2563EB]',
      bgColor: 'bg-[#EFF6FF]',
      iconColor: 'text-[#3B82F6]',
      accept: 'video/*'
    },
    {
      type: 'audio' as MediaType,
      icon: Music,
      title: 'Audio',
      description: 'MP3, WAV, OGG',
      color: 'from-[#EC4899] to-[#DB2777]',
      bgColor: 'bg-[#FDF2F8]',
      iconColor: 'text-[#EC4899]',
      accept: 'audio/*'
    },
    {
      type: 'html5' as MediaType,
      icon: Globe,
      title: 'HTML5',
      description: 'ZIP or URL',
      color: 'from-[#10B981] to-[#059669]',
      bgColor: 'bg-[#ECFDF5]',
      iconColor: 'text-[#10B981]',
      accept: '.zip'
    }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (selectedType) {
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && selectedType) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      name: file.name,
      type: selectedType!,
      size: formatFileSize(file.size),
      status: 'uploading',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(uploadedFile => {
      simulateUpload(uploadedFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, progress, status: progress < 100 ? 'uploading' : 'processing' }
          : f
      ));

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, status: 'ready' }
              : f
          ));
        }, 500);
      }
    }, 200);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleConfigure = (file: UploadedFile) => {
    const mediaItem = {
      id: file.id,
      name: file.name,
      type: file.type,
      fileSize: file.size,
      uploadDate: new Date().toISOString(),
      status: 'active' as const,
      tags: [],
      thumbnail: file.thumbnail
    };
    setShowSettings(file);
  };

  const handleSaveSettings = () => {
    setShowSettings(null);
    onSuccess();
  };

  if (showSettings) {
    const mediaItem = {
      id: showSettings.id,
      name: showSettings.name,
      type: showSettings.type,
      fileSize: showSettings.size,
      uploadDate: new Date().toISOString(),
      status: 'active' as const,
      tags: [],
      thumbnail: showSettings.thumbnail
    };
    
    return (
      <MediaDetails 
        media={mediaItem} 
        onClose={() => setShowSettings(null)}
        onSave={handleSaveSettings}
        isNewUpload={true}
      />
    );
  }

  const selectedTypeData = mediaTypes.find(t => t.type === selectedType);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modern Header */}
        <div className="relative px-8 py-6 border-b border-[#E5E7EB] flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-[#FAFAFA] to-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D9480F] to-[#F97316] rounded-xl flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#111827]">Upload Media</h2>
              <p className="text-sm text-[#6B7280] mt-0.5">
                {selectedType 
                  ? `Uploading ${selectedTypeData?.title}`
                  : 'Select media type to get started'
                }
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white hover:bg-[#F9FAFB] rounded-xl flex items-center justify-center transition-colors border border-[#E5E7EB]"
          >
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {!selectedClient ? (
            // Client Selection Step
            <div className="p-8">
              {/* Header Section */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF7ED] border border-[#FDBA74] rounded-full mb-4">
                  <Users className="w-4 h-4 text-[#D9480F]" />
                  <span className="text-sm font-medium text-[#D9480F]">Select Client</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#111827] mb-2">
                  Which client is this media for?
                </h3>
                <p className="text-sm text-[#6B7280] max-w-md mx-auto">
                  Media must be assigned to a client. This ensures proper organization and access control.
                </p>
              </div>

              {/* Client Selection */}
              <div className="max-w-2xl mx-auto">
                <label className="block text-sm font-medium text-[#111827] mb-3">
                  Client <span className="text-[#DC2626]">*</span>
                </label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full h-12 px-4 bg-white border-2 border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                >
                  <option value="">Choose a client...</option>
                  {mockClients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
                <p className="text-xs text-[#9CA3AF] mt-2">
                  All media uploaded in this session will be assigned to this client
                </p>
              </div>

              {/* Client Cards (Alternative Visual Selection) */}
              <div className="mt-12 max-w-4xl mx-auto">
                <p className="text-xs text-[#6B7280] mb-4 text-center">Or select from the list below:</p>
                <div className="grid grid-cols-3 gap-4">
                  {mockClients.map(client => (
                    <button
                      key={client.id}
                      onClick={() => setSelectedClient(client.id)}
                      className="group relative bg-white border-2 border-[#E5E7EB] rounded-2xl p-6 hover:border-[#D9480F] hover:shadow-lg transition-all text-left overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D9480F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative z-10">
                        <div className="w-12 h-12 bg-[#F9FAFB] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FFF7ED] transition-colors">
                          <Users className="w-6 h-6 text-[#6B7280] group-hover:text-[#D9480F] transition-colors" />
                        </div>
                        
                        <h4 className="font-semibold text-[#111827] mb-1 group-hover:text-[#D9480F] transition-colors">
                          {client.name}
                        </h4>
                        <p className="text-xs text-[#9CA3AF]">{client.industry}</p>
                      </div>

                      <div className="absolute top-3 right-3 w-6 h-6 bg-[#D9480F] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : !selectedType ? (
            // Modern Type Selection
            <div className="p-8">
              {/* Client Badge */}
              <div className="mb-6 flex items-center justify-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
                  <Users className="w-4 h-4 text-[#6B7280]" />
                  <span className="text-sm text-[#6B7280]">Client:</span>
                  <span className="text-sm font-semibold text-[#111827]">
                    {mockClients.find(c => c.id === selectedClient)?.name}
                  </span>
                  <button
                    onClick={() => setSelectedClient('')}
                    className="ml-2 text-xs text-[#D9480F] hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Header Section */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF7ED] border border-[#FDBA74] rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-[#D9480F]" />
                  <span className="text-sm font-medium text-[#D9480F]">Choose Your Media Type</span>
                </div>
                <p className="text-sm text-[#6B7280] max-w-md mx-auto">
                  Select the type of content you want to upload to your media library
                </p>
              </div>

              {/* Type Grid */}
              <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
                {mediaTypes.map(type => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.type}
                      onClick={() => setSelectedType(type.type)}
                      className="group relative bg-white border-2 border-[#E5E7EB] rounded-2xl p-6 hover:border-[#D9480F] hover:shadow-lg transition-all text-center overflow-hidden"
                    >
                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 ${type.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform relative z-10`}>
                        <Icon className={`w-8 h-8 ${type.iconColor}`} />
                      </div>
                      
                      {/* Content */}
                      <h3 className="font-semibold text-[#111827] mb-1 group-hover:text-[#D9480F] transition-colors relative z-10">
                        {type.title}
                      </h3>
                      <p className="text-xs text-[#9CA3AF] relative z-10">
                        {type.description}
                      </p>

                      {/* Hover Arrow */}
                      <div className="absolute top-3 right-3 w-6 h-6 bg-[#D9480F] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            // Upload Area
            <div className="p-8">
              {/* Type Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${selectedTypeData?.bgColor} rounded-xl flex items-center justify-center`}>
                    {selectedTypeData && <selectedTypeData.icon className={`w-5 h-5 ${selectedTypeData.iconColor}`} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">{selectedTypeData?.title}</p>
                    <p className="text-xs text-[#9CA3AF]">{selectedTypeData?.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedType(null);
                    setUploadedFiles([]);
                  }}
                  className="text-sm text-[#6B7280] hover:text-[#D9480F] transition-colors font-medium"
                >
                  Change Type
                </button>
              </div>

              {uploadedFiles.length === 0 ? (
                // Enhanced Drop Zone
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-3xl p-16 text-center transition-all ${
                    isDragging
                      ? 'border-[#D9480F] bg-[#FFF7ED] scale-105'
                      : 'border-[#E5E7EB] bg-gradient-to-br from-[#FAFAFA] to-white hover:border-[#D9480F] hover:shadow-lg'
                  }`}
                >
                  {/* Animated Icon */}
                  <div className={`relative w-24 h-24 mx-auto mb-6 ${isDragging ? 'scale-110' : ''} transition-transform`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D9480F]/20 to-[#F97316]/10 rounded-3xl animate-pulse" />
                    <div className="relative w-24 h-24 bg-gradient-to-br from-[#D9480F] to-[#F97316] rounded-3xl flex items-center justify-center">
                      <Upload className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-[#111827] mb-2">
                    {isDragging ? 'Drop files here!' : `Drop your ${selectedType} files`}
                  </h3>
                  <p className="text-sm text-[#6B7280] mb-8">
                    or click the button below to browse from your computer
                  </p>
                  
                  {/* Upload Button */}
                  <label className="inline-block group cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept={selectedTypeData?.accept}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <span className="h-12 px-8 bg-[#D9480F] text-white rounded-xl hover:bg-[#C43F0D] transition-all font-medium cursor-pointer inline-flex items-center gap-3 shadow-lg hover:shadow-xl group-hover:scale-105">
                      <Upload className="w-5 h-5" />
                      Choose Files
                      <Zap className="w-4 h-4" />
                    </span>
                  </label>
                  
                  {/* Info Footer */}
                  <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                    <div className="flex items-center justify-center gap-8 text-xs text-[#9CA3AF]">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                        <span>Formats: {selectedTypeData?.description}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full" />
                        <span>Max size: 500 MB</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full" />
                        <span>Multiple files supported</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Modern File List
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E7EB]">
                    <div>
                      <h3 className="font-semibold text-[#111827]">
                        Uploaded Files
                      </h3>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">
                        {uploadedFiles.filter(f => f.status === 'ready').length} of {uploadedFiles.length} files ready
                      </p>
                    </div>
                    <label className="group cursor-pointer">
                      <input
                        type="file"
                        multiple
                        accept={selectedTypeData?.accept}
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <span className="h-10 px-5 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl hover:border-[#D9480F] hover:text-[#D9480F] hover:bg-[#FFF7ED] transition-all font-medium cursor-pointer inline-flex items-center gap-2 text-sm group-hover:scale-105">
                        <Upload className="w-4 h-4" />
                        Add More Files
                      </span>
                    </label>
                  </div>

                  {/* File Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {uploadedFiles.map(file => (
                      <UploadedFileCard
                        key={file.id}
                        file={file}
                        onConfigure={() => handleConfigure(file)}
                        onRemove={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modern Footer */}
        {uploadedFiles.length > 0 && (
          <div className="px-8 py-5 border-t border-[#E5E7EB] flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-[#FAFAFA] to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ECFDF5] rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#111827]">
                  {uploadedFiles.filter(f => f.status === 'ready').length} files ready
                </p>
                <p className="text-xs text-[#9CA3AF]">
                  {uploadedFiles.length - uploadedFiles.filter(f => f.status === 'ready').length} processing...
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="h-11 px-6 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-xl hover:bg-[#F9FAFB] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onSuccess}
                disabled={uploadedFiles.some(f => f.status !== 'ready')}
                className="h-11 px-8 bg-[#D9480F] text-white rounded-xl hover:bg-[#C43F0D] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Complete Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadedFileCard({ 
  file, 
  onConfigure, 
  onRemove 
}: { 
  file: UploadedFile; 
  onConfigure: () => void; 
  onRemove: () => void;
}) {
  const getStatusIcon = () => {
    switch (file.status) {
      case 'uploading':
      case 'processing':
        return <div className="w-5 h-5 border-2 border-[#D9480F] border-t-transparent rounded-full animate-spin" />;
      case 'ready':
        return <CheckCircle2 className="w-5 h-5 text-[#10B981]" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-[#DC2626]" />;
    }
  };

  const getTypeIcon = () => {
    switch (file.type) {
      case 'image': return <FileImage className="w-10 h-10 text-[#8B5CF6]" />;
      case 'video': return <FileVideo className="w-10 h-10 text-[#3B82F6]" />;
      case 'audio': return <FileAudio className="w-10 h-10 text-[#EC4899]" />;
      case 'html5': return <File className="w-10 h-10 text-[#10B981]" />;
    }
  };

  const getTypeBg = () => {
    switch (file.type) {
      case 'image': return 'bg-[#F3F0FF]';
      case 'video': return 'bg-[#EFF6FF]';
      case 'audio': return 'bg-[#FDF2F8]';
      case 'html5': return 'bg-[#ECFDF5]';
    }
  };

  return (
    <div className="group relative bg-white border-2 border-[#E5E7EB] rounded-2xl p-4 hover:border-[#D9480F] hover:shadow-lg transition-all">
      {/* Progress Bar */}
      {(file.status === 'uploading' || file.status === 'processing') && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#F3F4F6] rounded-t-2xl overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#D9480F] to-[#F97316] transition-all duration-300"
            style={{ width: `${file.progress}%` }}
          />
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* File Icon */}
        <div className={`w-14 h-14 ${getTypeBg()} rounded-xl flex items-center justify-center flex-shrink-0`}>
          {getTypeIcon()}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#111827] truncate mb-1">
            {file.name}
          </p>
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <span>{file.size}</span>
            <span>•</span>
            <span className="capitalize">{file.type}</span>
          </div>

          {/* Status */}
          <div className="mt-2 flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-xs font-medium text-[#6B7280] capitalize">
              {file.status === 'uploading' ? `Uploading ${file.progress}%` : file.status}
            </span>
          </div>
        </div>

        {/* Actions */}
        {file.status === 'ready' && (
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onConfigure}
              className="w-8 h-8 bg-[#F9FAFB] hover:bg-[#D9480F] rounded-lg flex items-center justify-center transition-colors group/btn"
            >
              <Settings className="w-4 h-4 text-[#6B7280] group-hover/btn:text-white" />
            </button>
            <button
              onClick={onRemove}
              className="w-8 h-8 bg-[#F9FAFB] hover:bg-[#DC2626] rounded-lg flex items-center justify-center transition-colors group/btn"
            >
              <Trash2 className="w-4 h-4 text-[#6B7280] group-hover/btn:text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}