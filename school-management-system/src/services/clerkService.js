/**
 * Clerk Service
 * Mock data and API functions for Clerk module
 */

import { 
  mockStudents, 
  mockClasses,
  generateAttendancePercentage 
} from '../utils/mockData';

const USE_MOCK = true;

// Mock Dashboard Data
export const clerkDashboardData = {
  todayAdmissions: 5,
  todayFees: 125000,
  pendingDocuments: 12,
  totalStudents: 1234,
  pendingFees: 250000,
  newEnquiries: 8,
  feeCollectionTrend: [
    { date: '2024-12-11', amount: 95000 },
    { date: '2024-12-12', amount: 120000 },
    { date: '2024-12-13', amount: 80000 },
    { date: '2024-12-14', amount: 150000 },
    { date: '2024-12-15', amount: 110000 },
    { date: '2024-12-16', amount: 135000 },
    { date: '2024-12-17', amount: 125000 }
  ],
  recentActivities: [
    { id: 1, action: 'Fee collected - STU001', time: '10 mins ago', amount: 15000 },
    { id: 2, action: 'New admission - STU234', time: '1 hour ago', student: 'Rahul Kumar' },
    { id: 3, action: 'TC generated - STU156', time: '2 hours ago', student: 'Priya Sharma' },
    { id: 4, action: 'Document uploaded - STU089', time: '3 hours ago', doc: 'Birth Certificate' },
    { id: 5, action: 'Fee receipt printed - STU045', time: '4 hours ago', amount: 8000 }
  ]
};

// Mock Student Fee Structure
export const studentFeeStructure = {
  tuitionFee: 15000,
  transportFee: 3000,
  examFee: 1000,
  libraryFee: 500,
  labFee: 1000,
  total: 20500,
  paidAmount: 0,
  pendingAmount: 20500
};

// Mock Admission List
export const admissionListData = [
  {
    id: 'ADM001',
    admissionNo: 'ADM/2024/001',
    studentName: 'Rahul Kumar',
    class: '6',
    section: 'A',
    dateOfAdmission: '2024-12-10',
    status: 'Approved',
    fatherName: 'Rajesh Kumar',
    contact: '+91 9876543210'
  },
  {
    id: 'ADM002',
    admissionNo: 'ADM/2024/002',
    studentName: 'Sneha Patel',
    class: '5',
    section: 'B',
    dateOfAdmission: '2024-12-12',
    status: 'Pending',
    fatherName: 'Suresh Patel',
    contact: '+91 9876543211'
  },
  {
    id: 'ADM003',
    admissionNo: 'ADM/2024/003',
    studentName: 'Amit Singh',
    class: '7',
    section: 'A',
    dateOfAdmission: '2024-12-15',
    status: 'Approved',
    fatherName: 'Vikram Singh',
    contact: '+91 9876543212'
  },
  {
    id: 'ADM004',
    admissionNo: 'ADM/2024/004',
    studentName: 'Neha Gupta',
    class: '4',
    section: 'C',
    dateOfAdmission: '2024-12-16',
    status: 'Rejected',
    fatherName: 'Ramesh Gupta',
    contact: '+91 9876543213'
  },
  {
    id: 'ADM005',
    admissionNo: 'ADM/2024/005',
    studentName: 'Arjun Sharma',
    class: '8',
    section: 'B',
    dateOfAdmission: '2024-12-17',
    status: 'Pending',
    fatherName: 'Ajay Sharma',
    contact: '+91 9876543214'
  }
];

// Mock Enquiry List
export const enquiryListData = [
  {
    id: 'ENQ001',
    parentName: 'John Smith',
    contact: '+91 9876543210',
    email: 'john@example.com',
    interestedClass: '5',
    dateOfEnquiry: '2024-12-15',
    followUpDate: '2024-12-20',
    status: 'New',
    notes: 'Looking for admission in academic year 2025'
  },
  {
    id: 'ENQ002',
    parentName: 'Mary Johnson',
    contact: '+91 9876543220',
    email: 'mary@example.com',
    interestedClass: '3',
    dateOfEnquiry: '2024-12-14',
    followUpDate: '2024-12-18',
    status: 'Contacted',
    notes: 'Interested in hostel facility'
  },
  {
    id: 'ENQ003',
    parentName: 'David Lee',
    contact: '+91 9876543230',
    email: 'david@example.com',
    interestedClass: '7',
    dateOfEnquiry: '2024-12-13',
    followUpDate: '2024-12-19',
    status: 'Interested',
    notes: 'Wants to visit school campus'
  },
  {
    id: 'ENQ004',
    parentName: 'Sarah Wilson',
    contact: '+91 9876543240',
    email: 'sarah@example.com',
    interestedClass: '2',
    dateOfEnquiry: '2024-12-12',
    followUpDate: null,
    status: 'Not Interested',
    notes: 'Found another school'
  },
  {
    id: 'ENQ005',
    parentName: 'Robert Brown',
    contact: '+91 9876543250',
    email: 'robert@example.com',
    interestedClass: '6',
    dateOfEnquiry: '2024-12-17',
    followUpDate: '2024-12-22',
    status: 'Interested',
    notes: 'Waiting for transfer certificate'
  }
];

// Mock Student Records
export const studentRecordsData = [
  {
    id: 'STU001',
    admissionNo: 'STU/2023/001',
    name: 'Rajesh Kumar',
    class: '10',
    section: 'A',
    rollNo: '001',
    contact: '+91 9876543210',
    email: 'rajesh@example.com',
    feeStatus: 'Paid',
    fatherName: 'Suresh Kumar',
    motherName: 'Sunita Kumar',
    address: '123 Main St, Delhi',
    dob: '2008-05-15',
    bloodGroup: 'O+',
    aadhar: '1234-5678-9012'
  },
  {
    id: 'STU002',
    admissionNo: 'STU/2023/002',
    name: 'Priya Sharma',
    class: '10',
    section: 'A',
    rollNo: '002',
    contact: '+91 9876543211',
    email: 'priya@example.com',
    feeStatus: 'Pending',
    fatherName: 'Rakesh Sharma',
    motherName: 'Meena Sharma',
    address: '456 Park Ave, Mumbai',
    dob: '2008-08-20',
    bloodGroup: 'A+',
    aadhar: '2345-6789-0123'
  },
  {
    id: 'STU003',
    admissionNo: 'STU/2023/003',
    name: 'Amit Singh',
    class: '9',
    section: 'B',
    rollNo: '015',
    contact: '+91 9876543212',
    email: 'amit@example.com',
    feeStatus: 'Paid',
    fatherName: 'Vijay Singh',
    motherName: 'Anjali Singh',
    address: '789 Lake Rd, Bangalore',
    dob: '2009-03-10',
    bloodGroup: 'B+',
    aadhar: '3456-7890-1234'
  }
];

// Mock Fee Receipts
export const feeReceiptsData = [
  {
    id: 'REC001',
    receiptNo: 'FEE/2024/001',
    date: '2024-12-17',
    studentName: 'Rajesh Kumar',
    class: '10-A',
    amount: 15000,
    paymentMode: 'Online',
    transactionId: 'TXN123456789',
    collectedBy: 'Michael Brown'
  },
  {
    id: 'REC002',
    receiptNo: 'FEE/2024/002',
    date: '2024-12-16',
    studentName: 'Sneha Patel',
    class: '9-B',
    amount: 18000,
    paymentMode: 'Cash',
    transactionId: '',
    collectedBy: 'Michael Brown'
  },
  {
    id: 'REC003',
    receiptNo: 'FEE/2024/003',
    date: '2024-12-15',
    studentName: 'Amit Singh',
    class: '8-A',
    amount: 12000,
    paymentMode: 'Cheque',
    transactionId: 'CHQ456789',
    collectedBy: 'Michael Brown'
  }
];

// Mock Pending Fees
export const pendingFeesData = [
  {
    id: 'STU001',
    studentName: 'Priya Sharma',
    admissionNo: 'STU/2023/002',
    class: '10-A',
    section: 'A',
    totalFee: 20500,
    paidAmount: 5000,
    pendingAmount: 15500,
    dueDate: '2024-12-20',
    daysOverdue: 0,
    parentContact: '+91 9876543211'
  },
  {
    id: 'STU004',
    studentName: 'Rahul Verma',
    admissionNo: 'STU/2023/004',
    class: '9-B',
    section: 'B',
    totalFee: 20500,
    paidAmount: 10000,
    pendingAmount: 10500,
    dueDate: '2024-12-15',
    daysOverdue: 2,
    parentContact: '+91 9876543213'
  },
  {
    id: 'STU005',
    studentName: 'Neha Gupta',
    admissionNo: 'STU/2023/005',
    class: '8-A',
    section: 'A',
    totalFee: 18000,
    paidAmount: 0,
    pendingAmount: 18000,
    dueDate: '2024-12-10',
    daysOverdue: 7,
    parentContact: '+91 9876543214'
  }
];

// Mock Fee Defaulters
export const feeDefaultersData = [
  {
    id: 'STU010',
    studentName: 'Alex Johnson',
    admissionNo: 'STU/2022/010',
    class: '10-B',
    pendingAmount: 20500,
    lastPaymentDate: '2024-08-15',
    daysOverdue: 125,
    parentContact: '+91 9876543220'
  },
  {
    id: 'STU015',
    studentName: 'Sofia Martinez',
    admissionNo: 'STU/2022/015',
    class: '9-A',
    pendingAmount: 18000,
    lastPaymentDate: '2024-09-01',
    daysOverdue: 108,
    parentContact: '+91 9876543225'
  },
  {
    id: 'STU020',
    studentName: 'Michael Chen',
    admissionNo: 'STU/2023/020',
    class: '8-B',
    pendingAmount: 15000,
    lastPaymentDate: '2024-10-05',
    daysOverdue: 74,
    parentContact: '+91 9876543230'
  }
];

// Mock Documents
export const documentsData = [
  {
    id: 'DOC001',
    studentName: 'Rajesh Kumar',
    admissionNo: 'STU/2023/001',
    documentType: 'Birth Certificate',
    uploadDate: '2024-12-10',
    uploadedBy: 'Michael Brown',
    status: 'Verified',
    fileUrl: '/documents/birth-cert-001.pdf'
  },
  {
    id: 'DOC002',
    studentName: 'Priya Sharma',
    admissionNo: 'STU/2023/002',
    documentType: 'Aadhar Card',
    uploadDate: '2024-12-12',
    uploadedBy: 'Michael Brown',
    status: 'Pending',
    fileUrl: '/documents/aadhar-002.pdf'
  },
  {
    id: 'DOC003',
    studentName: 'Amit Singh',
    admissionNo: 'STU/2023/003',
    documentType: 'Transfer Certificate',
    uploadDate: '2024-12-15',
    uploadedBy: 'Michael Brown',
    status: 'Verified',
    fileUrl: '/documents/tc-003.pdf'
  }
];

/**
 * API Functions
 */

// Get Dashboard Data
export const getDashboardData = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(clerkDashboardData), 500);
    });
  }
  // Real API call here
};

// Create New Admission
export const createAdmission = async (admissionData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAdmission = {
          id: `ADM${String(admissionListData.length + 1).padStart(3, '0')}`,
          admissionNo: `ADM/2024/${String(admissionListData.length + 1).padStart(3, '0')}`,
          ...admissionData,
          dateOfAdmission: new Date().toISOString().split('T')[0],
          status: 'Pending'
        };
        admissionListData.push(newAdmission);
        resolve({ success: true, data: newAdmission, message: 'Admission created successfully' });
      }, 500);
    });
  }
  // Real API call here
};

// Get Admission List
export const getAdmissionList = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(admissionListData), 500);
    });
  }
  // Real API call here
};

// Update Admission Status
export const updateAdmissionStatus = async (admissionId, status) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const admission = admissionListData.find(a => a.id === admissionId);
        if (admission) {
          admission.status = status;
          resolve({ success: true, message: 'Status updated successfully' });
        } else {
          resolve({ success: false, message: 'Admission not found' });
        }
      }, 500);
    });
  }
  // Real API call here
};

// Get Enquiry List
export const getEnquiryList = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(enquiryListData), 500);
    });
  }
  // Real API call here
};

// Create Enquiry
export const createEnquiry = async (enquiryData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEnquiry = {
          id: `ENQ${String(enquiryListData.length + 1).padStart(3, '0')}`,
          ...enquiryData,
          dateOfEnquiry: new Date().toISOString().split('T')[0],
          status: 'New'
        };
        enquiryListData.push(newEnquiry);
        resolve({ success: true, data: newEnquiry, message: 'Enquiry created successfully' });
      }, 500);
    });
  }
  // Real API call here
};

// Update Enquiry
export const updateEnquiry = async (enquiryId, enquiryData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = enquiryListData.findIndex(e => e.id === enquiryId);
        if (index !== -1) {
          enquiryListData[index] = { ...enquiryListData[index], ...enquiryData };
          resolve({ success: true, message: 'Enquiry updated successfully' });
        } else {
          resolve({ success: false, message: 'Enquiry not found' });
        }
      }, 500);
    });
  }
  // Real API call here
};

// Get Student Records
export const getStudentRecords = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(studentRecordsData), 500);
    });
  }
  // Real API call here
};

// Update Student Record
export const updateStudentRecord = async (studentId, studentData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = studentRecordsData.findIndex(s => s.id === studentId);
        if (index !== -1) {
          studentRecordsData[index] = { ...studentRecordsData[index], ...studentData };
          resolve({ success: true, message: 'Student record updated successfully' });
        } else {
          resolve({ success: false, message: 'Student not found' });
        }
      }, 500);
    });
  }
  // Real API call here
};

// Get Student Fee Details
export const getStudentFeeDetails = async (studentId) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(studentFeeStructure), 500);
    });
  }
  // Real API call here
};

// Collect Fee
export const collectFee = async (feeData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReceipt = {
          id: `REC${String(feeReceiptsData.length + 1).padStart(3, '0')}`,
          receiptNo: `FEE/2024/${String(feeReceiptsData.length + 1).padStart(3, '0')}`,
          date: new Date().toISOString().split('T')[0],
          ...feeData,
          collectedBy: 'Michael Brown'
        };
        feeReceiptsData.push(newReceipt);
        resolve({ success: true, data: newReceipt, message: 'Fee collected successfully' });
      }, 500);
    });
  }
  // Real API call here
};

// Get Fee Receipts
export const getFeeReceipts = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(feeReceiptsData), 500);
    });
  }
  // Real API call here
};

// Get Pending Fees
export const getPendingFees = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(pendingFeesData), 500);
    });
  }
  // Real API call here
};

// Get Fee Defaulters
export const getFeeDefaulters = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(feeDefaultersData), 500);
    });
  }
  // Real API call here
};

// Upload Document
export const uploadDocument = async (documentData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDocument = {
          id: `DOC${String(documentsData.length + 1).padStart(3, '0')}`,
          ...documentData,
          uploadDate: new Date().toISOString().split('T')[0],
          uploadedBy: 'Michael Brown',
          status: 'Pending'
        };
        documentsData.push(newDocument);
        resolve({ success: true, data: newDocument, message: 'Document uploaded successfully' });
      }, 500);
    });
  }
  // Real API call here
};

// Get Documents
export const getDocuments = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(documentsData), 500);
    });
  }
  // Real API call here
};

// Verify Document
export const verifyDocument = async (documentId, status) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const document = documentsData.find(d => d.id === documentId);
        if (document) {
          document.status = status;
          resolve({ success: true, message: 'Document status updated successfully' });
        } else {
          resolve({ success: false, message: 'Document not found' });
        }
      }, 500);
    });
  }
  // Real API call here
};

// Generate TC
export const generateTC = async (tcData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tcNumber = `TC/2024/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
        resolve({ 
          success: true, 
          data: { tcNumber, ...tcData }, 
          message: 'Transfer Certificate generated successfully' 
        });
      }, 500);
    });
  }
  // Real API call here
};

// ==================== ADDITIONAL COMPREHENSIVE MOCK DATA ====================

// Mock Student Search Results
export const studentSearchResults = mockStudents;

// Mock Certificate Templates
export const certificateTemplates = [
  {
    id: 'CERT001',
    type: 'Bonafide Certificate',
    code: 'BONAFIDE',
    template: 'Standard bonafide certificate for students',
    requiredFields: ['studentName', 'class', 'admissionNo', 'dateOfBirth', 'purpose']
  },
  {
    id: 'CERT002',
    type: 'Character Certificate',
    code: 'CHARACTER',
    template: 'Character certificate with conduct remarks',
    requiredFields: ['studentName', 'class', 'admissionNo', 'character', 'conduct']
  },
  {
    id: 'CERT003',
    type: 'Transfer Certificate',
    code: 'TC',
    template: 'Official transfer certificate',
    requiredFields: ['studentName', 'class', 'admissionNo', 'reason', 'dateOfLeaving']
  },
  {
    id: 'CERT004',
    type: 'Study Certificate',
    code: 'STUDY',
    template: 'Certificate confirming current enrollment',
    requiredFields: ['studentName', 'class', 'admissionNo', 'academicYear']
  }
];

// Mock TC Issued List
export const tcIssuedList = [
  {
    id: 'TC001',
    tcNumber: 'TC/2024/001',
    studentName: 'Arun Mehta',
    admissionNo: 'ADM/2022/045',
    class: '9-B',
    dateOfIssue: '2024-11-15',
    reasonForLeaving: 'Parent Transfer',
    dateOfLeaving: '2024-11-10',
    character: 'Very Good',
    conduct: 'Excellent',
    status: 'Issued'
  },
  {
    id: 'TC002',
    tcNumber: 'TC/2024/002',
    studentName: 'Kavya Reddy',
    admissionNo: 'ADM/2023/078',
    class: '8-A',
    dateOfIssue: '2024-12-01',
    reasonForLeaving: 'Family Relocation',
    dateOfLeaving: '2024-11-28',
    character: 'Good',
    conduct: 'Good',
    status: 'Issued'
  }
];

// Mock Admission Report Data
export const admissionReportData = {
  totalAdmissions: 245,
  thisMonth: 25,
  thisWeek: 5,
  pending: 8,
  approved: 230,
  rejected: 7,
  classWise: [
    { class: '10-A', admissions: 40 },
    { class: '10-B', admissions: 38 },
    { class: '9-A', admissions: 42 },
    { class: '9-B', admissions: 40 },
    { class: '8-A', admissions: 45 },
    { class: '8-B', admissions: 40 }
  ],
  monthlyTrend: [
    { month: 'Jan', count: 8 },
    { month: 'Feb', count: 12 },
    { month: 'Mar', count: 45 },
    { month: 'Apr', count: 120 },
    { month: 'May', count: 25 },
    { month: 'Jun', count: 15 },
    { month: 'Jul', count: 5 },
    { month: 'Aug', count: 3 },
    { month: 'Sep', count: 2 },
    { month: 'Oct', count: 5 },
    { month: 'Nov', count: 3 },
    { month: 'Dec', count: 2 }
  ]
};

// Mock Fee Report Data
export const feeReportData = {
  totalFeeCollected: 9850000,
  thisMonth: 1250000,
  thisWeek: 325000,
  today: 125000,
  pendingTotal: 2150000,
  classWiseFee: [
    { class: '10-A', total: 820000, collected: 750000, pending: 70000, percentage: 91.5 },
    { class: '10-B', total: 776000, collected: 720000, pending: 56000, percentage: 92.8 },
    { class: '9-A', total: 861000, collected: 780000, pending: 81000, percentage: 90.6 },
    { class: '9-B', total: 820000, collected: 760000, pending: 60000, percentage: 92.7 },
    { class: '8-A', total: 922500, collected: 850000, pending: 72500, percentage: 92.1 }
  ],
  paymentModeBreakdown: [
    { mode: 'Cash', amount: 2500000, percentage: 25.4 },
    { mode: 'Online', amount: 5850000, percentage: 59.4 },
    { mode: 'Cheque', amount: 1200000, percentage: 12.2 },
    { mode: 'DD', amount: 300000, percentage: 3.0 }
  ],
  monthlyCollection: [
    { month: 'Apr', amount: 2500000 },
    { month: 'May', amount: 1800000 },
    { month: 'Jun', amount: 1200000 },
    { month: 'Jul', amount: 950000 },
    { month: 'Aug', amount: 850000 },
    { month: 'Sep', amount: 750000 },
    { month: 'Oct', amount: 700000 },
    { month: 'Nov', amount: 650000 },
    { month: 'Dec', amount: 450000 }
  ]
};

// Mock Daily Summary Data
export const dailySummaryData = {
  date: new Date().toISOString().split('T')[0],
  admissions: {
    new: 5,
    approved: 3,
    pending: 2,
    list: admissionListData.slice(0, 5)
  },
  fees: {
    collected: 125000,
    transactions: 15,
    cash: 45000,
    online: 65000,
    cheque: 15000,
    receipts: feeReceiptsData.slice(0, 5)
  },
  documents: {
    uploaded: 8,
    verified: 5,
    pending: 3,
    list: documentsData.slice(0, 5)
  },
  enquiries: {
    new: 8,
    followUp: 5,
    converted: 2,
    list: enquiryListData.slice(0, 5)
  },
  certificates: {
    bonafide: 3,
    character: 2,
    tc: 1,
    study: 2
  },
  activities: [
    { time: '10:30 AM', activity: 'Fee collected from STU001', type: 'fee', amount: 15000 },
    { time: '11:15 AM', activity: 'New admission approved - Rahul Kumar', type: 'admission' },
    { time: '11:45 AM', activity: 'Document verified - Birth Certificate', type: 'document' },
    { time: '12:30 PM', activity: 'TC generated for STU156', type: 'tc' },
    { time: '01:15 PM', activity: 'Bonafide certificate issued', type: 'certificate' },
    { time: '02:00 PM', activity: 'Fee collected from STU045', type: 'fee', amount: 8000 },
    { time: '02:30 PM', activity: 'New enquiry - Parent contact', type: 'enquiry' },
    { time: '03:00 PM', activity: 'Student record updated - STU089', type: 'update' }
  ]
};

// Mock Advanced Student Records with Additional Fields
export const advancedStudentRecords = mockStudents.map(student => ({
  ...student,
  feeDetails: {
    totalFee: 20500,
    paidAmount: Math.floor(Math.random() * 20500),
    pendingAmount: 0,
    lastPaymentDate: '2024-12-01',
    paymentHistory: [
      { date: '2024-04-15', amount: 10000, mode: 'Online', receiptNo: 'FEE/2024/001' },
      { date: '2024-08-20', amount: 8000, mode: 'Cash', receiptNo: 'FEE/2024/002' }
    ]
  },
  documents: [
    { type: 'Birth Certificate', status: 'Verified', uploadDate: '2023-03-15' },
    { type: 'Aadhar Card', status: 'Verified', uploadDate: '2023-03-15' },
    { type: 'Transfer Certificate', status: 'Verified', uploadDate: '2023-03-16' },
    { type: 'Photo', status: 'Verified', uploadDate: '2023-03-15' }
  ],
  attendance: {
    percentage: generateAttendancePercentage(75, 98),
    presentDays: Math.floor(Math.random() * 10) + 85,
    absentDays: Math.floor(Math.random() * 5),
    totalDays: 95
  },
  healthInfo: {
    bloodGroup: student.bloodGroup,
    allergies: ['None'],
    medicalConditions: [],
    emergencyContact: student.guardianPhone
  }
}));

// ==================== EXPANDED API FUNCTIONS ====================

// Search Student
export const searchStudent = async (searchTerm, searchBy = 'name') => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = studentSearchResults.filter(student => {
          if (searchBy === 'name') {
            return student.fullName.toLowerCase().includes(searchTerm.toLowerCase());
          } else if (searchBy === 'admissionNo') {
            return student.admissionNo.includes(searchTerm);
          } else if (searchBy === 'class') {
            return `${student.class}-${student.section}`.includes(searchTerm);
          }
          return false;
        });
        resolve(results);
      }, 500);
    });
  }
  // Real API call here
};

// Get Certificate Templates
export const getCertificateTemplates = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(certificateTemplates), 500);
    });
  }
  // Real API call here
};

// Generate Certificate
export const generateCertificate = async (certificateData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const certNumber = `CERT/2024/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
        resolve({ 
          success: true, 
          data: { certNumber, ...certificateData }, 
          message: 'Certificate generated successfully' 
        });
      }, 500);
    });
  }
  // Real API call here
};

// Get TC Issued List
export const getTCIssuedList = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(tcIssuedList), 500);
    });
  }
  // Real API call here
};

// Get Admission Report
export const getAdmissionReport = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(admissionReportData), 500);
    });
  }
  // Real API call here
};

// Get Fee Report
export const getFeeReport = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(feeReportData), 500);
    });
  }
  // Real API call here
};

// Get Daily Summary
export const getDailySummary = async (date = null) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(dailySummaryData), 500);
    });
  }
  // Real API call here
};

// Get Advanced Student Records
export const getAdvancedStudentRecords = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(advancedStudentRecords), 500);
    });
  }
  // Real API call here
};

// Bulk Send Fee Reminder
export const bulkSendFeeReminder = async (studentIds, reminderType = 'sms') => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          sent: studentIds.length, 
          message: `${reminderType.toUpperCase()} reminders sent to ${studentIds.length} parents` 
        });
      }, 1000);
    });
  }
  // Real API call here
};

// Generate Defaulter Report
export const generateDefaulterReport = async (daysOverdue = 30) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const defaulters = feeDefaultersData.filter(d => d.daysOverdue >= daysOverdue);
        resolve({ 
          success: true, 
          data: defaulters,
          totalAmount: defaulters.reduce((sum, d) => sum + d.pendingAmount, 0),
          count: defaulters.length
        });
      }, 500);
    });
  }
  // Real API call here
};

export default {
  getDashboardData,
  createAdmission,
  getAdmissionList,
  updateAdmissionStatus,
  getEnquiryList,
  createEnquiry,
  updateEnquiry,
  getStudentRecords,
  updateStudentRecord,
  getStudentFeeDetails,
  collectFee,
  getFeeReceipts,
  getPendingFees,
  getFeeDefaulters,
  uploadDocument,
  getDocuments,
  verifyDocument,
  generateTC,
  searchStudent,
  getCertificateTemplates,
  generateCertificate,
  getTCIssuedList,
  getAdmissionReport,
  getFeeReport,
  getDailySummary,
  getAdvancedStudentRecords,
  bulkSendFeeReminder,
  generateDefaulterReport
};
