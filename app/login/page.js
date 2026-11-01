"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/lib/useTitle";
import GoogleButton from "@/components/GoogleButton";

export default function Login() {
  useTitle("Login");
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const getRedirect = () => new URLSearchParams(window.location.search).get("redirect") || "/";

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    const { error } = await authClient.signIn.email({ email: e.target.email.value, password: e.target.password.value });
    setBusy(false);
    if (error) { setError(error.message || "Invalid email or password"); toast.error(error.message || "Login failed"); return; }
    toast.success("Welcome back!");
    router.push(getRedirect());
  };

  return (
    <section className="max-w-md mx-auto px-4 py-14">
      <div className="rounded-2xl bg-cream border border-sand p-8">
        <h1 className="section-title text-center mb-6">Login</h1>
        <form onSubmit={submit} className="grid gap-4">
          <div><label className="label">Email</label><input name="email" type="email" required className="input" placeholder="you@example.com" /></div>
          <div><label className="label">Password</label><input name="password" type="password" required className="input" placeholder="Your password" /></div>
          <button type="button" onClick={() => toast("Password reset is coming soon", { icon: "🛠️" })} className="text-sm text-rust text-left cursor-pointer">Forget Password?</button>
          {error && <p className="text-sm text-red-700 bg-red-100 rounded-lg px-3 py-2">{error}</p>}
          <button className="btn" disabled={busy}>{busy ? "Logging in..." : "Login"}</button>
        </form>
        <p className="text-center text-sm my-4 opacity-60">or</p>
        <GoogleButton redirect="/" />
        <p className="text-center text-sm mt-6">New here? <Link href="/register" className="text-rust font-semibold">Create an account</Link></p>
      </div>
    </section>
  );
}
