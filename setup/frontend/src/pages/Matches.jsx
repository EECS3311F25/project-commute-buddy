// src/pages/Matches.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MatchCard from "../components/common/MatchCard.jsx";
import FilterBar from "../components/common/FilterBar.jsx";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchMatches();
  }, [token, navigate]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("http://localhost:5001/api/commute/matches", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.userHasRoutes === false) {
        setError("noRoutes");
      } else {
        setMatches(res.data.matches || []);
      }
    } catch (err) {
      console.error("Error fetching matches:", err);
      setError(err.response?.data?.message || "Failed to load matches");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="relative flex h-auto min-h-screen w-full flex-col bg-[#fbf8f9] overflow-x-hidden"
        style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
      >
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex items-center justify-center py-20">
              <p className="text-[#945156] text-lg">Loading matches...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error === "noRoutes") {
    return (
      <div
        className="relative flex h-auto min-h-screen w-full flex-col bg-[#fbf8f9] overflow-x-hidden"
        style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
      >
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-[#1a0e0f] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Find Your Commute Buddies
            </h2>
            <div className="p-4">
              <div className="bg-white rounded-lg border border-[#e6d1d2] p-8 text-center">
                <p className="text-[#1a0e0f] text-lg mb-4">
                  Add routes in your profile to find matches!
                </p>
                <button
                  onClick={() => navigate("/profile")}
                  className="px-6 py-2 bg-[#ce1c2b] text-white rounded-lg hover:bg-[#b31825] transition-colors"
                >
                  Go to Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="relative flex h-auto min-h-screen w-full flex-col bg-[#fbf8f9] overflow-x-hidden"
        style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
      >
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-[#1a0e0f] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Find Your Commute Buddies
            </h2>
            <div className="p-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchMatches}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-[#fbf8f9] overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-[#1a0e0f] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
              Find Your Commute Buddies
            </h2>
            
            {/* Filter Bar */}
            <FilterBar />

            {/* Matches List */}
            {matches.length === 0 ? (
              <div className="p-4">
                <div className="bg-white rounded-lg border border-[#e6d1d2] p-8 text-center">
                  <p className="text-[#945156] text-lg">
                    No matches found. Try adjusting your filters or add more routes in your profile.
                  </p>
                </div>
              </div>
            ) : (
              matches.map((match) => (
                <MatchCard key={match.userId} match={match} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matches;

