import { Link } from "react-router-dom";
import { COLOR_CHARTS } from "@/data";
import { Breadcrumb, useTitle } from "@/components/ui";

const Colors = () => {
  useTitle("Colores y estampados");
  return (
    <div className="px-5 md:px-10 lg:px-16 pt-8 pb-24">
      <Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: "Colores y estampados" }]} />
      <h1 className="mt-6 md:mt-10 font-serif font-light text-[44px] md:text-[64px] leading-[0.95]">Colores y estampados</h1>
      <p className="mt-4 max-w-[640px] text-[16px] md:text-[18px] leading-[1.4] text-ink-soft">
        Cartillas del catálogo 2026. Cuéntanos por WhatsApp el color o el número de estampado que elegiste.
      </p>
      <nav className="mt-8 flex flex-wrap gap-2 text-[14px]">
        {COLOR_CHARTS.map((c) => (
          <a key={c.key} href={`#c-${c.key}`} className="h-10 px-4 inline-flex items-center border border-black/15 hover:border-ink">
            {c.title}
          </a>
        ))}
      </nav>
      {COLOR_CHARTS.map((c) => (
        <section key={c.key} id={`c-${c.key}`} className="mt-16 scroll-mt-24">
          <h2 className="font-serif font-light text-[30px] leading-[1.1]">{c.title}</h2>
          <p className="mt-1 text-[14px] text-ink-soft">{c.subtitle}</p>
          <div className={`mt-6 grid gap-3 ${c.images.length > 4 ? "grid-cols-2 md:grid-cols-5" : "grid-cols-1 sm:grid-cols-2"}`}>
            {c.images.map((im) => (
              <figure key={im.src}>
                <div className="bg-white border border-black/5 flex items-center justify-center overflow-hidden">
                  <img src={im.src} alt={im.label} loading="lazy" className="max-w-full max-h-[620px] object-contain" />
                </div>
                <figcaption className="mt-2 text-[13px] text-ink-soft">{im.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
      <p className="mt-16 text-[14px]">
        <Link to="/" className="underline underline-offset-4">Volver a la tienda</Link>
      </p>
    </div>
  );
};

export default Colors;
