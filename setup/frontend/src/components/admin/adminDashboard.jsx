// src/components/admin/AdminDashboard.jsx
import { useState } from "react";
import AdminNav from "./AdminNav";
import UserTable from "./UserTable";
import ReportsTable from "./ReportsTable";
import ActivityLog from "./ActivityLog";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          {activeTab === "users" && <UserTable />}
          {activeTab === "reports" && <ReportsTable />}
          {activeTab === "activity" && <ActivityLog />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
