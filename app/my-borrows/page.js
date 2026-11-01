"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api, fmtDate } from "@/lib/api";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";

function MyBorrows() {
  useTitle("My Borrows");
  const [list, setList] = useState(null);
  const [busyId, setBusyId] = useState(null);
  useEffect(() => { api("/borrows").then(setList).catch((e) => { toast.error(e.message); setList([]); }); }, []);

  const giveBack = async (id) => {
    setBusyId(id);
    try {
      await api(`/borrows/${id}`, { method: "DELETE" });
      setList((l) => l.filter((b) => b._id !== id));
      toast.success("Book returned. Thank you!");
    } catch (e) { toast.error(e.message); }
    setBusyId(null);
  };

  if (!list) return <Spinner />;
  return (
    <section className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="section-title text-center mb-10">My Borrows</h1>
      {list.length === 0 ? <p className="text-center opacity-70">You have not borrowed any books.</p> : (
        <div className="overflow-x-auto rounded-2xl border border-sand bg-cream">
          <table className="w-full text-left">
            <thead className="bg-moss text-cream"><tr><th className="p-4">Image</th><th className="p-4">Title</th><th className="p-4">Borrowed</th><th className="p-4">Return By</th><th className="p-4"></th></tr></thead>
            <tbody>
              {list.map((b) => (
                <tr key={b._id} className="border-t border-sand">
                  <td className="p-4"><img src={b.bookImage} alt="" className="w-12 h-16 object-cover rounded" /></td>
                  <td className="p-4 font-bold">{b.bookTitle}</td>
                  <td className="p-4">{fmtDate(b.borrowDate)}</td>
                  <td className="p-4">{fmtDate(b.returnDate)}</td>
                  <td className="p-4"><button className="btn !py-1.5" disabled={busyId === b._id} onClick={() => giveBack(b._id)}>Return Book</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
export default function Page() { return <PrivateRoute><MyBorrows /></PrivateRoute>; }
