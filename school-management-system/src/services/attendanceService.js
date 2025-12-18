/**
 * Attendance Data Service
 * Mock API for attendance tracking
 */

let mockAttendance = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emily Johnson',
    class: '10-A',
    date: '2025-12-18',
    status: 'present',
    remarks: ''
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Michael Brown',
    class: '10-A',
    date: '2025-12-18',
    status: 'present',
    remarks: ''
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Sophia Davis',
    class: '11-B',
    date: '2025-12-18',
    status: 'absent',
    remarks: 'Sick leave'
  },
  {
    id: 4,
    studentId: 4,
    studentName: 'Daniel Wilson',
    class: '11-A',
    date: '2025-12-18',
    status: 'present',
    remarks: ''
  },
  {
    id: 5,
    studentId: 5,
    studentName: 'Olivia Martinez',
    class: '9-A',
    date: '2025-12-18',
    status: 'late',
    remarks: 'Arrived 15 minutes late'
  }
];

let nextId = 6;

export const getAttendance = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = [...mockAttendance];

  if (filters.date) {
    filtered = filtered.filter(a => a.date === filters.date);
  }
  if (filters.class) {
    filtered = filtered.filter(a => a.class === filters.class);
  }
  if (filters.studentId) {
    filtered = filtered.filter(a => a.studentId === parseInt(filters.studentId));
  }
  if (filters.status) {
    filtered = filtered.filter(a => a.status === filters.status);
  }

  return filtered;
};

export const markAttendance = async (attendanceData) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  // Check if attendance already exists
  const existing = mockAttendance.find(
    a => a.studentId === attendanceData.studentId && a.date === attendanceData.date
  );

  if (existing) {
    // Update existing
    Object.assign(existing, attendanceData);
    return existing;
  } else {
    // Create new
    const newAttendance = {
      id: nextId++,
      ...attendanceData
    };
    mockAttendance.push(newAttendance);
    return newAttendance;
  }
};

export const bulkMarkAttendance = async (attendanceList) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const results = attendanceList.map(data => {
    const existing = mockAttendance.find(
      a => a.studentId === data.studentId && a.date === data.date
    );

    if (existing) {
      Object.assign(existing, data);
      return existing;
    } else {
      const newAttendance = {
        id: nextId++,
        ...data
      };
      mockAttendance.push(newAttendance);
      return newAttendance;
    }
  });

  return results;
};

export const getAttendanceStats = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 200));

  let filtered = [...mockAttendance];

  if (filters.startDate && filters.endDate) {
    filtered = filtered.filter(
      a => a.date >= filters.startDate && a.date <= filters.endDate
    );
  }
  if (filters.class) {
    filtered = filtered.filter(a => a.class === filters.class);
  }
  if (filters.studentId) {
    filtered = filtered.filter(a => a.studentId === parseInt(filters.studentId));
  }

  const total = filtered.length;
  const present = filtered.filter(a => a.status === 'present').length;
  const absent = filtered.filter(a => a.status === 'absent').length;
  const late = filtered.filter(a => a.status === 'late').length;

  return {
    total,
    present,
    absent,
    late,
    percentage: total > 0 ? Math.round((present / total) * 100) : 0
  };
};

export const getStudentAttendanceReport = async (studentId, startDate, endDate) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const attendance = mockAttendance.filter(
    a =>
      a.studentId === parseInt(studentId) &&
      a.date >= startDate &&
      a.date <= endDate
  );

  return attendance;
};
