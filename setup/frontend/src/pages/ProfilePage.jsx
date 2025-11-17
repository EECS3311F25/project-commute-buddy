import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function ProfilePage() {
  const [routes, setRoutes] = useState([]); // all available routes
  const [selectedRoutes, setSelectedRoutes] = useState([]); // user preferences
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({ 
    name: "", 
    email: "",
    startArea: "",
    transportMode: "",
    profileImage: "",
    gender: "",
    interests: [],
    commuteWindow: "",
  }); //get User data
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [interestInput, setInterestInput] = useState(""); // for adding interests

  const token = localStorage.getItem("token"); // your auth token

  //TODO: try to redirect users that aren't logged in check ProtectedRoutes.jsx

  // Fetch user's personal details
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Ensure all new fields are initialized with default values if not present
        setUserData({
          name: res.data.name || "",
          email: res.data.email || "",
          startArea: res.data.startArea || "",
          transportMode: res.data.transportMode || "",
          profileImage: res.data.profileImage || "",
          gender: res.data.gender || "",
          interests: res.data.interests || [],
          commuteWindow: res.data.commuteWindow || "",
        }); // e.g. { name, email, preferredRoutes, startArea, transportMode, etc. }
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
        const res = await axios.get("http://localhost:5001/api/users/routes", {
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
          "http://localhost:5001/api/users/preferences",
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
        "http://localhost:5001/api/users/preferences",
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
    // Validate email domain
    const emailLower = userData.email.toLowerCase();
    if (
      !emailLower.endsWith("@yorku.ca") &&
      !emailLower.endsWith("@my.yorku.ca")
    ) {
      setMessage("Email must end with @yorku.ca or @my.yorku.ca");
      // Hide message after 1.5 seconds
      setTimeout(() => setMessage(""), 1500);
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:5001/api/users/profile",
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
      // Hide message after 1.5 seconds
      setTimeout(() => setMessage(""), 1500);
    }
  };

  //change users password
  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5001/api/users/changePassword",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswordMessage(res.data.message); // success message
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPasswordMessage(
        err.response?.data?.message || "Error changing password"
      );
    } finally {
      setTimeout(() => setPasswordMessage(""), 1500); // hide after 1.5s
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>

      {/* User Info Form */}
      <div className="p-4 border rounded bg-white shadow-sm space-y-3">
        <h3 className="text-lg font-semibold">Personal Details</h3>
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

        {/* Start Area */}
        <label className="block">
          <span className="text-gray-700">Start Area</span>
          <select
            value={userData.startArea || ""}
            onChange={(e) =>
              setUserData({ ...userData, startArea: e.target.value })
            }
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Select an area</option>
            <option value="Richmond Hill">Richmond Hill</option>
            <option value="Markham">Markham</option>
            <option value="North York">North York</option>
            <option value="Scarborough">Scarborough</option>
            <option value="Vaughan">Vaughan</option>
            <option value="Toronto">Toronto</option>
            <option value="Mississauga">Mississauga</option>
            <option value="Brampton">Brampton</option>
            <option value="Aurora">Aurora</option>
            <option value="Newmarket">Newmarket</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Transport Mode */}
        <label className="block">
          <span className="text-gray-700">Primary Transport Mode</span>
          <select
            value={userData.transportMode || ""}
            onChange={(e) =>
              setUserData({ ...userData, transportMode: e.target.value })
            }
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Select transport mode</option>
            <option value="TTC">TTC</option>
            <option value="YRT">YRT</option>
            <option value="GO Train">GO Train</option>
            <option value="GO Bus">GO Bus</option>
            <option value="Mixed">Mixed</option>
          </select>
        </label>

        {/* Profile Image URL */}
        <label className="block">
          <span className="text-gray-700">Profile Image URL</span>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={userData.profileImage || ""}
            onChange={(e) =>
              setUserData({ ...userData, profileImage: e.target.value })
            }
            className="w-full border rounded p-2 mt-1"
          />
          {userData.profileImage && (
            <img 
              src={userData.profileImage} 
              alt="Profile preview" 
              className="mt-2 w-20 h-20 rounded-full object-cover border"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </label>

        {/* Gender (Optional) */}
        <label className="block">
          <span className="text-gray-700">Gender (Optional)</span>
          <select
            value={userData.gender || ""}
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Prefer not to say</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Typical Commute Time</span>
          <select
            value={userData.commuteWindow || ""}
            onChange={(e) =>
              setUserData({ ...userData, commuteWindow: e.target.value })
            }
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Select a time window</option>
            <option value="Early Morning (5-7 AM)">Early Morning (5-7 AM)</option>
            <option value="Morning (7-9 AM)">Morning (7-9 AM)</option>
            <option value="Midday (9 AM-1 PM)">Midday (9 AM-1 PM)</option>
            <option value="Afternoon (1-4 PM)">Afternoon (1-4 PM)</option>
            <option value="Evening (4-7 PM)">Evening (4-7 PM)</option>
            <option value="Late Evening (7-10 PM)">Late Evening (7-10 PM)</option>
          </select>
        </label>

        {/* Interests */}
        <label className="block">
          <span className="text-gray-700">Interests (Optional)</span>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              placeholder="Add an interest (e.g., Sports, Music)"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (interestInput.trim() && !userData.interests.includes(interestInput.trim())) {
                    setUserData({
                      ...userData,
                      interests: [...userData.interests, interestInput.trim()]
                    });
                    setInterestInput("");
                  }
                }
              }}
              className="flex-1 border rounded p-2"
            />
            <button
              type="button"
              onClick={() => {
                if (interestInput.trim() && !userData.interests.includes(interestInput.trim())) {
                  setUserData({
                    ...userData,
                    interests: [...userData.interests, interestInput.trim()]
                  });
                  setInterestInput("");
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {userData.interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {userData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => {
                      setUserData({
                        ...userData,
                        interests: userData.interests.filter((_, i) => i !== index)
                      });
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </label>

        <button
          onClick={handleProfileSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Personal Details
        </button>
      </div>

      {/* Change Password Section */}
      <div className="p-4 border rounded bg-white shadow-sm space-y-3">
        <h3 className="text-lg font-semibold">Change Password</h3>

        {/* Current Password */}
        <label className="block">
          <span className="text-gray-700">Current Password</span>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border rounded p-2 mt-1 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>

        {/* New Password */}
        <label className="block">
          <span className="text-gray-700">New Password</span>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded p-2 mt-1 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>

        <button
          onClick={handleChangePassword}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Update Password
        </button>

        {passwordMessage && (
          <p
            className={`mt-2 text-sm font-medium ${
              passwordMessage.toLowerCase().includes("error")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {passwordMessage}
          </p>
        )}
      </div>

      {/* Preferred Routes Section */}
      <div className="p-4 border rounded bg-white shadow-sm space-y-3">
        <h2 className="text-xl font-semibold mt-6">Select Your Bus Routes</h2>
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
              message.includes("Error") ||
              message.includes("use") ||
              message.includes("must end with")
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
            } transition-opacity duration-500`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
