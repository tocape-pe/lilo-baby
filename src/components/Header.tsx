import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { STORE, waLink } from "@/config";
import { WhatsAppIcon } from "./WhatsAppIcon";

const NAV = [
  { label: "Más pedidos", href: "#mas-pedidos" },
  { label: "Sets de cuna", href: "#categorias" },
  { label: "Protectores", href: "#categorias" },
  { label: "Almohadas con nombre", href: "#personaliza" },
  { label: "Colores", href: "#colores" },
  { label: "Detalles", href: "#detalles" },
];

const BAR_H = 37;

export const AnnouncementBar = () => (
  <div className="h-[37px] bg-black text-white text-[13px] md:text-[14px] flex items-center px-4 md:px-4 overflow-hidden whitespace-nowrap">
    <a href={waLink("¡Hola Lilo Baby! 🤍 Quiero hacer un pedido.")} target="_blank" rel="noopener" className="hover:underline">
      Pedidos por WhatsApp {STORE.whatsappDisplay}
    </a>
    <span className="mx-2 opacity-60">|</span>
    <span className="truncate">{STORE.city} · {STORE.shipping}</span>
  </div>
);

// Transparente sobre el hero; al bajar se fija arriba con fondo blanco (como la referencia)
export const Header = () => {
  const [y, setY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = y > BAR_H || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 z-40 h-14 transition-colors duration-300 ${solid ? "bg-white" : "bg-transparent"}`}
        style={{ top: Math.max(0, BAR_H - y) }}
      >
        <div className="h-full flex items-center justify-between px-5">
          <button className="lg:hidden -ml-1 p-1" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"}>
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
          <nav className="hidden lg:flex items-center gap-6 text-[14px]">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="hover:underline underline-offset-4">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <a href="#" aria-label="Lilo Baby, inicio" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <img src="/logo-lilo-wordmark.png" alt="Lilo Baby & Kids" className="h-12 w-auto" />
            </a>
            <a href={STORE.tiktok} target="_blank" rel="noopener" className="hidden lg:block text-[14px] hover:underline underline-offset-4">
              TikTok
            </a>
            <a
              href={waLink("¡Hola Lilo Baby! 🤍 Quiero hacer un pedido.")}
              target="_blank"
              rel="noopener"
              aria-label="Escríbenos por WhatsApp"
              className="p-1"
            >
              <WhatsAppIcon size={22} className="text-[#25D366]" />
            </a>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-0 bottom-0 z-30 bg-white lg:hidden" style={{ top: Math.max(0, BAR_H - y) + 56 }}>
          <nav className="flex flex-col px-5 pt-4">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="font-serif text-[28px] leading-[1.6] border-b border-black/5">
                {n.label}
              </a>
            ))}
            <a href={STORE.tiktok} target="_blank" rel="noopener" className="mt-6 text-[14px] underline underline-offset-4">
              Síguenos en TikTok
            </a>
          </nav>
        </div>
      )}
    </>
  );
};
