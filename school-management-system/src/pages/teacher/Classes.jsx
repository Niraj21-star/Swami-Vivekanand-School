/**
 * Teacher Classes Page
 * View and manage assigned classes
 */

import { useState, useEffect } from 'react';
import { BookOpen, Users, Calendar, MapPin, TrendingUp } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { getTeacherClasses } from '../../services/teacherPortalService';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setLoading(true);
      const data = await getTeacherClasses();
      setClasses(data);
    } catch (error) {
      console.error('Error loading classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-600 mt-1">Manage your assigned classes and students</p>
        </div>

        {/* Classes Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <Card key={classItem.id} padding="none">
                <div className="p-6">
                  {/* Class Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{classItem.className}</h3>
                      <p className="text-sm text-gray-600 mt-1">{classItem.subject}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{classItem.students} Students</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{classItem.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{classItem.room}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Course Progress</span>
                      <span className="font-medium text-gray-900">{classItem.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getProgressColor(classItem.progress)}`}
                        style={{ width: `${classItem.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Next Class */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Next Class</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(classItem.nextClass).toLocaleString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Attendance
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              View Schedule
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              All Students
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              Create Assignment
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" />
              View Reports
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Classes;
