//importing page routes
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Content from "./pages/Content.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/content" element={<Content />} />

        {/* Optional: redirect root ("/") to /home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;
