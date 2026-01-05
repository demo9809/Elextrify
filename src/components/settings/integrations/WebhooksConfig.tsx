import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  Copy,
  RefreshCw,
  Shield,
  Activity,
  Eye
} from 'lucide-react';

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'error';
  lastTriggered?: string;
  successRate?: number;
}

export default function WebhooksConfig() {
  const navigate = useNavigate();
  
  // Mock webhook endpoints (TODO: Replace with actual API data)
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([
    {
      id: '1',
      name: 'Payment Processing',
      url: 'https://api.example.com/webhooks/payments',
      events: ['payment.success', 'payment.failed', 'refund.processed'],
      status: 'active',
      lastTriggered: '2025-12-21 15:00',
      successRate: 98.5,
    },
    {
      id: '2',
      name: 'Invoice Notifications',
      url: 'https://api.example.com/webhooks/invoices',
      events: ['invoice.created', 'invoice.paid'],
      status: 'error',
      lastTriggered: '2025-12-21 14:30',
      successRate: 75.2,
    },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookEndpoint | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formEvents, setFormEvents] = useState<string[]>([]);

  // Available events
  const availableEvents = [
    { id: 'invoice.created', label: 'Invoice Created', category: 'Invoices' },
    { id: 'invoice.paid', label: 'Invoice Paid', category: 'Invoices' },
    { id: 'invoice.overdue', label: 'Invoice Overdue', category: 'Invoices' },
    { id: 'payment.success', label: 'Payment Success', category: 'Payments' },
    { id: 'payment.failed', label: 'Payment Failed', category: 'Payments' },
    { id: 'refund.processed', label: 'Refund Processed', category: 'Payments' },
    { id: 'subscription.created', label: 'Subscription Created', category: 'Subscriptions' },
    { id: 'subscription.renewed', label: 'Subscription Renewed', category: 'Subscriptions' },
    { id: 'subscription.cancelled', label: 'Subscription Cancelled', category: 'Subscriptions' },
  ];

  const handleAddWebhook = () => {
    setSelectedWebhook(null);
    setFormName('');
    setFormUrl('');
    setFormEvents([]);
    setShowAddDialog(true);
  };

  const handleEditWebhook = (webhook: WebhookEndpoint) => {
    setSelectedWebhook(webhook);
    setFormName(webhook.name);
    setFormUrl(webhook.url);
    setFormEvents(webhook.events);
    setShowAddDialog(true);
  };

  const handleSaveWebhook = () => {
    if (selectedWebhook) {
      // Edit existing
      setWebhooks(webhooks.map(w => 
        w.id === selectedWebhook.id 
          ? { ...w, name: formName, url: formUrl, events: formEvents }
          : w
      ));
    } else {
      // Add new
      const newWebhook: WebhookEndpoint = {
        id: Date.now().toString(),
        name: formName,
        url: formUrl,
        events: formEvents,
        status: 'active',
      };
      setWebhooks([...webhooks, newWebhook]);
    }
    setShowAddDialog(false);
  };

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
    setShowDeleteDialog(null);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Webhook URL copied to clipboard');
  };

  const handleTestWebhook = (webhook: WebhookEndpoint) => {
    alert(`Testing webhook: ${webhook.name}`);
  };

  const getStatusBadge = (status: 'active' | 'inactive' | 'error') => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
            <CheckCircle className="w-3.5 h-3.5" />
            Active
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full">
            <XCircle className="w-3.5 h-3.5" />
            Error
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
            <AlertCircle className="w-3.5 h-3.5" />
            Inactive
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings/system')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to System Settings</span>
        </button>
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-purple-50 flex items-center justify-center text-3xl">
              ⚡
            </div>
            <div>
              <h1 className="text-[#111827] mb-1">Webhooks & Custom API</h1>
              <p className="text-[#6B7280]">
                Push real-time data to external systems via webhooks
              </p>
            </div>
          </div>
          
          <button
            onClick={handleAddWebhook}
            className="flex items-center gap-2 px-4 py-2 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Webhook
          </button>
        </div>
      </div>

      {/* Info Notice */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 font-medium mb-1">Secure Webhook Delivery</p>
            <p className="text-blue-700 text-sm">
              All webhooks are signed with HMAC SHA-256. Verify the signature using your webhook secret to ensure authenticity.
            </p>
          </div>
        </div>
      </div>

      {/* Webhooks List */}
      <div className="space-y-4">
        {webhooks.length === 0 ? (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F9FAFB] flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-[#6B7280]" />
            </div>
            <h3 className="text-[#111827] font-medium mb-2">No Webhooks Configured</h3>
            <p className="text-[#6B7280] text-sm mb-4">
              Add your first webhook to start receiving real-time notifications
            </p>
            <button
              onClick={handleAddWebhook}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Webhook
            </button>
          </div>
        ) : (
          webhooks.map((webhook) => (
            <div key={webhook.id} className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-[#111827] font-medium">{webhook.name}</h3>
                    {getStatusBadge(webhook.status)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-3">
                    <code className="px-2 py-1 bg-[#F9FAFB] rounded text-xs">
                      {webhook.url}
                    </code>
                    <button
                      onClick={() => handleCopyUrl(webhook.url)}
                      className="p-1 hover:bg-[#F9FAFB] rounded transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  {/* Events */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {webhook.events.map((event) => (
                      <span
                        key={event}
                        className="px-2 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs rounded"
                      >
                        {event}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  {webhook.lastTriggered && (
                    <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                      <span>Last triggered: {webhook.lastTriggered}</span>
                      {webhook.successRate !== undefined && (
                        <span>Success rate: {webhook.successRate}%</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTestWebhook(webhook)}
                    className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                    title="Test webhook"
                  >
                    <RefreshCw className="w-4 h-4 text-[#6B7280]" />
                  </button>
                  <button
                    onClick={() => handleEditWebhook(webhook)}
                    className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                    title="Edit webhook"
                  >
                    <Edit2 className="w-4 h-4 text-[#6B7280]" />
                  </button>
                  <button
                    onClick={() => setShowDeleteDialog(webhook.id)}
                    className="p-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete webhook"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                  <button
                    onClick={() => navigate(`/settings/system/integrations/webhooks/${webhook.id}/logs`)}
                    className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                    title="View logs"
                  >
                    <Eye className="w-4 h-4 text-[#6B7280]" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Dialog */}
      {showAddDialog && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowAddDialog(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-lg shadow-xl z-50 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6">
              <h3 className="text-[#111827] font-medium">
                {selectedWebhook ? 'Edit Webhook' : 'Add New Webhook'}
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Webhook Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Payment Processing"
                  className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  placeholder="https://api.example.com/webhooks/endpoint"
                  className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9480F] focus:border-transparent"
                />
              </div>

              {/* Events */}
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Subscribe to Events
                </label>
                <div className="border border-[#E5E7EB] rounded-lg p-4 max-h-64 overflow-y-auto">
                  <div className="space-y-3">
                    {['Invoices', 'Payments', 'Subscriptions'].map((category) => (
                      <div key={category}>
                        <p className="text-xs font-medium text-[#6B7280] mb-2">{category}</p>
                        <div className="space-y-2">
                          {availableEvents
                            .filter(e => e.category === category)
                            .map((event) => (
                              <label key={event.id} className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formEvents.includes(event.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFormEvents([...formEvents, event.id]);
                                    } else {
                                      setFormEvents(formEvents.filter(id => id !== event.id));
                                    }
                                  }}
                                  className="w-4 h-4 text-[#D9480F] border-[#E5E7EB] rounded focus:ring-2 focus:ring-[#D9480F]"
                                />
                                <span className="text-sm text-[#111827]">{event.label}</span>
                              </label>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] p-6 flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowAddDialog(false)}
                className="px-4 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveWebhook}
                disabled={!formName || !formUrl || formEvents.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-[#D9480F] text-white rounded-lg hover:bg-[#C23D0D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {selectedWebhook ? 'Update Webhook' : 'Add Webhook'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowDeleteDialog(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-[#111827] font-medium mb-2">Delete Webhook?</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  This webhook will stop receiving events immediately. This action cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowDeleteDialog(null)}
                className="px-4 py-2 border border-[#E5E7EB] text-[#6B7280] rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteWebhook(showDeleteDialog)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Webhook
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}