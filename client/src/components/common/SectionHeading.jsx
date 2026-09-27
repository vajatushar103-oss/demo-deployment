export default function SectionHeading({ eyebrow, title, description, dark = false, center = false }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} ${dark ? 'text-white' : ''}`}>
      <div className={`eyebrow ${dark ? '!text-emerald-300' : ''} ${center ? 'justify-center' : ''}`}>
        {eyebrow}
      </div>
      <h2 className={`${dark ? 'text-white' : 'section-title'} ${dark ? 'mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl' : ''}`}>
        {title}
      </h2>
      {description && <p className={`mt-5 max-w-2xl leading-7 ${dark ? 'text-slate-400' : 'text-slate-600'} ${center ? 'mx-auto' : ''}`}>{description}</p>}
    </div>
  );
}
