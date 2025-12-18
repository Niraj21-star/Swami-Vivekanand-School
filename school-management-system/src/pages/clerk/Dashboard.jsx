/**
 * Clerk Dashboard
 * Overview dashboard for Clerk role with admissions, fees, and document management
 */

import { useState, useEffect } from 'react';
import { 
  UserPlus, 
  DollarSign, 
  FileText, 
  Users,
  AlertCircle,
  Phone,
  Upload,
  Receipt
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import { getDashboardData } from '../../services/clerkService';

const ClerkDashboard = () => {
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
      title: "Today's Admissions",
      value: dashboardData?.todayAdmissions || 0,
      icon: UserPlus,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: "Today's Fee Collection",
      value: `₹${(dashboardData?.todayFees || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Pending Documents',
      value: dashboardData?.pendingDocuments || 0,
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
      title: 'Pending Fees',
      value: `₹${(dashboardData?.pendingFees || 0).toLocaleString()}`,
      icon: AlertCircle,
      color: 'red',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      title: 'New Enquiries',
      value: dashboardData?.newEnquiries || 0,
      icon: Phone,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clerk Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Administrative and office operations</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              New Admission
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Collect Fee
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

        {/* Fee Collection Chart */}
        <Card 
          title="Fee Collection Trend"
          subtitle="Last 7 days overview"
          headerAction={<DollarSign className="w-5 h-5 text-green-600" />}
          padding={false}
        >
          <div className="p-6">
            <div className="h-64 flex items-end justify-between gap-2">
              {dashboardData?.feeCollectionTrend?.map((day, index) => {
                const maxAmount = Math.max(...dashboardData.feeCollectionTrend.map(d => d.amount));
                const height = (day.amount / maxAmount) * 200;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-green-600 rounded-t-lg hover:bg-green-700 transition-colors relative group" 
                         style={{ height: `${height}px` }}>
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ₹{day.amount.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions" padding={false}>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all text-center group">
                <UserPlus className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <span className="text-sm font-medium text-blue-700">New Admission</span>
              </button>
              <button className="p-6 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-all text-center group">
                <DollarSign className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <span className="text-sm font-medium text-green-700">Collect Fee</span>
              </button>
              <button className="p-6 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 hover:border-purple-300 transition-all text-center group">
                <FileText className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <span className="text-sm font-medium text-purple-700">Generate TC</span>
              </button>
              <button className="p-6 bg-amber-50 border-2 border-amber-200 rounded-lg hover:bg-amber-100 hover:border-amber-300 transition-all text-center group">
                <Upload className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                <span className="text-sm font-medium text-amber-700">Upload Document</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card title="Recent Activities" padding={false}>
          <div className="p-6">
            <div className="space-y-3">
              {dashboardData?.recentActivities?.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {activity.action.includes('Fee') && <DollarSign className="w-5 h-5 text-blue-600" />}
                      {activity.action.includes('admission') && <UserPlus className="w-5 h-5 text-blue-600" />}
                      {activity.action.includes('TC') && <FileText className="w-5 h-5 text-blue-600" />}
                      {activity.action.includes('Document') && <Upload className="w-5 h-5 text-blue-600" />}
                      {activity.action.includes('receipt') && <Receipt className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  {activity.amount && (
                    <span className="text-sm font-semibold text-green-600">
                      ₹{activity.amount.toLocaleString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-center py-6">
              <UserPlus className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-blue-900">{dashboardData?.todayAdmissions || 0}</h3>
              <p className="text-sm text-blue-700 mt-1">Admissions Today</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-center py-6">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-900">₹{(dashboardData?.todayFees || 0).toLocaleString()}</h3>
              <p className="text-sm text-green-700 mt-1">Collected Today</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <div className="text-center py-6">
              <FileText className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-amber-900">{dashboardData?.pendingDocuments || 0}</h3>
              <p className="text-sm text-amber-700 mt-1">Pending Documents</p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClerkDashboard;
