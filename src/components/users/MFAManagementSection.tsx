import { useState } from 'react';
import { Shield, Clock, Key, RotateCcw, Power, AlertCircle } from 'lucide-react';
import { User } from '../../types/users';
import { toast } from 'sonner@2.0.3';
import MFASetupModal from './MFASetupModal';

interface MFAManagementSectionProps {
  user: User;
  onUpdate: (updates: Partial<User>) => void;
  isCurrentUser?: boolean;
}

export default function MFAManagementSection({
  user,
  onUpdate,
  isCurrentUser = false,
}: MFAManagementSectionProps) {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleEnableMFA = () => {
    setShowSetupModal(true);
  };

  const handleDisableMFA = () => {
    if (isCurrentUser) {
      toast.error('You cannot disable your own MFA. Please contact another administrator.');
      return;
    }

    if (window.confirm('Are you sure you want to disable MFA for this user? This will reduce account security.')) {
      onUpdate({
        mfaEnabled: false,
        mfaVerifiedAt: undefined,
        mfaMethod: undefined,
        mfaBackupCodes: undefined,
      });
      toast.success('MFA disabled for user');
    }
  };

  const handleResetMFA = () => {
    if (window.confirm('Are you sure you want to reset MFA for this user? They will need to set it up again on their next login.')) {
      onUpdate({
        mfaEnabled: false,
        mfaVerifiedAt: undefined,
      });
      toast.success('MFA reset. User will be prompted to set up MFA on next login.');
    }
  };

  const handleMFASetupComplete = (backupCodes: string[]) => {
    onUpdate({
      mfaEnabled: true,
      mfaVerifiedAt: new Date().toISOString(),
      mfaMethod: 'authenticator',
      mfaBackupCodes: backupCodes,
    });
  };

  const handleViewBackupCodes = () => {
    setShowBackupCodes(!showBackupCodes);
  };

  const handleRegenerateBackupCodes = () => {
    if (window.confirm('Are you sure you want to regenerate backup codes? All existing backup codes will be invalidated.')) {
      const newCodes = [
        '1A2B-3C4D-5E6F',
        '7G8H-9I0J-1K2L',
        '3M4N-5O6P-7Q8R',
        '9S0T-1U2V-3W4X',
        '5Y6Z-7A8B-9C0D',
        '1E2F-3G4H-5I6J',
      ];
      onUpdate({
        mfaBackupCodes: newCodes,
      });
      toast.success('Backup codes regenerated');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Multi-Factor Authentication</h3>
          <p className="text-gray-600">Manage MFA settings for this user</p>
        </div>

        <div className="p-6 space-y-4">
          {/* MFA Status */}
          <div className={`p-4 rounded-lg border-2 ${
            user.mfaEnabled 
              ? 'bg-green-50 border-green-200' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                user.mfaEnabled ? 'bg-green-100' : 'bg-gray-200'
              }`}>
                <Shield className={`w-6 h-6 ${
                  user.mfaEnabled ? 'text-green-600' : 'text-gray-500'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-gray-900">
                    {user.mfaEnabled ? 'MFA Enabled' : 'MFA Not Enabled'}
                  </h4>
                  {user.mfaEnabled && user.mfaMethod && (
                    <span className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                      {user.mfaMethod === 'authenticator' ? 'Authenticator App' : 'SMS'}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">
                  {user.mfaEnabled
                    ? 'This account is protected with two-factor authentication'
                    : 'Enable MFA to add an extra layer of security to this account'}
                </p>
                
                {!user.mfaEnabled ? (
                  <button
                    onClick={handleEnableMFA}
                    className="flex items-center gap-2 px-4 h-9 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
                  >
                    <Power className="w-4 h-4" />
                    <span>Enable MFA</span>
                  </button>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleResetMFA}
                      className="flex items-center gap-2 px-4 h-9 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset MFA</span>
                    </button>
                    <button
                      onClick={handleDisableMFA}
                      className="flex items-center gap-2 px-4 h-9 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Power className="w-4 h-4" />
                      <span>Disable MFA</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MFA Details (when enabled) */}
          {user.mfaEnabled && (
            <>
              {/* Last Verification */}
              {user.mfaVerifiedAt && (
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-gray-900 mb-1">Last MFA Verification</div>
                    <div className="text-gray-600">{formatDate(user.mfaVerifiedAt)}</div>
                  </div>
                </div>
              )}

              {/* Backup Codes */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={handleViewBackupCodes}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-gray-400" />
                    <div className="text-left">
                      <div className="text-gray-900">Backup Recovery Codes</div>
                      <div className="text-gray-600">
                        {user.mfaBackupCodes?.length || 0} codes available
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {showBackupCodes ? '▲' : '▼'}
                  </div>
                </button>

                {showBackupCodes && user.mfaBackupCodes && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-yellow-700 text-sm">
                        Each backup code can only be used once. Generate new codes if you've used them all.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {user.mfaBackupCodes.map((code, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 bg-white border border-gray-200 rounded text-center font-mono text-gray-900"
                        >
                          {code}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleRegenerateBackupCodes}
                      className="flex items-center gap-2 px-4 h-9 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Regenerate Codes</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* MFA Setup Modal */}
      <MFASetupModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        onComplete={handleMFASetupComplete}
        userEmail={user.email}
      />
    </>
  );
}
