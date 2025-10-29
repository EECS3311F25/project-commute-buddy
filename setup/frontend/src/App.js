//importing page routes
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Content from "./pages/Content.jsx";
import Navbar from "./components/Navbar.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Pages */}
        <Route path="/content" element={
          <ProtectedRoute>
            <Content/>
          </ProtectedRoute>
        }/>

        {/* Optional: redirect root ("/") to /home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;
