import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { minPrice, soles, type Product } from "@/data";

export const btnDark = "inline-flex items-center justify-center h-11 px-5 bg-ink text-white text-[14px] hover:bg-black transition-colors";
export const btnLight = "inline-flex items-center justify-center h-11 px-5 bg-sand text-ink text-[14px] hover:bg-card transition-colors";
export const linkUnder = "text-[14px] underline underline-offset-[6px] decoration-1 hover:no-underline";

/** Al cambiar de página, volver arriba */
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  // Con llaves: en Chrome/Edge recientes scrollTo devuelve una Promise y React la tomaría como limpieza
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

export const useCarousel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };
  const go = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return { ref, edge, update, go };
};

// Flechas sobre círculo beige (color sand de la web) para que se vean bien
const arrowBtn =
  "w-10 h-10 rounded-full bg-[#e9e1d6] text-ink flex items-center justify-center hover:bg-[#ddd2c3] transition-colors disabled:opacity-40 disabled:hover:bg-[#e9e1d6]";

export const Arrows = ({ c }: { c: ReturnType<typeof useCarousel> }) => (
  <div className="hidden md:flex items-center gap-2">
    <button onClick={() => c.go(-1)} disabled={c.edge.start} aria-label="Anterior" className={arrowBtn}>
      <ChevronLeft size={18} strokeWidth={2} />
    </button>
    <button onClick={() => c.go(1)} disabled={c.edge.end} aria-label="Siguiente" className={arrowBtn}>
      <ChevronRight size={18} strokeWidth={2} />
    </button>
  </div>
);

/** Tarjeta de producto: lleva a su ficha */
export const ProductCard = ({ p, className = "" }: { p: Product; className?: string }) => (
  <Link to={`/producto/${p.slug}`} className={`group block ${className}`}>
    <div className="relative aspect-[4/5] bg-card overflow-hidden">
      <img src={p.images[0]} alt={p.name} loading="lazy" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${p.images[1] ? "group-hover:opacity-0" : ""}`} />
      {p.images[1] && (
        <img src={p.images[1]} alt="" aria-hidden loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      {p.badge && <span className="absolute top-2 left-2 bg-white/90 px-1.5 text-[11px] uppercase tracking-wide text-ink-soft">{p.badge}</span>}
    </div>
    <h3 className="mt-2.5 font-serif font-medium text-[18px] leading-[1.15] group-hover:underline underline-offset-4">{p.name}</h3>
    <p className="mt-1 text-[14px]">{p.sizes.length > 1 ? `Desde ${soles(minPrice(p))}` : soles(minPrice(p))}</p>
  </Link>
);

export const Breadcrumb = ({ items }: { items: { label: string; to?: string }[] }) => (
  <nav aria-label="Ruta" className="text-[13px] text-ink-soft">
    {items.map((it, i) => (
      <span key={it.label}>
        {i > 0 && <span className="mx-1.5">/</span>}
        {it.to ? <Link to={it.to} className="hover:text-ink hover:underline underline-offset-4">{it.label}</Link> : <span className="text-ink">{it.label}</span>}
      </span>
    ))}
  </nav>
);

/** Título de pestaña por página */
export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title ? `${title} · Lilo Baby` : "Lilo Baby · Accesorios personalizados para tu bebé";
  }, [title]);
};
