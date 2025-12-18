/**
 * Clerk Students Page
 * Search, view, and update student records
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { Search, Users, Edit, Eye, Phone, Mail, Download } from 'lucide-react';
import clerkService from '../../services/clerkService';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, searchBy, students]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await clerkService.getAdvancedStudentRecords();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      setFilteredStudents(students);
      return;
    }

    try {
      const results = await clerkService.searchStudent(searchTerm, searchBy);
      setFilteredStudents(results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
  };

  const handleEditStudent = (student) => {
    setEditFormData({
      id: student.id,
      guardianPhone: student.guardianPhone,
      guardianEmail: student.guardianEmail,
      address: student.address,
      bloodGroup: student.bloodGroup
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await clerkService.updateStudentRecord(editFormData.id, editFormData);
      alert('Student record updated successfully!');
      setShowEditModal(false);
      loadStudents();
    } catch (error) {
      alert('Error updating student record');
    }
  };

  const studentColumns = [
    { 
      key: 'admissionNo', 
      label: 'Admission No',
      render: (row) => <span className="font-mono text-sm">{row.admissionNo}</span>
    },
    { 
      key: 'fullName', 
      label: 'Student Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.photo} alt={row.fullName} className="w-8 h-8 rounded-full" />
          <span className="font-medium">{row.fullName}</span>
        </div>
      )
    },
    { 
      key: 'class', 
      label: 'Class',
      render: (row) => `${row.class}-${row.section}`
    },
    { 
      key: 'rollNo', 
      label: 'Roll No'
    },
    { 
      key: 'guardianPhone', 
      label: 'Contact',
      render: (row) => (
        <a href={`tel:${row.guardianPhone}`} className="text-blue-600 hover:underline">
          {row.guardianPhone}
        </a>
      )
    },
    {
      key: 'attendance',
      label: 'Attendance',
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.attendance.percentage >= 90 ? 'bg-green-100 text-green-800' :
          row.attendance.percentage >= 75 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {row.attendance.percentage}%
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleViewDetails(row)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleEditStudent(row)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <MainLayout role="clerk">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Records</h1>
            <p className="text-gray-600 mt-1">Search and manage student information</p>
          </div>
          <Button variant="primary" className="flex-shrink-0">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Class 10</p>
                <p className="text-2xl font-bold text-purple-600">
                  {students.filter(s => s.class === '10').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Class 9</p>
                <p className="text-2xl font-bold text-green-600">
                  {students.filter(s => s.class === '9').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Class 8</p>
                <p className="text-2xl font-bold text-orange-600">
                  {students.filter(s => s.class === '8').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card padding={true}>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search by ${searchBy}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Name</option>
              <option value="admissionNo">Admission No</option>
              <option value="class">Class</option>
            </select>
            <Button variant="primary" onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </Card>

        {/* Students Table */}
        <Card>
          <Table
            columns={studentColumns}
            data={filteredStudents}
            loading={loading}
          />
        </Card>
      </div>

      {/* View Student Details Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title="Student Details"
          size="lg"
        >
          <div className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium">{selectedStudent.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Admission No</p>
                  <p className="font-medium font-mono">{selectedStudent.admissionNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-medium">{selectedStudent.class}-{selectedStudent.section}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Roll No</p>
                  <p className="font-medium">{selectedStudent.rollNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium">{new Date(selectedStudent.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-medium">{selectedStudent.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blood Group</p>
                  <p className="font-medium">{selectedStudent.bloodGroup}</p>
                </div>
              </div>
            </div>

            {/* Guardian Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Guardian Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Father's Name</p>
                  <p className="font-medium">{selectedStudent.fatherName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mother's Name</p>
                  <p className="font-medium">{selectedStudent.motherName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-medium">{selectedStudent.guardianPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{selectedStudent.guardianEmail}</p>
                </div>
              </div>
            </div>

            {/* Fee Details */}
            {selectedStudent.feeDetails && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Fee Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Fee</p>
                    <p className="font-medium text-green-600">₹{selectedStudent.feeDetails.totalFee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Paid Amount</p>
                    <p className="font-medium text-blue-600">₹{selectedStudent.feeDetails.paidAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="font-medium text-red-600">₹{selectedStudent.feeDetails.pendingAmount}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Attendance */}
            {selectedStudent.attendance && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Attendance</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Percentage</p>
                    <p className="font-medium">{selectedStudent.attendance.percentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Present</p>
                    <p className="font-medium text-green-600">{selectedStudent.attendance.presentDays}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Absent</p>
                    <p className="font-medium text-red-600">{selectedStudent.attendance.absentDays}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-medium">{selectedStudent.attendance.totalDays}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Edit Student Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Student Record"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guardian Phone
            </label>
            <input
              type="tel"
              value={editFormData.guardianPhone || ''}
              onChange={(e) => setEditFormData({ ...editFormData, guardianPhone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guardian Email
            </label>
            <input
              type="email"
              value={editFormData.guardianEmail || ''}
              onChange={(e) => setEditFormData({ ...editFormData, guardianEmail: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={editFormData.address || ''}
              onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group
            </label>
            <select
              value={editFormData.bloodGroup || ''}
              onChange={(e) => setEditFormData({ ...editFormData, bloodGroup: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
};

export default Students;
