# 🎓 Swami Vivekanand School Management System

A comprehensive, production-ready School Management System built with React, featuring role-based authentication and complete CRUD operations for managing students, teachers, classes, attendance, fees, and grades.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)
![React Router](https://img.shields.io/badge/React_Router-7.1-CA4245?logo=react-router)

## ✨ Features

### 🔐 Authentication & Authorization
- **Role-based access control** (Admin, Teacher, Principal, Clerk)
- **Protected routes** with automatic redirection
- **Session management** with localStorage
- **Secure login** system with mock authentication

### 👨‍💼 Admin Dashboard
- **Student Management** - Full CRUD operations
- **Teacher Management** - Add, edit, delete teachers
- **Class Management** - Create and manage classes
- **Fee Management** - Track fee payments and dues
- **Attendance Tracking** - View and manage attendance
- **Reports & Analytics** - Comprehensive statistics

### 👨‍🏫 Teacher Portal
- **Class Management** - View assigned classes
- **Attendance Marking** - Mark student attendance
- **Grade Management** - Enter and update grades
- **Student Roster** - View enrolled students

### 👨‍🎓 Principal Portal
- **Academic Oversight** - Monitor overall school performance
- **Attendance Monitoring** - View attendance trends and reports
- **Teacher Performance** - Review teacher metrics and add remarks
- **Exam Management** - View results, analysis, and performance reports
- **Notice Management** - Create and publish school notices
- **Approval Queue** - Approve/reject notices and requests

### 👨‍💼 Clerk Portal
- **Admission Management** - Process new admissions and enquiries
- **Student Records** - Maintain and update student information
- **Fee Collection** - Collect fees, generate receipts, track payments
- **Document Management** - Upload, verify, and manage student documents
- **TC Generation** - Generate and issue transfer certificates
- **Office Operations** - Handle day-to-day administrative tasks

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🔑 Demo Credentials

Use these credentials to explore different user roles:

| Role      | Username  | Password      |
|-----------|-----------|---------------|
| Admin     | admin     | admin123      |
| Teacher   | teacher   | teacher123    |
| Principal | principal | principal123  |
| Clerk     | clerk     | clerk123      |

## 📁 Project Structure

```
school-management-system/
├── src/
│   ├── components/         # Reusable components
│   │   ├── common/         # Button, Card, Input, Modal, Table
│   │   └── layout/         # Header, Sidebar, MainLayout
│   ├── context/            # AuthContext
│   ├── pages/              # Page components by role
│   │   ├── admin/
│   │   ├── teacher/
│   │   ├── principal/
│   │   ├── clerk/
│   │   └── Login.jsx
│   ├── services/           # Mock API services
│   │   ├── authService.js
│   │   ├── studentService.js
│   │   ├── teacherService.js
│   │   ├── classService.js
│   │   ├── attendanceService.js
│   │   ├── feeService.js
│   │   └── gradeService.js
│   ├── App.jsx             # Main app with routing
│   └── main.jsx            # Entry point
```

## 🎨 Key Components

### Reusable UI Components
- **Button** - Customizable button with variants
- **Card** - Container with header and footer
- **Input** - Form input with validation
- **Modal** - Dialog with backdrop
- **Table** - Data table with search, sort, pagination

### Layout Components
- **Header** - Top navigation with user menu
- **Sidebar** - Role-based navigation menu
- **MainLayout** - Page wrapper with header and sidebar

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🗂️ Mock Data Services

All data operations use mock services that simulate API calls. To connect to a real backend:

1. Set `USE_MOCK = false` in service files
2. Update API endpoints
3. Configure environment variables

## 🔐 Authentication Flow

1. User logs in with credentials
2. AuthService validates and returns token
3. Token stored in localStorage
4. AuthContext provides user state
5. ProtectedRoute checks authorization
6. Unauthorized users redirected

## 🎯 Role-Based Access

- **Admin**: Full system access - Manage students, teachers, classes, fees, attendance, and reports
- **Teacher**: Class and grade management - View classes, mark attendance, enter grades, and view student rosters
- **Principal**: Academic oversight (READ-ONLY) - Monitor attendance, review teacher performance, manage exams and notices, approval queue
- **Clerk**: Administrative operations - Process admissions, collect fees, manage student records, handle documents and TC generation

## 📱 Responsive Design

Fully responsive for:
- 📱 Mobile (< 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (> 1024px)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
```env
REACT_APP_API_URL=https://api.yourschool.com
REACT_APP_ENV=production
```

## 📋 Deployment Checklist

- [ ] Set `USE_MOCK = false`
- [ ] Configure API URL
- [ ] Remove console.logs
- [ ] Test all features
- [ ] Optimize assets
- [ ] Enable HTTPS

## 🛠️ Tech Stack

- React 18.3
- Vite 6.0
- React Router 7.1
- Lucide Icons
- Custom CSS

## 📝 Future Enhancements

- Real-time notifications
- PDF/Excel export
- Email/SMS integration
- Mobile app
- Online exams
- Library management

## 🐛 Support

For questions: admin@school.com

---

**Made with 💙 for Swami Vivekanand School**

*Last Updated: December 18, 2025*
