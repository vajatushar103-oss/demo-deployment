import { useReveal } from '../../hooks/useReveal';

export default function Reveal({ children, className = '', delay = '' }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay} ${className}`}>
      {children}
    </div>
  );
}
