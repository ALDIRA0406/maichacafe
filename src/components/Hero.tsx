import { useEffect, useState } from "react";

export default function Hero() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 2000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[90svh] sm:min-h-screen overflow-hidden bg-charcoal text-cream"
    >
      {/* Cinematic Background Layers (Plain Warm Color) */}
      <div className="absolute inset-0 z-0 bg-[#35251d]">
        {/* Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-moss/15 via-transparent to-coffee/10" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Animated Light Orbs — reduced size on mobile for performance */}
        <div className="absolute top-[20%] left-[10%] h-[20rem] w-[20rem] sm:h-[40rem] sm:w-[40rem] rounded-full bg-gold/15 blur-[80px] sm:blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-[-10%] right-[5%] h-[18rem] w-[18rem] sm:h-[35rem] sm:w-[35rem] rounded-full bg-matcha/15 blur-[60px] sm:blur-[100px] animate-glow-pulse" />

        {/* Grain/Noise Texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px] sm:bg-[size:100px_100px]" />

      <div className="relative z-10 min-h-[90svh] sm:min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20 text-center">
        {/* Label with Line Accents */}
        <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12 overflow-hidden">
          <div
            className="h-[1px] bg-gradient-to-r from-transparent to-gold/50 transition-all duration-1000"
            style={{ width: phase >= 1 ? "60px" : "0px" }}
          />
          <span
            className="text-[9px] sm:text-[10px] font-bold tracking-[0.5em] sm:tracking-[0.6em] uppercase text-gold/80 transition-all duration-1000"
            style={{
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "translateY(0)" : "translateY(15px)",
            }}
          >
            The Essence of Calm
          </span>
          <div
            className="h-[1px] bg-gradient-to-l from-transparent to-gold/50 transition-all duration-1000"
            style={{ width: phase >= 1 ? "60px" : "0px" }}
          />
        </div>

        {/* Main Heading */}
        <div className="relative mb-6 sm:mb-8">
          <h1
            className="font-display font-black leading-none tracking-[-0.05em] transition-all duration-[2s] cubic-bezier(0.16, 1, 0.3, 1) text-transparent bg-clip-text bg-gradient-to-br from-cream via-gold/90 to-matcha/40"
            style={{
              fontSize: "clamp(4.5rem, 18vw, 15rem)",
              transform:
                phase >= 2
                  ? "translateY(0) scale(1)"
                  : "translateY(80px) scale(0.95)",
              opacity: phase >= 2 ? 1 : 0,
              filter:
                phase >= 2
                  ? "blur(0) drop-shadow(0 20px 40px rgba(0,0,0,0.3))"
                  : "blur(15px)",
            }}
          >
            MAICHA
          </h1>
          {/* Subtle Dynamic Underglow */}
          <div
            className="absolute -inset-10 bg-gradient-to-r from-gold/10 via-matcha/5 to-transparent blur-[80px] rounded-full transition-opacity duration-[2s]"
            style={{
              opacity: phase >= 2 ? 0.6 : 0,
              transform: `scale(${phase >= 2 ? 1 : 0.8})`,
            }}
          />
        </div>

        {/* Subheading */}
        <div className="overflow-hidden mb-6 sm:mb-10">
          <p
            className="font-display text-gold italic font-light tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-[1.5s]"
            style={{
              fontSize: "clamp(1.2rem, 4vw, 3rem)",
              transform: phase >= 3 ? "translateY(0)" : "translateY(100%)",
              opacity: phase >= 3 ? 1 : 0,
            }}
          >
            Coffee &amp; Eatery
          </p>
        </div>

        {/* Description — hidden on very small screens to reduce scroll */}
        <p
          className="hidden sm:block max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-cream/70 transition-all duration-[1.5s]"
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(30px)",
          }}
        >
          Kafe modern yang menghadirkan perpaduan antara cita rasa kopi berkualitas, suasana yang nyaman, dan ruang yang mendukung berbagai aktivitas. Tidak hanya menjadi tempat untuk menikmati makanan dan minuman, Maicha Coffee juga menjadi ruang berkumpul, bekerja, belajar, dan berkolaborasi bagi masyarakat dengan konsep yang hangat, kreatif, dan inspiratif.
        </p>

        {/* Mobile description — shorter */}
        <p
          className="sm:hidden max-w-xs text-sm leading-relaxed text-cream/60 px-2 transition-all duration-[1.5s]"
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(30px)",
          }}
        >
          Kafe modern dengan kopi berkualitas, suasana nyaman, dan ruang hangat untuk berkumpul, bekerja, dan berkolaborasi.
        </p>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-8 sm:mt-12 w-full max-w-xs sm:max-w-none sm:w-auto transition-all duration-[1.5s]"
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <a
            href="#menu"
            className="group relative px-8 sm:px-12 py-4 sm:py-5 bg-gold text-moss font-bold text-[11px] uppercase tracking-[0.25em] rounded-none overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(212,163,115,0.3)] text-center"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-gold">
              Explore Menu
            </span>
            <div className="absolute inset-0 bg-moss translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>

          <a
            href="#space"
            className="group relative px-8 sm:px-12 py-4 sm:py-5 border border-white/20 text-white font-bold text-[11px] uppercase tracking-[0.25em] rounded-none transition-all duration-500 hover:border-gold hover:text-gold text-center"
          >
            <span className="relative z-10">Our Room</span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>

      {/* Refined Scroll Indicator — hidden on mobile xs */}
      <div
        className="hidden sm:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-4 transition-all duration-1000"
        style={{ opacity: phase >= 4 ? 1 : 0 }}
      >
        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-gold/60">
          Scroll to Explore
        </span>
        <div className="h-20 w-[1px] bg-gradient-to-b from-gold/80 via-gold/20 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/40 -translate-y-full animate-[marquee_2s_linear_infinite]" />
        </div>
      </div>
    </section>
  );
}
