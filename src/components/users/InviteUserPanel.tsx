import { useState } from 'react';
import { X, Mail, UserPlus, Shield, AlertCircle } from 'lucide-react';
import { UserRole } from '../../types/users';
import { mockRoles, PERMISSION_MODULES } from '../../data/mockUsers';

interface InviteUserPanelProps {
  onClose: () => void;
}

export default function InviteUserPanel({ onClose }: InviteUserPanelProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('viewer');
  const [note, setNote] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedRole = mockRoles.find(r => r.id === `role-${getRoleIndex(role)}`);

  function getRoleIndex(role: UserRole): number {
    const map: { [key in UserRole]: number } = {
      'owner': 1,
      'admin': 2,
      'manager': 3,
      'media-operator': 4,
      'viewer': 5,
    };
    return map[role];
  }

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) {
      setEmailError('');
    }
  };

  const handleSubmit = () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Inviting user:', { email, role, note });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const getPermissionSummary = () => {
    if (!selectedRole) return [];
    const summary: string[] = [];
    
    PERMISSION_MODULES.forEach(module => {
      const perms = selectedRole.permissions[module.id];
      if (perms) {
        const actions = Object.entries(perms)
          .filter(([_, enabled]) => enabled)
          .map(([action]) => action);
        
        if (actions.length > 0) {
          summary.push(`${module.name}: ${actions.join(', ')}`);
        }
      }
    });
    
    return summary;
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#D9480F] bg-opacity-10 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-[#D9480F]" />
            </div>
            <div>
              <h2 className="text-gray-900">Invite User</h2>
              <p className="text-gray-600">Send an invitation to join your organization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="user@company.com"
                  className={`w-full h-11 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {emailError && (
                <div className="mt-2 flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{emailError}</span>
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent bg-white"
              >
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="media-operator">Media Operator</option>
                <option value="viewer">Viewer</option>
              </select>
              {selectedRole && (
                <p className="mt-2 text-gray-600">{selectedRole.description}</p>
              )}
            </div>

            {/* Permission Summary */}
            {selectedRole && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-900">Permission Summary</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {PERMISSION_MODULES.map(module => {
                    const perms = selectedRole.permissions[module.id];
                    if (!perms) return null;
                    
                    const actions = Object.entries(perms)
                      .filter(([_, enabled]) => enabled)
                      .map(([action]) => action);
                    
                    if (actions.length === 0) return null;

                    return (
                      <div key={module.id} className="text-sm">
                        <span className="text-blue-900">{module.name}:</span>{' '}
                        <span className="text-blue-700">{actions.join(', ')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Optional Note */}
            <div>
              <label className="block text-gray-700 mb-2">
                Note (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a personal message to the invitation..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent resize-none"
              />
              <p className="mt-2 text-gray-500">
                This message will be included in the invitation email
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-gray-900 mb-2">What happens next?</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#D9480F] mt-1">•</span>
                  <span>An invitation email will be sent to the user</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D9480F] mt-1">•</span>
                  <span>They will have 7 days to accept the invitation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D9480F] mt-1">•</span>
                  <span>You can resend or revoke the invitation anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D9480F] mt-1">•</span>
                  <span>User status will show as "Pending" until accepted</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 h-11 px-6 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !email}
              className="flex-1 h-11 px-6 bg-[#D9480F] text-white rounded-lg hover:bg-[#C03F0E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Send Invitation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}