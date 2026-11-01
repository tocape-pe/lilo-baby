import { useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { waLink, waProduct } from "@/config";
import { BEST_SELLERS, CATEGORIES, DETAILS, IMG, SHADES } from "@/data";

const btnLight = "inline-flex items-center h-11 px-5 bg-sand text-ink text-[14px] hover:bg-white transition-colors";
const btnDark = "inline-flex items-center h-11 px-5 bg-ink text-white text-[14px] hover:bg-black transition-colors";
const linkUnder = "text-[14px] underline underline-offset-[6px] decoration-1 hover:no-underline";

/* Flechas para carruseles con scroll horizontal */
const useCarousel = () => {
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

const Arrows = ({ c }: { c: ReturnType<typeof useCarousel> }) => (
  <div className="hidden md:flex items-center gap-4">
    <button onClick={() => c.go(-1)} disabled={c.edge.start} aria-label="Anterior" className="p-1 disabled:opacity-25">
      <ChevronLeft size={18} strokeWidth={1.5} />
    </button>
    <button onClick={() => c.go(1)} disabled={c.edge.end} aria-label="Siguiente" className="p-1 disabled:opacity-25">
      <ChevronRight size={18} strokeWidth={1.5} />
    </button>
  </div>
);

/* 0 · Hero a sangre */
export const Hero = () => (
  <section className="relative h-[78vh] md:h-[810px] overflow-hidden">
    <img src={IMG.hero} alt="Set de cuna Lilo Baby taupe con ribete rosado, lazo y cojín acolchado" className="absolute inset-0 w-full h-full object-cover object-[70%_center]" />
    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/0 to-white/0 md:bg-gradient-to-tr md:from-white/45" />
    <h1 className="absolute left-4 bottom-[18px] md:bottom-[-4px] max-w-[780px] font-serif font-light text-[56px] leading-[0.9] md:text-[112px] md:leading-[0.85] text-ink pr-4">
      Hecho a mano para sus primeros sueños.
    </h1>
    <a href="#mas-pedidos" className={`${btnLight} absolute right-4 bottom-8 hidden md:inline-flex`}>
      Ver los más pedidos
    </a>
  </section>
);

/* 1 · Declaración */
export const Intro = () => (
  <section className="px-4 py-20 md:py-32">
    <p className="mx-auto max-w-[760px] text-center font-serif font-light text-[24px] md:text-[30px] leading-[1.25]">
      Ropa de cama para bebé cosida a mano: algodón de 200 hilos, acabados con encaje y lazos, y su nombre bordado para que
      sea solo suya. Enviamos a todo el Perú.
    </p>
  </section>
);

/* 2 · Los más pedidos */
export const BestSellers = () => {
  const c = useCarousel();
  return (
    <section id="mas-pedidos" className="pl-4 md:pl-32 pb-20 md:pb-40 scroll-mt-24">
      <div className="flex items-center justify-between pr-4 md:pr-32 mb-5">
        <h2 className="text-[18px] text-ink-soft">Los más pedidos</h2>
        <Arrows c={c} />
      </div>
      <div ref={c.ref} onScroll={c.update} className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory pr-4 md:pr-32">
        {BEST_SELLERS.map((p) => (
          <a key={p.name} href={waProduct(p.name)} target="_blank" rel="noopener" className="group shrink-0 w-[64vw] md:w-[230px] snap-start">
            <div className="relative aspect-[230/307] bg-card overflow-hidden">
              <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
              <img src={p.hover ?? p.image} alt="" aria-hidden loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {p.badge && (
                <span className="absolute top-2 left-2 bg-white/90 px-1.5 text-[11px] uppercase tracking-wide text-ink-soft">{p.badge}</span>
              )}
            </div>
            <h3 className="mt-2.5 font-serif font-medium text-[18px] leading-[1.1]">{p.name}</h3>
            <p className="mt-1 text-[14px] leading-[1.4]">{p.detail}</p>
            <p className="mt-0.5 text-[13px] text-ink-soft underline-offset-4 group-hover:underline">Pedir por WhatsApp</p>
          </a>
        ))}
      </div>
      <a href={waLink("¡Hola Lilo Baby! 🤍 ¿Me envían el catálogo completo?")} target="_blank" rel="noopener" className={`${btnDark} mt-12 md:mt-16`}>
        Pedir el catálogo completo
      </a>
    </section>
  );
};

/* 3 · Imagen protagonista con miniatura de producto */
export const Feature = () => (
  <section className="px-2 md:px-4">
    <div className="relative">
      <img src={IMG.mama} alt="Mamá abrazando a su bebé envuelto en una frazada verde salvia" loading="lazy" className="w-full h-[120vw] md:h-auto object-cover" />
      <div className="absolute top-6 left-4 md:top-8 md:left-4">
        <h2 className="font-serif font-light text-[48px] leading-[0.9] md:text-[80px] md:leading-[0.85] text-ink max-w-[520px]">
          Abrazos que se quedan.
        </h2>
        <a href={waLink("¡Hola Lilo Baby! 🤍 Quiero armar un set para mi bebé.")} target="_blank" rel="noopener" className={`${btnLight} mt-6`}>
          Armar su set
        </a>
      </div>
      <a href={waProduct("Almohada con su nombre")} target="_blank" rel="noopener" className="hidden md:block absolute left-4 bottom-4 w-[168px] bg-card group">
        <img src={IMG.aitanaThumb} alt="Almohada personalizada Aitana" loading="lazy" className="w-full aspect-[3/4] object-cover" />
        <span className="block bg-white px-2 py-1 text-[12px] leading-tight group-hover:underline">Almohada con su nombre</span>
      </a>
    </div>
  </section>
);

/* 4 · Paleta: descubre por color */
export const Palette = () => {
  const [active, setActive] = useState(0);
  const c = useCarousel();
  const shade = SHADES[active];
  return (
    <section id="colores" className="pl-4 md:pl-[120px] py-20 md:py-40 scroll-mt-20">
      <div className="pr-4 md:pr-[120px] flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="max-w-[588px]">
          <h2 className="font-serif font-light text-[28px] leading-[1.2]">Colores que combinan con todo.</h2>
          <p className="mt-2 text-[18px] leading-[1.3]">
            Combinaciones suaves que elegimos tela por tela, pensadas para su cuarto y para que no pasen de moda.
          </p>
        </div>
        <div className="flex gap-2.5" role="radiogroup" aria-label="Elegir combinación de colores">
          {SHADES.map((s, i) => (
            <button
              key={s.name}
              role="radio"
              aria-checked={i === active}
              aria-label={s.name}
              title={s.name}
              onClick={() => {
                setActive(i);
                c.ref.current?.scrollTo({ left: 0 });
              }}
              className={`w-[34px] h-[34px] p-[3px] border ${i === active ? "border-ink" : "border-transparent"}`}
            >
              <span className="block w-full h-full ring-1 ring-inset ring-black/10" style={{ background: `linear-gradient(135deg, ${s.colors[0]} 50%, ${s.colors[1]} 50%)` }} />
            </button>
          ))}
        </div>
      </div>
      <div className="pr-4 md:pr-[120px] mt-8 mb-4 flex items-center justify-between">
        <p className="text-[14px]">
          Descubre por color: <strong className="font-medium">{shade.name}</strong>
        </p>
        <Arrows c={c} />
      </div>
      <div ref={c.ref} onScroll={c.update} className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        {shade.images.map((im) => (
          <a
            key={im.src}
            href={waProduct(`${im.label} en ${shade.name.toLowerCase()}`)}
            target="_blank"
            rel="noopener"
            className="group relative shrink-0 w-[70vw] md:w-[343px] aspect-[343/610] bg-card snap-start overflow-hidden"
          >
            <img src={im.src} alt={`${im.label} · ${shade.name}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <span className="absolute left-3 bottom-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-white flex items-center justify-center">
                <ArrowRight size={12} />
              </span>
              <span className="bg-white/90 px-1.5 text-[12px] opacity-0 group-hover:opacity-100 transition-opacity">{im.label}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

/* 5 · Colección (texto) */
export const Season = () => (
  <section className="px-4 pb-20 md:pb-32">
    <div className="mx-auto max-w-[760px] text-center">
      <p className="text-[16px] font-light">Colección 2026</p>
      <p className="mt-1 font-serif font-light text-[24px] md:text-[30px] leading-[1.25]">
        Cada set se corta y se cose a mano en nuestro taller. Tú eliges la tela, el color del ribete y el nombre; nosotras lo
        armamos y lo enviamos a donde estés.
      </p>
      <a href={waLink("¡Hola Lilo Baby! 🤍 Quiero cotizar un set personalizado.")} target="_blank" rel="noopener" className={`${linkUnder} inline-block mt-7`}>
        Cotiza tu set
      </a>
    </div>
  </section>
);

/* 6 · Editorial: taller + bordado */
export const Editorial = () => (
  <section id="personaliza" className="px-2 md:px-6 pb-20 md:pb-16 flex flex-col md:flex-row gap-4 scroll-mt-20">
    <img src={IMG.costura} alt="Cosiendo un set de protectores en el taller de Lilo Baby" loading="lazy" className="w-full md:w-[580px] aspect-[580/711] object-cover" />
    <div className="md:w-[336px] px-2 md:px-0">
      <img src={IMG.almohada} alt="Almohada beige con el nombre Aitana bordado en rosado" loading="lazy" className="w-full aspect-[336/420] object-cover" />
      <p className="mt-6 text-[16px] font-light leading-[1.35]">
        Su nombre, bordado a mano. Elige la letra, el color del hilo y un detalle: corazón, banderín o mariposa.
      </p>
      <a href={waProduct("Almohada personalizada con su nombre")} target="_blank" rel="noopener" className={`${linkUnder} inline-block mt-3`}>
        Personaliza su almohada
      </a>
    </div>
  </section>
);

const ImageTile = ({ src, label, href, className, children }: { src: string; label: string; href: string; className: string; children?: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener" className={`group relative block overflow-hidden bg-card ${className}`}>
    <img src={src} alt={label} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
    <span className="absolute left-4 bottom-4 md:left-6 md:bottom-6 inline-flex items-center h-10 px-6 bg-white text-black text-[14px]">{label}</span>
    {children}
  </a>
);

/* 7 · Categorías */
export const Categories = () => (
  <section id="categorias" className="px-2 md:px-6 pb-20 md:pb-16 grid grid-cols-2 md:grid-cols-4 gap-2 scroll-mt-20">
    {CATEGORIES.map((cat) => (
      <ImageTile key={cat.name} src={cat.image} label={cat.name} href={waProduct(cat.name)} className="aspect-[342/478]" />
    ))}
  </section>
);

/* 8 · Banner ancho */
export const Banner = () => (
  <section className="px-2 md:px-6 pb-20 md:pb-16">
    <div className="relative">
      <img src={IMG.banner} alt="Cuna de madera con set Lilo Baby en un dormitorio luminoso" loading="lazy" className="w-full h-[110vw] md:h-[787px] object-cover object-[65%_center]" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-white/0 to-white/0 md:from-white/30" />
      <div className="absolute left-6 bottom-8 md:left-12 md:bottom-12">
        <h2 className="font-serif font-light text-[36px] md:text-[48px] leading-[1.1]">Hecho a mano, para todo el Perú</h2>
        <a href="https://www.tiktok.com/@lilobaby.pe" target="_blank" rel="noopener" className={`${linkUnder} inline-block mt-1`}>
          Mira nuestro taller en TikTok
        </a>
      </div>
    </div>
  </section>
);

/* 9 · Para ella / para él */
export const Halves = () => (
  <section className="px-2 md:px-6 pb-20 md:pb-16 grid md:grid-cols-2 gap-2">
    <ImageTile src={IMG.ella} label="Para ella" href={waLink("¡Hola Lilo Baby! 🤍 Busco un set para niña.")} className="aspect-[692/876]" />
    <ImageTile src={IMG.el} label="Para él" href={waLink("¡Hola Lilo Baby! 🤍 Busco un set para niño.")} className="aspect-[692/876]" />
  </section>
);

/* 10 · Detalles / telas */
export const Details = () => (
  <section id="detalles" className="px-2 md:px-6 pt-4 md:pt-16 pb-20 md:pb-16 scroll-mt-20">
    <h2 className="px-2 md:px-0 font-serif font-light text-[28px] leading-[1.1]">Detalles que se notan.</h2>
    <p className="px-2 md:px-0 mt-2 text-[16px] font-light leading-[1.35] max-w-[460px]">
      Telas suaves, fundas que se sacan para lavar y acabados que hacemos uno por uno.
    </p>
    <div className="mt-12 grid md:grid-cols-3 gap-2">
      {DETAILS.map((d) => (
        <ImageTile key={d.name} src={d.image} label={d.name} href={waProduct(d.name)} className="aspect-[459/584]" />
      ))}
    </div>
  </section>
);
