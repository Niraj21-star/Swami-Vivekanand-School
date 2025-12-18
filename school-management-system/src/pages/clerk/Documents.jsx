/**
 * Clerk Documents Page
 * Upload, verify documents, generate TC and certificates
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import { FileText, Upload, CheckCircle, XCircle, Clock, Download, Award, FileCheck } from 'lucide-react';
import clerkService from '../../services/clerkService';

const Documents = () => {
  const [activeTab, setActiveTab] = useState('documents'); // documents, tc, certificates
  const [documents, setDocuments] = useState([]);
  const [tcList, setTcList] = useState([]);
  const [certificateTemplates, setCertificateTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showTCModal, setShowTCModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    studentId: '',
    documentType: '',
    file: null
  });
  const [tcForm, setTcForm] = useState({
    studentId: '',
    studentName: '',
    admissionNo: '',
    class: '',
    reasonForLeaving: '',
    dateOfLeaving: new Date().toISOString().split('T')[0],
    character: 'Very Good',
    conduct: 'Excellent'
  });
  const [certForm, setCertForm] = useState({
    studentId: '',
    studentName: '',
    admissionNo: '',
    class: '',
    certificateType: '',
    purpose: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [docsData, tcData, templatesData] = await Promise.all([
        clerkService.getDocuments(),
        clerkService.getTCIssuedList(),
        clerkService.getCertificateTemplates()
      ]);
      setDocuments(docsData);
      setTcList(tcData);
      setCertificateTemplates(templatesData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleUploadDocument = async (e) => {
    e.preventDefault();
    try {
      await clerkService.uploadDocument(uploadForm);
      alert('Document uploaded successfully!');
      setShowUploadModal(false);
      setUploadForm({ studentId: '', documentType: '', file: null });
      loadData();
    } catch (error) {
      alert('Error uploading document');
    }
  };

  const handleVerifyDocument = async (docId, status) => {
    try {
      await clerkService.verifyDocument(docId, status);
      alert(`Document ${status.toLowerCase()} successfully!`);
      loadData();
    } catch (error) {
      alert('Error verifying document');
    }
  };

  const handleGenerateTC = async (e) => {
    e.preventDefault();
    try {
      const result = await clerkService.generateTC(tcForm);
      alert(`TC generated successfully! TC Number: ${result.data.tcNumber}`);
      setShowTCModal(false);
      setTcForm({
        studentId: '',
        studentName: '',
        admissionNo: '',
        class: '',
        reasonForLeaving: '',
        dateOfLeaving: new Date().toISOString().split('T')[0],
        character: 'Very Good',
        conduct: 'Excellent'
      });
      loadData();
    } catch (error) {
      alert('Error generating TC');
    }
  };

  const handleGenerateCertificate = async (e) => {
    e.preventDefault();
    try {
      await clerkService.generateCertificate(certForm);
      alert('Certificate generated successfully!');
      setShowCertModal(false);
      setCertForm({
        studentId: '',
        studentName: '',
        admissionNo: '',
        class: '',
        certificateType: '',
        purpose: ''
      });
    } catch (error) {
      alert('Error generating certificate');
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Verified: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Rejected: 'bg-red-100 text-red-800'
    };
    const StatusIcon = status === 'Verified' ? CheckCircle : status === 'Pending' ? Clock : XCircle;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusStyles[status]}`}>
        <StatusIcon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const documentColumns = [
    { key: 'id', label: 'Document ID' },
    { key: 'studentName', label: 'Student' },
    { key: 'documentType', label: 'Document Type' },
    { 
      key: 'uploadDate', 
      label: 'Upload Date',
      render: (row) => new Date(row.uploadDate).toLocaleDateString()
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
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4" />
          </Button>
          {row.status === 'Pending' && (
            <>
              <Button
                size="sm"
                variant="success"
                onClick={() => handleVerifyDocument(row.documentId, 'Verified')}
              >
                <CheckCircle className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleVerifyDocument(row.documentId, 'Rejected')}
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  const tcColumns = [
    { 
      key: 'tcNumber', 
      label: 'TC Number',
      render: (row) => <span className="font-mono text-sm">{row.tcNumber}</span>
    },
    { key: 'studentName', label: 'Student' },
    { key: 'admissionNo', label: 'Admission No' },
    { key: 'class', label: 'Class' },
    { 
      key: 'dateOfIssue', 
      label: 'Issue Date',
      render: (row) => new Date(row.dateOfIssue).toLocaleDateString()
    },
    { key: 'reasonForLeaving', label: 'Reason' },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="primary">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      )
    }
  ];

  const stats = {
    totalDocuments: documents.length,
    pendingVerification: documents.filter(d => d.status === 'Pending').length,
    verified: documents.filter(d => d.status === 'Verified').length,
    tcIssued: tcList.length
  };

  return (
    <MainLayout role="clerk">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Document Management</h1>
            <p className="text-gray-600 mt-1">Upload, verify documents and generate certificates</p>
          </div>
          <div className="flex gap-2 sm:gap-3 flex-shrink-0 flex-wrap">
            <Button variant="outline" onClick={() => setShowCertModal(true)}>
              <Award className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Generate Certificate</span>
              <span className="sm:hidden">Certificate</span>
            </Button>
            <Button variant="outline" onClick={() => setShowTCModal(true)}>
              <FileCheck className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Generate TC</span>
              <span className="sm:hidden">TC</span>
            </Button>
            <Button variant="primary" onClick={() => setShowUploadModal(true)}>
              <Upload className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Upload Document</span>
              <span className="sm:hidden">Upload</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Verification</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingVerification}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">TC Issued</p>
                <p className="text-2xl font-bold text-purple-600">{stats.tcIssued}</p>
              </div>
              <FileCheck className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents ({documents.length})
            </button>
            <button
              onClick={() => setActiveTab('tc')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tc'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transfer Certificates ({tcList.length})
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'certificates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Certificate Templates ({certificateTemplates.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        <Card>
          {activeTab === 'documents' && (
            <Table
              columns={documentColumns}
              data={documents}
              loading={loading}
            />
          )}
          {activeTab === 'tc' && (
            <Table
              columns={tcColumns}
              data={tcList}
              loading={loading}
            />
          )}
          {activeTab === 'certificates' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificateTemplates.map((template) => (
                  <Card key={template.id} padding={true}>
                    <div className="flex items-start gap-3">
                      <Award className="w-8 h-8 text-blue-500" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{template.type}</h3>
                        <p className="text-sm text-gray-600 mt-1">{template.template}</p>
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-1">Required Fields:</p>
                          <div className="flex flex-wrap gap-2">
                            {template.requiredFields.map((field) => (
                              <span key={field} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {field}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="primary" 
                          className="mt-3"
                          onClick={() => {
                            setCertForm({ ...certForm, certificateType: template.code });
                            setShowCertModal(true);
                          }}
                        >
                          Generate
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Upload Document Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Document"
      >
        <form onSubmit={handleUploadDocument} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID *
            </label>
            <input
              type="text"
              required
              value={uploadForm.studentId}
              onChange={(e) => setUploadForm({ ...uploadForm, studentId: e.target.value })}
              placeholder="Enter student admission number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Document Type *
            </label>
            <select
              required
              value={uploadForm.documentType}
              onChange={(e) => setUploadForm({ ...uploadForm, documentType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Document Type</option>
              <option value="Birth Certificate">Birth Certificate</option>
              <option value="Transfer Certificate">Transfer Certificate</option>
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="Photo">Photo</option>
              <option value="Previous Marksheet">Previous Marksheet</option>
              <option value="Caste Certificate">Caste Certificate</option>
              <option value="Income Certificate">Income Certificate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload File *
            </label>
            <input
              type="file"
              required
              onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files[0] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </form>
      </Modal>

      {/* Generate TC Modal */}
      <Modal
        isOpen={showTCModal}
        onClose={() => setShowTCModal(false)}
        title="Generate Transfer Certificate"
        size="lg"
      >
        <form onSubmit={handleGenerateTC} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name *
              </label>
              <input
                type="text"
                required
                value={tcForm.studentName}
                onChange={(e) => setTcForm({ ...tcForm, studentName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admission No *
              </label>
              <input
                type="text"
                required
                value={tcForm.admissionNo}
                onChange={(e) => setTcForm({ ...tcForm, admissionNo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class *
              </label>
              <input
                type="text"
                required
                value={tcForm.class}
                onChange={(e) => setTcForm({ ...tcForm, class: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Leaving *
              </label>
              <input
                type="date"
                required
                value={tcForm.dateOfLeaving}
                onChange={(e) => setTcForm({ ...tcForm, dateOfLeaving: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Character *
              </label>
              <select
                required
                value={tcForm.character}
                onChange={(e) => setTcForm({ ...tcForm, character: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Satisfactory">Satisfactory</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conduct *
              </label>
              <select
                required
                value={tcForm.conduct}
                onChange={(e) => setTcForm({ ...tcForm, conduct: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Satisfactory">Satisfactory</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Leaving *
            </label>
            <textarea
              required
              value={tcForm.reasonForLeaving}
              onChange={(e) => setTcForm({ ...tcForm, reasonForLeaving: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowTCModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              <FileCheck className="w-4 h-4 mr-2" />
              Generate TC
            </Button>
          </div>
        </form>
      </Modal>

      {/* Generate Certificate Modal */}
      <Modal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        title="Generate Certificate"
      >
        <form onSubmit={handleGenerateCertificate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Name *
            </label>
            <input
              type="text"
              required
              value={certForm.studentName}
              onChange={(e) => setCertForm({ ...certForm, studentName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admission No *
            </label>
            <input
              type="text"
              required
              value={certForm.admissionNo}
              onChange={(e) => setCertForm({ ...certForm, admissionNo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class *
            </label>
            <input
              type="text"
              required
              value={certForm.class}
              onChange={(e) => setCertForm({ ...certForm, class: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certificate Type *
            </label>
            <select
              required
              value={certForm.certificateType}
              onChange={(e) => setCertForm({ ...certForm, certificateType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Certificate Type</option>
              {certificateTemplates.map((template) => (
                <option key={template.id} value={template.code}>
                  {template.type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose
            </label>
            <textarea
              value={certForm.purpose}
              onChange={(e) => setCertForm({ ...certForm, purpose: e.target.value })}
              rows={2}
              placeholder="Purpose of certificate (if applicable)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowCertModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              <Award className="w-4 h-4 mr-2" />
              Generate Certificate
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
};

export default Documents;
