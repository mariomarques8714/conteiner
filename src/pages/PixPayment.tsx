import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Copy, Check, Loader2, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CONTENT } from "@/lib/content";
import { formatCurrency } from "@/lib/validators";
import {
  WaitForConfirmationBlock,
  ClosedPageBlock,
  AfterPaymentBlock,
  WhatsAppGroupBlock,
} from "@/components/pix/PixInfoBlocks";

const content = CONTENT.pix;

export default function PixPayment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const orderId = searchParams.get("order_id");
  const accessToken = searchParams.get("access_token");
  const brCode = searchParams.get("br_code");
  const brCodeBase64 = searchParams.get("br_code_base64");
  const expiresAt = searchParams.get("expires_at");
  const buyerName = searchParams.get("buyer_name");
  const gradeQuantity = parseInt(searchParams.get("grade_quantity") || "1");
  const totalUnits = parseInt(searchParams.get("total_units") || "10");
  const amount = parseInt(searchParams.get("amount") || "40000");

  const [hasCopied, setHasCopied] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  useEffect(() => {
    if (!expiresAt) return;

    const updateCountdown = () => {
      const expires = new Date(expiresAt).getTime();
      const now = Date.now();
      const diff = Math.max(0, expires - now);
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setMinutes(m);
      setSeconds(s);
      if (diff === 0) {
        setIsExpired(true);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  useEffect(() => {
    if (!orderId || !accessToken) return;

    const poll = async () => {
      setIsCheckingStatus(true);
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
        if (data.status === "paid") {
          const params = new URLSearchParams({
            order_id: orderId,
            access_token: accessToken,
            buyer_name: buyerName || "",
            grade_quantity: String(gradeQuantity),
            total_units: String(totalUnits),
            amount: String(amount),
          });
          navigate(`/success?${params.toString()}`, { replace: true });
          return;
        }
        if (data.status === "expired") {
          navigate(`/expired?order_id=${orderId}&access_token=${accessToken}`, { replace: true });
          return;
        }
      }
      setIsCheckingStatus(false);
    };

    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [orderId, accessToken, navigate, buyerName, gradeQuantity, totalUnits, amount]);

  const handleCopy = async () => {
    if (!brCode) return;

    try {
      await navigator.clipboard.writeText(brCode);
      setHasCopied(true);
      toast({ title: content.copiedConfirmation });
      setTimeout(() => setHasCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!orderId || !accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md glass-card">
          <CardContent className="flex flex-col items-center gap-4 py-8">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <p className="text-center text-muted-foreground">
              {CONTENT.common.genericErrorMessage}
            </p>
            <Button onClick={() => navigate("/")} variant="outline">
              {CONTENT.success.returnHomeButton}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="text-center space-y-2 pt-6">
          <h1 className="text-2xl font-bold text-foreground">{content.screenTitle}</h1>
          <p className="text-muted-foreground">{content.mainInstruction}</p>
        </div>

        <Card className="border-countdown-red/30 bg-countdown-red/5">
          <CardContent className="flex flex-col items-center gap-2 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{content.countdown.label}</span>
            </div>
            <div className="text-4xl font-bold text-countdown-red tabular-nums">
              {String(minutes).padStart(2, "0")}
              <span className="text-countdown-red/70">{content.countdown.minutesUnit}</span>{" "}
              {String(seconds).padStart(2, "0")}
              <span className="text-countdown-red/70">{content.countdown.secondsUnit}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">{content.countdown.explanation}</p>
            <p className="text-xs text-muted-foreground/70 text-center mt-1 max-w-xs">
              {content.countdown.timingNote}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="text-center pb-2">
            <p className="text-sm text-muted-foreground">{content.qrCodeInstruction}</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {brCodeBase64 ? (
              <div className="bg-white p-4 rounded-lg">
                <img src={brCodeBase64} alt="QR Code Pix" className="w-48 h-48 object-contain" />
              </div>
            ) : (
              <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}

            <div className="w-full space-y-2">
              <label className="text-sm font-medium text-foreground">{content.copyPasteLabel}</label>
              <div className="flex gap-2">
                <div className="flex-1 bg-muted rounded-md p-3 text-xs font-mono break-all max-h-20 overflow-y-auto">
                  {brCode || "..."}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                  disabled={!brCode}
                >
                  {hasCopied ? <Check className="h-4 w-4 text-brand-menta" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">{content.copyButtonLabel}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <WaitForConfirmationBlock />
        <ClosedPageBlock />

        <Card className="glass-card">
          <CardContent className="py-4">
            <div className="flex items-center justify-center gap-3">
              {isCheckingStatus ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-brand-yellow" />
                  <span className="text-sm text-muted-foreground">{content.status.verifying}</span>
                </>
              ) : (
                <>
                  <div className="h-3 w-3 rounded-full bg-brand-yellow animate-pulse" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{content.status.pending}</p>
                    <p className="text-xs text-muted-foreground">{content.status.pendingDescription}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{content.orderSummary.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{content.orderSummary.buyerNameLabel}</span>
              <span className="font-medium text-foreground">{buyerName || "-"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{content.orderSummary.gradeQuantityLabel}</span>
              <span className="font-medium text-foreground">{gradeQuantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{content.orderSummary.totalJerseysLabel}</span>
              <span className="font-medium text-foreground">{totalUnits}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-border pt-2">
              <span className="text-muted-foreground">{content.orderSummary.amountLabel}</span>
              <span className="font-semibold text-foreground">{formatCurrency(amount / 100)}</span>
            </div>
          </CardContent>
        </Card>

        <AfterPaymentBlock />
        <WhatsAppGroupBlock />
      </div>
    </div>
  );
}
