// About.jsx — Premium Glass UI with Advanced Effects
import React, { useEffect } from "react";
import {
  BeakerIcon,
  ChartBarIcon,
  ServerIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  BoltIcon,
  SparklesIcon,
  CpuChipIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: BeakerIcon,
    title: "Advanced ML Models",
    description:
      "Ensemble learning with Random Forest and Gradient Boosting for 95%+ accuracy",
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconGradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: ChartBarIcon,
    title: "Real-time Analytics",
    description:
      "Interactive dashboards with comprehensive performance metrics",
    gradient: "from-emerald-500/10 to-teal-500/10",
    iconGradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: ServerIcon,
    title: "Scalable API",
    description:
      "High-performance REST API built with FastAPI and async Python",
    gradient: "from-purple-500/10 to-pink-500/10",
    iconGradient: "from-purple-500 to-pink-600",
  },
  {
    icon: ShieldCheckIcon,
    title: "Enterprise Security",
    description:
      "End-to-end encryption and privacy-preserving analysis",
    gradient: "from-amber-500/10 to-orange-500/10",
    iconGradient: "from-amber-500 to-orange-600",
  },
  {
    icon: CodeBracketIcon,
    title: "Modern Stack",
    description: "React 18 with Material-UI v5 and TypeScript support",
    gradient: "from-cyan-500/10 to-blue-500/10",
    iconGradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: BoltIcon,
    title: "High Performance",
    description: "Optimized pipelines delivering results in under 100ms",
    gradient: "from-rose-500/10 to-red-500/10",
    iconGradient: "from-rose-500 to-red-600",
  },
];

const techStack = [
  { 
    category: "Frontend", 
    items: "React 18, Material-UI, Recharts, Axios, Vite",
    icon: CodeBracketIcon,
    gradient: "from-blue-500/20 to-indigo-500/20"
  },
  { 
    category: "Backend", 
    items: "FastAPI, Python 3.11, Uvicorn, Pydantic",
    icon: ServerIcon,
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  { 
    category: "Machine Learning", 
    items: "Scikit-learn, XGBoost, Pandas, NumPy",
    icon: CpuChipIcon,
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  { 
    category: "Infrastructure", 
    items: "Docker, Git, ESLint, Prettier",
    icon: CloudIcon,
    gradient: "from-amber-500/20 to-orange-500/20"
  },
];

const stats = [
  { label: "Accuracy", value: "95%+", icon: ChartBarIcon },
  { label: "Response Time", value: "<100ms", icon: BoltIcon },
  { label: "API Calls", value: "1M+", icon: CloudIcon },
  { label: "Active Users", value: "10K+", icon: ShieldCheckIcon },
];

// Enhanced scroll reveal with stagger effect
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, index * 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

export default function About() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80 py-20 px-6 relative overflow-hidden">
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float" />
      </div>

      {/* Header with glass effect */}
      <header className="relative max-w-4xl mx-auto text-center mb-20">
        
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Intelligent Credit
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Assessment Platform
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Harnessing the power of machine learning to deliver accurate, transparent, 
          and explainable credit scoring solutions for modern financial institutions.
        </p>
      </header>

      {/* Stats Section */}
      <section className="relative max-w-6xl mx-auto mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="reveal opacity-0 translate-y-8 group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <IconComponent className="w-8 h-8 text-blue-600 mb-3" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Core Features
          </span>
        </h2>
        <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto">
          Everything you need to make data-driven credit decisions with confidence
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => {
            const IconComponent = f.icon;
            return (
              <div
                key={idx}
                className="reveal opacity-0 translate-y-8 group relative"
              >
                {/* Glass card background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
                
                {/* Main card */}
                <div className="relative h-full bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  
                  {/* Icon with gradient */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${f.iconGradient} rounded-bl-2xl rounded-tr-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  <div className={`flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${f.iconGradient} bg-opacity-10`}>
                    <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {f.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed">
                    {f.description}
                  </p>

                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Technology Stack
          </span>
        </h2>
        <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto">
          Built with modern, battle-tested technologies
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((t, i) => {
            const IconComponent = t.icon;
            return (
              <div
                key={i}
                className="reveal opacity-0 translate-y-8 group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
                
                <div className="relative h-full bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${t.gradient}`}>
                      <IconComponent className="w-5 h-5 text-slate-700" />
                    </div>
                    <h4 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {t.category}
                    </h4>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t.items}
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute bottom-3 right-3 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <IconComponent className="w-full h-full text-slate-700" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      

      {/* Enhanced animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-50%, -55%) rotate(180deg); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 8s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .reveal {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          transform: translateY(30px);
        }
        
        .reveal.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}