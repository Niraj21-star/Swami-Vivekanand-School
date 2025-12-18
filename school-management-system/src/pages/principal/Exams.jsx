import { useState, useEffect } from 'react';
import { FileText, Calendar, TrendingUp, Award, Download, Filter } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import * as principalService from '../../services/principalService';

const Exams = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('schedule');
  const [examSchedule, setExamSchedule] = useState([]);
  const [examResults, setExamResults] = useState(null);
  const [performanceAnalysis, setPerformanceAnalysis] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const schedule = await principalService.getExamSchedule();
      const results = await principalService.getExamResults();
      const analysis = await principalService.getPerformanceAnalysis();
      
      setExamSchedule(schedule);
      setExamResults(results);
      setPerformanceAnalysis(analysis);
    } catch (error) {
      console.error('Error loading exam data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Upcoming: 'bg-blue-100 text-blue-800',
      Ongoing: 'bg-green-100 text-green-800',
      Completed: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const scheduleColumns = [
    { 
      key: 'examType', 
      label: 'Exam Type',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.examType}</p>
          <p className="text-sm text-gray-500">{row.class}</p>
        </div>
      )
    },
    { 
      key: 'startDate', 
      label: 'Start Date',
      render: (row) => new Date(row.startDate).toLocaleDateString()
    },
    { 
      key: 'endDate', 
      label: 'End Date',
      render: (row) => new Date(row.endDate).toLocaleDateString()
    },
    { 
      key: 'totalSubjects', 
      label: 'Subjects',
      render: (row) => <span className="font-medium">{row.totalSubjects}</span>
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => getStatusBadge(row.status)
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Button size="sm" variant="outline">
          View Details
        </Button>
      )
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Examination Management</h1>
            <p className="text-gray-600 mt-1">Manage exam schedules and analyze results</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="primary">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Exams</p>
                <p className="text-2xl font-bold text-gray-900">
                  {examSchedule.filter(e => e.status === 'Upcoming').length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ongoing Exams</p>
                <p className="text-2xl font-bold text-green-600">
                  {examSchedule.filter(e => e.status === 'Ongoing').length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Pass %</p>
                <p className="text-2xl font-bold text-purple-600">
                  {examResults?.averagePercentage || 0}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
          <Card padding={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top Scorers</p>
                <p className="text-2xl font-bold text-orange-600">
                  {examResults?.topStudents?.length || 0}
                </p>
              </div>
              <Award className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'schedule'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Exam Schedule
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'results'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Latest Results
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analysis'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Performance Analysis
            </button>
          </nav>
        </div>

        {/* Content */}
        <Card>
          {activeTab === 'schedule' && (
            <Table
              columns={scheduleColumns}
              data={examSchedule}
              loading={loading}
            />
          )}
          
          {activeTab === 'results' && examResults && (
            <div className="space-y-6">
              {/* Overall Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Total Students</p>
                  <p className="text-3xl font-bold text-blue-900 mt-2">{examResults.totalStudents}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Pass Percentage</p>
                  <p className="text-3xl font-bold text-green-900 mt-2">{examResults.passPercentage}%</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Average Marks</p>
                  <p className="text-3xl font-bold text-purple-900 mt-2">{examResults.averagePercentage}%</p>
                </div>
              </div>

              {/* Top Students */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
                <div className="space-y-3">
                  {examResults.topStudents?.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{student.studentName}</p>
                          <p className="text-sm text-gray-600">{student.class}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{student.percentage}%</p>
                        <p className="text-sm text-gray-600">{student.totalMarks}/{student.maxMarks}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subject-wise Performance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Analysis</h3>
                <div className="space-y-2">
                  {examResults.subjectWise?.map((subject) => (
                    <div key={subject.subject} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{subject.subject}</p>
                        <p className="text-lg font-bold text-gray-900">{subject.averageMarks}%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            subject.averageMarks >= 75 ? 'bg-green-500' : 
                            subject.averageMarks >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${subject.averageMarks}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Highest: {subject.highestMarks} | Lowest: {subject.lowestMarks}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grade Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {examResults.gradeDistribution?.map((grade) => (
                    <div key={grade.grade} className="p-4 bg-white border border-gray-200 rounded-lg text-center">
                      <p className="text-3xl font-bold text-gray-900">{grade.count}</p>
                      <p className="text-sm text-gray-600 mt-1">Grade {grade.grade}</p>
                      <p className="text-xs text-gray-500 mt-1">{grade.percentage}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'analysis' && performanceAnalysis && (
            <div className="space-y-6">
              {/* Exam Comparison */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {performanceAnalysis.examComparison?.map((exam) => (
                    <div key={exam.examType} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{exam.examType}</p>
                      <p className="text-2xl font-bold text-blue-600 mt-2">{exam.averagePercentage}%</p>
                      <p className="text-sm text-gray-600 mt-1">Pass Rate: {exam.passPercentage}%</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Class Comparison */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Class-wise Performance</h3>
                <div className="space-y-3">
                  {performanceAnalysis.classComparison?.map((cls) => (
                    <div key={cls.class} className="p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{cls.class}</p>
                        <p className="text-lg font-bold text-gray-900">{cls.averagePercentage}%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${cls.averagePercentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Rank: {cls.rank} | Students: {cls.totalStudents} | Pass: {cls.passPercentage}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default Exams;
