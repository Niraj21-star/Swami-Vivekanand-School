/**
 * Fee Data Service
 * Mock API for fee management
 */

let mockFees = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emily Johnson',
    class: '10-A',
    term: 'Q1 2025',
    amount: 5000,
    paid: 5000,
    pending: 0,
    dueDate: '2025-04-30',
    paidDate: '2025-04-15',
    status: 'paid',
    paymentMethod: 'Online',
    transactionId: 'TXN001'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Michael Brown',
    class: '10-A',
    term: 'Q1 2025',
    amount: 5000,
    paid: 2500,
    pending: 2500,
    dueDate: '2025-04-30',
    paidDate: null,
    status: 'partial',
    paymentMethod: 'Cash',
    transactionId: 'TXN002'
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Sophia Davis',
    class: '11-B',
    term: 'Q1 2025',
    amount: 5500,
    paid: 0,
    pending: 5500,
    dueDate: '2025-04-30',
    paidDate: null,
    status: 'pending',
    paymentMethod: null,
    transactionId: null
  },
  {
    id: 4,
    studentId: 4,
    studentName: 'Daniel Wilson',
    class: '11-A',
    term: 'Q1 2025',
    amount: 5500,
    paid: 5500,
    pending: 0,
    dueDate: '2025-04-30',
    paidDate: '2025-04-10',
    status: 'paid',
    paymentMethod: 'Online',
    transactionId: 'TXN003'
  },
  {
    id: 5,
    studentId: 5,
    studentName: 'Olivia Martinez',
    class: '9-A',
    term: 'Q1 2025',
    amount: 4500,
    paid: 4500,
    pending: 0,
    dueDate: '2025-04-30',
    paidDate: '2025-04-20',
    status: 'paid',
    paymentMethod: 'Cheque',
    transactionId: 'TXN004'
  }
];

let nextId = 6;

export const getFees = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = [...mockFees];

  if (filters.studentId) {
    filtered = filtered.filter(f => f.studentId === parseInt(filters.studentId));
  }
  if (filters.class) {
    filtered = filtered.filter(f => f.class === filters.class);
  }
  if (filters.status) {
    filtered = filtered.filter(f => f.status === filters.status);
  }
  if (filters.term) {
    filtered = filtered.filter(f => f.term === filters.term);
  }

  return filtered;
};

export const getFeeById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));

  const fee = mockFees.find(f => f.id === parseInt(id));
  if (!fee) {
    throw new Error('Fee record not found');
  }
  return fee;
};

export const createFee = async (feeData) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const newFee = {
    id: nextId++,
    ...feeData,
    paid: 0,
    pending: feeData.amount,
    paidDate: null,
    status: 'pending',
    paymentMethod: null,
    transactionId: null
  };

  mockFees.push(newFee);
  return newFee;
};

export const recordPayment = async (id, paymentData) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const index = mockFees.findIndex(f => f.id === parseInt(id));
  if (index === -1) {
    throw new Error('Fee record not found');
  }

  const fee = mockFees[index];
  const newPaid = fee.paid + paymentData.amount;
  const newPending = fee.amount - newPaid;

  mockFees[index] = {
    ...fee,
    paid: newPaid,
    pending: newPending,
    paidDate: paymentData.paymentDate,
    status: newPending === 0 ? 'paid' : 'partial',
    paymentMethod: paymentData.paymentMethod,
    transactionId: paymentData.transactionId
  };

  return mockFees[index];
};

export const updateFee = async (id, updates) => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const index = mockFees.findIndex(f => f.id === parseInt(id));
  if (index === -1) {
    throw new Error('Fee record not found');
  }

  mockFees[index] = { ...mockFees[index], ...updates };
  return mockFees[index];
};

export const deleteFee = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const index = mockFees.findIndex(f => f.id === parseInt(id));
  if (index === -1) {
    throw new Error('Fee record not found');
  }

  mockFees.splice(index, 1);
  return { message: 'Fee record deleted successfully' };
};

export const getFeeStats = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 200));

  let filtered = [...mockFees];

  if (filters.term) {
    filtered = filtered.filter(f => f.term === filters.term);
  }

  const totalAmount = filtered.reduce((sum, f) => sum + f.amount, 0);
  const totalCollected = filtered.reduce((sum, f) => sum + f.paid, 0);
  const totalPending = filtered.reduce((sum, f) => sum + f.pending, 0);

  return {
    totalAmount,
    totalCollected,
    totalPending,
    collectionPercentage: totalAmount > 0 ? Math.round((totalCollected / totalAmount) * 100) : 0,
    paid: filtered.filter(f => f.status === 'paid').length,
    partial: filtered.filter(f => f.status === 'partial').length,
    pending: filtered.filter(f => f.status === 'pending').length,
    overdue: filtered.filter(f => f.status === 'pending' && new Date(f.dueDate) < new Date()).length
  };
};
