import { CheckCircle, Upload, Loader } from 'lucide-react';
import { SpecTable } from './SpecTable';

export function InputsExtended() {
  return (
    <>
      {/* Text Input - Success State */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">Text Input - Success State</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#374151] mb-2">
            Success State
          </label>
          <input
            type="text"
            placeholder="Valid input"
            value="john@example.com"
            readOnly
            className="w-full h-12 px-4 border-2 border-[#16A34A] rounded-lg text-[#111827] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#16A34A]/20 outline-none"
          />
          <p className="text-sm text-[#16A34A] mt-1 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Input is valid
          </p>
        </div>

        <SpecTable
          specs={[
            { label: 'Height', value: '48px (h-12)' },
            { label: 'Padding Left/Right', value: '16px (px-4)' },
            { label: 'Border (Success)', value: '2px solid #16A34A' },
            { label: 'Border Radius', value: '8px' },
            { label: 'Focus Ring', value: '2px #16A34A/20%' },
            { label: 'Text Color', value: '#16A34A' },
            { label: 'Icon Size', value: '16px (w-4 h-4)' },
            { label: 'Icon Color', value: '#16A34A' },
          ]}
          columns={4}
        />
      </section>

      {/* File Upload */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">File Upload</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#374151] mb-2">
            Default State
          </label>
          <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-8 text-center hover:border-[#D9480F] hover:bg-[#FEF2F2] transition-all cursor-pointer">
            <Upload className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <div className="text-sm font-medium text-[#111827] mb-1">
              Click to upload or drag and drop
            </div>
            <div className="text-xs text-[#6B7280]">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </div>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Border', value: '2px dashed #E5E7EB' },
            { label: 'Border (Hover)', value: '2px dashed #D9480F' },
            { label: 'Background (Hover)', value: '#FEF2F2' },
            { label: 'Border Radius', value: '8px' },
            { label: 'Padding', value: '32px (p-8)' },
            { label: 'Icon Size', value: '48px (w-12 h-12)' },
            { label: 'Icon Color', value: '#9CA3AF' },
            { label: 'Transition', value: 'all 200ms ease' },
          ]}
          columns={4}
        />
      </section>

      {/* File Upload - Uploading Animation */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h3 className="text-[#111827] mb-4">File Upload - Uploading State</h3>
        <div className="mb-4">
          <div className="border border-[#E5E7EB] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#F9FAFB] rounded-lg flex items-center justify-center flex-shrink-0">
                <Upload className="w-5 h-5 text-[#6B7280]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#111827] truncate">document.pdf</div>
                <div className="text-xs text-[#6B7280]">2.4 MB • 45% uploaded</div>
              </div>
              <Loader className="w-5 h-5 text-[#D9480F] animate-spin flex-shrink-0" />
            </div>
            <div className="w-full bg-[#E5E7EB] rounded-full h-2">
              <div className="bg-[#D9480F] h-2 rounded-full transition-all" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        <SpecTable
          specs={[
            { label: 'Container Padding', value: '16px (p-4)' },
            { label: 'Icon Container Size', value: '40px (w-10 h-10)' },
            { label: 'Icon Container BG', value: '#F9FAFB' },
            { label: 'Icon Size', value: '20px (w-5 h-5)' },
            { label: 'Progress Bar Height', value: '8px (h-2)' },
            { label: 'Progress Bar BG', value: '#E5E7EB' },
            { label: 'Progress Bar Fill', value: '#D9480F' },
            { label: 'Spinner Size', value: '20px (w-5 h-5)' },
            { label: 'Spinner Color', value: '#D9480F' },
            { label: 'Animation', value: 'spin 1s linear infinite' },
          ]}
          columns={3}
        />
      </section>
    </>
  );
}
