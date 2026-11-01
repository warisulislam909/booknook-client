"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/lib/useTitle";
import GoogleButton from "@/components/GoogleButton";

export default function Register() {
  useTitle("Register");
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const pw = f.password.value;
    const msg = !/[A-Z]/.test(pw) ? "Password must have an uppercase letter"
      : !/[a-z]/.test(pw) ? "Password must have a lowercase letter"
      : pw.length < 6 ? "Password must be at least 6 characters" : "";
    setError(msg);
    if (msg) return toast.error(msg);

    setBusy(true);
    const { error } = await authClient.signUp.email({ name: f.name.value, email: f.email.value, password: pw, image: f.photo.value });
    setBusy(false);
    if (error) { setError(error.message || "Registration failed"); return toast.error(error.message || "Registration failed"); }
    toast.success("Account created! Please login.");
    router.push("/login");
  };

  return (
    <section className="max-w-md mx-auto px-4 py-14">
      <div className="rounded-2xl bg-cream border border-sand p-8">
        <h1 className="section-title text-center mb-6">Create Account</h1>
        <form onSubmit={submit} className="grid gap-4">
          <div><label className="label">Name</label><input name="name" required className="input" placeholder="Your full name" /></div>
          <div><label className="label">Email</label><input name="email" type="email" required className="input" placeholder="you@example.com" /></div>
          <div><label className="label">Photo URL</label><input name="photo" type="url" required className="input" placeholder="https://..." /></div>
          <div><label className="label">Password</label><input name="password" type="password" required className="input" placeholder="Uppercase, lowercase, 6+ characters" /></div>
          {error && <p className="text-sm text-red-700 bg-red-100 rounded-lg px-3 py-2">{error}</p>}
          <button className="btn" disabled={busy}>{busy ? "Creating..." : "Register"}</button>
        </form>
        <p className="text-center text-sm my-4 opacity-60">or</p>
        <GoogleButton redirect="/" />
        <p className="text-center text-sm mt-6">Already a member? <Link href="/login" className="text-rust font-semibold">Login</Link></p>
      </div>
    </section>
  );
}
