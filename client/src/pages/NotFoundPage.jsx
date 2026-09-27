import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white"><div><p className="text-PRIME-400">404</p><h1 className="mt-2 text-4xl font-bold">Page not found</h1><Link to="/" className="mt-6 inline-block rounded-full bg-PRIME-500 px-6 py-3 font-bold">Back home</Link></div></div>;
}
