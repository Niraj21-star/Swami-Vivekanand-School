/**
 * Teacher Data Service
 * Mock API for teacher CRUD operations
 */

let mockTeachers = [
  {
    id: 1,
    employeeId: 'TCH001',
    name: 'John Smith',
    email: 'john.smith@school.com',
    phone: '+1234567891',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    address: '111 Teacher Lane, City, State 12345',
    subject: 'Mathematics',
    qualification: 'M.Sc. Mathematics',
    experience: 10,
    joiningDate: '2015-06-01',
    salary: 50000,
    bloodGroup: 'A+',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=10b981&color=fff',
    status: 'active'
  },
  {
    id: 2,
    employeeId: 'TCH002',
    name: 'Sarah Williams',
    email: 'sarah.williams@school.com',
    phone: '+1234567902',
    dateOfBirth: '1988-07-22',
    gender: 'Female',
    address: '222 Faculty St, City, State 12345',
    subject: 'English',
    qualification: 'M.A. English',
    experience: 8,
    joiningDate: '2017-04-15',
    salary: 45000,
    bloodGroup: 'B+',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=ec4899&color=fff',
    status: 'active'
  },
  {
    id: 3,
    employeeId: 'TCH003',
    name: 'David Anderson',
    email: 'david.anderson@school.com',
    phone: '+1234567903',
    dateOfBirth: '1982-11-10',
    gender: 'Male',
    address: '333 Scholar Ave, City, State 12345',
    subject: 'Physics',
    qualification: 'M.Sc. Physics',
    experience: 12,
    joiningDate: '2013-08-01',
    salary: 55000,
    bloodGroup: 'O+',
    avatar: 'https://ui-avatars.com/api/?name=David+Anderson&background=3b82f6&color=fff',
    status: 'active'
  },
  {
    id: 4,
    employeeId: 'TCH004',
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@school.com',
    phone: '+1234567904',
    dateOfBirth: '1990-05-08',
    gender: 'Female',
    address: '444 Education Blvd, City, State 12345',
    subject: 'Chemistry',
    qualification: 'M.Sc. Chemistry',
    experience: 6,
    joiningDate: '2019-04-01',
    salary: 42000,
    bloodGroup: 'AB+',
    avatar: 'https://ui-avatars.com/api/?name=Jennifer+Taylor&background=f59e0b&color=fff',
    status: 'active'
  },
  {
    id: 5,
    employeeId: 'TCH005',
    name: 'Robert Garcia',
    email: 'robert.garcia@school.com',
    phone: '+1234567905',
    dateOfBirth: '1987-09-14',
    gender: 'Male',
    address: '555 Learning Way, City, State 12345',
    subject: 'History',
    qualification: 'M.A. History',
    experience: 9,
    joiningDate: '2016-07-15',
    salary: 48000,
    bloodGroup: 'O-',
    avatar: 'https://ui-avatars.com/api/?name=Robert+Garcia&background=8b5cf6&color=fff',
    status: 'active'
  }
];

let nextId = 6;

export const getTeachers = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = [...mockTeachers];

  if (filters.subject) {
    filtered = filtered.filter(t => t.subject === filters.subject);
  }
  if (filters.status) {
    filtered = filtered.filter(t => t.status === filters.status);
  }

  return filtered;
};

export const getTeacherById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));

  const teacher = mockTeachers.find(t => t.id === parseInt(id));
  if (!teacher) {
    throw new Error('Teacher not found');
  }
  return teacher;
};

export const createTeacher = async (teacherData) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const newTeacher = {
    id: nextId++,
    ...teacherData,
    employeeId: `TCH${String(nextId - 1).padStart(3, '0')}`,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(teacherData.name)}&background=random&color=fff`,
    status: 'active'
  };

  mockTeachers.push(newTeacher);
  return newTeacher;
};

export const updateTeacher = async (id, updates) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const index = mockTeachers.findIndex(t => t.id === parseInt(id));
  if (index === -1) {
    throw new Error('Teacher not found');
  }

  mockTeachers[index] = { ...mockTeachers[index], ...updates };
  return mockTeachers[index];
};

export const deleteTeacher = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockTeachers.findIndex(t => t.id === parseInt(id));
  if (index === -1) {
    throw new Error('Teacher not found');
  }

  mockTeachers.splice(index, 1);
  return { message: 'Teacher deleted successfully' };
};

export const getTeacherStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return {
    total: mockTeachers.length,
    active: mockTeachers.filter(t => t.status === 'active').length,
    bySubject: mockTeachers.reduce((acc, teacher) => {
      acc[teacher.subject] = (acc[teacher.subject] || 0) + 1;
      return acc;
    }, {}),
    avgExperience: Math.round(
      mockTeachers.reduce((sum, t) => sum + t.experience, 0) / mockTeachers.length
    )
  };
};
