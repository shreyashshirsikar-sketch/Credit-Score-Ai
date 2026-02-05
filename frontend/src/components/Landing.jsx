import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EBF4F6] flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold text-[#09637E]">
          CreditScore<span className="text-[#088395]">AI</span>
        </h1>

        <div className="space-x-6">
          <button
            onClick={() => navigate("/login")}
            className="text-[#09637E] font-medium hover:text-[#088395] transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-xl bg-[#088395] text-white font-medium hover:bg-[#09637E] transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl shadow-xl p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#09637E]">
            Know Your Credit Score
            <br />
            <span className="text-[#088395]">Smarter & Faster</span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            AI-powered insights to improve your financial future.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 rounded-xl bg-[#088395] text-white font-semibold hover:bg-[#09637E] transition shadow-lg"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 rounded-xl border border-[#7AB2B2] text-[#09637E] font-semibold hover:bg-white/40 transition"
            >
              Login
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-500 py-6">
        © 2026 CreditScoreAI
      </footer>

    </div>
  );
}
