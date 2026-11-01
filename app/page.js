import Link from "next/link";
import Slider from "@/components/Slider";
import BookCard from "@/components/BookCard";

export const metadata = { title: "BookNook | Home" };

const steps = [
  ["1", "Pick a book", "Browse the shelf and open any title to see the full details."],
  ["2", "Borrow it", "Confirm in one click. It is yours for 7 days."],
  ["3", "Return it", "Done reading? Return it from My Borrows so others can enjoy it."],
];
const cats = [["Fiction", "📚"], ["Science", "🔬"], ["History", "🏛️"], ["Kids", "🧸"], ["Others", "✨"]];

async function getLatest() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`, { cache: "no-store" });
    return res.ok ? await res.json() : [];
  } catch { return []; }
}

export default async function Home() {
  const books = await getLatest();
  return (
    <>
      <Slider />
      <section className="max-w-6xl mx-auto px-4 pt-20">
        <h2 className="section-title text-center">New Arrivals</h2>
        <p className="text-center opacity-70 mt-2 mb-10">Fresh on the shelf this week</p>
        {books.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{books.map((b) => <BookCard key={b._id} book={b} />)}</div>
        ) : <p className="text-center opacity-70">No books yet. Be the first to add one!</p>}
        <div className="text-center mt-10"><Link href="/books" className="btn">See All Books</Link></div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-24">
        <h2 className="section-title text-center mb-10">How Borrowing Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(([n, t, d]) => (
            <div key={n} className="rounded-2xl bg-cream border border-sand p-8 text-center h-full">
              <div className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-rust text-white font-display text-2xl font-bold">{n}</div>
              <h3 className="text-xl font-bold mt-4">{t}</h3>
              <p className="mt-2 opacity-75">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-24">
        <h2 className="section-title text-center mb-10">Top Categories</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
          {cats.map(([c, i]) => (
            <Link key={c} href={`/books?category=${c}`} className="rounded-2xl bg-moss text-cream p-6 text-center hover:bg-rust transition">
              <div className="text-4xl">{i}</div>
              <p className="font-display font-bold mt-2">{c}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
