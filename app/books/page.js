"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { api } from "@/lib/api";
import useTitle from "@/lib/useTitle";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";

function Books() {
  useTitle("All Books");
  const params = useSearchParams();
  const category = params.get("category");
  const [books, setBooks] = useState(null);
  useEffect(() => {
    api(`/books${category ? `?category=${category}` : ""}`, { auth: false }).then(setBooks).catch(() => setBooks([]));
  }, [category]);
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="section-title text-center mb-10">{category ? `${category} Books` : "All Books"}</h1>
      {!books ? <Spinner /> : books.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{books.map((b) => <BookCard key={b._id} book={b} />)}</div>
      ) : <p className="text-center opacity-70">No books found.</p>}
    </section>
  );
}
export default function Page() { return <Suspense fallback={<Spinner />}><Books /></Suspense>; }
