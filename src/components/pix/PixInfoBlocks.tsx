import { Card, CardContent } from "@/components/ui/card";
import { CONTENT } from "@/lib/content";

const content = CONTENT.pix;

export function WaitForConfirmationBlock() {
  return (
    <Card className="glass-card">
      <CardContent className="py-4 space-y-1">
        <p className="text-sm font-semibold text-foreground">{content.waitForConfirmation.title}</p>
        <p className="text-sm text-muted-foreground">{content.waitForConfirmation.text}</p>
      </CardContent>
    </Card>
  );
}

export function ClosedPageBlock() {
  return (
    <Card className="glass-card">
      <CardContent className="py-4 space-y-1">
        <p className="text-sm font-semibold text-foreground">{content.closedPage.title}</p>
        <p className="text-sm text-muted-foreground">{content.closedPage.text}</p>
      </CardContent>
    </Card>
  );
}

export function AfterPaymentBlock() {
  return (
    <Card className="glass-card">
      <CardContent className="py-4 space-y-2">
        <p className="text-sm font-semibold text-foreground">{content.afterPayment.title}</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          {content.afterPayment.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function WhatsAppGroupBlock() {
  return (
    <Card className="glass-card">
      <CardContent className="py-4 space-y-2">
        <p className="text-sm font-semibold text-foreground">{content.whatsAppGroup.title}</p>
        <p className="text-sm text-muted-foreground">{content.whatsAppGroup.mainText}</p>
        <p className="text-sm text-muted-foreground font-medium">{content.whatsAppGroup.bulletIntro}</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          {content.whatsAppGroup.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">{content.whatsAppGroup.closingText}</p>
      </CardContent>
    </Card>
  );
}
