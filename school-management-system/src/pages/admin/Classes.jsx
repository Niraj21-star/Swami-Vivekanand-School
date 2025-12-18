/**
 * Admin Classes Management Page
 * Manage classes, sections, subjects, and teacher assignments
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { 
  School, 
  Users, 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2,
  UserCheck,
  Calendar,
  Search,
  Download
} from 'lucide-react';
import { 
  getClassDirectory, 
  addClass, 
  updateClass, 
  deleteClass 
} from '../../services/adminService';

const AdminClasses = () => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    section: '',
    classTeacher: '',
    capacity: '',
    subjects: [],
    timetable: '',
    room: ''
  });

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    filterClassData();
  }, [classes, searchTerm]);

  const loadClasses = async () => {
    try {
      setLoading(true);
      const data = await getClassDirectory();
      setClasses(data);
    } catch (error) {
      console.error('Error loading classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterClassData = () => {
    let filtered = classes;

    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.classTeacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.room.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredClasses(filtered);
  };

  const handleAddClass = () => {
    setModalMode('add');
    setFormData({
      name: '',
      section: '',
      classTeacher: '',
      capacity: '',
      subjects: [],
      timetable: '',
      room: ''
    });
    setShowModal(true);
  };

  const handleEditClass = (classData) => {
    setModalMode('edit');
    setSelectedClass(classData);
    setFormData({
      name: classData.name,
      section: classData.section,
      classTeacher: classData.classTeacher,
      capacity: classData.capacity,
      subjects: classData.subjects,
      timetable: classData.timetable,
      room: classData.room
    });
    setShowModal(true);
  };

  const handleDeleteClass = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await deleteClass(id);
        loadClasses();
      } catch (error) {
        console.error('Error deleting class:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const classData = {
        ...formData,
        strength: 0 // New class starts with 0 students
      };

      if (modalMode === 'add') {
        await addClass(classData);
      } else {
        await updateClass(selectedClass.id, classData);
      }
      
      setShowModal(false);
      loadClasses();
    } catch (error) {
      console.error('Error saving class:', error);
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

  const totalStudents = classes.reduce((sum, c) => sum + c.strength, 0);
  const totalCapacity = classes.reduce((sum, c) => sum + c.capacity, 0);
  const occupancyRate = totalCapacity > 0 ? ((totalStudents / totalCapacity) * 100).toFixed(1) : 0;

  const stats = [
    {
      title: 'Total Classes',
      value: classes.length,
      icon: School,
      color: 'blue'
    },
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'green'
    },
    {
      title: 'Total Capacity',
      value: totalCapacity,
      icon: UserCheck,
      color: 'purple'
    },
    {
      title: 'Occupancy Rate',
      value: `${occupancyRate}%`,
      icon: Calendar,
      color: 'orange'
    }
  ];

  const columns = [
    {
      header: 'Class',
      accessor: 'name',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value} - {row.section}</div>
          <div className="text-sm text-gray-500">Room: {row.room}</div>
        </div>
      )
    },
    {
      header: 'Class Teacher',
      accessor: 'classTeacher',
      render: (value) => (
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-900">{value}</span>
        </div>
      )
    },
    {
      header: 'Students',
      accessor: 'strength',
      render: (value, row) => (
        <div>
          <div className="text-sm text-gray-900 font-medium">
            {value} / {row.capacity}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${(value / row.capacity) * 100}%` }}
            />
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
              <>
                {subjects.slice(0, 3).map((subject, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                  >
                    {subject}
                  </span>
                ))}
                {subjects.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{subjects.length - 3} more
                  </span>
                )}
              </>
            ) : (
              <span className="text-gray-400 text-sm">No subjects</span>
            )}
          </div>
        );
      }
    },
    {
      header: 'Timetable',
      accessor: 'timetable',
      render: (value) => (
        <div className="text-sm text-gray-700">{value}</div>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (value, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditClass(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Class"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteClass(value)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Class"
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
          <div className="text-gray-500">Loading classes...</div>
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Classes Management</h1>
            <p className="text-gray-600 mt-1">Manage classes, sections, and assignments</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button onClick={handleAddClass} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Class</span>
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

        {/* Search */}
        <Card>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by class name, section, teacher, or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </Card>

        {/* Classes Table */}
        <Card>
          <Table columns={columns} data={filteredClasses} />
        </Card>

        {/* Add/Edit Class Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={modalMode === 'add' ? 'Add New Class' : 'Edit Class'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Class 10"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section *
                </label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  placeholder="e.g., A"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Teacher *
                </label>
                <input
                  type="text"
                  name="classTeacher"
                  value={formData.classTeacher}
                  onChange={handleInputChange}
                  placeholder="e.g., Mrs. Priya Sharma"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Number *
                </label>
                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  placeholder="e.g., Room 101"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timetable *
                </label>
                <input
                  type="text"
                  name="timetable"
                  value={formData.timetable}
                  onChange={handleInputChange}
                  placeholder="e.g., Mon-Fri, 8:00 AM - 2:00 PM"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subjects (comma-separated) *
                </label>
                <input
                  type="text"
                  value={formData.subjects.join(', ')}
                  onChange={(e) => handleArrayInput('subjects', e.target.value)}
                  placeholder="e.g., Mathematics, Science, English"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                {modalMode === 'add' ? 'Add Class' : 'Update Class'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default AdminClasses;
