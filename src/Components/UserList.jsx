import React from "react";

function UserList({ users, deleteUser, setEditUser }) {
  const viewEmployee = (user) => {
    alert(
      `Employee Info:\nName: ${user.fullName}\nEmail: ${user.email}\nDepartment: ${user.department}\nDesignation: ${user.designation}\nStatus: ${user.status}`
    );
  };

  return (
    <div>
      <h2>User List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(users || []).map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>{user.designation}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => viewEmployee(user)}>View</button>
                <button onClick={() => setEditUser(user)} style={{ marginLeft: "5px" }}>
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  style={{ color: "red", marginLeft: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;