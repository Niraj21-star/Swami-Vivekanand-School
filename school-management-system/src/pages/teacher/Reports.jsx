/**
 * Teacher Reports Page
 * Generate and view various reports
 */

import { useState } from 'react';
import { FileText, Download, Calendar, Users, TrendingUp, BarChart } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { generateReport } from '../../services/teacherPortalService';

const Reports = () => {
  const [generating, setGenerating] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleGenerateReport = async (reportType) => {
    setGenerating(true);
    setSelectedReport(reportType);
    try {
      const result = await generateReport(reportType, {});
      alert(result.message);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report');
    } finally {
      setGenerating(false);
      setSelectedReport(null);
    }
  };

  const reportTypes = [
    {
      id: 'attendance',
      title: 'Attendance Report',
      description: 'Comprehensive attendance records for all classes',
      icon: Calendar,
      color: 'blue',
      features: [
        'Class-wise attendance breakdown',
        'Date range selection',
        'Student-wise attendance',
        'Attendance trends'
      ]
    },
    {
      id: 'grades',
      title: 'Grades Report',
      description: 'Student performance and grading analysis',
      icon: BarChart,
      color: 'green',
      features: [
        'Assignment-wise performance',
        'Grade distribution',
        'Top performers',
        'Subject-wise analysis'
      ]
    },
    {
      id: 'class-performance',
      title: 'Class Performance',
      description: 'Overall class performance metrics',
      icon: TrendingUp,
      color: 'purple',
      features: [
        'Average class scores',
        'Subject-wise comparison',
        'Performance trends',
        'Improvement suggestions'
      ]
    },
    {
      id: 'student-progress',
      title: 'Student Progress',
      description: 'Individual student progress tracking',
      icon: Users,
      color: 'yellow',
      features: [
        'Student-wise performance',
        'Attendance patterns',
        'Behavioral reports',
        'Parent communication logs'
      ]
    }
  ];

  const quickReports = [
    {
      id: 'today-attendance',
      title: 'Today\'s Attendance',
      description: 'Quick summary of today\'s attendance',
      icon: Calendar
    },
    {
      id: 'pending-grading',
      title: 'Pending Grading',
      description: 'List of assignments pending grading',
      icon: FileText
    },
    {
      id: 'low-performers',
      title: 'Students Needing Attention',
      description: 'Students with low attendance or grades',
      icon: Users
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and download various reports</p>
        </div>

        {/* Quick Reports */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Reports</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickReports.map((report) => (
              <button
                key={report.id}
                onClick={() => handleGenerateReport(report.id)}
                disabled={generating && selectedReport === report.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <report.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{report.title}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                  {generating && selectedReport === report.id ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  ) : (
                    <Download className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Detailed Reports */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Detailed Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTypes.map((report) => (
              <Card key={report.id} padding="none">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 bg-${report.color}-100 rounded-lg`}>
                      <report.icon className={`w-6 h-6 text-${report.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                    <ul className="space-y-1">
                      {report.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleGenerateReport(report.id)}
                      disabled={generating && selectedReport === report.id}
                    >
                      {generating && selectedReport === report.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      Customize
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Report History */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Reports</h2>
          <div className="space-y-3">
            {[
              {
                title: 'Attendance Report - Class 10-A',
                date: '2025-12-18',
                type: 'PDF',
                size: '2.4 MB'
              },
              {
                title: 'Grades Report - Mathematics',
                date: '2025-12-17',
                type: 'Excel',
                size: '1.8 MB'
              },
              {
                title: 'Class Performance - November',
                date: '2025-12-15',
                type: 'PDF',
                size: '3.2 MB'
              }
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(report.date).toLocaleDateString()} • {report.type} • {report.size}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Export Options */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Export Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-red-600 text-3xl mb-2">📄</div>
              <h3 className="font-medium text-gray-900 mb-1">PDF</h3>
              <p className="text-sm text-gray-600">Printable format</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-green-600 text-3xl mb-2">📊</div>
              <h3 className="font-medium text-gray-900 mb-1">Excel</h3>
              <p className="text-sm text-gray-600">Spreadsheet format</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg text-center">
              <div className="text-blue-600 text-3xl mb-2">📁</div>
              <h3 className="font-medium text-gray-900 mb-1">CSV</h3>
              <p className="text-sm text-gray-600">Data export</p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Reports;
