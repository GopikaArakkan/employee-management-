import { useState, useEffect } from "react";
import API from "../Services/api";
import UserList from "../Components/UserList";
import UserDetails from "../Components/UserDetails";

function Homepage() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // 1️⃣ Define deleteUser BEFORE using it
  const deleteUser = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      fetchUsers(); // call fetchUsers after deletion
    } catch (err) {
      console.error(err);
    }
  };

  // 2️⃣ Define fetchUsers
  const fetchUsers = async () => {
    try {
      const res = await API.get("/employees");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  // 3️⃣ Call fetchUsers on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Employee Management System</h1>

      <UserDetails
        fetchUsers={fetchUsers}
        editUser={editUser}
        setEditUser={setEditUser}
      />

      <UserList
        users={users}
        deleteUser={deleteUser}  // now safe
        setEditUser={setEditUser}
      />
    </div>
  );
}

export default Homepage;