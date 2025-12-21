import { useState } from 'react';
import {
  Key,
  Plus,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  MoreVertical,
  Eye,
  RotateCw,
  XCircle,
  CheckCircle2,
  ShieldAlert,
  Clock,
  Code,
  Server,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  mockApiKeys,
  mockApiEndpoints,
  mockApiUsageLogs,
  mockApiOverviewStats,
  getKeyTypeLabel,
  getKeyTypeBadgeColor,
  getStatusBadgeColor,
  getAccessLevelLabel,
  getAccessLevelColor,
  formatNumber,
  formatRelativeTime,
  getHttpMethodColor,
  type ApiKey,
  type ApiEndpoint,
} from '../../data/mockApiKeys';
import CreateApiKeyModal from './CreateApiKeyModal';

export default function ApiIntegration() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);
  const [showRevokeConfirm, setShowRevokeConfirm] = useState<ApiKey | null>(null);

  const stats = mockApiOverviewStats;
  const activeKeys = apiKeys.filter((key) => key.status === 'active');
  const recentLogs = mockApiUsageLogs.slice(0, 10);

  const handleRevokeKey = (key: ApiKey) => {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === key.id ? { ...k, status: 'revoked' as const } : k))
    );
    setShowRevokeConfirm(null);
    setShowActionsMenu(null);
    toast.success(`API key "${key.name}" has been revoked`);
  };

  const handleRegenerateKey = (key: ApiKey) => {
    toast.success(`API key "${key.name}" has been regenerated. New key has been sent to your email.`);
    setShowActionsMenu(null);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-[#D9480F] flex items-center justify-center flex-shrink-0">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[#111827]">API & Integrations</h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Manage programmatic access to the platform
              </p>
            </div>
          </div>

          {/* Security Warning */}
          <div className="mt-4 p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#991B1B] font-medium">
                System-Level Access Control
              </p>
              <p className="text-sm text-[#DC2626] mt-1">
                API access can expose sensitive system data. Manage carefully and audit regularly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Active Keys */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280]">Active API Keys</p>
              <Key className="w-5 h-5 text-[#9CA3AF]" />
            </div>
            <p className="text-2xl font-semibold text-[#111827]">{stats.totalActiveKeys}</p>
            <p className="text-xs text-[#6B7280] mt-1">
              {apiKeys.length - stats.totalActiveKeys} revoked/expired
            </p>
          </div>

          {/* APIs Enabled */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280]">APIs Enabled</p>
              <Server className="w-5 h-5 text-[#9CA3AF]" />
            </div>
            <p className="text-2xl font-semibold text-[#111827]">{stats.totalApisEnabled}</p>
            <p className="text-xs text-[#6B7280] mt-1">Available endpoints</p>
          </div>

          {/* Requests (24h) */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280]">Requests (24h)</p>
              <Activity className="w-5 h-5 text-[#9CA3AF]" />
            </div>
            <p className="text-2xl font-semibold text-[#111827]">{formatNumber(stats.requests24h)}</p>
            <div className="flex items-center gap-1 mt-1">
              {stats.trend24h > 0 ? (
                <TrendingUp className="w-3 h-3 text-[#16A34A]" />
              ) : (
                <TrendingDown className="w-3 h-3 text-[#DC2626]" />
              )}
              <p
                className={`text-xs ${
                  stats.trend24h > 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'
                }`}
              >
                {Math.abs(stats.trend24h)}% vs yesterday
              </p>
            </div>
          </div>

          {/* Error Rate */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280]">Error Rate</p>
              <AlertTriangle className="w-5 h-5 text-[#9CA3AF]" />
            </div>
            <p className="text-2xl font-semibold text-[#111827]">{stats.errorRate}%</p>
            <p
              className={`text-xs mt-1 ${
                stats.errorRate < 2 ? 'text-[#16A34A]' : 'text-[#F59E0B]'
              }`}
            >
              {stats.errorRate < 2 ? 'Healthy' : 'Needs attention'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* API Keys Table - Left 2/3 */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E5E7EB] rounded-lg">
              {/* Header */}
              <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">API Keys</h2>
                  <p className="text-sm text-[#6B7280] mt-1">
                    Manage and monitor your API access keys
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-4 h-10 bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Create API Key
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                        Key Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                        Environment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                        Last Used
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                        Requests (24h)
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {apiKeys.map((key) => {
                      const typeColor = getKeyTypeBadgeColor(key.keyType);
                      const statusColor = getStatusBadgeColor(key.status);

                      return (
                        <tr
                          key={key.id}
                          className="hover:bg-[#F9FAFB] transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-[#111827]">
                                {key.name}
                              </p>
                              <p className="text-xs text-[#6B7280] font-mono mt-1">
                                {key.maskedKey}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                              style={{
                                backgroundColor: typeColor.bg,
                                color: typeColor.text,
                              }}
                            >
                              {getKeyTypeLabel(key.keyType)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-[#6B7280] capitalize">
                              {key.environment}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium capitalize"
                              style={{
                                backgroundColor: statusColor.bg,
                                color: statusColor.text,
                              }}
                            >
                              {key.status === 'active' && (
                                <CheckCircle2 className="w-3 h-3" />
                              )}
                              {key.status === 'revoked' && (
                                <XCircle className="w-3 h-3" />
                              )}
                              {key.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-[#6B7280]">
                              {key.lastUsed ? formatRelativeTime(key.lastUsed) : 'Never'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <p className="font-medium text-[#111827]">
                                {formatNumber(key.requestCount24h)}
                              </p>
                              <p className="text-xs text-[#6B7280]">
                                {key.errorRate.toFixed(1)}% errors
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="relative inline-block">
                              <button
                                onClick={() =>
                                  setShowActionsMenu(
                                    showActionsMenu === key.id ? null : key.id
                                  )
                                }
                                className="p-1 hover:bg-[#F3F4F6] rounded transition-colors"
                                disabled={key.status === 'revoked'}
                              >
                                <MoreVertical className="w-5 h-5 text-[#6B7280]" />
                              </button>

                              {showActionsMenu === key.id && (
                                <>
                                  <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowActionsMenu(null)}
                                  />
                                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-20 py-1">
                                    <button
                                      onClick={() => {
                                        setSelectedKey(key);
                                        setShowActionsMenu(null);
                                      }}
                                      className="w-full px-4 py-2 text-left text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors flex items-center gap-2"
                                    >
                                      <Eye className="w-4 h-4" />
                                      View Details
                                    </button>
                                    <button
                                      onClick={() => handleRegenerateKey(key)}
                                      className="w-full px-4 py-2 text-left text-sm text-[#111827] hover:bg-[#F9FAFB] transition-colors flex items-center gap-2"
                                    >
                                      <RotateCw className="w-4 h-4" />
                                      Regenerate Key
                                    </button>
                                    <div className="border-t border-[#E5E7EB] my-1" />
                                    <button
                                      onClick={() => {
                                        setShowRevokeConfirm(key);
                                        setShowActionsMenu(null);
                                      }}
                                      className="w-full px-4 py-2 text-left text-sm text-[#DC2626] hover:bg-[#FEF2F2] transition-colors flex items-center gap-2"
                                    >
                                      <XCircle className="w-4 h-4" />
                                      Revoke Key
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {apiKeys.length === 0 && (
                <div className="p-12 text-center">
                  <Key className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
                  <p className="text-sm text-[#6B7280] mb-4">
                    No API keys created yet
                  </p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-2 px-4 h-10 bg-[#D9480F] hover:bg-[#C23D0D] text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Create Your First API Key
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - 1/3 */}
          <div className="space-y-6">
            {/* Recently Used APIs */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#6B7280]" />
                <h3 className="font-semibold text-[#111827]">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                {recentLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        log.statusCode === 200 ? 'bg-[#16A34A]' : 'bg-[#DC2626]'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111827] truncate">
                        {log.endpoint}
                      </p>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {log.keyName} • {formatRelativeTime(log.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Endpoints */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-[#6B7280]" />
                <h3 className="font-semibold text-[#111827]">Top Endpoints</h3>
              </div>
              <div className="space-y-3">
                {mockApiEndpoints
                  .sort((a, b) => b.totalCalls - a.totalCalls)
                  .slice(0, 5)
                  .map((endpoint) => {
                    const methodColor = getHttpMethodColor(endpoint.method);
                    return (
                      <div key={endpoint.id}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span
                              className="px-1.5 py-0.5 rounded text-xs font-medium"
                              style={{
                                backgroundColor: methodColor.bg,
                                color: methodColor.text,
                              }}
                            >
                              {endpoint.method}
                            </span>
                            <span className="text-xs text-[#6B7280] truncate">
                              {endpoint.path}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#6B7280]">
                            {formatNumber(endpoint.totalCalls)} calls
                          </span>
                          <span className="text-[#9CA3AF]">
                            {endpoint.avgResponseTime}ms avg
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Documentation Link */}
            <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Code className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1E40AF] mb-2">
                    API Documentation
                  </h3>
                  <p className="text-sm text-[#3B82F6] mb-3">
                    Learn how to integrate with our platform APIs
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#3B82F6] hover:text-[#1E40AF] transition-colors"
                  >
                    View Documentation
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <CreateApiKeyModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={(newKey) => {
            setApiKeys((prev) => [...prev, newKey]);
            setShowCreateModal(false);
          }}
        />
      )}

      {/* Revoke Confirmation Modal */}
      {showRevokeConfirm && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowRevokeConfirm(null)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#111827] mb-1">
                    Revoke API Key?
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    Are you sure you want to revoke the API key "
                    <span className="font-medium text-[#111827]">
                      {showRevokeConfirm.name}
                    </span>
                    "? This action cannot be undone and all applications using this
                    key will immediately lose access.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowRevokeConfirm(null)}
                  className="flex-1 h-10 px-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors text-sm font-medium text-[#111827]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRevokeKey(showRevokeConfirm)}
                  className="flex-1 h-10 px-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Revoke Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
