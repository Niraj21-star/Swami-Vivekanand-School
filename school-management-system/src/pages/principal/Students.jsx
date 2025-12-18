import { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, Search, Filter, Download, Eye } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import * as principalService from '../../services/principalService';

const Students = () => {
  const [loading, setLoading] = useState(true);
  const [studentDirectory, setStudentDirectory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const directory = await principalService.getStudentDirectory();
      setStudentDirectory(directory);
    } catch (error) {
      console.error('Error loading student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getBehaviorBadge = (status) => {
    const styles = {
      Excellent: 'bg-green-100 text-green-800',
      Good: 'bg-blue-100 text-blue-800',
      'Needs Improvement': 'bg-yellow-100 text-yellow-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const studentColumns = [
    { 
      key: 'fullName', 
      label: 'Student Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.photo || '/placeholder-avatar.png'}
            alt={row.fullName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{row.fullName}</p>
            <p className="text-sm text-gray-500">{row.admissionNo}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'class', 
      label: 'Class',
      render: (row) => (
        <span className="font-medium text-gray-900">{row.class}-{row.section}</span>
      )
    },
    { 
      key: 'rollNo', 
      label: 'Roll No',
      render: (row) => <span className="text-sm text-gray-700">{row.rollNo}</span>
    },
    { 
      key: 'currentGrade', 
      label: 'Current Grade',
      render: (row) => (
        <span className={`px-2 py-1 rounded font-medium ${getGradeColor(row.currentGrade)}`}>
          {row.currentGrade}
        </span>
      )
    },
    { 
      key: 'attendancePercentage', 
      label: 'Attendance',
      render: (row) => (
        <span className={`font-bold ${getAttendanceColor(row.attendancePercentage)}`}>
          {row.attendancePercentage}%
        </span>
      )
    },
    { 
      key: 'behaviorStatus', 
      label: 'Behavior',
      render: (row) => getBehaviorBadge(row.behaviorStatus)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Button size="sm" variant="outline">
          <Eye className="w-4 h-4" />
        </Button>
      )
    }
  ];

  const filteredStudents = studentDirectory.filter(student =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalStudents = studentDirectory.length;
  const avgAttendance = studentDirectory.length > 0
    ? (studentDirectory.reduce((sum, s) => sum + s.attendancePercentage, 0) / studentDirectory.length).toFixed(1)
    : 0;
  const topPerformers = studentDirectory.filter(s => s.currentGrade.startsWith('A')).length;
  const excellentBehavior = studentDirectory.filter(s => s.behaviorStatus === 'Excellent').length;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-600 mt-1">Monitor student performance and attendance</p>
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
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-green-600">{avgAttendance}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top Performers</p>
                <p className="text-2xl font-bold text-purple-600">{topPerformers}</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Excellent Behavior</p>
                <p className="text-2xl font-bold text-orange-600">{excellentBehavior}</p>
              </div>
              <Award className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <Card padding={true}>
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or admission number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-gray-900"
            />
          </div>
        </Card>

        {/* Student Table */}
        <Card>
          <Table
            columns={studentColumns}
            data={filteredStudents}
            loading={loading}
          />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Students;
