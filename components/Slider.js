"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { t: "Find your next favourite story", d: "Hundreds of books shared by readers just like you, waiting on the shelf.", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600" },
  { t: "Borrow today, return anytime", d: "Grab a book for a few days and hand it back with one click. No fines, no fuss.", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600" },
  { t: "Got a book collecting dust?", d: "Add it to BookNook and let someone else fall in love with it.", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600" },
];

export default function Slider() {
  return (
    <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4500 }} pagination={{ clickable: true }} loop className="h-[70vh] min-h-[420px]">
      {slides.map((s) => (
        <SwiperSlide key={s.t}>
          <div className="relative h-full bg-cover bg-center" style={{ backgroundImage: `url(${s.img})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-moss/90 via-moss/60 to-transparent" />
            <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center items-start text-cream">
              <h1 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight">{s.t}</h1>
              <p className="mt-4 max-w-lg text-lg opacity-90">{s.d}</p>
              <Link href="/books" className="btn mt-8">Browse Books</Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
