import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CreateOrderRequest {
  buyer_name: string;
  cpf: string;
  email: string;
  contact_phone: string;
  grade_quantity: number;
}

const PRICE_PER_GRADE_CENTS = 400 * 100;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body: CreateOrderRequest = await req.json();
    const { buyer_name, cpf, email, contact_phone, grade_quantity } = body;

    if (!buyer_name || !cpf || !email || !contact_phone || !grade_quantity) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (grade_quantity < 1) {
      return new Response(
        JSON.stringify({ error: "Quantidade mínima: 1 grade" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ error: "E-mail inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const cleanCpf = cpf.replace(/\D/g, "");
    const cleanPhone = contact_phone.replace(/\D/g, "");
    const cleanEmail = email.trim().toLowerCase();

    if (cleanCpf.length !== 11) {
      return new Response(
        JSON.stringify({ error: "CPF inválido (11 dígitos)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return new Response(
        JSON.stringify({ error: "Telefone inválido (inclua DDD)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const totalUnits = grade_quantity * 10;
    const amountCents = grade_quantity * PRICE_PER_GRADE_CENTS;
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    const { data: inventory, error: inventoryError } = await supabase
      .from("inventory")
      .select("remaining_units")
      .eq("id", 1)
      .single();

    if (inventoryError || !inventory) {
      console.error("Inventory not configured");
      return new Response(
        JSON.stringify({ error: "Estoque indisponível no momento" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (inventory.remaining_units < totalUnits) {
      return new Response(
        JSON.stringify({ error: "Estoque insuficiente" }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const abacateApiKey = Deno.env.get("ABACATEPAY_API_KEY");
    if (!abacateApiKey) {
      console.error("ABACATEPAY_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Payment gateway not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const baseUrl = Deno.env.get("ABACATEPAY_BASE_URL") || "https://api.abacatepay.com";
    const description = `Pré-venda Camisa Brasil 2026 - ${grade_quantity} grade(s) - ${totalUnits} unidades`.slice(0, 140);

    // 1) Create customer
    const customerPayload = {
      name: buyer_name.trim().slice(0, 100),
      cellphone: cleanPhone,
      email: cleanEmail,
      taxId: cleanCpf,
    };

    const customerResponse = await fetch(`${baseUrl}/v1/customer/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${abacateApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerPayload),
    });

    if (!customerResponse.ok) {
      const errorText = await customerResponse.text();
      console.error("AbacatePay customer error:", errorText);
      return new Response(
        JSON.stringify({ error: "Erro ao criar cliente" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const customerData = await customerResponse.json();
    const customerId = customerData?.data?.id || null;

    // 2) Create Pix QR Code
    const pixPayload = {
      amount: amountCents,
      expiresIn: 1800,
      description,
      customer: customerPayload,
      metadata: {
        grade_quantity: String(grade_quantity),
        total_units: String(totalUnits),
        source: "landing_operacao_copa",
        customer_id: customerId || "",
      },
    };

    const pixResponse = await fetch(`${baseUrl}/v1/pixQrCode/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${abacateApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pixPayload),
    });

    if (!pixResponse.ok) {
      const errorText = await pixResponse.text();
      console.error("AbacatePay error:", errorText);
      return new Response(
        JSON.stringify({ error: "Erro ao gerar QR Code Pix" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const pixData = await pixResponse.json();
    const pixQrcodeId = pixData.data?.id || pixData.id;
    const brCode = pixData.data?.brCode || pixData.brCode;
    const brCodeBase64 = pixData.data?.brCodeBase64 || pixData.brCodeBase64;
    const pixExpiresAt = pixData.data?.expiresAt || pixData.expiresAt || expiresAt.toISOString();

    if (!pixQrcodeId || !brCode) {
      console.error("Invalid AbacatePay response:", JSON.stringify(pixData));
      return new Response(
        JSON.stringify({ error: "Resposta inválida do gateway de pagamento" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer: {
          id: customerId,
          name: customerPayload.name,
          email: customerPayload.email,
          taxId: customerPayload.taxId,
          cellphone: customerPayload.cellphone,
        },
        pix_qrcode_id: pixQrcodeId,
        pix_expires_at: pixExpiresAt,
        status: "pending",
        updated_at: new Date().toISOString(),
        metadata: {
          grade_quantity: String(grade_quantity),
          total_units: String(totalUnits),
        },
      })
      .select("id, access_token")
      .single();

    if (orderError || !order) {
      console.error("Order creation error:", orderError);
      return new Response(
        JSON.stringify({ error: "Erro ao criar pedido" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error: pixTxError } = await supabase.from("pix_transactions").insert({
      pix_id: pixQrcodeId,
      order_id: order.id,
      amount: amountCents,
      status: "PENDING",
      br_code: brCode,
      br_code_base64: brCodeBase64,
      expires_at: pixExpiresAt,
      updated_at: new Date().toISOString(),
      metadata: {
        customer_id: customerId || "",
      },
    });

    if (pixTxError) {
      console.error("Pix transaction creation error:", pixTxError);
      await supabase.from("orders").delete().eq("id", order.id);
      return new Response(
        JSON.stringify({ error: "Erro ao registrar transação Pix" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        order_id: order.id,
        access_token: order.access_token,
        amount: amountCents,
        total_units: totalUnits,
        pix_id: pixQrcodeId,
        br_code: brCode,
        br_code_base64: brCodeBase64,
        expires_at: pixExpiresAt,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in create-order:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
