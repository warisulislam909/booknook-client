"use client";
import { useEffect, useState, use } from "react";
import toast from "react-hot-toast";
import { api, fmtDate } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import Modal from "@/components/Modal";

function Details({ id }) {
  const { data } = authClient.useSession();
  const user = data.user;
  const [book, setBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  useTitle(book?.title || "Book Details");

  useEffect(() => { api(`/books/${id}`).then(setBook).catch((e) => { toast.error(e.message); setBook(false); }); }, [id]);

  const borrow = async () => {
    setBusy(true);
    try {
      await api("/borrows", { method: "POST", body: { bookId: id } });
      setBook((b) => ({ ...b, copies: b.copies - 1 }));
      toast.success("Book borrowed! Return it within 7 days.");
      setOpen(false);
    } catch (e) { toast.error(e.message); setOpen(false); }
    setBusy(false);
  };

  if (book === null) return <Spinner />;
  if (book === false) return <p className="text-center py-24">Book not found.</p>;
  const out = book.copies < 1;
  return (
    <section className="max-w-5xl mx-auto px-4 py-14 grid gap-10 md:grid-cols-2">
      <img src={book.image} alt={book.title} className="w-full h-[28rem] object-cover rounded-2xl shadow-lg" />
      <div>
        <span className="text-xs font-semibold uppercase bg-sand text-moss px-3 py-1 rounded-full">{book.category}</span>
        <h1 className="section-title mt-3">{book.title}</h1>
        <p className="mt-1 opacity-70">by {book.author}</p>
        <p className="mt-6 leading-relaxed">{book.description}</p>
        <div className="mt-6 text-sm space-y-1 opacity-80">
          <p>Added by <b>{book.addedBy}</b> ({book.addedByEmail})</p>
          <p>Added on {fmtDate(book.createdAt)}</p>
          <p>Copies available: <b>{book.copies}</b></p>
        </div>
        <button className="btn mt-8" disabled={out} onClick={() => setOpen(true)}>{out ? "Not Available" : "Borrow This Book"}</button>
      </div>
      {open && (
        <Modal title="Borrow This Book" onClose={() => setOpen(false)}>
          <div className="space-y-4">
            <div><label className="label">Name</label><input className="input" readOnly value={user.name} /></div>
            <div><label className="label">Email</label><input className="input" readOnly value={user.email} /></div>
            <button className="btn w-full" disabled={busy} onClick={borrow}>{busy ? "Please wait..." : "Confirm Borrow"}</button>
          </div>
        </Modal>
      )}
    </section>
  );
}
export default function Page({ params }) {
  const { id } = use(params);
  return <PrivateRoute><Details id={id} /></PrivateRoute>;
}
