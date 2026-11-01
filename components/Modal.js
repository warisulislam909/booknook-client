"use client";
export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4" onClick={onClose}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-paper p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-moss">{title}</h3>
          <button onClick={onClose} className="text-2xl leading-none cursor-pointer" aria-label="Close">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
