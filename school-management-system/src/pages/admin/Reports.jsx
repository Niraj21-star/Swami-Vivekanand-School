/**
 * Admin Reports Page
 * Comprehensive reports: academic, attendance, financial with analytics
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import { 
  FileText, 
  TrendingUp, 
  Users, 
  DollarSign,
  Download,
  BarChart3,
  Calendar,
  Award
} from 'lucide-react';
import { 
  getAcademicReport,
  getAttendanceReport,
  getFinancialReport
} from '../../services/adminService';

const AdminReports = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('academic'); // academic, attendance, financial
  const [academicData, setAcademicData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const [academic, attendance, financial] = await Promise.all([
        getAcademicReport(),
        getAttendanceReport(),
        getFinancialReport()
      ]);
      
      setAcademicData(academic);
      setAttendanceData(attendance);
      setFinancialData(financial);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const academicClassColumns = [
    {
      header: 'Class',
      accessor: 'class'
    },
    {
      header: 'Students',
      accessor: 'students'
    },
    {
      header: 'Passed',
      accessor: 'pass',
      render: (value, row) => (
        <span className="text-green-600">{value} ({row.passPercentage}%)</span>
      )
    },
    {
      header: 'Average Marks',
      accessor: 'average',
      render: (value) => (
        <span className="font-medium">{value}%</span>
      )
    },
    {
      header: 'Topper',
      accessor: 'topper',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-yellow-500" />
          <span className="text-sm">{value}</span>
        </div>
      )
    }
  ];

  const academicSubjectColumns = [
    {
      header: 'Subject',
      accessor: 'subject'
    },
    {
      header: 'Average Marks',
      accessor: 'average',
      render: (value) => (
        <div className="flex items-center gap-3">
          <span className="font-medium">{value}%</span>
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      )
    },
    {
      header: 'Pass %',
      accessor: 'passPercentage',
      render: (value) => (
        <span className={value >= 90 ? 'text-green-600 font-medium' : 'text-gray-900'}>
          {value}%
        </span>
      )
    },
    {
      header: 'Highest',
      accessor: 'highest',
      render: (value) => <span className="text-green-600">{value}</span>
    },
    {
      header: 'Lowest',
      accessor: 'lowest',
      render: (value) => <span className="text-red-600">{value}</span>
    }
  ];

  const attendanceClassColumns = [
    {
      header: 'Class',
      accessor: 'class'
    },
    {
      header: 'Attendance %',
      accessor: 'attendance',
      render: (value) => (
        <div className="flex items-center gap-3">
          <span className="font-medium">{value}%</span>
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${value >= 95 ? 'bg-green-600' : value >= 90 ? 'bg-yellow-600' : 'bg-red-600'}`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      )
    },
    {
      header: 'Working Days',
      accessor: 'workingDays'
    },
    {
      header: 'Present',
      accessor: 'present',
      render: (value) => <span className="text-green-600">{value}</span>
    },
    {
      header: 'Absent',
      accessor: 'absent',
      render: (value) => <span className="text-red-600">{value}</span>
    }
  ];

  const financialMonthColumns = [
    {
      header: 'Month',
      accessor: 'month'
    },
    {
      header: 'Income',
      accessor: 'income',
      render: (value) => (
        <span className="text-green-600 font-medium">₹{value.toLocaleString()}</span>
      )
    },
    {
      header: 'Expenses',
      accessor: 'expenses',
      render: (value) => (
        <span className="text-red-600 font-medium">₹{value.toLocaleString()}</span>
      )
    },
    {
      header: 'Profit',
      accessor: 'profit',
      render: (value) => (
        <span className={`font-semibold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ₹{value.toLocaleString()}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading reports...</div>
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive school performance reports</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export All</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Card>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('academic')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'academic'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Academic Report
                </div>
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'attendance'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Attendance Report
                </div>
              </button>
              <button
                onClick={() => setActiveTab('financial')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'financial'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Financial Report
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Academic Report Tab */}
            {activeTab === 'academic' && academicData && (
              <div className="space-y-6">
                {/* Overall Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Card padding="md" className="bg-blue-50">
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{academicData.overall.totalStudents}</p>
                  </Card>
                  <Card padding="md" className="bg-green-50">
                    <p className="text-sm text-gray-600">Pass %</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{academicData.overall.passPercentage}%</p>
                  </Card>
                  <Card padding="md" className="bg-purple-50">
                    <p className="text-sm text-gray-600">Avg Marks</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">{academicData.overall.averageMarks}%</p>
                  </Card>
                  <Card padding="md" className="bg-yellow-50">
                    <p className="text-sm text-gray-600">Toppers</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">{academicData.overall.toppers}</p>
                  </Card>
                  <Card padding="md" className="bg-red-50">
                    <p className="text-sm text-gray-600">Failures</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{academicData.overall.failures}</p>
                  </Card>
                </div>

                {/* Class-wise Performance */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Class-wise Performance</h3>
                  <Table columns={academicClassColumns} data={academicData.classwise} />
                </div>

                {/* Subject-wise Performance */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h3>
                  <Table columns={academicSubjectColumns} data={academicData.subjectwise} />
                </div>
              </div>
            )}

            {/* Attendance Report Tab */}
            {activeTab === 'attendance' && attendanceData && (
              <div className="space-y-6">
                {/* Overall Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card padding="md" className="bg-blue-50">
                    <p className="text-sm text-gray-600">Average Attendance</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{attendanceData.overall.averageAttendance}%</p>
                  </Card>
                  <Card padding="md" className="bg-green-50">
                    <p className="text-sm text-gray-600">Working Days</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{attendanceData.overall.totalWorkingDays}</p>
                  </Card>
                  <Card padding="md" className="bg-purple-50">
                    <p className="text-sm text-gray-600">Total Present</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{attendanceData.overall.totalPresentDays.toLocaleString()}</p>
                  </Card>
                  <Card padding="md" className="bg-orange-50">
                    <p className="text-sm text-gray-600">Student-Days</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{attendanceData.overall.totalStudentDays.toLocaleString()}</p>
                  </Card>
                </div>

                {/* Class-wise Attendance */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Class-wise Attendance</h3>
                  <Table columns={attendanceClassColumns} data={attendanceData.classwise} />
                </div>

                {/* Monthly Trend */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Attendance Trend</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {attendanceData.monthly.map((month, index) => (
                      <Card key={index} padding="md">
                        <p className="text-sm text-gray-600">{month.month}</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">{month.attendance}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${month.attendance}%` }}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Financial Report Tab */}
            {activeTab === 'financial' && financialData && (
              <div className="space-y-6">
                {/* Income & Expenses Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Income */}
                  <Card padding="md" className="bg-green-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Total Income
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tuition Fees:</span>
                        <span className="font-medium">₹{financialData.income.tuitionFees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lab Fees:</span>
                        <span className="font-medium">₹{financialData.income.labFees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Library Fees:</span>
                        <span className="font-medium">₹{financialData.income.libraryFees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sports Fees:</span>
                        <span className="font-medium">₹{financialData.income.sportsFees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Other:</span>
                        <span className="font-medium">₹{financialData.income.other.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-green-200 flex justify-between">
                        <span className="font-semibold text-gray-900">Total:</span>
                        <span className="font-bold text-green-600 text-xl">₹{financialData.income.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Expenses */}
                  <Card padding="md" className="bg-red-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-red-600" />
                      Total Expenses
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salaries:</span>
                        <span className="font-medium">₹{financialData.expenses.salaries.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maintenance:</span>
                        <span className="font-medium">₹{financialData.expenses.maintenance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Utilities:</span>
                        <span className="font-medium">₹{financialData.expenses.utilities.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Supplies:</span>
                        <span className="font-medium">₹{financialData.expenses.supplies.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Other:</span>
                        <span className="font-medium">₹{financialData.expenses.other.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-red-200 flex justify-between">
                        <span className="font-semibold text-gray-900">Total:</span>
                        <span className="font-bold text-red-600 text-xl">₹{financialData.expenses.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Net Profit */}
                <Card padding="md" className="bg-blue-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Net Profit</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      ₹{(financialData.income.total - financialData.expenses.total).toLocaleString()}
                    </p>
                  </div>
                </Card>

                {/* Monthly Trend */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Financial Trend</h3>
                  <Table columns={financialMonthColumns} data={financialData.monthlyTrend} />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminReports;
