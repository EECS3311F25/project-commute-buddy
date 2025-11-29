// src/pages/Matches.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MatchCard from "../components/common/MatchCard.jsx";
import FilterBar from "../components/common/FilterBar.jsx";

const START_AREA_OPTIONS = [
  "Richmond Hill",
  "Markham",
  "North York",
  "Scarborough",
  "Vaughan",
  "Toronto",
  "Mississauga",
  "Brampton",
  "Aurora",
  "Newmarket",
  "Other",
];

const defaultFilters = {
  route: "",
  startArea: "",
  commuteWindow: "",
  minPercentage: 0,
};

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [routes, setRoutes] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchAvailableRoutes = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/users/routes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoutes(res.data || []);
    } catch (err) {
      console.error("Error fetching routes:", err);
    }
  };

  const fetchMatches = async (filtersToUse = appliedFilters) => {
    try {
      setLoading(true);
      setError("");
      const params = new URLSearchParams();
      if (filtersToUse.route) params.append("route", filtersToUse.route);
      if (filtersToUse.startArea) params.append("startArea", filtersToUse.startArea);
      if (filtersToUse.commuteWindow)
        params.append("commuteWindow", filtersToUse.commuteWindow);
      if (filtersToUse.minPercentage && Number(filtersToUse.minPercentage) > 0) {
        params.append("minPercentage", filtersToUse.minPercentage);
      }

      const query = params.toString();
      const endpoint = query
        ? `http://localhost:5001/api/commute/matches?${query}`
        : "http://localhost:5001/api/commute/matches";

      const res = await axios.get(endpoint, {
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

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    fetchAvailableRoutes();
    fetchMatches(defaultFilters);
    //Just to stop the linter from complaining :(
    // eslint-disable-next-line
  }, [token, navigate]);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    fetchMatches(filters);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    fetchMatches(defaultFilters);
  };

  const activeFilterSummaries = useMemo(() => {
    const chips = [];
    if (appliedFilters.route) chips.push(`Route: ${appliedFilters.route}`);
    if (appliedFilters.startArea) chips.push(`Area: ${appliedFilters.startArea}`);
    if (appliedFilters.commuteWindow) chips.push(`Time: ${appliedFilters.commuteWindow}`);
    if (appliedFilters.minPercentage && appliedFilters.minPercentage > 0) {
      chips.push(`≥ ${appliedFilters.minPercentage}% match`);
    }
    return chips;
  }, [appliedFilters]);

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
            <p className="px-4 text-[#945156] text-sm font-medium mb-2">
              Filter by route, start area, and commute time to see the most relevant matches.
            </p>
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
                  onClick={() => fetchMatches(appliedFilters)}
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

          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
            routes={routes}
            startAreas={START_AREA_OPTIONS}
          />

          {activeFilterSummaries.length > 0 && (
            <div className="px-4 flex flex-wrap gap-2 pb-2">
              {activeFilterSummaries.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-[#f2e8e9] text-[#1a0e0f] text-xs font-medium px-3 py-1"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

            {/* Matches List */}
            {matches.length === 0 ? (
              <div className="p-4">
                <div className="bg-white rounded-lg border border-[#e6d1d2] p-8 text-center">
                  <p className="text-[#945156] text-lg">
                    No matches for the selected route, time, or area. Try widening your filters or add
                    more routes in your profile.
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
