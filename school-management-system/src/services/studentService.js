/**
 * Student Data Service
 * Mock API for student CRUD operations
 */

const USE_MOCK = true;

// Mock student database
let mockStudents = [
  {
    id: 1,
    rollNo: 'STU001',
    name: 'Emily Johnson',
    email: 'emily.johnson@school.com',
    phone: '+1234567892',
    dateOfBirth: '2008-05-15',
    gender: 'Female',
    address: '123 Main St, City, State 12345',
    class: '10-A',
    section: 'A',
    admissionDate: '2020-04-01',
    parentName: 'Robert Johnson',
    parentPhone: '+1234567893',
    parentEmail: 'robert.johnson@school.com',
    bloodGroup: 'O+',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Johnson&background=f59e0b&color=fff',
    status: 'active'
  },
  {
    id: 2,
    rollNo: 'STU002',
    name: 'Michael Brown',
    email: 'michael.brown@school.com',
    phone: '+1234567894',
    dateOfBirth: '2008-08-22',
    gender: 'Male',
    address: '456 Oak Ave, City, State 12345',
    class: '10-A',
    section: 'A',
    admissionDate: '2020-04-01',
    parentName: 'Sarah Brown',
    parentPhone: '+1234567895',
    parentEmail: 'sarah.brown@school.com',
    bloodGroup: 'A+',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Brown&background=3b82f6&color=fff',
    status: 'active'
  },
  {
    id: 3,
    rollNo: 'STU003',
    name: 'Sophia Davis',
    email: 'sophia.davis@school.com',
    phone: '+1234567896',
    dateOfBirth: '2007-12-10',
    gender: 'Female',
    address: '789 Pine Rd, City, State 12345',
    class: '11-B',
    section: 'B',
    admissionDate: '2019-04-01',
    parentName: 'James Davis',
    parentPhone: '+1234567897',
    parentEmail: 'james.davis@school.com',
    bloodGroup: 'B+',
    avatar: 'https://ui-avatars.com/api/?name=Sophia+Davis&background=ec4899&color=fff',
    status: 'active'
  },
  {
    id: 4,
    rollNo: 'STU004',
    name: 'Daniel Wilson',
    email: 'daniel.wilson@school.com',
    phone: '+1234567898',
    dateOfBirth: '2007-03-18',
    gender: 'Male',
    address: '321 Elm St, City, State 12345',
    class: '11-A',
    section: 'A',
    admissionDate: '2019-04-01',
    parentName: 'Lisa Wilson',
    parentPhone: '+1234567899',
    parentEmail: 'lisa.wilson@school.com',
    bloodGroup: 'AB+',
    avatar: 'https://ui-avatars.com/api/?name=Daniel+Wilson&background=10b981&color=fff',
    status: 'active'
  },
  {
    id: 5,
    rollNo: 'STU005',
    name: 'Olivia Martinez',
    email: 'olivia.martinez@school.com',
    phone: '+1234567900',
    dateOfBirth: '2009-06-25',
    gender: 'Female',
    address: '654 Maple Dr, City, State 12345',
    class: '9-A',
    section: 'A',
    admissionDate: '2021-04-01',
    parentName: 'Carlos Martinez',
    parentPhone: '+1234567901',
    parentEmail: 'carlos.martinez@school.com',
    bloodGroup: 'O-',
    avatar: 'https://ui-avatars.com/api/?name=Olivia+Martinez&background=8b5cf6&color=fff',
    status: 'active'
  }
];

let nextId = 6;

/**
 * Get all students
 */
export const getStudents = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = [...mockStudents];

  if (filters.class) {
    filtered = filtered.filter(s => s.class === filters.class);
  }
  if (filters.section) {
    filtered = filtered.filter(s => s.section === filters.section);
  }
  if (filters.status) {
    filtered = filtered.filter(s => s.status === filters.status);
  }

  return filtered;
};

/**
 * Get student by ID
 */
export const getStudentById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));

  const student = mockStudents.find(s => s.id === parseInt(id));
  if (!student) {
    throw new Error('Student not found');
  }
  return student;
};

/**
 * Create new student
 */
export const createStudent = async (studentData) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const newStudent = {
    id: nextId++,
    ...studentData,
    rollNo: `STU${String(nextId - 1).padStart(3, '0')}`,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(studentData.name)}&background=random&color=fff`,
    status: 'active'
  };

  mockStudents.push(newStudent);
  return newStudent;
};

/**
 * Update student
 */
export const updateStudent = async (id, updates) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const index = mockStudents.findIndex(s => s.id === parseInt(id));
  if (index === -1) {
    throw new Error('Student not found');
  }

  mockStudents[index] = { ...mockStudents[index], ...updates };
  return mockStudents[index];
};

/**
 * Delete student
 */
export const deleteStudent = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockStudents.findIndex(s => s.id === parseInt(id));
  if (index === -1) {
    throw new Error('Student not found');
  }

  mockStudents.splice(index, 1);
  return { message: 'Student deleted successfully' };
};

/**
 * Get student statistics
 */
export const getStudentStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return {
    total: mockStudents.length,
    active: mockStudents.filter(s => s.status === 'active').length,
    byClass: mockStudents.reduce((acc, student) => {
      acc[student.class] = (acc[student.class] || 0) + 1;
      return acc;
    }, {}),
    byGender: mockStudents.reduce((acc, student) => {
      acc[student.gender] = (acc[student.gender] || 0) + 1;
      return acc;
    }, {})
  };
};
