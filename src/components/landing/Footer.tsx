import { CONTENT } from "@/lib/content";

export function Footer() {
  const content = CONTENT.global;

  return (
    <footer className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-1.5">
          <p className="text-[11px] text-muted-foreground/60">
            {content.footerLegalText}
          </p>
          <p className="text-[11px] text-muted-foreground/50">
            {content.footerCopyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
