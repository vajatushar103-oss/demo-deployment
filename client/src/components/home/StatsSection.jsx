import { stats } from '../../data/siteData';
import { useCounter } from '../../hooks/useCounter';

function Stat({ value, label, plus }) {
  const [ref, count] = useCounter(value);
  return <div ref={ref} className="stat-block"><div className="text-4xl font-extrabold text-white">{count.toLocaleString('en-IN')}{plus ? '+' : ''}</div><div>{label}</div></div>;
}

export default function StatsSection() {
  return (
    <section className="rounded-xl bg-PRIME-600">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-6 lg:grid-cols-4">
        {stats.map((s) => <Stat key={s.label} {...s} />)}
      </div>
    </section>
  );
}
