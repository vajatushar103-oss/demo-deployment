import { ArrowRight, Crosshair } from 'lucide-react';
import Reveal from '../common/Reveal';
import { useCounter } from '../../hooks/useCounter';
// import DEMO_VIDEO from "../../assets/DEMO_VIDEO.mp4";
import SmartVideo from '../common/SmartVideo.jsx';

function HeroCounter({ target, label, plus = false }) {
  const [ref, value] = useCounter(target);
  return (
    <div ref={ref}>
      <div className="text-2xl font-extrabold text-white">{value.toLocaleString('en-IN')}{plus ? '+' : ''}</div>
      <div className="mt-1 text-xs text-slate-400">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden rounded-b-xl bg-slate-950">
      <div className="hero-grid absolute inset-0" />
      <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-PRIME-600/20 blur-3xl" />
      <div className="absolute -bottom-48 -left-24 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-emerald-300">
            <span className="pulse-dot" />
            Precision engineering since 1978
          </div>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Machines built for <span className="text-gradient">precision.</span> Production built for scale.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Tube and bar cutting, chamfering, notching and automated machining solutions engineered by PRIME Machines for demanding industrial production.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#products" className="group inline-flex items-center justify-center gap-2 rounded-full bg-PRIME-500 px-7 py-3.5 font-bold text-white shadow-green hover:-translate-y-1 hover:bg-PRIME-400">
              Explore our machines <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
            <a href="#about" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 font-bold text-white hover:bg-white/10">
              Why PRIME Machines?
            </a>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-5 border-t border-white/10 pt-7">
            <HeroCounter target={4000} plus label="Domestic installations+" />
            <HeroCounter target={250} plus label="Export installations+" />
            <HeroCounter target={48} label="Years of engineering*" />
          </div>
        </Reveal>

        <Reveal delay="delay-2" className="relative">
          <div className="machine-frame relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl">
            {/* <img className="hero-machine h-[430px] w-full object-cover sm:h-[520px]" src={DEMO_VIDEO} alt="Industrial machinery" /> */}
              {/* <video className="hero-machine h-[430px] w-full object-cover sm:h-[520px]" autoPlay muted>
                <source src={DEMO_VIDEO} type="video/mp4" />
              </video> */}
              <SmartVideo
                  className="absolute inset-0"
                  poster="/images/hero-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
              />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-300">Featured capability</div>
                <div className="mt-1 text-xl font-bold text-white"><p>""</p></div>
              </div>
              <div className="glass-badge">01 / 04</div>
            </div>
            <div className="scan-line" />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:block">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-PRIME-50 text-PRIME-600"><Crosshair size={24} /></div>
              <div><div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Built around</div><div className="font-bold">Reliability + precision</div></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
