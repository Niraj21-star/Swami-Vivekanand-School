/**
 * Teacher Portal Service
 * Mock API for teacher-specific portal operations
 */

// Mock data for teacher's classes
const mockClasses = [
  {
    id: 1,
    className: 'Class 10-A',
    subject: 'Mathematics',
    students: 35,
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    room: 'Room 201',
    nextClass: '2025-12-19 09:00',
    progress: 75
  },
  {
    id: 2,
    className: 'Class 10-B',
    subject: 'Mathematics',
    students: 32,
    schedule: 'Tue, Thu - 10:00 AM',
    room: 'Room 202',
    nextClass: '2025-12-19 10:00',
    progress: 68
  },
  {
    id: 3,
    className: 'Class 11-A',
    subject: 'Physics',
    students: 30,
    schedule: 'Mon, Wed - 11:00 AM',
    room: 'Lab 101',
    nextClass: '2025-12-19 11:00',
    progress: 82
  }
];

// Mock students data
const mockStudents = [
  {
    id: 1,
    rollNo: 'STU001',
    name: 'Aarav Sharma',
    class: '10-A',
    attendance: 95,
    grade: 'A',
    lastScore: 92,
    behavior: 'Excellent',
    parentContact: '+91 98765 43210'
  },
  {
    id: 2,
    rollNo: 'STU002',
    name: 'Diya Patel',
    class: '10-A',
    attendance: 88,
    grade: 'A',
    lastScore: 88,
    behavior: 'Good',
    parentContact: '+91 98765 43211'
  },
  {
    id: 3,
    rollNo: 'STU003',
    name: 'Arjun Kumar',
    class: '10-A',
    attendance: 92,
    grade: 'B+',
    lastScore: 85,
    behavior: 'Excellent',
    parentContact: '+91 98765 43212'
  },
  {
    id: 4,
    rollNo: 'STU004',
    name: 'Ananya Singh',
    class: '10-B',
    attendance: 90,
    grade: 'A',
    lastScore: 90,
    behavior: 'Good',
    parentContact: '+91 98765 43213'
  },
  {
    id: 5,
    rollNo: 'STU005',
    name: 'Vihaan Gupta',
    class: '10-B',
    attendance: 85,
    grade: 'B',
    lastScore: 82,
    behavior: 'Needs Attention',
    parentContact: '+91 98765 43214'
  }
];

// Mock attendance data
const mockAttendance = [
  {
    id: 1,
    date: '2025-12-18',
    class: '10-A',
    subject: 'Mathematics',
    totalStudents: 35,
    present: 33,
    absent: 2,
    percentage: 94.3
  },
  {
    id: 2,
    date: '2025-12-18',
    class: '10-B',
    subject: 'Mathematics',
    totalStudents: 32,
    present: 30,
    absent: 2,
    percentage: 93.8
  },
  {
    id: 3,
    date: '2025-12-17',
    class: '10-A',
    subject: 'Mathematics',
    totalStudents: 35,
    present: 34,
    absent: 1,
    percentage: 97.1
  }
];

// Mock grades/assignments data
const mockAssignments = [
  {
    id: 1,
    title: 'Algebra Test - Chapter 5',
    class: '10-A',
    subject: 'Mathematics',
    dueDate: '2025-12-20',
    totalMarks: 100,
    submitted: 30,
    pending: 5,
    avgScore: 85,
    status: 'Active'
  },
  {
    id: 2,
    title: 'Geometry Assignment',
    class: '10-B',
    subject: 'Mathematics',
    dueDate: '2025-12-22',
    totalMarks: 50,
    submitted: 25,
    pending: 7,
    avgScore: 78,
    status: 'Active'
  },
  {
    id: 3,
    title: 'Physics Lab Report',
    class: '11-A',
    subject: 'Physics',
    dueDate: '2025-12-25',
    totalMarks: 100,
    submitted: 20,
    pending: 10,
    avgScore: 88,
    status: 'Active'
  }
];

// Mock student grades for specific assignment
const mockStudentGrades = [
  {
    id: 1,
    studentName: 'Aarav Sharma',
    rollNo: 'STU001',
    marksObtained: 92,
    totalMarks: 100,
    grade: 'A',
    remarks: 'Excellent work',
    submittedOn: '2025-12-18'
  },
  {
    id: 2,
    studentName: 'Diya Patel',
    rollNo: 'STU002',
    marksObtained: 88,
    totalMarks: 100,
    grade: 'A',
    remarks: 'Very good',
    submittedOn: '2025-12-18'
  },
  {
    id: 3,
    studentName: 'Arjun Kumar',
    rollNo: 'STU003',
    marksObtained: 85,
    totalMarks: 100,
    grade: 'B+',
    remarks: 'Good effort',
    submittedOn: '2025-12-17'
  }
];

// API Functions

/**
 * Get teacher's classes
 */
export const getTeacherClasses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClasses);
    }, 500);
  });
};

/**
 * Get students for a specific class
 */
export const getStudentsByClass = async (classId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = classId ? mockStudents.filter(s => s.class.includes(classId)) : mockStudents;
      resolve(filtered);
    }, 500);
  });
};

/**
 * Get all students across teacher's classes
 */
export const getAllStudents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStudents);
    }, 500);
  });
};

/**
 * Get attendance records
 */
export const getAttendanceRecords = async (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockAttendance];
      
      if (filters.class) {
        filtered = filtered.filter(a => a.class === filters.class);
      }
      
      if (filters.date) {
        filtered = filtered.filter(a => a.date === filters.date);
      }
      
      resolve(filtered);
    }, 500);
  });
};

/**
 * Mark attendance for a class
 */
export const markAttendance = async (attendanceData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAttendance = {
        id: mockAttendance.length + 1,
        ...attendanceData,
        percentage: (attendanceData.present / attendanceData.totalStudents) * 100
      };
      mockAttendance.unshift(newAttendance);
      resolve(newAttendance);
    }, 500);
  });
};

/**
 * Get assignments/tests
 */
export const getAssignments = async (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockAssignments];
      
      if (filters.class) {
        filtered = filtered.filter(a => a.class === filters.class);
      }
      
      if (filters.status) {
        filtered = filtered.filter(a => a.status === filters.status);
      }
      
      resolve(filtered);
    }, 500);
  });
};

/**
 * Create new assignment
 */
export const createAssignment = async (assignmentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAssignment = {
        id: mockAssignments.length + 1,
        ...assignmentData,
        submitted: 0,
        pending: assignmentData.totalStudents || 0,
        avgScore: 0,
        status: 'Active'
      };
      mockAssignments.unshift(newAssignment);
      resolve(newAssignment);
    }, 500);
  });
};

/**
 * Get student grades for specific assignment
 */
export const getStudentGrades = async (assignmentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStudentGrades);
    }, 500);
  });
};

/**
 * Update student grade
 */
export const updateStudentGrade = async (studentId, gradeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockStudentGrades.findIndex(g => g.id === studentId);
      if (index !== -1) {
        mockStudentGrades[index] = { ...mockStudentGrades[index], ...gradeData };
        resolve(mockStudentGrades[index]);
      } else {
        const newGrade = { id: mockStudentGrades.length + 1, ...gradeData };
        mockStudentGrades.push(newGrade);
        resolve(newGrade);
      }
    }, 500);
  });
};

/**
 * Get teacher dashboard stats
 */
export const getTeacherDashboardStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalClasses: mockClasses.length,
        totalStudents: mockStudents.length,
        todayClasses: 4,
        pendingGrading: 15,
        avgAttendance: 93.5,
        upcomingTests: 3,
        recentActivities: [
          {
            id: 1,
            type: 'assignment',
            message: 'New assignment submitted by Aarav Sharma',
            time: '10 minutes ago'
          },
          {
            id: 2,
            type: 'grade',
            message: 'Graded 30 papers for Class 10-A',
            time: '2 hours ago'
          },
          {
            id: 3,
            type: 'attendance',
            message: 'Attendance marked for Class 10-B',
            time: '3 hours ago'
          }
        ]
      });
    }, 500);
  });
};

/**
 * Generate reports
 */
export const generateReport = async (reportType, filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `${reportType} report generated successfully`,
        data: {}
      });
    }, 1000);
  });
};

export default {
  getTeacherClasses,
  getStudentsByClass,
  getAllStudents,
  getAttendanceRecords,
  markAttendance,
  getAssignments,
  createAssignment,
  getStudentGrades,
  updateStudentGrade,
  getTeacherDashboardStats,
  generateReport
};
