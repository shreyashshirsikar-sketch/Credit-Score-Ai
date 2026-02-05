import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";

    if (!form.email.trim())
      newErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";

    if (!form.password)
      newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Signup success:", form);
  };

  return (
    <div className="min-h-screen bg-[#EBF4F6] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl p-8 bg-white/80 backdrop-blur-xl shadow-xl border border-[#7AB2B2]/30">

        <h1 className="text-2xl font-semibold text-center text-[#09637E]">
          Create Account
        </h1>
        <p className="text-sm text-center text-gray-500 mt-2">
          Sign up to manage your credit score securely
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">

          {/* Full Name */}
          <div>
            <div className={`flex items-center gap-3 bg-[#7AB2B2]/20 rounded-xl px-4 py-3
              ${errors.name ? "border border-red-400" : ""}`}>
              <User size={18} className="text-[#09637E]" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-[#09637E] !placeholder-gray-500"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <div className={`flex items-center gap-3 bg-[#7AB2B2]/20 rounded-xl px-4 py-3
              ${errors.email ? "border border-red-400" : ""}`}>
              <Mail size={18} className="text-[#09637E]" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-[#09637E] !placeholder-gray-500"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
<div>
  <div className={`flex items-center gap-3 bg-[#7AB2B2]/20 rounded-xl px-4 py-3
    ${errors.password ? "border border-red-400" : ""}`}>
    <Lock size={18} className="text-[#09637E]" />
    <input
      type={showPass ? "text" : "password"}
      name="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      className="bg-transparent outline-none w-full text-[#09637E] !placeholder-gray-500"
    />
    <button
      type="button"
      onClick={() => setShowPass(!showPass)}
      className="text-xs text-[#09637E] font-medium"
    >
      {showPass ? "Hide" : "Show"}
    </button>
  </div>

  {errors.password ? (
    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
  ) : (
    <p className="text-xs text-gray-500 mt-1">
      
    </p>
  )}
</div>

          {/* Confirm Password */}
          <div>
            <div className={`flex items-center gap-3 bg-[#7AB2B2]/20 rounded-xl px-4 py-3
              ${errors.confirmPassword ? "border border-red-400" : ""}`}>
              <Lock size={18} className="text-[#09637E]" />
              <input
                type={showPass ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-[#09637E] !placeholder-gray-500"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-xl bg-[#088395] text-white font-medium text-lg hover:bg-[#09637E] transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#088395] font-medium cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
