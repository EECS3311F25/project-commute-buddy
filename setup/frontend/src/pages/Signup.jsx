import { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        form
      );
      alert("✅ Signup successful!");
      console.log("Token:", res.data.token);

      //Clear form fields if successful
      setForm({ name: "", email: "", password: "" });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("⚠️ User already exists. Please log in.");
        } else if (error.response.status === 500) {
          alert("❌ Server error. Please try again later.");
        } else {
          alert("⚠️ Unexpected error occurred.");
        }
      } else {
        alert("❌ Cannot connect to server.");
      }
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
