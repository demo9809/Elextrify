import { CheckCircle, Upload, Loader, Code } from 'lucide-react';
import { CSSData } from './CSSDetailsModal';
import { SpecTable } from './SpecTable';

interface InputsExtendedProps {
  onOpenModal: (title: string, data: CSSData) => void;
}

export function InputsExtended({ onOpenModal }: InputsExtendedProps) {
  return (
    <>
      {/* Text Input - Success State */}
      <section className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">Text Input - Success State</h3>
          <button
            onClick={() => onOpenModal('Text Input (Success)', {
              layout: 'display: block;\nwidth: 100%;',
              typography: 'font-family: \'Inter\', sans-serif;\nfont-size: 14px;\nfont-weight: 400;\nline-height: 20px;',
              spacing: 'height: 48px;\npadding-top: 0;\npadding-right: 16px;\npadding-bottom: 0;\npadding-left: 16px;',
              shape: 'border-width: 2px;\nborder-style: solid;\nborder-radius: 8px;',
              states: {
                default: 'border-color: #16A34A;\ncolor: #16A34A;',
                focus: 'border-color: #16A34A;\nbox-shadow: 0 0 0 4px rgba(22, 163, 74, 0.2);'
              },
              classContract: '.ui-input-success',
              html: '<div class="relative"><input class="ui-input-success" /><p class="success-message">Valid</p></div>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">File Upload</h3>
          <button
            onClick={() => onOpenModal('File Upload', {
              layout: 'display: block;\nwidth: 100%;\ntext-align: center;\ntransition: all 200ms ease;',
              typography: 'font-family: \'Inter\', sans-serif;',
              spacing: 'padding: 32px;',
              shape: 'border-width: 2px;\nborder-style: dashed;\nborder-radius: 8px;',
              states: {
                default: 'border-color: #E5E7EB;\nbackground-color: transparent;',
                hover: 'border-color: #D9480F;\nbackground-color: #FEF2F2;'
              },
              classContract: '.ui-file-upload',
              html: '<div class="ui-file-upload"><input type="file" /></div>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#111827]">File Upload - Uploading State</h3>
          <button
            onClick={() => onOpenModal('File Upload (Uploading)', {
              layout: 'display: flex;\nalign-items: center;\ngap: 12px;',
              typography: 'font-family: \'Inter\', sans-serif;\nfont-size: 14px;',
              spacing: 'padding: 16px;',
              shape: 'border-width: 1px;\nborder-style: solid;\nborder-radius: 8px;',
              states: {
                default: 'background-color: #FFFFFF;\nborder-color: #E5E7EB;'
              },
              classContract: '.ui-upload-item',
              html: '<div class="ui-upload-item"><div class="file-info">...</div><div class="progress-bar"></div></div>'
            })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#D9480F] hover:bg-[#FEF2F2] rounded-md transition-colors border border-[#D9480F]/20"
          >
            <Code className="w-3.5 h-3.5" />
            Copy CSS
          </button>
        </div>
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
