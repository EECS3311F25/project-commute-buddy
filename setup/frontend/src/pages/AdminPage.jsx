// src/pages/AdminPage.jsx
import AdminDashboard from "../components/admin/AdminDashboard.jsx"; //check this route
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";

const AdminPage = ({ user }) => {
  return (
    <ProtectedRoute user={user} requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  );
};

export default AdminPage;
