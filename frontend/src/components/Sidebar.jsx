import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BriefcaseBusiness,
  FileText,
  History,
  LogOut,
  Code2,
  Mic,
  LayoutDashboard,
  Menu,
  X,
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsOpen(false);
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/resume', icon: FileText, label: 'Resume' },
    { path: '/job', icon: BriefcaseBusiness, label: 'Job Description' },
    { path: '/interview', icon: Mic, label: 'AI Interview' },
    { path: '/coding', icon: Code2, label: 'Coding Bank' },
    { path: '/history', icon: History, label: 'History' },
  ];

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 border-b border-orange-500/20 bg-[#090d16]/95 backdrop-blur-lg lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-200 shadow-[0_12px_30px_rgba(249,115,22,0.45)]">
              <span className="absolute left-1.5 top-0 h-5 w-1 rounded-full bg-slate-950 rotate-[14deg]" />
              <span className="absolute left-1.5 bottom-0 h-5 w-1 rounded-full bg-slate-950 -rotate-[14deg]" />
              <span className="absolute right-1.5 top-0 h-5 w-1 rounded-full bg-slate-950 -rotate-[14deg]" />
              <span className="absolute right-1.5 bottom-0 h-5 w-1 rounded-full bg-slate-950 rotate-[14deg]" />
            </div>

            <div>
              <div className="text-base font-black tracking-[0.12em] text-orange-400">NEXA</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-2 text-orange-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 max-w-[85vw] transform border-r border-orange-500/20 bg-[#090d16] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex-shrink-0 border-b border-orange-500/20 p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-200 shadow-[0_12px_30px_rgba(249,115,22,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.9),_transparent_30%)]" />
                <div className="relative flex h-6 w-6 items-center justify-center">
                  <span className="absolute left-1.5 top-0 h-6 w-1 rounded-full bg-slate-950 rotate-[14deg]" />
                  <span className="absolute left-1.5 bottom-0 h-6 w-1 rounded-full bg-slate-950 -rotate-[14deg]" />
                  <span className="absolute right-1.5 top-0 h-6 w-1 rounded-full bg-slate-950 -rotate-[14deg]" />
                  <span className="absolute right-1.5 bottom-0 h-6 w-1 rounded-full bg-slate-950 rotate-[14deg]" />
                  <span className="absolute left-[10px] top-[3px] h-5 w-1 rounded-full bg-slate-950" />
                </div>
              </div>
              <div>
                <div className="text-lg font-black tracking-[0.12em] text-orange-400">NEXA</div>
                <div className="text-[10px] uppercase tracking-[0.26em] text-orange-200/70">Interview Lab</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link to={item.path} key={item.path} onClick={() => setIsOpen(false)}>
                  <div
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-slate-950 shadow-[0_14px_30px_rgba(249,115,22,0.28)]'
                        : 'text-slate-300 hover:bg-orange-500/10 hover:text-orange-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="flex-shrink-0 border-t border-orange-500/20 p-4">
            <div className="mb-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Powered by</p>
              <div className="mt-2 flex justify-center gap-2 flex-wrap">
                <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-2 py-1 text-[10px] text-orange-300">Claude</span>
                <span className="rounded-full border border-slate-700 bg-slate-800/80 px-2 py-1 text-[10px] text-slate-300">Piston</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-orange-500/40 hover:text-orange-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;