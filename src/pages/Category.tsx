import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CATEGORIES, getCategory, productsIn } from "@/data";
import { Breadcrumb, gridCols, PastelHeader, ProductCard, useTitle } from "@/components/ui";
import NotFound from "./NotFound";

const PASTELES = ["bg-[#f5dde2]", "bg-[#e2ecdb]", "bg-[#dfe9f4]", "bg-[#f6ead7]"];

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
    <>
      <PastelHeader
        title={cat.name}
        description={cat.description}
        image={cat.image}
        breadcrumb={<Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: cat.name }]} />}
      >
        {esConjuntos && (
          <div className="mt-6 flex gap-2 text-[14px]" role="tablist">
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
                className={`h-10 px-5 rounded-full border ${filtro === k ? "border-ink bg-ink text-white" : "border-black/15 bg-white/70 hover:border-ink"}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </PastelHeader>

      <div className="px-5 md:px-10 lg:px-16 pt-10 md:pt-14 pb-24">
        <p className="text-[13px] text-ink-soft mb-5">
          {items.length} {items.length === 1 ? "producto" : "productos"}
        </p>
        <div className={`grid ${gridCols(items.length)} gap-x-3 gap-y-10`}>
          {items.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>

        <div className="mt-20 rounded-[28px] bg-[#fbf7f2] px-6 md:px-10 py-8">
          <p className="text-[14px] text-ink-soft mb-4">Otras categorías</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c, i) => (
              <Link
                key={c.slug}
                to={`/categoria/${c.slug}`}
                className={`${PASTELES[i % PASTELES.length]} rounded-full pl-1.5 pr-5 py-1.5 inline-flex items-center gap-3 hover:brightness-95 transition`}
              >
                <img src={c.image} alt="" aria-hidden className="w-10 h-10 rounded-full object-cover bg-white" />
                <span className="font-serif text-[19px]">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
