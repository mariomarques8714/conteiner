import { useEffect, useMemo, useState } from "react";

export function StockBanner() {
  const [timeLeftMs, setTimeLeftMs] = useState<number | null>(null);

  const deadline = useMemo(() => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 0, 0);
    return end.getTime();
  }, []);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      setTimeLeftMs(Math.max(0, deadline - now));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const formattedTime = useMemo(() => {
    if (timeLeftMs === null) return "--:--:--";
    const totalSeconds = Math.floor(timeLeftMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(":");
  }, [timeLeftMs]);

  const isClosed = timeLeftMs !== null && timeLeftMs <= 0;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white font-bold text-center py-1">
      <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] opacity-80">
        Pedidos abertos até 23:59 de hoje
      </div>
      <div className="mt-1 flex items-center justify-center gap-2 text-base sm:text-lg uppercase">
        <span className="text-[10px] sm:text-xs opacity-80 tracking-[0.2em]">
          TEMPO RESTANTE
        </span>
        <span className="px-2 py-0.5 rounded bg-white/45 text-white border border-white/40 shadow-sm">
          {isClosed ? "Prazo encerrado" : formattedTime}
        </span>
      </div>
      <div className="text-[9px] sm:text-[10px] opacity-80">
        {isClosed ? "Contêiner fechado" : ""}
      </div>
    </div>
  );
}
