"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api, uploadImage } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import Modal from "@/components/Modal";
import BookForm from "@/components/BookForm";

function MyBooks() {
  useTitle("My Books");
  const { data } = authClient.useSession();
  const email = data.user.email;
  const [books, setBooks] = useState(null);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api("/books", { auth: false }).then((all) => setBooks(all.filter((b) => b.addedByEmail === email))).catch(() => setBooks([]));
  }, [email]);

  const save = async (e) => {
    e.preventDefault();
    const f = e.target;
    setBusy(true);
    try {
      const body = { title: f.title.value, author: f.author.value, category: f.category.value, copies: f.copies.value, description: f.description.value };
      if (f.image.files[0]) body.image = await uploadImage(f.image.files[0]);
      await api(`/books/${edit._id}`, { method: "PATCH", body });
      setBooks((l) => l.map((b) => (b._id === edit._id ? { ...b, ...body, copies: Number(body.copies) } : b)));
      toast.success("Book updated successfully!");
      setEdit(null);
    } catch (err) { toast.error(err.message); }
    setBusy(false);
  };

  const remove = async () => {
    setBusy(true);
    try {
      await api(`/books/${del._id}`, { method: "DELETE" });
      setBooks((l) => l.filter((b) => b._id !== del._id));
      toast.success("Book deleted");
      setDel(null);
    } catch (err) { toast.error(err.message); }
    setBusy(false);
  };

  if (!books) return <Spinner />;
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="section-title text-center mb-10">My Books</h1>
      {books.length === 0 ? <p className="text-center opacity-70">You have not added any books yet.</p> : (
        <div className="overflow-x-auto rounded-2xl border border-sand bg-cream">
          <table className="w-full text-left">
            <thead className="bg-moss text-cream"><tr><th className="p-4">Book</th><th className="p-4">Category</th><th className="p-4">Copies</th><th className="p-4 text-right">Actions</th></tr></thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id} className="border-t border-sand">
                  <td className="p-4"><div className="flex items-center gap-3"><img src={b.image} alt="" className="w-12 h-16 object-cover rounded" /><div><p className="font-bold">{b.title}</p><p className="text-sm opacity-70">{b.author}</p></div></div></td>
                  <td className="p-4">{b.category}</td>
                  <td className="p-4">{b.copies}</td>
                  <td className="p-4"><div className="flex gap-2 justify-end">
                    <button className="btn btn-outline !py-1.5" onClick={() => setEdit(b)}>Edit</button>
                    <button className="btn !py-1.5" onClick={() => setDel(b)}>Delete</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {edit && <Modal title="Edit Book" onClose={() => setEdit(null)}><BookForm book={edit} onSubmit={save} busy={busy} label="Save Changes" /></Modal>}
      {del && (
        <Modal title="Delete this book?" onClose={() => setDel(null)}>
          <p className="mb-6">“{del.title}” will be removed permanently. This cannot be undone.</p>
          <div className="flex gap-3 justify-end">
            <button className="btn btn-outline" onClick={() => setDel(null)}>Cancel</button>
            <button className="btn" disabled={busy} onClick={remove}>{busy ? "Deleting..." : "Yes, Delete"}</button>
          </div>
        </Modal>
      )}
    </section>
  );
}
export default function Page() { return <PrivateRoute><MyBooks /></PrivateRoute>; }
