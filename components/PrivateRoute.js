"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Spinner from "./Spinner";

export default function PrivateRoute({ children }) {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (!isPending && !data) router.replace(`/login?redirect=${encodeURIComponent(path)}`);
  }, [isPending, data, path, router]);
  if (isPending || !data) return <Spinner />;
  return children;
}
