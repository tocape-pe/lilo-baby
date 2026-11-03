import { Link } from "react-router-dom";
import { IMG } from "@/data";
import { Breadcrumb, useTitle } from "@/components/ui";

const PASOS = [
  ["Cabecera", "Mide el largo interior de la cabecera (desde el borde interno de un lado al otro)."],
  ["Pies", "Mide el largo interior del pie de cama (de borde interno a borde interno)."],
  ["Lateral izquierdo (o lateral 1)", "Mide el largo interior de ese lado (desde un extremo al otro)."],
  ["Lateral derecho (o lateral 2)", "Mide el largo interior de ese lado (desde un extremo al otro)."],
];

const Guide = () => {
  useTitle("Guía de medidas");
  return (
    <div className="px-5 md:px-10 lg:px-16 pt-8 pb-24">
      <Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: "Guía de medidas" }]} />
      <div className="mt-6 md:mt-10 grid lg:grid-cols-[1fr_1.3fr] gap-10 items-start">
        <div>
          <h1 className="font-serif font-light text-[44px] md:text-[64px] leading-[0.95]">Guía de medidas</h1>
          <p className="mt-4 text-[16px] md:text-[18px] leading-[1.45] text-ink-soft">
            Los protectores van por encima del colchón y dentro de la cama, por eso las medidas se toman desde la parte superior del colchón.
          </p>
          <ol className="mt-8 space-y-5">
            {PASOS.map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="w-8 h-8 shrink-0 rounded-full bg-sand flex items-center justify-center text-[14px]">{i + 1}</span>
                <span>
                  <span className="block text-[15px]">{t}</span>
                  <span className="block text-[14px] text-ink-soft">{d}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[14px]">
            <strong className="font-medium">Importante:</strong> las medidas se toman desde la parte superior del colchón, no desde la base de la
            cama.
          </p>
          <Link to="/categoria/protectores-de-cuna" className="inline-block mt-8 text-[14px] underline underline-offset-4">
            Ver protectores de cuna
          </Link>
        </div>
        <img src={IMG.guia} alt="Guía de medidas para protectores de cama del catálogo Lilo Baby" className="w-full" />
      </div>
    </div>
  );
};

export default Guide;
