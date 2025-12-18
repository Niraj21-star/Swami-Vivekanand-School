/**
 * Teacher Grades Page
 * Manage assignments, tests, and student grades
 */

import { useState, useEffect } from 'react';
import { Plus, FileText, Users, TrendingUp } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { getAssignments, createAssignment, getStudentGrades } from '../../services/teacherPortalService';

const Grades = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [gradeModalOpen, setGradeModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [studentGrades, setStudentGrades] = useState([]);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const data = await getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error('Error loading assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const assignmentData = {
        title: formData.get('title'),
        class: formData.get('class'),
        subject: formData.get('subject'),
        dueDate: formData.get('dueDate'),
        totalMarks: parseInt(formData.get('totalMarks')),
        totalStudents: parseInt(formData.get('totalStudents') || 0)
      };

      await createAssignment(assignmentData);
      setModalOpen(false);
      loadAssignments();
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const handleViewGrades = async (assignment) => {
    setSelectedAssignment(assignment);
    try {
      const grades = await getStudentGrades(assignment.id);
      setStudentGrades(grades);
      setGradeModalOpen(true);
    } catch (error) {
      console.error('Error loading grades:', error);
    }
  };

  const assignmentColumns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Class', accessor: 'class' },
    { header: 'Subject', accessor: 'subject' },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      render: (value) => new Date(value).toLocaleDateString()
    },
    { 
      header: 'Total Marks', 
      accessor: 'totalMarks',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      header: 'Submitted',
      accessor: 'submitted',
      render: (value, row) => (
        <span className="text-green-600 font-medium">
          {value}/{value + row.pending}
        </span>
      )
    },
    {
      header: 'Avg Score',
      accessor: 'avgScore',
      render: (value) => (
        <span className={`font-medium ${value >= 80 ? 'text-green-600' : value >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
          {value}%
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      sortable: false,
      render: (value, row) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleViewGrades(row)}
        >
          View Grades
        </Button>
      )
    }
  ];

  const gradeColumns = [
    { header: 'Roll No', accessor: 'rollNo' },
    { header: 'Student Name', accessor: 'studentName' },
    {
      header: 'Marks',
      accessor: 'marksObtained',
      render: (value, row) => (
        <span className="font-medium">
          {value}/{row.totalMarks}
        </span>
      )
    },
    {
      header: 'Grade',
      accessor: 'grade',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-bold ${
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
      header: 'Submitted On',
      accessor: 'submittedOn',
      render: (value) => new Date(value).toLocaleDateString()
    },
    { header: 'Remarks', accessor: 'remarks' }
  ];

  const stats = [
    {
      title: 'Total Assignments',
      value: assignments.length,
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Pending Grading',
      value: assignments.reduce((sum, a) => sum + a.pending, 0),
      icon: Users,
      color: 'yellow'
    },
    {
      title: 'Avg Class Score',
      value: '82%',
      icon: TrendingUp,
      color: 'green'
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Grades & Assignments</h1>
            <p className="text-gray-600 mt-1">Manage assignments and student grades</p>
          </div>
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Create Assignment</span>
            <span className="sm:hidden">Create</span>
          </Button>
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

        {/* Assignments Table */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Assignments & Tests</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <Table columns={assignmentColumns} data={assignments} />
          )}
        </Card>

        {/* Create Assignment Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create New Assignment"
          size="md"
        >
          <form onSubmit={handleCreateAssignment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g., Chapter 5 Test"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <input
                  type="text"
                  name="class"
                  required
                  placeholder="e.g., 10-A"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="e.g., Mathematics"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                <input
                  type="number"
                  name="totalMarks"
                  required
                  placeholder="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Students (Optional)</label>
              <input
                type="number"
                name="totalStudents"
                placeholder="35"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Assignment
              </Button>
            </div>
          </form>
        </Modal>

        {/* View Grades Modal */}
        <Modal
          isOpen={gradeModalOpen}
          onClose={() => setGradeModalOpen(false)}
          title={`Grades - ${selectedAssignment?.title}`}
          size="xl"
        >
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Class</p>
                  <p className="font-medium">{selectedAssignment?.class}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Marks</p>
                  <p className="font-medium">{selectedAssignment?.totalMarks}</p>
                </div>
                <div>
                  <p className="text-gray-600">Submitted</p>
                  <p className="font-medium text-green-600">{selectedAssignment?.submitted}</p>
                </div>
                <div>
                  <p className="text-gray-600">Avg Score</p>
                  <p className="font-medium">{selectedAssignment?.avgScore}%</p>
                </div>
              </div>
            </div>
            <Table columns={gradeColumns} data={studentGrades} paginated={false} searchable={false} />
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Grades;
