import { Edit2, Trash2, TrendingUp, ChevronDown } from 'lucide-react';
import { SpecTable } from './SpecTable';

export function DataDisplayComponents() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[#111827] mb-2">Data Display Components</h1>
        <p className="text-[#6B7280]">
          Components for displaying data including tables, cards, badges, pagination, and stats.
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

      {/* Data Table */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Data Table</h3>
        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden mb-4">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  <input type="checkbox" className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded" />
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider cursor-pointer hover:text-[#111827]">
                  Name ↑
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Location
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {[1, 2, 3].map((row) => (
                <tr key={row} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded" />
                  </td>
                  <td className="px-4 py-3 text-sm text-[#111827] font-medium">
                    Kiosk {row}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 bg-[#ECFDF5] text-[#047857] text-xs font-medium rounded-full">
                      Live
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">
                    New York, Mall A
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#D9480F] hover:bg-[#FEF2F2] rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SpecTable
          specs={[
            { label: 'Table Border', value: '1px solid #E5E7EB' },
            { label: 'Border Radius', value: '8px' },
            { label: 'Header BG', value: '#F9FAFB' },
            { label: 'Header Padding', value: '12px (px-4 py-3)' },
            { label: 'Header Font', value: '12px / weight: 500 / uppercase' },
            { label: 'Header Text Color', value: '#6B7280' },
            { label: 'Row Padding', value: '12px (px-4 py-3)' },
            { label: 'Row Hover BG', value: '#F9FAFB' },
            { label: 'Row Border', value: '1px solid #E5E7EB' },
            { label: 'Cell Font', value: '14px / weight: 400' },
            { label: 'Checkbox Size', value: '16px (w-4 h-4)' },
            { label: 'Action Icon Size', value: '16px (w-4 h-4)' },
          ]}
          columns={3}
        />
      </section>

      {/* Pagination */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Pagination</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-[#6B7280]">
            Showing <span className="font-medium text-[#111827]">1</span> to <span className="font-medium text-[#111827]">10</span> of <span className="font-medium text-[#111827]">97</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center border border-[#E5E7EB] rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] transition-colors">
              ←
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
              →
            </button>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Button Size', value: '36px (w-9 h-9)' },
            { label: 'Button Border', value: '1px solid #E5E7EB' },
            { label: 'Button Border Radius', value: '8px' },
            { label: 'Font Size', value: '14px / weight: 500' },
            { label: 'Active BG', value: '#D9480F' },
            { label: 'Active Text', value: '#FFFFFF' },
            { label: 'Default Text', value: '#6B7280' },
            { label: 'Hover BG', value: '#F9FAFB' },
            { label: 'Gap Between Buttons', value: '8px (gap-2)' },
          ]}
          columns={3}
        />
      </section>

      {/* Card Component */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Card Component</h3>
        <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm max-w-md mb-4">
          <div className="p-6 border-b border-[#E5E7EB]">
            <h4 className="text-[#111827] mb-1">Card Header</h4>
            <p className="text-sm text-[#6B7280]">Card subtitle or description</p>
          </div>
          <div className="p-6">
            <p className="text-[#374151] mb-4">
              This is the card body content. It can contain any type of information or components.
            </p>
          </div>
          <div className="p-6 border-t border-[#E5E7EB] flex gap-3">
            <button className="h-9 px-4 bg-[#D9480F] text-white rounded-lg text-sm">
              Action
            </button>
            <button className="h-9 px-4 border border-[#E5E7EB] text-[#374151] rounded-lg text-sm">
              Cancel
            </button>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Border', value: '1px solid #E5E7EB' },
            { label: 'Border Radius', value: '8px' },
            { label: 'Shadow', value: '0 1px 2px 0 rgba(0,0,0,0.05)' },
            { label: 'Header Padding', value: '24px (p-6)' },
            { label: 'Body Padding', value: '24px (p-6)' },
            { label: 'Footer Padding', value: '24px (p-6)' },
            { label: 'Divider Color', value: '#E5E7EB' },
            { label: 'Header Title Font', value: '18px / weight: 600' },
            { label: 'Subtitle Font', value: '14px / weight: 400' },
          ]}
          columns={3}
        />
      </section>

      {/* Stats Card Widget */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Stats Card Widget</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { label: 'Total Impressions', value: '1.2M', change: '+12%', trend: 'up' },
            { label: 'Active Kiosks', value: '45', change: '+3', trend: 'up' },
            { label: 'Revenue', value: '$24.5K', change: '-5%', trend: 'down' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="text-sm text-[#6B7280] mb-1">{stat.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-semibold text-[#111827]">{stat.value}</div>
                <div className={`text-sm font-medium flex items-center gap-1 ${stat.trend === 'up' ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                  <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <SpecTable
          specs={[
            { label: 'Container Border', value: '1px solid #E5E7EB' },
            { label: 'Border Radius', value: '8px' },
            { label: 'Padding', value: '24px (p-6)' },
            { label: 'Label Font', value: '14px / weight: 400' },
            { label: 'Label Color', value: '#6B7280' },
            { label: 'Value Font', value: '24px / weight: 600' },
            { label: 'Value Color', value: '#111827' },
            { label: 'Change Font', value: '14px / weight: 500' },
            { label: 'Positive Change', value: '#16A34A' },
            { label: 'Negative Change', value: '#DC2626' },
            { label: 'Icon Size', value: '16px (w-4 h-4)' },
          ]}
          columns={3}
        />
      </section>

      {/* Accordion */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Accordion</h3>
        <div className="space-y-2 mb-4">
          <div className="border border-[#E5E7EB] rounded-lg">
            <button className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F9FAFB] transition-colors">
              <span className="font-medium text-[#111827]">Accordion Item 1 (Expanded)</span>
              <ChevronDown className="w-5 h-5 text-[#6B7280] rotate-180" />
            </button>
            <div className="px-4 pb-4 text-sm text-[#6B7280]">
              This is the accordion content. It can contain any type of information and will expand/collapse when the header is clicked.
            </div>
          </div>
          <div className="border border-[#E5E7EB] rounded-lg">
            <button className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F9FAFB] transition-colors">
              <span className="font-medium text-[#111827]">Accordion Item 2 (Collapsed)</span>
              <ChevronDown className="w-5 h-5 text-[#6B7280]" />
            </button>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Border', value: '1px solid #E5E7EB' },
            { label: 'Border Radius', value: '8px' },
            { label: 'Header Padding', value: '16px (p-4)' },
            { label: 'Header Font', value: '16px / weight: 500' },
            { label: 'Header Hover BG', value: '#F9FAFB' },
            { label: 'Content Padding', value: '16px horizontal, 16px bottom' },
            { label: 'Content Font', value: '14px / weight: 400' },
            { label: 'Icon Size', value: '20px (w-5 h-5)' },
            { label: 'Icon Rotation (Open)', value: '180deg' },
          ]}
          columns={3}
        />
      </section>
    </div>
  );
}
