// src/components/admin/AdminNav.jsx
export default function AdminNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "users", label: "Users" },
    { id: "reports", label: "Reports" },
    { id: "activity", label: "Activity Log" },
    { id: "profile", label: "Preferences" },
  ];

  return (
    <aside className="w-56 bg-white shadow-lg h-screen p-4 space-y-2">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`block w-full text-left px-3 py-2 rounded-lg ${
            activeTab === tab.id
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "hover:bg-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </aside>
  );
}
