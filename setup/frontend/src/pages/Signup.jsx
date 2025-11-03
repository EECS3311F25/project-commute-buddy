import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setError({ email: "", password: "" });

    // Validate email domain
    const emailLower = form.email.toLowerCase();
    if (
      !emailLower.endsWith("@yorku.ca") &&
      !emailLower.endsWith("@my.yorku.ca")
    ) {
      setError({
        ...error,
        email: "Email must end with @yorku.ca or @my.yorku.ca",
      });
      setForm({ ...form, email: "" });
      return;
    }

    // Validate password match
    if (form.password !== form.confirmPassword) {
      setError({ ...error, password: "Passwords do not match" });
      setForm({ ...form, password: "", confirmPassword: "" });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        form
      );
      alert("✅ Signup successful!");
      console.log("Token:", res.data.token);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
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

  const heroMainUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEQUcuTBGSPHgAWyM6TZmHI5LDo0iTX_220OcBJllFsLHSuyoz4TrP-C3lFlJkC1TZLOSxHZfCdcjz2IPsGTs2zlRnin6CHzxy2sOk5-r20dfIN4UZ-rYboIDsD7_rrLrCzCg6uK88NSJFccqv5Aj4hJtEu12FipUR1cG1e0tsXx_J3v9mzxPAfGm1P_zHVczkURN3pwXcfwKCpNpR6jPt6-2pJomPQd3UXn_SQHHE-P8ouUkDhzQCqy-cEvD6hUu-bBCf2g_zf-M";

  return (
    <div
      className="min-h-screen w-full bg-[#fbf8f9] flex flex-col items-center"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      {/* Main hero with overlay title */}
      <div className="w-full max-w-[960px] px-4 pt-4">
        <div
          className="rounded-lg bg-center bg-cover pt-[120px]"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%), url("${heroMainUrl}")`,
          }}
        >
          <div className="p-4">
            <h1 className="text-white text-2xl font-bold">
              Create your account
            </h1>
            <p className="text-white/95 text-base">
              Join Commute Buddy and connect with fellow YorkU commuters.
            </p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="w-full max-w-[520px] px-4 py-6">
        <div className="rounded-lg border border-[#e6d1d2] bg-white/70 backdrop-blur p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <label className="block">
              <span className="text-[#955056] text-sm font-medium">Name</span>
              <div className="mt-1 flex items-stretch rounded-lg">
                <input
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input w-full rounded-lg h-12 border border-[#e6d1d2] bg-[#fbf8f9] text-[#1b0e0f] placeholder:text-[#955056] focus:ring-0 focus:border-[#e6d1d2] px-3"
                />
              </div>
            </label>

            {/* Email */}
            <label className="block">
              <span className="text-[#955056] text-sm font-medium">Email</span>
              <div className="mt-1 flex items-stretch rounded-lg">
                <input
                  name="email"
                  type="email"
                  placeholder="you@yorku.ca"
                  autoComplete="username"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`form-input w-full rounded-lg h-12 border ${
                    error.email ? "border-red-500" : "border-[#e6d1d2]"
                  } bg-[#fbf8f9] text-[#1b0e0f] placeholder:text-[#955056] focus:ring-0 px-3`}
                />
              </div>
              {error.email && (
                <p className="text-red-500 text-sm mt-1">{error.email}</p>
              )}
            </label>

            {/* Password */}
            <label className="block">
              <span className="text-[#955056] text-sm font-medium">
                Password
              </span>
              <div className="mt-1 flex items-stretch rounded-lg">
                <input
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className={`form-input w-full rounded-lg h-12 border ${
                    error.password ? "border-red-500" : "border-[#e6d1d2]"
                  } bg-[#fbf8f9] text-[#1b0e0f] placeholder:text-[#955056] focus:ring-0 px-3`}
                />
              </div>
            </label>

            {/* Confirm Password */}
            <label className="block">
              <span className="text-[#955056] text-sm font-medium">
                Confirm Password
              </span>
              <div className="mt-1 flex items-stretch rounded-lg">
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                  className={`form-input w-full rounded-lg h-12 border ${
                    error.password ? "border-red-500" : "border-[#e6d1d2]"
                  } bg-[#fbf8f9] text-[#1b0e0f] placeholder:text-[#955056] focus:ring-0 px-3`}
                />
              </div>
              {error.password && (
                <p className="text-red-500 text-sm mt-1">{error.password}</p>
              )}
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-[#ce1c2b] text-[#fbf8f9] font-bold tracking-wide"
            >
              Create account
            </button>
          </form>

          {/* Footnote */}
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer text-[#955056] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
          >
            <p className="text-center text-sm text-[#955056] mt-3">
              Already have an account? <span className="underline">Log in</span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
