import React from 'react';
import AdminHeader from '../Admin/Admin Header/header';

const ScheduleClass = () => {
  const periods = [
    { period: "Period 1", from: "08:00", till: "09:00", subject: "SS", faculty: "Sini" },
    { period: "Period 2", from: "09:00", till: "10:00", subject: "SS", faculty: "Sini" },
    { period: "Period 3", from: "10:00", till: "11:00", subject: "Science", faculty: "Biji" },
    { period: "Period 4", from: "11:00", till: "12:00", subject: "Computer", faculty: "Siji" },
    { period: "Period 5", from: "01:00", till: "02:00", subject: "Maths", faculty: "Benoy" },
    { period: "Period 6", from: "02:00", till: "03:00", subject: "Maths", faculty: "Benoy" },
    { period: "Period 7", from: "03:00", till: "04:00", subject: "Malayalam", faculty: "Bagya" },
  ];

  return (
    <div className="flex h-screen font-sans bg-white">

      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content */}
      <section className="ml-2 mr-2 -mt-20 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">

            {/* Text Area */}
            <div className="md:w-1/2 space-y-6 text-center md:text-left bg-cyan-100 p-6 rounded-lg shadow-lg">
              <div className="text-3xl md:text-4xl font-bold bg-orange-200 rounded-xl text-gray-900 p-4">
                Limitless learning at <br />
                <span className="text-blue-600">Schedule </span>and
                <span className="text-blue-600"> Time table</span>
              </div>
              <p className="text-gray-600 text-lg">
                Explore a Learning Management System with over 95 courses and 10 million students. Trusted by experts worldwide to help you learn new skills and grow your career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                  Get Started
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                  Watch Video
                </button>
              </div>
              <div className="flex gap-6 mt-8 justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-gray-500">Online Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">200+</div>
                  <div className="text-gray-500">Expert Tutors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">60K+</div>
                  <div className="text-gray-500">Online Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">6K+</div>
                  <div className="text-gray-500">Certified Courses</div>
                </div>
              </div>
            </div>

            {/* Image Area */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Learning illustration"
                className="w-full rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              />
            </div>

          </div>
        </div>

        {/* Timetable Section */}
        <section className="w-full -mt-40 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Class Timetable
            </h2>

            <div className="flex flex-col md:flex-row items-start gap-8">

              {/* Left Side Image */}
              <div className="md:w-1/3 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1500&q=80"
                  alt="Timetable Illustration"
                  className="w-full rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
                />
              </div>

              {/* Right Side Timetable */}
              <div className="md:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full table-auto">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-3">Period</th>
                      <th className="px-4 py-3">From</th>
                      <th className="px-4 py-3">Till</th>
                      <th className="px-4 py-3">Subjects</th>
                      <th className="px-4 py-3">Faculty</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {periods.map((p, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                        <td className="border px-4 py-2 text-center">{p.period}</td>
                        <td className="border px-4 py-2 text-center">{p.from}</td>
                        <td className="border px-4 py-2 text-center">{p.till}</td>
                        <td className="border px-4 py-2 text-center">{p.subject}</td>
                        <td className="border px-4 py-2 text-center">{p.faculty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </section>

      </section>
    </div>
  );
};

export default ScheduleClass;
