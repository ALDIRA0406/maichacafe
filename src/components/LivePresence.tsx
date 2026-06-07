import { useEffect, useState } from 'react';

export default function LivePresence() {
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const jktTime = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false });
      const hours = parseInt(jktTime.split(':')[0]);
      setTime(jktTime);
      setIsOpen(hours >= 8 && hours < 22);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed bottom-10 left-10 z-[100] hidden lg:flex items-center gap-6 pointer-events-none">
      <div className="flex flex-col gap-1">
        <span className="text-[8px] font-bold tracking-[0.4em] text-matcha uppercase italic">Status</span>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-matcha shadow-[0_0_8px_#7A5C3E]' : 'bg-leaf'}`} />
          <span className="text-xs text-cream/80 font-medium tracking-wider">
            {isOpen ? 'Maicha is currently open' : 'Maicha is closed for now'}
          </span>
        </div>
      </div>
      <div className="w-[1px] h-8 bg-cream/10" />
      <div className="flex flex-col gap-1">
        <span className="text-[8px] font-bold tracking-[0.4em] text-matcha uppercase italic">Local Time</span>
        <span className="text-xs text-cream/80 font-medium tracking-wider">{time} — Jakarta, ID</span>
      </div>
    </div>
  );
}
