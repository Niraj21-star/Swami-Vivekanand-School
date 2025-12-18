/**
 * Admin Teachers Management Page
 * Manage teacher directory, add/edit teachers, assignments, and performance
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone,
  Award,
  BookOpen,
  Calendar,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { 
  getTeacherDirectory, 
  addTeacher, 
  updateTeacher, 
  deleteTeacher 
} from '../../services/adminService';

const AdminTeachers = () => {
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    dateOfJoining: '',
    subjects: [],
    classes: [],
    salary: '',
    address: '',
    emergencyContact: '',
    status: 'Active'
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  useEffect(() => {
    filterTeacherData();
  }, [teachers, searchTerm, filterStatus]);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const data = await getTeacherDirectory();
      setTeachers(data);
    } catch (error) {
      console.error('Error loading teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTeacherData = () => {
    let filtered = teachers;

    // Filter by status
    if (filterStatus !== 'All') {
      filtered = filtered.filter(t => t.status === filterStatus);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTeachers(filtered);
  };

  const handleAddTeacher = () => {
    setModalMode('add');
    setFormData({
      name: '',
      email: '',
      phone: '',
      qualification: '',
      experience: '',
      dateOfJoining: '',
      subjects: [],
      classes: [],
      salary: '',
      address: '',
      emergencyContact: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEditTeacher = (teacher) => {
    setModalMode('edit');
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      qualification: teacher.qualification,
      experience: teacher.experience,
      dateOfJoining: teacher.dateOfJoining,
      subjects: teacher.subjects,
      classes: teacher.classes,
      salary: teacher.salary,
      address: teacher.address,
      emergencyContact: teacher.emergencyContact,
      status: teacher.status
    });
    setShowModal(true);
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await deleteTeacher(id);
        loadTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalMode === 'add') {
        await addTeacher(formData);
      } else {
        await updateTeacher(selectedTeacher.id, formData);
      }
      
      setShowModal(false);
      loadTeachers();
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInput = (name, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [name]: array }));
  };

  const stats = [
    {
      title: 'Total Teachers',
      value: teachers.length,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Teachers',
      value: teachers.filter(t => t.status === 'Active').length,
      icon: Award,
      color: 'green'
    },
    {
      title: 'Total Experience',
      value: `${teachers.reduce((sum, t) => sum + t.experience, 0)} years`,
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Subjects Taught',
      value: new Set(teachers.flatMap(t => t.subjects)).size,
      icon: BookOpen,
      color: 'orange'
    }
  ];

  const columns = [
    {
      header: 'Employee ID',
      accessor: 'employeeId'
    },
    {
      header: 'Name',
      accessor: 'name',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <img 
            src={row.photo} 
            alt={value} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.qualification}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Contact',
      accessor: 'email',
      render: (value, row) => (
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-900">
            <Mail className="w-4 h-4 text-gray-400" />
            {value}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Phone className="w-4 h-4 text-gray-400" />
            {row.phone}
          </div>
        </div>
      )
    },
    {
      header: 'Subjects',
      accessor: 'subjects',
      render: (value) => {
        const subjects = Array.isArray(value) ? value : [];
        return (
          <div className="flex flex-wrap gap-1">
            {subjects.length > 0 ? (
              subjects.map((subject, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {subject}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No subjects</span>
            )}
          </div>
        );
      }
    },
    {
      header: 'Classes',
      accessor: 'classes',
      render: (value) => {
        const classes = Array.isArray(value) ? value : [];
        return (
          <div className="text-sm text-gray-700">
            {classes.length > 0 ? classes.join(', ') : 'No classes'}
          </div>
        );
      }
    },
    {
      header: 'Experience',
      accessor: 'experience',
      render: (value) => `${value} years`
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Active' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}
        >
          {value}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (value, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditTeacher(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Teacher"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteTeacher(value)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Teacher"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading teachers...</div>
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Teachers Management</h1>
            <p className="text-gray-600 mt-1">Manage teacher profiles, assignments, and performance</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button onClick={handleAddTeacher} className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Teacher</span>
              <span className="sm:hidden">Add</span>
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
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, employee ID, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Teachers Table */}
        <Card>
          <Table columns={columns} data={filteredTeachers} />
        </Card>

        {/* Add/Edit Teacher Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={modalMode === 'add' ? 'Add New Teacher' : 'Edit Teacher'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualification *
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience (years) *
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Joining *
                </label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjects (comma-separated) *
                </label>
                <input
                  type="text"
                  value={formData.subjects.join(', ')}
                  onChange={(e) => handleArrayInput('subjects', e.target.value)}
                  placeholder="e.g., Mathematics, Physics"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Classes (comma-separated) *
                </label>
                <input
                  type="text"
                  value={formData.classes.join(', ')}
                  onChange={(e) => handleArrayInput('classes', e.target.value)}
                  placeholder="e.g., Class 10 A, Class 11 B"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary *
                </label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {modalMode === 'add' ? 'Add Teacher' : 'Update Teacher'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default AdminTeachers;
