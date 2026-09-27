import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';

const steps = [
  ['01', 'Understand', 'Application, material, dimensions and production targets.'],
  ['02', 'Engineer', 'Select the right machine architecture and automation level.'],
  ['03', 'Build & test', 'Manufacture, assemble and validate the machine.'],
  ['04', 'Deliver', 'Commission the solution and build a long-term partnership.']
];

export default function ProcessSection() {
  return (
    <section className="overflow-hidden rounded-xl bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal><SectionHeading dark eyebrow="How we work" title={<>From requirement to <br/><span className="text-emerald-400">production.</span></>} /></Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
          {steps.map(([number, title, text], index) => (
            <Reveal key={number} delay={index ? `delay-${index}` : ''} className="process-card">
              <span>{number}</span><h3>{title}</h3><p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
