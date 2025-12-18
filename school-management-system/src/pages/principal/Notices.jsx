import { useState, useEffect } from 'react';
import { Bell, Plus, Eye, CheckCircle, XCircle, Clock, Send } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import * as principalService from '../../services/principalService';

const Notices = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [notices, setNotices] = useState([]);
  const [approvalsQueue, setApprovalsQueue] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: 'All',
    priority: 'Normal',
    expiryDate: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const noticeData = await principalService.getNotices();
      const approvals = await principalService.getApprovalsQueue();
      
      setNotices(noticeData);
      setApprovalsQueue(approvals);
    } catch (error) {
      console.error('Error loading notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      await principalService.createNotice(formData);
      alert('Notice created successfully!');
      setShowCreateModal(false);
      setFormData({
        title: '',
        content: '',
        targetAudience: 'All',
        priority: 'Normal',
        expiryDate: ''
      });
      loadData();
    } catch (error) {
      alert('Error creating notice');
    }
  };

  const handleApproval = async (noticeId, status, remarks) => {
    try {
      await principalService.reviewNotice(noticeId, status, remarks);
      alert(`Notice ${status.toLowerCase()} successfully!`);
      loadData();
    } catch (error) {
      alert('Error reviewing notice');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Published: 'bg-green-100 text-green-800',
      Draft: 'bg-yellow-100 text-yellow-800',
      Pending: 'bg-blue-100 text-blue-800',
      Expired: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      High: 'bg-red-100 text-red-800',
      Normal: 'bg-blue-100 text-blue-800',
      Low: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[priority]}`}>
        {priority}
      </span>
    );
  };

  const noticeColumns = [
    { 
      key: 'title', 
      label: 'Title',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.title}</p>
          <p className="text-sm text-gray-500">{new Date(row.createdDate).toLocaleDateString()}</p>
        </div>
      )
    },
    { 
      key: 'targetAudience', 
      label: 'Target Audience',
      render: (row) => <span className="text-sm text-gray-700">{row.targetAudience}</span>
    },
    { 
      key: 'priority', 
      label: 'Priority',
      render: (row) => getPriorityBadge(row.priority)
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => getStatusBadge(row.status)
    },
    { 
      key: 'createdBy', 
      label: 'Created By',
      render: (row) => <span className="text-sm text-gray-700">{row.createdBy}</span>
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Eye className="w-4 h-4" />
          </Button>
          {row.status === 'Draft' && (
            <Button size="sm" variant="primary">
              <Send className="w-4 h-4" />
            </Button>
          )}
        </div>
      )
    }
  ];

  const approvalColumns = [
    { 
      key: 'requestType', 
      label: 'Request Type',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.requestType}</p>
          <p className="text-sm text-gray-500">{row.requestedBy}</p>
        </div>
      )
    },
    { 
      key: 'description', 
      label: 'Description',
      render: (row) => <span className="text-sm text-gray-700">{row.description}</span>
    },
    { 
      key: 'requestDate', 
      label: 'Request Date',
      render: (row) => (
        <span className="text-sm text-gray-700">
          {new Date(row.requestDate).toLocaleDateString()}
        </span>
      )
    },
    { 
      key: 'priority', 
      label: 'Priority',
      render: (row) => getPriorityBadge(row.priority)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="success"
            onClick={() => handleApproval(row.id, 'Approved', 'Approved by Principal')}
          >
            <CheckCircle className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="danger"
            onClick={() => handleApproval(row.id, 'Rejected', 'Need more information')}
          >
            <XCircle className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  const filteredNotices = activeTab === 'all' 
    ? notices 
    : notices.filter(n => n.status.toLowerCase() === activeTab);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Notice Management</h1>
            <p className="text-gray-600 mt-1">Create and manage school notices and approvals</p>
          </div>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Notice
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Notices</p>
                <p className="text-2xl font-bold text-gray-900">{notices.length}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {notices.filter(n => n.status === 'Published').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-yellow-600">{approvalsQueue.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-purple-600">
                  {notices.filter(n => n.status === 'Draft').length}
                </p>
              </div>
              <Bell className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              All Notices
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'published'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setActiveTab('draft')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'draft'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Drafts
            </button>
            <button
              onClick={() => setActiveTab('approvals')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'approvals'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Pending Approvals ({approvalsQueue.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        <Card>
          {activeTab !== 'approvals' ? (
            <Table
              columns={noticeColumns}
              data={filteredNotices}
              loading={loading}
            />
          ) : (
            <Table
              columns={approvalColumns}
              data={approvalsQueue}
              loading={loading}
            />
          )}
        </Card>

        {/* Create Notice Modal */}
        {showCreateModal && (
          <Modal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            title="Create New Notice"
          >
            <form onSubmit={handleCreateNotice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter notice title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter notice content"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All</option>
                    <option value="Teachers">Teachers</option>
                    <option value="Students">Students</option>
                    <option value="Parents">Parents</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Create Notice
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </MainLayout>
  );
};

export default Notices;
