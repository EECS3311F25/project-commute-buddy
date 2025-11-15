import { useState, useEffect } from "react"

function SendRequestModal({ onClose, receiver }) {
  const [receiverInput, setReceiverInput] = useState(receiver || "")
  const [message, setMessage] = useState("")
  const token = localStorage.getItem("token")

  // Pre-fill receiver if provided
  useEffect(() => {
    if (receiver) {
      setReceiverInput(receiver);
    }
  }, [receiver]);

  const sendRequest = async () => {
    if (!receiverInput.trim()) {
      alert("Please enter a receiver name or email");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/commute/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiver: receiverInput.trim(), message }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.message || "Error sending request")
      } else {
        alert("Request sent successfully!")
        onClose()
      }
    } catch (err) {
      console.error(err)
      alert("Error sending request. Please try again.")
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div 
        style={{ 
          background: "#fff", 
          padding: 24, 
          borderRadius: 12,
          minWidth: 400,
          maxWidth: 500,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: 16, fontSize: 18, fontWeight: "bold" }}>
          Send Commute Request
        </h3>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: 500 }}>
            To (Name or Email)
          </label>
          <input
            placeholder="Receiver name or email"
            value={receiverInput}
            onChange={(e) => setReceiverInput(e.target.value)}
            disabled={!!receiver} // Disable if pre-filled from match
            style={{ 
              display: "block", 
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: 6,
              fontSize: 14,
            }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: 500 }}>
            Message (Optional)
          </label>
          <textarea
            placeholder="Add a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ 
              width: "100%", 
              height: 80, 
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: 6,
              fontSize: 14,
              resize: "vertical",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button 
            onClick={onClose}
            style={{
              padding: "8px 16px",
              background: "#f2e8e9",
              color: "#1a0e0f",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Cancel
          </button>
          <button 
            onClick={sendRequest}
            style={{
              padding: "8px 16px",
              background: "#ce1c2b",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  )
}

export default SendRequestModal
