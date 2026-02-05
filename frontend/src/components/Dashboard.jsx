// src/components/Dashboard.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: "Total Received", value: "₹12,400", meta: "+8% this month", icon: "M13 10V3L4 14h7v7z" },
    { title: "Total Spent", value: "₹4,760", meta: "-3% this month", icon: "M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" },
    { title: "Current Balance", value: "₹7,640", meta: "+2% this month", icon: "M12 1v22M5 7h14" },
    { title: "Credit Score", value: "732", meta: "Good", icon: "M12 2a10 10 0 100 20 10 10 0 000-20z" },
  ];

  const transactions = [
    { id: 1, date: "2026-01-28", desc: "Payment from John", amount: "+₹2,500", status: "Received" },
    { id: 2, date: "2026-01-26", desc: "Subscription (Pro)", amount: "-₹499", status: "Paid" },
    { id: 3, date: "2026-01-21", desc: "Office Supplies", amount: "-₹1,200", status: "Paid" },
    { id: 4, date: "2026-01-11", desc: "Refund", amount: "+₹300", status: "Received" },
  ];

  return (
    <div
      className="min-h-screen bg-[linear-gradient(180deg,#F8F4EC_0%,#FFF9F9_100%)] text-[#43334C]"
      style={{ fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial" }}
    >
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`hidden md:flex flex-col w-72 p-6 gap-6 transition-all duration-300`}
          style={{
            background: "linear-gradient(180deg, rgba(232,60,145,0.06), rgba(255,143,183,0.03))",
            borderRight: "1px solid rgba(67,51,76,0.06)",
            minHeight: "100vh",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
              style={{
                background: "linear-gradient(135deg,#E83C91,#FF8FB7)",
                boxShadow: "0 8px 22px rgba(232,60,145,0.18)",
              }}
            >
              CS
            </div>
            <div>
              <div className="text-lg font-semibold">CreditScore AI</div>
              <div className="text-sm text-[#43334Caa]">Dashboard</div>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <Link to="/dashboard" className="px-3 py-2 rounded-lg text-sm bg-white/30 font-medium">Overview</Link>
            <Link to="#" className="px-3 py-2 rounded-lg text-sm hover:bg-white/20">Reports</Link>
            <Link to="#" className="px-3 py-2 rounded-lg text-sm hover:bg-white/20">Transactions</Link>
            <Link to="#" className="px-3 py-2 rounded-lg text-sm hover:bg-white/20">Settings</Link>
          </nav>

          <div className="mt-auto text-sm text-[#43334Caa]">
            <div className="mb-2">Need help?</div>
            <button
              onClick={() => navigate("/support")}
              className="px-3 py-2 rounded-lg text-sm bg-transparent border border-[#E83C91]/30 text-[#E83C91] font-medium"
            >
              Contact Support
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-h-screen">
          {/* Topbar */}
          <header className="flex items-center justify-between p-4 md:p-6 border-b border-[#43334C11] bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0.4))]">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-2 rounded-md"
                onClick={() => setSidebarOpen(s => !s)}
                aria-label="toggle sidebar"
                style={{ background: "rgba(67,51,76,0.03)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="#43334C" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>

              <div className="text-xl font-semibold">Overview</div>
              <div className="ml-4 hidden md:block text-sm text-[#43334C99]">Welcome back — here's what's happening with your account.</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  className="rounded-lg px-3 py-2 w-64 bg-white/60 border border-[#43334C11] text-sm placeholder-[#43334C66]"
                  placeholder="Search transactions, users..."
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[#43334C66]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="#43334C" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </div>

              <button title="Notifications" className="p-2 rounded-md bg-transparent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 17H9l-1 2h8l-1-2zM18 8a6 6 0 10-12 0v4l-2 3h16l-2-3V8z" stroke="#43334C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              <div className="flex items-center gap-3 bg-white/60 px-3 py-1 rounded-full border border-[#43334C11]">
                <div className="w-8 h-8 rounded-full bg-[#E83C91] flex items-center justify-center text-white font-semibold">V</div>
                <div className="text-sm">
                  <div className="font-medium">Vaishnavi</div>
                  <div className="text-xs text-[#43334C99]">pvge@edu</div>
                </div>
                <button onClick={() => navigate("/login")} className="ml-3 text-sm underline text-[#E83C91]">Logout</button>
              </div>
            </div>
          </header>

          {/* Content area */}
          <main className="p-6 md:p-8">
            {/* KPI Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((s, i) => (
                <div
                  key={s.title}
                  className="rounded-xl p-4"
                  style={{
                    background: i % 2 === 0 ? "linear-gradient(90deg, rgba(232,60,145,0.06), rgba(255,143,183,0.03))" : "linear-gradient(90deg, rgba(67,51,76,0.03), rgba(67,51,76,0.01))",
                    border: "1px solid rgba(67,51,76,0.04)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#43334Caa]">{s.title}</div>
                      <div className="text-2xl font-bold">{s.value}</div>
                      <div className="text-xs text-[#43334C99] mt-1">{s.meta}</div>
                    </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg,#E83C91,#FF8FB7)" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={s.icon} fill="white" /></svg>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Two-column layout: charts + transactions */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left - Charts (spans 2 cols on lg) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-xl p-4" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4))", border: "1px solid rgba(67,51,76,0.04)" }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-[#43334Caa]">Monthly Overview</div>
                      <div className="text-lg font-semibold">Activity & trends</div>
                    </div>
                    <div className="text-sm text-[#43334C99]">Feb 2026</div>
                  </div>

                  {/* Chart placeholder (replace with chart lib) */}
                  <div className="w-full h-48 rounded-lg bg-white/60 border border-[#43334C11] flex items-center justify-center text-[#43334C66]">
                    Chart placeholder — integrate Chart.js / Recharts here
                  </div>
                </div>

                <div className="rounded-xl p-4" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4))", border: "1px solid rgba(67,51,76,0.04)" }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-[#43334Caa]">Spending Breakdown</div>
                      <div className="text-lg font-semibold">Where your money goes</div>
                    </div>
                    <div className="text-sm text-[#43334C99]">Last 30 days</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <div className="w-full h-36 rounded-lg bg-white/60 border border-[#43334C11] flex items-center justify-center text-[#43334C66]">
                        Pie chart placeholder
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#E83C91" }} />
                          <div className="text-sm">Shopping</div>
                        </div>
                        <div className="text-sm font-medium">₹3,200</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#FF8FB7" }} />
                          <div className="text-sm">Subscriptions</div>
                        </div>
                        <div className="text-sm font-medium">₹1,240</div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#43334C" }} />
                          <div className="text-sm">Other</div>
                        </div>
                        <div className="text-sm font-medium">₹980</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Transactions */}
              <div className="rounded-xl p-4" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4))", border: "1px solid rgba(67,51,76,0.04)" }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-[#43334Caa]">Recent Activity</div>
                    <div className="text-lg font-semibold">Latest transactions</div>
                  </div>
                  <button className="text-sm text-[#E83C91]">View all</button>
                </div>

                <div className="divide-y divide-[#43334C11]">
                  {transactions.map((t) => (
                    <div key={t.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{t.desc}</div>
                        <div className="text-xs text-[#43334C99]">{t.date}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${t.amount.startsWith("+") ? "text-[#086947]" : "text-[#43334C]"}`}>{t.amount}</div>
                        <div className="text-xs text-[#43334C99]">{t.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick actions + tips */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="md:col-span-2 rounded-xl p-4" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4))", border: "1px solid rgba(67,51,76,0.04)" }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-[#43334Caa]">Insights</div>
                    <div className="text-lg font-semibold">Personalized tips</div>
                  </div>
                  <div className="text-sm text-[#43334C99]">Updated today</div>
                </div>

                <ul className="list-disc pl-5 text-sm text-[#43334C99]">
                  <li>Pay ₹499 before Feb 10 to avoid late fee.</li>
                  <li>Consider automating savings for 10% of income.</li>
                  <li>Your credit score improved by 5 points last month.</li>
                </ul>
              </div>

              <div className="rounded-xl p-4 text-sm" style={{ background: "linear-gradient(180deg, rgba(232,60,145,0.05), rgba(255,143,183,0.03))", border: "1px solid rgba(67,51,76,0.04)" }}>
                <div className="text-sm text-[#43334Caa] mb-2">Quick actions</div>
                <div className="flex flex-col gap-3">
                  <button className="py-2 rounded-md font-medium text-white" style={{ background: "linear-gradient(90deg,#E83C91,#FF8FB7)" }}>Add transaction</button>
                  <button className="py-2 rounded-md font-medium border border-[#E83C91]/30 text-[#E83C91] bg-white/60">Export CSV</button>
                  <button className="py-2 rounded-md font-medium border border-[#43334C22] text-[#43334C] bg-transparent">Settings</button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Mobile slide-over sidebar (simple) */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setSidebarOpen(false)}>
          <div className="w-64 bg-white/70 backdrop-blur-sm h-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold" style={{ background: "linear-gradient(135deg,#E83C91,#FF8FB7)" }}>CS</div>
              <div>
                <div className="font-semibold text-[#43334C]">CreditScore AI</div>
                <div className="text-xs text-[#43334Caa]">Dashboard</div>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <button className="py-2 rounded-md text-left">Overview</button>
              <button className="py-2 rounded-md text-left">Reports</button>
              <button className="py-2 rounded-md text-left">Transactions</button>
              <button className="py-2 rounded-md text-left">Settings</button>
              <button className="py-2 rounded-md text-left text-[#E83C91]" onClick={() => navigate("/support")}>Contact support</button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
