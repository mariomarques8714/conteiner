import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function StockBanner() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchInventory = async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select("remaining_units, total_units")
        .eq("id", 1)
        .single();

      if (!isMounted) return;
      if (error) {
        setRemaining(null);
        return;
      }
      setRemaining(data?.remaining_units ?? null);
      setTotal(data?.total_units ?? null);
    };

    fetchInventory();
    const interval = setInterval(fetchInventory, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const remainingDisplay = remaining !== null ? remaining : "--";
  const totalDisplay = total !== null ? total : "--";
  const reservedDisplay =
    remaining !== null && total !== null ? Math.max(0, total - remaining) : "--";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white font-bold text-center py-1">
      <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] opacity-80">
        Estoque disponível neste contêiner
      </div>
      <div className="text-base sm:text-lg uppercase">
        {remainingDisplay} camisas restantes
      </div>
      <div className="text-[9px] sm:text-[10px] opacity-80">
        Reservadas: {reservedDisplay} de {totalDisplay}
      </div>
    </div>
  );
}
