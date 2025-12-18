/**
 * Clerk Fee Management Page
 * Collect fees, manage receipts, track pending fees and defaulters
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { DollarSign, Search, Receipt, AlertCircle, Send, Printer, Download } from 'lucide-react';
import clerkService from '../../services/clerkService';

const FeeManagement = () => {
  const [activeTab, setActiveTab] = useState('collect'); // collect, receipts, pending, defaulters
  const [students, setStudents] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [pendingFees, setPendingFees] = useState([]);
  const [defaulters, setDefaulters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [feeForm, setFeeForm] = useState({
    studentId: '',
    amount: '',
    paymentMode: 'Cash',
    transactionId: '',
    remarks: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsData, receiptsData, pendingData, defaultersData] = await Promise.all([
        clerkService.getAdvancedStudentRecords(),
        clerkService.getFeeReceipts(),
        clerkService.getPendingFees(),
        clerkService.getFeeDefaulters()
      ]);
      setStudents(studentsData);
      setReceipts(receiptsData);
      setPendingFees(pendingData);
      setDefaulters(defaultersData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleCollectFee = async (e) => {
    e.preventDefault();
    try {
      await clerkService.collectFee(feeForm);
      alert('Fee collected successfully!');
      setShowCollectModal(false);
      setFeeForm({
        studentId: '',
        amount: '',
        paymentMode: 'Cash',
        transactionId: '',
        remarks: ''
      });
      loadData();
    } catch (error) {
      alert('Error collecting fee');
    }
  };

  const handleSearchStudent = async () => {
    if (!searchTerm) return;
    try {
      const results = await clerkService.searchStudent(searchTerm, 'admissionNo');
      if (results.length > 0) {
        const student = results[0];
        const feeDetails = await clerkService.getStudentFeeDetails(student.id);
        setSelectedStudent({ ...student, feeDetails });
      } else {
        alert('Student not found');
      }
    } catch (error) {
      alert('Error searching student');
    }
  };

  const handleSendReminder = async (studentIds, type) => {
    try {
      await clerkService.bulkSendFeeReminder(studentIds, type);
      alert(`${type.toUpperCase()} reminders sent successfully!`);
    } catch (error) {
      alert('Error sending reminders');
    }
  };

  const collectColumns = [
    { 
      key: 'admissionNo', 
      label: 'Admission No',
      render: (row) => <span className="font-mono text-sm">{row.admissionNo}</span>
    },
    { 
      key: 'fullName', 
      label: 'Student Name',
      render: (row) => <span className="font-medium">{row.fullName}</span>
    },
    { 
      key: 'class', 
      label: 'Class',
      render: (row) => `${row.class}-${row.section}`
    },
    { 
      key: 'feeDetails', 
      label: 'Total Fee',
      render: (row) => <span className="text-green-600 font-medium">₹{row.feeDetails?.totalFee}</span>
    },
    { 
      key: 'feeDetails', 
      label: 'Paid',
      render: (row) => <span className="text-blue-600">₹{row.feeDetails?.paidAmount}</span>
    },
    { 
      key: 'feeDetails', 
      label: 'Pending',
      render: (row) => <span className="text-red-600 font-medium">₹{row.feeDetails?.pendingAmount}</span>
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            setSelectedStudent(row);
            setFeeForm({ ...feeForm, studentId: row.id });
            setShowCollectModal(true);
          }}
          disabled={row.feeDetails?.pendingAmount === 0}
        >
          <DollarSign className="w-4 h-4 mr-1" />
          Collect
        </Button>
      )
    }
  ];

  const receiptColumns = [
    { 
      key: 'receiptNo', 
      label: 'Receipt No',
      render: (row) => <span className="font-mono text-sm">{row.receiptNo}</span>
    },
    { key: 'studentName', label: 'Student' },
    { key: 'class', label: 'Class' },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (row) => <span className="text-green-600 font-medium">₹{row.amount}</span>
    },
    { key: 'paymentMode', label: 'Mode' },
    { 
      key: 'paymentDate', 
      label: 'Date',
      render: (row) => new Date(row.paymentDate).toLocaleDateString()
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Button size="sm" variant="outline">
          <Printer className="w-4 h-4" />
        </Button>
      )
    }
  ];

  const pendingColumns = [
    { key: 'studentName', label: 'Student' },
    { key: 'admissionNo', label: 'Admission No' },
    { key: 'class', label: 'Class' },
    { 
      key: 'totalFee', 
      label: 'Total Fee',
      render: (row) => `₹${row.totalFee}`
    },
    { 
      key: 'paidAmount', 
      label: 'Paid',
      render: (row) => `₹${row.paidAmount}`
    },
    { 
      key: 'pendingAmount', 
      label: 'Pending',
      render: (row) => <span className="text-red-600 font-medium">₹{row.pendingAmount}</span>
    },
    { key: 'parentContact', label: 'Contact' },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleSendReminder([row.studentId], 'sms')}
        >
          <Send className="w-4 h-4 mr-1" />
          Send SMS
        </Button>
      )
    }
  ];

  const defaulterColumns = [
    { key: 'studentName', label: 'Student' },
    { key: 'class', label: 'Class' },
    { 
      key: 'pendingAmount', 
      label: 'Pending Amount',
      render: (row) => <span className="text-red-600 font-bold">₹{row.pendingAmount}</span>
    },
    { 
      key: 'daysOverdue', 
      label: 'Days Overdue',
      render: (row) => (
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
          {row.daysOverdue} days
        </span>
      )
    },
    { 
      key: 'lastPaymentDate', 
      label: 'Last Payment',
      render: (row) => new Date(row.lastPaymentDate).toLocaleDateString()
    },
    { key: 'parentContact', label: 'Contact' },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleSendReminder([row.studentId], 'sms')}
          >
            <Send className="w-4 h-4 mr-1" />
            Reminder
          </Button>
        </div>
      )
    }
  ];

  const stats = {
    totalCollected: receipts.reduce((sum, r) => sum + r.amount, 0),
    todayCollection: receipts
      .filter(r => new Date(r.paymentDate).toDateString() === new Date().toDateString())
      .reduce((sum, r) => sum + r.amount, 0),
    totalPending: pendingFees.reduce((sum, p) => sum + p.pendingAmount, 0),
    defaultersCount: defaulters.length
  };

  return (
    <MainLayout role="clerk">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fee Management</h1>
            <p className="text-gray-600 mt-1">Collect fees and manage payments</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Export Report</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button 
              variant="primary" 
              onClick={() => {
                setSelectedStudent(null);
                setShowCollectModal(true);
              }}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Collect Fee</span>
              <span className="sm:hidden">Collect</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Collected</p>
                <p className="text-2xl font-bold text-green-600">₹{stats.totalCollected.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Collection</p>
                <p className="text-2xl font-bold text-blue-600">₹{stats.todayCollection.toLocaleString()}</p>
              </div>
              <Receipt className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pending</p>
                <p className="text-2xl font-bold text-red-600">₹{stats.totalPending.toLocaleString()}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Defaulters</p>
                <p className="text-2xl font-bold text-orange-600">{stats.defaultersCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('collect')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'collect'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Collect Fee
            </button>
            <button
              onClick={() => setActiveTab('receipts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'receipts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Receipts ({receipts.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending ({pendingFees.length})
            </button>
            <button
              onClick={() => setActiveTab('defaulters')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'defaulters'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Defaulters ({defaulters.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        <Card>
          {activeTab === 'collect' && (
            <Table
              columns={collectColumns}
              data={students}
              loading={loading}
            />
          )}
          {activeTab === 'receipts' && (
            <Table
              columns={receiptColumns}
              data={receipts}
              loading={loading}
            />
          )}
          {activeTab === 'pending' && (
            <>
              <div className="p-4 border-b border-gray-200">
                <Button
                  variant="primary"
                  onClick={() => handleSendReminder(pendingFees.map(p => p.studentId), 'sms')}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Bulk SMS Reminder
                </Button>
              </div>
              <Table
                columns={pendingColumns}
                data={pendingFees}
                loading={loading}
              />
            </>
          )}
          {activeTab === 'defaulters' && (
            <>
              <div className="p-4 bg-red-50 border-b border-red-200">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <p className="font-medium">{defaulters.length} students have overdue fees</p>
                </div>
              </div>
              <Table
                columns={defaulterColumns}
                data={defaulters}
                loading={loading}
              />
            </>
          )}
        </Card>
      </div>

      {/* Collect Fee Modal */}
      <Modal
        isOpen={showCollectModal}
        onClose={() => {
          setShowCollectModal(false);
          setSelectedStudent(null);
        }}
        title="Collect Fee"
      >
        {!selectedStudent ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Student by Admission No
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter admission number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <Button variant="primary" onClick={handleSearchStudent}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCollectFee} className="space-y-4">
            {/* Student Info */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-600">Student</p>
                  <p className="font-medium">{selectedStudent.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Class</p>
                  <p className="font-medium">{selectedStudent.class}-{selectedStudent.section}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Fee</p>
                  <p className="font-medium text-green-600">₹{selectedStudent.feeDetails?.totalFee}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Pending</p>
                  <p className="font-medium text-red-600">₹{selectedStudent.feeDetails?.pendingAmount}</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount *
              </label>
              <input
                type="number"
                required
                value={feeForm.amount}
                onChange={(e) => setFeeForm({ ...feeForm, amount: e.target.value })}
                max={selectedStudent.feeDetails?.pendingAmount}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Mode *
              </label>
              <select
                required
                value={feeForm.paymentMode}
                onChange={(e) => setFeeForm({ ...feeForm, paymentMode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="Cheque">Cheque</option>
                <option value="DD">DD</option>
              </select>
            </div>
            {(feeForm.paymentMode === 'Online' || feeForm.paymentMode === 'Cheque' || feeForm.paymentMode === 'DD') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction ID / Cheque No
                </label>
                <input
                  type="text"
                  value={feeForm.transactionId}
                  onChange={(e) => setFeeForm({ ...feeForm, transactionId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Remarks
              </label>
              <textarea
                value={feeForm.remarks}
                onChange={(e) => setFeeForm({ ...feeForm, remarks: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowCollectModal(false);
                  setSelectedStudent(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                <Receipt className="w-4 h-4 mr-2" />
                Collect & Generate Receipt
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </MainLayout>
  );
};

export default FeeManagement;
