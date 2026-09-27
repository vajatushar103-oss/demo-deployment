import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';
import { industries } from '../../data/siteData';

export default function IndustriesSection() {
  return (
    <section id="industries" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal><SectionHeading eyebrow="Industries we serve" title={<>Machining solutions across <br/><span className="text-PRIME-600">multiple industries.</span></>} /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <Reveal key={industry.number} delay={index % 4 ? `delay-${index % 4}` : ''}>
              <div className="industry-card">
                <img src={industry.image} alt={industry.name} />
                <div><span>{industry.number}</span><h3>{industry.name}</h3></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
