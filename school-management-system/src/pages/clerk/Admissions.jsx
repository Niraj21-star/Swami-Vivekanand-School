/**
 * Clerk Admissions Page
 * Manages new admissions, admission list, and enquiries
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { UserPlus, Search, Phone, Mail, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import clerkService from '../../services/clerkService';

const Admissions = () => {
  const [activeTab, setActiveTab] = useState('list'); // list, new, enquiries
  const [admissionList, setAdmissionList] = useState([]);
  const [enquiryList, setEnquiryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    gender: '',
    class: '',
    previousSchool: '',
    fatherName: '',
    motherName: '',
    guardianPhone: '',
    guardianEmail: '',
    address: '',
    bloodGroup: '',
    admissionDate: new Date().toISOString().split('T')[0]
  });
  const [enquiryForm, setEnquiryForm] = useState({
    parentName: '',
    contactNumber: '',
    email: '',
    studentName: '',
    classInterested: '',
    previousSchool: '',
    enquiryDate: new Date().toISOString().split('T')[0],
    remarks: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [admissions, enquiries] = await Promise.all([
        clerkService.getAdmissionList(),
        clerkService.getEnquiryList()
      ]);
      setAdmissionList(admissions);
      setEnquiryList(enquiries);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleNewAdmission = async (e) => {
    e.preventDefault();
    try {
      await clerkService.createAdmission(formData);
      alert('Admission created successfully!');
      setShowAdmissionModal(false);
      setFormData({
        studentName: '',
        dateOfBirth: '',
        gender: '',
        class: '',
        previousSchool: '',
        fatherName: '',
        motherName: '',
        guardianPhone: '',
        guardianEmail: '',
        address: '',
        bloodGroup: '',
        admissionDate: new Date().toISOString().split('T')[0]
      });
      loadData();
    } catch (error) {
      alert('Error creating admission');
    }
  };

  const handleNewEnquiry = async (e) => {
    e.preventDefault();
    try {
      await clerkService.createEnquiry(enquiryForm);
      alert('Enquiry created successfully!');
      setShowEnquiryModal(false);
      setEnquiryForm({
        parentName: '',
        contactNumber: '',
        email: '',
        studentName: '',
        classInterested: '',
        previousSchool: '',
        enquiryDate: new Date().toISOString().split('T')[0],
        remarks: ''
      });
      loadData();
    } catch (error) {
      alert('Error creating enquiry');
    }
  };

  const handleStatusUpdate = async (admissionId, newStatus) => {
    try {
      await clerkService.updateAdmissionStatus(admissionId, newStatus);
      alert(`Admission ${newStatus.toLowerCase()} successfully!`);
      loadData();
    } catch (error) {
      alert('Error updating status');
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Approved: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Rejected: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  const admissionColumns = [
    { key: 'admissionNo', label: 'Admission No' },
    { key: 'studentName', label: 'Student Name' },
    { key: 'class', label: 'Class' },
    { key: 'contact', label: 'Contact' },
    { 
      key: 'dateOfAdmission', 
      label: 'Date',
      render: (row) => new Date(row.dateOfAdmission).toLocaleDateString()
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => getStatusBadge(row.status)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSelectedAdmission(row)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {row.status === 'Pending' && (
            <>
              <Button
                size="sm"
                variant="success"
                onClick={() => handleStatusUpdate(row.id, 'Approved')}
              >
                <CheckCircle className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleStatusUpdate(row.id, 'Rejected')}
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  const enquiryColumns = [
    { key: 'id', label: 'Enquiry No' },
    { key: 'parentName', label: 'Parent Name' },
    { key: 'contact', label: 'Contact' },
    { key: 'interestedClass', label: 'Class' },
    { 
      key: 'dateOfEnquiry', 
      label: 'Date',
      render: (row) => new Date(row.dateOfEnquiry).toLocaleDateString()
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => getStatusBadge(row.status)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="primary">
            <Phone className="w-4 h-4 mr-1" />
            Follow Up
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admissions Management</h1>
            <p className="text-gray-600 mt-1">Manage student admissions and enquiries</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline" onClick={() => setShowEnquiryModal(true)}>
              <Phone className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">New Enquiry</span>
              <span className="sm:hidden">Enquiry</span>
            </Button>
            <Button variant="primary" onClick={() => setShowAdmissionModal(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">New Admission</span>
              <span className="sm:hidden">Admission</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Admissions</p>
                <p className="text-2xl font-bold text-gray-900">{admissionList.length}</p>
              </div>
              <UserPlus className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {admissionList.filter(a => a.status === 'Pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {admissionList.filter(a => a.status === 'Approved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Enquiries</p>
                <p className="text-2xl font-bold text-purple-600">{enquiryList.length}</p>
              </div>
              <Phone className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('list')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Admission List ({admissionList.length})
            </button>
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'enquiries'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Enquiries ({enquiryList.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        <Card>
          {activeTab === 'list' && (
            <Table
              columns={admissionColumns}
              data={admissionList}
              loading={loading}
            />
          )}
          {activeTab === 'enquiries' && (
            <Table
              columns={enquiryColumns}
              data={enquiryList}
              loading={loading}
            />
          )}
        </Card>
      </div>

      {/* New Admission Modal */}
      <Modal
        isOpen={showAdmissionModal}
        onClose={() => setShowAdmissionModal(false)}
        title="New Admission"
        size="lg"
      >
        <form onSubmit={handleNewAdmission} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name *
              </label>
              <input
                type="text"
                required
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class *
              </label>
              <select
                required
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Class</option>
                <option value="8-A">8-A</option>
                <option value="8-B">8-B</option>
                <option value="9-A">9-A</option>
                <option value="9-B">9-B</option>
                <option value="10-A">10-A</option>
                <option value="10-B">10-B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Father Name *
              </label>
              <input
                type="text"
                required
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mother Name *
              </label>
              <input
                type="text"
                required
                value={formData.motherName}
                onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.guardianPhone}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Email
              </label>
              <input
                type="email"
                value={formData.guardianEmail}
                onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowAdmissionModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Admission
            </Button>
          </div>
        </form>
      </Modal>

      {/* New Enquiry Modal */}
      <Modal
        isOpen={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        title="New Enquiry"
      >
        <form onSubmit={handleNewEnquiry} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Name *
            </label>
            <input
              type="text"
              required
              value={enquiryForm.parentName}
              onChange={(e) => setEnquiryForm({ ...enquiryForm, parentName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              type="tel"
              required
              value={enquiryForm.contactNumber}
              onChange={(e) => setEnquiryForm({ ...enquiryForm, contactNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Name
            </label>
            <input
              type="text"
              value={enquiryForm.studentName}
              onChange={(e) => setEnquiryForm({ ...enquiryForm, studentName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Interested *
            </label>
            <select
              required
              value={enquiryForm.classInterested}
              onChange={(e) => setEnquiryForm({ ...enquiryForm, classInterested: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Class</option>
              <option value="8-A">8-A</option>
              <option value="9-A">9-A</option>
              <option value="10-A">10-A</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <textarea
              value={enquiryForm.remarks}
              onChange={(e) => setEnquiryForm({ ...enquiryForm, remarks: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowEnquiryModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Enquiry
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Admission Details Modal */}
      {selectedAdmission && (
        <Modal
          isOpen={!!selectedAdmission}
          onClose={() => setSelectedAdmission(null)}
          title="Admission Details"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Admission No</p>
                <p className="font-medium">{selectedAdmission.admissionNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                {getStatusBadge(selectedAdmission.status)}
              </div>
              <div>
                <p className="text-sm text-gray-600">Student Name</p>
                <p className="font-medium">{selectedAdmission.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Class</p>
                <p className="font-medium">{selectedAdmission.class}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{selectedAdmission.guardianPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Admission Date</p>
                <p className="font-medium">
                  {new Date(selectedAdmission.admissionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </MainLayout>
  );
};

export default Admissions;
