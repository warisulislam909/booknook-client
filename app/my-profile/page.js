"use client";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";

function Profile() {
  useTitle("My Profile");
  const { user } = authClient.useSession().data;
  return (
    <section className="max-w-md mx-auto px-4 py-14 text-center">
      <img src={user.image || "https://i.ibb.co/2kR1hQk/avatar.png"} alt={user.name} className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-rust" />
      <h1 className="section-title mt-5">{user.name}</h1>
      <p className="opacity-70">{user.email}</p>
    </section>
  );
}
export default function Page() { return <PrivateRoute><Profile /></PrivateRoute>; }
