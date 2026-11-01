import Link from "next/link";
export const metadata = { title: "BookNook | Page Not Found" };
export default function NotFound() {
  return (
    <div className="text-center py-28 px-4">
      <p className="font-display text-8xl font-bold text-rust">404</p>
      <h1 className="text-3xl font-bold text-moss mt-4">This page has been checked out</h1>
      <p className="opacity-70 mt-2 mb-8">The page you are looking for is not on our shelves.</p>
      <Link href="/" className="btn">Back to Home</Link>
    </div>
  );
}
