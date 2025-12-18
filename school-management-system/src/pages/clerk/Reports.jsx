/**
 * Clerk Reports Page
 * View admission reports, fee reports, and daily summary
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { BarChart3, Download, TrendingUp, Users, DollarSign, Calendar, FileText } from 'lucide-react';
import clerkService from '../../services/clerkService';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('admission'); // admission, fee, daily
  const [admissionReport, setAdmissionReport] = useState(null);
  const [feeReport, setFeeReport] = useState(null);
  const [dailySummary, setDailySummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [admissionData, feeData, dailyData] = await Promise.all([
        clerkService.getAdmissionReport(),
        clerkService.getFeeReport(),
        clerkService.getDailySummary()
      ]);
      setAdmissionReport(admissionData);
      setFeeReport(feeData);
      setDailySummary(dailyData);
    } catch (error) {
      console.error('Error loading reports:', error);
    }
    setLoading(false);
  };

  return (
    <MainLayout role="clerk">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">View comprehensive reports and daily summaries</p>
          </div>
          <Button variant="primary" className="flex-shrink-0">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('admission')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'admission'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Admission Report
            </button>
            <button
              onClick={() => setActiveTab('fee')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'fee'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Fee Report
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'daily'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Daily Summary
            </button>
          </nav>
        </div>

        {/* Admission Report */}
        {activeTab === 'admission' && admissionReport && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card padding={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Admissions</p>
                    <p className="text-2xl font-bold text-blue-600">{admissionReport.totalAdmissions}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </Card>
              <Card padding={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-green-600">{admissionReport.thisMonth}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </Card>
              <Card padding={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-purple-600">{admissionReport.approved}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </Card>
              <Card padding={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{admissionReport.pending}</p>
                  </div>
                  <Users className="w-8 h-8 text-yellow-500" />
                </div>
              </Card>
            </div>

            {/* Class-wise Admissions */}
            <Card title="Class-wise Admissions" padding={true}>
              <div className="space-y-4">
                {admissionReport.classWise.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-600">{item.class}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Class {item.class}</p>
                        <p className="text-sm text-gray-500">{item.admissions} students admitted</p>
                      </div>
                    </div>
                    <div className="flex-1 mx-8">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${(item.admissions / admissionReport.totalAdmissions) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{item.admissions}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Monthly Trend */}
            <Card title="Monthly Admission Trend" padding={true}>
              <div className="h-80 flex items-end justify-between gap-2">
                {admissionReport.monthlyTrend.map((month, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors relative group"
                         style={{ height: `${(month.count / 120) * 100}%`, minHeight: '20px' }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {month.count} admissions
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{month.month}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Fee Report */}
        {activeTab === 'fee' && feeReport && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card padding={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Collected</p>
                    <p className="text-2xl font-bold text-green-600">₹{(feeReport.totalFeeCollected / 100000).toFixed(1)}L</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </Card>
              <Card padding={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-blue-600">₹{(feeReport.thisMonth / 100000).toFixed(1)}L</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
              </Card>
              <Card padding={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-purple-600">₹{(feeReport.thisWeek / 1000).toFixed(0)}K</p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-500" />
                </div>
              </Card>
              <Card padding={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Today</p>
                    <p className="text-2xl font-bold text-orange-600">₹{(feeReport.today / 1000).toFixed(0)}K</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-orange-500" />
                </div>
              </Card>
            </div>

            {/* Class-wise Fee Collection */}
            <Card title="Class-wise Fee Collection" padding={true}>
              <div className="space-y-4">
                {feeReport.classWiseFee.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">Class {item.class}</span>
                      <span className="text-sm font-medium text-gray-600">{item.percentage}%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600 font-medium">₹{(item.collected / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-gray-500">of ₹{(item.total / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Payment Mode Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Payment Mode Breakdown" padding={true}>
                <div className="space-y-4">
                  {feeReport.paymentModeBreakdown.map((mode, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          mode.mode === 'Cash' ? 'bg-green-100' :
                          mode.mode === 'Online' ? 'bg-blue-100' :
                          mode.mode === 'Cheque' ? 'bg-purple-100' :
                          'bg-orange-100'
                        }`}>
                          <DollarSign className={`w-6 h-6 ${
                            mode.mode === 'Cash' ? 'text-green-600' :
                            mode.mode === 'Online' ? 'text-blue-600' :
                            mode.mode === 'Cheque' ? 'text-purple-600' :
                            'text-orange-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{mode.mode}</p>
                          <p className="text-sm text-gray-500">{mode.percentage}%</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">₹{(mode.amount / 100000).toFixed(1)}L</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Monthly Collection Trend */}
              <Card title="Monthly Collection" padding={true}>
                <div className="h-64 flex items-end justify-between gap-2">
                  {feeReport.monthlyCollection.map((month, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-green-500 rounded-t-lg hover:bg-green-600 transition-colors relative group"
                           style={{ height: `${(month.amount / 2500000) * 100}%`, minHeight: '20px' }}>
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ₹{(month.amount / 100000).toFixed(1)}L
                        </div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{month.month}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Daily Summary */}
        {activeTab === 'daily' && dailySummary && (
          <div className="space-y-6">
            {/* Header with Date */}
            <Card padding={true}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-blue-500" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Daily Summary</h2>
                    <p className="text-sm text-gray-600">{new Date(dailySummary.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card padding={true}>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Admissions</p>
                  <p className="text-3xl font-bold text-blue-600 mb-2">{dailySummary.admissions.new}</p>
                  <div className="flex gap-4 text-xs">
                    <span className="text-green-600">✓ {dailySummary.admissions.approved} Approved</span>
                    <span className="text-yellow-600">⏱ {dailySummary.admissions.pending} Pending</span>
                  </div>
                </div>
              </Card>
              <Card padding={true}>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Fee Collection</p>
                  <p className="text-3xl font-bold text-green-600 mb-2">₹{(dailySummary.fees.collected / 1000).toFixed(0)}K</p>
                  <div className="text-xs text-gray-500">
                    {dailySummary.fees.transactions} transactions
                  </div>
                </div>
              </Card>
              <Card padding={true}>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Documents</p>
                  <p className="text-3xl font-bold text-purple-600 mb-2">{dailySummary.documents.uploaded}</p>
                  <div className="flex gap-4 text-xs">
                    <span className="text-green-600">✓ {dailySummary.documents.verified}</span>
                    <span className="text-yellow-600">⏱ {dailySummary.documents.pending}</span>
                  </div>
                </div>
              </Card>
              <Card padding={true}>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Enquiries</p>
                  <p className="text-3xl font-bold text-orange-600 mb-2">{dailySummary.enquiries.new}</p>
                  <div className="text-xs text-gray-500">
                    {dailySummary.enquiries.converted} converted
                  </div>
                </div>
              </Card>
            </div>

            {/* Fee Collection Breakdown */}
            <Card title="Today's Fee Collection Breakdown" padding={true}>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Cash</p>
                  <p className="text-2xl font-bold text-green-600">₹{(dailySummary.fees.cash / 1000).toFixed(0)}K</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Online</p>
                  <p className="text-2xl font-bold text-blue-600">₹{(dailySummary.fees.online / 1000).toFixed(0)}K</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Cheque</p>
                  <p className="text-2xl font-bold text-purple-600">₹{(dailySummary.fees.cheque / 1000).toFixed(0)}K</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="text-2xl font-bold text-orange-600">₹{(dailySummary.fees.collected / 1000).toFixed(0)}K</p>
                </div>
              </div>
            </Card>

            {/* Activities */}
            <Card title="Today's Activities" padding={true}>
              <div className="space-y-3">
                {dailySummary.activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'fee' ? 'bg-green-100' :
                      activity.type === 'admission' ? 'bg-blue-100' :
                      activity.type === 'document' ? 'bg-purple-100' :
                      activity.type === 'tc' ? 'bg-orange-100' :
                      activity.type === 'certificate' ? 'bg-pink-100' :
                      'bg-gray-100'
                    }`}>
                      {activity.type === 'fee' ? <DollarSign className="w-5 h-5 text-green-600" /> :
                       activity.type === 'admission' ? <Users className="w-5 h-5 text-blue-600" /> :
                       activity.type === 'document' ? <FileText className="w-5 h-5 text-purple-600" /> :
                       <FileText className="w-5 h-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    {activity.amount && (
                      <span className="text-sm font-bold text-green-600">₹{activity.amount.toLocaleString()}</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Reports;
