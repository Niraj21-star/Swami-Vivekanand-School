/**
 * Teacher Dashboard
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import { BookOpen, Users, Calendar, ClipboardList } from 'lucide-react';

const TeacherDashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your classes and students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card padding={false}>
            <div className="p-6">
              <div className="bg-blue-500 p-3 rounded-lg w-fit mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">5</h3>
              <p className="text-sm text-gray-600 mt-1">My Classes</p>
            </div>
          </Card>

          <Card padding={false}>
            <div className="p-6">
              <div className="bg-green-500 p-3 rounded-lg w-fit mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">156</h3>
              <p className="text-sm text-gray-600 mt-1">Total Students</p>
            </div>
          </Card>

          <Card padding={false}>
            <div className="p-6">
              <div className="bg-purple-500 p-3 rounded-lg w-fit mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">92%</h3>
              <p className="text-sm text-gray-600 mt-1">Avg Attendance</p>
            </div>
          </Card>

          <Card padding={false}>
            <div className="p-6">
              <div className="bg-amber-500 p-3 rounded-lg w-fit mb-4">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
              <p className="text-sm text-gray-600 mt-1">Pending Grades</p>
            </div>
          </Card>
        </div>

        <Card title="Today's Classes">
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">Mathematics - Class 10-A</h4>
                  <p className="text-sm text-gray-600 mt-1">09:00 AM - 10:00 AM • Room 101</p>
                </div>
                <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">Upcoming</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">Mathematics - Class 11-A</h4>
                  <p className="text-sm text-gray-600 mt-1">11:00 AM - 12:00 PM • Room 102</p>
                </div>
                <span className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-full">Scheduled</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TeacherDashboard;
