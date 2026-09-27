import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Boxes, ChevronLeft, ChevronRight, Factory, LogOut, Menu, ShieldCheck, Users, X } from 'lucide-react';
// import { useAuth } from '../context/AuthContext.jsx';
import {useAuth} from "../../hooks/useAuth.js";

const navItems = [
  { to: '/staff', label: 'Catalogue', icon: Boxes, description: 'Products & machines', roles: ['admin', 'staff'] },
  { to: '/admin/control', label: 'Admin Controls', icon: ShieldCheck, description: 'Administrators', roles: ['admin'] },
];

export default function AdminLayout({ children }) {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);


  // const user = {
  //   name: "tushar",
  //   role: "admin",
  // }

  const visibleItems = navItems.filter((item) => item.roles.includes(user?.role));

  const signOut = async (e) => {
    e.preventDefault();
    handleLogout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="staff-shell min-h-screen bg-slate-950 text-white">
      <div className="staff-bg-grid pointer-events-none fixed inset-0 opacity-20" />
      <div className="staff-bg-glow pointer-events-none fixed -left-40 top-1/4 h-96 w-96 rounded-full bg-jet-500/10 blur-[120px]" />
      <div className="staff-bg-glow pointer-events-none fixed -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-jet-400/5 blur-[140px]" />

      <aside className={`staff-sidebar fixed inset-y-0 left-0 z-50 hidden border-r border-white/10 bg-slate-950/90 backdrop-blur-2xl transition-all duration-300 lg:flex ${collapsed ? 'w-[88px]' : 'w-[270px]'}`}>
        <div className="flex w-full flex-col">
          <div className="flex h-20 items-center border-b border-white/10 px-5">
            <Link to="/staff" className="group flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jet-500 shadow-green transition group-hover:rotate-3 group-hover:scale-105">
                <Factory size={20} />
              </div>
              {!collapsed && <div className="min-w-0"><p className="font-display text-lg font-extrabold tracking-tight">PRIME</p><p className="text-[8px] font-bold uppercase tracking-[0.3em] text-jet-300">Machines / Control</p></div>}
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-6">
            {!collapsed && <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-600">Workspace</p>}
            {visibleItems.map(({ to, label, icon: Icon, description }) => (
              <NavLink key={to} to={to} title={collapsed ? label : undefined} className={({ isActive }) => `staff-nav-item group ${isActive ? 'is-active' : ''}`}>
                <span className="staff-nav-icon"><Icon size={18} /></span>
                {!collapsed && <span className="min-w-0"><span className="block text-sm font-bold">{label}</span><span className="mt-0.5 block truncate text-[10px] text-slate-600 group-[.is-active]:text-jet-300/70">{description}</span></span>}
              </NavLink>
            ))}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className={`mb-3 flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-3 ${collapsed ? 'justify-center' : ''}`}>
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-jet-300 to-jet-700 text-xs font-extrabold text-slate-950">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
              {!collapsed && <div className="min-w-0"><p className="truncate text-xs font-bold text-white">{user?.name || 'User'}</p><p className="mt-0.5 flex items-center gap-1 text-[9px] uppercase tracking-widest text-jet-400"><ShieldCheck size={10} />{user?.role || 'staff'}</p></div>}
            </div>
            <button onClick={signOut} title={collapsed ? 'Sign out' : undefined} className={`staff-logout-button ${collapsed ? 'justify-center' : ''}`}><LogOut size={16} />{!collapsed && 'Sign out'}</button>
          </div>
        </div>

        <button onClick={() => setCollapsed((value) => !value)} className="absolute -right-3 top-24 hidden h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-500 shadow-lg transition hover:border-jet-400/30 hover:text-jet-300 lg:flex">
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {mobileOpen && <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" />}

      <aside className={`fixed inset-y-0 left-0 z-50 w-[290px] border-r border-white/10 bg-slate-950/95 p-4 backdrop-blur-2xl transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link to="/staff" onClick={() => setMobileOpen(false)} className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-jet-500"><Factory size={20} /></div><div><p className="font-display font-extrabold">PRIME</p><p className="text-[8px] font-bold uppercase tracking-[0.25em] text-jet-300">Machines</p></div></Link>
          <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"><X size={20} /></button>
        </div>
        <div className="mt-6 space-y-2">
          {visibleItems.map(({ to, label, icon: Icon, description }) => <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `staff-nav-item ${isActive ? 'is-active' : ''}`}><span className="staff-nav-icon"><Icon size={18} /></span><span><span className="block text-sm font-bold">{label}</span><span className="text-[10px] text-slate-600">{description}</span></span></NavLink>)}
        </div>
        <button onClick={signOut} className="staff-logout-button mt-6"><LogOut size={16} /> Sign out</button>
      </aside>

      <div className={`relative min-h-screen transition-all duration-300 ${collapsed ? 'lg:pl-[88px]' : 'lg:pl-[270px]'}`}>
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileOpen(true)} className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-400 hover:text-white lg:hidden"><Menu size={19} /></button>
              <div><p className="text-[9px] font-bold uppercase tracking-[0.22em] text-jet-400">PRIME / {user?.role || 'staff'}</p><p className="mt-1 font-display text-sm font-bold text-white">{location.pathname === '/admin/users' ? 'Team access' : 'Machine catalogue'}</p></div>
            </div>
            <div className="hidden items-center gap-4 sm:flex"><span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-600"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-jet-400" />Live workspace</span><div className="h-8 w-px bg-white/10" /><span className="text-xs text-slate-500">{user?.name}</span></div>
          </div>
        </header>

        <main className="relative mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8 xl:p-10">{children}</main>
      </div>
    </div>
  );
}
