-- Reset payment-related schema for clean integration restart
-- Drops orders/pix tables, enums, sequence, and trigger function if they exist

DROP TABLE IF EXISTS public.pix_transactions CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;

DROP TYPE IF EXISTS public.pix_status;
DROP TYPE IF EXISTS public.order_status;

DROP SEQUENCE IF EXISTS public.order_number_seq;
DROP FUNCTION IF EXISTS public.generate_order_number();
