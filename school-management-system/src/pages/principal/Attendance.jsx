import { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp, Download, Filter, Search } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import * as principalService from '../../services/principalService';

const Attendance = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [classwiseData, setClasswiseData] = useState([]);
  const [monthlyData, setMonthlyData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    loadData();
  }, [selectedMonth]);

  const loadData = async () => {
    try {
      setLoading(true);
      const classwise = await principalService.getClasswiseAttendance();
      const monthly = await principalService.getMonthlyAttendance(selectedMonth);
      setClasswiseData(classwise);
      setMonthlyData(monthly);
    } catch (error) {
      console.error('Error loading attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const classwiseColumns = [
    { key: 'class', label: 'Class' },
    { 
      key: 'totalStudents', 
      label: 'Total Students',
      render: (row) => <span className="font-medium">{row.totalStudents}</span>
    },
    { 
      key: 'present', 
      label: 'Present',
      render: (row) => <span className="text-green-600 font-medium">{row.present}</span>
    },
    { 
      key: 'absent', 
      label: 'Absent',
      render: (row) => <span className="text-red-600 font-medium">{row.absent}</span>
    },
    { 
      key: 'percentage', 
      label: 'Attendance %',
      render: (row) => (
        <span className={`font-bold ${getStatusColor(row.percentage)}`}>
          {row.percentage}%
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Button size="sm" variant="outline">
          View Details
        </Button>
      )
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600 mt-1">Monitor and analyze student attendance</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Attendance</p>
                <p className="text-2xl font-bold text-gray-900">94.5%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Present</p>
                <p className="text-2xl font-bold text-green-600">1,167</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Absent</p>
                <p className="text-2xl font-bold text-red-600">68</p>
              </div>
              <Users className="w-8 h-8 text-red-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">1,235</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Class-wise Overview
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'monthly'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly Report
            </button>
          </nav>
        </div>

        {/* Content */}
        <Card>
          {activeTab === 'overview' && (
            <Table
              columns={classwiseColumns}
              data={classwiseData}
              loading={loading}
            />
          )}
          
          {activeTab === 'monthly' && monthlyData && (
            <div className="space-y-6">
              {/* Month Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Select Month:</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(2024, i, 1).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monthly Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Working Days</p>
                  <p className="text-3xl font-bold text-blue-900 mt-2">{monthlyData.workingDays}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Average Attendance</p>
                  <p className="text-3xl font-bold text-green-900 mt-2">{monthlyData.averageAttendance}%</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Total Student Days</p>
                  <p className="text-3xl font-bold text-purple-900 mt-2">{monthlyData.totalStudentDays}</p>
                </div>
              </div>

              {/* Class-wise Monthly Data */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Class-wise Monthly Attendance</h3>
                <div className="space-y-3">
                  {monthlyData.classWise.map((cls) => (
                    <div key={cls.class} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{cls.class}</p>
                        <p className="text-sm text-gray-600">
                          {cls.totalStudents} students • {cls.totalDays} total days
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getStatusColor(cls.percentage)}`}>
                          {cls.percentage}%
                        </p>
                        <p className="text-sm text-gray-600">
                          {cls.present} present / {cls.absent} absent
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Trend */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trend</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {monthlyData.weeklyTrend.map((week) => (
                    <div key={week.week} className="p-4 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium">{week.week}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{week.percentage}%</p>
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Present: {week.present}</p>
                        <p>Absent: {week.absent}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default Attendance;
