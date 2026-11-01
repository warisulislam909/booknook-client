import Link from "next/link";
export default function Logo({ light }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="grid place-items-center w-9 h-9 rounded-lg bg-rust text-white text-lg">📖</span>
      <span className={`font-display text-2xl font-bold ${light ? "text-cream" : "text-moss"}`}>BookNook</span>
    </Link>
  );
}
