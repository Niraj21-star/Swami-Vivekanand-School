/**
 * Grade Data Service
 * Mock API for student grades/marks management
 */

let mockGrades = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emily Johnson',
    class: '10-A',
    subject: 'Mathematics',
    exam: 'Mid-Term 2025',
    maxMarks: 100,
    obtainedMarks: 85,
    grade: 'A',
    remarks: 'Excellent performance',
    date: '2025-03-15'
  },
  {
    id: 2,
    studentId: 1,
    studentName: 'Emily Johnson',
    class: '10-A',
    subject: 'English',
    exam: 'Mid-Term 2025',
    maxMarks: 100,
    obtainedMarks: 78,
    grade: 'B+',
    remarks: 'Good work',
    date: '2025-03-16'
  },
  {
    id: 3,
    studentId: 2,
    studentName: 'Michael Brown',
    class: '10-A',
    subject: 'Mathematics',
    exam: 'Mid-Term 2025',
    maxMarks: 100,
    obtainedMarks: 92,
    grade: 'A+',
    remarks: 'Outstanding',
    date: '2025-03-15'
  },
  {
    id: 4,
    studentId: 3,
    studentName: 'Sophia Davis',
    class: '11-B',
    subject: 'Chemistry',
    exam: 'Mid-Term 2025',
    maxMarks: 100,
    obtainedMarks: 88,
    grade: 'A',
    remarks: 'Very good',
    date: '2025-03-17'
  },
  {
    id: 5,
    studentId: 4,
    studentName: 'Daniel Wilson',
    class: '11-A',
    subject: 'Physics',
    exam: 'Mid-Term 2025',
    maxMarks: 100,
    obtainedMarks: 95,
    grade: 'A+',
    remarks: 'Excellent understanding',
    date: '2025-03-18'
  }
];

let nextId = 6;

export const getGrades = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = [...mockGrades];

  if (filters.studentId) {
    filtered = filtered.filter(g => g.studentId === parseInt(filters.studentId));
  }
  if (filters.class) {
    filtered = filtered.filter(g => g.class === filters.class);
  }
  if (filters.subject) {
    filtered = filtered.filter(g => g.subject === filters.subject);
  }
  if (filters.exam) {
    filtered = filtered.filter(g => g.exam === filters.exam);
  }

  return filtered;
};

export const getGradeById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));

  const grade = mockGrades.find(g => g.id === parseInt(id));
  if (!grade) {
    throw new Error('Grade record not found');
  }
  return grade;
};

export const createGrade = async (gradeData) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const percentage = (gradeData.obtainedMarks / gradeData.maxMarks) * 100;
  let gradeValue = 'F';
  
  if (percentage >= 90) gradeValue = 'A+';
  else if (percentage >= 80) gradeValue = 'A';
  else if (percentage >= 70) gradeValue = 'B+';
  else if (percentage >= 60) gradeValue = 'B';
  else if (percentage >= 50) gradeValue = 'C';
  else if (percentage >= 40) gradeValue = 'D';

  const newGrade = {
    id: nextId++,
    ...gradeData,
    grade: gradeValue
  };

  mockGrades.push(newGrade);
  return newGrade;
};

export const updateGrade = async (id, updates) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const index = mockGrades.findIndex(g => g.id === parseInt(id));
  if (index === -1) {
    throw new Error('Grade record not found');
  }

  // Recalculate grade if marks changed
  if (updates.obtainedMarks || updates.maxMarks) {
    const grade = mockGrades[index];
    const maxMarks = updates.maxMarks || grade.maxMarks;
    const obtainedMarks = updates.obtainedMarks || grade.obtainedMarks;
    const percentage = (obtainedMarks / maxMarks) * 100;
    
    let gradeValue = 'F';
    if (percentage >= 90) gradeValue = 'A+';
    else if (percentage >= 80) gradeValue = 'A';
    else if (percentage >= 70) gradeValue = 'B+';
    else if (percentage >= 60) gradeValue = 'B';
    else if (percentage >= 50) gradeValue = 'C';
    else if (percentage >= 40) gradeValue = 'D';
    
    updates.grade = gradeValue;
  }

  mockGrades[index] = { ...mockGrades[index], ...updates };
  return mockGrades[index];
};

export const deleteGrade = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockGrades.findIndex(g => g.id === parseInt(id));
  if (index === -1) {
    throw new Error('Grade record not found');
  }

  mockGrades.splice(index, 1);
  return { message: 'Grade record deleted successfully' };
};

export const getStudentReport = async (studentId, exam) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const grades = mockGrades.filter(
    g => g.studentId === parseInt(studentId) && g.exam === exam
  );

  if (grades.length === 0) {
    return null;
  }

  const totalMax = grades.reduce((sum, g) => sum + g.maxMarks, 0);
  const totalObtained = grades.reduce((sum, g) => sum + g.obtainedMarks, 0);
  const percentage = (totalObtained / totalMax) * 100;

  return {
    student: grades[0].studentName,
    class: grades[0].class,
    exam,
    subjects: grades,
    totalMarks: totalMax,
    obtainedMarks: totalObtained,
    percentage: percentage.toFixed(2),
    overallGrade: percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B+' : percentage >= 60 ? 'B' : percentage >= 50 ? 'C' : percentage >= 40 ? 'D' : 'F'
  };
};
