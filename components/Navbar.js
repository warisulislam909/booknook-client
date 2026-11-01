"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";

export default function Navbar() {
  const { data } = authClient.useSession();
  const user = data?.user;
  const path = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(false);

  const links = [["Home", "/"], ["All Books", "/books"],
    ...(user ? [["Add Book", "/add-book"], ["My Books", "/my-books"], ["My Borrows", "/my-borrows"]] : [])];

  const logout = async () => {
    await authClient.signOut();
    setDrop(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-sand">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <ul className="hidden lg:flex items-center gap-7">
          {links.map(([n, h]) => (
            <li key={h}><Link href={h} className={`font-medium hover:text-rust ${path === h ? "text-rust border-b-2 border-rust" : ""}`}>{n}</Link></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button onClick={() => setDrop(!drop)} className="cursor-pointer">
                <img src={user.image || "https://i.ibb.co/2kR1hQk/avatar.png"} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-rust" />
              </button>
              {drop && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl bg-cream border border-sand shadow-xl p-3 space-y-2">
                  <p className="font-display font-bold px-2 truncate">{user.name}</p>
                  <Link href="/my-profile" onClick={() => setDrop(false)} className="block px-2 py-1 rounded hover:bg-sand">My Profile</Link>
                  <button onClick={logout} className="btn w-full !py-2">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex gap-2">
              <Link href="/login" className="btn btn-outline !py-2">Login</Link>
              <Link href="/register" className="btn !py-2">Register</Link>
            </div>
          )}
          <button className="lg:hidden text-2xl cursor-pointer" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? "✕" : "☰"}</button>
        </div>
      </nav>
      {menu && (
        <div className="lg:hidden bg-cream border-t border-sand px-4 py-4 space-y-3" onClick={() => setMenu(false)}>
          {links.map(([n, h]) => <Link key={h} href={h} className="block font-medium">{n}</Link>)}
          {!user && (
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="btn btn-outline !py-2">Login</Link>
              <Link href="/register" className="btn !py-2">Register</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
