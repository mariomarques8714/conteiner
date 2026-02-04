import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const orderId = url.searchParams.get("order_id");
    const accessToken = url.searchParams.get("access_token");

    if (!orderId || !accessToken) {
      return new Response(
        JSON.stringify({ error: "order_id e access_token são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, status, customer, pix_expires_at, pix_qrcode_id")
      .eq("id", orderId)
      .eq("access_token", accessToken)
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: "Pedido não encontrado" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: pixTx } = await supabase
      .from("pix_transactions")
      .select("status, paid_at, expires_at, amount")
      .eq("pix_id", order.pix_qrcode_id)
      .single();

    const now = new Date();
    const expiresAt = pixTx?.expires_at ? new Date(pixTx.expires_at) : null;

    if (pixTx && pixTx.status === "PENDING" && expiresAt && expiresAt < now) {
      await supabase
        .from("pix_transactions")
        .update({ status: "EXPIRED", updated_at: now.toISOString() })
        .eq("pix_id", order.pix_qrcode_id);

      await supabase
        .from("orders")
        .update({ status: "expired", updated_at: now.toISOString() })
        .eq("id", orderId)
        .eq("status", "pending");
    }

    if (pixTx && pixTx.status === "PENDING" && order.pix_qrcode_id) {
      const abacateApiKey = Deno.env.get("ABACATEPAY_API_KEY");
      const baseUrl = Deno.env.get("ABACATEPAY_BASE_URL") || "https://api.abacatepay.com";

      if (abacateApiKey) {
        const checkResponse = await fetch(
          `${baseUrl}/v1/pixQrCode/check?id=${order.pix_qrcode_id}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${abacateApiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (checkResponse.ok) {
          const checkData = await checkResponse.json();
          const abacateStatus = checkData.data?.status || checkData.status;
          const abacateExpiresAt = checkData.data?.expiresAt || checkData.expiresAt;

          if (abacateStatus === "PAID") {
            const paidAt = checkData.data?.paidAt || checkData.paidAt || now.toISOString();

            await supabase
              .from("pix_transactions")
              .update({ status: "PAID", paid_at: paidAt, updated_at: now.toISOString() })
              .eq("pix_id", order.pix_qrcode_id);

            await supabase
              .from("orders")
              .update({ status: "paid", updated_at: now.toISOString() })
              .eq("id", orderId)
              .eq("status", "pending");
          }

          if (abacateStatus === "EXPIRED") {
            await supabase
              .from("pix_transactions")
              .update({ status: "EXPIRED", updated_at: now.toISOString() })
              .eq("pix_id", order.pix_qrcode_id);

            await supabase
              .from("orders")
              .update({ status: "expired", updated_at: now.toISOString() })
              .eq("id", orderId)
              .eq("status", "pending");
          }

          if (abacateExpiresAt && !order.pix_expires_at) {
            await supabase
              .from("orders")
              .update({ pix_expires_at: abacateExpiresAt, updated_at: now.toISOString() })
              .eq("id", orderId);
          }
        }
      }
    }

    const { data: refreshedPix } = await supabase
      .from("pix_transactions")
      .select("status, paid_at, expires_at, amount")
      .eq("pix_id", order.pix_qrcode_id)
      .single();

    const { data: refreshedOrder } = await supabase
      .from("orders")
      .select("status")
      .eq("id", orderId)
      .single();

    return new Response(
      JSON.stringify({
        order_id: order.id,
        status: refreshedOrder?.status || order.status,
        pix_status: refreshedPix?.status || pixTx?.status || null,
        paid_at: refreshedPix?.paid_at || pixTx?.paid_at || null,
        expires_at: refreshedPix?.expires_at || pixTx?.expires_at || order.pix_expires_at,
        amount: refreshedPix?.amount || pixTx?.amount || null,
        customer: order.customer,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in check-order-status:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
