import { useState } from 'react';
import { ArrowLeft, Languages, Globe, Calendar, DollarSign, Check, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false },
  { code: 'fr', name: 'French', nativeName: 'Français', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', rtl: false },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', rtl: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', rtl: false },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', rtl: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', rtl: false },
  { code: 'ko', name: 'Korean', nativeName: '한국어', rtl: false },
];

const dateFormats = [
  { id: 'mdy', label: 'MM/DD/YYYY', example: '12/08/2025' },
  { id: 'dmy', label: 'DD/MM/YYYY', example: '08/12/2025' },
  { id: 'ymd', label: 'YYYY-MM-DD', example: '2025-12-08' },
  { id: 'long', label: 'Long format', example: 'December 8, 2025' },
];

const timeFormats = [
  { id: '12h', label: '12-hour', example: '2:30 PM' },
  { id: '24h', label: '24-hour', example: '14:30' },
];

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
];

export default function LanguageSettings() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [dateFormat, setDateFormat] = useState('mdy');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [currency, setCurrency] = useState('USD');
  const [autoDetect, setAutoDetect] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const selectedLang = languages.find(l => l.code === selectedLanguage);

  const handleChange = () => {
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Saving language settings:', {
        language: selectedLanguage,
        dateFormat,
        timeFormat,
        currency,
        autoDetect,
      });
      setIsSaving(false);
      setHasChanges(false);
    }, 1000);
  };

  const handleReset = () => {
    setSelectedLanguage('en');
    setDateFormat('mdy');
    setTimeFormat('12h');
    setCurrency('USD');
    setAutoDetect(false);
    setHasChanges(false);
  };

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
            <h1 className="text-[#111827]">Language Settings</h1>
            <p className="text-[#6B7280]">Configure language, region, and formatting preferences</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
        <div className="space-y-6">
          {/* Language Selection */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Languages className="w-5 h-5 text-[#D9480F]" />
              <h2 className="text-[#111827]">UI Language</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#111827] mb-2">
                  Select Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    handleChange();
                  }}
                  className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.nativeName})
                    </option>
                  ))}
                </select>
              </div>

              {/* Auto-detect */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoDetect}
                  onChange={(e) => {
                    setAutoDetect(e.target.checked);
                    handleChange();
                  }}
                  className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-[#D9480F]"
                />
                <span className="text-[#111827]">
                  Auto-detect language from browser settings
                </span>
              </label>

              {/* RTL Notice */}
              {selectedLang?.rtl && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-blue-900 font-medium mb-1">
                        Right-to-Left (RTL) Language
                      </p>
                      <p className="text-blue-700 text-sm">
                        This language uses right-to-left text direction. The interface will automatically adjust.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview */}
              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4">
                <p className="text-[#6B7280] text-sm mb-2">Preview</p>
                <div className={selectedLang?.rtl ? 'text-right' : 'text-left'}>
                  <p className="text-[#111827] font-medium mb-1">
                    {selectedLang?.nativeName === 'English' ? 'Welcome to Elextrify' : 
                     selectedLang?.nativeName === 'Español' ? 'Bienvenido a Elextrify' :
                     selectedLang?.nativeName === 'Français' ? 'Bienvenue à Elextrify' :
                     selectedLang?.nativeName === 'Deutsch' ? 'Willkommen bei Elextrify' :
                     selectedLang?.nativeName === 'العربية' ? 'مرحبا بك في Elextrify' :
                     'Welcome to Elextrify'}
                  </p>
                  <p className="text-[#6B7280] text-sm">
                    {selectedLang?.nativeName === 'English' ? 'Digital Out-of-Home Advertising Platform' :
                     selectedLang?.nativeName === 'Español' ? 'Plataforma de Publicidad Digital Fuera del Hogar' :
                     selectedLang?.nativeName === 'Français' ? 'Plateforme de Publicité Numérique Hors Domicile' :
                     selectedLang?.nativeName === 'Deutsch' ? 'Digitale Out-of-Home-Werbeplattform' :
                     selectedLang?.nativeName === 'العربية' ? 'منصة الإعلان الرقمي خارج المنزل' :
                     'Digital Out-of-Home Advertising Platform'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Region & Formatting */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-[#D9480F]" />
              <h2 className="text-[#111827]">Region & Formatting</h2>
            </div>

            <div className="space-y-6">
              {/* Date Format */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-[#6B7280]" />
                  <label className="text-[#111827]">Date Format</label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dateFormats.map((format) => (
                    <label
                      key={format.id}
                      className={`
                        flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all
                        ${dateFormat === format.id 
                          ? 'border-[#D9480F] bg-[#FEF2F2]' 
                          : 'border-[#E5E7EB] hover:border-[#D9480F]'
                        }
                      `}
                    >
                      <div>
                        <p className="text-[#111827] font-medium">{format.label}</p>
                        <p className="text-[#6B7280] text-sm">{format.example}</p>
                      </div>
                      <input
                        type="radio"
                        name="dateFormat"
                        value={format.id}
                        checked={dateFormat === format.id}
                        onChange={(e) => {
                          setDateFormat(e.target.value);
                          handleChange();
                        }}
                        className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-[#D9480F]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Format */}
              <div>
                <label className="block text-[#111827] mb-3">Time Format</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeFormats.map((format) => (
                    <label
                      key={format.id}
                      className={`
                        flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all
                        ${timeFormat === format.id 
                          ? 'border-[#D9480F] bg-[#FEF2F2]' 
                          : 'border-[#E5E7EB] hover:border-[#D9480F]'
                        }
                      `}
                    >
                      <div>
                        <p className="text-[#111827] font-medium">{format.label}</p>
                        <p className="text-[#6B7280] text-sm">{format.example}</p>
                      </div>
                      <input
                        type="radio"
                        name="timeFormat"
                        value={format.id}
                        checked={timeFormat === format.id}
                        onChange={(e) => {
                          setTimeFormat(e.target.value);
                          handleChange();
                        }}
                        className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] focus:ring-[#D9480F]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Currency */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-[#6B7280]" />
                  <label className="text-[#111827]">Currency</label>
                </div>
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    handleChange();
                  }}
                  className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.symbol} - {curr.name} ({curr.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

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
