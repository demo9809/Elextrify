import { useState } from 'react';
import { X, Shield, Copy, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface MFASetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (backupCodes: string[]) => void;
  userEmail: string;
}

export default function MFASetupModal({
  isOpen,
  onClose,
  onComplete,
  userEmail,
}: MFASetupModalProps) {
  const [step, setStep] = useState<'qr' | 'verify' | 'backup'>('qr');
  const [verificationCode, setVerificationCode] = useState('');
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);

  // Mock QR code and secret
  const secretKey = 'JBSWY3DPEHPK3PXP';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/DOOH:${encodeURIComponent(userEmail)}?secret=${secretKey}&issuer=DOOH`;

  // Mock backup codes
  const backupCodes = [
    '1A2B-3C4D-5E6F',
    '7G8H-9I0J-1K2L',
    '3M4N-5O6P-7Q8R',
    '9S0T-1U2V-3W4X',
    '5Y6Z-7A8B-9C0D',
    '1E2F-3G4H-5I6J',
  ];

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey);
    setCopiedSecret(true);
    toast.success('Secret key copied to clipboard');
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const handleCopyBackup = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setCopiedBackup(true);
    toast.success('Backup codes copied to clipboard');
    setTimeout(() => setCopiedBackup(false), 2000);
  };

  const handleVerify = () => {
    // Mock verification
    if (verificationCode.length === 6) {
      toast.success('MFA enabled successfully');
      setStep('backup');
    } else {
      toast.error('Please enter a valid 6-digit code');
    }
  };

  const handleComplete = () => {
    onComplete(backupCodes);
    onClose();
    setStep('qr');
    setVerificationCode('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Enable Two-Factor Authentication</h2>
              <p className="text-gray-600">Secure your account with MFA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: QR Code */}
          {step === 'qr' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-gray-900 mb-2">Scan QR Code</h3>
                <p className="text-gray-600 mb-6">
                  Use an authenticator app (Google Authenticator, Authy, etc.) to scan this QR code
                </p>
                <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-900 mb-2">Can't scan the code?</p>
                <p className="text-gray-600 mb-3">Enter this secret key manually:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-mono">
                    {secretKey}
                  </code>
                  <button
                    onClick={handleCopySecret}
                    className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {copiedSecret ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep('verify')}
                className="w-full h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
              >
                Next: Verify Code
              </button>
            </div>
          )}

          {/* Step 2: Verify */}
          {step === 'verify' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-900 mb-2">Verify Setup</h3>
                <p className="text-gray-600 mb-6">
                  Enter the 6-digit code from your authenticator app
                </p>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full h-14 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent text-center text-2xl tracking-widest font-mono"
                  maxLength={6}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('qr')}
                  className="flex-1 h-11 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleVerify}
                  disabled={verificationCode.length !== 6}
                  className="flex-1 h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify & Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Backup Codes */}
          {step === 'backup' && (
            <div className="space-y-6">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-900 mb-1">Save Your Backup Codes</p>
                  <p className="text-yellow-700">
                    Store these codes in a safe place. Each code can be used once if you lose access to your authenticator app.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-900">Backup Recovery Codes</h3>
                  <button
                    onClick={handleCopyBackup}
                    className="flex items-center gap-2 px-3 h-9 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {copiedBackup ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {backupCodes.map((code, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-white border border-gray-200 rounded text-center font-mono text-gray-900"
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleComplete}
                className="w-full h-11 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors"
              >
                I've Saved My Codes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}