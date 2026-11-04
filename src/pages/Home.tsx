import { Link } from "react-router-dom";
import { STORE, waLink } from "@/config";
import { BEST_SELLERS, CATEGORIES, COLOR_CHARTS, getProduct, IMG, productsIn, TRABAJOS, type Product } from "@/data";
import { Arrows, btnDark, btnLight, linkUnder, ProductCard, RefBadge, useCarousel, useTitle } from "@/components/ui";

const img = (n: string) => `/img/cat/${n}.jpg`;

/* Portada: texto del catálogo + mosaico de fotos reales (sin agrandarlas) */
const Hero = () => (
  <section className="bg-sand">
    <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-6 items-center px-5 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20">
      <div className="max-w-[560px]">
        <p className="text-[13px] uppercase tracking-[0.25em] text-cocoa">Nuevo catálogo 2026</p>
        <h1 className="mt-4 font-serif font-light text-[52px] leading-[0.95] md:text-[84px] md:leading-[0.9]">Accesorios personalizados para tu bebé.</h1>
        <p className="mt-6 text-[17px] leading-[1.5] text-ink-soft max-w-[440px]">
          Protectores de cuna, sábanas, almohadas con su nombre y más, hechos a mano en nuestro taller con algodón Perú Pima.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/categoria/protectores-de-cuna" className={btnDark}>Ver protectores de cuna</Link>
          <Link to="/categoria/almohadas-personalizadas" className={`${btnLight} bg-white`}>Almohadas con su nombre</Link>
        </div>
      </div>
      <div className="grid grid-cols-[1.1fr_1fr] gap-2 md:gap-3 max-w-[720px] lg:ml-auto w-full">
        <Link to="/producto/protector-cuna-personalizado" className="row-span-2 overflow-hidden">
          <img src={img("diseno-op2")} alt="Set de protectores taupe con lazo y blonda en cama casita Montessori" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700" />
        </Link>
        <Link to="/producto/almohada-modelo-banderin" className="overflow-hidden aspect-[4/5]">
          <img src={img("almohada-aitana")} alt="Almohada Aitana bordada con banderín y osito lila" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700" />
        </Link>
        <Link to="/producto/protector-cuna-clasico" className="relative overflow-hidden aspect-[4/5]">
          <RefBadge src={img("clasico-op1")} />
          <img src={img("clasico-op1")} alt="Protector clásico gris con lazos celestes" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700" />
        </Link>
      </div>
    </div>
  </section>
);

const Intro = () => (
  <section className="px-5 py-20 md:py-28">
    <p className="mx-auto max-w-[780px] text-center font-serif font-light text-[24px] md:text-[30px] leading-[1.25]">
      Protectores acolchados, confeccionados pensando en la calidad, la comodidad y un bonito acabado para la cuna de tu bebé.
      Hechos a mano y enviados a todo el Perú.
    </p>
  </section>
);

const Categories = () => (
  <section className="px-2 md:px-6 pb-20 md:pb-24">
    <h2 className="px-2 md:px-0 text-[18px] text-ink-soft mb-5">Compra por categoría</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
      {CATEGORIES.map((c) => (
        <Link key={c.slug} to={`/categoria/${c.slug}`} className="group block">
          <div className="relative aspect-[3/4] bg-card overflow-hidden">
            <RefBadge src={c.image} />
            <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          </div>
          <p className="mt-2 text-[14px] group-hover:underline underline-offset-4">{c.name}</p>
          <p className="text-[12px] text-ink-soft">{productsIn(c.slug).length} productos</p>
        </Link>
      ))}
    </div>
  </section>
);

const BestSellers = () => {
  const c = useCarousel();
  const items = BEST_SELLERS.map(getProduct).filter(Boolean) as Product[];
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-10 pb-20 md:pb-32">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] text-ink-soft">Los más pedidos</h2>
        <Arrows c={c} />
      </div>
      <div ref={c.ref} onScroll={c.update} className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        {items.map((p) => (
          <ProductCard key={p.slug} p={p} className="shrink-0 w-[64vw] md:w-[calc((100%-1.5rem)/4)] snap-start" />
        ))}
      </div>
    </section>
  );
};

/* Dedicatoria del catálogo (pág. 2) */
const Story = () => (
  <section className="px-2 md:px-6 pb-20 md:pb-32">
    <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center bg-sand">
      <img src={IMG.lilito} alt="Bebé con vestido crema" loading="lazy" className="w-full max-h-[760px] object-cover md:aspect-[3/4]" />
      <div className="px-6 pb-12 md:p-12 max-w-[520px]">
        <p className="text-[13px] uppercase tracking-[0.25em] text-cocoa">Para nuestra pequeña Lilito</p>
        <p className="mt-5 font-serif font-light text-[28px] md:text-[36px] leading-[1.15]">
          «Tú inspiraste este sueño y llenaste de amor cada detalle. Lilo Baby nace de ti y para acompañar con ternura los primeros
          sueños de muchos pequeños.»
        </p>
        <p className="mt-5 text-[15px] text-ink-soft">Con todo nuestro amor, Lilo Baby ♡</p>
        <p className="mt-8 text-[14px] leading-[1.6]">
          Tienda virtual y taller en {STORE.workshop}. {STORE.shipping}.
        </p>
      </div>
    </div>
  </section>
);

/* Almohadas con nombre */
const Personaliza = () => {
  const fotos = [
    ["almohada-aylin", "Aylín · modelo banderín"],
    ["almohada-adrian", "Adrián · modelo banderín"],
    ["almohada-soguita-walter", "Walter · modelo soguita"],
    ["almohada-muselina", "Leo y Mía · modelo muselina"],
  ];
  return (
    <section className="px-2 md:px-6 pb-20 md:pb-32">
      <div className="px-2 md:px-0 flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div className="max-w-[560px]">
          <h2 className="font-serif font-light text-[32px] md:text-[40px] leading-[1.1]">Su nombre, bordado.</h2>
          <p className="mt-2 text-[16px] leading-[1.4] text-ink-soft">
            Almohadas personalizadas para toda la familia: banderín, blonda, soguita, vichy o muselina, de 53 × 40 cm.
          </p>
        </div>
        <Link to="/categoria/almohadas-personalizadas" className={linkUnder}>Ver todas las almohadas</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {fotos.map(([f, label]) => (
          <Link key={f} to="/categoria/almohadas-personalizadas" className="group block">
            <div className="relative aspect-square bg-white overflow-hidden flex items-center justify-center">
              <RefBadge src={img(f)} />
              <img src={img(f)} alt={label} loading="lazy" className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <p className="mt-2 text-[13px] text-ink-soft">{label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

const Colores = () => (
  <section className="px-5 md:px-16 lg:px-32 py-20 md:py-28 bg-sand">
    <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 items-center">
      <div>
        <h2 className="font-serif font-light text-[32px] md:text-[40px] leading-[1.1]">Colores y estampados.</h2>
        <p className="mt-3 text-[16px] leading-[1.45] text-ink-soft">
          Color entero en algodón Perú Pima de 200 hilos (pastel y vivos), estampados básicos, estampados premium de 240 hilos y
          sábanas de 300 y 400 hilos.
        </p>
        <Link to="/colores" className={`${btnDark} mt-7`}>Ver todas las cartillas</Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[COLOR_CHARTS[0].images[0], COLOR_CHARTS[0].images[1], COLOR_CHARTS[1].images[0], COLOR_CHARTS[2].images[8], COLOR_CHARTS[2].images[3], COLOR_CHARTS[2].images[7]].map((im) => (
          <Link key={im.src} to="/colores" className="aspect-square bg-white overflow-hidden flex items-center justify-center">
            <img src={im.src} alt={im.label} loading="lazy" className="max-w-full max-h-full object-contain" />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const Conjuntos = () => {
  const items = productsIn("conjuntos").slice(0, 8);
  const c = useCarousel();
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 md:py-28">
      <div className="flex items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="font-serif font-light text-[32px] md:text-[40px] leading-[1.1]">Conjuntos · cierre de temporada</h2>
          <p className="mt-2 text-[16px] text-ink-soft">Niños y niñas de 1 a 8 años, desde S/ 40. Por compras del catálogo, llévate cualquier conjunto en S/ 38.</p>
        </div>
        <Arrows c={c} />
      </div>
      <div ref={c.ref} onScroll={c.update} className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        {items.map((p) => (
          <ProductCard key={p.slug} p={p} className="shrink-0 w-[56vw] md:w-[calc((100%-2rem)/5)] snap-start" />
        ))}
      </div>
      <Link to="/categoria/conjuntos" className={`${linkUnder} inline-block mt-8`}>Ver los 33 conjuntos</Link>
    </section>
  );
};

const Trabajos = () => (
  <section className="px-2 md:px-6 pb-20 md:pb-28">
    <div className="px-2 md:px-0 mb-8 max-w-[640px]">
      <h2 className="font-serif font-light text-[32px] md:text-[40px] leading-[1.1]">Algunos trabajos realizados y envíos.</h2>
      <p className="mt-2 text-[16px] text-ink-soft">{STORE.shipping}. Cada pedido se empaca con cuidado en nuestro taller.</p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      {TRABAJOS.map((src, i) => (
        <div key={src} className="aspect-[3/4] bg-card overflow-hidden">
          <img src={src} alt={`Trabajo realizado ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
    <div className="mt-10 px-2 md:px-0">
      <a href={waLink("¡Hola Lilo Baby! 🤍 Quiero hacer un pedido.")} target="_blank" rel="noopener" className={btnDark}>
        Haz tu pedido por WhatsApp
      </a>
    </div>
  </section>
);

const Home = () => {
  useTitle("");
  return (
    <>
      <Hero />
      <Intro />
      <Categories />
      <BestSellers />
      <Story />
      <Personaliza />
      <Colores />
      <Conjuntos />
      <Trabajos />
    </>
  );
};

export default Home;
