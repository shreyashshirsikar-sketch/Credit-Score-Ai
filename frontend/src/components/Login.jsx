import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EBF4F6] flex items-center justify-center px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl shadow-xl p-10">

        <h2 className="text-3xl font-bold text-[#09637E] mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-600 mb-6">
          Login to your account
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl bg-white/60 border border-[#7AB2B2]/40 focus:outline-none focus:ring-2 focus:ring-[#088395]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/60 border border-[#7AB2B2]/40 focus:outline-none focus:ring-2 focus:ring-[#088395]"
          />

          <button className="w-full py-3 rounded-xl bg-[#088395] text-white font-semibold hover:bg-[#09637E] transition shadow-lg">
            Login
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#088395] font-semibold cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
