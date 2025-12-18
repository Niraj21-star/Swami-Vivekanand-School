/**
 * Class Data Service
 * Mock API for class/course CRUD operations
 */

let mockClasses = [
  {
    id: 1,
    name: 'Class 9-A',
    grade: '9',
    section: 'A',
    teacher: 'John Smith',
    teacherId: 1,
    subject: 'Mathematics',
    room: '101',
    capacity: 40,
    enrolled: 35,
    schedule: [
      { day: 'Monday', time: '09:00 AM - 10:00 AM' },
      { day: 'Wednesday', time: '11:00 AM - 12:00 PM' },
      { day: 'Friday', time: '02:00 PM - 03:00 PM' }
    ],
    status: 'active'
  },
  {
    id: 2,
    name: 'Class 10-A',
    grade: '10',
    section: 'A',
    teacher: 'Sarah Williams',
    teacherId: 2,
    subject: 'English',
    room: '102',
    capacity: 40,
    enrolled: 38,
    schedule: [
      { day: 'Tuesday', time: '09:00 AM - 10:00 AM' },
      { day: 'Thursday', time: '10:00 AM - 11:00 AM' }
    ],
    status: 'active'
  },
  {
    id: 3,
    name: 'Class 11-A',
    grade: '11',
    section: 'A',
    teacher: 'David Anderson',
    teacherId: 3,
    subject: 'Physics',
    room: '201',
    capacity: 35,
    enrolled: 32,
    schedule: [
      { day: 'Monday', time: '10:00 AM - 11:00 AM' },
      { day: 'Wednesday', time: '09:00 AM - 10:00 AM' },
      { day: 'Friday', time: '11:00 AM - 12:00 PM' }
    ],
    status: 'active'
  },
  {
    id: 4,
    name: 'Class 11-B',
    grade: '11',
    section: 'B',
    teacher: 'Jennifer Taylor',
    teacherId: 4,
    subject: 'Chemistry',
    room: '202',
    capacity: 35,
    enrolled: 30,
    schedule: [
      { day: 'Tuesday', time: '11:00 AM - 12:00 PM' },
      { day: 'Thursday', time: '09:00 AM - 10:00 AM' }
    ],
    status: 'active'
  },
  {
    id: 5,
    name: 'Class 12-A',
    grade: '12',
    section: 'A',
    teacher: 'Robert Garcia',
    teacherId: 5,
    subject: 'History',
    room: '301',
    capacity: 30,
    enrolled: 28,
    schedule: [
      { day: 'Monday', time: '02:00 PM - 03:00 PM' },
      { day: 'Friday', time: '09:00 AM - 10:00 AM' }
    ],
    status: 'active'
  }
];

let nextId = 6;

export const getClasses = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = [...mockClasses];

  if (filters.grade) {
    filtered = filtered.filter(c => c.grade === filters.grade);
  }
  if (filters.section) {
    filtered = filtered.filter(c => c.section === filters.section);
  }
  if (filters.teacherId) {
    filtered = filtered.filter(c => c.teacherId === filters.teacherId);
  }

  return filtered;
};

export const getClassById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));

  const classItem = mockClasses.find(c => c.id === parseInt(id));
  if (!classItem) {
    throw new Error('Class not found');
  }
  return classItem;
};

export const createClass = async (classData) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const newClass = {
    id: nextId++,
    ...classData,
    enrolled: 0,
    status: 'active'
  };

  mockClasses.push(newClass);
  return newClass;
};

export const updateClass = async (id, updates) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const index = mockClasses.findIndex(c => c.id === parseInt(id));
  if (index === -1) {
    throw new Error('Class not found');
  }

  mockClasses[index] = { ...mockClasses[index], ...updates };
  return mockClasses[index];
};

export const deleteClass = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockClasses.findIndex(c => c.id === parseInt(id));
  if (index === -1) {
    throw new Error('Class not found');
  }

  mockClasses.splice(index, 1);
  return { message: 'Class deleted successfully' };
};

export const getClassStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return {
    total: mockClasses.length,
    totalCapacity: mockClasses.reduce((sum, c) => sum + c.capacity, 0),
    totalEnrolled: mockClasses.reduce((sum, c) => sum + c.enrolled, 0),
    byGrade: mockClasses.reduce((acc, cls) => {
      acc[cls.grade] = (acc[cls.grade] || 0) + 1;
      return acc;
    }, {})
  };
};
