export default function Footer() {
  return (
    <footer className="rounded-t-xl bg-slate-950 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-white">
            <div className="logo-mark small"><span>P</span></div>
            <div>
              <div className="font-display text-xl font-extrabold">PRIME<span className="text-emerald-400"> MACHINES</span></div>
              <div className="text-[9px] tracking-[.25em]">prime ENTERPRISES</div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7">Precision-engineered tube working machinery for cutting, chamfering, notching and automated production.</p>
        </div>
        <div>
          <h3 className="font-bold text-white">Explore</h3>
          <div className="mt-4 space-y-3 text-sm">
            {['Products','About Us','Industries','Contact'].map((item) => (
              <a key={item} className="footer-link" href={`#${item === 'About Us' ? 'about' : item.toLowerCase()}`}>{item}</a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white">Contact</h3>
          <div className="mt-4 space-y-3 text-sm">
            <p>Chitra GIDC, Bhavnagar, Gujarat, India</p>
            <a className="footer-link" href="tel:+919876543210">+91 9876543210</a>
            <a className="footer-link" href="mailto:info@primeent.com">info@primeent.com</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} prime Enterprises / PRIME Machines. Redesign concept.</p>
          <p>*Statistics shown are based on information published on the current company website.</p>
        </div>
      </div>
    </footer>
  );
}
