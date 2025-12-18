/**
 * Main App Component
 * Configures routing and authentication
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth Pages
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminStudents from './pages/admin/Students';
import AdminTeachers from './pages/admin/Teachers';
import AdminClasses from './pages/admin/Classes';
import AdminAttendance from './pages/admin/Attendance';
import AdminFees from './pages/admin/Fees';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherClasses from './pages/teacher/Classes';
import TeacherAttendance from './pages/teacher/Attendance';
import TeacherGrades from './pages/teacher/Grades';
import TeacherStudents from './pages/teacher/Students';
import TeacherReports from './pages/teacher/Reports';

// Principal Pages
import PrincipalDashboard from './pages/principal/Dashboard';
import PrincipalAttendance from './pages/principal/Attendance';
import PrincipalTeachers from './pages/principal/Teachers';
import PrincipalStudents from './pages/principal/Students';
import PrincipalExams from './pages/principal/Exams';
import PrincipalReports from './pages/principal/Reports';
import PrincipalNotices from './pages/principal/Notices';

// Clerk Pages
import ClerkDashboard from './pages/clerk/Dashboard';
import ClerkAdmissions from './pages/clerk/Admissions';
import ClerkStudents from './pages/clerk/Students';
import ClerkFeeManagement from './pages/clerk/FeeManagement';
import ClerkDocuments from './pages/clerk/Documents';
import ClerkReports from './pages/clerk/Reports';

function App() {
  return (
    <AuthProvider>
      <Router basename="/Swami-Vivekanand-School">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/teachers"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminTeachers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/classes"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminClasses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/attendance"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/fees"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminFees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminSettings />
              </ProtectedRoute>
            }
          />

          {/* Teacher Routes */}
          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/classes"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherClasses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/attendance"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/grades"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherGrades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/students"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/reports"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherReports />
              </ProtectedRoute>
            }
          />

          {/* Principal Routes */}
          <Route
            path="/principal/dashboard"
            element={
              <ProtectedRoute allowedRoles={['principal']}>
                <PrincipalDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/principal/attendance"
            element={
              <ProtectedRoute allowedRoles={['principal']}>
                <PrincipalAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/principal/teachers"
            element={
              <ProtectedRoute allowedRoles={['principal']}>
                <PrincipalTeachers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/principal/students"
            element={
              <ProtectedRoute allowedRoles={['principal']}>
                <PrincipalStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/principal/exams"
            element={
              <ProtectedRoute allowedRoles={['principal']}>
                <PrincipalExams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/principal/reports"
            element={
              <ProtectedRoute allowedRoles={['principal']}>
                <PrincipalReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/principal/notices"
            element={
              <ProtectedRoute allowedRoles={['principal']}>
                <PrincipalNotices />
              </ProtectedRoute>
            }
          />

          {/* Clerk Routes */}
          <Route
            path="/clerk/dashboard"
            element={
              <ProtectedRoute allowedRoles={['clerk']}>
                <ClerkDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clerk/admissions"
            element={
              <ProtectedRoute allowedRoles={['clerk']}>
                <ClerkAdmissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clerk/students"
            element={
              <ProtectedRoute allowedRoles={['clerk']}>
                <ClerkStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clerk/fees"
            element={
              <ProtectedRoute allowedRoles={['clerk']}>
                <ClerkFeeManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clerk/documents"
            element={
              <ProtectedRoute allowedRoles={['clerk']}>
                <ClerkDocuments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clerk/reports"
            element={
              <ProtectedRoute allowedRoles={['clerk']}>
                <ClerkReports />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
