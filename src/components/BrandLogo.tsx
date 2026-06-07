interface BrandLogoProps {
  textTone?: "light" | "dark";
  compact?: boolean;
  size?: "sm" | "md";
}

export default function BrandLogo({
  textTone = "light",
  compact = false,
  size = "md",
}: BrandLogoProps) {
  const titleTone = textTone === "light" ? "text-cream" : "text-charcoal";
  const subtitleTone =
    textTone === "light" ? "text-cream/55" : "text-coffee/70";
  const ringTone =
    textTone === "light"
      ? "ring-cream/15 bg-cream/5"
      : "ring-coffee/10 bg-white/70";
  const box = size === "sm" ? "h-11 w-11" : "h-12 w-12";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative ${box} shrink-0 overflow-hidden rounded-full ring-1 shadow-lg shadow-black/10 ${ringTone}`}
      >
        <img
          src="/images/logo-maicha.png"
          alt="Maicha Coffee & Eatery"
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* Overlay cokelat */}
        <div className="absolute inset-0 bg-brown/10 pointer-events-none" />
      </div>


        <div className="text-left">
          <p
            className={`font-display text-lg font-bold leading-none tracking-tight ${titleTone}`}
          >
            Maicha
          </p>
          <p
            className={`mt-0.5 text-[9px] font-bold uppercase tracking-[0.28em] ${subtitleTone}`}
          >
            Coffee & Eatery
          </p>
        </div>
    </div>
  );
}
