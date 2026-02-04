-- Inventory table for remaining stock
CREATE TABLE public.inventory (
  id INTEGER PRIMARY KEY,
  total_units INTEGER NOT NULL,
  remaining_units INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

INSERT INTO public.inventory (id, total_units, remaining_units)
VALUES (1, 200, 200)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read inventory"
ON public.inventory
FOR SELECT
USING (true);
