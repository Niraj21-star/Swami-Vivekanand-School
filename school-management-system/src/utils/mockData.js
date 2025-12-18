/**
 * Common Mock Data
 * Shared mock data for students, teachers, classes, etc.
 * Used across all modules (Admin, Teacher, Principal, Clerk)
 */

// Mock Students Data
export const mockStudents = [
  {
    id: 'STU001',
    admissionNo: 'ADM/2023/001',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    fullName: 'Rajesh Kumar',
    dateOfBirth: '2008-05-15',
    gender: 'Male',
    bloodGroup: 'O+',
    aadharNumber: '1234-5678-9012',
    class: '10',
    section: 'A',
    rollNo: '001',
    admissionDate: '2023-04-01',
    email: 'rajesh.kumar@student.svs.com',
    phone: '+91 9876543210',
    address: '123 MG Road, Delhi, 110001',
    fatherName: 'Suresh Kumar',
    motherName: 'Sunita Kumar',
    guardianPhone: '+91 9876543210',
    guardianEmail: 'suresh.kumar@email.com',
    guardianOccupation: 'Business',
    annualIncome: 500000,
    previousSchool: 'Delhi Public School',
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=3b82f6&color=fff'
  },
  {
    id: 'STU002',
    admissionNo: 'ADM/2023/002',
    firstName: 'Priya',
    lastName: 'Sharma',
    fullName: 'Priya Sharma',
    dateOfBirth: '2008-08-20',
    gender: 'Female',
    bloodGroup: 'A+',
    aadharNumber: '2345-6789-0123',
    class: '10',
    section: 'A',
    rollNo: '002',
    admissionDate: '2023-04-01',
    email: 'priya.sharma@student.svs.com',
    phone: '+91 9876543211',
    address: '456 Park Avenue, Mumbai, 400001',
    fatherName: 'Rakesh Sharma',
    motherName: 'Meena Sharma',
    guardianPhone: '+91 9876543211',
    guardianEmail: 'rakesh.sharma@email.com',
    guardianOccupation: 'Engineer',
    annualIncome: 800000,
    previousSchool: 'Ryan International School',
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=ec4899&color=fff'
  },
  {
    id: 'STU003',
    admissionNo: 'ADM/2023/003',
    firstName: 'Amit',
    lastName: 'Singh',
    fullName: 'Amit Singh',
    dateOfBirth: '2009-03-10',
    gender: 'Male',
    bloodGroup: 'B+',
    aadharNumber: '3456-7890-1234',
    class: '9',
    section: 'B',
    rollNo: '015',
    admissionDate: '2023-04-01',
    email: 'amit.singh@student.svs.com',
    phone: '+91 9876543212',
    address: '789 Lake Road, Bangalore, 560001',
    fatherName: 'Vijay Singh',
    motherName: 'Anjali Singh',
    guardianPhone: '+91 9876543212',
    guardianEmail: 'vijay.singh@email.com',
    guardianOccupation: 'Doctor',
    annualIncome: 1200000,
    previousSchool: 'Kendriya Vidyalaya',
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=Amit+Singh&background=10b981&color=fff'
  },
  {
    id: 'STU004',
    admissionNo: 'ADM/2023/004',
    firstName: 'Sneha',
    lastName: 'Patel',
    fullName: 'Sneha Patel',
    dateOfBirth: '2008-11-25',
    gender: 'Female',
    bloodGroup: 'AB+',
    aadharNumber: '4567-8901-2345',
    class: '10',
    section: 'B',
    rollNo: '020',
    admissionDate: '2023-04-01',
    email: 'sneha.patel@student.svs.com',
    phone: '+91 9876543213',
    address: '321 Gandhi Nagar, Ahmedabad, 380001',
    fatherName: 'Mahesh Patel',
    motherName: 'Kavita Patel',
    guardianPhone: '+91 9876543213',
    guardianEmail: 'mahesh.patel@email.com',
    guardianOccupation: 'Businessman',
    annualIncome: 1500000,
    previousSchool: 'St. Xavier School',
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=Sneha+Patel&background=f59e0b&color=fff'
  },
  {
    id: 'STU005',
    admissionNo: 'ADM/2023/005',
    firstName: 'Rahul',
    lastName: 'Verma',
    fullName: 'Rahul Verma',
    dateOfBirth: '2009-06-18',
    gender: 'Male',
    bloodGroup: 'O-',
    aadharNumber: '5678-9012-3456',
    class: '9',
    section: 'A',
    rollNo: '008',
    admissionDate: '2023-04-01',
    email: 'rahul.verma@student.svs.com',
    phone: '+91 9876543214',
    address: '654 Ring Road, Pune, 411001',
    fatherName: 'Anil Verma',
    motherName: 'Pooja Verma',
    guardianPhone: '+91 9876543214',
    guardianEmail: 'anil.verma@email.com',
    guardianOccupation: 'Government Officer',
    annualIncome: 600000,
    previousSchool: 'Army Public School',
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=8b5cf6&color=fff'
  }
];

// Mock Teachers Data
export const mockTeachers = [
  {
    id: 'TCH001',
    employeeId: 'EMP/2020/001',
    firstName: 'Sarah',
    lastName: 'Smith',
    fullName: 'Dr. Sarah Smith',
    designation: 'Senior Teacher',
    qualification: 'Ph.D. in Mathematics',
    email: 'sarah.smith@svs.com',
    phone: '+91 9876543220',
    dateOfJoining: '2020-06-01',
    dateOfBirth: '1985-03-15',
    gender: 'Female',
    address: '123 Teachers Colony, Delhi, 110002',
    subjects: ['Mathematics', 'Statistics'],
    classes: ['10-A', '10-B', '9-A'],
    experience: 12,
    salary: 75000,
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=3b82f6&color=fff'
  },
  {
    id: 'TCH002',
    employeeId: 'EMP/2020/002',
    firstName: 'David',
    lastName: 'Wilson',
    fullName: 'Mr. David Wilson',
    designation: 'Teacher',
    qualification: 'M.Sc. in Physics',
    email: 'david.wilson@svs.com',
    phone: '+91 9876543221',
    dateOfJoining: '2020-07-15',
    dateOfBirth: '1988-07-22',
    gender: 'Male',
    address: '456 Teachers Colony, Mumbai, 400002',
    subjects: ['Physics', 'Chemistry'],
    classes: ['9-B', '8-A', '8-B'],
    experience: 8,
    salary: 65000,
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=David+Wilson&background=10b981&color=fff'
  },
  {
    id: 'TCH003',
    employeeId: 'EMP/2019/003',
    firstName: 'Emily',
    lastName: 'Brown',
    fullName: 'Mrs. Emily Brown',
    designation: 'Senior Teacher',
    qualification: 'M.A. in English',
    email: 'emily.brown@svs.com',
    phone: '+91 9876543222',
    dateOfJoining: '2019-04-01',
    dateOfBirth: '1983-11-05',
    gender: 'Female',
    address: '789 Teachers Colony, Bangalore, 560002',
    subjects: ['English', 'Literature'],
    classes: ['10-A', '10-B', '9-A', '9-B'],
    experience: 15,
    salary: 80000,
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=Emily+Brown&background=ec4899&color=fff'
  },
  {
    id: 'TCH004',
    employeeId: 'EMP/2021/004',
    firstName: 'James',
    lastName: 'Anderson',
    fullName: 'Mr. James Anderson',
    designation: 'Teacher',
    qualification: 'M.A. in Social Studies',
    email: 'james.anderson@svs.com',
    phone: '+91 9876543223',
    dateOfJoining: '2021-06-15',
    dateOfBirth: '1990-04-18',
    gender: 'Male',
    address: '321 Teachers Colony, Pune, 411002',
    subjects: ['Social Studies', 'History', 'Geography'],
    classes: ['9-A', '8-A'],
    experience: 5,
    salary: 55000,
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=James+Anderson&background=f59e0b&color=fff'
  },
  {
    id: 'TCH005',
    employeeId: 'EMP/2020/005',
    firstName: 'Jennifer',
    lastName: 'Lee',
    fullName: 'Ms. Jennifer Lee',
    designation: 'Teacher',
    qualification: 'M.Tech in Computer Science',
    email: 'jennifer.lee@svs.com',
    phone: '+91 9876543224',
    dateOfJoining: '2020-08-01',
    dateOfBirth: '1987-09-30',
    gender: 'Female',
    address: '654 Teachers Colony, Hyderabad, 500002',
    subjects: ['Computer Science', 'Information Technology'],
    classes: ['10-A', '10-B', '9-A', '9-B'],
    experience: 10,
    salary: 70000,
    status: 'Active',
    photo: 'https://ui-avatars.com/api/?name=Jennifer+Lee&background=8b5cf6&color=fff'
  }
];

// Mock Classes Data
export const mockClasses = [
  {
    id: 'CLS001',
    name: '10-A',
    grade: '10',
    section: 'A',
    classTeacher: 'Dr. Sarah Smith',
    classTeacherId: 'TCH001',
    totalStudents: 40,
    room: 'R-301',
    academicYear: '2024-2025',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'],
    timetable: 'Monday to Friday, 8:00 AM - 2:00 PM'
  },
  {
    id: 'CLS002',
    name: '10-B',
    grade: '10',
    section: 'B',
    classTeacher: 'Mrs. Emily Brown',
    classTeacherId: 'TCH003',
    totalStudents: 38,
    room: 'R-302',
    academicYear: '2024-2025',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'],
    timetable: 'Monday to Friday, 8:00 AM - 2:00 PM'
  },
  {
    id: 'CLS003',
    name: '9-A',
    grade: '9',
    section: 'A',
    classTeacher: 'Mr. James Anderson',
    classTeacherId: 'TCH004',
    totalStudents: 42,
    room: 'R-201',
    academicYear: '2024-2025',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'],
    timetable: 'Monday to Friday, 8:00 AM - 2:00 PM'
  },
  {
    id: 'CLS004',
    name: '9-B',
    grade: '9',
    section: 'B',
    classTeacher: 'Mr. David Wilson',
    classTeacherId: 'TCH002',
    totalStudents: 40,
    room: 'R-202',
    academicYear: '2024-2025',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'],
    timetable: 'Monday to Friday, 8:00 AM - 2:00 PM'
  },
  {
    id: 'CLS005',
    name: '8-A',
    grade: '8',
    section: 'A',
    classTeacher: 'Ms. Jennifer Lee',
    classTeacherId: 'TCH005',
    totalStudents: 45,
    room: 'R-101',
    academicYear: '2024-2025',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'],
    timetable: 'Monday to Friday, 8:00 AM - 2:00 PM'
  }
];

// Mock Subjects Data
export const mockSubjects = [
  { id: 'SUB001', name: 'Mathematics', code: 'MATH', totalMarks: 100, passingMarks: 33 },
  { id: 'SUB002', name: 'Science', code: 'SCI', totalMarks: 100, passingMarks: 33 },
  { id: 'SUB003', name: 'English', code: 'ENG', totalMarks: 100, passingMarks: 33 },
  { id: 'SUB004', name: 'Social Studies', code: 'SST', totalMarks: 100, passingMarks: 33 },
  { id: 'SUB005', name: 'Hindi', code: 'HIN', totalMarks: 100, passingMarks: 33 },
  { id: 'SUB006', name: 'Computer Science', code: 'CS', totalMarks: 100, passingMarks: 33 }
];

// Mock Exam Types
export const mockExamTypes = [
  { id: 'EX001', name: 'First Term', code: 'TERM1', weightage: 30, startDate: '2024-09-01', endDate: '2024-09-15' },
  { id: 'EX002', name: 'Mid Term', code: 'MIDTERM', weightage: 20, startDate: '2024-11-01', endDate: '2024-11-10' },
  { id: 'EX003', name: 'Second Term', code: 'TERM2', weightage: 30, startDate: '2025-01-15', endDate: '2025-01-30' },
  { id: 'EX004', name: 'Final Exam', code: 'FINAL', weightage: 20, startDate: '2025-03-01', endDate: '2025-03-15' }
];

// Helper function to generate random marks
export const generateRandomMarks = (min = 40, max = 95) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to generate attendance percentage
export const generateAttendancePercentage = (min = 75, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get grade from marks
export const getGrade = (marks) => {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  if (marks >= 50) return 'D';
  if (marks >= 33) return 'E';
  return 'F';
};

// Helper function to get status color
export const getStatusColor = (percentage) => {
  if (percentage >= 90) return 'excellent';
  if (percentage >= 75) return 'good';
  if (percentage >= 60) return 'warning';
  return 'danger';
};

export default {
  mockStudents,
  mockTeachers,
  mockClasses,
  mockSubjects,
  mockExamTypes,
  generateRandomMarks,
  generateAttendancePercentage,
  getGrade,
  getStatusColor
};
