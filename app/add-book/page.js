"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api, uploadImage } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import BookForm from "@/components/BookForm";

function AddBook() {
  useTitle("Add Book");
  const { data } = authClient.useSession();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const f = e.target;
    setBusy(true);
    try {
      const image = await uploadImage(f.image.files[0]);
      await api("/books", { method: "POST", body: {
        title: f.title.value, author: f.author.value, category: f.category.value,
        copies: f.copies.value, description: f.description.value, image } });
      toast.success("Book added successfully!");
      router.push("/my-books");
    } catch (err) { toast.error(err.message); }
    setBusy(false);
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-14">
      <h1 className="section-title text-center mb-8">Add a Book</h1>
      <div className="rounded-2xl bg-cream border border-sand p-6 md:p-8">
        <BookForm onSubmit={submit} busy={busy} label="Add Book" user={data.user} />
      </div>
    </section>
  );
}
export default function Page() { return <PrivateRoute><AddBook /></PrivateRoute>; }
