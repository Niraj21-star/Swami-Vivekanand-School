/**
 * Admin Settings Page
 * System configuration, academic year, grading system, and school settings
 */

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import { 
  Settings as SettingsIcon, 
  School, 
  Calendar, 
  Award,
  Bell,
  Save,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { 
  getSettings,
  updateSettings,
  getGradingSystem,
  updateGradingSystem
} from '../../services/adminService';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('school'); // school, academic, grading, notifications
  const [settings, setSettings] = useState(null);
  const [gradingSystem, setGradingSystem] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const [schoolForm, setSchoolForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    affiliation: '',
    principal: ''
  });

  const [academicForm, setAcademicForm] = useState({
    current: '',
    startDate: '',
    endDate: '',
    terms: []
  });

  const [notificationForm, setNotificationForm] = useState({
    email: false,
    sms: false,
    push: false,
    attendanceAlerts: false,
    feeReminders: false,
    examNotifications: false
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const [settingsData, grading] = await Promise.all([
        getSettings(),
        getGradingSystem()
      ]);
      
      setSettings(settingsData);
      setGradingSystem(grading);
      
      setSchoolForm(settingsData.school);
      setAcademicForm(settingsData.academicYear);
      setNotificationForm(settingsData.notifications);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSchoolSettings = async (e) => {
    e.preventDefault();
    try {
      await updateSettings({ school: schoolForm });
      setIsEditing(false);
      loadSettings();
    } catch (error) {
      console.error('Error saving school settings:', error);
    }
  };

  const handleSaveAcademicSettings = async (e) => {
    e.preventDefault();
    try {
      await updateSettings({ academicYear: academicForm });
      setIsEditing(false);
      loadSettings();
    } catch (error) {
      console.error('Error saving academic settings:', error);
    }
  };

  const handleSaveNotificationSettings = async (e) => {
    e.preventDefault();
    try {
      await updateSettings({ notifications: notificationForm });
      loadSettings();
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  const handleInputChange = (form, setForm) => (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const gradingColumns = [
    {
      header: 'Grade',
      accessor: 'grade',
      render: (value) => (
        <span className="font-semibold text-lg text-gray-900">{value}</span>
      )
    },
    {
      header: 'Min Marks',
      accessor: 'minMarks'
    },
    {
      header: 'Max Marks',
      accessor: 'maxMarks'
    },
    {
      header: 'GPA',
      accessor: 'gpa',
      render: (value) => (
        <span className="font-medium text-blue-600">{value}</span>
      )
    },
    {
      header: 'Actions',
      accessor: 'grade',
      render: () => (
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Edit className="w-4 h-4" />
        </button>
      )
    }
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading settings...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600 mt-1">Configure school and system settings</p>
          </div>
        </div>

        {/* Tabs */}
        <Card>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('school')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'school'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <School className="w-4 h-4" />
                  School Information
                </div>
              </button>
              <button
                onClick={() => setActiveTab('academic')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'academic'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Academic Year
                </div>
              </button>
              <button
                onClick={() => setActiveTab('grading')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'grading'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Grading System
                </div>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notifications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* School Information Tab */}
            {activeTab === 'school' && (
              <form onSubmit={handleSaveSchoolSettings} className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">School Details</h3>
                  {!isEditing ? (
                    <Button type="button" variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => {
                        setIsEditing(false);
                        setSchoolForm(settings.school);
                      }}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={schoolForm.name}
                      onChange={handleInputChange(schoolForm, setSchoolForm)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Principal Name
                    </label>
                    <input
                      type="text"
                      name="principal"
                      value={schoolForm.principal}
                      onChange={handleInputChange(schoolForm, setSchoolForm)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={schoolForm.address}
                      onChange={handleInputChange(schoolForm, setSchoolForm)}
                      disabled={!isEditing}
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={schoolForm.phone}
                      onChange={handleInputChange(schoolForm, setSchoolForm)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={schoolForm.email}
                      onChange={handleInputChange(schoolForm, setSchoolForm)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={schoolForm.website}
                      onChange={handleInputChange(schoolForm, setSchoolForm)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Affiliation
                    </label>
                    <input
                      type="text"
                      name="affiliation"
                      value={schoolForm.affiliation}
                      onChange={handleInputChange(schoolForm, setSchoolForm)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* Academic Year Tab */}
            {activeTab === 'academic' && (
              <form onSubmit={handleSaveAcademicSettings} className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Academic Year Configuration</h3>
                  {!isEditing ? (
                    <Button type="button" variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => {
                        setIsEditing(false);
                        setAcademicForm(settings.academicYear);
                      }}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Year
                    </label>
                    <input
                      type="text"
                      name="current"
                      value={academicForm.current}
                      onChange={handleInputChange(academicForm, setAcademicForm)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={academicForm.startDate}
                      onChange={handleInputChange(academicForm, setAcademicForm)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={academicForm.endDate}
                      onChange={handleInputChange(academicForm, setAcademicForm)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Terms</h4>
                  <div className="space-y-4">
                    {academicForm.terms.map((term, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Term Name
                          </label>
                          <input
                            type="text"
                            value={term.name}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white disabled:bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={term.startDate}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={term.endDate}
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            )}

            {/* Grading System Tab */}
            {activeTab === 'grading' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Grading Scale</h3>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Grade
                  </Button>
                </div>
                <Table columns={gradingColumns} data={gradingSystem} />
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <form onSubmit={handleSaveNotificationSettings} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <input
                      type="checkbox"
                      name="email"
                      checked={notificationForm.email}
                      onChange={handleInputChange(notificationForm, setNotificationForm)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                      <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                    </div>
                    <input
                      type="checkbox"
                      name="sms"
                      checked={notificationForm.sms}
                      onChange={handleInputChange(notificationForm, setNotificationForm)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Push Notifications</h4>
                      <p className="text-sm text-gray-500">Receive push notifications</p>
                    </div>
                    <input
                      type="checkbox"
                      name="push"
                      checked={notificationForm.push}
                      onChange={handleInputChange(notificationForm, setNotificationForm)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Attendance Alerts</h4>
                      <p className="text-sm text-gray-500">Get alerts for low attendance</p>
                    </div>
                    <input
                      type="checkbox"
                      name="attendanceAlerts"
                      checked={notificationForm.attendanceAlerts}
                      onChange={handleInputChange(notificationForm, setNotificationForm)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Fee Reminders</h4>
                      <p className="text-sm text-gray-500">Send reminders for pending fees</p>
                    </div>
                    <input
                      type="checkbox"
                      name="feeReminders"
                      checked={notificationForm.feeReminders}
                      onChange={handleInputChange(notificationForm, setNotificationForm)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Exam Notifications</h4>
                      <p className="text-sm text-gray-500">Notify about exams and results</p>
                    </div>
                    <input
                      type="checkbox"
                      name="examNotifications"
                      checked={notificationForm.examNotifications}
                      onChange={handleInputChange(notificationForm, setNotificationForm)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminSettings;
