/**
 * Admin Dashboard
 * Overview page with statistics and quick actions
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign
} from 'lucide-react';
import { getStudentStats } from '../../services/studentService';
import { getTeacherStats } from '../../services/teacherService';
import { getClassStats } from '../../services/classService';
import { getFeeStats } from '../../services/feeService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    students: { total: 0, active: 0 },
    teachers: { total: 0, active: 0 },
    classes: { total: 0 },
    fees: { totalCollected: 0, totalPending: 0, collectionPercentage: 0 }
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [studentStats, teacherStats, classStats, feeStats] = await Promise.all([
        getStudentStats(),
        getTeacherStats(),
        getClassStats(),
        getFeeStats()
      ]);

      setStats({
        students: studentStats,
        teachers: teacherStats,
        classes: classStats,
        fees: feeStats
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Students',
      value: stats.students.total,
      subtitle: `${stats.students.active} Active`,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+12%',
      trendUp: true,
      onClick: () => navigate('/admin/students')
    },
    {
      title: 'Total Teachers',
      value: stats.teachers.total,
      subtitle: `${stats.teachers.active} Active`,
      icon: GraduationCap,
      color: 'bg-green-500',
      trend: '+5%',
      trendUp: true,
      onClick: () => navigate('/admin/teachers')
    },
    {
      title: 'Total Classes',
      value: stats.classes.total,
      subtitle: `${stats.classes.totalEnrolled} Students Enrolled`,
      icon: BookOpen,
      color: 'bg-purple-500',
      trend: '+3%',
      trendUp: true,
      onClick: () => navigate('/admin/classes')
    },
    {
      title: 'Fee Collection',
      value: `${stats.fees.collectionPercentage}%`,
      subtitle: `$${stats.fees.totalCollected.toLocaleString()} Collected`,
      icon: CreditCard,
      color: 'bg-amber-500',
      trend: '+8%',
      trendUp: true,
      onClick: () => navigate('/admin/fees')
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New student enrolled', name: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'Fee payment received', name: 'Emily Johnson', time: '3 hours ago' },
    { id: 3, action: 'Teacher added', name: 'Sarah Williams', time: '5 hours ago' },
    { id: 4, action: 'Class schedule updated', name: 'Class 10-A', time: '1 day ago' }
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={stat.onClick}
              padding={false}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.trend}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts and Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card title="Recent Activities" className="lg:col-span-2">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.name}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="space-y-2">
              <button
                onClick={() => navigate('/admin/students?action=add')}
                className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Add New Student
              </button>
              <button
                onClick={() => navigate('/admin/teachers?action=add')}
                className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
              >
                Add New Teacher
              </button>
              <button
                onClick={() => navigate('/admin/classes?action=add')}
                className="w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
              >
                Create New Class
              </button>
              <button
                onClick={() => navigate('/admin/fees')}
                className="w-full text-left px-4 py-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
              >
                View Fee Records
              </button>
              <button
                onClick={() => navigate('/admin/reports')}
                className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Generate Reports
              </button>
            </div>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card title="Upcoming Events">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Dec 20, 2025</span>
              </div>
              <h4 className="font-medium text-gray-900">Parent-Teacher Meeting</h4>
              <p className="text-sm text-gray-600 mt-1">Annual PTM for all classes</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Dec 25, 2025</span>
              </div>
              <h4 className="font-medium text-gray-900">Winter Break Starts</h4>
              <p className="text-sm text-gray-600 mt-1">School closes for holidays</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Jan 02, 2026</span>
              </div>
              <h4 className="font-medium text-gray-900">School Reopens</h4>
              <p className="text-sm text-gray-600 mt-1">Classes resume after break</p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
