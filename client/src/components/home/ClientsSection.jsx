import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';
import baja_auto from "../../assets/images/baja_auto.jpeg";
import tvs from "../../assets/images/tvs.png";
import eicher from "../../assets/images/eicher.jpeg";
import force from "../../assets/images/force.jpeg";
import godrej from "../../assets/images/godrej.jpeg";
import kinetic from "../../assets/images/kinetic.jpeg";


export default function ClientsSection() {

  const clients = [
  { name: 'BAJAJ AUTO', image: baja_auto },
  { name: 'TVS', image: tvs },
  { name: 'EICHER', image: eicher },
  { name: 'FORCE', image: godrej },
  { name: 'KINETIC', image: kinetic }
];

  return (
    <section id="clients" className="section-pad bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
        <Reveal>
          <SectionHeading center eyebrow="Customer confidence" title={<>Trusted by businesses that demand <span className="text-PRIME-600">consistency.</span></>} description="The original company website lists customers and OEM relationships including Kinetic Engineering, Godrej, TVS, Eicher, Force Motors and Bajaj Auto." />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((client) => (
            <div key={client.name} className="client-pill">
              <img className="mr-3 aspect-auto w-20 mix-blend-multiply rounded-lg" src={client.image} alt={client.name} />
              <p>{client.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
