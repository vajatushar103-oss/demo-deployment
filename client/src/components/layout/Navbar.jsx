import { Menu, X } from 'lucide-react';
import { useState, useMemo} from 'react';
import { navItems } from '../../data/siteData';
import {useScrollSpy} from "../../hooks/useScrollSpy.js";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.js";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  
  const sectionIds = useMemo(
    () => navItems.map(([, href]) => href),
    []
  );

  const navigate = useNavigate();

  const activeSection = useScrollSpy(sectionIds, 150);

  const goTo = (href) => {



    const section = document.getElementById(href);
    
    if (!section) return;
    
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  const {user, loading, isAuthenticated} = useAuth();

  const handleAuthorization = async (e) => {

    e.preventDefault();
    
    // console.log("===============CLIENT_CHECKPOINT===============");

    if(loading){
      console.log("CHECKING AUTHENTICATION!");
      return;
    }

    if(isAuthenticated){
      navigate("/staff");
    }else{
      navigate("/login");
    }

    // try{

      
    //   navigate('/admin');

    // }catch(err){
    //   navigate('/login')

    // }
    

  }


  return (
    <header className="sticky top-0 z-50 rounded-b-xl border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
        <button onClick={() => goTo('#home')} className="flex items-center gap-3 text-left" aria-label="PRIME Machines home">
          <div className="logo-mark"><span>P</span></div>
          <div className="leading-none">
            <div className="font-display text-xl font-extrabold tracking-tight">PRIME<span className="text-PRIME-600"> MACHINES</span></div>
            <div className="mt-1 text-[9px] font-semibold uppercase tracking-[.25em] text-slate-500">prime ENTERPRISES</div>
          </div>
        </button>

        <div className="hidden items-center gap-8 lg:flex">


          {navItems.map(([label, href]) => {
          const isActive = activeSection === href;

          return (
            <button
              key={href}
              onClick={() => goTo(href)}
              className={`
                nav-link
                transition
                hover:scale-[1.1]
                text-lg
                active:scale-[0.9]
                active:text-jet-900
                active:-rotate-2
                ${isActive ? "active" : ""}
              `}
            >
              {label}
            </button>
          );
        })}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <button onClick={() => goTo('contact')} className="press-button rounded-full bg-PRIME-600 px-5 py-2.5 text-sm font-semibold text-white shadow-green hover:-translate-y-1 hover:bg-PRIME-700">
            Get a Quote
          </button>
          <button onClick={handleAuthorization} className="press-button rounded-full bg-PRIME-600 px-5 py-2.5 text-sm font-semibold text-white shadow-green hover:-translate-y-1 hover:bg-PRIME-700">
            STAFF LOGIN
          </button>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="rounded-xl border border-slate-200 p-2.5 lg:hidden" aria-label="Open menu" aria-expanded={open}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {open && (
          <div className="absolute right-0 top-20 w-[min(50vw,320px)] rounded-b-xl border border-slate-200 bg-white p-3 shadow-xl lg:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map(([label, href]) => (
                <button key={href} onClick={() => (goTo(href), setOpen(false))} className="mobile-link border border-PRIME-200 text-center">{label}</button>
              ))}
              <button onClick={handleAuthorization} className="mobile-link mt-2 bg-PRIME-500 text-white">STAFF LOGIN</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
