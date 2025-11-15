import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const role = parsedUser?.role ?? null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Admin dashboard handles its own navigation
  if (token && role === "admin") {
    return null;
  }

  const primaryLinks = [
    { label: "Home", to: "/home" },
    { label: "Matches", to: "/matches" },
    { label: "Groups", to: "/requests" },
    { label: "Profile", to: "/profile" },
  ];

  return (
    <header style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <div style={styles.logoMark}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M216,56H40A24,24,0,0,0,16,80V184a24,24,0,0,0,24,24H60a28,28,0,0,0,56,0h24a28,28,0,0,0,56,0h20a24,24,0,0,0,24-24V80A24,24,0,0,0,216,56Zm8,128a8,8,0,0,1-8,8H200v-8a12,12,0,0,0-24,0v8H120v-8a12,12,0,0,0-24,0v8H64a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8Z"></path>
              <path d="M72,96H120v48H72Z"></path>
              <path d="M136,96h48v48H136Z"></path>
            </svg>
          </div>
          <Link to="/home" style={styles.brandText}>
            Commute Buddy
          </Link>
        </div>

        {token ? (
          <div style={styles.authenticatedArea}>
            <nav style={styles.linkRow}>
              {primaryLinks.map((item) => (
                <Link key={item.to} to={item.to} style={styles.navLink}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div style={styles.actions}>
              <button type="button" style={styles.iconButton} aria-label="Notifications">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                </svg>
              </button>
              <button
                type="button"
                style={{
                  ...styles.avatar,
                  backgroundImage: `url("${parsedUser?.profileImage || defaultAvatar}")`,
                }}
                onClick={() => navigate("/profile")}
                aria-label="Profile"
              />
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.guestActions}>
            <Link to="/login" style={{ ...styles.navLink, ...styles.guestLink }}>
              Login
            </Link>
            <Link to="/signup" style={styles.primaryBtn}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

const defaultAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLc-O2PnJl8pHJpVIiHH2M5nH3zzF_MbnnwatNEv0Nv1vCcgO6ZDV6lHaZIBsD0wvDOtFTdD7jVUqWMQq-KRB9giW4fD4oJFdIMPpkZxxcagTRQr5ip5r0cPy0f07UYzwccPkDB0Z5hx5iuG0Dm4W0RUV-hGtHtCVBu9FAiHPAehH2w8eOkOjkuPNpLCXkenU9xqe5-Z5mPtG-7IHUnubMm_so2w7nYqs8b1ozMJ9JEqbps_5abuX6nXMjj5f8_b26g4180Urz4c";

const styles = {
  wrapper: {
    width: "100%",
    backgroundColor: "#fbf8f9",
    borderBottom: "1px solid #f2e8e9",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    gap: "24px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#1a0e0f",
    textDecoration: "none",
  },
  logoMark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1a0e0f",
  },
  brandText: {
    color: "#1a0e0f",
    fontWeight: 700,
    fontSize: "1.1rem",
    textDecoration: "none",
  },
  authenticatedArea: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    flex: 1,
    justifyContent: "flex-end",
  },
  linkRow: {
    display: "flex",
    gap: "28px",
  },
  navLink: {
    color: "#1a0e0f",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: 500,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  iconButton: {
    border: "none",
    backgroundColor: "#f2e8e9",
    color: "#1a0e0f",
    borderRadius: "8px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    border: "2px solid #f2e8e9",
    cursor: "pointer",
  },
  logoutBtn: {
    backgroundColor: "#ce1c2b",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: 600,
  },
  guestActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  guestLink: {
    padding: "8px 14px",
    borderRadius: "8px",
    backgroundColor: "transparent",
  },
  primaryBtn: {
    backgroundColor: "#ce1c2b",
    color: "#fff",
    padding: "8px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  },
};

export default Navbar;
