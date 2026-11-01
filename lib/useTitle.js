"use client";
import { useEffect } from "react";
export default function useTitle(t) {
  useEffect(() => { document.title = `BookNook | ${t}`; }, [t]);
}
