import { useState, useEffect } from 'react';
import { FileText, TrendingUp, Download, Filter, BarChart3 } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import * as principalService from '../../services/principalService';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('academic');
  const [academicReports, setAcademicReports] = useState(null);
  const [comparisonReports, setComparisonReports] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const academic = await principalService.getAcademicReports();
      const comparison = await principalService.getComparisonReports();
      
      setAcademicReports(academic);
      setComparisonReports(comparison);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive academic and performance reports</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {academicReports && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card padding={true}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{academicReports.overview.totalStudents}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </Card>
            <Card padding={true}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Teachers</p>
                  <p className="text-2xl font-bold text-gray-900">{academicReports.overview.totalTeachers}</p>
                </div>
                <FileText className="w-8 h-8 text-green-500" />
              </div>
            </Card>
            <Card padding={true}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pass Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{academicReports.overview.passRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </Card>
            <Card padding={true}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Attendance</p>
                  <p className="text-2xl font-bold text-orange-600">{academicReports.overview.averageAttendance}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-500" />
              </div>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('academic')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'academic'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Academic Report
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'comparison'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Comparison Reports
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'academic' && academicReports && (
          <div className="space-y-6">
            {/* Top Performers */}
            <Card padding={true}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers (Annual)</h3>
              <div className="space-y-3">
                {academicReports.topperDetails.map((topper, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{topper.studentName}</p>
                        <p className="text-sm text-gray-600">{topper.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{topper.percentage}%</p>
                      <p className="text-sm text-gray-600">Grade: {topper.grade}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Class-wise Performance */}
            <Card padding={true}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Class-wise Performance</h3>
              <div className="space-y-3">
                {academicReports.classWisePerformance.map((cls) => (
                  <div key={cls.class} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{cls.class}</p>
                      <p className="text-lg font-bold text-gray-900">{cls.averagePercentage}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${cls.averagePercentage}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <p>Students: {cls.totalStudents}</p>
                      <p>Pass: {cls.passPercentage}%</p>
                      <p>Topper: {cls.topperPercentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Term-wise Summary */}
            <Card padding={true}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Term-wise Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {academicReports.termWiseSummary.map((term) => (
                  <div key={term.term} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">{term.term}</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{term.averagePercentage}%</p>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Pass Rate: {term.passPercentage}%</p>
                      <p>Highest: {term.highestPercentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'comparison' && comparisonReports && (
          <div className="space-y-6">
            {/* Year-to-Year Comparison */}
            <Card padding={true}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-to-Year Comparison</h3>
              <div className="space-y-4">
                {comparisonReports.yearToYear.map((year) => (
                  <div key={year.year} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">{year.year}</p>
                        <p className="text-sm text-gray-600">{year.totalStudents} students</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{year.averagePercentage}%</p>
                        <p className="text-sm text-gray-600">Pass: {year.passPercentage}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${year.averagePercentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Class-to-Class Comparison */}
            <Card padding={true}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Class-to-Class Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {comparisonReports.classToClass.map((comparison) => (
                  <div key={comparison.class} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900 mb-3">{comparison.class}</p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Current Year</span>
                          <span className="font-medium">{comparison.currentYear}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${comparison.currentYear}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Previous Year</span>
                          <span className="font-medium">{comparison.previousYear}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${comparison.previousYear}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Improvement</span>
                        <span className={`font-bold ${
                          comparison.improvement >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {comparison.improvement > 0 ? '+' : ''}{comparison.improvement}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Subject Comparison */}
            <Card padding={true}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance Comparison</h3>
              <div className="space-y-3">
                {comparisonReports.subjectComparison.map((subject) => (
                  <div key={subject.subject} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{subject.subject}</p>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Current</p>
                          <p className="text-lg font-bold text-blue-600">{subject.currentAverage}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Previous</p>
                          <p className="text-lg font-bold text-green-600">{subject.previousAverage}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${subject.currentAverage}%` }}
                          />
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${
                        subject.improvement >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {subject.improvement > 0 ? '+' : ''}{subject.improvement}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Reports;
