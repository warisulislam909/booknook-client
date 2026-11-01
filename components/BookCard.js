import Link from "next/link";
export default function BookCard({ book }) {
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-cream border border-sand shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
      <img src={book.image} alt={book.title} className="w-full h-64 object-cover" />
      <div className="flex flex-col flex-1 p-5">
        <span className="self-start text-xs font-semibold uppercase tracking-wide bg-sand text-moss px-3 py-1 rounded-full">{book.category}</span>
        <h3 className="mt-3 text-xl font-bold line-clamp-1">{book.title}</h3>
        <p className="text-sm opacity-70 mb-4">by {book.author}</p>
        <Link href={`/books/${book._id}`} className="btn mt-auto">View Details</Link>
      </div>
    </div>
  );
}
