// src/components/admin/AdminDashboard.jsx
import { useState } from "react";
import AdminNav from "./AdminNav";
import UserTable from "./UserTable";
import { useNavigate } from "react-router-dom";
import ReportsTable from "./ReportsTable";
import ActivityLog from "./ActivityLog";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (activeTab) {
      case "users":
        return <UserTable />;
      case "reports":
        return <ReportsTable />;
      case "activity":
        return <ActivityLog />;
      default:
        return <p>Select a tab</p>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 bg-gray-100 shadow">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
        <div className="flex-1 p-4 overflow-auto">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
