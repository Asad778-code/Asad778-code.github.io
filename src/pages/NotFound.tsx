import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">Error 404</p>
      <h1 className="text-6xl md:text-8xl font-display italic mb-6">Page not found</h1>
      <Link to="/" className="text-sm rounded-full border-2 border-stroke px-7 py-3.5 hover:border-[#89AACC] transition-colors">Back to home</Link>
    </main>
  );
}
