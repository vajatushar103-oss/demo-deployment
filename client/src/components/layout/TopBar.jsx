export default function TopBar() {
  return (
    <div className="hidden border-b border-slate-200 bg-slate-950 text-slate-300 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
        <p>Precision tube working machinery • Since 1978</p>
        <div className="flex gap-5">
          <a href="tel:+919876543210" className="hover:text-white">+91 9876543210</a>
          <a href="mailto:info@primeent.com" className="hover:text-white">info@primeent.com</a>
        </div>
      </div>
    </div>
  );
}
