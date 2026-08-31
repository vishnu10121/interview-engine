import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Code2,
  FileText,
  Layers3,
  Mic,
  PanelTop,
  Sparkles,
  Target,
  Workflow,
  Wand2,
} from 'lucide-react';

const Dashboard = () => {
  const [time, setTime] = useState('');
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName') || localStorage.getItem('user') || 'Vishnu';
    const parsedUser = (() => {
      try {
        const value = localStorage.getItem('user');
        return value ? JSON.parse(value) : null;
      } catch {
        return null;
      }
    })();

    setUserName(parsedUser?.name || storedName || 'Vishnu');

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);

      if (hours < 12) setGreeting('Good Morning');
      else if (hours < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const focusMetrics = [
    { label: 'Interview readiness', value: '91%', tone: 'text-emerald-300' },
    { label: 'JD match score', value: '87%', tone: 'text-orange-300' },
    { label: 'Coding confidence', value: '84%', tone: 'text-sky-300' },
  ];

  const quickActions = [
    { label: 'Resume', path: '/resume', icon: FileText, desc: 'Upload & analyze', accent: 'from-orange-500/20 to-amber-500/10' },
    { label: 'JD Match', path: '/job', icon: BriefcaseBusiness, desc: 'Compare skills', accent: 'from-sky-500/20 to-cyan-500/10' },
    { label: 'Interview', path: '/interview', icon: Mic, desc: 'Mock practice', accent: 'from-violet-500/20 to-purple-500/10' },
    { label: 'Coding', path: '/coding', icon: Code2, desc: 'Solve problems', accent: 'from-emerald-500/20 to-teal-500/10' },
  ];

  const categoryCards = [
    { name: 'HR', icon: BriefcaseBusiness },
    { name: 'Technical', icon: Workflow },
    { name: 'DSA', icon: ChartNoAxesCombined },
    { name: 'Machine Learning', icon: BrainCircuit },
    { name: 'Data Science', icon: Layers3 },
    { name: 'Frontend', icon: PanelTop },
    { name: 'Backend', icon: Code2 },
    { name: 'Full Stack', icon: Building2 },
    { name: 'System Design', icon: Sparkles },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-white"
    >
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-400">{greeting}</p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            Welcome back, <span className="text-orange-400">{userName}</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-orange-500/20 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 shadow-[0_0_30px_rgba(249,115,22,0.08)]">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Live sync
          <span className="ml-2 font-semibold text-white">{time}</span>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.9fr]">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 90 }}
          className="relative overflow-hidden rounded-[30px] border border-orange-500/25 bg-gradient-to-br from-[#0d1220] via-[#101827] to-[#1a120c] p-6 shadow-[0_24px_70px_rgba(249,115,22,0.18)] md:p-7"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%)]" />
          <div className="absolute -right-8 top-0 h-52 w-52 rounded-full bg-orange-500/16 blur-3xl" />
          <div className="absolute -bottom-4 left-0 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-orange-200">
              <Wand2 className="h-3.5 w-3.5" />
              Product launch mode
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
                  Build your <span className="text-orange-400">edge</span>
                  <br />
                  before the interview.
                </h1>
                <p className="mt-4 max-w-lg text-base text-slate-300">
                  Smart resume feedback, role-fit analysis, interview rehearsal, and coding drills — all in one focused learning loop.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Next mission</div>
                <div className="mt-2 flex items-center gap-2 text-lg font-bold text-white">
                  <Target className="h-5 w-5 text-orange-400" />
                  Product Analyst mock
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {focusMetrics.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{item.label}</div>
                  <div className={`mt-3 text-3xl font-black ${item.tone}`}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="rounded-[30px] border border-white/10 bg-slate-950/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.35)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">Performance</p>
              <h3 className="mt-1 text-xl font-bold text-white">Focus score</h3>
            </div>
            <div className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-xs text-orange-300">+12%</div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-orange-500/20 bg-[radial-gradient(circle,_rgba(249,115,22,0.12),_rgba(15,23,42,0.0)_60%)]">
              <div className="absolute inset-3 rounded-full border-[10px] border-transparent border-t-orange-400 border-r-orange-300 border-b-orange-500 border-l-orange-200" />
              <div className="text-center">
                <div className="text-4xl font-black text-white">91</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">score</div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {[
              { label: 'Resume polish', value: '86%', bar: 'w-[86%]' },
              { label: 'Mock interviews', value: '92%', bar: 'w-[92%]' },
              { label: 'Coding speed', value: '88%', bar: 'w-[88%]' },
            ].map((row) => (
              <div key={row.label}>
                <div className="mb-1 flex items-center justify-between text-sm text-slate-300">
                  <span>{row.label}</span>
                  <span className="text-white">{row.value}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-800">
                  <div className={`h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 ${row.bar}`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Practice runway</h3>
            <Link to="/interview" className="inline-flex items-center gap-2 text-sm font-medium text-orange-300">
              Open flow
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Link to={item.path}>
                    <div className={`group overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br ${item.accent} p-[1px]`}>
                      <div className="flex h-full min-h-[190px] flex-col justify-between rounded-[22px] bg-slate-950/90 p-5">
                        <div className="flex items-start justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] uppercase tracking-[0.22em] text-slate-300">Start</span>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-white">{item.label}</div>
                          <div className="mt-1 text-sm text-slate-400">{item.desc}</div>
                        </div>
                        <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-orange-300 opacity-0 transition group-hover:opacity-100">
                          Launch
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-[30px] border border-white/10 bg-slate-950/80 p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Insight</p>
              <h3 className="mt-1 text-xl font-bold text-white">Interview map</h3>
            </div>
            <BrainCircuit className="h-5 w-5 text-orange-400" />
          </div>

          <div className="mt-6 space-y-3">
            {[
              { name: 'HR story fit', value: 'Strong', tone: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
              { name: 'Technical depth', value: 'Solid', tone: 'bg-orange-500/15 text-orange-300 border-orange-500/30' },
              { name: 'Communication', value: 'High', tone: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-3">
                <span className="text-sm text-slate-300">{item.name}</span>
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${item.tone}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-6 rounded-[30px] border border-white/10 bg-slate-950/80 p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-white">Interview tracks</h3>
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-xs text-orange-300">9 paths</span>
          </div>
          <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Curated by role</div>
        </div>

        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
          {categoryCards.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.45 + index * 0.06 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-4 transition hover:border-orange-400/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-3 text-base font-medium text-slate-200">{category.name}</div>
                <div className="mt-1 text-xs text-slate-500">Ready to practice</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;