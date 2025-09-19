import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Headers from './heaser and footer bar/header';

import AdminHome from './components/Admin/AdminHome';
import AdminHeader from './components/Admin/Admin Header/header';
import Live from './components/Admin/live';
import ScheduleClass from './components/Admin/ScheduleClass';

import TeacherHome from './components/teachers/Home';
import TeacherHeader from './components/teachers/header/header';
import CourseSchedule from './components/teachers/CourseSchedule';

import StudentHome from './components/student/Home';
import StudentHeader from './components/student/header/header';
import StudentClass from './components/student/StudentClass';


const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path='/header' element={<Headers />} />
        <Route path="/" element={<Home />} />

        {/* Admin Route */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/header" element={<AdminHeader />} />
        <Route path="/admin/live" element={<Live />} />
        <Route path="/admin/schedule-class" element={<ScheduleClass />} />

        {/* Teacher Route */}
        <Route path="/teachers/home" element={<TeacherHome />} />
        <Route path="/teachers/header" element={<TeacherHeader />} />
        <Route path="/teachers/course-schedule" element={<CourseSchedule />} />

        {/* Student Routes */}
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/header" element={<StudentHeader />} />
        <Route path="/student/schedule-class" element={<StudentClass />} />

      </Routes>
    </div>
  )
}

export default App
