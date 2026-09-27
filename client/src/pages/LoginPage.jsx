import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ArrowRight,CheckCircle2,Eye,EyeOff,Factory,LockKeyhole,Mail,ShieldCheck,Sparkles} from "lucide-react";
import {useAuth} from "../hooks/useAuth.js";
import LoadingPage from "../components/common/LoadingPage.jsx";

export default function LoginPage() {
  
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {loading, handleLogin} = useAuth();
  
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) {
      setError("");
    }
  };


  const handleSubmit = async (e) => {

    e.preventDefault();
    await handleLogin({email, password});
    navigate('/staff');
  }

   const [loadingScreenFinished, setLoadingScreenFinished] = useState(false);
    const handleLoadingFinished = useCallback(() => {
        setLoadingScreenFinished(true);
    }, []);

    if(loading || !loadingScreenFinished){
        return (
            <LoadingPage
                loading={loading}
                onFinished={handleLoadingFinished}
            />
            // <main><h1>LOADING...</h1></main>
        )
    }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="relative min-h-screen">
        {/* =========================================================
            BACKGROUND
        ========================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Green glow */}
          <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-jet-500/10 blur-[120px]" />

          <div className="absolute -right-40 bottom-0 h-[600px] w-[600px] rounded-full bg-jet-400/10 blur-[140px]" />

          {/* Grid */}
          <div className="login-grid absolute inset-0 opacity-[0.18]" />

          {/* Decorative circles */}
          <div className="absolute left-[8%] top-[15%] h-2 w-2 animate-pulse rounded-full bg-jet-400 shadow-[0_0_20px_rgba(70,207,140,0.8)]" />

          <div className="absolute right-[18%] top-[30%] h-1.5 w-1.5 animate-pulse rounded-full bg-jet-300 shadow-[0_0_15px_rgba(131,227,177,0.8)] [animation-delay:700ms]" />

          <div className="absolute bottom-[18%] left-[42%] h-1.5 w-1.5 animate-pulse rounded-full bg-jet-400 shadow-[0_0_15px_rgba(70,207,140,0.8)] [animation-delay:1200ms]" />
        </div>

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px]">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <section className="relative hidden w-1/2 flex-col justify-between px-12 py-10 lg:flex xl:px-20">

            {/* Brand */}
            <Link
              to="/"
              className="group inline-flex w-fit items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-jet-500 text-white shadow-green transition duration-300 group-hover:scale-105 group-hover:rotate-3">
                <Factory size={22} strokeWidth={2.2} />
              </div>

              <div>
                <div className="font-display text-xl font-extrabold tracking-tight">
                  PRIME
                </div>

                <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-jet-300">
                  Machines
                </div>
              </div>
            </Link>

            {/* Main visual */}
            <div className="relative flex flex-1 items-center">

              {/* Large decorative ring */}
              <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-jet-400/10" />

              <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-jet-400/10" />

              <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-jet-400/10" />

              {/* Rotating ring */}
              <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 animate-[spin_25s_linear_infinite] rounded-full border border-dashed border-jet-400/20" />

              {/* Machine visual */}
              <div className="relative mx-auto w-full max-w-[570px]">

                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-2xl backdrop-blur-xl">

                  {/* Scan line */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-[scan_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-jet-400 to-transparent opacity-70" />

                  {/* Top label */}
                  <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-jet-400" />
                      System Online
                    </div>

                    <span className="rounded-full border border-jet-400/20 bg-jet-400/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-jet-300">
                      Precision
                    </span>
                  </div>

                  {/* Machine illustration */}
                  <div className="relative flex h-[300px] items-center justify-center">

                    {/* Glow */}
                    <div className="absolute h-44 w-44 rounded-full bg-jet-500/10 blur-3xl" />

                    {/* Main machine */}
                    <div className="relative h-40 w-64 rounded-2xl border border-jet-300/20 bg-gradient-to-br from-slate-700/70 to-slate-950/80 shadow-2xl">

                      {/* top */}
                      <div className="absolute -top-8 left-8 right-8 h-8 rounded-t-xl border border-jet-300/20 bg-slate-700/70" />

                      {/* control panel */}
                      <div className="absolute right-5 top-5 h-14 w-20 rounded-lg border border-white/10 bg-slate-950/80 p-2">
                        <div className="mb-2 h-1.5 w-10 rounded-full bg-jet-400/80" />

                        <div className="flex gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-jet-400" />
                          <span className="h-2 w-2 rounded-full bg-slate-600" />
                          <span className="h-2 w-2 rounded-full bg-slate-600" />
                        </div>
                      </div>

                      {/* center */}
                      <div className="absolute left-6 top-7 h-24 w-28 rounded-xl border border-white/10 bg-slate-950/70">
                        <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-slate-700">
                          <div className="absolute inset-2 rounded-full border border-jet-400/40 bg-jet-500/10" />

                          <div className="absolute left-1/2 top-1/2 h-1 w-7 origin-left -translate-y-1/2 rotate-45 bg-jet-400" />
                        </div>
                      </div>

                      {/* legs */}
                      <div className="absolute -bottom-5 left-8 h-6 w-5 rounded-b-md bg-slate-700" />
                      <div className="absolute -bottom-5 right-8 h-6 w-5 rounded-b-md bg-slate-700" />

                      {/* base */}
                      <div className="absolute -bottom-3 left-[-20px] right-[-20px] h-3 rounded-full border border-jet-400/10 bg-slate-800" />
                    </div>

                    {/* floating measurement cards */}

                    <div className="absolute left-0 top-8 rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-xl backdrop-blur-xl">
                      <div className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
                        Accuracy
                      </div>

                      <div className="mt-1 font-display text-lg font-bold text-jet-300">
                        0.01 mm
                      </div>
                    </div>

                    <div className="absolute bottom-8 right-0 rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-xl backdrop-blur-xl">
                      <div className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
                        Efficiency
                      </div>

                      <div className="mt-1 font-display text-lg font-bold text-white">
                        98.6%
                      </div>
                    </div>
                  </div>

                  {/* bottom stats */}
                  <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
                    <div className="text-center">
                      <div className="font-display text-lg font-bold">
                        24/7
                      </div>
                      <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-500">
                        Operation
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-display text-lg font-bold">
                        ISO
                      </div>
                      <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-500">
                        Standards
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-display text-lg font-bold text-jet-300">
                        15+
                      </div>
                      <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-500">
                        Years
                      </div>
                    </div>
                  </div>
                </div>

                {/* tagline */}
                <div className="mt-8 text-center">
                  <p className="font-display text-2xl font-semibold tracking-tight text-white">
                    Engineering the future of
                    <span className="text-jet-400"> manufacturing.</span>
                  </p>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                    Precision machinery. Intelligent engineering.
                    Built for demanding industrial applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>© {new Date().getFullYear()} PRIME Machines</span>

              <span className="flex items-center gap-2">
                <ShieldCheck size={14} />
                Authorized Access
              </span>
            </div>
          </section>

          {/* =====================================================
              RIGHT SIDE — LOGIN
          ===================================================== */}

          <section className="flex w-full items-center justify-center px-5 py-10 sm:px-10 lg:w-1/2 lg:px-16 xl:px-24">

            <div className="w-full max-w-[470px]">

              {/* Mobile logo */}
              <div className="mb-10 flex justify-center lg:hidden">
                <Link
                  to="/"
                  className="flex items-center gap-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-jet-500 shadow-green">
                    <Factory size={22} />
                  </div>

                  <div>
                    <div className="font-display text-xl font-extrabold">
                      PRIME
                    </div>

                    <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-jet-300">
                      Machines
                    </div>
                  </div>
                </Link>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-jet-400/15 bg-jet-400/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-jet-300">
                  <Sparkles size={12} />
                  Secure Workspace
                </div>

                <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Welcome
                  <span className="text-jet-400"> back.</span>
                </h1>

                <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                  Sign in to access the PRIME Machines management
                  workspace.
                </p>
              </div>

              {/* Login card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">

                {/* Card glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-jet-500/10 blur-3xl" />

                <form
                  onSubmit={handleSubmit}
                  className="relative space-y-5"
                >

                  {/* Error */}
                  {/* {error && (
                    <div className="animate-[fadeIn_0.25s_ease-out] rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                      {error}
                    </div>
                  )} */}

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-400"
                    >
                      Email address
                    </label>

                    <div className="group relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-jet-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        // onChange={handleChange}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        placeholder="admin@primemachines.com"
                        className="h-14 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-jet-400/50 focus:bg-slate-950/80 focus:ring-4 focus:ring-jet-400/5"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-400"
                      >
                        Password
                      </label>
                    </div>

                    <div className="group relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-jet-400"
                      />

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        // onChange={handleChange}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        placeholder="Enter your password"
                        className="h-14 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-jet-400/50 focus:bg-slate-950/80 focus:ring-4 focus:ring-jet-400/5"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((previous) => !previous)
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-400">
                      <input
                        type="checkbox"
                        name="remember"
                        // checked={form.remember}
                        // onChange={handleChange}
                        className="h-4 w-4 cursor-pointer appearance-none rounded border border-white/20 bg-slate-950 checked:border-jet-500 checked:bg-jet-500 checked:text-white"
                      />

                      <span>Keep me signed in</span>
                    </label>

                    <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                      Protected
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative mt-3 flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-jet-500 px-5 text-sm font-bold text-white shadow-green transition duration-300 hover:bg-jet-400 hover:shadow-[0_18px_60px_rgba(24,185,111,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {/* shine */}
                    <span className="absolute inset-y-0 -left-20 w-12 rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-[120%]" />

                    {loading ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign in to workspace</span>

                        <ArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* Security footer */}
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-jet-400/10 text-jet-400">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-300">
                      Authorized personnel only
                    </p>

                    <p className="mt-0.5 text-[10px] leading-4 text-slate-600">
                      Your credentials are protected by secure authentication.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to website */}
              <div className="mt-7 text-center">
                <Link
                  to="/"
                  className="group inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-jet-300"
                >
                  <span className="transition-transform group-hover:-translate-x-1">
                    ←
                  </span>

                  Back to PRIME Machines website
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}