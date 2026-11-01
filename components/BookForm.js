"use client";
import { CATEGORIES } from "@/lib/api";

export default function BookForm({ book = {}, onSubmit, busy, label, user, withImage = true }) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div><label className="label">Book Title</label><input name="title" required className="input" defaultValue={book.title} placeholder="e.g. The Silent Library" /></div>
      <div><label className="label">Author Name</label><input name="author" required className="input" defaultValue={book.author} placeholder="e.g. Humayun Ahmed" /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Category</label>
          <select name="category" className="input" defaultValue={book.category || CATEGORIES[0]}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <div><label className="label">Total Copies</label><input name="copies" type="number" min="1" required className="input" defaultValue={book.copies ?? 1} /></div>
      </div>
      {withImage && <div><label className="label">Book Image {book.image && "(leave empty to keep current)"}</label><input name="image" type="file" accept="image/*" required={!book.image} className="input" /></div>}
      <div><label className="label">Short Description</label><textarea name="description" required rows="4" className="input" defaultValue={book.description} placeholder="What is this book about?" /></div>
      {user && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label">Your Name</label><input className="input" readOnly value={user.name} /></div>
          <div><label className="label">Your Email</label><input className="input" readOnly value={user.email} /></div>
        </div>
      )}
      <button className="btn" disabled={busy}>{busy ? "Saving..." : label}</button>
    </form>
  );
}
