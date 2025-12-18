/**
 * Admin Fee Management Page
 * Manage fee structure, payments, defaulters, and financial tracking
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Receipt,
  Download,
  Edit,
  Eye,
  CreditCard
} from 'lucide-react';
import { 
  getFeeStructure,
  getFeeCollection,
  getDefaulters,
  getRecentPayments
} from '../../services/adminService';

const AdminFees = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('structure'); // structure, collection, defaulters, payments
  const [feeStructure, setFeeStructure] = useState([]);
  const [collection, setCollection] = useState(null);
  const [defaulters, setDefaulters] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadFeeData();
  }, []);

  const loadFeeData = async () => {
    try {
      setLoading(true);
      const [structure, coll, def, pay] = await Promise.all([
        getFeeStructure(),
        getFeeCollection(),
        getDefaulters(),
        getRecentPayments()
      ]);
      
      setFeeStructure(structure);
      setCollection(coll);
      setDefaulters(def);
      setPayments(pay);
    } catch (error) {
      console.error('Error loading fee data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = collection ? [
    {
      title: 'Total Expected',
      value: `₹${(collection.totalExpected / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Total Collected',
      value: `₹${(collection.totalCollected / 100000).toFixed(1)}L`,
      icon: TrendingUp,
      color: 'green',
      percentage: `${collection.collectionPercentage}%`
    },
    {
      title: 'Pending Amount',
      value: `₹${(collection.totalPending / 100000).toFixed(1)}L`,
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'This Month',
      value: `₹${(collection.currentMonth.collected / 1000).toFixed(0)}K`,
      icon: Receipt,
      color: 'purple',
      subtext: `of ₹${(collection.currentMonth.expected / 1000).toFixed(0)}K`
    }
  ] : [];

  const structureColumns = [
    {
      header: 'Class',
      accessor: 'class'
    },
    {
      header: 'Tuition Fee',
      accessor: 'tuitionFee',
      render: (value) => `₹${value.toLocaleString()}`
    },
    {
      header: 'Lab Fee',
      accessor: 'labFee',
      render: (value) => `₹${value.toLocaleString()}`
    },
    {
      header: 'Library Fee',
      accessor: 'libraryFee',
      render: (value) => `₹${value.toLocaleString()}`
    },
    {
      header: 'Sports Fee',
      accessor: 'sportsFee',
      render: (value) => `₹${value.toLocaleString()}`
    },
    {
      header: 'Total',
      accessor: 'total',
      render: (value) => (
        <span className="font-semibold text-gray-900">₹{value.toLocaleString()}</span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: () => (
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Edit className="w-4 h-4" />
        </button>
      )
    }
  ];

  const defaultersColumns = [
    {
      header: 'Admission No',
      accessor: 'admissionNo'
    },
    {
      header: 'Student',
      accessor: 'studentName',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.class}</div>
        </div>
      )
    },
    {
      header: 'Total Fee',
      accessor: 'totalFee',
      render: (value) => `₹${value.toLocaleString()}`
    },
    {
      header: 'Paid',
      accessor: 'paid',
      render: (value) => (
        <span className="text-green-600">₹{value.toLocaleString()}</span>
      )
    },
    {
      header: 'Pending',
      accessor: 'pending',
      render: (value) => (
        <span className="font-semibold text-red-600">₹{value.toLocaleString()}</span>
      )
    },
    {
      header: 'Last Payment',
      accessor: 'lastPayment'
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Overdue' 
              ? 'bg-red-100 text-red-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {value}
        </span>
      )
    }
  ];

  const paymentsColumns = [
    {
      header: 'Receipt No',
      accessor: 'receiptNo'
    },
    {
      header: 'Student',
      accessor: 'studentName',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.class}</div>
        </div>
      )
    },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (value) => (
        <span className="font-semibold text-green-600">₹{value.toLocaleString()}</span>
      )
    },
    {
      header: 'Payment Mode',
      accessor: 'paymentMode',
      render: (value) => (
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700">{value}</span>
        </div>
      )
    },
    {
      header: 'Date',
      accessor: 'date'
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          {value}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: () => (
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading fee data...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fee Management</h1>
            <p className="text-gray-600 mt-1">Manage fee structure, payments, and collections</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Report</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  {stat.percentage && (
                    <p className="text-sm text-green-600 mt-1">{stat.percentage}</p>
                  )}
                  {stat.subtext && (
                    <p className="text-sm text-gray-500 mt-1">{stat.subtext}</p>
                  )}
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Card>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('structure')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'structure'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Fee Structure
              </button>
              <button
                onClick={() => setActiveTab('collection')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'collection'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Collection Status
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
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'payments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Recent Payments
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Fee Structure Tab */}
            {activeTab === 'structure' && (
              <Table columns={structureColumns} data={feeStructure} />
            )}

            {/* Collection Status Tab */}
            {activeTab === 'collection' && collection && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Collection</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected:</span>
                        <span className="font-semibold">₹{collection.totalExpected.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Collected:</span>
                        <span className="font-semibold text-green-600">₹{collection.totalCollected.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pending:</span>
                        <span className="font-semibold text-red-600">₹{collection.totalPending.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-blue-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Collection Rate:</span>
                          <span className="font-bold text-blue-600 text-xl">{collection.collectionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                          <div 
                            className="bg-blue-600 h-3 rounded-full"
                            style={{ width: `${collection.collectionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Month</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected:</span>
                        <span className="font-semibold">₹{collection.currentMonth.expected.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Collected:</span>
                        <span className="font-semibold text-green-600">₹{collection.currentMonth.collected.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pending:</span>
                        <span className="font-semibold text-red-600">₹{collection.currentMonth.pending.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-purple-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Collection Rate:</span>
                          <span className="font-bold text-purple-600 text-xl">
                            {((collection.currentMonth.collected / collection.currentMonth.expected) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                          <div 
                            className="bg-purple-600 h-3 rounded-full"
                            style={{ width: `${(collection.currentMonth.collected / collection.currentMonth.expected) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Defaulters Tab */}
            {activeTab === 'defaulters' && (
              <Table columns={defaultersColumns} data={defaulters} />
            )}

            {/* Recent Payments Tab */}
            {activeTab === 'payments' && (
              <Table columns={paymentsColumns} data={payments} />
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminFees;
