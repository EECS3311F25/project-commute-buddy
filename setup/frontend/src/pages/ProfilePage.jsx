import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [routes, setRoutes] = useState([]); // all available routes
  const [selectedRoutes, setSelectedRoutes] = useState([]); // user preferences
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({ name: "", email: "" }); //get User data

  const token = localStorage.getItem("token"); // your auth token

  //TODO: try to redirect users that aren't logged in check ProtectedRoutes.jsx

  // Fetch user's personal details
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data); // e.g. { name, email, preferredRoutes }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  //fetch all routes available
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchRoutes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/routes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoutes(res.data);
      } catch (err) {
        console.error("Error fetching routes:", err);
      }
    };

    fetchRoutes();
  }, []);

  //fetch users current preferred routes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserPreferences = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/preferences",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSelectedRoutes(res.data); // res.data is preferredRoutes array
      } catch (err) {
        console.error("Error fetching user preferences:", err);
      }
    };

    fetchUserPreferences();
  }, []);

  //handle users selection of routes
  const handleSelect = (route) => {
    setSelectedRoutes((prev) =>
      prev.includes(route) ? prev.filter((r) => r !== route) : [...prev, route]
    );
  };

  //handle save and update accordingly
  const handleSaveRoutes = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/preferences",
        { routes: selectedRoutes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Preferences updated!");
      setSelectedRoutes(res.data.preferredRoutes); // update state with what backend returned
    } catch (err) {
      console.error(err);
      setMessage("Error saving preferences.");
    } finally {
      // Hide message after 3 seconds
      setTimeout(() => setMessage(""), 1500);
    }
  };

  //handle user's profile update
  const handleProfileSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        userData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(res.data);
      setMessage("Profile updated!");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage("That email is already in use.");
      } else {
        setMessage("Error updating preferences.");
      }
    } finally {
      // Hide message after 3 seconds
      setTimeout(() => setMessage(""), 1500);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>

      {/* User Info Form */}
      <div className="p-4 border rounded bg-white shadow-sm space-y-3">
        <label className="block">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full border rounded p-2 mt-1"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="w-full border rounded p-2 mt-1"
          />
        </label>

        <button
          onClick={handleProfileSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Profile
        </button>
      </div>

      {/* Preferred Routes Section */}
      <h2 className="text-xl font-semibold mt-6">Your Bus Routes</h2>
      <ul className="space-y-2 mb-4">
        {routes.map((route) => (
          <li
            key={route}
            className={`p-3 rounded border cursor-pointer ${
              selectedRoutes.includes(route)
                ? "bg-blue-100 border-blue-500"
                : "bg-white border-gray-300"
            }`}
            onClick={() => handleSelect(route)}
          >
            {route}
          </li>
        ))}
      </ul>

      <button
        onClick={handleSaveRoutes}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Preferences
      </button>
      {message && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-5 py-3 rounded shadow-md text-sm font-medium ${
            message.includes("Error") || message.includes("use")
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
          } transition-opacity duration-500`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
