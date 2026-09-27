export default function CTASection() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-slate-950 py-20">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(24,185,111,.18),transparent_62%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-6 md:flex-row md:items-center">
        <div className=" max-w-3xl">
          {/* put reveal in above className */}
          <div className="eyebrow !text-emerald-300">Start your next project</div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Tell us what you need to cut, chamfer or automate.</h2>
          <p className="mt-5 leading-7 text-slate-400">Share your material, dimensions and production requirements. Our team can help identify the right machine category.</p>
        </div>
        {/* <Reveal>
          <div className="max-w-3xl">
            <div className="eyebrow !text-emerald-300">Start your next project</div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Tell us what you need to cut, chamfer or automate.</h2>
            <p className="mt-5 leading-7 text-slate-400">Share your material, dimensions and production requirements. Our team can help identify the right machine category.</p>
          </div>
        </Reveal> */}
        <a href="#contact" className="shrink-0 rounded-full border border-PRIME-500 bg-PRIME-500 px-8 py-4 font-bold text-white shadow-green hover:-translate-y-1 hover:bg-PRIME-400">Talk to PRIME Machines</a>
      </div>
    </section>
  );
}
