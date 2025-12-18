import { useState, useEffect } from 'react';
import { GraduationCap, Star, TrendingUp, Award, Search, Filter, Download } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import * as principalService from '../../services/principalService';

const Teachers = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('directory');
  const [teacherDirectory, setTeacherDirectory] = useState([]);
  const [teacherPerformance, setTeacherPerformance] = useState([]);
  const [teacherAttendance, setTeacherAttendance] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const directory = await principalService.getTeacherDirectory();
      const performance = await principalService.getTeacherPerformance();
      const attendance = await principalService.getTeacherAttendance();
      
      setTeacherDirectory(directory);
      setTeacherPerformance(performance);
      setTeacherAttendance(attendance);
    } catch (error) {
      console.error('Error loading teacher data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingStars = (rating) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const directoryColumns = [
    { 
      key: 'fullName', 
      label: 'Teacher Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.photo || '/placeholder-avatar.png'}
            alt={row.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{row.fullName}</p>
            <p className="text-sm text-gray-500">{row.employeeId}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'subjects', 
      label: 'Subjects',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.subjects.slice(0, 2).map((subject, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {subject}
            </span>
          ))}
          {row.subjects.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{row.subjects.length - 2}
            </span>
          )}
        </div>
      )
    },
    { 
      key: 'classes', 
      label: 'Classes',
      render: (row) => (
        <span className="text-sm text-gray-700">{row.classes.join(', ')}</span>
      )
    },
    { 
      key: 'experience', 
      label: 'Experience',
      render: (row) => <span className="text-sm text-gray-700">{row.experience} years</span>
    },
    { 
      key: 'attendancePercentage', 
      label: 'Attendance',
      render: (row) => (
        <span className={`font-bold ${getPerformanceColor(row.attendancePercentage)}`}>
          {row.attendancePercentage}%
        </span>
      )
    },
    { 
      key: 'performanceRating', 
      label: 'Rating',
      render: (row) => getRatingStars(row.performanceRating)
    }
  ];

  const performanceColumns = [
    { 
      key: 'teacherName', 
      label: 'Teacher',
      render: (row) => <span className="font-medium text-gray-900">{row.teacherName}</span>
    },
    { 
      key: 'classesTaken', 
      label: 'Classes Taken',
      render: (row) => <span className="text-sm text-gray-700">{row.classesTaken}</span>
    },
    { 
      key: 'attendanceRate', 
      label: 'Attendance',
      render: (row) => (
        <span className={`font-bold ${getPerformanceColor(row.attendanceRate)}`}>
          {row.attendanceRate}%
        </span>
      )
    },
    { 
      key: 'homeworkCompletion', 
      label: 'HW Completion',
      render: (row) => (
        <span className={`font-bold ${getPerformanceColor(row.homeworkCompletion)}`}>
          {row.homeworkCompletion}%
        </span>
      )
    },
    { 
      key: 'studentFeedback', 
      label: 'Student Feedback',
      render: (row) => (
        <span className={`font-bold ${getPerformanceColor(row.studentFeedback)}`}>
          {row.studentFeedback}%
        </span>
      )
    },
    { 
      key: 'overallRating', 
      label: 'Overall Rating',
      render: (row) => getRatingStars(row.overallRating)
    }
  ];

  const attendanceColumns = [
    { 
      key: 'teacherName', 
      label: 'Teacher Name',
      render: (row) => <span className="font-medium text-gray-900">{row.teacherName}</span>
    },
    { 
      key: 'presentDays', 
      label: 'Present Days',
      render: (row) => <span className="text-green-600 font-medium">{row.presentDays}</span>
    },
    { 
      key: 'absentDays', 
      label: 'Absent Days',
      render: (row) => <span className="text-red-600 font-medium">{row.absentDays}</span>
    },
    { 
      key: 'leaveDays', 
      label: 'Leave Days',
      render: (row) => <span className="text-yellow-600 font-medium">{row.leaveDays}</span>
    },
    { 
      key: 'totalDays', 
      label: 'Total Days',
      render: (row) => <span className="text-gray-700">{row.totalDays}</span>
    },
    { 
      key: 'attendancePercentage', 
      label: 'Attendance %',
      render: (row) => (
        <span className={`font-bold ${getPerformanceColor(row.attendancePercentage)}`}>
          {row.attendancePercentage}%
        </span>
      )
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Teacher Management</h1>
            <p className="text-gray-600 mt-1">Monitor teacher performance and attendance</p>
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
                <p className="text-sm text-gray-600">Total Teachers</p>
                <p className="text-2xl font-bold text-gray-900">{teacherDirectory.length}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Present Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {teacherAttendance.filter(t => t.presentDays > 20).length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Performance</p>
                <p className="text-2xl font-bold text-purple-600">4.2/5.0</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top Performers</p>
                <p className="text-2xl font-bold text-orange-600">
                  {teacherPerformance.filter(t => t.overallRating >= 4).length}
                </p>
              </div>
              <Award className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('directory')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'directory'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Teacher Directory
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'performance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'attendance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Attendance
            </button>
          </nav>
        </div>

        {/* Content */}
        <Card>
          {activeTab === 'directory' && (
            <Table
              columns={directoryColumns}
              data={teacherDirectory}
              loading={loading}
            />
          )}
          
          {activeTab === 'performance' && (
            <Table
              columns={performanceColumns}
              data={teacherPerformance}
              loading={loading}
            />
          )}
          
          {activeTab === 'attendance' && (
            <Table
              columns={attendanceColumns}
              data={teacherAttendance}
              loading={loading}
            />
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default Teachers;
