import { usePreSaleCountdown } from "@/hooks/usePreSaleCountdown";
import { CONTENT } from "@/lib/content";

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center min-w-[48px] sm:min-w-[56px]">
      <span className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-90 font-medium">
        {label}
      </span>
    </div>
  );
}

function TimeSeparator() {
  return (
    <span className="text-2xl sm:text-3xl font-bold opacity-50 mx-0.5">:</span>
  );
}

export function PreSaleCountdown() {
  const { days, hours, minutes, seconds, isExpired } = usePreSaleCountdown();
  const content = CONTENT.countdown;

  if (isExpired) {
    return (
      <div className="w-full bg-countdown text-countdown-foreground min-h-[64px] flex items-center">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm sm:text-base font-bold">
            {content.expiredMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-countdown text-countdown-foreground min-h-[64px] flex items-center py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">
            {content.label}
          </span>
          
          <div className="flex items-center">
            <TimeUnit value={days} label={content.units.days} />
            <TimeSeparator />
            <TimeUnit value={hours} label={content.units.hours} />
            <TimeSeparator />
            <TimeUnit value={minutes} label={content.units.minutes} />
            <TimeSeparator />
            <TimeUnit value={seconds} label={content.units.seconds} />
          </div>
        </div>
      </div>
      {/* Divider line - system element */}
      <div className="w-full h-px bg-border" />
    </>
  );
}
