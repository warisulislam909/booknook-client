import { authClient } from "./auth-client";

export const API = process.env.NEXT_PUBLIC_API_URL;

export async function api(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const { data } = await authClient.token();
    if (data?.token) headers.Authorization = `Bearer ${data.token}`;
  }
  const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Something went wrong");
  return json;
}

export async function uploadImage(file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: "POST", body: fd });
  const json = await res.json();
  if (!json.success) throw new Error("Image upload failed");
  return json.data.url;
}

export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];
export const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
