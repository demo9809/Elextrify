import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Save,
  X,
  AlertCircle,
  Shield,
  MapPin,
  Briefcase,
  Layers
} from 'lucide-react';
import { toast } from 'sonner';
import {
  mockOrganizationUnits,
  getUnitTypeLabel,
  wouldCreateCircularReference,
  type OrganizationUnit,
  type UnitType,
  type UnitStatus
} from '../../data/mockOrganizationUnits';

export default function CreateEditOrganizationUnit() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const isEditing = !!unitId;

  const [formData, setFormData] = useState({
    name: '',
    parentId: '',
    unitType: 'department' as UnitType,
    status: 'active' as UnitStatus,
    timezone: 'America/New_York',
    currency: 'USD',
    // Billing info (only for legal entities)
    legalCompanyName: '',
    billingAddress: '',
    taxId: '',
    invoiceEmail: '',
    country: '',
    region: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing) {
      const unit = mockOrganizationUnits.find(u => u.id === unitId);
      if (unit) {
        setFormData({
          name: unit.name,
          parentId: unit.parentId || '',
          unitType: unit.unitType,
          status: unit.status,
          timezone: unit.timezone,
          currency: unit.currency,
          legalCompanyName: unit.billingInformation?.legalCompanyName || '',
          billingAddress: unit.billingInformation?.billingAddress || '',
          taxId: unit.billingInformation?.taxId || '',
          invoiceEmail: unit.billingInformation?.invoiceEmail || '',
          country: unit.billingInformation?.country || '',
          region: unit.billingInformation?.region || '',
        });
      }
    }
  }, [isEditing, unitId]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Organization unit name is required';
    }

    if (formData.parentId && wouldCreateCircularReference(unitId || '', formData.parentId, mockOrganizationUnits)) {
      newErrors.parentId = 'This would create a circular reference in the hierarchy';
    }

    if (formData.unitType === 'legal-entity') {
      if (!formData.legalCompanyName.trim()) {
        newErrors.legalCompanyName = 'Legal company name is required for legal entities';
      }
      if (!formData.billingAddress.trim()) {
        newErrors.billingAddress = 'Billing address is required for legal entities';
      }
      if (!formData.taxId.trim()) {
        newErrors.taxId = 'Tax ID is required for legal entities';
      }
      if (!formData.invoiceEmail.trim()) {
        newErrors.invoiceEmail = 'Invoice email is required for legal entities';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    if (isEditing) {
      toast.success('Organization unit updated successfully');
    } else {
      toast.success('Organization unit created successfully');
    }
    
    navigate('/organization-units');
  };

  const availableParents = mockOrganizationUnits.filter(u => u.id !== unitId);

  const getParentBreadcrumb = () => {
    if (!formData.parentId) return 'Root Level';
    
    const parent = mockOrganizationUnits.find(u => u.id === formData.parentId);
    if (!parent) return 'Root Level';
    
    const breadcrumbs = [parent.name];
    let currentParent = parent;
    
    while (currentParent.parentId) {
      const nextParent = mockOrganizationUnits.find(u => u.id === currentParent.parentId);
      if (!nextParent) break;
      breadcrumbs.unshift(nextParent.name);
      currentParent = nextParent;
    }
    
    return breadcrumbs.join(' > ');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/organization-units')}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-[#111827] flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-[#D9480F]" />
                  {isEditing ? 'Edit Organization Unit' : 'New Organization Unit'}
                </h1>
                <p className="text-sm text-[#6B7280] mt-1">
                  {isEditing ? 'Update organization unit information' : 'Create a new organization unit'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/organization-units')}
                className="flex items-center gap-2 px-4 h-[44px] border border-[#E5E7EB] bg-white text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Cancel</span>
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 h-[44px] bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{isEditing ? 'Update Unit' : 'Create Unit'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto space-y-6">
        {/* Basic Information */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <h2 className="font-semibold text-[#111827] mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Organization Unit Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., North America Region"
                className={`w-full h-[44px] px-4 border ${
                  errors.name ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-[#DC2626] flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Parent Organization Unit
              </label>
              <select
                value={formData.parentId}
                onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                className={`w-full h-[44px] px-4 border ${
                  errors.parentId ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                } rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
              >
                <option value="">Root Level (No Parent)</option>
                {availableParents.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} ({getUnitTypeLabel(unit.unitType)})
                  </option>
                ))}
              </select>
              {errors.parentId && (
                <p className="mt-1 text-sm text-[#DC2626] flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.parentId}
                </p>
              )}
              {formData.parentId && (
                <p className="mt-1 text-sm text-[#6B7280]">
                  Will be placed under: {getParentBreadcrumb()}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Unit Type <span className="text-[#DC2626]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(['legal-entity', 'regional-office', 'sub-agency', 'department'] as UnitType[]).map((type) => {
                  const icons = {
                    'legal-entity': Shield,
                    'regional-office': MapPin,
                    'sub-agency': Briefcase,
                    'department': Layers,
                  };
                  const Icon = icons[type];
                  
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, unitType: type })}
                      className={`p-4 border-2 rounded-lg transition-all text-left ${
                        formData.unitType === type
                          ? 'border-[#D9480F] bg-[#FEF2F2]'
                          : 'border-[#E5E7EB] hover:border-[#D9480F] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          formData.unitType === type ? 'bg-[#D9480F]' : 'bg-[#F9FAFB]'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            formData.unitType === type ? 'text-white' : 'text-[#6B7280]'
                          }`} />
                        </div>
                        <div>
                          <p className={`font-medium ${
                            formData.unitType === type ? 'text-[#D9480F]' : 'text-[#111827]'
                          }`}>
                            {getUnitTypeLabel(type)}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as UnitStatus })}
                className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
          <h2 className="font-semibold text-[#111827] mb-4">Configuration</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Timezone
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="America/New_York">America/New York (EST)</option>
                <option value="America/Chicago">America/Chicago (CST)</option>
                <option value="America/Denver">America/Denver (MST)</option>
                <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Europe/Paris">Europe/Paris (CET)</option>
                <option value="Europe/Berlin">Europe/Berlin (CET)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
              >
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
                <option value="JPY">JPY - Japanese Yen (¥)</option>
                <option value="AUD">AUD - Australian Dollar (A$)</option>
                <option value="CAD">CAD - Canadian Dollar (C$)</option>
                <option value="INR">INR - Indian Rupee (₹)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Legal & Billing Information (only for legal entities) */}
        {formData.unitType === 'legal-entity' && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#D9480F]" />
              <h2 className="font-semibold text-[#111827]">Legal & Billing Information</h2>
            </div>
            <p className="text-sm text-[#6B7280] mb-4">
              Required for legal entities that manage their own billing and invoicing.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Legal Company Name <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.legalCompanyName}
                  onChange={(e) => setFormData({ ...formData, legalCompanyName: e.target.value })}
                  placeholder="e.g., Acme Corporation Ltd."
                  className={`w-full h-[44px] px-4 border ${
                    errors.legalCompanyName ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                  } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
                />
                {errors.legalCompanyName && (
                  <p className="mt-1 text-sm text-[#DC2626]">{errors.legalCompanyName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Billing Address <span className="text-[#DC2626]">*</span>
                </label>
                <textarea
                  value={formData.billingAddress}
                  onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                  placeholder="Full billing address"
                  rows={3}
                  className={`w-full px-4 py-3 border ${
                    errors.billingAddress ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                  } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
                />
                {errors.billingAddress && (
                  <p className="mt-1 text-sm text-[#DC2626]">{errors.billingAddress}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Tax ID / VAT / GST <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    placeholder="e.g., US-12-3456789"
                    className={`w-full h-[44px] px-4 border ${
                      errors.taxId ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                    } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
                  />
                  {errors.taxId && (
                    <p className="mt-1 text-sm text-[#DC2626]">{errors.taxId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Invoice Email <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.invoiceEmail}
                    onChange={(e) => setFormData({ ...formData, invoiceEmail: e.target.value })}
                    placeholder="billing@company.com"
                    className={`w-full h-[44px] px-4 border ${
                      errors.invoiceEmail ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                    } rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent`}
                  />
                  {errors.invoiceEmail && (
                    <p className="mt-1 text-sm text-[#DC2626]">{errors.invoiceEmail}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g., United States"
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Region / State
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="e.g., New York"
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
