//importing page routes
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Content from "./pages/Content.jsx";
import Matches from "./pages/Matches.jsx";
import Navbar from "./components/common/Navbar.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import Forbidden from "./pages/Forbidden.jsx";
import CommuteRequests from "./pages/CommuteRequests.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/requests" element={
          <ProtectedRoute>
            <CommuteRequests />
          </ProtectedRoute>
        }/>


        {/* Protected Pages */}
        <Route path="/content" element={
          <ProtectedRoute>
            <Content/>
          </ProtectedRoute>
        }/>

        <Route path="/matches" element={
          <ProtectedRoute>
            <Matches />
          </ProtectedRoute>
        }/>

        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }/>

        {/* 🔐 Admin-only route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Optional: redirect root ("/") to /home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;
