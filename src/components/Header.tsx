import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { STORE, waLink } from "@/config";
import { CATEGORIES } from "@/data";
import { WhatsAppIcon } from "./WhatsAppIcon";

const NAV = [...CATEGORIES.map((c) => ({ label: c.nav, to: `/categoria/${c.slug}` })), { label: "Colores", to: "/colores" }];

export const AnnouncementBar = () => (
  <div className="h-[37px] bg-black text-white text-[13px] md:text-[14px] flex items-center justify-center px-4 overflow-hidden whitespace-nowrap">
    <a href={waLink("¡Hola Lilo Baby! 🤍 Quiero hacer un pedido.")} target="_blank" rel="noopener" className="hover:underline">
      Pedidos por WhatsApp {STORE.whatsappDisplay}
    </a>
    <span className="mx-2 opacity-60">|</span>
    <span className="truncate">{STORE.shipping}</span>
  </div>
);

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black/[0.06]">
      <div className="h-16 flex items-center justify-between px-5">
        <button className="lg:hidden -ml-1 p-1" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"}>
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[14px]">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `hover:underline underline-offset-4 ${isActive ? "underline" : ""}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <Link to="/" aria-label="Lilo Baby, inicio" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <img src="/logo-lilo.png" alt="Lilo Baby & Kids" className="h-11 w-auto" />
          </Link>
          <a href={STORE.tiktok} target="_blank" rel="noopener" className="hidden lg:block text-[14px] hover:underline underline-offset-4">
            TikTok
          </a>
          <a href={waLink("¡Hola Lilo Baby! 🤍 Quiero hacer un pedido.")} target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp" className="p-1">
            <WhatsAppIcon size={22} className="text-[#25D366]" />
          </a>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-[101px] bottom-0 z-30 bg-white overflow-y-auto">
          <nav className="flex flex-col px-5 pt-2 pb-10">
            <Link to="/" className="font-serif text-[26px] leading-[1.7] border-b border-black/5">Inicio</Link>
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="font-serif text-[26px] leading-[1.7] border-b border-black/5">
                {n.label}
              </Link>
            ))}
            <Link to="/guia-de-medidas" className="mt-6 text-[14px] underline underline-offset-4">Guía de medidas</Link>
            <a href={STORE.tiktok} target="_blank" rel="noopener" className="mt-3 text-[14px] underline underline-offset-4">Síguenos en TikTok</a>
          </nav>
        </div>
      )}
    </header>
  );
};
