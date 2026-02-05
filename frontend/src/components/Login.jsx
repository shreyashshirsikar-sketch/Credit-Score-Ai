import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* Glass Card */}
      <div className="w-full max-w-md rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl px-10 py-10">

        <h1 className="text-2xl font-semibold text-white mb-1">
          Sign in
        </h1>
        <p className="text-sm text-white/70 mb-8">
          Access your account securely
        </p>

        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm text-white/80 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full rounded-md bg-white/15 px-4 py-2.5 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-white/80 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md bg-white/15 px-4 py-2.5 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm text-white/70">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>
            <span className="cursor-pointer hover:text-white">
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-white/70 mt-8">
          Don’t have an account?
          <span className="ml-1 text-blue-400 cursor-pointer hover:underline">
            Create one
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
