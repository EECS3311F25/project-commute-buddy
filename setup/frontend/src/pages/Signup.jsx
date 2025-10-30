import { useState } from "react";
import axios from "axios";

function Signup(){
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users", form);
      alert(`User created: ${res.data.name}`);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      alert("Error creating user. Reason: " + err);
      console.error();
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
        <br /><br />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
        />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;