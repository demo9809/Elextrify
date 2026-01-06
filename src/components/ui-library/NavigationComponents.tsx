import { Home, Users, Monitor, Settings, ChevronRight, ChevronLeft, Check, Code } from 'lucide-react';
import { CSSData } from './CSSDetailsModal';
import { SpecTable } from './SpecTable';

interface NavigationProps {
  onOpenModal: (title: string, data: CSSData) => void;
}

export function NavigationComponents({ onOpenModal }: NavigationProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[#111827] mb-2">Navigation Components</h1>
        <p className="text-[#6B7280]">
          Navigation patterns including tabs, breadcrumbs, pagination, steppers, and menu items.
        </p>
      </div>

      {/* Horizontal Tabs */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Horizontal Tabs</h3>
          <button
            onClick={() => onOpenModal('Horizontal Tabs', {
              layout: 'display: flex;\nalign-items: center;\ngap: 4px;',
              typography: 'font-family: \'Inter\', sans-serif;\nfont-size: 14px;\nfont-weight: 500;',
              spacing: 'padding: 10px 16px;',
              shape: 'border-bottom-width: 2px;\nborder-style: solid;',
              states: {
                default: 'color: #6B7280;\nborder-color: transparent;',
                hover: 'color: #111827;\nbackground-color: #F9FAFB;',
                active: 'color: #D9480F;\nborder-color: #D9480F;',
                disabled: 'color: #9CA3AF;'
              },
              classContract: '.ui-tab',
              html: '<div class="ui-tab-container"><button class="ui-tab active">Tab 1</button><button class="ui-tab">Tab 2</button></div>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
        <div className="mb-4">
          <div className="border-b border-[#E5E7EB]">
            <div className="flex gap-1">
              <button className="px-4 py-2.5 text-sm font-medium text-[#D9480F] border-b-2 border-[#D9480F] -mb-px">
                Overview
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-t-lg transition-colors">
                Analytics
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-t-lg transition-colors">
                Settings
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-[#9CA3AF] cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Padding Horizontal', value: '16px (px-4)' },
            { label: 'Padding Vertical', value: '10px (py-2.5)' },
            { label: 'Font Size', value: '14px / weight: 500' },
            { label: 'Border Bottom (Container)', value: '1px solid #E5E7EB' },
            { label: 'Active Border Bottom', value: '2px solid #D9480F' },
            { label: 'Active Text Color', value: '#D9480F' },
            { label: 'Default Text Color', value: '#6B7280' },
            { label: 'Hover Text Color', value: '#111827' },
            { label: 'Hover Background', value: '#F9FAFB' },
            { label: 'Disabled Text Color', value: '#9CA3AF' },
            { label: 'Border Radius (Top)', value: '8px (rounded-t-lg)' },
            { label: 'Gap Between Tabs', value: '4px (gap-1)' },
          ]}
          columns={3}
        />
      </section>

      {/* Pill Tabs */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Pill Tabs (Alternative Style)</h3>
          <button
            onClick={() => onOpenModal('Pill Tabs', {
              layout: 'display: inline-flex;\nalign-items: center;\ngap: 4px;',
              typography: 'font-family: \'Inter\', sans-serif;\nfont-size: 14px;\nfont-weight: 500;',
              spacing: 'padding: 8px 16px;',
              shape: 'border-radius: 6px;',
              states: {
                default: 'color: #6B7280;\nbackground-color: transparent;',
                hover: 'color: #111827;',
                active: 'color: #111827;\nbackground-color: #FFFFFF;\nbox-shadow: 0 1px 2px rgba(0,0,0,0.05);'
              },
              classContract: '.ui-pill-tab',
              html: '<div class="ui-pill-tab-container"><button class="ui-pill-tab active">Tab 1</button></div>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
        <div className="mb-4">
          <div className="inline-flex gap-1 bg-[#F9FAFB] p-1 rounded-lg">
            <button className="px-4 py-2 text-sm font-medium bg-white text-[#111827] rounded-md shadow-sm">
              Overview
            </button>
            <button className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] rounded-md transition-colors">
              Analytics
            </button>
            <button className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] rounded-md transition-colors">
              Settings
            </button>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Container Background', value: '#F9FAFB' },
            { label: 'Container Padding', value: '4px (p-1)' },
            { label: 'Container Border Radius', value: '8px' },
            { label: 'Tab Padding Horizontal', value: '16px (px-4)' },
            { label: 'Tab Padding Vertical', value: '8px (py-2)' },
            { label: 'Active Background', value: '#FFFFFF (white)' },
            { label: 'Active Text Color', value: '#111827' },
            { label: 'Active Shadow', value: '0 1px 2px rgba(0,0,0,0.05)' },
            { label: 'Tab Border Radius', value: '6px (rounded-md)' },
            { label: 'Default Text Color', value: '#6B7280' },
            { label: 'Hover Text Color', value: '#111827' },
            { label: 'Gap Between Tabs', value: '4px (gap-1)' },
          ]}
          columns={3}
        />
      </section>

      {/* Breadcrumbs */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Breadcrumbs</h3>
          <button
            onClick={() => onOpenModal('Breadcrumbs', {
              layout: 'display: flex;\nalign-items: center;\ngap: 8px;',
              typography: 'font-family: \'Inter\', sans-serif;\nfont-size: 14px;',
              spacing: 'padding: 0;',
              shape: '/* No specific shape */',
              states: {
                default: 'color: #6B7280;',
                hover: 'color: #111827;',
                active: 'color: #111827;\nfont-weight: 500;'
              },
              classContract: '.ui-breadcrumb',
              html: '<nav class="ui-breadcrumb"><a href="#">Home</a><span class="separator">/</span><span>Page</span></nav>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
        <div className="mb-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="#" className="text-[#6B7280] hover:text-[#111827] transition-colors">
              Home
            </a>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
            <a href="#" className="text-[#6B7280] hover:text-[#111827] transition-colors">
              Campaign Management
            </a>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
            <span className="text-[#111827] font-medium">Campaign Details</span>
          </nav>
        </div>

        <SpecTable
          specs={[
            { label: 'Font Size', value: '14px / weight: 400' },
            { label: 'Link Color', value: '#6B7280' },
            { label: 'Link Hover Color', value: '#111827' },
            { label: 'Current Page Color', value: '#111827' },
            { label: 'Current Page Weight', value: '500' },
            { label: 'Separator Icon', value: 'ChevronRight' },
            { label: 'Separator Size', value: '16px (w-4 h-4)' },
            { label: 'Separator Color', value: '#9CA3AF' },
            { label: 'Gap', value: '8px (gap-2)' },
          ]}
          columns={3}
        />
      </section>

      {/* Breadcrumbs with Home Icon */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Breadcrumbs - With Home Icon</h3>
          <button
            onClick={() => onOpenModal('Breadcrumbs (Icon)', {
              layout: 'display: flex;\nalign-items: center;\ngap: 8px;',
              typography: 'font-family: \'Inter\', sans-serif;\nfont-size: 14px;',
              spacing: 'padding: 0;',
              shape: '/* No specific shape */',
              states: {
                default: 'color: #6B7280;',
                hover: 'color: #111827;',
                active: 'color: #111827;\nfont-weight: 500;'
              },
              classContract: '.ui-breadcrumb-icon',
              html: '<nav class="ui-breadcrumb"><a href="#"><svg>...</svg></a><span class="separator">/</span><span>Page</span></nav>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
        <div className="mb-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="#" className="text-[#6B7280] hover:text-[#111827] transition-colors">
              <Home className="w-4 h-4" />
            </a>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
            <a href="#" className="text-[#6B7280] hover:text-[#111827] transition-colors">
              Campaigns
            </a>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
            <span className="text-[#111827] font-medium">Diwali 2025</span>
          </nav>
        </div>

        <SpecTable
          specs={[
            { label: 'Home Icon Size', value: '16px (w-4 h-4)' },
            { label: 'Icon Color', value: '#6B7280' },
            { label: 'Icon Hover Color', value: '#111827' },
          ]}
          columns={3}
        />
      </section>

      {/* Horizontal Stepper */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Horizontal Stepper</h3>
          <button
            onClick={() => onOpenModal('Horizontal Stepper', {
              layout: 'display: flex;\nalign-items: center;\njustify-content: space-between;',
              typography: 'font-family: \'Inter\', sans-serif;\nfont-size: 14px;\nfont-weight: 500;',
              spacing: '/* Child dependent */',
              shape: '/* Child dependent */',
              states: {
                completed: 'color: #16A34A;\nbackground-color: #16A34A;',
                current: 'color: #D9480F;\nbackground-color: #D9480F;',
                upcoming: 'color: #9CA3AF;\nbackground-color: #E5E7EB;'
              },
              classContract: '.ui-stepper',
              html: '<div class="ui-stepper">...</div>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {/* Step 1 - Completed */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center text-white">
                <Check className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-[#16A34A]">Campaign Setup</span>
            </div>
            <div className="flex-1 h-0.5 bg-[#16A34A] -mx-4"></div>

            {/* Step 2 - Current */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-[#D9480F] flex items-center justify-center text-white font-medium">
                2
              </div>
              <span className="text-sm font-medium text-[#D9480F]">Ad Groups</span>
            </div>
            <div className="flex-1 h-0.5 bg-[#E5E7EB] -mx-4"></div>

            {/* Step 3 - Upcoming */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] font-medium">
                3
              </div>
              <span className="text-sm font-medium text-[#9CA3AF]">Review & Launch</span>
            </div>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Circle Size', value: '40px (w-10 h-10)' },
            { label: 'Circle Border Radius', value: '50% (rounded-full)' },
            { label: 'Number/Icon Size', value: '20px (w-5 h-5)' },
            { label: 'Font Size (Number)', value: '16px / weight: 500' },
            { label: 'Label Font Size', value: '14px / weight: 500' },
            { label: 'Completed BG', value: '#16A34A (green)' },
            { label: 'Completed Text', value: '#16A34A' },
            { label: 'Current BG', value: '#D9480F (primary)' },
            { label: 'Current Text', value: '#D9480F' },
            { label: 'Upcoming BG', value: '#E5E7EB (gray)' },
            { label: 'Upcoming Text', value: '#9CA3AF' },
            { label: 'Connector Line Height', value: '2px (h-0.5)' },
            { label: 'Connector Completed', value: '#16A34A' },
            { label: 'Connector Upcoming', value: '#E5E7EB' },
            { label: 'Gap (Circle to Label)', value: '8px (gap-2)' },
          ]}
          columns={3}
        />
      </section>

      {/* Vertical Stepper */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Vertical Stepper</h3>
          <button
            onClick={() => onOpenModal('Vertical Stepper', {
              layout: 'display: flex;\nflex-direction: column;',
              typography: 'font-family: \'Inter\', sans-serif;',
              spacing: 'padding-bottom: 48px;',
              shape: '/* Child dependent */',
              states: {
                completed: 'color: #16A34A;',
                current: 'color: #D9480F;',
                upcoming: 'color: #9CA3AF;'
              },
              classContract: '.ui-stepper-vertical',
              html: '<div class="ui-stepper-vertical">...</div>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
        <div className="mb-4">
          <div className="max-w-md">
            {/* Step 1 - Completed */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center text-white flex-shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div className="w-0.5 h-16 bg-[#16A34A] my-1"></div>
              </div>
              <div className="pb-12">
                <div className="font-medium text-[#111827] mb-1">Campaign Setup</div>
                <div className="text-sm text-[#6B7280]">Define campaign details and objectives</div>
              </div>
            </div>

            {/* Step 2 - Current */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#D9480F] flex items-center justify-center text-white font-medium flex-shrink-0">
                  2
                </div>
                <div className="w-0.5 h-16 bg-[#E5E7EB] my-1"></div>
              </div>
              <div className="pb-12">
                <div className="font-medium text-[#111827] mb-1">Ad Groups</div>
                <div className="text-sm text-[#6B7280]">Create and configure ad groups</div>
              </div>
            </div>

            {/* Step 3 - Upcoming */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] font-medium flex-shrink-0">
                  3
                </div>
              </div>
              <div>
                <div className="font-medium text-[#9CA3AF] mb-1">Review & Launch</div>
                <div className="text-sm text-[#9CA3AF]">Review and launch your campaign</div>
              </div>
            </div>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Circle Size', value: '32px (w-8 h-8)' },
            { label: 'Circle Border Radius', value: '50% (rounded-full)' },
            { label: 'Icon Size', value: '16px (w-4 h-4)' },
            { label: 'Number Font Size', value: '14px / weight: 500' },
            { label: 'Title Font Size', value: '16px / weight: 500' },
            { label: 'Description Font Size', value: '14px / weight: 400' },
            { label: 'Connector Line Width', value: '2px (w-0.5)' },
            { label: 'Connector Line Height', value: '64px (h-16)' },
            { label: 'Gap (Circle to Content)', value: '16px (gap-4)' },
            { label: 'Spacing Between Steps', value: '48px (pb-12)' },
          ]}
          columns={3}
        />
      </section>

      {/* Pagination */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Pagination</h3>
          <button
            onClick={() => onOpenModal('Pagination', {
              layout: 'display: flex;\nalign-items: center;\ngap: 8px;',
              typography: 'font-family: \'Inter\', sans-serif;\nfont-size: 14px;',
              spacing: 'padding: 8px;',
              shape: 'border-radius: 8px;',
              states: {
                default: 'color: #6B7280;\nborder: 1px solid #E5E7EB;',
                active: 'background-color: #D9480F;\ncolor: white;',
                hover: 'background-color: #F9FAFB;'
              },
              classContract: '.ui-pagination',
              html: '<div class="ui-pagination"><button>1</button></div>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-[#6B7280]">
            Showing <span className="font-medium text-[#111827]">1</span> to <span className="font-medium text-[#111827]">10</span> of <span className="font-medium text-[#111827]">97</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center bg-[#D9480F] text-white rounded-lg font-medium">
              1
            </button>
            <button className="w-9 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
              2
            </button>
            <button className="w-9 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
              3
            </button>
            <span className="text-[#6B7280]">...</span>
            <button className="w-9 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
              10
            </button>
            <button className="w-9 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Button Size', value: '36px × 36px (w-9 h-9)' },
            { label: 'Button Border', value: '1px solid #E5E7EB' },
            { label: 'Button Border Radius', value: '8px' },
            { label: 'Font Size', value: '14px / weight: 500' },
            { label: 'Active BG', value: '#D9480F' },
            { label: 'Active Text', value: '#FFFFFF' },
            { label: 'Default Text', value: '#6B7280' },
            { label: 'Hover BG', value: '#F9FAFB' },
            { label: 'Gap Between Buttons', value: '8px (gap-2)' },
            { label: 'Icon Size (Arrows)', value: '16px (w-4 h-4)' },
            { label: 'Info Text Font', value: '14px / weight: 400' },
            { label: 'Info Text Color', value: '#6B7280' },
          ]}
          columns={3}
        />
      </section>

      {/* Sidebar Navigation */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Sidebar Navigation</h3>
          <button
            onClick={() => onOpenModal('Sidebar Navigation', {
              layout: 'display: flex;\nflex-direction: column;\ngap: 4px;',
              typography: 'font-family: \'Inter\', sans-serif;\nfont-size: 14px;',
              spacing: 'padding: 10px 16px;',
              shape: 'border-radius: 8px;',
              states: {
                default: 'color: #6B7280;\nbackground-color: transparent;',
                hover: 'color: #111827;\nbackground-color: #F9FAFB;',
                active: 'color: #D9480F;\nbackground-color: #FEF2F2;\nfont-weight: 500;'
              },
              classContract: '.ui-sidebar-nav',
              html: '<nav class="ui-sidebar-nav"><a href="#">Link</a></nav>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg max-w-xs mb-4">
          <nav className="p-4 space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 bg-[#FEF2F2] text-[#D9480F] rounded-lg font-medium">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827] rounded-lg transition-colors">
              <Monitor className="w-5 h-5" />
              <span>Kiosks</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827] rounded-lg transition-colors">
              <Users className="w-5 h-5" />
              <span>Clients</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827] rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </nav>
        </div>

        <SpecTable
          specs={[
            { label: 'Container Padding', value: '16px (p-4)' },
            { label: 'Item Padding Horizontal', value: '16px (px-4)' },
            { label: 'Item Padding Vertical', value: '10px (py-2.5)' },
            { label: 'Item Border Radius', value: '8px' },
            { label: 'Icon Size', value: '20px (w-5 h-5)' },
            { label: 'Gap (Icon to Text)', value: '12px (gap-3)' },
            { label: 'Font Size', value: '14px / weight: 400' },
            { label: 'Active Background', value: '#FEF2F2' },
            { label: 'Active Text Color', value: '#D9480F' },
            { label: 'Active Font Weight', value: '500' },
            { label: 'Default Text Color', value: '#6B7280' },
            { label: 'Hover Background', value: '#F9FAFB' },
            { label: 'Hover Text Color', value: '#111827' },
            { label: 'Spacing Between Items', value: '4px (space-y-1)' },
          ]}
          columns={3}
        />
      </section>

      {/* Sidebar Navigation with Badges */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Sidebar Navigation - With Badges</h3>
          <button
            onClick={() => onOpenModal('Sidebar Navigation (Badges)', {
              layout: 'display: flex;\nflex-direction: column;\ngap: 4px;',
              typography: 'font-family: \'Inter\', sans-serif;\nfont-size: 14px;',
              spacing: 'padding: 10px 16px;',
              shape: 'border-radius: 8px;',
              states: {
                default: 'color: #6B7280;\nbackground-color: transparent;',
                hover: 'color: #111827;\nbackground-color: #F9FAFB;',
                active: 'color: #D9480F;\nbackground-color: #FEF2F2;\nfont-weight: 500;'
              },
              classContract: '.ui-sidebar-nav-badge',
              html: '<nav class="ui-sidebar-nav"><a href="#">Link <span class="badge">4</span></a></nav>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg max-w-xs mb-4">
          <nav className="p-4 space-y-1">
            <a href="#" className="flex items-center justify-between px-4 py-2.5 bg-[#FEF2F2] text-[#D9480F] rounded-lg font-medium">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </div>
            </a>
            <a href="#" className="flex items-center justify-between px-4 py-2.5 text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827] rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5" />
                <span>Kiosks</span>
              </div>
              <span className="px-2 py-0.5 bg-[#ECFDF5] text-[#047857] text-xs font-medium rounded-full">
                45
              </span>
            </a>
            <a href="#" className="flex items-center justify-between px-4 py-2.5 text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827] rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span>Clients</span>
              </div>
              <span className="px-2 py-0.5 bg-[#FEE2E2] text-[#DC2626] text-xs font-medium rounded-full">
                3
              </span>
            </a>
          </nav>
        </div>

        <SpecTable
          specs={[
            { label: 'Badge Padding Horizontal', value: '8px (px-2)' },
            { label: 'Badge Padding Vertical', value: '2px (py-0.5)' },
            { label: 'Badge Font Size', value: '12px / weight: 500' },
            { label: 'Badge Border Radius', value: '9999px (pill)' },
            { label: 'Badge Min Width', value: 'auto (content-based)' },
          ]}
          columns={3}
        />
      </section>

      {/* Top Navigation Bar */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Top Navigation Bar</h3>
          <button
            onClick={() => onOpenModal('Top Navigation', {
              layout: 'display: flex;\nalign-items: center;\njustify-content: space-between;',
              typography: 'font-family: \'Inter\', sans-serif;',
              spacing: 'padding: 16px 24px;',
              shape: 'border-bottom-width: 1px;\nborder-style: solid;',
              states: {
                default: 'background-color: #FFFFFF;\nborder-color: #E5E7EB;'
              },
              classContract: '.ui-top-nav',
              html: '<header class="ui-top-nav">...</header>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-lg mb-4">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-8">
              <div className="text-xl font-semibold text-[#111827]">DOOH Platform</div>
              <nav className="flex items-center gap-1">
                <a href="#" className="px-4 py-2 text-sm font-medium text-[#D9480F] bg-[#FEF2F2] rounded-lg">
                  Dashboard
                </a>
                <a href="#" className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors">
                  Campaigns
                </a>
                <a href="#" className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors">
                  Analytics
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB] rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Bar Height', value: 'auto (py-4)' },
            { label: 'Bar Padding Horizontal', value: '24px (px-6)' },
            { label: 'Bar Padding Vertical', value: '16px (py-4)' },
            { label: 'Border Bottom', value: '1px solid #E5E7EB' },
            { label: 'Logo Font Size', value: '20px / weight: 600' },
            { label: 'Nav Item Padding', value: '8px horizontal, 8px vertical' },
            { label: 'Nav Item Font Size', value: '14px / weight: 500' },
            { label: 'Nav Item Border Radius', value: '8px' },
            { label: 'Active Background', value: '#FEF2F2' },
            { label: 'Active Text Color', value: '#D9480F' },
            { label: 'Hover Background', value: '#F9FAFB' },
            { label: 'Gap Between Nav Items', value: '4px (gap-1)' },
            { label: 'Gap (Logo to Nav)', value: '32px (gap-8)' },
          ]}
          columns={3}
        />
      </section>

      {/* Dropdown Menu */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Dropdown Menu</h3>
          <button
            onClick={() => onOpenModal('Dropdown Menu', {
              layout: 'position: absolute;\ndisplay: flex;\nflex-direction: column;',
              typography: 'font-family: \'Inter\', sans-serif;\nfont-size: 14px;',
              spacing: 'padding: 8px 16px;',
              shape: 'border-width: 1px;\nborder-style: solid;\nborder-radius: 8px;',
              states: {
                default: 'background-color: #FFFFFF;\nborder-color: #E5E7EB;\ncolor: #111827;',
                hover: 'background-color: #F9FAFB;'
              },
              classContract: '.ui-dropdown',
              html: '<div class="ui-dropdown"><a href="#">Item</a></div>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
        <div className="inline-block mb-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-lg min-w-[200px]">
            <div className="py-1">
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors">
                <Users className="w-4 h-4 text-[#6B7280]" />
                <span>Profile</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors">
                <Settings className="w-4 h-4 text-[#6B7280]" />
                <span>Settings</span>
              </a>
              <div className="border-t border-[#E5E7EB] my-1"></div>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-[#DC2626] hover:bg-[#FEE2E2] transition-colors">
                <span>Sign Out</span>
              </a>
            </div>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Min Width', value: '200px' },
            { label: 'Border', value: '1px solid #E5E7EB' },
            { label: 'Border Radius', value: '8px' },
            { label: 'Shadow', value: '0 10px 15px -3px rgba(0,0,0,0.1)' },
            { label: 'Container Padding', value: '4px vertical (py-1)' },
            { label: 'Item Padding Horizontal', value: '16px (px-4)' },
            { label: 'Item Padding Vertical', value: '8px (py-2)' },
            { label: 'Item Font Size', value: '14px / weight: 400' },
            { label: 'Icon Size', value: '16px (w-4 h-4)' },
            { label: 'Icon Color', value: '#6B7280' },
            { label: 'Hover Background', value: '#F9FAFB' },
            { label: 'Danger Text Color', value: '#DC2626' },
            { label: 'Danger Hover BG', value: '#FEE2E2' },
            { label: 'Divider', value: '1px solid #E5E7EB' },
            { label: 'Divider Margin', value: '4px vertical (my-1)' },
          ]}
          columns={3}
        />
      </section>
    </div>
  );
}
