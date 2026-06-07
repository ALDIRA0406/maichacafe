import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/10 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-matcha/10 blur-3xl pointer-events-none" />
      <div className="absolute top-8 right-0 w-48 h-48 rounded-full bg-gold/15 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-sage/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-40 h-40 rounded-full bg-leaf/10 blur-2xl pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <div className="-ml-1.5">
              <BrandLogo textTone="light" />
            </div>
          </div>
          <div>
            <p className="text-cream/40 text-sm text-center sm:text-right">
              2026 @kelompok 3 PKM teknik informatika
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
