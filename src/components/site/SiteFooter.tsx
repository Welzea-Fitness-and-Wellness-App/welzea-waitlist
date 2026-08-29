import { Link } from "@tanstack/react-router";

import { WelzeaLogo } from "@/components/site/WelzeaLogo";
import { SAFETY_NOTICE, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div aria-hidden className="brand-gradient h-1 w-full" />
      <div className="container-page flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <WelzeaLogo />
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy Notice
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms of Use
            </Link>
            <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-foreground">
              Contact us
            </a>
          </nav>
        </div>

        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">{SAFETY_NOTICE}</p>

        <p className="text-xs text-muted-foreground">© 2026 {siteConfig.brand}. All rights reserved.</p>
      </div>
    </footer>
  );
}
