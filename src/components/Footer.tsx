import { STORE, waLink } from "@/config";
import { WhatsAppIcon } from "./WhatsAppIcon";

const COLUMNS = [
  {
    title: "Tienda.",
    links: [
      ["Sets de cuna", "#categorias"],
      ["Protectores", "#categorias"],
      ["Almohadas con nombre", "#personaliza"],
      ["Sábanas", "#detalles"],
      ["Cama Montessori", "#categorias"],
    ],
  },
  {
    title: "Ayuda.",
    links: [
      ["Cómo pedir", waLink("¡Hola Lilo Baby! 🤍 ¿Cómo hago mi pedido?")],
      ["Envíos por Shalom", waLink("¡Hola Lilo Baby! 🤍 ¿Cuánto cuesta el envío por Shalom a mi ciudad?")],
      ["Cuidado de las telas", waLink("¡Hola Lilo Baby! 🤍 ¿Cómo lavo los protectores?")],
      ["Pedir el catálogo", waLink("¡Hola Lilo Baby! 🤍 ¿Me envían el catálogo?")],
    ],
  },
  {
    title: "Síguenos.",
    links: [["TikTok", STORE.tiktok]],
  },
];

export const Footer = () => (
  <footer className="bg-[#efebe6] px-5 pt-6 pb-5">
    <div className="grid md:grid-cols-[1fr_1.4fr] gap-12">
      <div className="max-w-[344px]">
        <h2 className="font-serif font-light text-[28px] leading-[1.2]">¿Armamos su set?</h2>
        <p className="text-[16px] text-ink-soft leading-[1.4]">Escríbenos y te enviamos el catálogo con telas y colores.</p>
        <a
          href={waLink("¡Hola Lilo Baby! 🤍 ¿Me envían el catálogo?")}
          target="_blank"
          rel="noopener"
          className="mt-7 flex items-center justify-between h-11 px-5 bg-ink text-white text-[14px] hover:bg-black"
        >
          WhatsApp {STORE.whatsappDisplay}
          <WhatsAppIcon size={18} />
        </a>
        <p className="mt-3 text-[12px] text-ink-soft leading-[1.4]">
          {STORE.city} · {STORE.shipping}.
        </p>
        <img src="/img/flatlay.jpg" alt="Sábanas, frazada y protector Lilo Baby doblados" loading="lazy" className="hidden md:block mt-24 w-[344px] aspect-square object-cover" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 content-start">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-[14px]">{col.title}</h3>
            <ul className="mt-1">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                    className="text-[14px] leading-[2.05] text-ink-soft hover:text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:pl-[calc(41.6%+1.2rem)]">
      <img src="/logo-lilo-wordmark.png" alt="Lilo Baby & Kids" className="h-20 w-auto self-start" />
      <p className="text-[13px] text-ink-soft">© {new Date().getFullYear()} Lilo Baby · Hecho a mano en Perú</p>
    </div>
  </footer>
);

/* Botón flotante (equivalente al chat de la referencia) */
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
