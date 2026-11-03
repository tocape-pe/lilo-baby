import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { STORE, waOrder } from "@/config";
import { COLOR_CHARTS, getCategory, getProduct, priceOf, productsIn, soles, type Product as P } from "@/data";
import { Breadcrumb, ProductCard, useTitle } from "@/components/ui";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import NotFound from "./NotFound";

const Accordion = ({ title, children, open: initial = false }: { title: string; children: React.ReactNode; open?: boolean }) => {
  const [open, setOpen] = useState(initial);
  return (
    <div className="border-t border-black/10">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="w-full flex items-center justify-between py-4 text-[15px]">
        {title}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-5 text-[14px] leading-[1.6] text-ink-soft">{children}</div>}
    </div>
  );
};

// Al elegir una opción con foto propia, se muestra esa foto; las miniaturas siguen funcionando
const Gallery = ({ p, active }: { p: P; active?: string }) => {
  const [main, setMain] = useState(p.images[0]);
  useEffect(() => {
    if (active) setMain(active);
  }, [active]);
  return (
    <div>
      <div className="bg-card aspect-[4/5] flex items-center justify-center overflow-hidden">
        <img src={main} alt={p.name} className="max-w-full max-h-full object-contain" />
      </div>
      {p.images.length > 1 && (
        <div className="mt-2 grid grid-cols-5 md:grid-cols-6 gap-2">
          {p.images.map((src, i) => (
            <button
              key={src}
              onClick={() => setMain(src)}
              aria-label={`Ver foto ${i + 1}`}
              className={`aspect-square bg-card overflow-hidden border ${main === src ? "border-ink" : "border-transparent"}`}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductView = ({ p }: { p: P }) => {
  const cat = getCategory(p.category)!;
  const [size, setSize] = useState(0);
  const [mode, setMode] = useState(0);
  const [opt, setOpt] = useState(0);
  const [qty, setQty] = useState(1);
  useTitle(p.name);

  const s = p.sizes[size];
  const option = p.options?.items[opt];
  const unit = priceOf(s, mode) + (option?.extra ?? 0);
  const total = unit * qty;

  const lines = [
    `${p.name}`,
    `${p.sizeTitle ?? "Medida"}: ${s.label}${s.medida ? ` (${s.medida})` : ""}`,
    ...(p.modes ? [`Tipo: ${p.modes[mode]}`] : []),
    ...(option ? [`${p.options!.title}: ${option.label}`] : []),
    `Cantidad: ${qty}`,
    `Precio: ${soles(total)}${qty > 1 ? ` (${soles(unit)} c/u)` : ""}`,
  ];
  const charts = COLOR_CHARTS.filter((c) => p.colors?.includes(c.key));
  const related = productsIn(p.category).filter((x) => x.slug !== p.slug).slice(0, 4);

  return (
    <div className="px-5 md:px-10 lg:px-16 pt-8 pb-24">
      <Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: cat.name, to: `/categoria/${cat.slug}` }, { label: p.name }]} />

      <div className="mt-6 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
        <Gallery key={p.slug} p={p} active={option?.image} />

        <div className="lg:sticky lg:top-24 lg:self-start">
          {p.badge && <p className="text-[12px] uppercase tracking-[0.2em] text-cocoa">{p.badge}</p>}
          <h1 className="mt-2 font-serif font-light text-[36px] md:text-[46px] leading-[1.02]">{p.name}</h1>
          <p className="mt-4 text-[24px]">{soles(unit)}</p>
          <p className="mt-4 text-[16px] leading-[1.5] text-ink-soft">{p.short}</p>

          {p.modes && (
            <fieldset className="mt-8">
              <legend className="text-[14px] mb-2">Tipo</legend>
              <div className="flex flex-wrap gap-2">
                {p.modes.map((m, i) => (
                  <button key={m} onClick={() => setMode(i)} aria-pressed={mode === i} className={`h-11 px-4 border text-[14px] ${mode === i ? "border-ink bg-ink text-white" : "border-black/15 hover:border-ink"}`}>
                    {m}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <fieldset className="mt-8">
            <legend className="text-[14px] mb-2">
              {p.sizeTitle ?? "Medida"}: <span className="text-ink-soft">{s.label}{s.medida ? ` · ${s.medida}` : ""}</span>
            </legend>
            <div className="grid sm:grid-cols-2 gap-2">
              {p.sizes.map((x, i) => (
                <button
                  key={x.label}
                  onClick={() => setSize(i)}
                  aria-pressed={size === i}
                  className={`text-left px-4 py-3 border flex items-center justify-between gap-3 ${size === i ? "border-ink" : "border-black/15 hover:border-ink"}`}
                >
                  <span>
                    <span className="block text-[14px]">{x.label}</span>
                    {x.medida && <span className="block text-[12px] text-ink-soft">{x.medida}</span>}
                  </span>
                  <span className="text-[14px] shrink-0">{soles(priceOf(x, mode))}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {p.options && (
            <fieldset className="mt-8">
              <legend className="text-[14px] mb-2">{p.options.title}</legend>
              <div className="flex flex-col gap-2">
                {p.options.items.map((o, i) => (
                  <button
                    key={o.label}
                    onClick={() => setOpt(i)}
                    aria-pressed={opt === i}
                    className={`text-left px-4 py-3 border flex items-center justify-between gap-3 text-[14px] ${opt === i ? "border-ink" : "border-black/15 hover:border-ink"}`}
                  >
                    <span>{o.label}</span>
                    <span className="shrink-0 text-ink-soft">{o.extra ? `+ ${soles(o.extra)}` : "Incluido"}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-8 flex gap-2">
            <div className="flex items-center border border-black/15 h-12">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Menos" className="w-11 h-full text-[18px]">−</button>
              <span className="w-8 text-center text-[15px]" aria-live="polite">{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Más" className="w-11 h-full text-[18px]">+</button>
            </div>
            <a
              href={waOrder(lines)}
              target="_blank"
              rel="noopener"
              className="flex-1 h-12 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-[15px] font-medium hover:brightness-95"
            >
              <WhatsAppIcon size={20} />
              Pedir por WhatsApp · {soles(total)}
            </a>
          </div>
          <p className="mt-3 text-[12px] text-ink-soft">
            Coordinamos colores, pago y envío por WhatsApp ({STORE.whatsappDisplay}). {STORE.shipping}.
          </p>

          <div className="mt-10">
            <Accordion title="Detalles" open>
              <ul className="list-disc pl-5 space-y-1">
                {p.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              {p.notes && (
                <ul className="mt-3 space-y-1">
                  {p.notes.map((n) => (
                    <li key={n} className="text-ink">✦ {n}</li>
                  ))}
                </ul>
              )}
            </Accordion>
            {charts.length > 0 && (
              <Accordion title="Colores disponibles">
                {charts.map((c) => (
                  <div key={c.key} className="mb-4">
                    <p className="text-ink">{c.title}</p>
                    <div className="mt-2 grid grid-cols-4 gap-1.5">
                      {c.images.slice(0, 8).map((im) => (
                        <img key={im.src} src={im.src} alt={im.label} title={im.label} loading="lazy" className="aspect-square object-cover bg-white" />
                      ))}
                    </div>
                  </div>
                ))}
                <Link to="/colores" className="underline underline-offset-4 text-ink">Ver cartillas completas</Link>
              </Accordion>
            )}
            {p.category === "protectores-de-cuna" && (
              <Accordion title="¿Cómo tomo las medidas?">
                Los protectores van por encima del colchón y dentro de la cama, por eso las medidas se toman desde la parte superior del
                colchón. <Link to="/guia-de-medidas" className="underline underline-offset-4 text-ink">Ver guía de medidas</Link>
              </Accordion>
            )}
            <Accordion title="Envíos">
              {STORE.shipping}. Tienda virtual y taller en {STORE.workshop}. Escríbenos por WhatsApp y te confirmamos el costo del envío a tu
              ciudad.
            </Accordion>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[18px] text-ink-soft">También en {cat.name.toLowerCase()}</h2>
            <Link to={`/categoria/${cat.slug}`} className="text-[14px] underline underline-offset-4">Ver todo</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-8">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const Product = () => {
  const { slug } = useParams();
  const p = getProduct(slug);
  if (!p) return <NotFound />;
  // key: reinicia medida/opción/cantidad al pasar de un producto a otro
  return <ProductView key={p.slug} p={p} />;
};

export default Product;
