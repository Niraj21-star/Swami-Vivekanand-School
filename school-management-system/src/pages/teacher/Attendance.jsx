/**
 * Teacher Attendance Page
 * Mark and view attendance records
 */

import { useState, useEffect } from 'react';
import { Calendar, Check, X, Download } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { getTeacherClasses, getAttendanceRecords, markAttendance } from '../../services/teacherPortalService';

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [classesData, attendanceData] = await Promise.all([
        getTeacherClasses(),
        getAttendanceRecords()
      ]);
      setClasses(classesData);
      setAttendanceRecords(attendanceData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = () => {
    setModalOpen(true);
  };

  const handleSubmitAttendance = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const attendanceData = {
        date: formData.get('date'),
        class: formData.get('class'),
        subject: classes.find(c => c.className === formData.get('class'))?.subject || '',
        totalStudents: parseInt(formData.get('totalStudents')),
        present: parseInt(formData.get('present')),
        absent: parseInt(formData.get('absent'))
      };

      await markAttendance(attendanceData);
      setModalOpen(false);
      loadData();
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const columns = [
    {
      header: 'Date',
      accessor: 'date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    { header: 'Class', accessor: 'class' },
    { header: 'Subject', accessor: 'subject' },
    { header: 'Total Students', accessor: 'totalStudents' },
    {
      header: 'Present',
      accessor: 'present',
      render: (value) => (
        <span className="text-green-600 font-medium">{value}</span>
      )
    },
    {
      header: 'Absent',
      accessor: 'absent',
      render: (value) => (
        <span className="text-red-600 font-medium">{value}</span>
      )
    },
    {
      header: 'Percentage',
      accessor: 'percentage',
      render: (value) => (
        <div className="flex items-center">
          <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2 mr-2">
            <div
              className={`h-2 rounded-full ${
                value >= 90 ? 'bg-green-500' : value >= 75 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{value.toFixed(1)}%</span>
        </div>
      )
    }
  ];

  const stats = [
    {
      title: 'Today\'s Classes',
      value: classes.length,
      icon: Calendar,
      color: 'blue'
    },
    {
      title: 'Avg Attendance',
      value: '93.5%',
      icon: Check,
      color: 'green'
    },
    {
      title: 'Total Records',
      value: attendanceRecords.length,
      icon: Calendar,
      color: 'purple'
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Attendance</h1>
            <p className="text-gray-600 mt-1">Mark and manage class attendance</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleMarkAttendance}>
              <Check className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Mark Attendance</span>
              <span className="sm:hidden">Mark</span>
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
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

        {/* Filter */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.className}>{cls.className}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </Card>

        {/* Attendance Records Table */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Attendance Records</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <Table columns={columns} data={attendanceRecords} />
          )}
        </Card>

        {/* Mark Attendance Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Mark Attendance"
          size="md"
        >
          <form onSubmit={handleSubmitAttendance} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select
                name="class"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.className}>{cls.className} - {cls.subject}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Students</label>
                <input
                  type="number"
                  name="totalStudents"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Present</label>
                <input
                  type="number"
                  name="present"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Absent</label>
                <input
                  type="number"
                  name="absent"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Mark Attendance
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Attendance;
