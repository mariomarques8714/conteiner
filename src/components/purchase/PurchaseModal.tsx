import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/validators";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PurchaseModal({ isOpen, onClose }: PurchaseModalProps) {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [buyerName, setBuyerName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gradeQuantity, setGradeQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalAmount = gradeQuantity * 400 * 100;

  useEffect(() => {
    if (!isOpen) {
      setBuyerName("");
      setCpf("");
      setEmail("");
      setPhone("");
      setGradeQuantity(1);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            buyer_name: buyerName,
            cpf,
            email,
            contact_phone: phone,
            grade_quantity: gradeQuantity,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar pedido");
      }

      const orderData = await response.json();
      const params = new URLSearchParams({
        order_id: orderData.order_id,
        access_token: orderData.access_token,
        br_code: orderData.br_code,
        br_code_base64: orderData.br_code_base64,
        expires_at: orderData.expires_at,
        buyer_name: buyerName,
        grade_quantity: String(gradeQuantity),
        total_units: String(gradeQuantity * 10),
        amount: String(orderData.amount),
      });
      onClose();
      navigate(`/pix?${params.toString()}`);
    } catch (error) {
      toast({
        title: "Erro ao criar pedido",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Finalizar compra</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome completo</label>
              <Input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CPF</label>
              <Input value={cpf} onChange={(e) => setCpf(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Telefone (com DDD)</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantidade de grades</label>
              <Input
                type="number"
                min={1}
                value={gradeQuantity}
                onChange={(e) => setGradeQuantity(Number(e.target.value))}
                required
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Valor total: <span className="font-semibold text-foreground">{formatCurrency(totalAmount / 100)}</span>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Gerando PIX..." : "Gerar PIX"}
            </Button>
          </form>
      </DialogContent>
    </Dialog>
  );
}
