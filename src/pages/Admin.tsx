import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type OrderRow = {
  id: string;
  status: string;
  customer: {
    name?: string;
    email?: string;
    taxId?: string;
    cellphone?: string;
  };
  pix_qrcode_id?: string | null;
  created_at: string;
};

type PixRow = {
  pix_id: string;
  amount: number;
  status: string;
  created_at: string;
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [pixMap, setPixMap] = useState<Record<string, PixRow>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-orders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": passwordInput,
        },
      }
    );

    if (!response.ok) {
      setIsLoading(false);
      return;
    }

    const data = await response.json();
    const pixById: Record<string, PixRow> = {};
    for (const item of data.pix || []) {
      pixById[item.pix_id] = item;
    }

    setOrders(data.orders || []);
    setPixMap(pixById);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const filtered = orders.filter((order) => {
    const text = filter.toLowerCase();
    const matchesText =
      order.customer?.name?.toLowerCase().includes(text) ||
      order.customer?.email?.toLowerCase().includes(text) ||
      order.customer?.taxId?.toLowerCase().includes(text) ||
      order.customer?.cellphone?.toLowerCase().includes(text);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    if (!text) return matchesStatus;
    return matchesText && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mx-auto max-w-md space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Acesso Admin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                placeholder="Senha"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={() => {
                  if (passwordInput) {
                    setIsAuthenticated(true);
                  } else {
                    setPasswordInput("");
                  }
                }}
              >
                Entrar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-5xl space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Admin — Pedidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Buscar por nome, email, CPF ou celular"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <select
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="pending">Pendentes</option>
                <option value="paid">Pagos</option>
                <option value="expired">Expirados</option>
              </select>
              <Button onClick={fetchData} disabled={isLoading}>
                {isLoading ? "Atualizando..." : "Atualizar"}
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2">Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Celular</th>
                    <th>Status</th>
                    <th>Valor</th>
                    <th>Pix ID</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => {
                    const pix = order.pix_qrcode_id ? pixMap[order.pix_qrcode_id] : null;
                    return (
                      <tr key={order.id} className="border-t">
                        <td className="py-2">{order.customer?.name || "-"}</td>
                        <td>{order.customer?.email || "-"}</td>
                        <td>{order.customer?.taxId || "-"}</td>
                        <td>
                          {order.customer?.cellphone ? (
                            <a
                              className="text-blue-600 hover:underline"
                              href={`https://wa.me/55${order.customer.cellphone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {order.customer.cellphone}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>{order.status}</td>
                        <td>{pix ? `R$ ${(pix.amount / 100).toFixed(2)}` : "-"}</td>
                        <td className="max-w-[160px] truncate">{order.pix_qrcode_id || "-"}</td>
                        <td>{new Date(order.created_at).toLocaleString("pt-BR")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
