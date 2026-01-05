import { CheckCircle, AlertCircle, Info, AlertTriangle, X, Loader, Monitor, Plus } from 'lucide-react';
import { SpecTable } from './SpecTable';

export function FeedbackComponents() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[#111827] mb-2">Feedback & Overlays</h1>
        <p className="text-[#6B7280]">
          Components for user feedback including toasts, modals, loaders, dialogs, and empty states.
        </p>
      </div>

      {/* Toast Notifications - All Variants */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Toast Notifications</h3>
        <div className="space-y-4 max-w-md mb-4">
          <div className="flex items-start gap-3 p-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg">
            <CheckCircle className="w-5 h-5 text-[#047857] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-[#047857] mb-1">Success</div>
              <div className="text-sm text-[#065F46]">Your changes have been saved successfully!</div>
            </div>
            <button className="text-[#047857] hover:text-[#065F46] transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-[#FEE2E2] border border-[#FECACA] rounded-lg">
            <AlertCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-[#DC2626] mb-1">Error</div>
              <div className="text-sm text-[#991B1B]">Something went wrong. Please try again.</div>
            </div>
            <button className="text-[#DC2626] hover:text-[#991B1B] transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-[#FEF3C7] border border-[#FDE68A] rounded-lg">
            <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-[#F59E0B] mb-1">Warning</div>
              <div className="text-sm text-[#92400E]">This action cannot be undone.</div>
            </div>
            <button className="text-[#F59E0B] hover:text-[#92400E] transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg">
            <Info className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-[#3B82F6] mb-1">Info</div>
              <div className="text-sm text-[#1E40AF]">New update available. Click to learn more.</div>
            </div>
            <button className="text-[#3B82F6] hover:text-[#1E40AF] transition-colors">
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
            { label: 'Warning BG', value: '#FEF3C7' },
            { label: 'Warning Border', value: '1px solid #FDE68A' },
            { label: 'Info BG', value: '#EFF6FF' },
            { label: 'Info Border', value: '1px solid #BFDBFE' },
            { label: 'Animation', value: 'slide-in from right' },
            { label: 'Duration', value: '4000ms auto-dismiss' },
          ]}
          columns={3}
        />
      </section>

      {/* Modal Dialog - Small */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Modal Dialog - Small (480px)</h3>
        <div className="bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] p-8 relative mb-4">
          <div className="bg-white rounded-lg shadow-lg max-w-[480px] mx-auto">
            <div className="p-6 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <h3 className="text-[#111827]">Modal Title</h3>
                <button className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-[#6B7280]">
                This is a small modal dialog. It's used for simple confirmations or quick forms.
              </p>
            </div>
            <div className="p-6 border-t border-[#E5E7EB] flex gap-3 justify-end">
              <button className="h-11 px-6 border border-[#E5E7EB] text-[#374151] rounded-lg hover:bg-[#F9FAFB] transition-colors">
                Cancel
              </button>
              <button className="h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C13D0C] transition-colors">
                Confirm
              </button>
            </div>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Width', value: '480px' },
            { label: 'Border Radius', value: '8px' },
            { label: 'Shadow', value: '0 10px 15px -3px rgba(0,0,0,0.1)' },
            { label: 'Header Padding', value: '24px (p-6)' },
            { label: 'Body Padding', value: '24px (p-6)' },
            { label: 'Footer Padding', value: '24px (p-6)' },
            { label: 'Backdrop', value: 'rgba(0, 0, 0, 0.5)' },
            { label: 'Divider Color', value: '#E5E7EB' },
            { label: 'Title Font', value: '20px / weight: 600' },
            { label: 'Close Icon Size', value: '20px (w-5 h-5)' },
          ]}
          columns={3}
        />
      </section>

      {/* Modal Dialog - Medium */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Modal Dialog - Medium (640px)</h3>
        <div className="bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] p-8 relative mb-4">
          <div className="bg-white rounded-lg shadow-lg max-w-[640px] mx-auto">
            <div className="p-6 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <h3 className="text-[#111827]">Medium Modal</h3>
                <button className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-[#6B7280] mb-4">
                This medium-sized modal is perfect for forms with multiple fields or content that needs more space.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Field Label</label>
                  <input type="text" className="w-full h-12 px-4 border border-[#E5E7EB] rounded-lg" placeholder="Enter value..." />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#E5E7EB] flex gap-3 justify-end">
              <button className="h-11 px-6 border border-[#E5E7EB] text-[#374151] rounded-lg">Cancel</button>
              <button className="h-11 px-6 bg-[#D9480F] text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Width', value: '640px' },
            { label: 'Use Case', value: 'Forms with 2-5 fields' },
          ]}
          columns={2}
        />
      </section>

      {/* Modal Dialog - Large */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Modal Dialog - Large (800px+)</h3>
        <div className="text-sm text-[#6B7280] mb-4">
          Large modals (800px, 960px, or 80% viewport width) are used for complex forms, data tables, or detailed content viewing.
        </div>

        <SpecTable
          specs={[
            { label: 'Width Options', value: '800px / 960px / 80vw' },
            { label: 'Max Width', value: '1152px (80% of 1440px)' },
            { label: 'Use Case', value: 'Complex forms, data tables, detail views' },
          ]}
          columns={3}
        />
      </section>

      {/* Confirmation Dialog */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Confirmation Dialog</h3>
        <div className="bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] p-8 relative mb-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <div className="p-6">
              <div className="w-12 h-12 bg-[#FEE2E2] rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
              </div>
              <h3 className="text-[#111827] text-center mb-2">Delete Kiosk?</h3>
              <p className="text-sm text-[#6B7280] text-center mb-6">
                Are you sure you want to delete this kiosk? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button className="flex-1 h-11 px-6 border border-[#E5E7EB] text-[#374151] rounded-lg hover:bg-[#F9FAFB] transition-colors">
                  Cancel
                </button>
                <button className="flex-1 h-11 px-6 bg-[#DC2626] text-white rounded-lg hover:bg-[#B91C1C] transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Max Width', value: '448px' },
            { label: 'Padding', value: '24px (p-6)' },
            { label: 'Icon Container Size', value: '48px (w-12 h-12)' },
            { label: 'Icon Container BG', value: '#FEE2E2' },
            { label: 'Icon Size', value: '24px (w-6 h-6)' },
            { label: 'Icon Color', value: '#DC2626' },
            { label: 'Title Font', value: '20px / weight: 600 / center' },
            { label: 'Message Font', value: '14px / weight: 400 / center' },
            { label: 'Button Layout', value: 'flex / equal width' },
          ]}
          columns={3}
        />
      </section>

      {/* Loading Indicators */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Loading Indicators</h3>
        <div className="grid grid-cols-3 gap-6 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center h-32 mb-3">
              <Loader className="w-8 h-8 text-[#D9480F] animate-spin" />
            </div>
            <div className="text-sm font-medium text-[#111827] mb-1">Spinner</div>
            <div className="text-xs text-[#6B7280]">For buttons & inline</div>
          </div>
          <div>
            <div className="h-32 space-y-3 mb-3">
              <div className="h-4 bg-[#E5E7EB] rounded animate-pulse"></div>
              <div className="h-4 bg-[#E5E7EB] rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-[#E5E7EB] rounded animate-pulse w-4/6"></div>
            </div>
            <div className="text-sm font-medium text-[#111827] mb-1">Skeleton</div>
            <div className="text-xs text-[#6B7280]">For content loading</div>
          </div>
          <div>
            <div className="h-32 flex flex-col items-center justify-center bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] mb-3">
              <Loader className="w-10 h-10 text-[#D9480F] animate-spin mb-2" />
              <div className="text-sm text-[#6B7280]">Loading...</div>
            </div>
            <div className="text-sm font-medium text-[#111827] mb-1">Full Page</div>
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
            { label: 'Skeleton Border Radius', value: '4px' },
          ]}
          columns={3}
        />
      </section>

      {/* Empty State */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Empty State</h3>
        <div className="text-center py-12 border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E5E7EB]">
            <Monitor className="w-8 h-8 text-[#9CA3AF]" />
          </div>
          <h4 className="text-[#111827] mb-2">No Data Found</h4>
          <p className="text-sm text-[#6B7280] mb-6 max-w-sm mx-auto">
            You don't have any kiosks yet. Get started by adding your first kiosk.
          </p>
          <button className="h-11 px-6 bg-[#D9480F] text-white rounded-lg inline-flex items-center gap-2 hover:bg-[#C13D0C] transition-colors">
            <Plus className="w-5 h-5" />
            Add Kiosk
          </button>
        </div>

        <SpecTable
          specs={[
            { label: 'Container Padding', value: '48px vertical (py-12)' },
            { label: 'Background', value: '#F9FAFB' },
            { label: 'Border', value: '1px solid #E5E7EB' },
            { label: 'Icon Container Size', value: '64px (w-16 h-16)' },
            { label: 'Icon Container BG', value: '#FFFFFF' },
            { label: 'Icon Size', value: '32px (w-8 h-8)' },
            { label: 'Icon Color', value: '#9CA3AF' },
            { label: 'Title Font', value: '18px / weight: 600' },
            { label: 'Message Font', value: '14px / weight: 400' },
            { label: 'Message Max Width', value: '448px' },
          ]}
          columns={3}
        />
      </section>

      {/* Progress Bar */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Progress Bar</h3>
        <div className="space-y-4 mb-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#111827] font-medium">Campaign Progress</span>
              <span className="text-[#6B7280]">65%</span>
            </div>
            <div className="w-full bg-[#E5E7EB] rounded-full h-2">
              <div className="bg-[#D9480F] h-2 rounded-full transition-all" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#111827] font-medium">Success Progress</span>
              <span className="text-[#16A34A]">100%</span>
            </div>
            <div className="w-full bg-[#E5E7EB] rounded-full h-2">
              <div className="bg-[#16A34A] h-2 rounded-full transition-all" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Height', value: '8px (h-2)' },
            { label: 'Background (Track)', value: '#E5E7EB' },
            { label: 'Background (Fill)', value: '#D9480F / #16A34A' },
            { label: 'Border Radius', value: '9999px' },
            { label: 'Transition', value: 'width 300ms ease' },
            { label: 'Label Font', value: '14px / weight: 500' },
            { label: 'Percentage Font', value: '14px / weight: 400' },
          ]}
          columns={3}
        />
      </section>
    </div>
  );
}
