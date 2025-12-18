/**
 * Principal Service
 * Mock data and API functions for Principal module
 */

import { 
  mockStudents, 
  mockTeachers, 
  mockClasses, 
  mockSubjects,
  mockExamTypes,
  generateRandomMarks,
  generateAttendancePercentage,
  getGrade 
} from '../utils/mockData';

const USE_MOCK = true;

// Mock Dashboard Data
export const principalDashboardData = {
  todayAttendance: 92.5,
  teacherActivity: 48,
  pendingApprovals: 5,
  totalStudents: 1234,
  examSchedule: 12,
  noticesPosted: 8,
  attendanceTrend: [
    { date: '2024-12-11', percentage: 90 },
    { date: '2024-12-12', percentage: 92 },
    { date: '2024-12-13', percentage: 89 },
    { date: '2024-12-14', percentage: 93 },
    { date: '2024-12-15', percentage: 91 },
    { date: '2024-12-16', percentage: 94 },
    { date: '2024-12-17', percentage: 92.5 }
  ],
  recentActivities: [
    { id: 1, action: 'New notice approved', time: '2 hours ago', icon: 'check' },
    { id: 2, action: 'Exam results reviewed', time: '5 hours ago', icon: 'file' },
    { id: 3, action: 'Teacher meeting scheduled', time: '1 day ago', icon: 'calendar' },
    { id: 4, action: 'Class observation completed', time: '1 day ago', icon: 'eye' },
    { id: 5, action: 'Annual report submitted', time: '2 days ago', icon: 'upload' }
  ],
  upcomingEvents: [
    { id: 1, title: 'Parent-Teacher Meeting', date: '2024-12-20', type: 'meeting' },
    { id: 2, title: 'Annual Day Celebration', date: '2024-12-25', type: 'event' },
    { id: 3, title: 'Half-Yearly Exam', date: '2024-12-28', type: 'exam' }
  ]
};

// Mock Classwise Attendance Data
export const classwiseAttendanceData = [
  { class: '1-A', present: 38, absent: 2, total: 40, percentage: 95, status: 'good' },
  { class: '1-B', present: 35, absent: 5, total: 40, percentage: 87.5, status: 'good' },
  { class: '2-A', present: 40, absent: 0, total: 40, percentage: 100, status: 'excellent' },
  { class: '2-B', present: 36, absent: 4, total: 40, percentage: 90, status: 'good' },
  { class: '3-A', present: 34, absent: 8, total: 42, percentage: 81, status: 'warning' },
  { class: '3-B', present: 37, absent: 3, total: 40, percentage: 92.5, status: 'good' },
  { class: '4-A', present: 39, absent: 1, total: 40, percentage: 97.5, status: 'excellent' },
  { class: '4-B', present: 33, absent: 7, total: 40, percentage: 82.5, status: 'warning' },
  { class: '5-A', present: 41, absent: 1, total: 42, percentage: 97.6, status: 'excellent' },
  { class: '5-B', present: 38, absent: 4, total: 42, percentage: 90.5, status: 'good' }
];

// Mock Student Attendance Details
export const studentAttendanceData = [
  { id: 1, name: 'Rajesh Kumar', rollNo: '001', present: 28, absent: 2, percentage: 93.3, status: 'good' },
  { id: 2, name: 'Priya Sharma', rollNo: '002', present: 30, absent: 0, percentage: 100, status: 'excellent' },
  { id: 3, name: 'Amit Singh', rollNo: '003', present: 25, absent: 5, percentage: 83.3, status: 'warning' },
  { id: 4, name: 'Sneha Patel', rollNo: '004', present: 29, absent: 1, percentage: 96.7, status: 'excellent' },
  { id: 5, name: 'Rahul Verma', rollNo: '005', present: 27, absent: 3, percentage: 90, status: 'good' }
];

// Mock Teacher Performance Data
export const teacherPerformanceData = [
  {
    id: 'TCH001',
    name: 'Dr. Sarah Smith',
    subject: 'Mathematics',
    classesTaken: 24,
    attendancePercentage: 98,
    homeworkAssigned: 15,
    feedbackScore: 4.5,
    rating: 5,
    remarks: 'Excellent teacher'
  },
  {
    id: 'TCH002',
    name: 'Mr. David Wilson',
    subject: 'Science',
    classesTaken: 22,
    attendancePercentage: 95,
    homeworkAssigned: 12,
    feedbackScore: 4.2,
    rating: 4,
    remarks: 'Very good performance'
  },
  {
    id: 'TCH003',
    name: 'Mrs. Emily Brown',
    subject: 'English',
    classesTaken: 26,
    attendancePercentage: 100,
    homeworkAssigned: 18,
    feedbackScore: 4.8,
    rating: 5,
    remarks: 'Outstanding dedication'
  },
  {
    id: 'TCH004',
    name: 'Mr. James Anderson',
    subject: 'Social Studies',
    classesTaken: 20,
    attendancePercentage: 92,
    homeworkAssigned: 10,
    feedbackScore: 4.0,
    rating: 4,
    remarks: 'Good teacher'
  },
  {
    id: 'TCH005',
    name: 'Ms. Jennifer Lee',
    subject: 'Computer Science',
    classesTaken: 18,
    attendancePercentage: 96,
    homeworkAssigned: 14,
    feedbackScore: 4.6,
    rating: 5,
    remarks: 'Innovative teaching methods'
  }
];

// Mock Exam Results Data
export const examResultsData = {
  examName: 'Mid-Term Exam 2024',
  classResults: [
    { class: '1-A', totalStudents: 40, passed: 38, failed: 2, passPercentage: 95, avgMarks: 78 },
    { class: '1-B', totalStudents: 40, passed: 35, failed: 5, passPercentage: 87.5, avgMarks: 72 },
    { class: '2-A', totalStudents: 40, passed: 40, failed: 0, passPercentage: 100, avgMarks: 85 },
    { class: '2-B', totalStudents: 40, passed: 36, failed: 4, passPercentage: 90, avgMarks: 76 },
    { class: '3-A', totalStudents: 42, passed: 38, failed: 4, passPercentage: 90.5, avgMarks: 74 }
  ],
  toppers: [
    { rank: 1, name: 'Priya Sharma', class: '10-A', marks: 495, percentage: 99 },
    { rank: 2, name: 'Amit Kumar', class: '10-B', marks: 490, percentage: 98 },
    { rank: 3, name: 'Sneha Patel', class: '10-A', marks: 488, percentage: 97.6 },
    { rank: 4, name: 'Rajesh Singh', class: '9-A', marks: 485, percentage: 97 },
    { rank: 5, name: 'Neha Gupta', class: '9-B', marks: 482, percentage: 96.4 }
  ],
  subjectAnalysis: [
    { subject: 'Mathematics', avgMarks: 75, passPercentage: 88 },
    { subject: 'Science', avgMarks: 78, passPercentage: 92 },
    { subject: 'English', avgMarks: 82, passPercentage: 95 },
    { subject: 'Social Studies', avgMarks: 80, passPercentage: 93 },
    { subject: 'Hindi', avgMarks: 76, passPercentage: 90 }
  ],
  gradeDistribution: [
    { grade: 'A+', count: 156, percentage: 12.6 },
    { grade: 'A', count: 320, percentage: 25.9 },
    { grade: 'B', count: 428, percentage: 34.7 },
    { grade: 'C', count: 245, percentage: 19.9 },
    { grade: 'D', count: 65, percentage: 5.3 },
    { grade: 'F', count: 20, percentage: 1.6 }
  ]
};

// Mock Notices Data
export const noticesData = [
  {
    id: 'NOT001',
    title: 'Parent-Teacher Meeting Notice',
    description: 'Dear Parents, The parent-teacher meeting will be held on 20th December 2024. Your presence is highly appreciated.',
    targetAudience: 'Parents',
    priority: 'High',
    validFrom: '2024-12-15',
    validTo: '2024-12-20',
    status: 'Published',
    createdBy: 'Principal',
    createdAt: '2024-12-15'
  },
  {
    id: 'NOT002',
    title: 'Annual Day Celebration',
    description: 'Annual day celebration will be organized on 25th December 2024. All students are requested to participate.',
    targetAudience: 'All',
    priority: 'High',
    validFrom: '2024-12-15',
    validTo: '2024-12-25',
    status: 'Published',
    createdBy: 'Principal',
    createdAt: '2024-12-14'
  },
  {
    id: 'NOT003',
    title: 'Winter Holiday Notice',
    description: 'School will remain closed from 26th December to 5th January for winter holidays.',
    targetAudience: 'All',
    priority: 'Medium',
    validFrom: '2024-12-20',
    validTo: '2024-12-26',
    status: 'Draft',
    createdBy: 'Principal',
    createdAt: '2024-12-16'
  }
];

// Mock Approval Queue Data
export const approvalsQueueData = [
  {
    id: 'APR001',
    noticeTitle: 'Sports Day Announcement',
    createdBy: 'Mr. David Wilson',
    dateCreated: '2024-12-16',
    priority: 'Medium',
    status: 'Pending Review',
    description: 'Annual sports day will be conducted on 30th December 2024'
  },
  {
    id: 'APR002',
    noticeTitle: 'Homework Policy Update',
    createdBy: 'Mrs. Emily Brown',
    dateCreated: '2024-12-15',
    priority: 'Low',
    status: 'Pending Review',
    description: 'Updated homework submission guidelines for all classes'
  },
  {
    id: 'APR003',
    noticeTitle: 'Exam Schedule Change',
    createdBy: 'Dr. Sarah Smith',
    dateCreated: '2024-12-17',
    priority: 'High',
    status: 'Pending Review',
    description: 'Mathematics exam rescheduled to 29th December due to teacher unavailability'
  }
];

/**
 * API Functions
 */

// Get Dashboard Data
export const getDashboardData = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(principalDashboardData), 500);
    });
  }
  // Real API call here
};

// Get Classwise Attendance
export const getClasswiseAttendance = async (date = null) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(classwiseAttendanceData), 500);
    });
  }
  // Real API call here
};

// Get Student Attendance Details
export const getStudentAttendance = async (classId, section, dateRange) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(studentAttendanceData), 500);
    });
  }
  // Real API call here
};

// Get Teacher Performance
export const getTeacherPerformance = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(teacherPerformanceData), 500);
    });
  }
  // Real API call here
};

// Add Teacher Remark
export const addTeacherRemark = async (teacherId, remark) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const teacher = teacherPerformanceData.find(t => t.id === teacherId);
        if (teacher) {
          teacher.remarks = remark;
          resolve({ success: true, message: 'Remark added successfully' });
        } else {
          resolve({ success: false, message: 'Teacher not found' });
        }
      }, 500);
    });
  }
  // Real API call here
};

// Get Exam Results
export const getExamResults = async (examId) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(examResultsData), 500);
    });
  }
  // Real API call here
};

// Get Notices
export const getNotices = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(noticesData), 500);
    });
  }
  // Real API call here
};

// Create Notice
export const createNotice = async (noticeData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newNotice = {
          id: `NOT${String(noticesData.length + 1).padStart(3, '0')}`,
          ...noticeData,
          createdBy: 'Principal',
          createdAt: new Date().toISOString().split('T')[0],
          status: noticeData.status || 'Draft'
        };
        noticesData.push(newNotice);
        resolve({ success: true, data: newNotice, message: 'Notice created successfully' });
      }, 500);
    });
  }
  // Real API call here
};

// Get Approvals Queue
export const getApprovalsQueue = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(approvalsQueueData), 500);
    });
  }
  // Real API call here
};

// Approve/Reject Notice
export const reviewNotice = async (approvalId, action, remarks = '') => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const approval = approvalsQueueData.find(a => a.id === approvalId);
        if (approval) {
          approval.status = action === 'approve' ? 'Approved' : 'Rejected';
          approval.remarks = remarks;
          resolve({ 
            success: true, 
            message: `Notice ${action === 'approve' ? 'approved' : 'rejected'} successfully` 
          });
        } else {
          resolve({ success: false, message: 'Approval not found' });
        }
      }, 500);
    });
  }
  // Real API call here
};

// ==================== ADDITIONAL MOCK DATA FOR ALL SECTIONS ====================

// Mock Monthly Attendance Report
export const monthlyAttendanceData = {
  month: 'December 2024',
  totalWorkingDays: 22,
  overallAttendance: 91.5,
  classData: [
    { class: '10-A', present: 858, absent: 22, totalDays: 880, percentage: 97.5 },
    { class: '10-B', present: 820, absent: 36, totalDays: 856, percentage: 95.8 },
    { class: '9-A', present: 898, absent: 26, totalDays: 924, percentage: 97.2 },
    { class: '9-B', present: 848, absent: 32, totalDays: 880, percentage: 96.4 },
    { class: '8-A', present: 950, absent: 40, totalDays: 990, percentage: 96.0 }
  ],
  trends: [
    { week: 'Week 1', percentage: 92.5 },
    { week: 'Week 2', percentage: 91.0 },
    { week: 'Week 3', percentage: 90.5 },
    { week: 'Week 4', percentage: 92.0 }
  ]
};

// Mock Teacher Directory (Expanded)
export const teacherDirectoryData = mockTeachers.map(teacher => ({
  ...teacher,
  attendanceThisMonth: generateAttendancePercentage(90, 100),
  leavesTaken: Math.floor(Math.random() * 3),
  classesAssigned: teacher.classes.length,
  performance: {
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
    studentFeedback: (Math.random() * 1 + 4).toFixed(1), // 4.0 to 5.0
    punctuality: generateAttendancePercentage(95, 100)
  }
}));

// Mock Teacher Attendance Data
export const teacherAttendanceData = mockTeachers.map(teacher => ({
  id: teacher.id,
  name: teacher.fullName,
  employeeId: teacher.employeeId,
  department: teacher.subjects[0],
  presentDays: Math.floor(Math.random() * 3) + 20,
  absentDays: Math.floor(Math.random() * 2),
  leaveDays: Math.floor(Math.random() * 2),
  percentage: generateAttendancePercentage(92, 100),
  status: 'Regular'
}));

// Mock Student Directory (Expanded)
export const studentDirectoryData = mockStudents.map(student => ({
  ...student,
  attendance: generateAttendancePercentage(75, 100),
  currentGrade: getGrade(generateRandomMarks(60, 95)),
  behaviorStatus: ['Excellent', 'Good', 'Average'][Math.floor(Math.random() * 3)],
  parentContact: student.guardianPhone
}));

// Mock Exam Schedule
export const examScheduleData = [
  {
    id: 'EXAM001',
    examName: 'Final Term Examination 2024',
    examType: 'Final',
    startDate: '2024-12-20',
    endDate: '2024-12-30',
    classes: ['10-A', '10-B', '9-A', '9-B', '8-A'],
    status: 'Upcoming',
    subjects: [
      { subject: 'Mathematics', date: '2024-12-20', time: '09:00 AM - 12:00 PM' },
      { subject: 'Science', date: '2024-12-21', time: '09:00 AM - 12:00 PM' },
      { subject: 'English', date: '2024-12-23', time: '09:00 AM - 12:00 PM' },
      { subject: 'Social Studies', date: '2024-12-24', time: '09:00 AM - 12:00 PM' },
      { subject: 'Hindi', date: '2024-12-26', time: '09:00 AM - 12:00 PM' },
      { subject: 'Computer Science', date: '2024-12-27', time: '09:00 AM - 12:00 PM' }
    ]
  },
  {
    id: 'EXAM002',
    examName: 'Mid Term Examination 2024',
    examType: 'Mid-Term',
    startDate: '2024-11-01',
    endDate: '2024-11-10',
    classes: ['10-A', '10-B', '9-A', '9-B', '8-A'],
    status: 'Completed',
    subjects: []
  }
];

// Mock Performance Analysis Data
export const performanceAnalysisData = {
  examComparison: [
    { exam: 'Term 1', avgMarks: 72.5, passPercentage: 89.5 },
    { exam: 'Mid Term', avgMarks: 75.8, passPercentage: 92.3 },
    { exam: 'Term 2', avgMarks: 78.2, passPercentage: 94.1 }
  ],
  classComparison: [
    { class: '10-A', avgMarks: 82.5, rank: 1 },
    { class: '10-B', avgMarks: 78.3, rank: 2 },
    { class: '9-A', avgMarks: 76.8, rank: 3 },
    { class: '9-B', avgMarks: 74.2, rank: 4 },
    { class: '8-A', avgMarks: 71.5, rank: 5 }
  ],
  subjectWise: mockSubjects.map(subject => ({
    subject: subject.name,
    avgMarks: generateRandomMarks(70, 90),
    passPercentage: generateAttendancePercentage(85, 98),
    improvement: (Math.random() * 10 - 2).toFixed(1) // -2 to +8
  })),
  yearlyTrend: [
    { month: 'Apr', performance: 72 },
    { month: 'May', performance: 74 },
    { month: 'Jun', performance: 75 },
    { month: 'Jul', performance: 76 },
    { month: 'Aug', performance: 78 },
    { month: 'Sep', performance: 79 },
    { month: 'Oct', performance: 80 },
    { month: 'Nov', performance: 81 },
    { month: 'Dec', performance: 82 }
  ]
};

// Mock Academic Reports Data
export const academicReportsData = {
  annualReport: {
    academicYear: '2024-2025',
    totalStudents: 1234,
    totalTeachers: 45,
    overallPassPercentage: 94.5,
    averageMarks: 76.8,
    topperDetails: {
      name: 'Priya Sharma',
      class: '10-A',
      percentage: 98.5,
      subjects: [
        { name: 'Mathematics', marks: 99 },
        { name: 'Science', marks: 98 },
        { name: 'English', marks: 99 },
        { name: 'Social Studies', marks: 98 },
        { name: 'Hindi', marks: 97 },
        { name: 'Computer Science', marks: 100 }
      ]
    },
    classWisePerformance: [
      { class: '10-A', students: 40, passed: 39, passPercentage: 97.5, avgMarks: 82.5 },
      { class: '10-B', students: 38, passed: 36, passPercentage: 94.7, avgMarks: 78.3 },
      { class: '9-A', students: 42, passed: 40, passPercentage: 95.2, avgMarks: 76.8 },
      { class: '9-B', students: 40, passed: 37, passPercentage: 92.5, avgMarks: 74.2 },
      { class: '8-A', students: 45, passed: 42, passPercentage: 93.3, avgMarks: 71.5 }
    ]
  },
  termWiseReport: {
    term1: { avgMarks: 72.5, passPercentage: 89.5 },
    term2: { avgMarks: 78.2, passPercentage: 94.1 },
    midTerm: { avgMarks: 75.8, passPercentage: 92.3 }
  }
};

// Mock Comparison Reports Data
export const comparisonReportsData = {
  yearToYear: [
    { year: '2022-23', passPercentage: 88.5, avgMarks: 71.2 },
    { year: '2023-24', passPercentage: 91.8, avgMarks: 74.5 },
    { year: '2024-25', passPercentage: 94.5, avgMarks: 76.8 }
  ],
  classToClass: [
    { class: '10-A', currentYear: 82.5, lastYear: 79.3, improvement: '+3.2' },
    { class: '10-B', currentYear: 78.3, lastYear: 76.1, improvement: '+2.2' },
    { class: '9-A', currentYear: 76.8, lastYear: 75.5, improvement: '+1.3' },
    { class: '9-B', currentYear: 74.2, lastYear: 73.8, improvement: '+0.4' },
    { class: '8-A', currentYear: 71.5, lastYear: 70.2, improvement: '+1.3' }
  ],
  subjectComparison: mockSubjects.map(subject => ({
    subject: subject.name,
    currentYear: generateRandomMarks(75, 88),
    lastYear: generateRandomMarks(70, 85),
    improvement: (Math.random() * 5).toFixed(1)
  }))
};

// ==================== EXPANDED API FUNCTIONS ====================

// Get Monthly Attendance Report
export const getMonthlyAttendance = async (month, year) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(monthlyAttendanceData), 500);
    });
  }
  // Real API call here
};

// Get Teacher Directory
export const getTeacherDirectory = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(teacherDirectoryData), 500);
    });
  }
  // Real API call here
};

// Get Teacher Attendance
export const getTeacherAttendance = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(teacherAttendanceData), 500);
    });
  }
  // Real API call here
};

// Get Student Directory
export const getStudentDirectory = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(studentDirectoryData), 500);
    });
  }
  // Real API call here
};

// Get Exam Schedule
export const getExamSchedule = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(examScheduleData), 500);
    });
  }
  // Real API call here
};

// Get Performance Analysis
export const getPerformanceAnalysis = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(performanceAnalysisData), 500);
    });
  }
  // Real API call here
};

// Get Academic Reports
export const getAcademicReports = async (reportType, filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(academicReportsData), 500);
    });
  }
  // Real API call here
};

// Get Comparison Reports
export const getComparisonReports = async (filters = {}) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(comparisonReportsData), 500);
    });
  }
  // Real API call here
};

export default {
  getDashboardData,
  getClasswiseAttendance,
  getStudentAttendance,
  getTeacherPerformance,
  addTeacherRemark,
  getExamResults,
  getNotices,
  createNotice,
  getApprovalsQueue,
  reviewNotice,
  getMonthlyAttendance,
  getTeacherDirectory,
  getTeacherAttendance,
  getStudentDirectory,
  getExamSchedule,
  getPerformanceAnalysis,
  getAcademicReports,
  getComparisonReports
};
