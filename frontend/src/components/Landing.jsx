import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EBF4F6]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold text-[#09637E]">
          CreditScore<span className="text-[#088395]">AI</span>
        </h1>

        <div className="space-x-6">
          <button
            onClick={() => navigate("/login")}
            className="text-[#09637E] font-medium"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-xl bg-[#088395] text-white font-medium hover:bg-[#09637E] transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 mt-20">
        <div className="glass-card glass-float rounded-3xl max-w-3xl p-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#09637E] leading-tight">
            Check Your <br />
            <span className="text-[#088395]">Loan Eligibility</span> Instantly
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            AI-powered analysis based on your salary and financial profile to
            help you get loan approvals faster.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-24 px-8">
        <h3 className="text-3xl font-bold text-center text-[#09637E] mb-12">
          Why Choose CreditScoreAI?
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Salary-Based Analysis",
              desc: "Loan eligibility calculated using income and expenses."
            },
            {
              title: "Secure & Private",
              desc: "Your financial data is protected with bank-level security."
            },
            {
              title: "Instant Decision",
              desc: "Get approval probability in seconds using AI models."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="glass-card glass-float rounded-2xl p-6 transition hover:scale-[1.03]"
            >
              <h4 className="text-xl font-semibold text-[#088395] mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-28 pb-20 text-center px-6">
        <div className="glass-card glass-float max-w-4xl mx-auto rounded-3xl p-10">
          <h3 className="text-3xl font-bold text-[#09637E]">
            Ready to Apply for a Loan?
          </h3>

          <p className="mt-4 text-gray-700">
            Create an account and know your approval chances before applying.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-6 px-10 py-3 rounded-xl bg-[#088395] text-white font-semibold hover:bg-[#09637E] transition shadow-lg"
          >
            Get Started Free
          </button>
        </div>
      </section>

    </div>
  );
}
