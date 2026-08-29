import type { LucideIcon } from "lucide-react";

/** Lifestyle "real life moment" card: image, gentle hover zoom, soft lift. */
export function LifestyleCard({
  label,
  body,
  image,
  alt,
  icon: Icon,
}: {
  label: string;
  body: string;
  image: string;
  alt: string;
  icon: LucideIcon;
}) {
  return (
    <article className="group surface-card overflow-hidden transition-shadow duration-500 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          width={1024}
          height={768}
          className="media-zoom size-full object-cover group-hover:scale-[1.06]"
        />
        <span className="absolute bottom-3 left-3 flex size-9 items-center justify-center rounded-full bg-card/90 opacity-0 shadow-soft transition-opacity duration-500 group-hover:opacity-100">
          <Icon aria-hidden className="size-4 text-teal" />
        </span>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-display text-base font-bold">{label}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </article>
  );
}
