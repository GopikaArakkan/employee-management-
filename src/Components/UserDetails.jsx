import React, { useState, useEffect } from "react";
import API from "../Services/api";

function UserDetails({ fetchUsers, editUser, setEditUser }) {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    department: "",
    designation: "",
    status: "Active",
  });

  useEffect(() => {
    if (editUser) {
      setUser(editUser);
    }
  }, [editUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await API.put(`/employees/${editUser._id}`, user);
      } else {
        await API.post("/employees", user);
      }
      setUser({
        fullName: "",
        email: "",
        department: "",
        designation: "",
        status: "Active",
      });
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={user.fullName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={user.department}
        onChange={handleChange}
      />
      <input
        type="text"
        name="designation"
        placeholder="Designation"
        value={user.designation}
        onChange={handleChange}
      />
      <select name="status" value={user.status} onChange={handleChange}>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button type="submit">{editUser ? "Update" : "Add"} Employee</button>
    </form>
  );
}

export default UserDetails;