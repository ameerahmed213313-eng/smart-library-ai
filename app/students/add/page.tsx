"use client";

import { useState } from "react";

export default function AddStudentPage() {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    department: "",
    semester: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    alert("Student Added Successfully!");

    setFormData({
      rollNo: "",
      name: "",
      department: "",
      semester: "",
      phone: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        👨‍🎓 Add New Student
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Roll Number"
          value={formData.rollNo}
          onChange={(e) =>
            setFormData({
              ...formData,
              rollNo: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Student Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) =>
            setFormData({
              ...formData,
              department: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Semester"
          value={formData.semester}
          onChange={(e) =>
            setFormData({
              ...formData,
              semester: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Save Student
        </button>

      </form>
    </div>
  );
}