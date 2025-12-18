/**
 * Sidebar Component
 * Navigation sidebar with role-based menu items
 */

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  BarChart3,
  UserCircle2,
  Home,
  ClipboardCheck,
  Bell,
  UserPlus,
  DollarSign
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  // Navigation items based on role
  const getNavigationItems = () => {
    const roleNav = {
      admin: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'Students', path: '/admin/students' },
        { icon: GraduationCap, label: 'Teachers', path: '/admin/teachers' },
        { icon: BookOpen, label: 'Classes', path: '/admin/classes' },
        { icon: Calendar, label: 'Attendance', path: '/admin/attendance' },
        { icon: CreditCard, label: 'Fees', path: '/admin/fees' },
        { icon: FileText, label: 'Reports', path: '/admin/reports' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' }
      ],
      teacher: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/teacher/dashboard' },
        { icon: BookOpen, label: 'My Classes', path: '/teacher/classes' },
        { icon: Calendar, label: 'Attendance', path: '/teacher/attendance' },
        { icon: ClipboardList, label: 'Grades', path: '/teacher/grades' },
        { icon: Users, label: 'Students', path: '/teacher/students' },
        { icon: FileText, label: 'Reports', path: '/teacher/reports' }
      ],
      principal: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/principal/dashboard' },
        { icon: ClipboardCheck, label: 'Attendance', path: '/principal/attendance' },
        { icon: GraduationCap, label: 'Teachers', path: '/principal/teachers' },
        { icon: Users, label: 'Students', path: '/principal/students' },
        { icon: FileText, label: 'Exams', path: '/principal/exams' },
        { icon: BarChart3, label: 'Reports', path: '/principal/reports' },
        { icon: Bell, label: 'Notices', path: '/principal/notices' }
      ],
      clerk: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/clerk/dashboard' },
        { icon: UserPlus, label: 'Admissions', path: '/clerk/admissions' },
        { icon: Users, label: 'Students', path: '/clerk/students' },
        { icon: DollarSign, label: 'Fee Management', path: '/clerk/fees' },
        { icon: FileText, label: 'Documents', path: '/clerk/documents' },
        { icon: BarChart3, label: 'Reports', path: '/clerk/reports' }
      ]
    };

    return roleNav[user?.role] || [];
  };

  const navItems = getNavigationItems();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${isOpen ? 'w-64' : 'lg:w-64'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-gray-900 text-sm">SVS School</h2>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Toggle Button for Desktop */}
      <button
        onClick={toggleSidebar}
        className="hidden lg:block fixed top-20 left-64 -ml-3 z-50 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </>
  );
};

export default Sidebar;
