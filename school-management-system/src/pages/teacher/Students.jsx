/**
 * Teacher Students Page
 * View and manage students across all classes
 */

import { useState, useEffect } from 'react';
import { Search, Phone, TrendingUp, TrendingDown } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import { getAllStudents } from '../../services/teacherPortalService';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBehaviorBadge = (behavior) => {
    const colors = {
      'Excellent': 'bg-green-100 text-green-800',
      'Good': 'bg-blue-100 text-blue-800',
      'Needs Attention': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[behavior] || 'bg-gray-100 text-gray-800'}`}>
        {behavior}
      </span>
    );
  };

  const columns = [
    { 
      header: 'Roll No', 
      accessor: 'rollNo',
      render: (value) => <span className="font-mono text-sm">{value}</span>
    },
    { 
      header: 'Name', 
      accessor: 'name',
      render: (value) => <span className="font-medium text-gray-900">{value}</span>
    },
    { header: 'Class', accessor: 'class' },
    {
      header: 'Attendance',
      accessor: 'attendance',
      render: (value) => (
        <div className="flex items-center">
          <div className="w-full max-w-[80px] bg-gray-200 rounded-full h-2 mr-2">
            <div
              className={`h-2 rounded-full ${
                value >= 90 ? 'bg-green-500' : value >= 75 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{value}%</span>
        </div>
      )
    },
    {
      header: 'Grade',
      accessor: 'grade',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-sm font-bold ${
          value === 'A' ? 'bg-green-100 text-green-800' :
          value === 'B+' ? 'bg-blue-100 text-blue-800' :
          value === 'B' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      header: 'Last Score',
      accessor: 'lastScore',
      render: (value) => (
        <span className="font-medium">{value}%</span>
      )
    },
    {
      header: 'Behavior',
      accessor: 'behavior',
      render: (value) => getBehaviorBadge(value)
    },
    {
      header: 'Parent Contact',
      accessor: 'parentContact',
      render: (value) => (
        <a href={`tel:${value}`} className="text-blue-600 hover:underline flex items-center">
          <Phone className="w-3 h-3 mr-1" />
          {value}
        </a>
      )
    }
  ];

  const stats = [
    {
      title: 'Total Students',
      value: students.length,
      icon: Search,
      color: 'blue'
    },
    {
      title: 'High Performers',
      value: students.filter(s => s.grade === 'A').length,
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Need Attention',
      value: students.filter(s => s.attendance < 75 || s.behavior === 'Needs Attention').length,
      icon: TrendingDown,
      color: 'red'
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Students</h1>
          <p className="text-gray-600 mt-1">View and manage students across all your classes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Students Table */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Student Directory</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <Table columns={columns} data={students} />
          )}
        </Card>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performers</h3>
            <div className="space-y-3">
              {students
                .sort((a, b) => b.lastScore - a.lastScore)
                .slice(0, 5)
                .map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{student.lastScore}%</p>
                      <p className="text-xs text-gray-600">Grade {student.grade}</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Attention Required</h3>
            <div className="space-y-3">
              {students
                .filter(s => s.attendance < 85 || s.behavior === 'Needs Attention')
                .map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-red-600 font-medium">{student.attendance}% Attendance</p>
                      <p className="text-xs text-gray-600">{student.behavior}</p>
                    </div>
                  </div>
                ))}
              {students.filter(s => s.attendance < 85 || s.behavior === 'Needs Attention').length === 0 && (
                <p className="text-center text-gray-500 py-4">All students are doing well! 🎉</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Students;
