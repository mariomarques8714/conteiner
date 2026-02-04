import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Expired() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-lg space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Pagamento expirado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              O prazo do PIX expirou. Você pode iniciar uma nova reserva.
            </p>
            <Button onClick={() => navigate("/checkout")} className="w-full">
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
