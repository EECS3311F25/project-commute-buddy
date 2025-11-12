import { useState } from "react"

function SendRequestModal({ onClose }) {
  const [receiverId, setReceiverId] = useState("")
  const [message, setMessage] = useState("")
  const token = localStorage.getItem("token")

  const sendRequest = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/commute/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId, message }),
      })
      const data = await res.json()
      if (!res.ok) alert(data.message || "Error sending request")
      else {
        alert("Request sent!")
        onClose()
      }
    } catch (err) {
      console.error(err)
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
      }}
    >
      <div style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
        <h3>Send Commute Request</h3>
        <input
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />
        <textarea
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", height: 60, marginBottom: 10 }}
        />
        <button onClick={sendRequest}>Send</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

export default SendRequestModal
