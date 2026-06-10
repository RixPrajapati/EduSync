import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Dipak",
      rollNo: "03-20-2026",
      grade: "A",
      present: true,
    },
    {
      id: 2,
      name: "Ram ",
      rollNo: "04-20-2026",
      grade: "A+",
      present: true,
    },
  ]);
  const schedules = [
    {
      time: "9:30",
      subject: "Linear Algebra",
      room: "Room 44",
      status: "Completed",
    },
    {
      time: "11:00",
      subject: "Physics",
      room: "Room 404",
      status: "On Going",
    },
    {
      time: "1:00",
      subject: "Linear Algebra",
      room: "Room 44",
      status: "Completed",
    },
  ];

  const toggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student,
      ),
    );
  };

  const markAllPresent = () => {
    setStudents((prev) =>
      prev.map((student) => ({ ...student, present: true })),
    );
  };

  const currentDate = new Date().toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8 ">
        {/* left section */}
        <div className="mx-auto px-3 py-2 ml-2 ">
          <div className="bg-gray-100">
            <h1 className="text-xl font-bold">Class Attendance</h1>

            <p className="text-sm">
              <span>● Advance Mathematics</span> ● Period 4 ● {currentDate}
            </p>
          </div>
          {/* table section */}
          <div className="mx-1 my-3 bg-white shadow-2xl rounded-2xl w-full md:w-2xl">
            <div className="flex justify-between items-center">
              <h2 className="p-2 font-semibold">STUDENT ROLL CALL</h2>

              <button
                onClick={markAllPresent}
                className="m-2 border p-2 rounded-2xl bg-gray-100 text-blue-600 text-sm"
              >
                Mark All Present
              </button>
            </div>
            {/*  */}
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden  mt-1">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">STUDENT</th>
                  <th className="px-4 py-3 text-left">ROLL NO</th>
                  <th className="px-4 py-3 text-left">LAST GRADE</th>
                  <th className="px-4 py-3 text-left">STATUS</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-3">{student.name}</td>
                    <td className="px-4 py-3">{student.rollNo}</td>
                    <td className="px-4 py-3">{student.grade}</td>

                    <td className="px-4 py-3">
                      <div
                        onClick={() => toggleAttendance(student.id)}
                        className={`w-16 h-6 rounded-full flex items-center cursor-pointer px-1 transition-all ${
                          student.present
                            ? "bg-green-500 justify-end"
                            : "bg-gray-400 justify-start"
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-white"></span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* marks entry section mx-1 my-3 bg-white shadow-2xl rounded-2xl w-full */}
          <div className="mx-auto px-4 py-3 shadow-2xl rounded-2xl bg-white">
            <div className="flex gap-4 justify-between items-center">
              <div className="flex flex-col md:gap-1 mx-4">
                <h2 className="text-md font-bold">Marks Entry</h2>
                <p className="text-sm text-gray-400">
                  Mid-term Examination: Calculus Fundamentals
                </p>
              </div>
              <div>
                <button className="bg-blue-800 text-white text-sm rounded-2xl p-2 ml:3">
                  Submit Grade
                </button>
              </div>
            </div>
            {/*  */}

            <div className="flex flex-col gap-4 p-4 md:flex-row md:gap-6">
              <div className="flex justify-between border p-3 rounded md:gap-8">
                <h3>Exam Date: 12 May</h3>

                <button className="bg-gray-200 p-2 text-sm text-blue-600 font-bold rounded-2xl">
                  Active
                </button>
              </div>

              <div className="flex justify-between border p-3 rounded md:gap-8">
                <h3>Total Students: 45</h3>

                <button className="bg-green-200 p-2 text-sm text-green-600 font-bold rounded-2xl">
                  12 Completed
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* right section */}
        <div className="m-4 px-4 py-3 bg-gray-300">
          {/* schedules */}
          <div className="bg-blue-500 rounded-2xl p-4">
            <h1 className="text-white text-xl font-bold mb-4">
              Today Schedules
            </h1>
            {schedules.map((item, index) => (
              <div key={index} className="flex m-3">
                <div className="m-3">
                  <span className="inline-block text-white px-4 py-2 bg-blue-700 rounded-xl">
                    {item.time}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl text-white">{item.subject}</h2>

                  <p className="text-sm text-gray-300">
                    {item.room} ● {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* upload section */}
          <div className="max-w-2xl mx-auto mt-2 bg-white rounded-2xl p-4">
            <h2 className="text-xl font-bold mb-4 uppercase">
              Upload Assignments
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
              <p className="text-gray-600 font-medium">
                Drag & Drop files here
              </p>

              <p className="text-sm text-gray-400 mt-1">PDF, DOCX up to 10MB</p>

              <label className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
                Choose File
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* Performance Card */}
          <div className="mt-3 rounded-2xl overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-green-800 text-white shadow-lg">
            <div className="p-2">
              <p className="uppercase text-gray-200 font-semibold tracking-wider">
                Class Performance
              </p>

              <div className="flex items-center gap-4 mt-4">
                <h1 className="text-6xl font-bold">88.4%</h1>

                <span className="text-green-200 text-xl">
                  +2.1% from last month
                </span>
              </div>
            </div>

            <div className="bg-green-500/20 h-48 flex items-end justify-around px-8 pb-4">
              {[16, 24, 20, 32, 28, 36, 32].map((height, index) => (
                <div
                  key={index}
                  className="w-6 bg-white/30 rounded"
                  style={{ height: `${height * 4}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
