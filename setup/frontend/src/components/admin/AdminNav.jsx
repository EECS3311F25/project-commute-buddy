// src/components/admin/AdminNav.jsx
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function AdminNav({ activeTab, setActiveTab }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [profileImageLink, setProfileImageLink] = useState([]);

  const tabs = [
    { id: "users", label: "Users" },
    { id: "reports", label: "Reports" },
    { id: "activity", label: "Activity Log" },
    { id: "profile", label: "Preferences" },
  ];

  //get users current profile picture, if it exists
  const fetchProfileImage = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfileImageLink(res.data.profileImage);
    } catch (error) {
      console.error("Error fetching User Profile Image:", error);
    }
  };

  fetchProfileImage();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header style={styles.wrapper}>
      <div style={styles.container}>
        {/* Brand */}
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
          <span style={styles.brandText}>Admin Panel</span>
        </div>

        {/* Tabs */}
        <nav style={styles.linkRow}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.navLink,
                ...(activeTab === tab.id ? styles.activeNavLink : {}),
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/*Profile Picture*/}
        <button
          type="button"
          style={{
            ...styles.avatar,
            backgroundImage: `url("${profileImageLink || defaultAvatar}")`,
          }}
          aria-label="Profile"
        />

        {/* Logout */}
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
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
    maxWidth: "1300px",
    margin: "0 auto",
    gap: "24px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
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
  },
  linkRow: {
    display: "flex",
    gap: "28px",
    flex: 1,
    justifyContent: "center",
  },
  navLink: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "0.95rem",
    fontWeight: 500,
    cursor: "pointer",
    color: "#1a0e0f",
    padding: "8px 14px",
    borderRadius: "8px",
  },
  activeNavLink: {
    backgroundColor: "#eee2e4",
    fontWeight: 700,
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
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
};
