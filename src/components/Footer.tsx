import { Link } from "react-router-dom";
import { STORE, waLink } from "@/config";
import { CATEGORIES } from "@/data";
import { WhatsAppIcon } from "./WhatsAppIcon";

const AYUDA: [string, string][] = [
  ["Cómo pedir", waLink("¡Hola Lilo Baby! 🤍 ¿Cómo hago mi pedido?")],
  ["Envíos por courier y Shalom", waLink("¡Hola Lilo Baby! 🤍 ¿Cuánto cuesta el envío a mi ciudad?")],
  ["Pedir el catálogo", waLink("¡Hola Lilo Baby! 🤍 ¿Me envían el catálogo 2026?")],
];

export const Footer = () => (
  <footer className="bg-[#efebe6] px-5 pt-8 pb-5">
    <div className="grid md:grid-cols-[1fr_1.4fr] gap-12">
      <div className="max-w-[344px]">
        <h2 className="font-serif font-light text-[28px] leading-[1.2]">Hecho a mano con amor para todas las familias del Perú.</h2>
        <a
          href={waLink("¡Hola Lilo Baby! 🤍 Quiero hacer un pedido.")}
          target="_blank"
          rel="noopener"
          className="mt-7 flex items-center justify-between h-11 px-5 bg-ink text-white text-[14px] hover:bg-black"
        >
          WhatsApp {STORE.whatsappDisplay}
          <WhatsAppIcon size={18} />
        </a>
        <p className="mt-3 text-[13px] text-ink-soft leading-[1.5]">
          Tienda virtual y taller: {STORE.workshop}.<br />
          {STORE.shipping}.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 content-start">
        <div>
          <h3 className="text-[14px]">Tienda.</h3>
          <ul className="mt-1">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/categoria/${c.slug}`} className="text-[14px] leading-[2.05] text-ink-soft hover:text-ink">{c.nav}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[14px]">Ayuda.</h3>
          <ul className="mt-1">
            <li><Link to="/colores" className="text-[14px] leading-[2.05] text-ink-soft hover:text-ink">Colores y estampados</Link></li>
            <li><Link to="/guia-de-medidas" className="text-[14px] leading-[2.05] text-ink-soft hover:text-ink">Guía de medidas</Link></li>
            {AYUDA.map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener" className="text-[14px] leading-[2.05] text-ink-soft hover:text-ink">{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[14px]">Síguenos.</h3>
          <ul className="mt-1">
            <li><a href={STORE.tiktok} target="_blank" rel="noopener" className="text-[14px] leading-[2.05] text-ink-soft hover:text-ink">TikTok · Lilobaby.pe</a></li>
            <li><a href={STORE.instagram} target="_blank" rel="noopener" className="text-[14px] leading-[2.05] text-ink-soft hover:text-ink">Instagram · Lilobaby.pe</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:pl-[calc(41.6%+1.2rem)]">
      <img src="/logo-lilo.png" alt="Lilo Baby & Kids" className="h-16 w-auto self-start" />
      <p className="text-[13px] text-ink-soft">© {new Date().getFullYear()} Lilo Baby · Hecho a mano en Perú</p>
    </div>
  </footer>
);

export const WhatsAppFloat = () => (
  <a
    href={waLink("¡Hola Lilo Baby! 🤍 Quiero hacer un pedido.")}
    target="_blank"
    rel="noopener"
    aria-label="Escríbenos por WhatsApp"
    className="fixed right-5 bottom-5 md:right-[30px] md:bottom-[18px] z-40 w-[60px] h-[60px] rounded-full bg-[#25D366] text-white shadow-[0_2px_12px_rgba(0,0,0,0.25)] flex items-center justify-center hover:scale-105 transition-transform"
  >
    <WhatsAppIcon size={32} />
  </a>
);
