/**
 * Principal Dashboard
 * Overview dashboard for Principal role with attendance monitoring and key metrics
 */

import { useState, useEffect } from 'react';
import { 
  Users, 
  ClipboardCheck, 
  FileText, 
  Calendar,
  Bell,
  TrendingUp,
  Activity
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import { getDashboardData } from '../../services/principalService';

const PrincipalDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  const stats = [
    {
      title: "Today's Attendance",
      value: `${dashboardData?.todayAttendance}%`,
      icon: ClipboardCheck,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Teacher Activity',
      value: dashboardData?.teacherActivity || 0,
      icon: Activity,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Pending Approvals',
      value: dashboardData?.pendingApprovals || 0,
      icon: FileText,
      color: 'amber',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Total Students',
      value: dashboardData?.totalStudents?.toLocaleString() || 0,
      icon: Users,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Exam Schedule',
      value: dashboardData?.examSchedule || 0,
      icon: Calendar,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Notices Posted',
      value: dashboardData?.noticesPosted || 0,
      icon: Bell,
      color: 'red',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Principal Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Academic oversight and monitoring</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Create Notice
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              View Reports
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Attendance Trend Chart */}
        <Card 
          title="Attendance Trend"
          subtitle="Last 7 days overview"
          headerAction={<TrendingUp className="w-5 h-5 text-green-600" />}
          padding={false}
        >
          <div className="p-6">
            <div className="h-64 flex items-end justify-between gap-2">
              {dashboardData?.attendanceTrend?.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-blue-600 rounded-t-lg hover:bg-blue-700 transition-colors relative group" 
                       style={{ height: `${(day.percentage / 100) * 200}px` }}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {day.percentage}%
                    </div>
                  </div>
                  <span className="text-xs text-gray-600">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card title="Recent Activities" padding={false}>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData?.recentActivities?.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card title="Upcoming Events" padding={false}>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData?.upcomingEvents?.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.type === 'exam' ? 'bg-red-100 text-red-700' :
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card title="Quick Actions" padding={false}>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center group">
                <ClipboardCheck className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mx-auto mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-blue-600">View Attendance</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center group">
                <FileText className="w-8 h-8 text-gray-400 group-hover:text-green-600 mx-auto mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-green-600">Exam Results</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center group">
                <Users className="w-8 h-8 text-gray-400 group-hover:text-purple-600 mx-auto mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-purple-600">Teacher Performance</span>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all text-center group">
                <Bell className="w-8 h-8 text-gray-400 group-hover:text-amber-600 mx-auto mb-2" />
                <span className="text-sm text-gray-600 group-hover:text-amber-600">Approvals</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PrincipalDashboard;
