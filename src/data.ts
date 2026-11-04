// Contenido 100 % del «Catálogo Lilobaby 2026» (PDF del cliente): textos, precios y fotos.
// Fotos en public/img/cat (exportadas con LiloBaby/catalogo/exportar_fotos.py).
import conjuntos from "./conjuntos.json";

const img = (name: string) => `/img/cat/${name}.jpg`;

export type Size = { label: string; medida?: string; price: number | number[] };
export type Option = { label: string; extra?: number; image?: string };
export type ColorKey = "200" | "basicos" | "premium" | "300" | "400";

export type Product = {
  slug: string;
  category: string;
  name: string;
  short: string;
  images: string[];
  sizeTitle?: string;
  sizes: Size[];
  /** Precio distinto por modo (ej. elástico 360° / cierre): índice de Size.price */
  modes?: string[];
  options?: { title: string; items: Option[] };
  colors?: ColorKey[];
  details: string[];
  notes?: string[];
  badge?: string;
  catalogPage: number;
};

export type Category = { slug: string; name: string; nav: string; description: string; image: string };

export const CATEGORIES: Category[] = [
  {
    slug: "protectores-de-cuna",
    name: "Protectores de cuna y cama cuna",
    nav: "Protectores de cuna",
    description: "Protectores acolchados para colecho, cuna estándar y cama Montessori, en algodón Perú Pima de 200 hilos.",
    image: img("diseno-op2"),
  },
  {
    slug: "protectores-de-baranda",
    name: "Protectores de baranda",
    nav: "Baranda",
    description: "Nuevo producto Lilo Baby: protege de golpes y mordidas, evitando el contacto directo con la madera.",
    image: img("baranda-cuna-1"),
  },
  {
    slug: "sabanas",
    name: "Sábanas",
    nav: "Sábanas",
    description: "Sets de sábana encimera, bajera con elástico 360° y funda de almohada, de colecho a king.",
    image: img("sabanas-200"),
  },
  {
    slug: "protectores-de-colchon",
    name: "Protectores de colchón",
    nav: "Colchón",
    description: "Acolchados o impermeables, con elástico 360° o con cierre hecho a la medida de tu colchón.",
    image: img("colchon-acolchado-1"),
  },
  {
    slug: "almohadas-personalizadas",
    name: "Almohadas personalizadas",
    nav: "Almohadas",
    description: "Almohadas con su nombre bordado, banderines y letras de tela para toda la familia.",
    image: img("almohada-aitana"),
  },
  {
    slug: "colchonetas-para-coche",
    name: "Colchoneta para coche + almohada",
    nav: "Colchonetas",
    description: "Comodidad y practicidad para cada paseo de tu bebé, con almohada anticabeza plana.",
    image: img("colchoneta-algodon-1"),
  },
  {
    slug: "conjuntos",
    name: "Conjuntos niños y niñas",
    nav: "Conjuntos",
    description: "Cierre de temporada. Por compras del catálogo, llévate cualquier conjunto en S/ 38.",
    image: img("conjunto-07"),
  },
];

/* ---------- Medidas compartidas ---------- */

const PROTECTOR_SIZES = (p: [number, number, number, number, number]): Size[] => [
  { label: "Colecho", medida: "90 × 50 cm", price: p[0] },
  { label: "Cuna estándar", medida: "130 × 70 cm", price: p[1] },
  { label: "Cama Montessori 1 plaza", medida: "190 × 90 cm", price: p[2] },
  { label: "Cama Montessori 1½ plaza", medida: "190 × 105 cm", price: p[3] },
  { label: "Cama Montessori 2 plazas", medida: "190 × 145 cm", price: p[4] },
];

const BED = [
  { label: "Colecho", medida: "90 × 50 + 15 cm de fuelle" },
  { label: "Pack & Play", medida: "94 × 63 o 104 × 67 + 20 cm de fuelle" },
  { label: "Cuna estándar", medida: "130 × 70 + 25 cm de fuelle" },
  { label: "1 plaza", medida: "190 × 90 + 35 cm de fuelle" },
  { label: "1½ plaza", medida: "190 × 105 + 35 cm de fuelle" },
  { label: "2 plazas", medida: "190 × 145 + 35 cm de fuelle" },
  { label: "Queen", medida: "200 × 160 + 40 cm de fuelle" },
  { label: "King", medida: "200 × 200 + 40 cm de fuelle" },
];
const bedSizes = (prices: (number | number[])[], kingLabel = "King"): Size[] =>
  BED.map((b, i) => ({ ...b, label: i === 7 ? kingLabel : b.label, price: prices[i] }));
const pair = (a: number[], b: number[]) => a.map((v, i) => [v, b[i]]);

const PROTECTOR_DETAILS = [
  "Tela exterior suave y resistente: algodón nacional Perú Pima de 200 hilos (hipoalergénica y transpirable).",
  "Interior con napa + espuma, para un buen acolchado que conserva su forma.",
  "Doble forro: uno interno que protege el relleno y uno exterior con cierre, que puedes retirar para facilitar el lavado.",
  "Acabado extra gordito, de aproximadamente 3 cm de espesor.",
  "32 cm de alto.",
  "Incluye las cintas necesarias para sujetar los protectores a la cuna.",
];
const SHEET_INCLUDES = "Incluye sábana encimera, sábana bajera (elástico 360°) y 1 funda de almohada.";
const SHEET_FIT = "Medida completa: bandas laterales unidas con costura reforzada para lograr la altura y el largo ideal del colchón, y que la sábana no se salga.";
const SHEET_ALT = "También puedes pedir el set como 2 sábanas con elástico 360° + 1 funda de almohada.";
const PILLOW_INCLUDES = [
  "Almohada rellena de napa y cubierta en panqueque para evitar su deformación.",
  "Forro blanco interno.",
  "Forro personalizado (1 nombre bordado) con cierre.",
  "Medida: 53 × 40 cm.",
];
const PILLOW_SIZES: Size[] = [
  { label: "Con nombre bordado", medida: "53 × 40 cm", price: 85 },
  { label: "Sin bordado", medida: "53 × 40 cm", price: 75 },
];
const CON_CIERRE = "Los protectores con cierre se hacen a la medida de tu colchón.";

/* ---------- Productos ---------- */

const MAIN: Product[] = [
  {
    slug: "protector-cuna-clasico",
    category: "protectores-de-cuna",
    name: "Protector de cuna clásico color entero",
    short: "Protectores acolchados, confeccionados pensando en la calidad, la comodidad y un bonito acabado para la cuna de tu bebé.",
    images: [img("clasico-1"), img("clasico-2"), img("clasico-3"), img("clasico-op1"), img("clasico-op2"), img("clasico-op3"), img("modelo-cuna"), img("modelo-cama-cuna")],
    sizeTitle: "Modelo",
    sizes: PROTECTOR_SIZES([249, 279, 329, 329, 429]),
    options: {
      title: "Acabado",
      items: [
        { label: "Clásico color entero" },
        { label: "Opción 1 · Sesgo acordonado (borde) + lazos de ajuste en otro color", extra: 15, image: img("clasico-op1") },
        { label: "Opción 2 · Forro 2 caras (color entero + estampado básico)", extra: 25, image: img("clasico-op2") },
        { label: "Opción 3 · Forro 2 caras (color entero + estampado premium)", extra: 35, image: img("clasico-op3") },
      ],
    },
    colors: ["200", "basicos", "premium"],
    details: [...PROTECTOR_DETAILS, "Forro blanco interno. Versión Plus *acolchadito*.", "Cintas de ajuste anchas y delgadas."],
    notes: ["En las opciones 2 y 3, las cintas van del color entero.", "El juego de forros adicional (con cierre) cuesta el 50 % del precio de un juego completo."],
    badge: "Más pedido",
    catalogPage: 6,
  },
  {
    slug: "protector-cuna-personalizado",
    category: "protectores-de-cuna",
    name: "Protector de cuna personalizado con diseño",
    short: "El diseño lo eliges tú. Se evalúa según la complejidad y los materiales con los que trabajamos.",
    images: [img("diseno-1"), img("diseno-op2"), img("diseno-op1"), img("diseno-op3a"), img("diseno-op3b"), img("diseno-2"), img("diseno-3")],
    sizeTitle: "Modelo",
    sizes: PROTECTOR_SIZES([299, 329, 379, 379, 479]),
    options: {
      title: "Diseño",
      items: [
        { label: "Diseño a tu elección" },
        { label: "Opción 1 · Forro delantero en 2 divisiones (color entero + estampado premium abajo) con sesgo acordonado", image: img("diseno-op1") },
        { label: "Opción 2 · Lazo y blonda en la línea media", image: img("diseno-op2") },
        { label: "Opción 3 · Bobos en la parte superior y finas líneas verticales", image: img("diseno-op3a") },
      ],
    },
    colors: ["200", "basicos", "premium"],
    details: [...PROTECTOR_DETAILS, "Presillas para ajuste inferior.", "Cintas de ajuste anchas y delgadas.", "Forro blanco interno. Versión Plus *acolchadito*."],
    notes: ["Las opciones 1, 2 y 3 valen el mismo precio del personalizado.", "La almohada decorativa no está incluida: S/ 50."],
    badge: "Personalizado",
    catalogPage: 8,
  },
  {
    slug: "protector-enrollable",
    category: "protectores-de-cuna",
    name: "Protector enrollable color entero con bobos",
    short: "Protector enrollable de 32 cm de alto con bobos, en paneles delgados o gruesos.",
    images: [img("enrollable-1"), img("enrollable-2"), img("enrollable-3")],
    sizeTitle: "Modelo",
    sizes: PROTECTOR_SIZES([249, 279, 329, 329, 429]),
    options: { title: "Paneles", items: [{ label: "Paneles delgados" }, { label: "Paneles gruesos" }] },
    colors: ["200", "basicos", "premium"],
    details: ["32 cm de alto.", "Color entero con bobos.", "Algodón nacional Perú Pima de 200 hilos."],
    notes: ["Lateral con trenza (terciopelo): cotización por mensaje, varía según la medida."],
    catalogPage: 12,
  },
  {
    slug: "protector-baranda-cuna",
    category: "protectores-de-baranda",
    name: "Protector de baranda acolchado · Cuna",
    short: "Protege de golpes y mordidas, evitando el contacto directo con la madera.",
    images: [img("baranda-cuna-1"), img("baranda-cuna-2"), img("baranda-cuna-3"), img("baranda-cuna-4")],
    sizeTitle: "Lados",
    sizes: [
      { label: "1 lateral", medida: "128 cm", price: 70 },
      { label: "2 laterales", medida: "128 cm c/u", price: 125 },
      { label: "4 lados", medida: "contorno total", price: 192 },
    ],
    options: { title: "Tela", items: [{ label: "Color entero o estampado básico" }, { label: "Estampado premium 240 hilos", extra: 10 }] },
    colors: ["200", "basicos", "premium"],
    details: [
      "Material: algodón de 200 hilos con acolchado interno de espuma.",
      "Cierre: velcro para sujetarlo a la baranda superior, entre sus ranuras.",
      "Desmontable: forro removible para facilitar el lavado.",
      "Medidas: 15 cm de alto × 128 cm de largo.",
      "Ideal para cunas de 130 × 70 cm.",
    ],
    badge: "Nuevo",
    catalogPage: 14,
  },
  {
    slug: "protector-baranda-montessori",
    category: "protectores-de-baranda",
    name: "Protector de baranda acolchado · Cama Montessori",
    short: "Protege de golpes y mordidas, evitando el contacto directo con la madera.",
    images: [img("baranda-mont-1"), img("baranda-mont-2"), img("baranda-mont-3"), img("baranda-mont-4")],
    sizeTitle: "Lados",
    sizes: [
      { label: "1 lateral", medida: "190 cm", price: 99 },
      { label: "2 laterales", medida: "lateral largo + puertita", price: 180 },
      { label: "4 lados", medida: "contorno total", price: 280 },
    ],
    options: { title: "Tela", items: [{ label: "Color entero o estampado básico" }, { label: "Estampado premium 240 hilos", extra: 10 }] },
    colors: ["200", "basicos", "premium"],
    details: [
      "Material: algodón de 200 hilos con acolchado interno de espuma.",
      "Cierre: velcro para sujetarlo a la baranda superior, entre sus ranuras.",
      "Desmontable: forro removible para facilitar el lavado.",
      "Medidas: 15 cm de alto × 188 cm de largo.",
      "Ideal para cama cuna Montessori de 1½ plaza (190 × 105 cm).",
    ],
    badge: "Nuevo",
    catalogPage: 15,
  },
  {
    slug: "sabanas-color-entero-200-hilos",
    category: "sabanas",
    name: "Sábanas color entero 200 hilos",
    short: "Algodón nacional de 200 hilos de la marca Perú Pima: suaves, frescas y transpirables.",
    images: [img("sabanas-200"), img("cartilla-200-pastel"), img("cartilla-200-vivos")],
    sizeTitle: "Medida",
    sizes: bedSizes([100, 105, 121, 169, 169, 180, 188, 200], "King económica"),
    colors: ["200"],
    details: ["Algodón nacional Perú Pima de 200 hilos.", "Hipoalergénicas, transpirables y anti ácaros.", SHEET_INCLUDES, SHEET_FIT],
    notes: [SHEET_ALT],
    catalogPage: 20,
  },
  {
    slug: "sabanas-estampado-premium-240-hilos",
    category: "sabanas",
    name: "Sábanas estampado premium 240 hilos",
    short: "Algodón pima de 240 hilos: suavidad y confort para acompañar tus noches.",
    images: [img("sabanas-240"), img("premium-4"), img("premium-5"), img("premium-8"), img("premium-9")],
    sizeTitle: "Medida",
    sizes: bedSizes([108, 118, 130, 197, 197, 210, 225, 237]),
    colors: ["premium"],
    details: ["100 % algodón pima de 240 hilos.", "Hipoalergénicas, transpirables y anti ácaros, ideales para un descanso confortable.", SHEET_INCLUDES, SHEET_FIT],
    notes: [SHEET_ALT],
    catalogPage: 22,
  },
  {
    slug: "sabanas-color-entero-300-hilos",
    category: "sabanas",
    name: "Sábanas color entero 300 hilos",
    short: "Algodón pima de 300 hilos: tacto delicado y una sensación de suavidad superior.",
    images: [img("sabanas-300"), img("cartilla-300")],
    sizeTitle: "Medida",
    sizes: bedSizes([125, 130, 151, 215, 215, 243, 255, 283]),
    colors: ["300"],
    details: ["100 % algodón pima de 300 hilos.", "Hipoalergénicas, transpirables y anti ácaros: combinan comodidad y bienestar.", SHEET_INCLUDES, "Medida completa, diseñada para un buen cubrimiento y para que la sábana no se salga del colchón."],
    catalogPage: 24,
  },
  {
    slug: "sabanas-color-entero-400-hilos",
    category: "sabanas",
    name: "Sábanas color entero 400 hilos",
    short: "Algodón pima de 400 hilos: acabado elegante y un tacto especialmente suave.",
    images: [img("sabanas-400"), img("sabanas-400-tonos"), img("cartilla-400")],
    sizeTitle: "Medida",
    sizes: bedSizes([145, 150, 184, 275, 275, 313, 331, 369]),
    colors: ["400"],
    details: ["100 % algodón pima de 400 hilos.", "Hipoalergénicas, transpirables y anti ácaros: combinan confort y elegancia.", SHEET_INCLUDES, "Medida completa, diseñada para un buen cubrimiento y para que la sábana no se salga del colchón."],
    catalogPage: 26,
  },
  {
    slug: "protector-colchon-acolchado",
    category: "protectores-de-colchon",
    name: "Protector de colchón acolchado (no impermeable)",
    short: "Tela de algodón suave, fresca y agradable al tacto, con un diseño acolchado para una superficie cómoda.",
    images: [img("colchon-acolchado-1"), img("colchon-acolchado-2")],
    sizeTitle: "Medida",
    modes: ["Con elástico 360°", "Con cierre"],
    sizes: bedSizes(pair([77, 83, 89, 99, 99, 109, 117, 120], [82, 89, 95, 107, 107, 122, 134, 138])),
    details: [
      "Ayuda a proteger el colchón del polvo y del contacto directo con la suciedad cotidiana.",
      "Ideal si buscas una opción suave, fresca y transpirable.",
      "Importante: no es impermeable, no evita el paso de líquidos al colchón.",
    ],
    notes: [CON_CIERRE],
    catalogPage: 29,
  },
  {
    slug: "protector-colchon-impermeable-clasico",
    category: "protectores-de-colchon",
    name: "Protector impermeable clásico",
    short: "Protección práctica para tu colchón contra derrames, sudor y accidentes cotidianos.",
    images: [img("colchon-clasico")],
    sizeTitle: "Medida",
    modes: ["Con elástico 360°", "Con cierre"],
    sizes: bedSizes(pair([91, 99, 102, 123, 123, 142, 164, 168], [96, 105, 108, 137, 137, 156, 184, 188])),
    details: [
      "Superficie superior de algodón bramante, panqueque acolchado al medio y base inferior impermeable.",
      "La base impermeable está diseñada para impedir el paso de líquidos hacia el colchón.",
      "Facilita la limpieza y el cuidado del colchón.",
    ],
    notes: [CON_CIERRE],
    catalogPage: 30,
  },
  {
    slug: "protector-colchon-impermeable-bambu",
    category: "protectores-de-colchon",
    name: "Protector impermeable de bambú premium",
    short: "Capa de fibra de bambú suave y transpirable que mantiene una temperatura óptima durante el descanso.",
    images: [img("colchon-bambu")],
    sizeTitle: "Medida",
    modes: ["Con elástico 360°", "Con cierre"],
    sizes: bedSizes(pair([94, 103, 106, 128, 128, 149, 164, 173], [99, 108, 115, 142, 142, 165, 179, 198])),
    details: [
      "Hecho de fibra de bambú: sensación suave y transpirable.",
      "Hipoalergénico: la fibra de bambú es naturalmente resistente a los ácaros del polvo y a los alérgenos.",
      "Impermeable: diseñado para impedir el paso de líquidos.",
    ],
    notes: [CON_CIERRE],
    catalogPage: 31,
  },
  {
    slug: "almohada-modelo-banderin",
    category: "almohadas-personalizadas",
    name: "Almohada personalizada · Modelo banderín",
    short: "Con su nombre bordado y banderines de tela.",
    images: [img("almohada-aitana"), img("almohada-alba"), img("almohada-adrian"), img("almohada-aylin")],
    sizes: PILLOW_SIZES,
    colors: ["200"],
    details: PILLOW_INCLUDES,
    badge: "Con su nombre",
    catalogPage: 33,
  },
  {
    slug: "almohada-modelo-blonda",
    category: "almohadas-personalizadas",
    name: "Almohada personalizada · Modelo blonda",
    short: "Con marco de blonda y su nombre o un diseño bordado.",
    images: [img("almohada-blonda-mariposas"), img("almohada-blonda-globo")],
    sizes: PILLOW_SIZES,
    colors: ["200"],
    details: PILLOW_INCLUDES,
    catalogPage: 33,
  },
  {
    slug: "almohada-modelo-soguita",
    category: "almohadas-personalizadas",
    name: "Almohada personalizada · Modelo soguita",
    short: "Con soguita y su nombre bordado.",
    images: [img("almohada-soguita-walter"), img("almohada-soguita-terracota")],
    sizes: PILLOW_SIZES,
    colors: ["200"],
    details: PILLOW_INCLUDES,
    catalogPage: 33,
  },
  {
    slug: "almohada-modelo-vichy",
    category: "almohadas-personalizadas",
    name: "Almohada personalizada · Modelo vichy con bobos",
    short: "Con bobos alrededor y su nombre bordado.",
    images: [img("almohada-vichy-santiago"), img("almohada-vichy-rayas")],
    sizes: PILLOW_SIZES,
    details: PILLOW_INCLUDES,
    catalogPage: 34,
  },
  {
    slug: "almohada-modelo-muselina",
    category: "almohadas-personalizadas",
    name: "Almohada personalizada · Modelo en muselina con bobos",
    short: "En muselina, con bobos y su nombre bordado.",
    images: [img("almohada-muselina")],
    sizes: PILLOW_SIZES,
    details: PILLOW_INCLUDES,
    catalogPage: 34,
  },
  {
    slug: "almohadas-formas-variadas",
    category: "almohadas-personalizadas",
    name: "Almohadas formas variadas",
    short: "Estrellas, nubes, lunas y más, en tela carnerito, terciopelo o felpa.",
    images: [img("almohada-formas-estrellas"), img("almohada-formas-nube")],
    sizes: [{ label: "2 almohadas", medida: "40 cm de alto", price: 100 }],
    details: ["Almohada rellena de napa.", "Figura a elección (sin fuelle).", "Tela carnerito, terciopelo o felpa.", "Medida: 40 cm de alto."],
    catalogPage: 34,
  },
  {
    slug: "banderines-y-letras",
    category: "almohadas-personalizadas",
    name: "Banderines y letras de tela",
    short: "Para decorar la cuna o el cuarto con su nombre.",
    images: [img("banderin-vichy"), img("letras-tomy"), img("letras-leno")],
    sizeTitle: "Elige",
    sizes: [
      { label: "Banderín de 9 triángulos", medida: "135 cm de largo", price: 40 },
      { label: "Letra de tela (c/u)", medida: "15 cm de alto", price: 10 },
      { label: "Adicional: estrella, luna, corazón… (c/u)", price: 5 },
    ],
    details: [
      "Banderín: 9 triángulos de 15 × 20 cm, largo total de 135 cm.",
      "Tiras adicionales para amarrar: 25 cm a cada lado.",
      "Banderín en 3 colores o estampados diferentes.",
      "Letras de 15 cm de alto, en 4 colores o estampados diferentes.",
    ],
    catalogPage: 35,
  },
  {
    slug: "almohada-jovenes-y-adultos",
    category: "almohadas-personalizadas",
    name: "Almohada personalizada · Jóvenes y adultos",
    short: "Con su nombre bordado, para toda la familia.",
    images: [img("almohada-adulto-diane"), img("almohada-adulto-jose"), img("almohada-adulto-angel"), img("almohada-adulto-angel-2")],
    sizes: [
      { label: "1 almohada", medida: "60 × 40 cm", price: 80 },
      { label: "2 almohadas", medida: "60 × 40 cm", price: 150 },
      { label: "1 almohada larga", medida: "100 × 40 cm", price: 100 },
    ],
    details: ["Almohada rellena de napa y cubierta en panqueque para evitar su deformación.", "Forro blanco interno.", "Forro personalizado con cierre."],
    catalogPage: 35,
  },
  {
    slug: "colchoneta-coche-algodon",
    category: "colchonetas-para-coche",
    name: "Colchoneta para coche + almohada · Algodón 200 hilos",
    short: "Comodidad y practicidad para cada paseo de tu bebé, con almohada anticabeza plana.",
    images: [img("colchoneta-algodon-1"), img("colchoneta-algodon-2"), img("colchoneta-mecedora")],
    sizes: [{ label: "Universal", medida: "coche y mecedora", price: 130 }],
    details: [
      "Modelo universal, adaptable a diferentes modelos de coche y mecedoras.",
      "Ranuras laterales para pasar los arneses fácilmente, sin desmontar las correas.",
      "Modelo reversible: delantero en algodón estampado de 200 hilos, espalda en algodón de 200 hilos.",
      "Incluye almohada anticabeza plana.",
    ],
    catalogPage: 37,
  },
  {
    slug: "colchoneta-coche-muselina",
    category: "colchonetas-para-coche",
    name: "Colchoneta para coche + almohada · Muselina",
    short: "Suave y agradable al tacto. Personalízala con el estampado de tu preferencia.",
    images: [img("colchoneta-muselina-1"), img("colchoneta-muselina-2"), img("colchoneta-muselina-3"), img("colchoneta-muselina-4")],
    sizes: [{ label: "Universal", medida: "coche y mecedora", price: 130 }],
    details: [
      "Modelo universal, adaptable a diferentes modelos de coche y mecedoras.",
      "Ranuras laterales para pasar los arneses fácilmente.",
      "Modelo reversible: delantero en muselina estampada, espalda en algodón de 200 hilos.",
      "Incluye almohada anticabeza plana.",
    ],
    catalogPage: 38,
  },
];

type Conjunto = { slug: string; pagina: number; descripcion: string; talla: string; precio: number; largo: string; genero: "nino" | "nina" };

const CONJUNTOS: Product[] = (conjuntos as Conjunto[]).map((c) => ({
  slug: c.slug,
  category: "conjuntos",
  name: `${c.genero === "nina" ? "Conjunto niña" : "Conjunto niño"} · ${c.talla}`,
  short: c.descripcion + ".",
  images: [img(c.slug)],
  sizeTitle: "Talla",
  sizes: [{ label: c.talla, medida: c.largo.replace("Largo de ", "largo de "), price: c.precio }],
  details: [c.descripcion + ".", `Referencia — ${c.largo}.`],
  notes: ["Por compras del catálogo, llévate cualquier conjunto en S/ 38."],
  badge: "Cierre de temporada",
  catalogPage: c.pagina,
}));

export const PRODUCTS: Product[] = [...MAIN, ...CONJUNTOS];

export const BEST_SELLERS = [
  "protector-cuna-clasico",
  "protector-cuna-personalizado",
  "almohada-modelo-banderin",
  "sabanas-color-entero-200-hilos",
  "protector-baranda-cuna",
  "colchoneta-coche-algodon",
  "protector-enrollable",
  "almohada-jovenes-y-adultos",
];

/* ---------- Cartillas de colores ---------- */

export const COLOR_CHARTS: { key: ColorKey; title: string; subtitle: string; images: { src: string; label: string }[] }[] = [
  {
    key: "200",
    title: "Color entero 200 hilos",
    subtitle: "Algodón nacional Perú Pima de 200 hilos · colores pastel y colores vivos",
    images: [
      { src: img("cartilla-200-pastel"), label: "Colores pastel" },
      { src: img("cartilla-200-vivos"), label: "Colores vivos" },
    ],
  },
  {
    key: "basicos",
    title: "Estampados básicos 200 hilos",
    subtitle: "Algodón nacional Perú Pima de 200 hilos · estrellas y zigzag",
    images: [
      { src: img("cartilla-basico-estrellas"), label: "Estrellas" },
      { src: img("cartilla-basico-zigzag"), label: "Zigzag (rosa, celeste, plomo)" },
    ],
  },
  {
    key: "premium",
    title: "Estampados premium 240 hilos",
    subtitle: "100 % algodón pima de 240 hilos",
    images: Array.from({ length: 10 }, (_, i) => ({ src: img(`premium-${i + 1}`), label: `Estampado ${i + 1}` })),
  },
  {
    key: "300",
    title: "Color entero 300 hilos",
    subtitle: "100 % algodón pima de 300 hilos · blanco, plomo, perla y beige",
    images: [{ src: img("cartilla-300"), label: "Blanco, plomo, perla, beige" }],
  },
  {
    key: "400",
    title: "Color entero 400 hilos",
    subtitle: "100 % algodón pima de 400 hilos · rosa francia, beige, crema, blanco, plomo y zircón",
    images: [
      { src: img("cartilla-400"), label: "Rosa francia, beige, crema, blanco, plomo, zircón" },
      { src: img("sabanas-400-tonos"), label: "Tonos 400 hilos" },
    ],
  },
];

export const TRABAJOS = [1, 2, 3, 4, 5, 6].map((n) => img(`trabajo-${n}`));

export const IMG = {
  lilito: img("lilito"),
  guia: img("guia-medidas"),
};

/* ---------- Helpers ---------- */

export const getCategory = (slug?: string) => CATEGORIES.find((c) => c.slug === slug);
export const getProduct = (slug?: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsIn = (category: string) => PRODUCTS.filter((p) => p.category === category);
export const priceOf = (s: Size, mode = 0) => (Array.isArray(s.price) ? s.price[mode] : s.price);
export const minPrice = (p: Product) => Math.min(...p.sizes.map((s) => priceOf(s, 0)));
export const soles = (n: number) => `S/ ${n}`;
