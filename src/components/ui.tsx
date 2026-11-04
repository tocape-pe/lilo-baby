import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { esReferencial, minPrice, soles, type Product } from "@/data";

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

/** Etiqueta «Foto referencial» en la esquina, solo si el catálogo marca así esa foto */
export const RefBadge = ({ src, className = "" }: { src?: string; className?: string }) =>
  esReferencial(src) ? (
    <span className={`absolute right-2 bottom-2 z-10 bg-white/85 px-1.5 py-0.5 text-[10px] leading-none tracking-wide text-ink-soft pointer-events-none ${className}`}>
      Foto referencial
    </span>
  ) : null;

/** Tarjeta de producto: lleva a su ficha */
export const ProductCard = ({ p, className = "" }: { p: Product; className?: string }) => (
  <Link to={`/producto/${p.slug}`} className={`group block ${className}`}>
    <div className="relative aspect-[4/5] bg-card overflow-hidden">
      <img src={p.images[0]} alt={p.name} loading="lazy" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${p.images[1] ? "group-hover:opacity-0" : ""}`} />
      <RefBadge src={p.images[0]} className={`transition-opacity duration-500 ${p.images[1] ? "group-hover:opacity-0" : ""}`} />
      {p.images[1] && (
        <>
          <img src={p.images[1]} alt="" aria-hidden loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <RefBadge src={p.images[1]} className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </>
      )}
      {p.badge && <span className="absolute top-2 left-2 bg-white/90 px-1.5 text-[11px] uppercase tracking-wide text-ink-soft">{p.badge}</span>}
    </div>
    <h3 className="mt-2.5 font-serif font-medium text-[18px] leading-[1.15] group-hover:underline underline-offset-4">{p.name}</h3>
    <p className="mt-1 text-[14px]">{p.sizes.length > 1 ? `Desde ${soles(minPrice(p))}` : soles(minPrice(p))}</p>
  </Link>
);

/** Cabecera de página con adorno pastel (círculos suaves rosa, salvia y cielo) y foto en arco a la derecha */
export const PastelHeader = ({
  title,
  description,
  image,
  breadcrumb,
  children,
}: {
  title: string;
  description?: string;
  image?: string;
  breadcrumb?: React.ReactNode;
  children?: React.ReactNode;
}) => (
  <section className="relative overflow-hidden bg-[#fbf7f2] border-b border-black/[0.04]">
    <span aria-hidden className="absolute -left-24 -top-28 w-[380px] h-[380px] rounded-full bg-[#f5dde2] opacity-70 blur-2xl" />
    <span aria-hidden className="absolute left-[38%] -bottom-40 w-[420px] h-[420px] rounded-full bg-[#e2ecdb] opacity-70 blur-2xl" />
    <span aria-hidden className="absolute right-[18%] -top-24 w-[300px] h-[300px] rounded-full bg-[#dfe9f4] opacity-80 blur-2xl" />
    {/* guirnalda de puntitos pastel */}
    <svg aria-hidden className="absolute left-0 right-0 bottom-3 w-full h-4 opacity-70" preserveAspectRatio="none">
      <defs>
        <pattern id="puntos-pastel" width="28" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="8" r="2.4" fill="#eab8c2" />
          <circle cx="13" cy="8" r="2.4" fill="#bfd3b0" />
          <circle cx="22" cy="8" r="2.4" fill="#b9cfe6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#puntos-pastel)" />
    </svg>
    <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center px-5 md:px-10 lg:px-16 pt-8 pb-14 md:pb-16">
      <div className="max-w-[680px]">
        {breadcrumb}
        <h1 className="mt-6 md:mt-10 font-serif font-light text-[44px] md:text-[64px] leading-[0.95]">{title}</h1>
        {description && <p className="mt-4 text-[16px] md:text-[18px] leading-[1.45] text-ink-soft">{description}</p>}
        {children}
      </div>
      {image && (
        <div className="hidden md:block relative w-[240px] lg:w-[300px] mr-2 lg:mr-10">
          <span aria-hidden className="absolute -inset-3 rounded-t-full border border-[#e3c6cc]" />
          <div className="relative aspect-[3/4] rounded-t-full overflow-hidden bg-white shadow-[0_10px_30px_rgba(141,94,63,0.12)]">
            <RefBadge src={image} />
            <img src={image} alt="" aria-hidden className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  </section>
);

/** Columnas según la cantidad de productos, para que pocas tarjetas llenen la fila */
export const gridCols = (n: number) =>
  n <= 2 ? "grid-cols-2 max-w-[900px]" : n === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

export const Breadcrumb =({ items }: { items: { label: string; to?: string }[] }) => (
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
