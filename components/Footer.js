import Link from "next/link";
import Logo from "./Logo";
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2H21.5l-7.5 8.57L22.8 22h-6.9l-5.4-7.07L4.3 22H1l8.02-9.17L1.5 2h7.08l4.88 6.45L18.244 2Zm-1.2 18h1.9L7.04 3.9H5l12.04 16.1Z" /></svg>
);
const FbIcon = () => (<svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M13.5 22v-8h2.7l.5-3.2h-3.2V8.7c0-.9.4-1.7 1.8-1.7h1.5V4.2C16.5 4.1 15.5 4 14.5 4 12.2 4 10.4 5.4 10.4 8v2.8H7.7V14h2.7v8h3.1Z" /></svg>);
const IgIcon = () => (<svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>);

export default function Footer() {
  return (
    <footer className="bg-moss text-cream mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-3 text-sm opacity-80">A cozy little library where you can add, borrow and return books in a few clicks.</p>
        </div>
        <div className="text-sm space-y-1 opacity-90">
          <h4 className="font-display text-lg mb-2">Contact</h4>
          <p>hello@booknook.app</p>
          <p>+880 1700-000000</p>
          <p>Khulna, Bangladesh</p>
        </div>
        <div>
          <h4 className="font-display text-lg mb-2">Follow us</h4>
          <div className="flex gap-3">
            {[["X", <XIcon key="x" />], ["Facebook", <FbIcon key="f" />], ["Instagram", <IgIcon key="i" />]].map(([n, i]) => (
              <Link key={n} href="#" aria-label={n} className="grid place-items-center w-10 h-10 rounded-full bg-cream/10 hover:bg-rust transition">{i}</Link>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-cream/20 text-center text-xs py-4 opacity-70">© {new Date().getFullYear()} BookNook. All rights reserved.</p>
    </footer>
  );
}
