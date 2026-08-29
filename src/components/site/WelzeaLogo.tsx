import markAsset from "@/assets/welzea-mark.png";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * Official Welzea logo. The mark file must never be recoloured, stretched or cropped.
 * Only the overall size changes.
 */
export function WelzeaLogo({
  className,
  showWordmark = true,
  markClassName,
}: {
  className?: string;
  showWordmark?: boolean;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={markAsset}
        alt={`${siteConfig.brand} logo`}
        width={903}
        height={605}
        className={cn("h-7 w-auto shrink-0", markClassName)}
      />
      {showWordmark ? (
        <span className="font-display text-lg font-bold tracking-[0.22em] text-primary uppercase">
          {siteConfig.brand}
        </span>
      ) : null}
    </span>
  );
}
