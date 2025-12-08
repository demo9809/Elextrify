import { useState } from 'react';
import { ArrowLeft, Settings, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GeneralSettings() {
  const navigate = useNavigate();
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Section collapse states
  const [platformOpen, setPlatformOpen] = useState(true);
  const [schedulingOpen, setSchedulingOpen] = useState(true);
  const [assetOpen, setAssetOpen] = useState(true);
  const [kioskOpen, setKioskOpen] = useState(true);

  // Form values
  const [platformName, setPlatformName] = useState('Elextrify');
  const [defaultTimezone, setDefaultTimezone] = useState('America/New_York');
  const [defaultScheduleDuration, setDefaultScheduleDuration] = useState('30');
  const [defaultStartTime, setDefaultStartTime] = useState('09:00');
  const [defaultEndTime, setDefaultEndTime] = useState('21:00');
  const [assetExpiryDays, setAssetExpiryDays] = useState('90');
  const [autoDeleteExpired, setAutoDeleteExpired] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [defaultKioskTimeout, setDefaultKioskTimeout] = useState('60');
  const [offlineThreshold, setOfflineThreshold] = useState('5');

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Singapore',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  const handleChange = () => {
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Saving general settings:', {
        platformName,
        defaultTimezone,
        scheduling: {
          defaultDuration: defaultScheduleDuration,
          defaultStartTime,
          defaultEndTime,
        },
        assets: {
          expiryDays: assetExpiryDays,
          autoDelete: autoDeleteExpired,
        },
        updates: {
          autoUpdate,
        },
        kiosks: {
          defaultTimeout: defaultKioskTimeout,
          offlineThreshold,
        },
      });
      setIsSaving(false);
      setHasChanges(false);
    }, 1000);
  };

  const handleReset = () => {
    setPlatformName('Elextrify');
    setDefaultTimezone('America/New_York');
    setDefaultScheduleDuration('30');
    setDefaultStartTime('09:00');
    setDefaultEndTime('21:00');
    setAssetExpiryDays('90');
    setAutoDeleteExpired(false);
    setAutoUpdate(true);
    setDefaultKioskTimeout('60');
    setOfflineThreshold('5');
    setHasChanges(false);
  };

  const CollapsibleSection = ({ 
    title, 
    isOpen, 
    onToggle, 
    children 
  }: { 
    title: string; 
    isOpen: boolean; 
    onToggle: () => void; 
    children: React.ReactNode;
  }) => (
    <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 hover:bg-[#F9FAFB] transition-colors"
      >
        <h2 className="text-[#111827]">{title}</h2>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#6B7280]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#6B7280]" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 border-t border-[#E5E7EB]">
          <div className="pt-6 space-y-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
          </button>
          <div>
            <h1 className="text-[#111827]">General Configurations</h1>
            <p className="text-[#6B7280]">Platform defaults, scheduling rules, and system settings</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
        <div className="space-y-6">
          {/* Platform Settings */}
          <CollapsibleSection
            title="Platform Settings"
            isOpen={platformOpen}
            onToggle={() => setPlatformOpen(!platformOpen)}
          >
            <div>
              <label className="block text-[#111827] mb-2">
                Platform Name
              </label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => {
                  setPlatformName(e.target.value);
                  handleChange();
                }}
                className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
              <p className="mt-2 text-[#6B7280] text-sm">
                This name appears in the sidebar and browser title
              </p>
            </div>

            <div>
              <label className="block text-[#111827] mb-2">
                Default Timezone
              </label>
              <select
                value={defaultTimezone}
                onChange={(e) => {
                  setDefaultTimezone(e.target.value);
                  handleChange();
                }}
                className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-[#6B7280] text-sm">
                Used as default for new campaigns and kiosks
              </p>
            </div>
          </CollapsibleSection>

          {/* Scheduling Defaults */}
          <CollapsibleSection
            title="Default Scheduling Rules"
            isOpen={schedulingOpen}
            onToggle={() => setSchedulingOpen(!schedulingOpen)}
          >
            <div>
              <label className="block text-[#111827] mb-2">
                Default Campaign Duration (days)
              </label>
              <input
                type="number"
                value={defaultScheduleDuration}
                onChange={(e) => {
                  setDefaultScheduleDuration(e.target.value);
                  handleChange();
                }}
                min="1"
                max="365"
                className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
              <p className="mt-2 text-[#6B7280] text-sm">
                Pre-filled when creating new campaigns
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#111827] mb-2">
                  Default Start Time
                </label>
                <input
                  type="time"
                  value={defaultStartTime}
                  onChange={(e) => {
                    setDefaultStartTime(e.target.value);
                    handleChange();
                  }}
                  className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-[#111827] mb-2">
                  Default End Time
                </label>
                <input
                  type="time"
                  value={defaultEndTime}
                  onChange={(e) => {
                    setDefaultEndTime(e.target.value);
                    handleChange();
                  }}
                  className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Asset Management */}
          <CollapsibleSection
            title="Asset & Media Defaults"
            isOpen={assetOpen}
            onToggle={() => setAssetOpen(!assetOpen)}
          >
            <div>
              <label className="block text-[#111827] mb-2">
                Asset Expiry Period (days)
              </label>
              <input
                type="number"
                value={assetExpiryDays}
                onChange={(e) => {
                  setAssetExpiryDays(e.target.value);
                  handleChange();
                }}
                min="30"
                max="365"
                className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
              <p className="mt-2 text-[#6B7280] text-sm">
                Media files not used in active campaigns for this period will be flagged
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoDeleteExpired}
                onChange={(e) => {
                  setAutoDeleteExpired(e.target.checked);
                  handleChange();
                }}
                className="w-4 h-4 mt-1 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-[#D9480F]"
              />
              <div>
                <span className="text-[#111827] block mb-1">
                  Automatically delete expired assets
                </span>
                <span className="text-[#6B7280] text-sm">
                  Warning: Deleted files cannot be recovered. A backup notification will be sent.
                </span>
              </div>
            </label>
          </CollapsibleSection>

          {/* Kiosk Defaults */}
          <CollapsibleSection
            title="Default Kiosk & Campaign Settings"
            isOpen={kioskOpen}
            onToggle={() => setKioskOpen(!kioskOpen)}
          >
            <div>
              <label className="block text-[#111827] mb-2">
                Default Kiosk Inactivity Timeout (seconds)
              </label>
              <input
                type="number"
                value={defaultKioskTimeout}
                onChange={(e) => {
                  setDefaultKioskTimeout(e.target.value);
                  handleChange();
                }}
                min="30"
                max="300"
                className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
              <p className="mt-2 text-[#6B7280] text-sm">
                Time before kiosk returns to idle screen
              </p>
            </div>

            <div>
              <label className="block text-[#111827] mb-2">
                Offline Threshold (minutes)
              </label>
              <input
                type="number"
                value={offlineThreshold}
                onChange={(e) => {
                  setOfflineThreshold(e.target.value);
                  handleChange();
                }}
                min="1"
                max="60"
                className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              />
              <p className="mt-2 text-[#6B7280] text-sm">
                Kiosks marked offline after this period of no heartbeat
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoUpdate}
                onChange={(e) => {
                  setAutoUpdate(e.target.checked);
                  handleChange();
                }}
                className="w-4 h-4 mt-1 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-[#D9480F]"
              />
              <div>
                <span className="text-[#111827] block mb-1">
                  Enable automatic updates for kiosks
                </span>
                <span className="text-[#6B7280] text-sm">
                  Kiosks will automatically update content when campaigns change
                </span>
              </div>
            </label>
          </CollapsibleSection>

          {/* Actions */}
          {hasChanges && (
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={handleReset}
                  disabled={isSaving}
                  className="h-11 px-6 border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-[#F9FAFB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Changes
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
