import { useState } from 'react';
import {
  Palette,
  Type,
  Layout,
  Square,
  Circle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Search,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  Upload,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  Loader,
  Copy,
  BarChart3,
  TrendingUp,
  Home,
  Monitor,
  Users,
  Settings,
  Code,
} from 'lucide-react';
import { SpecTable } from './ui-library/SpecTable';
import { InputsExtended } from './ui-library/InputsExtended';
import { DataDisplayComponents } from './ui-library/DataDisplayComponents';
import { FeedbackComponents } from './ui-library/FeedbackComponents';
import { NavigationComponents } from './ui-library/NavigationComponents';

export default function UILibrary() {
  const [activeSection, setActiveSection] = useState('colors');

  // Navigation sections
  const sections = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing & Layout', icon: Layout },
    { id: 'buttons', label: 'Buttons', icon: Square },
    { id: 'inputs', label: 'Form Inputs', icon: Edit2 },
    { id: 'navigation', label: 'Navigation', icon: Home },
    { id: 'data-display', label: 'Data Display', icon: BarChart3 },
    { id: 'feedback', label: 'Feedback & Overlays', icon: AlertCircle },
    { id: 'icons', label: 'Icons', icon: Circle },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
      {/* Left Navigation */}
      <div className="w-64 bg-white border-r border-[#E5E7EB] overflow-y-auto">
        <div className="p-6 border-b border-[#E5E7EB]">
          <h2 className="text-[#111827] mb-1">UI Component Library</h2>
          <p className="text-sm text-[#6B7280]">Source of Truth for Dev Team</p>
        </div>
        <nav className="p-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left mb-1 ${
                  activeSection === section.id
                    ? 'bg-[#FEF2F2] text-[#D9480F] font-medium'
                    : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{section.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8">
          {/* COLORS SECTION */}
          {activeSection === 'colors' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[#111827] mb-2">Color Palette</h1>
                <p className="text-[#6B7280]">
                  Design tokens for the entire application. Use these color values in your Angular styles.
                </p>
              </div>

              {/* Brand Colors */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Brand Colors</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="w-full h-24 bg-[#D9480F] rounded-lg mb-3 flex items-center justify-center text-white font-medium">
                      Primary
                    </div>
                    <div className="text-sm font-medium text-[#111827] mb-1">Primary</div>
                    <div className="text-xs text-[#6B7280] font-mono">#D9480F</div>
                    <div className="text-xs text-[#6B7280] font-mono">$color-primary</div>
                  </div>
                  <div>
                    <div className="w-full h-24 bg-[#64748B] rounded-lg mb-3 flex items-center justify-center text-white font-medium">
                      Secondary
                    </div>
                    <div className="text-sm font-medium text-[#111827] mb-1">Secondary</div>
                    <div className="text-xs text-[#6B7280] font-mono">#64748B</div>
                    <div className="text-xs text-[#6B7280] font-mono">$color-secondary</div>
                  </div>
                  <div>
                    <div className="w-full h-24 bg-[#3B82F6] rounded-lg mb-3 flex items-center justify-center text-white font-medium">
                      Accent
                    </div>
                    <div className="text-sm font-medium text-[#111827] mb-1">Accent</div>
                    <div className="text-xs text-[#6B7280] font-mono">#3B82F6</div>
                    <div className="text-xs text-[#6B7280] font-mono">$color-accent</div>
                  </div>
                </div>
              </section>

              {/* Semantic Colors */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Semantic Colors</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="w-full h-24 bg-[#16A34A] rounded-lg mb-3 flex items-center justify-center text-white font-medium">
                      Success
                    </div>
                    <div className="text-sm font-medium text-[#111827] mb-1">Success</div>
                    <div className="text-xs text-[#6B7280] font-mono">#16A34A</div>
                    <div className="text-xs text-[#6B7280] font-mono">$color-success-500</div>
                  </div>
                  <div>
                    <div className="w-full h-24 bg-[#F59E0B] rounded-lg mb-3 flex items-center justify-center text-white font-medium">
                      Warning
                    </div>
                    <div className="text-sm font-medium text-[#111827] mb-1">Warning</div>
                    <div className="text-xs text-[#6B7280] font-mono">#F59E0B</div>
                    <div className="text-xs text-[#6B7280] font-mono">$color-warning-500</div>
                  </div>
                  <div>
                    <div className="w-full h-24 bg-[#DC2626] rounded-lg mb-3 flex items-center justify-center text-white font-medium">
                      Error
                    </div>
                    <div className="text-sm font-medium text-[#111827] mb-1">Error</div>
                    <div className="text-xs text-[#6B7280] font-mono">#DC2626</div>
                    <div className="text-xs text-[#6B7280] font-mono">$color-error-500</div>
                  </div>
                  <div>
                    <div className="w-full h-24 bg-[#3B82F6] rounded-lg mb-3 flex items-center justify-center text-white font-medium">
                      Info
                    </div>
                    <div className="text-sm font-medium text-[#111827] mb-1">Info</div>
                    <div className="text-xs text-[#6B7280] font-mono">#3B82F6</div>
                    <div className="text-xs text-[#6B7280] font-mono">$color-info-500</div>
                  </div>
                </div>
              </section>

              {/* Neutral Colors */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Neutral Colors</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4">
                    <div>
                      <div className="w-full h-20 bg-[#111827] rounded-lg mb-2"></div>
                      <div className="text-xs font-mono text-[#6B7280]">#111827</div>
                      <div className="text-xs text-[#6B7280]">$gray-900</div>
                    </div>
                    <div>
                      <div className="w-full h-20 bg-[#374151] rounded-lg mb-2"></div>
                      <div className="text-xs font-mono text-[#6B7280]">#374151</div>
                      <div className="text-xs text-[#6B7280]">$gray-700</div>
                    </div>
                    <div>
                      <div className="w-full h-20 bg-[#6B7280] rounded-lg mb-2"></div>
                      <div className="text-xs font-mono text-[#6B7280]">#6B7280</div>
                      <div className="text-xs text-[#6B7280]">$gray-500</div>
                    </div>
                    <div>
                      <div className="w-full h-20 bg-[#9CA3AF] rounded-lg mb-2"></div>
                      <div className="text-xs font-mono text-[#6B7280]">#9CA3AF</div>
                      <div className="text-xs text-[#6B7280]">$gray-400</div>
                    </div>
                    <div>
                      <div className="w-full h-20 bg-[#E5E7EB] rounded-lg mb-2 border border-[#E5E7EB]"></div>
                      <div className="text-xs font-mono text-[#6B7280]">#E5E7EB</div>
                      <div className="text-xs text-[#6B7280]">$gray-200</div>
                    </div>
                    <div>
                      <div className="w-full h-20 bg-[#F9FAFB] rounded-lg mb-2 border border-[#E5E7EB]"></div>
                      <div className="text-xs font-mono text-[#6B7280]">#F9FAFB</div>
                      <div className="text-xs text-[#6B7280]">$gray-50</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* TYPOGRAPHY SECTION */}
          {activeSection === 'typography' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[#111827] mb-2">Typography</h1>
                <p className="text-[#6B7280]">
                  Font families, sizes, weights, and line heights used across the application.
                </p>
              </div>

              {/* Font Family */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Font Family</h3>
                <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                  <div className="text-lg mb-2" style={{ fontFamily: 'Inter' }}>
                    Inter - The quick brown fox jumps over the lazy dog
                  </div>
                  <div className="text-sm text-[#6B7280] font-mono">font-family: 'Inter', sans-serif;</div>
                  <div className="text-sm text-[#6B7280] font-mono">$font-family-base</div>
                </div>
              </section>

              {/* Headings */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Headings</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-8 p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <h1 className="flex-1">Heading 1</h1>
                    <div className="text-sm text-[#6B7280] text-right">
                      <div className="font-mono">32px / 600</div>
                      <div className="font-mono">$font-size-h1</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <h2 className="flex-1">Heading 2</h2>
                    <div className="text-sm text-[#6B7280] text-right">
                      <div className="font-mono">24px / 600</div>
                      <div className="font-mono">$font-size-h2</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <h3 className="flex-1">Heading 3</h3>
                    <div className="text-sm text-[#6B7280] text-right">
                      <div className="font-mono">20px / 600</div>
                      <div className="font-mono">$font-size-h3</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <h4 className="flex-1">Heading 4</h4>
                    <div className="text-sm text-[#6B7280] text-right">
                      <div className="font-mono">18px / 600</div>
                      <div className="font-mono">$font-size-h4</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Body Text */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Body Text</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <div className="mb-2">Body 1 - Regular paragraph text for main content</div>
                    <div className="text-sm text-[#6B7280] font-mono">16px / 400 / line-height: 1.5</div>
                    <div className="text-sm text-[#6B7280] font-mono">$font-size-base</div>
                  </div>
                  <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <div className="text-sm mb-2">Body 2 - Small text for secondary content</div>
                    <div className="text-sm text-[#6B7280] font-mono">14px / 400 / line-height: 1.5</div>
                    <div className="text-sm text-[#6B7280] font-mono">$font-size-small</div>
                  </div>
                  <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <div className="text-xs mb-2">Caption - Very small text for labels and captions</div>
                    <div className="text-sm text-[#6B7280] font-mono">12px / 400 / line-height: 1.5</div>
                    <div className="text-sm text-[#6B7280] font-mono">$font-size-caption</div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* SPACING SECTION */}
          {activeSection === 'spacing' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[#111827] mb-2">Spacing & Layout</h1>
                <p className="text-[#6B7280]">
                  Grid system, spacing scale, border radius, and elevation values.
                </p>
              </div>

              {/* Spacing Scale */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Spacing Scale (8px Grid)</h3>
                <div className="space-y-4">
                  {[
                    { value: '4px', variable: '$spacing-1', px: '1px' },
                    { value: '8px', variable: '$spacing-2', px: '2px' },
                    { value: '12px', variable: '$spacing-3', px: '3px' },
                    { value: '16px', variable: '$spacing-4', px: '4px' },
                    { value: '24px', variable: '$spacing-6', px: '6px' },
                    { value: '32px', variable: '$spacing-8', px: '8px' },
                    { value: '48px', variable: '$spacing-12', px: '12px' },
                    { value: '64px', variable: '$spacing-16', px: '16px' },
                  ].map((item) => (
                    <div key={item.value} className="flex items-center gap-4">
                      <div className="w-32 text-sm text-[#6B7280] font-mono">{item.value}</div>
                      <div className="h-8 bg-[#D9480F] rounded" style={{ width: item.value }}></div>
                      <div className="text-sm text-[#6B7280] font-mono">{item.variable}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Border Radius */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Border Radius</h3>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { value: '4px', name: 'Small', variable: '$radius-sm' },
                    { value: '6px', name: 'Medium', variable: '$radius-md' },
                    { value: '8px', name: 'Large', variable: '$radius-lg' },
                    { value: '999px', name: 'Pill', variable: '$radius-pill' },
                  ].map((item) => (
                    <div key={item.name} className="text-center">
                      <div
                        className="w-full h-20 bg-[#D9480F] mb-2 mx-auto"
                        style={{ borderRadius: item.value }}
                      ></div>
                      <div className="text-sm font-medium text-[#111827]">{item.name}</div>
                      <div className="text-xs text-[#6B7280] font-mono">{item.value}</div>
                      <div className="text-xs text-[#6B7280] font-mono">{item.variable}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Shadows */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Elevation / Shadows</h3>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { name: 'Small', class: 'shadow-sm', variable: '$shadow-sm', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
                    { name: 'Medium', class: 'shadow-md', variable: '$shadow-md', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
                    { name: 'Large', class: 'shadow-lg', variable: '$shadow-lg', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
                  ].map((item) => (
                    <div key={item.name}>
                      <div className={`w-full h-24 bg-white rounded-lg ${item.class} mb-2`}></div>
                      <div className="text-sm font-medium text-[#111827]">{item.name}</div>
                      <div className="text-xs text-[#6B7280] font-mono">{item.variable}</div>
                      <div className="text-xs text-[#6B7280] mt-1">{item.value}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* BUTTONS SECTION - Part 1 (due to length, splitting into manageable chunks) */}
          {activeSection === 'buttons' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[#111827] mb-2">Buttons</h1>
                <p className="text-[#6B7280]">
                  Button variants, sizes, and states with complete specifications for Angular implementation.
                </p>
              </div>

              {/* Primary Button */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Primary Button</h3>
                <div className="flex items-center gap-4 mb-4">
                  <button className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13D0C] transition-colors">
                    Primary Button
                  </button>
                  <button className="h-11 px-6 bg-[#C13D0C] text-white rounded-lg">
                    Hover State
                  </button>
                  <button className="h-11 px-6 bg-[#E5E7EB] text-[#9CA3AF] rounded-lg cursor-not-allowed">
                    Disabled
                  </button>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Height', value: '44px (h-11)' },
                    { label: 'Padding Left/Right', value: '24px (px-6)' },
                    { label: 'Border Radius', value: '8px' },
                    { label: 'Font Size', value: '16px / weight: 600' },
                    { label: 'Background (Default)', value: '#D9480F' },
                    { label: 'Background (Hover)', value: '#C13D0C' },
                    { label: 'Background (Disabled)', value: '#E5E7EB' },
                    { label: 'Text Color', value: '#FFFFFF (white)' },
                    { label: 'Text Color (Disabled)', value: '#9CA3AF' },
                    { label: 'Transition', value: 'all 200ms ease' },
                  ]}
                  columns={3}
                />
              </section>

              {/* Secondary Button */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Secondary Button (Outline)</h3>
                <div className="flex items-center gap-4 mb-4">
                  <button className="h-11 px-6 border border-[#E5E7EB] text-[#374151] rounded-lg hover:bg-[#F9FAFB] transition-colors">
                    Secondary Button
                  </button>
                  <button className="h-11 px-6 border border-[#E5E7EB] bg-[#F9FAFB] text-[#374151] rounded-lg">
                    Hover State
                  </button>
                  <button className="h-11 px-6 border border-[#E5E7EB] text-[#9CA3AF] rounded-lg cursor-not-allowed">
                    Disabled
                  </button>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Height', value: '44px (h-11)' },
                    { label: 'Padding Left/Right', value: '24px (px-6)' },
                    { label: 'Border', value: '1px solid #E5E7EB' },
                    { label: 'Border Radius', value: '8px' },
                    { label: 'Font Size', value: '16px / weight: 600' },
                    { label: 'Background (Default)', value: 'transparent' },
                    { label: 'Background (Hover)', value: '#F9FAFB' },
                    { label: 'Text Color (Default)', value: '#374151' },
                    { label: 'Text Color (Disabled)', value: '#9CA3AF' },
                    { label: 'Transition', value: 'all 200ms ease' },
                  ]}
                  columns={3}
                />
              </section>

              {/* Ghost Button */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Ghost Button (Text Only)</h3>
                <div className="flex items-center gap-4 mb-4">
                  <button className="h-11 px-6 text-[#D9480F] rounded-lg hover:bg-[#FEF2F2] transition-colors">
                    Ghost Button
                  </button>
                  <button className="h-11 px-6 text-[#D9480F] bg-[#FEF2F2] rounded-lg">
                    Hover State
                  </button>
                  <button className="h-11 px-6 text-[#9CA3AF] rounded-lg cursor-not-allowed">
                    Disabled
                  </button>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Height', value: '44px (h-11)' },
                    { label: 'Padding Left/Right', value: '24px (px-6)' },
                    { label: 'Border', value: 'none' },
                    { label: 'Border Radius', value: '8px' },
                    { label: 'Font Size', value: '16px / weight: 600' },
                    { label: 'Background (Default)', value: 'transparent' },
                    { label: 'Background (Hover)', value: '#FEF2F2' },
                    { label: 'Text Color (Default)', value: '#D9480F' },
                    { label: 'Text Color (Disabled)', value: '#9CA3AF' },
                    { label: 'Transition', value: 'all 200ms ease' },
                  ]}
                  columns={3}
                />
              </section>

              {/* Danger Button */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Danger Button</h3>
                <div className="flex items-center gap-4 mb-4">
                  <button className="h-11 px-6 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition-colors">
                    Danger Button
                  </button>
                  <button className="h-11 px-6 bg-[#B91C1C] text-white rounded-lg">
                    Hover State
                  </button>
                  <button className="h-11 px-6 bg-[#E5E7EB] text-[#9CA3AF] rounded-lg cursor-not-allowed">
                    Disabled
                  </button>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Height', value: '44px (h-11)' },
                    { label: 'Padding Left/Right', value: '24px (px-6)' },
                    { label: 'Border Radius', value: '8px' },
                    { label: 'Font Size', value: '16px / weight: 600' },
                    { label: 'Background (Default)', value: '#DC2626' },
                    { label: 'Background (Hover)', value: '#B91C1C' },
                    { label: 'Background (Disabled)', value: '#E5E7EB' },
                    { label: 'Text Color', value: '#FFFFFF (white)' },
                    { label: 'Text Color (Disabled)', value: '#9CA3AF' },
                    { label: 'Transition', value: 'all 200ms ease' },
                  ]}
                  columns={3}
                />
              </section>

              {/* Button Sizes */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Button Sizes</h3>
                <div className="flex items-center gap-4 mb-4">
                  <button className="h-9 px-4 bg-[#D9480F] text-white rounded-lg text-sm">
                    Small
                  </button>
                  <button className="h-11 px-6 bg-[#D9480F] text-white rounded-lg">
                    Medium (Default)
                  </button>
                  <button className="h-12 px-8 bg-[#D9480F] text-white rounded-lg">
                    Large
                  </button>
                </div>

                <div className="bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] p-4">
                  <div className="font-medium text-[#111827] mb-3">Specifications:</div>
                  <div className="grid grid-cols-3 gap-8 text-sm">
                    <div>
                      <div className="text-[#6B7280] mb-2 font-medium">Small</div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">Height:</span>
                          <span className="font-mono text-[#111827]">36px (h-9)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">Padding:</span>
                          <span className="font-mono text-[#111827]">16px (px-4)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">Font:</span>
                          <span className="font-mono text-[#111827]">14px</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] mb-2 font-medium">Medium</div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">Height:</span>
                          <span className="font-mono text-[#111827]">44px (h-11)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">Padding:</span>
                          <span className="font-mono text-[#111827]">24px (px-6)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">Font:</span>
                          <span className="font-mono text-[#111827]">16px</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] mb-2 font-medium">Large</div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">Height:</span>
                          <span className="font-mono text-[#111827]">48px (h-12)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">Padding:</span>
                          <span className="font-mono text-[#111827]">32px (px-8)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B7280]">Font:</span>
                          <span className="font-mono text-[#111827]">16px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Icon Buttons */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Icon Buttons</h3>
                <div className="flex items-center gap-4 mb-4">
                  <button className="w-11 h-11 flex items-center justify-center bg-[#D9480F] text-white rounded-lg hover:bg-[#C13D0C] transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button className="w-11 h-11 flex items-center justify-center border border-[#E5E7EB] text-[#374151] rounded-lg hover:bg-[#F9FAFB] transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="w-11 h-11 flex items-center justify-center text-[#D9480F] rounded-lg hover:bg-[#FEF2F2] transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Width', value: '44px (w-11)' },
                    { label: 'Height', value: '44px (h-11)' },
                    { label: 'Icon Size', value: '20px (w-5 h-5)' },
                    { label: 'Border Radius', value: '8px' },
                    { label: 'Display', value: 'flex' },
                    { label: 'Align Items', value: 'center' },
                    { label: 'Justify Content', value: 'center' },
                  ]}
                  columns={3}
                />
              </section>
            </div>
          )}

          {/* Continuing with INPUTS SECTION in next part due to size constraints */}
          {activeSection === 'inputs' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[#111827] mb-2">Form Inputs</h1>
                <p className="text-[#6B7280]">
                  Text fields, selects, date pickers, and other form controls with complete specifications.
                </p>
              </div>

              {/* Text Input */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Text Input</h3>
                <div className="space-y-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Default State
                    </label>
                    <input
                      type="text"
                      placeholder="Enter text..."
                      className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Error State
                    </label>
                    <input
                      type="text"
                      placeholder="Invalid input"
                      className="w-full h-12 px-4 border-2 border-[#DC2626] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#DC2626]/20 outline-none"
                    />
                    <p className="text-sm text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      This field is required
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Disabled State
                    </label>
                    <input
                      type="text"
                      placeholder="Disabled"
                      disabled
                      className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] bg-[#F9FAFB] cursor-not-allowed"
                    />
                  </div>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Height', value: '48px (h-12)' },
                    { label: 'Padding Left/Right', value: '16px (px-4)' },
                    { label: 'Border (Default)', value: '1px solid #E5E7EB' },
                    { label: 'Border (Focus)', value: '1px solid #D9480F' },
                    { label: 'Border (Error)', value: '2px solid #DC2626' },
                    { label: 'Border Radius', value: '8px' },
                    { label: 'Font Size', value: '16px / weight: 400' },
                    { label: 'Text Color', value: '#111827' },
                    { label: 'Placeholder Color', value: '#9CA3AF' },
                    { label: 'Background (Disabled)', value: '#F9FAFB' },
                    { label: 'Focus Ring', value: '2px #D9480F/20%' },
                  ]}
                  columns={3}
                />
              </section>

              {/* Search Input with Icon */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Search Input (Icon Left)</h3>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full h-12 pl-11 pr-4 border border-[#E5E7EB] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none"
                  />
                </div>

                <SpecTable
                  specs={[
                    { label: 'Height', value: '48px (h-12)' },
                    { label: 'Icon Left', value: '12px' },
                    { label: 'Padding Left', value: '44px (pl-11)' },
                    { label: 'Padding Right', value: '16px (pr-4)' },
                    { label: 'Icon Size', value: '20px (size-5)' },
                    { label: 'Icon Color', value: '#9CA3AF' },
                    { label: 'Border Radius', value: '8px' },
                    { label: 'Font Size', value: '16px / weight: 400' },
                  ]}
                  columns={4}
                />
              </section>

              {/* Select Dropdown */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Select Dropdown</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Single Select
                  </label>
                  <select className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none bg-white">
                    <option>Select option...</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Height', value: '48px (h-12)' },
                    { label: 'Padding Left/Right', value: '16px (px-4)' },
                    { label: 'Border', value: '1px solid #E5E7EB' },
                    { label: 'Border Radius', value: '8px' },
                    { label: 'Font Size', value: '16px / weight: 400' },
                    { label: 'Background', value: '#FFFFFF (white)' },
                    { label: 'Text Color', value: '#111827' },
                  ]}
                  columns={3}
                />
              </section>

              {/* Date & Time Pickers */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Date & Time Pickers</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Date Picker
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Time Picker
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg text-[#111827] focus:ring-2 focus:ring-[#D9480F]/20 focus:border-[#D9480F] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Height', value: '48px (h-12)' },
                    { label: 'Padding', value: '16px (px-4)' },
                    { label: 'Border', value: '1px solid #E5E7EB' },
                    { label: 'Border Radius', value: '8px' },
                    { label: 'Icon Position', value: 'right: 12px' },
                  ]}
                  columns={3}
                />
              </section>

              {/* Checkboxes & Radios */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Checkboxes & Radio Buttons</h3>
                <div className="grid grid-cols-2 gap-8 mb-4">
                  <div>
                    <div className="text-sm font-medium text-[#6B7280] mb-3">Checkboxes</div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked
                          readOnly
                          className="w-5 h-5 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]/20"
                        />
                        <span className="text-sm text-[#111827]">Selected</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]/20"
                        />
                        <span className="text-sm text-[#111827]">Unselected</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#6B7280] mb-3">Radio Buttons</div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="radio-example"
                          checked
                          readOnly
                          className="w-5 h-5 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                        />
                        <span className="text-sm text-[#111827]">Selected</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="radio-example"
                          className="w-5 h-5 text-[#D9480F] border-[#E5E7EB] focus:ring-2 focus:ring-[#D9480F]/20"
                        />
                        <span className="text-sm text-[#111827]">Unselected</span>
                      </label>
                    </div>
                  </div>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Size', value: '20px (w-5 h-5)' },
                    { label: 'Border', value: '1px solid #E5E7EB' },
                    { label: 'Checked Color', value: '#D9480F' },
                    { label: 'Border Radius (Checkbox)', value: '4px' },
                    { label: 'Border Radius (Radio)', value: '50%' },
                    { label: 'Focus Ring', value: '2px #D9480F/20%' },
                  ]}
                  columns={3}
                />
              </section>

              {/* Toggle Switch */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Toggle Switch</h3>
                <div className="flex items-center gap-8 mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative inline-block w-11 h-6">
                      <input type="checkbox" className="sr-only peer" checked readOnly />
                      <div className="w-11 h-6 bg-[#D9480F] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#D9480F]/20"></div>
                      <div className="absolute left-[22px] top-[2px] bg-white w-5 h-5 rounded-full transition-all"></div>
                    </div>
                    <span className="text-sm text-[#111827]">On</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative inline-block w-11 h-6">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#E5E7EB] rounded-full peer peer-focus:ring-2 peer-focus:ring-[#D9480F]/20"></div>
                      <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition-all"></div>
                    </div>
                    <span className="text-sm text-[#111827]">Off</span>
                  </label>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Track Width', value: '44px (w-11)' },
                    { label: 'Track Height', value: '24px (h-6)' },
                    { label: 'Thumb Size', value: '20px (w-5 h-5)' },
                    { label: 'Thumb Position (Off)', value: 'left: 2px' },
                    { label: 'Thumb Position (On)', value: 'left: 22px' },
                    { label: 'Background (On)', value: '#D9480F' },
                    { label: 'Background (Off)', value: '#E5E7EB' },
                    { label: 'Thumb Color', value: '#FFFFFF (white)' },
                    { label: 'Border Radius', value: '9999px' },
                    { label: 'Transition', value: 'all 200ms ease' },
                  ]}
                  columns={3}
                />
              </section>

              {/* Extended Input Components */}
              <InputsExtended />
            </div>
          )}

          {/* Continue with other sections... (truncating due to length) */}
          {activeSection === 'navigation' && (
            <NavigationComponents />
          )}

          {activeSection === 'data-display' && (
            <DataDisplayComponents />
          )}

          {activeSection === 'data-display-old' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[#111827] mb-2">Data Display Components</h1>
                <p className="text-[#6B7280]">
                  Components for displaying data including tables, cards, badges, and stat widgets.
                </p>
              </div>

              {/* Status Badges */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Status Badges</h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#ECFDF5] text-[#047857] text-sm font-medium rounded-full">
                    Live
                  </span>
                  <span className="px-3 py-1 bg-[#F3F4F6] text-[#6B7280] text-sm font-medium rounded-full">
                    Offline
                  </span>
                  <span className="px-3 py-1 bg-[#FEE2E2] text-[#DC2626] text-sm font-medium rounded-full">
                    Error
                  </span>
                  <span className="px-3 py-1 bg-[#FEF3C7] text-[#F59E0B] text-sm font-medium rounded-full">
                    Maintenance
                  </span>
                  <span className="px-3 py-1 bg-[#EFF6FF] text-[#3B82F6] text-sm font-medium rounded-full">
                    Info
                  </span>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Padding Vertical', value: '4px (py-1)' },
                    { label: 'Padding Horizontal', value: '12px (px-3)' },
                    { label: 'Font Size', value: '14px / weight: 500' },
                    { label: 'Border Radius', value: '9999px (pill)' },
                    { label: 'Success BG', value: '#ECFDF5' },
                    { label: 'Success Text', value: '#047857' },
                    { label: 'Error BG', value: '#FEE2E2' },
                    { label: 'Error Text', value: '#DC2626' },
                    { label: 'Warning BG', value: '#FEF3C7' },
                    { label: 'Warning Text', value: '#F59E0B' },
                  ]}
                  columns={3}
                />
              </section>

              {/* Implementation note */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[#1E40AF] mb-1">Developer Note</div>
                    <div className="text-sm text-[#1E3A8A]">
                      Additional data display components (Tables, Cards, Stats Widgets) follow similar specification patterns. Refer to the existing implementations or contact the design team for detailed specs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'feedback' && (
            <FeedbackComponents />
          )}

          {activeSection === 'feedback-old' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[#111827] mb-2">Feedback & Overlays</h1>
                <p className="text-[#6B7280]">
                  Components for user feedback including toasts, modals, loaders, and empty states.
                </p>
              </div>

              {/* Toast Notifications */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Toast Notifications</h3>
                <div className="space-y-4 max-w-md mb-4">
                  <div className="flex items-start gap-3 p-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg">
                    <CheckCircle className="w-5 h-5 text-[#047857] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#047857] mb-1">Success</div>
                      <div className="text-sm text-[#065F46]">Your changes have been saved successfully!</div>
                    </div>
                    <button className="text-[#047857] hover:text-[#065F46]">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-[#FEE2E2] border border-[#FECACA] rounded-lg">
                    <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#DC2626] mb-1">Error</div>
                      <div className="text-sm text-[#991B1B]">Something went wrong. Please try again.</div>
                    </div>
                    <button className="text-[#DC2626] hover:text-[#991B1B]">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Max Width', value: '448px' },
                    { label: 'Padding', value: '16px (p-4)' },
                    { label: 'Border Radius', value: '8px' },
                    { label: 'Icon Size', value: '20px (w-5 h-5)' },
                    { label: 'Gap', value: '12px (gap-3)' },
                    { label: 'Success BG', value: '#ECFDF5' },
                    { label: 'Success Border', value: '1px solid #A7F3D0' },
                    { label: 'Error BG', value: '#FEE2E2' },
                    { label: 'Error Border', value: '1px solid #FECACA' },
                    { label: 'Animation', value: 'slide-in from right' },
                    { label: 'Duration', value: '4000ms auto-dismiss' },
                  ]}
                  columns={3}
                />
              </section>

              {/* Loaders */}
              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Loading States</h3>
                <div className="grid grid-cols-3 gap-6 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center h-32 mb-3">
                      <Loader className="w-8 h-8 text-[#D9480F] animate-spin" />
                    </div>
                    <div className="text-sm font-medium text-[#111827]">Spinner</div>
                    <div className="text-xs text-[#6B7280]">For buttons & inline</div>
                  </div>
                  <div>
                    <div className="h-32 space-y-3 mb-3">
                      <div className="h-4 bg-[#E5E7EB] rounded animate-pulse"></div>
                      <div className="h-4 bg-[#E5E7EB] rounded animate-pulse w-5/6"></div>
                      <div className="h-4 bg-[#E5E7EB] rounded animate-pulse w-4/6"></div>
                    </div>
                    <div className="text-sm font-medium text-[#111827]">Skeleton</div>
                    <div className="text-xs text-[#6B7280]">For content loading</div>
                  </div>
                  <div>
                    <div className="h-32 flex flex-col items-center justify-center bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] mb-3">
                      <Loader className="w-10 h-10 text-[#D9480F] animate-spin mb-2" />
                      <div className="text-sm text-[#6B7280]">Loading...</div>
                    </div>
                    <div className="text-sm font-medium text-[#111827]">Full Page</div>
                    <div className="text-xs text-[#6B7280]">With backdrop</div>
                  </div>
                </div>

                <SpecTable
                  specs={[
                    { label: 'Spinner Size (Small)', value: '16px (w-4 h-4)' },
                    { label: 'Spinner Size (Medium)', value: '32px (w-8 h-8)' },
                    { label: 'Spinner Size (Large)', value: '40px (w-10 h-10)' },
                    { label: 'Spinner Color', value: '#D9480F' },
                    { label: 'Animation', value: 'rotate 360deg infinite' },
                    { label: 'Animation Duration', value: '1s linear' },
                    { label: 'Skeleton BG', value: '#E5E7EB' },
                    { label: 'Skeleton Animation', value: 'pulse 2s ease-in-out infinite' },
                  ]}
                  columns={4}
                />
              </section>
            </div>
          )}

          {activeSection === 'icons' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-[#111827] mb-2">Icon Library</h1>
                <p className="text-[#6B7280]">
                  Lucide icons used throughout the application with standard sizing and colors.
                </p>
              </div>

              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Common Icons</h3>
                <div className="grid grid-cols-8 gap-6 mb-4">
                  {[
                    { icon: Home, name: 'Home' },
                    { icon: Users, name: 'Users' },
                    { icon: Monitor, name: 'Monitor' },
                    { icon: Settings, name: 'Settings' },
                    { icon: Search, name: 'Search' },
                    { icon: Plus, name: 'Plus' },
                    { icon: Edit2, name: 'Edit' },
                    { icon: Trash2, name: 'Trash' },
                    { icon: Calendar, name: 'Calendar' },
                    { icon: Clock, name: 'Clock' },
                    { icon: Upload, name: 'Upload' },
                    { icon: CheckCircle, name: 'Check' },
                    { icon: AlertCircle, name: 'Alert' },
                    { icon: Info, name: 'Info' },
                    { icon: AlertTriangle, name: 'Warning' },
                    { icon: X, name: 'Close' },
                  ].map(({ icon: Icon, name }) => (
                    <div key={name} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 flex items-center justify-center bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                        <Icon className="w-6 h-6 text-[#6B7280]" />
                      </div>
                      <div className="text-xs text-[#6B7280] text-center">{name}</div>
                    </div>
                  ))}
                </div>

                <SpecTable
                  specs={[
                    { label: 'Small Icon', value: '16px (w-4 h-4)' },
                    { label: 'Medium Icon', value: '20px (w-5 h-5)' },
                    { label: 'Large Icon', value: '24px (w-6 h-6)' },
                    { label: 'XL Icon', value: '32px (w-8 h-8)' },
                    { label: 'Stroke Width', value: '2px' },
                    { label: 'Library', value: 'lucide-react' },
                    { label: 'Default Color', value: '#6B7280' },
                    { label: 'Active Color', value: '#D9480F' },
                  ]}
                  columns={4}
                />
              </section>

              <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h3 className="text-[#111827] mb-4">Icon Sizes Reference</h3>
                <div className="flex items-end gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <Settings className="w-4 h-4 text-[#6B7280]" />
                    <div className="text-xs text-[#6B7280]">16px</div>
                    <div className="text-xs text-[#6B7280] font-mono">w-4 h-4</div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Settings className="w-5 h-5 text-[#6B7280]" />
                    <div className="text-xs text-[#6B7280]">20px</div>
                    <div className="text-xs text-[#6B7280] font-mono">w-5 h-5</div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Settings className="w-6 h-6 text-[#6B7280]" />
                    <div className="text-xs text-[#6B7280]">24px</div>
                    <div className="text-xs text-[#6B7280] font-mono">w-6 h-6</div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Settings className="w-8 h-8 text-[#6B7280]" />
                    <div className="text-xs text-[#6B7280]">32px</div>
                    <div className="text-xs text-[#6B7280] font-mono">w-8 h-8</div>
                  </div>
                </div>
              </section>

              {/* Angular Implementation Info */}
              <div className="bg-[#FEF2F2] border border-[#FED7D7] rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#D9480F] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[#111827] mb-2">Angular Implementation</div>
                    <div className="text-sm text-[#6B7280] mb-3">
                      For Angular, we recommend using <strong>Lucide Angular</strong> library which provides the same icon set.
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
                      <div className="text-xs font-mono text-[#6B7280] space-y-2">
                        <div># Install the library</div>
                        <div className="text-[#111827]">npm install lucide-angular</div>
                        <div className="mt-3"># Import in your module</div>
                        <div className="text-[#111827]">import {'{ LucideAngularModule, Home, Users }'} from 'lucide-angular';</div>
                        <div className="mt-3"># Use in templates</div>
                        <div className="text-[#111827]">&lt;i-lucide name="home" [size]="20"&gt;&lt;/i-lucide&gt;</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
