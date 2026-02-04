import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Calendar, MessageCircle, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CONTENT } from "@/lib/content";
import { formatCurrency } from "@/lib/validators";

interface OrderData {
  status: string;
  amount: number | null;
}

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("order_id");
  const accessToken = searchParams.get("access_token");
  const buyerName = searchParams.get("buyer_name") || "";
  const gradeQuantity = parseInt(searchParams.get("grade_quantity") || "1");
  const totalUnits = parseInt(searchParams.get("total_units") || "10");
  const amount = parseInt(searchParams.get("amount") || "40000");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const content = CONTENT.success;

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || !accessToken) return;
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/check-order-status?order_id=${orderId}&access_token=${accessToken}`,
        {
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status === "pending") {
          const params = new URLSearchParams({
            order_id: orderId,
            access_token: accessToken,
            buyer_name: buyerName,
            grade_quantity: String(gradeQuantity),
            total_units: String(totalUnits),
            amount: String(amount),
          });
          navigate(`/pix?${params.toString()}`, { replace: true });
          return;
        }
        if (data.status === "expired") {
          navigate(`/expired?order_id=${orderId}&access_token=${accessToken}`, { replace: true });
          return;
        }
        setOrderData(data);
      }
    };

    fetchOrder();
  }, [orderId, accessToken, navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">{CONTENT.common.loadingSpinnerAriaLabel}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-lg space-y-5">
        <div className="text-center space-y-4 pt-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-brand-menta/20 p-4">
              <CheckCircle className="h-16 w-16 text-brand-menta" aria-label={content.iconAriaLabel} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{content.headline}</h1>
          <p className="text-muted-foreground">{content.confirmationMessage}</p>
        </div>

        <Card className="rounded-xl shadow-sm border-brand-menta/30 bg-brand-menta/5">
          <CardContent className="py-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{content.orderNumberLabel}</p>
              <p className="text-2xl font-bold text-foreground tracking-wider">{orderId || "-"}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-5 w-5 text-brand-yellow" />
              {content.orderDetailsTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{content.buyerNameLabel}</span>
              <span className="font-medium text-foreground">{buyerName || "-"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{content.gradeQuantityLabel}</span>
              <span className="font-medium text-foreground">{gradeQuantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{content.totalJerseysLabel}</span>
              <span className="font-medium text-foreground">{totalUnits}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-border pt-3">
              <span className="text-muted-foreground">{content.amountPaidLabel}</span>
              <span className="font-semibold text-brand-menta">
                {formatCurrency((orderData.amount ?? amount) / 100)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-green-500/30 bg-green-50 dark:bg-green-950/20">
          <CardContent className="py-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-green-500/20 p-2 shrink-0">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">{content.whatsAppGroup.title}</h3>
                <p className="text-sm text-muted-foreground">{content.whatsAppGroup.description}</p>
              </div>
            </div>
            <Button asChild className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm">
              <a href={content.whatsAppGroup.groupLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                {content.whatsAppGroup.buttonText}
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-border/50">
          <CardContent className="py-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{content.remainingPaymentLabel}</span>
              <span className="font-medium text-foreground">
                {formatCurrency(gradeQuantity * 400)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{content.remainingPaymentExplanation}</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-border/50">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-brand-yellow shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">{content.deliveryForecastLabel}</p>
                <p className="font-medium text-foreground">{content.deliveryForecastValue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-border/50 bg-muted/30">
          <CardContent className="py-5">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-brand-yellow/20 p-2 shrink-0">
                <Bell className="h-5 w-5 text-brand-yellow" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{content.secondPayment.title}</h3>
                <p className="text-sm text-muted-foreground">{content.secondPayment.mainText}</p>
                <p className="text-xs text-muted-foreground/80">{content.secondPayment.channelsText}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={() => navigate("/")} variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
          {content.returnHomeButton}
        </Button>
      </div>
    </div>
  );
}
