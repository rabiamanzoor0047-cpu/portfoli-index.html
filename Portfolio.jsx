import { useState, useEffect, useMemo } from "react";
import {
  Sparkles, Menu, X, Mail, Github, Linkedin, Check, Layers, Palette,
  Smartphone, ExternalLink, Send, Rocket,
} from "lucide-react";

/* ---------- Data ---------- */
const NAV = ["Home", "About", "Skills", "Projects", "Contact"];
const ROLES = ["Frontend Developer", "React Developer"];
const STATS = [
  ["5+", "Projects Built"],
  ["4+", "Technologies"],
  ["1+", "Developer"],
  ["∞", "Ideas to Build"],
];
const SERVICES = [
  { icon: Layers, title: "Frontend Development", text: "Building responsive websites using HTML, CSS, JavaScript, and React." },
  { icon: Palette, title: "Modern UI Design", text: "Creating clean, modern, and attractive interfaces with a focus on user experience." },
  { icon: Smartphone, title: "Responsive Websites", text: "Making websites look good and work smoothly on mobile, tablet, and desktop." },
];
const MISSION = ["Learn React", "Build Projects", "Improve UI", "Keep Learning"];
const PROJECTS = [
  { name: "SOLE – Shoes E-commerce", text: "Modern shoe shopping website.", grad: "from-purple-600 to-pink-500" },
  { name: "Handmade Bracelets", text: "Stylish bracelet website with simple and elegant UI.", grad: "from-violet-600 to-cyan-400" },
  { name: "EduPulse – Study Tracker", text: "Study tracker designed to help students organize learning.", grad: "from-fuchsia-500 to-violet-600" },
];
const TECH = ["React", "CSS", "JavaScript"];
const SKILLS = [
  ["HTML", 90, "Advanced"], ["CSS", 85, "Advanced"], ["JavaScript", 70, "Intermediate"],
  ["React", 70, "Intermediate"], ["React Router", 65, "Intermediate"], ["Git & GitHub", 65, "Intermediate"],
];

/* ---------- Shared bits ---------- */
const glass = "bg-white/[0.04] backdrop-blur-md border border-purple-500/20 rounded-2xl";
const btnBase =
  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95";
const btnPrimary = `${btnBase} bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.85)]`;
const btnGhost = `${btnBase} bg-white/5 backdrop-blur-md border border-purple-500/40 text-white hover:bg-purple-500/20 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]`;

const Eyebrow = ({ children }) => (
  <p className="text-sm tracking-widest text-purple-400 mb-3">✦ {children} ✦</p>
);

const Title = ({ eyebrow, children }) => (
  <div className="text-center mb-14">
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="text-3xl md:text-5xl font-bold text-white">{children}</h2>
  </div>
);

const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

/* ---------- Background stars ---------- */
function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
      })),
    []
  );
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
    </div>
  );
}

/* ---------- Planet SVG ---------- */
function Planet() {
  return (
    <div className="relative animate-float">
      <svg viewBox="0 0 400 400" className="w-72 sm:w-96 mx-auto drop-shadow-[0_0_60px_rgba(139,92,246,0.7)]">
        <defs>
          <radialGradient id="pl" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#F0ABFC" />
            <stop offset="40%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#2E1065" />
          </radialGradient>
          <linearGradient id="ring" x1="0" x2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0.2" />
          </linearGradient>
          <clipPath id="front"><rect x="0" y="200" width="400" height="200" /></clipPath>
        </defs>
        <ellipse cx="200" cy="200" rx="185" ry="48" fill="none" stroke="url(#ring)" strokeWidth="8" transform="rotate(-18 200 200)" opacity="0.7" />
        <circle cx="200" cy="200" r="110" fill="url(#pl)" />
        <path d="M110 170 Q200 140 290 175" stroke="#fff" strokeOpacity="0.12" strokeWidth="10" fill="none" />
        <path d="M95 215 Q200 190 305 225" stroke="#fff" strokeOpacity="0.1" strokeWidth="8" fill="none" />
        <circle cx="160" cy="160" r="14" fill="#000" opacity="0.15" />
        <circle cx="240" cy="240" r="10" fill="#000" opacity="0.15" />
        <g clipPath="url(#front)">
          <ellipse cx="200" cy="200" rx="185" ry="48" fill="none" stroke="url(#ring)" strokeWidth="8" transform="rotate(-18 200 200)" />
        </g>
        <circle cx="52" cy="90" r="10" fill="#F472B6" opacity="0.9" />
        <circle cx="350" cy="70" r="6" fill="#22D3EE" />
      </svg>
    </div>
  );
}

/* ---------- Skill ring ---------- */
function SkillRing({ name, pct, level }) {
  const r = 52, c = 2 * Math.PI * r;
  return (
    <div className={`${glass} p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]`}>
      <div className="relative w-32 h-32 mx-auto">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle cx="60" cy="60" r={r} fill="none" stroke="url(#sk)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
          <defs>
            <linearGradient id="sk" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#A855F7" /><stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">{pct}%</span>
      </div>
      <h3 className="mt-4 font-semibold text-white">{name}</h3>
      <p className="text-sm text-gray-400">{level}</p>
    </div>
  );
}

/* ---------- Main ---------- */
export default function Portfolio() {
  const [open, setOpen] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2500);
    return () => clearInterval(t);
  }, []);

  const go = (id) => { setOpen(false); scrollTo(id); };
  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3500);
  };
  const input = "w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-purple-400 focus:shadow-[0_0_15px_rgba(168,85,247,0.4)]";

  return (
    <div className="relative min-h-screen text-gray-400 bg-black scroll-smooth">
      <style>{`
        @keyframes twinkle{0%,100%{opacity:.2}50%{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes fadeSwap{0%{opacity:0;transform:translateY(10px)}15%,85%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-10px)}}
        .animate-twinkle{animation:twinkle 3s ease-in-out infinite}
        .animate-float{animation:float 6s ease-in-out infinite}
        .animate-swap{animation:fadeSwap 2.5s ease-in-out}
        @media (prefers-reduced-motion:reduce){.animate-twinkle,.animate-float,.animate-swap{animation:none}}
      `}</style>
      <Stars />

      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-lg border-b border-purple-500/20">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => go("home")} className="flex items-center gap-2 text-xl font-bold text-white tracking-widest">
            RABIA <Sparkles className="w-5 h-5 text-purple-400 drop-shadow-[0_0_8px_#A855F7]" />
          </button>
          <ul className="hidden md:flex gap-8">
            {NAV.map((n) => (
              <li key={n}>
                <button onClick={() => go(n)} className="hover:text-purple-400 hover:drop-shadow-[0_0_8px_#A855F7] transition">{n}</button>
              </li>
            ))}
          </ul>
          <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <ul className="md:hidden px-6 pb-4 space-y-1 bg-black/95">
            {NAV.map((n) => (
              <li key={n}><button onClick={() => go(n)} className="w-full text-left py-2 hover:text-purple-400">{n}</button></li>
            ))}
          </ul>
        )}
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section id="home" className="min-h-screen pt-28 pb-16 px-6 flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className={`${glass} inline-block px-4 py-1.5 text-sm text-purple-300 mb-6`}>✦ Welcome to my universe ✦</span>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
                  Hi, I'm <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">Rabia Manzoor</span>
                </h1>
                <p key={roleIdx} className="animate-swap mt-3 text-2xl sm:text-3xl font-semibold text-violet-400 drop-shadow-[0_0_12px_rgba(139,92,246,0.7)]">
                  {ROLES[roleIdx]}
                </p>
                <p className="mt-6 max-w-lg text-lg">I create modern, responsive and interactive websites with React, JavaScript and CSS.</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button onClick={() => go("projects")} className={btnPrimary}><Rocket className="w-4 h-4" />View My Projects</button>
                  <button onClick={() => go("contact")} className={btnGhost}>Contact Me</button>
                </div>
              </div>
              <Planet />
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map(([n, l]) => (
                <div key={l} className={`${glass} py-6 text-center transition hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]`}>
                  <div className="text-3xl font-bold text-white">{n}</div>
                  <div className="text-sm mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What I do */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Title eyebrow="What I do">I Build Web Experiences</Title>
            <div className="grid md:grid-cols-3 gap-6">
              {SERVICES.map(({ icon: Icon, title, text }) => (
                <div key={title} className={`${glass} p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(168,85,247,0.35)]`}>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Eyebrow>About me</Eyebrow>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Learning. Building. Growing.</h2>
              <p className="mt-6 text-lg">
                I'm Rabia Manzoor, a web developer who started with HTML and CSS and fell in love with building things for the browser.
                Today I'm learning React and turning what I learn into real-world projects — from e-commerce stores to study tools.
                Every project teaches me something new about clean code and thoughtful design.
              </p>
            </div>
            <div className={`${glass} p-8 shadow-[0_0_40px_rgba(139,92,246,0.2)]`}>
              <h3 className="text-xl font-semibold text-white mb-5">Current Mission</h3>
              <ul className="space-y-4">
                {MISSION.map((m) => (
                  <li key={m} className="flex items-center gap-3 text-white">
                    <span className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                      <Check className="w-4 h-4 text-purple-300" />
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Title>My Projects</Title>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((p) => (
                <article key={p.name} className={`${glass} overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]`}>
                  <div className={`h-40 bg-gradient-to-br ${p.grad} opacity-80 flex items-center justify-center`}>
                    <Sparkles className="w-12 h-12 text-white/80" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                    <p className="mt-2 flex-1">{p.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {TECH.map((t) => (
                        <span key={t} className="text-xs px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">{t}</span>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-3">
                      <a href="#" className={`${btnPrimary} !px-4 !py-2 text-sm flex-1`}><ExternalLink className="w-4 h-4" />Live Demo</a>
                      <a href="#" className={`${btnGhost} !px-4 !py-2 text-sm flex-1`}><Github className="w-4 h-4" />GitHub</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Title>My Skills</Title>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {SKILLS.map(([n, p, l]) => <SkillRing key={n} name={n} pct={p} level={l} />)}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Title eyebrow="Contact">Let's build something amazing</Title>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  [Mail, "Email", "mailto:rabia@example.com"],
                  [Github, "GitHub", "https://github.com/"],
                  [Linkedin, "LinkedIn", "https://linkedin.com/"],
                ].map(([Icon, label, href]) => (
                  <a key={label} href={href} className={`${glass} flex items-center gap-4 p-5 text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]`}>
                    <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="font-semibold">{label}</span>
                  </a>
                ))}
              </div>
              <div className={`${glass} p-8 space-y-4`}>
                <input className={input} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className={input} type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <textarea className={input} rows={5} placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <button onClick={submit} className={`${btnPrimary} w-full`}><Send className="w-4 h-4" />Send Message</button>
                {sent && <p className="text-center text-cyan-300 text-sm">Message sent. Thanks for reaching out!</p>}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/20 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <span className="font-bold text-white tracking-widest">RABIA MANZOOR ✦</span>
          <span>Building my skills, one project at a time</span>
          <div className="flex gap-4">
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-purple-400 hover:scale-125 transition"><Icon className="w-5 h-5" /></a>
            ))}
          </div>
          <span>© {new Date().getFullYear()} Rabia Manzoor</span>
        </div>
      </footer>
    </div>
  );
}
