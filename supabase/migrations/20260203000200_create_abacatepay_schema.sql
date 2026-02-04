-- Fresh schema for AbacatePay integration (reset)

-- Enums for order and Pix status
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'expired');
CREATE TYPE public.pix_status AS ENUM ('PENDING', 'PAID', 'EXPIRED');

-- Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token UUID NOT NULL DEFAULT gen_random_uuid(),
  customer JSONB NOT NULL,
  status public.order_status NOT NULL DEFAULT 'pending',
  pix_qrcode_id TEXT,
  pix_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Pix transactions table
CREATE TABLE public.pix_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pix_id TEXT NOT NULL UNIQUE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  status public.pix_status NOT NULL DEFAULT 'PENDING',
  br_code TEXT,
  br_code_base64 TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX idx_orders_access_token ON public.orders(access_token);
CREATE INDEX idx_orders_pix_qrcode_id ON public.orders(pix_qrcode_id);
CREATE INDEX idx_pix_transactions_pix_id ON public.pix_transactions(pix_id);

-- RLS: deny all direct access (use service role via Edge Functions)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pix_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny all direct access to orders"
ON public.orders
FOR ALL
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny all direct access to pix_transactions"
ON public.pix_transactions
FOR ALL
USING (false)
WITH CHECK (false);
