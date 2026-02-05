import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/validators";

type AdminCustomer = {
  name?: string;
  email?: string;
  taxId?: string;
  cellphone?: string;
};

type AdminOrder = {
  id: string;
  status: string;
  customer?: AdminCustomer;
  pix_qrcode_id?: string;
  created_at?: string;
};

type AdminPix = {
  pix_id: string;
  amount: number;
  status: string;
  created_at?: string;
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [pix, setPix] = useState<AdminPix[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-orders`,
        {
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            "x-admin-token": password,
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Erro ${response.status}`);
      }

      const data = await response.json();
      setOrders(data?.orders ?? []);
      setPix(data?.pix ?? []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Falha ao buscar pedidos.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) {
        return false;
      }

      if (!normalized) return true;

      const customer = order.customer || {};
      const haystack = [
        order.id,
        order.pix_qrcode_id,
        customer.name,
        customer.email,
        customer.taxId,
        customer.cellphone,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [orders, search, statusFilter]);

  const formatDate = (value?: string) => {
    if (!value) return "-";
    return new Date(value).toLocaleString("pt-BR");
  };

  const getWhatsappLink = (cellphone?: string) => {
    if (!cellphone) return null;
    const digits = cellphone.replace(/\D/g, "");
    if (!digits) return null;
    return `https://wa.me/55${digits}`;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Admin - Pedidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Input
                type="password"
                placeholder="Senha do admin"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button onClick={handleFetch} disabled={!password || loading}>
                {loading ? "Carregando..." : "Buscar pedidos"}
              </Button>
            </div>

            {error && (
              <div className="text-sm text-destructive">{error}</div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                type="text"
                placeholder="Buscar por nome, email, CPF, telefone ou ID"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <select
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">Todos</option>
                <option value="paid">Pago</option>
                <option value="pending">Pendente</option>
                <option value="expired">Expirado</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="py-2 pr-4">Cliente</th>
                  <th className="py-2 pr-4">Contato</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Pix</th>
                  <th className="py-2 pr-4">Criado</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const whatsappLink = getWhatsappLink(order.customer?.cellphone);
                  return (
                    <tr key={order.id} className="border-t border-border">
                      <td className="py-3 pr-4">
                        <div className="font-medium text-foreground">
                          {order.customer?.name || "-"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.customer?.taxId || "-"}
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="text-foreground">
                          {order.customer?.email || "-"}
                        </div>
                        {order.customer?.cellphone ? (
                          <a
                            href={whatsappLink || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-brand-menta underline"
                          >
                            {order.customer?.cellphone}
                          </a>
                        ) : (
                          <div className="text-xs text-muted-foreground">-</div>
                        )}
                      </td>
                      <td className="py-3 pr-4 uppercase font-semibold">
                        {order.status}
                      </td>
                      <td className="py-3 pr-4 text-xs text-muted-foreground">
                        {order.pix_qrcode_id || "-"}
                      </td>
                      <td className="py-3 pr-4 text-xs text-muted-foreground">
                        {formatDate(order.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pix ({pix.length})</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="py-2 pr-4">Pix ID</th>
                  <th className="py-2 pr-4">Valor</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Criado</th>
                </tr>
              </thead>
              <tbody>
                {pix.map((entry) => (
                  <tr key={entry.pix_id} className="border-t border-border">
                    <td className="py-3 pr-4 text-xs text-muted-foreground">
                      {entry.pix_id}
                    </td>
                    <td className="py-3 pr-4 font-medium text-foreground">
                      {formatCurrency(entry.amount / 100)}
                    </td>
                    <td className="py-3 pr-4 uppercase font-semibold">
                      {entry.status}
                    </td>
                    <td className="py-3 pr-4 text-xs text-muted-foreground">
                      {formatDate(entry.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
