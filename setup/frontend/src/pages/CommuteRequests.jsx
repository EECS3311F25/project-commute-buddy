import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function CommuteRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [receiver, setReceiver] = useState("")
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState("received") // received | sent
  const [refresh, setRefresh] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  // Fetch commute requests
  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }

    const fetchRequests = async () => {
      try {
        setError("")
        const res = await fetch("http://localhost:5001/api/commute/my-requests", {
          headers: { Authorization: `Bearer ${token}` },
        })
        
        if (!res.ok) {
          if (res.status === 401) {
            navigate("/login")
            return
          }
          throw new Error("Failed to fetch requests")
        }
        
        const data = await res.json()
        setRequests(data || [])
      } catch (err) {
        console.error("Failed to fetch commute requests:", err)
        setError("Failed to load requests. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [token, refresh, navigate])

  // Handle Accept / Decline
  const handleResponse = async (id, action) => {
    try {
      const res = await fetch("http://localhost:5001/api/commute/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId: id, action }),
      })
      const data = await res.json()

      if (!res.ok) alert(data.message || "Error responding to request")
      else {
        alert(`Request ${action}ed`)
        setRefresh((r) => !r)
      }
    } catch (err) {
      console.error("Response error:", err)
    }
  }

  // Handle Send Request
  const handleSendRequest = async () => {
    if (!receiver.trim()) return alert("Receiver is required")
    try {
      const res = await fetch("http://localhost:5001/api/commute/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiver, message }),
      })
      const data = await res.json()

      if (!res.ok) alert(data.message || "Error sending request")
      else {
        alert("Request sent successfully!")
        setReceiver("")
        setMessage("")
        setRefresh((r) => !r)
      }
    } catch (err) {
      console.error("Send request error:", err)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 20, maxWidth: 600, margin: "auto", textAlign: "center" }}>
        <p>Loading requests...</p>
      </div>
    )
  }

  const filteredRequests = requests.filter((r) =>
    activeTab === "received" ? r.type === "received" : r.type === "sent"
  )

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Commute Requests</h2>
      
      {error && (
        <div style={{ 
          padding: 12, 
          marginBottom: 20, 
          background: "#fee", 
          border: "1px solid #fcc", 
          borderRadius: 8,
          color: "#c00"
        }}>
          {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: 20 }}>
        {["received", "sent"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: 10,
              background: activeTab === tab ? "#007bff" : "#f0f0f0",
              color: activeTab === tab ? "white" : "black",
              border: "none",
              borderRadius: tab === "received" ? "8px 0 0 8px" : "0 8px 8px 0",
              cursor: "pointer",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Send Request */}
      <div style={{ marginBottom: 30, padding: 15, border: "1px solid #ccc", borderRadius: 8 }}>
        <h4>Send a new commute request</h4>
        <input
          placeholder="Receiver email or username"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          style={{
            display: "block",
            marginBottom: 10,
            padding: 8,
            width: "100%",
          }}
        />
        <textarea
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            height: 60,
            marginBottom: 10,
            padding: 8,
          }}
        />
        <button onClick={handleSendRequest}>Send Request</button>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <p>No {activeTab} requests yet</p>
      ) : (
        filteredRequests.map((req) => (
          <div
            key={req._id}
            style={{
              border: "1px solid gray",
              margin: "10px 0",
              padding: 10,
              borderRadius: 8,
              background:
                req.status === "pending"
                  ? "#fff"
                  : req.status === "accepted"
                  ? "#d4f8d4"
                  : "#f8d4d4",
            }}
          >
            <p><strong>From:</strong> {req.sender?.name || req.sender?.email || "Unknown"}</p>
            <p><strong>To:</strong> {req.receiver?.name || req.receiver?.email || "Unknown"}</p>
            <p><strong>Status:</strong> {req.status}</p>
            <p><strong>Message:</strong> {req.message}</p>

            {activeTab === "received" && req.status === "pending" && (
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  style={{ background: "#4CAF50", color: "white", border: "none", padding: "5px 10px" }}
                  onClick={() => handleResponse(req._id, "accept")}
                >
                  Accept
                </button>
                <button
                  style={{ background: "#f44336", color: "white", border: "none", padding: "5px 10px" }}
                  onClick={() => handleResponse(req._id, "decline")}
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default CommuteRequests
