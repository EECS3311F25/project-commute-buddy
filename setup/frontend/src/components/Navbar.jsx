import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/home" style={styles.link}>
          CommuteBuddy
        </Link>
      </div>

      <div style={styles.links}>
        <Link to="/home" style={styles.link}>Home</Link>

        {!token && (
          <>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
            <Link to="/login" style={styles.link}>Login</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/content" style={styles.link}>Content</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

// Simple inline styles for now
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#20232a",
    color: "white",
    padding: "10px 20px",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },
  logoutBtn: {
    backgroundColor: "#ff5555",
    border: "none",
    padding: "6px 12px",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;
