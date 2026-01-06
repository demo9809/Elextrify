import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export interface CSSData {
    layout: string;
    typography: string;
    spacing: string;
    shape: string;
    states?: {
        default?: string;
        hover?: string;
        disabled?: string;
        focus?: string;
        checked?: string;
        active?: string;
        completed?: string;
        current?: string;
        upcoming?: string;
        success?: string;
        error?: string;
    };
    classContract: string;
    html?: string;
}

interface CSSDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: CSSData;
}

export function CSSDetailsModal({ isOpen, onClose, title, data }: CSSDetailsModalProps) {
    if (!isOpen) return null;

    const CopySection = ({ label, code }: { label: string; code: string }) => {
        const [copied, setCopied] = useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        return (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4 last:mb-0">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#D9480F] transition-colors"
                    >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
                <pre className="font-mono text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {code}
                </pre>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white z-10">
                    <h3 className="text-lg font-semibold text-gray-900">{title} – CSS</h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900 pb-2 border-b border-gray-100">Combined CSS Export</h4>
                            <CopySection
                                label="CSS Block"
                                code={`${data.classContract} {\n${[
                                    data.layout,
                                    data.typography,
                                    data.spacing,
                                    data.shape,
                                    data.states?.default
                                ].filter(Boolean).join('\n\n').split('\n').map(line => `  ${line}`).join('\n')}\n}`}
                            />

                            {data.html && (
                                <>
                                    <h4 className="font-medium text-gray-900 pb-2 border-b border-gray-100 mt-6">HTML Structure</h4>
                                    <CopySection label="HTML" code={data.html} />
                                </>
                            )}

                            <h4 className="font-medium text-gray-900 pb-2 border-b border-gray-100 mt-6">Base Styles</h4>
                            <CopySection label="Layout" code={data.layout} />
                            <CopySection label="Typography" code={data.typography} />
                            <CopySection label="Spacing" code={data.spacing} />
                            <CopySection label="Shape" code={data.shape} />
                        </div>

                        <div className="space-y-4">
                            {data.states && (
                                <>
                                    <h4 className="font-medium text-gray-900 pb-2 border-b border-gray-100">State Styles</h4>
                                    {data.states.default && <CopySection label="Default State" code={data.states.default} />}
                                    {data.states.hover && <CopySection label="Hover State" code={data.states.hover} />}
                                    {data.states.focus && <CopySection label="Focus State" code={data.states.focus} />}
                                    {data.states.active && <CopySection label="Active State" code={data.states.active} />}
                                    {data.states.checked && <CopySection label="Checked State" code={data.states.checked} />}
                                    {data.states.completed && <CopySection label="Completed State" code={data.states.completed} />}
                                    {data.states.current && <CopySection label="Current State" code={data.states.current} />}
                                    {data.states.upcoming && <CopySection label="Upcoming State" code={data.states.upcoming} />}
                                    {data.states.success && <CopySection label="Success State" code={data.states.success} />}
                                    {data.states.error && <CopySection label="Error State" code={data.states.error} />}
                                    {data.states.disabled && <CopySection label="Disabled State" code={data.states.disabled} />}
                                </>
                            )}

                            <h4 className="font-medium text-gray-900 pb-2 border-b border-gray-100 mt-6">Class Contract</h4>
                            <CopySection label="Classes" code={data.classContract} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
