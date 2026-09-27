import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';

const features = [
  ['01', 'Precision engineering', 'Designed around repeatable industrial output.'],
  ['02', 'Quality control', 'Machines are tested before reaching customers.'],
  ['03', 'Automation options', 'Servo and fully automatic configurations.'],
  ['04', 'Long-term support', 'Built for dependable customer partnerships.']
];

export default function AboutSection() {
  return (
    <section id="about" className="section-pad bg-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-[2rem]">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1gqn5YOxJtp3gSg1lNSAPRkeMBuOTuG1Vag6vxUbtDQ&s=10" alt="Industrial workshop" className="h-[530px] w-full object-cover transition duration-700 hover:scale-105" />
          </div>
          <div className="absolute -bottom-7 -right-5 rounded-2xl bg-slate-950 p-6 text-white shadow-2xl sm:-right-7">
            <div className="font-display text-4xl font-extrabold text-emerald-400">1978</div>
            <div className="mt-1 text-xs uppercase tracking-[.18em] text-slate-400">Engineering roots</div>
          </div>
        </Reveal>

        <Reveal>
          <SectionHeading eyebrow="About prime Enterprises" title={<>Engineering experience that turns into <span className="text-PRIME-600">production confidence.</span></>} />
          <p className="mt-6 leading-8 text-slate-600">prime Enterprises has operated in engineering and manufacturing since 1978. Since 2009, its focus has been tube-working machinery including pipe/bar cutting, chamfering and notching systems across manual, semi-automatic, automatic and fully automatic configurations.</p>
          <p className="mt-4 leading-8 text-slate-600">The company reports a manufacturing facility of approximately 30,000 sq. ft. and a team of around 80 people, with products tested against internal quality standards before delivery.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map(([n, title, text]) => (
              <div key={n} className="feature-box"><span className="feature-icon">{n}</span><div><b>{title}</b><p>{text}</p></div></div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
