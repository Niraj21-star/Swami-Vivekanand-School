/**
 * Admin Service
 * Handles all admin-specific operations including teacher management,
 * class management, attendance, fees, reports, and system settings
 */

// Mock data for admin operations
const mockTeachers = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@school.com',
    phone: '+91 98765 43210',
    photo: 'https://i.pravatar.cc/150?img=12',
    employeeId: 'EMP001',
    qualification: 'M.Sc., Ph.D. Physics',
    experience: 15,
    dateOfJoining: '2010-06-15',
    subjects: ['Physics', 'Mathematics'],
    classes: ['Class 11 A', 'Class 12 B'],
    salary: 65000,
    status: 'Active',
    address: '123, MG Road, Bangalore',
    emergencyContact: '+91 98765 43211'
  },
  {
    id: 2,
    name: 'Mrs. Priya Sharma',
    email: 'priya.sharma@school.com',
    phone: '+91 98765 43212',
    photo: 'https://i.pravatar.cc/150?img=47',
    employeeId: 'EMP002',
    qualification: 'M.A. English',
    experience: 12,
    dateOfJoining: '2012-07-20',
    subjects: ['English', 'Literature'],
    classes: ['Class 9 A', 'Class 10 B'],
    salary: 55000,
    status: 'Active',
    address: '456, Brigade Road, Bangalore',
    emergencyContact: '+91 98765 43213'
  },
  {
    id: 3,
    name: 'Mr. Amit Patel',
    email: 'amit.patel@school.com',
    phone: '+91 98765 43214',
    photo: 'https://i.pravatar.cc/150?img=33',
    employeeId: 'EMP003',
    qualification: 'M.Sc. Chemistry',
    experience: 10,
    dateOfJoining: '2014-08-10',
    subjects: ['Chemistry', 'Biology'],
    classes: ['Class 11 B', 'Class 12 A'],
    salary: 58000,
    status: 'Active',
    address: '789, Indiranagar, Bangalore',
    emergencyContact: '+91 98765 43215'
  },
  {
    id: 4,
    name: 'Ms. Sneha Reddy',
    email: 'sneha.reddy@school.com',
    phone: '+91 98765 43216',
    photo: 'https://i.pravatar.cc/150?img=44',
    employeeId: 'EMP004',
    qualification: 'M.A. History',
    experience: 8,
    dateOfJoining: '2016-09-05',
    subjects: ['History', 'Geography'],
    classes: ['Class 8 A', 'Class 9 B'],
    salary: 52000,
    status: 'Active',
    address: '321, Koramangala, Bangalore',
    emergencyContact: '+91 98765 43217'
  },
  {
    id: 5,
    name: 'Mr. Vikram Singh',
    email: 'vikram.singh@school.com',
    phone: '+91 98765 43218',
    photo: 'https://i.pravatar.cc/150?img=51',
    employeeId: 'EMP005',
    qualification: 'B.P.Ed., M.A. Sports Science',
    experience: 6,
    dateOfJoining: '2018-10-15',
    subjects: ['Physical Education', 'Sports'],
    classes: ['All Classes'],
    salary: 48000,
    status: 'Active',
    address: '654, Jayanagar, Bangalore',
    emergencyContact: '+91 98765 43219'
  }
];

const mockClasses = [
  {
    id: 1,
    name: 'Class 10',
    section: 'A',
    classTeacher: 'Mrs. Priya Sharma',
    strength: 45,
    capacity: 50,
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Hindi'],
    timetable: 'Monday to Friday, 8:00 AM - 2:00 PM',
    room: 'Room 101'
  },
  {
    id: 2,
    name: 'Class 10',
    section: 'B',
    classTeacher: 'Mr. Amit Patel',
    strength: 42,
    capacity: 50,
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Hindi'],
    timetable: 'Monday to Friday, 8:00 AM - 2:00 PM',
    room: 'Room 102'
  },
  {
    id: 3,
    name: 'Class 11',
    section: 'A',
    classTeacher: 'Dr. Rajesh Kumar',
    strength: 38,
    capacity: 45,
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'],
    timetable: 'Monday to Saturday, 8:00 AM - 2:30 PM',
    room: 'Room 201'
  },
  {
    id: 4,
    name: 'Class 11',
    section: 'B',
    classTeacher: 'Ms. Sneha Reddy',
    strength: 35,
    capacity: 45,
    subjects: ['History', 'Geography', 'Economics', 'English', 'Political Science'],
    timetable: 'Monday to Saturday, 8:00 AM - 2:30 PM',
    room: 'Room 202'
  },
  {
    id: 5,
    name: 'Class 12',
    section: 'A',
    classTeacher: 'Dr. Rajesh Kumar',
    strength: 40,
    capacity: 45,
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'],
    timetable: 'Monday to Saturday, 8:00 AM - 3:00 PM',
    room: 'Room 301'
  }
];

const mockAttendanceData = {
  today: {
    date: '2024-12-18',
    students: {
      total: 850,
      present: 812,
      absent: 38,
      leave: 15,
      percentage: 95.5
    },
    teachers: {
      total: 45,
      present: 43,
      absent: 2,
      leave: 1,
      percentage: 95.6
    }
  },
  monthly: [
    { date: '2024-12-01', students: 94.2, teachers: 97.8 },
    { date: '2024-12-02', students: 95.1, teachers: 95.6 },
    { date: '2024-12-03', students: 93.8, teachers: 93.3 },
    { date: '2024-12-04', students: 96.2, teachers: 97.8 },
    { date: '2024-12-05', students: 95.5, teachers: 95.6 }
  ],
  leaveRequests: [
    {
      id: 1,
      type: 'Student',
      name: 'Rahul Sharma',
      class: 'Class 10 A',
      from: '2024-12-20',
      to: '2024-12-22',
      reason: 'Family function',
      status: 'Pending'
    },
    {
      id: 2,
      type: 'Teacher',
      name: 'Mrs. Priya Sharma',
      designation: 'English Teacher',
      from: '2024-12-25',
      to: '2024-12-26',
      reason: 'Medical leave',
      status: 'Pending'
    },
    {
      id: 3,
      type: 'Student',
      name: 'Priya Patel',
      class: 'Class 11 A',
      from: '2024-12-23',
      to: '2024-12-24',
      reason: 'Medical emergency',
      status: 'Approved'
    }
  ]
};

const mockFeeData = {
  structure: [
    { id: 1, class: 'Class 10', tuitionFee: 25000, labFee: 3000, libraryFee: 1500, sportsFee: 2000, total: 31500 },
    { id: 2, class: 'Class 11', tuitionFee: 30000, labFee: 4000, libraryFee: 1500, sportsFee: 2500, total: 38000 },
    { id: 3, class: 'Class 12', tuitionFee: 32000, labFee: 4500, libraryFee: 1500, sportsFee: 2500, total: 40500 },
    { id: 4, class: 'Class 9', tuitionFee: 22000, labFee: 2500, libraryFee: 1500, sportsFee: 2000, total: 28000 },
    { id: 5, class: 'Class 8', tuitionFee: 20000, labFee: 2000, libraryFee: 1500, sportsFee: 1500, total: 25000 }
  ],
  collection: {
    totalExpected: 2850000,
    totalCollected: 2565000,
    totalPending: 285000,
    collectionPercentage: 90,
    currentMonth: {
      expected: 285000,
      collected: 245000,
      pending: 40000
    }
  },
  defaulters: [
    {
      id: 1,
      studentName: 'Amit Kumar',
      admissionNo: 'ADM2024001',
      class: 'Class 10 A',
      totalFee: 31500,
      paid: 20000,
      pending: 11500,
      lastPayment: '2024-10-15',
      status: 'Overdue'
    },
    {
      id: 2,
      studentName: 'Neha Singh',
      admissionNo: 'ADM2024002',
      class: 'Class 11 B',
      totalFee: 38000,
      paid: 25000,
      pending: 13000,
      lastPayment: '2024-09-20',
      status: 'Overdue'
    },
    {
      id: 3,
      studentName: 'Raj Patel',
      admissionNo: 'ADM2024003',
      class: 'Class 12 A',
      totalFee: 40500,
      paid: 30000,
      pending: 10500,
      lastPayment: '2024-11-10',
      status: 'Due'
    }
  ],
  recentPayments: [
    {
      id: 1,
      receiptNo: 'REC001',
      studentName: 'Priya Sharma',
      class: 'Class 10 A',
      amount: 15000,
      paymentMode: 'Online',
      date: '2024-12-18',
      status: 'Completed'
    },
    {
      id: 2,
      receiptNo: 'REC002',
      studentName: 'Vikram Reddy',
      class: 'Class 11 A',
      amount: 19000,
      paymentMode: 'Cash',
      date: '2024-12-17',
      status: 'Completed'
    },
    {
      id: 3,
      receiptNo: 'REC003',
      studentName: 'Anjali Gupta',
      class: 'Class 12 B',
      amount: 20000,
      paymentMode: 'Cheque',
      date: '2024-12-16',
      status: 'Completed'
    }
  ]
};

const mockReports = {
  academic: {
    overall: {
      totalStudents: 850,
      passPercentage: 94.5,
      averageMarks: 78.5,
      toppers: 45,
      failures: 28
    },
    classwise: [
      { class: 'Class 10 A', students: 45, pass: 43, passPercentage: 95.6, average: 82.3, topper: 'Rahul Kumar (94.5%)' },
      { class: 'Class 10 B', students: 42, pass: 40, passPercentage: 95.2, average: 79.8, topper: 'Priya Singh (92.8%)' },
      { class: 'Class 11 A', students: 38, pass: 36, passPercentage: 94.7, average: 76.5, topper: 'Amit Patel (91.2%)' },
      { class: 'Class 11 B', students: 35, pass: 33, passPercentage: 94.3, average: 75.2, topper: 'Neha Sharma (89.5%)' },
      { class: 'Class 12 A', students: 40, pass: 38, passPercentage: 95.0, average: 80.1, topper: 'Vikram Reddy (95.8%)' }
    ],
    subjectwise: [
      { subject: 'Mathematics', average: 75.5, passPercentage: 92.3, highest: 98, lowest: 45 },
      { subject: 'Science', average: 78.2, passPercentage: 94.1, highest: 97, lowest: 48 },
      { subject: 'English', average: 82.1, passPercentage: 96.5, highest: 99, lowest: 52 },
      { subject: 'Social Studies', average: 79.8, passPercentage: 95.2, highest: 96, lowest: 50 },
      { subject: 'Hindi', average: 80.5, passPercentage: 95.8, highest: 98, lowest: 53 }
    ]
  },
  attendance: {
    overall: {
      averageAttendance: 95.2,
      totalWorkingDays: 180,
      totalStudentDays: 153000,
      totalPresentDays: 145656
    },
    classwise: [
      { class: 'Class 10 A', attendance: 96.2, workingDays: 180, present: 7803, absent: 297 },
      { class: 'Class 10 B', attendance: 95.8, workingDays: 180, present: 7244, absent: 316 },
      { class: 'Class 11 A', attendance: 94.5, workingDays: 180, present: 6468, absent: 372 },
      { class: 'Class 11 B', attendance: 93.8, workingDays: 180, present: 5901, absent: 399 },
      { class: 'Class 12 A', attendance: 95.5, workingDays: 180, present: 6876, absent: 324 }
    ],
    monthly: [
      { month: 'August', attendance: 94.2 },
      { month: 'September', attendance: 95.1 },
      { month: 'October', attendance: 96.2 },
      { month: 'November', attendance: 95.8 },
      { month: 'December', attendance: 94.5 }
    ]
  },
  financial: {
    income: {
      tuitionFees: 2400000,
      labFees: 320000,
      libraryFees: 127500,
      sportsFees: 170000,
      other: 150000,
      total: 3167500
    },
    expenses: {
      salaries: 1800000,
      maintenance: 250000,
      utilities: 120000,
      supplies: 180000,
      other: 100000,
      total: 2450000
    },
    monthlyTrend: [
      { month: 'August', income: 650000, expenses: 490000, profit: 160000 },
      { month: 'September', income: 620000, expenses: 485000, profit: 135000 },
      { month: 'October', income: 680000, expenses: 495000, profit: 185000 },
      { month: 'November', income: 645000, expenses: 490000, profit: 155000 },
      { month: 'December', income: 572500, expenses: 490000, profit: 82500 }
    ]
  }
};

const mockSettings = {
  academicYear: {
    current: '2024-2025',
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    terms: [
      { name: 'First Term', startDate: '2024-06-01', endDate: '2024-10-31' },
      { name: 'Second Term', startDate: '2024-11-01', endDate: '2025-03-31' },
      { name: 'Third Term', startDate: '2025-04-01', endDate: '2025-05-31' }
    ]
  },
  school: {
    name: 'Swami Vivekanand School',
    address: 'MG Road, Bangalore, Karnataka - 560001',
    phone: '+91 80 2555 1234',
    email: 'info@svschool.edu.in',
    website: 'www.svschool.edu.in',
    affiliation: 'CBSE - 830001',
    principal: 'Dr. Suresh Kumar'
  },
  gradingSystem: [
    { grade: 'A+', minMarks: 91, maxMarks: 100, gpa: 10 },
    { grade: 'A', minMarks: 81, maxMarks: 90, gpa: 9 },
    { grade: 'B+', minMarks: 71, maxMarks: 80, gpa: 8 },
    { grade: 'B', minMarks: 61, maxMarks: 70, gpa: 7 },
    { grade: 'C+', minMarks: 51, maxMarks: 60, gpa: 6 },
    { grade: 'C', minMarks: 41, maxMarks: 50, gpa: 5 },
    { grade: 'D', minMarks: 33, maxMarks: 40, gpa: 4 },
    { grade: 'F', minMarks: 0, maxMarks: 32, gpa: 0 }
  ],
  notifications: {
    email: true,
    sms: false,
    push: true,
    attendanceAlerts: true,
    feeReminders: true,
    examNotifications: true
  }
};

// Teacher Management
export const getTeacherDirectory = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTeachers), 500);
  });
};

export const getTeacherById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teacher = mockTeachers.find(t => t.id === id);
      resolve(teacher);
    }, 300);
  });
};

export const addTeacher = async (teacherData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTeacher = {
        ...teacherData,
        id: mockTeachers.length + 1,
        employeeId: `EMP${String(mockTeachers.length + 1).padStart(3, '0')}`
      };
      mockTeachers.push(newTeacher);
      resolve(newTeacher);
    }, 500);
  });
};

export const updateTeacher = async (id, teacherData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockTeachers.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTeachers[index] = { ...mockTeachers[index], ...teacherData };
        resolve(mockTeachers[index]);
      }
      resolve(null);
    }, 500);
  });
};

export const deleteTeacher = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockTeachers.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTeachers.splice(index, 1);
        resolve(true);
      }
      resolve(false);
    }, 500);
  });
};

// Class Management
export const getClassDirectory = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockClasses), 500);
  });
};

export const getClassById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const classData = mockClasses.find(c => c.id === id);
      resolve(classData);
    }, 300);
  });
};

export const addClass = async (classData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newClass = {
        ...classData,
        id: mockClasses.length + 1
      };
      mockClasses.push(newClass);
      resolve(newClass);
    }, 500);
  });
};

export const updateClass = async (id, classData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockClasses.findIndex(c => c.id === id);
      if (index !== -1) {
        mockClasses[index] = { ...mockClasses[index], ...classData };
        resolve(mockClasses[index]);
      }
      resolve(null);
    }, 500);
  });
};

export const deleteClass = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockClasses.findIndex(c => c.id === id);
      if (index !== -1) {
        mockClasses.splice(index, 1);
        resolve(true);
      }
      resolve(false);
    }, 500);
  });
};

// Attendance Management
export const getAttendanceData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAttendanceData), 500);
  });
};

export const getTodayAttendance = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAttendanceData.today), 300);
  });
};

export const getLeaveRequests = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAttendanceData.leaveRequests), 300);
  });
};

export const approveLeave = async (id, status, remarks) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const leave = mockAttendanceData.leaveRequests.find(l => l.id === id);
      if (leave) {
        leave.status = status;
        leave.remarks = remarks;
        resolve(leave);
      }
      resolve(null);
    }, 500);
  });
};

// Fee Management
export const getFeeStructure = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFeeData.structure), 500);
  });
};

export const getFeeCollection = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFeeData.collection), 300);
  });
};

export const getDefaulters = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFeeData.defaulters), 300);
  });
};

export const getRecentPayments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFeeData.recentPayments), 300);
  });
};

export const updateFeeStructure = async (id, feeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockFeeData.structure.findIndex(f => f.id === id);
      if (index !== -1) {
        mockFeeData.structure[index] = { ...mockFeeData.structure[index], ...feeData };
        resolve(mockFeeData.structure[index]);
      }
      resolve(null);
    }, 500);
  });
};

// Reports
export const getAcademicReport = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReports.academic), 500);
  });
};

export const getAttendanceReport = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReports.attendance), 500);
  });
};

export const getFinancialReport = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReports.financial), 500);
  });
};

// Settings
export const getSettings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSettings), 500);
  });
};

export const updateSettings = async (settingsData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      Object.assign(mockSettings, settingsData);
      resolve(mockSettings);
    }, 500);
  });
};

export const getAcademicYear = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSettings.academicYear), 300);
  });
};

export const updateAcademicYear = async (yearData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockSettings.academicYear = { ...mockSettings.academicYear, ...yearData };
      resolve(mockSettings.academicYear);
    }, 500);
  });
};

export const getGradingSystem = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSettings.gradingSystem), 300);
  });
};

export const updateGradingSystem = async (gradingData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockSettings.gradingSystem = gradingData;
      resolve(mockSettings.gradingSystem);
    }, 500);
  });
};
