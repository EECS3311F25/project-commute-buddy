import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CommuteRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("received");
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchRequests = async () => {
      try {
        setError("");
        const res = await fetch("http://localhost:5001/api/commute/my-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch requests");
        }

        const data = await res.json();
        setRequests(data || []);
      } catch (err) {
        console.error("Failed to fetch commute requests:", err);
        setError("Failed to load requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token, refresh, navigate]);

  const handleResponse = async (id, action) => {
    try {
      const res = await fetch("http://localhost:5000/api/commute/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId: id, action }),
      });
      const data = await res.json();

      if (!res.ok) alert(data.message || "Error responding to request");
      else {
        alert(`Request ${action}ed`);
        setRefresh((r) => !r);
      }
    } catch (err) {
      console.error("Response error:", err);
    }
  };

  const handleSendRequest = async () => {
    if (!receiver.trim()) return alert("Receiver is required");

    try {
      const res = await fetch("http://localhost:5000/api/commute/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiver, message }),
      });
      const data = await res.json();

      if (!res.ok) alert(data.message || "Error sending request");
      else {
        alert("Request sent successfully!");
        setReceiver("");
        setMessage("");
        setRefresh((r) => !r);
      }
    } catch (err) {
      console.error("Send request error:", err);
    }
  };

  const filteredRequests = requests.filter((r) =>
    activeTab === "received" ? r.type === "received" : r.type === "sent"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf8f9] flex items-center justify-center">
        <p className="text-[#945156] text-lg">Loading requests...</p>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen w-full flex-col bg-[#fbf8f9] overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-10">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 gap-6">
            <div className="flex flex-col gap-2 px-4">
              <p className="text-sm uppercase tracking-[0.2em] text-[#9a5a60] font-semibold">
                Commute Connections
              </p>
              <h2 className="text-[#1a0e0f] tracking-tight text-[32px] font-bold leading-tight">
                Manage Your Commute Requests
              </h2>
              <p className="text-[#945156] text-sm max-w-2xl">
                View requests you&apos;ve received or sent, and reach out to new commute buddies
                across the GTA. Keep your commute safe, social, and predictable.
              </p>
            </div>

            {error && (
              <div className="mx-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex gap-4 px-4">
              {["received", "sent"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-[#ce1c2b] text-white border-[#ce1c2b]"
                      : "bg-white text-[#1a0e0f] border-[#e6d1d2]"
                  }`}
                >
                  {tab === "received" ? "Received Requests" : "Sent Requests"}
                </button>
              ))}
            </div>

            <div className="px-4">
              <div className="rounded-2xl border border-[#f2e8e9] bg-white/80 backdrop-blur p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1a0e0f] mb-4">Send a new request</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#945156]">
                      Receiver email or username
                    </label>
                    <input
                      placeholder="e.g. alex@yorku.ca"
                      value={receiver}
                      onChange={(e) => setReceiver(e.target.value)}
                      className="rounded-lg border border-[#e6d1d2] bg-[#fbf8f9] px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ce1c2b]/30"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#945156]">Message</label>
                    <textarea
                      placeholder="Let them know why you make a great commute buddy!"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="rounded-lg border border-[#e6d1d2] bg-[#fbf8f9] px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ce1c2b]/30 h-full resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSendRequest}
                    className="inline-flex items-center rounded-lg bg-[#1b0e0f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2a1c1d]"
                  >
                    Send Commute Request
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 flex flex-col gap-4 pb-10">
              {filteredRequests.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#e6d1d2] bg-white/70 p-8 text-center">
                  <p className="text-[#945156] text-base font-medium">
                    No {activeTab} requests yet. Start connecting with your fellow commuters!
                  </p>
                </div>
              ) : (
                filteredRequests.map((req) => {
                  const statusColors = {
                    pending: "bg-yellow-100 text-yellow-800",
                    accepted: "bg-green-100 text-green-800",
                    declined: "bg-red-100 text-red-700",
                    expired: "bg-gray-100 text-gray-600",
                  };

                  return (
                    <div
                      key={req._id}
                      className="rounded-2xl border border-[#f2e8e9] bg-white/90 backdrop-blur p-5 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center gap-3 justify-between">
                        <div>
                          <p className="text-sm text-[#945156]">
                            {req.type === "received" ? "From" : "To"}
                          </p>
                          <p className="text-lg font-semibold text-[#1a0e0f]">
                            {req.type === "received"
                              ? req.sender?.name || req.sender?.email || "Unknown"
                              : req.receiver?.name || req.receiver?.email || "Unknown"}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            statusColors[req.status] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </div>

                      {req.message && (
                        <div className="mt-4 rounded-xl bg-[#fbf8f9] px-4 py-3 text-sm text-[#1a0e0f]">
                          {req.message}
                        </div>
                      )}

                      {activeTab === "received" && req.status === "pending" && (
                        <div className="mt-4 flex gap-3">
                          <button
                            className="flex-1 rounded-lg bg-[#1d8f5b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#187749]"
                            onClick={() => handleResponse(req._id, "accept")}
                          >
                            Accept
                          </button>
                          <button
                            className="flex-1 rounded-lg bg-[#f9735b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ea5d42]"
                            onClick={() => handleResponse(req._id, "decline")}
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommuteRequests;
