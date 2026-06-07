import { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
  bg?: 'cream' | 'charcoal' | 'transparent' | 'brown'| 'espresso';
}

export default function SectionWrapper({
  id,
  className = '',
  children,
  bg = 'cream',
}: SectionWrapperProps) {
  const bgClasses = {
    cream: 'bg-cream text-charcoal',
    charcoal: 'bg-charcoal text-cream',
    transparent: 'bg-transparent',
    brown: 'bg-brown text-cream',
    espresso: 'bg-espresso text-cream',
  };

  return (
    <section id={id} className={`py-20 md:py-32 ${bgClasses[bg]} ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
