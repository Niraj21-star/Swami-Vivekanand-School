/**
 * Admin Attendance Management Page
 * Track student and teacher attendance, manage leaves, and view reports
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import { 
  Calendar, 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download
} from 'lucide-react';
import { 
  getAttendanceData, 
  getTodayAttendance, 
  getLeaveRequests,
  approveLeave 
} from '../../services/adminService';

const AdminAttendance = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today'); // today, monthly, leaves
  const [todayData, setTodayData] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    loadAttendanceData();
  }, []);

  const loadAttendanceData = async () => {
    try {
      setLoading(true);
      const [today, attendance, leaves] = await Promise.all([
        getTodayAttendance(),
        getAttendanceData(),
        getLeaveRequests()
      ]);
      
      setTodayData(today);
      setMonthlyData(attendance.monthly);
      setLeaveRequests(leaves);
    } catch (error) {
      console.error('Error loading attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveApproval = async (id, status) => {
    try {
      const remarks = prompt(`Enter remarks for ${status}:`);
      if (remarks !== null) {
        await approveLeave(id, status, remarks);
        loadAttendanceData();
      }
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const stats = todayData ? [
    {
      title: 'Total Students',
      value: todayData.students.total,
      icon: Users,
      color: 'blue',
      change: null
    },
    {
      title: 'Students Present',
      value: todayData.students.present,
      icon: UserCheck,
      color: 'green',
      change: `${todayData.students.percentage}%`
    },
    {
      title: 'Students Absent',
      value: todayData.students.absent,
      icon: UserX,
      color: 'red',
      change: null
    },
    {
      title: 'Teachers Present',
      value: `${todayData.teachers.present}/${todayData.teachers.total}`,
      icon: TrendingUp,
      color: 'purple',
      change: `${todayData.teachers.percentage}%`
    }
  ] : [];

  const leaveColumns = [
    {
      header: 'Type',
      accessor: 'type',
      render: (value) => (
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Student' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-purple-100 text-purple-700'
          }`}
        >
          {value}
        </span>
      )
    },
    {
      header: 'Name',
      accessor: 'name',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">
            {row.class || row.designation}
          </div>
        </div>
      )
    },
    {
      header: 'Duration',
      accessor: 'from',
      render: (value, row) => (
        <div className="text-sm">
          <div className="text-gray-900">{value}</div>
          <div className="text-gray-500">to {row.to}</div>
        </div>
      )
    },
    {
      header: 'Reason',
      accessor: 'reason',
      render: (value) => (
        <div className="text-sm text-gray-700 max-w-xs truncate">{value}</div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => {
        const statusConfig = {
          'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertCircle },
          'Approved': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
          'Rejected': { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle }
        };
        const config = statusConfig[value] || statusConfig['Pending'];
        const IconComponent = config.icon;

        return (
          <div className="flex items-center gap-2">
            <IconComponent className={`w-4 h-4 ${config.text}`} />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
              {value}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (value, row) => (
        row.status === 'Pending' ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="success"
              onClick={() => handleLeaveApproval(value, 'Approved')}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleLeaveApproval(value, 'Rejected')}
            >
              Reject
            </Button>
          </div>
        ) : (
          <span className="text-sm text-gray-500">-</span>
        )
      )
    }
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading attendance data...</div>
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600 mt-1">Track and manage student & teacher attendance</p>
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
                  {stat.change && (
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
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
                onClick={() => setActiveTab('today')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'today'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Today's Attendance
              </button>
              <button
                onClick={() => setActiveTab('monthly')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'monthly'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Monthly Report
              </button>
              <button
                onClick={() => setActiveTab('leaves')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'leaves'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Leave Requests ({leaveRequests.filter(l => l.status === 'Pending').length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Today's Attendance Tab */}
            {activeTab === 'today' && todayData && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Students */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Students</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Students:</span>
                        <span className="font-semibold text-gray-900">{todayData.students.total}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Present:</span>
                        <span className="font-semibold text-green-600">{todayData.students.present}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Absent:</span>
                        <span className="font-semibold text-red-600">{todayData.students.absent}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">On Leave:</span>
                        <span className="font-semibold text-yellow-600">{todayData.students.leave}</span>
                      </div>
                      <div className="pt-3 border-t border-blue-200">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Attendance Rate:</span>
                          <span className="font-bold text-blue-600 text-xl">{todayData.students.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Teachers */}
                  <div className="bg-purple-50 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <UserCheck className="w-6 h-6 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Teachers</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Teachers:</span>
                        <span className="font-semibold text-gray-900">{todayData.teachers.total}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Present:</span>
                        <span className="font-semibold text-green-600">{todayData.teachers.present}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Absent:</span>
                        <span className="font-semibold text-red-600">{todayData.teachers.absent}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">On Leave:</span>
                        <span className="font-semibold text-yellow-600">{todayData.teachers.leave}</span>
                      </div>
                      <div className="pt-3 border-t border-purple-200">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Attendance Rate:</span>
                          <span className="font-bold text-purple-600 text-xl">{todayData.teachers.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: {new Date().toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Monthly Report Tab */}
            {activeTab === 'monthly' && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student Attendance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Teacher Attendance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {monthlyData.map((day, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(day.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{day.students}%</div>
                              <div className="ml-4 w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${day.students}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{day.teachers}%</div>
                              <div className="ml-4 w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{ width: `${day.teachers}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Leave Requests Tab */}
            {activeTab === 'leaves' && (
              <div>
                <Table columns={leaveColumns} data={leaveRequests} />
              </div>
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminAttendance;
