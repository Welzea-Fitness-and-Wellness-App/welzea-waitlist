import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { WelzeaLogo } from "@/components/site/WelzeaLogo";
import { Button } from "@/components/ui/button";

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Why Welzea", href: "/#why-welzea" },
  { label: "Today Plan", href: "/today-plan-demo" },
  { label: "Early access", href: "/#early-access" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="Welzea home" className="flex shrink-0 items-center gap-3">
          <WelzeaLogo />
          <span className="hidden text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase sm:inline-block">
            More You. More Life.
          </span>
        </Link>


        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden min-h-11 sm:inline-flex">
            <a href="/#early-access">Join early access</a>
          </Button>
          <Button asChild size="sm" className="min-h-11 sm:hidden">
            <a href="/#early-access">Join</a>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-card md:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col py-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3.5 text-base font-medium text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
