import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen bg-[#EBF4F6] flex items-center justify-center px-4">

      {/* Card */}
      <div className="
        w-full max-w-md rounded-3xl p-8
        bg-white/80 backdrop-blur-xl
        shadow-xl border border-[#7AB2B2]/30
      ">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-[#09637E]">
          Welcome Back
        </h1>
        <p className="text-sm text-center text-gray-500 mt-2">
          Sign in to continue
        </p>

        {/* Inputs */}
        <div className="space-y-5 mt-8">

          {/* Email */}
          <div className="flex items-center gap-3 bg-[#7AB2B2]/20
            rounded-xl px-4 py-3">
            <Mail size={18} className="text-[#09637E]" />
            <input
              type="email"
              placeholder="Email Address"
              className="
                bg-transparent outline-none w-full
                text-[#09637E]
                !placeholder-gray-500"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-[#7AB2B2]/20
            rounded-xl px-4 py-3">
            <Lock size={18} className="text-[#09637E]" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="
                bg-transparent outline-none w-full
                text-[#09637E]
                !placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="text-xs text-[#09637E] font-medium"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* CTA */}
        <button className="
          w-full mt-8 py-3 rounded-xl
          bg-[#088395] text-white
          font-medium text-lg
          hover:bg-[#09637E] transition
        ">
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#7AB2B2]/40" />
          <span className="px-3 text-xs text-gray-400">
            Or sign in with
          </span>
          <div className="flex-1 h-px bg-[#7AB2B2]/40" />
        </div>

        {/* Google */}
        <button className="
          w-full py-3 rounded-xl
          border border-[#7AB2B2]/40
          text-[#09637E] font-medium
          hover:bg-[#7AB2B2]/10 transition
        ">
          Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#088395] font-medium cursor-pointer"
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}
