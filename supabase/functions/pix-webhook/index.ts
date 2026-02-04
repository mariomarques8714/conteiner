import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-webhook-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface AbacatePayWebhookPayload {
  event: string;
  data: {
    pixQrCode?: {
      id?: string;
      status?: string;
      paidAt?: string;
    };
    id?: string;
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const webhookSecret = Deno.env.get("ABACATEPAY_WEBHOOK_SECRET");
    const receivedSecret = req.headers.get("x-webhook-secret") || req.headers.get("authorization");

    if (!webhookSecret) {
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isValidSecret = receivedSecret === webhookSecret || receivedSecret === `Bearer ${webhookSecret}`;
    if (!isValidSecret) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload: AbacatePayWebhookPayload = await req.json();
    const { event, data } = payload;

    const pixQrcodeId = data?.pixQrCode?.id || data?.id;
    const pixStatus = data?.pixQrCode?.status;

    if (!pixQrcodeId) {
      return new Response(
        JSON.stringify({ error: "Invalid webhook payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: order } = await supabase
      .from("orders")
      .select("id, status, metadata")
      .eq("pix_qrcode_id", pixQrcodeId)
      .maybeSingle();

    const { data: pixTx } = await supabase
      .from("pix_transactions")
      .select("status")
      .eq("pix_id", pixQrcodeId)
      .maybeSingle();

    const now = new Date().toISOString();

    if (event === "pix.paid" || event === "billing.paid") {
      const paidAt = data?.pixQrCode?.paidAt || now;

      if (pixTx?.status === "PAID") {
        return new Response(
          JSON.stringify({ success: true, status: "paid" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      await supabase
        .from("pix_transactions")
        .update({ status: "PAID", paid_at: paidAt, updated_at: now })
        .eq("pix_id", pixQrcodeId);

      if (order) {
        await supabase
          .from("orders")
          .update({ status: "paid", updated_at: now })
          .eq("id", order.id)
          .eq("status", "pending");
      }

      // Recalculate inventory from paid orders to avoid race conditions
      const { data: paidOrders } = await supabase
        .from("orders")
        .select("metadata")
        .eq("status", "paid");

      const soldUnits = (paidOrders || []).reduce((sum, row) => {
        const totalUnitsRaw = row.metadata?.total_units;
        const totalUnits = totalUnitsRaw ? Number(totalUnitsRaw) : 0;
        return Number.isFinite(totalUnits) ? sum + totalUnits : sum;
      }, 0);

      const { data: inventory } = await supabase
        .from("inventory")
        .select("total_units")
        .eq("id", 1)
        .single();

      if (inventory) {
        const newRemaining = Math.max(0, inventory.total_units - soldUnits);
        await supabase
          .from("inventory")
          .update({ remaining_units: newRemaining, updated_at: now })
          .eq("id", 1);
      }

      return new Response(
        JSON.stringify({ success: true, status: "paid" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (event === "pix.expired" || pixStatus === "EXPIRED") {
      await supabase
        .from("pix_transactions")
        .update({ status: "EXPIRED", updated_at: now })
        .eq("pix_id", pixQrcodeId);

      if (order) {
        await supabase
          .from("orders")
          .update({ status: "expired", updated_at: now })
          .eq("id", order.id)
          .eq("status", "pending");
      }

      return new Response(
        JSON.stringify({ success: true, status: "expired" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Event received", event }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
