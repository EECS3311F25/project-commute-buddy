// src/components/admin/UserTable.jsx
import { useEffect, useState } from "react";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Replace with backend API call - mock data to test
    setUsers([
      { id: 1, name: "Alice", email: "alice@example.com", status: "active" },
      { id: 2, name: "Bob", email: "bob@example.com", status: "suspended" },
    ]);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">User Management</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.status}</td>
              <td className="p-2">
                <button className="text-blue-600 hover:underline">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
