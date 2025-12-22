import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export function LogoutModal({ isOpen, onClose, onConfirm, userName }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-[440px] mx-4">
        <div className="bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
                <LogOut className="w-5 h-5 text-[#D9480F]" />
              </div>
              <div>
                <h3 className="text-[#111827] font-semibold">Confirm Logout</h3>
                <p className="text-sm text-[#6B7280] mt-0.5">End your current session</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827] transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <p className="text-[#374151] leading-relaxed">
              {userName ? (
                <>
                  Are you sure you want to log out, <span className="font-medium text-[#111827]">{userName}</span>? 
                  You'll need to sign in again to access your account.
                </>
              ) : (
                <>
                  Are you sure you want to log out? You'll need to sign in again to access your account.
                </>
              )}
            </p>
            
            {/* Info Box */}
            <div className="mt-4 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
              <p className="text-sm text-[#6B7280]">
                Your work has been automatically saved. Any unsaved changes will be preserved.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F9FAFB] rounded-b-xl border-t border-[#E5E7EB]">
            <button
              onClick={onClose}
              className="h-11 px-5 rounded-lg border border-[#E5E7EB] bg-white text-[#374151] font-medium hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="h-11 px-5 rounded-lg bg-[#D9480F] text-white font-medium hover:bg-[#C23E0D] transition-colors shadow-sm"
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
