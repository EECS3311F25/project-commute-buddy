import { useState } from "react";
import AdminNav from "./AdminNav";
import UserTable from "./UserTable";
import ReportsTable from "./ReportsTable";
import ActivityLog from "./ActivityLog";
import ProfilePage from "../../pages/ProfilePage";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  const renderTabContent = () => {
    switch (activeTab) {
      case "users":
        return <UserTable />;
      case "reports":
        return <ReportsTable />;
      case "activity":
        return <ActivityLog />;
      case "profile":
        return <ProfilePage />;
      default:
        return <p>Select a tab</p>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-4 overflow-auto">{renderTabContent()}</div>
    </div>
  );
}

export default AdminDashboard;
