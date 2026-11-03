import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CATEGORIES, getCategory, productsIn } from "@/data";
import { Breadcrumb, ProductCard, useTitle } from "@/components/ui";
import NotFound from "./NotFound";

const Category = () => {
  const { slug } = useParams();
  const cat = getCategory(slug);
  const [filtro, setFiltro] = useState<"todos" | "nino" | "nina">("todos");
  useTitle(cat?.name ?? "");
  if (!cat) return <NotFound />;

  let items = productsIn(cat.slug);
  const esConjuntos = cat.slug === "conjuntos";
  if (esConjuntos && filtro !== "todos") items = items.filter((p) => p.name.startsWith(filtro === "nina" ? "Conjunto niña" : "Conjunto niño"));

  return (
    <div className="px-5 md:px-10 lg:px-16 pt-8 pb-24">
      <Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: cat.name }]} />
      <div className="mt-6 md:mt-10 grid md:grid-cols-[1fr_auto] gap-6 items-end">
        <div className="max-w-[640px]">
          <h1 className="font-serif font-light text-[44px] md:text-[64px] leading-[0.95]">{cat.name}</h1>
          <p className="mt-4 text-[16px] md:text-[18px] leading-[1.4] text-ink-soft">{cat.description}</p>
        </div>
        {esConjuntos && (
          <div className="flex gap-2 text-[14px]" role="tablist">
            {(
              [
                ["todos", "Todos"],
                ["nino", "Niños"],
                ["nina", "Niñas"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={filtro === k}
                onClick={() => setFiltro(k)}
                className={`h-10 px-4 border ${filtro === k ? "border-ink bg-ink text-white" : "border-black/15 hover:border-ink"}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10">
        {items.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>

      <div className="mt-24 border-t border-black/10 pt-10">
        <p className="text-[14px] text-ink-soft mb-4">Otras categorías</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
            <Link key={c.slug} to={`/categoria/${c.slug}`} className="font-serif text-[22px] hover:underline underline-offset-4">
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
