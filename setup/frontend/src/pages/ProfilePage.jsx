import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [routes, setRoutes] = useState([]); // all available routes
  const [selectedRoutes, setSelectedRoutes] = useState([]); // user preferences
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token"); // your auth token

  //try to redirect users that aren't logged in check ProtectedRoutes.jsx

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
  const handleSave = async () => {
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
      //just hiding the text after
      setTimeout(() => {
        setMessage("");
      }, 1000);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Bus Routes</h2>

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
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Preferences
      </button>
      {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
    </div>
  );
}
