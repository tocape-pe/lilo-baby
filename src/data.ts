// Fotos: "real-*" = fotogramas de los videos de @lilobaby.pe mejorados con Gemini (mismo producto);
// el resto, escenas de Gemini hechas con esos fotogramas de referencia.
// Sin real-montessori ni real-cierre hasta tener versión mejorada.
const img = (name: string) => `/img/${name}.jpg`;

export type Product = {
  name: string;
  detail: string;
  image: string;
  hover?: string;
  badge?: string;
};

export const BEST_SELLERS: Product[] = [
  { name: "Set de cuna Taupe y Rosa", detail: "Protectores + sábana + cojín", image: img("hero-set-taupe"), hover: img("real-sabana"), badge: "Más pedido" },
  { name: "Almohada con su nombre", detail: "Bordado a mano", image: img("real-aitana"), hover: img("almohada-aitana"), badge: "Personalizada" },
  { name: "Set de cuna Azul Marino", detail: "Acolchado en rombos", image: img("real-marino"), hover: img("set-marino") },
  { name: "Set Verde con Mariposas", detail: "Encaje y aplicaciones", image: img("real-verde-rosa"), hover: img("set-verde-mariposas") },
  { name: "Protectores Celeste", detail: "Cuna o cama cuna", image: img("real-celeste") },
  { name: "Protectores Verde", detail: "Funda desmontable", image: img("real-verde") },
  { name: "Set de sábanas con ribete", detail: "Encimera, bajera y funda", image: img("real-sabana"), hover: img("flatlay") },
];

export type Shade = { name: string; colors: [string, string]; images: { src: string; label: string }[] };

export const SHADES: Shade[] = [
  {
    name: "Taupe y rosa",
    colors: ["#a39282", "#e8b4bc"],
    images: [
      { src: img("hero-set-taupe"), label: "Set de cuna con lazo" },
      { src: img("real-sabana"), label: "Sábanas con ribete" },
      { src: img("cuna-lilo"), label: "Almohada Lilo" },
    ],
  },
  {
    name: "Azul marino y crema",
    colors: ["#1f2a4a", "#efe6d2"],
    images: [
      { src: img("real-marino"), label: "Protectores acolchados" },
      { src: img("set-marino"), label: "Set de cuna completo" },
    ],
  },
  {
    name: "Verde y rosa",
    colors: ["#b9cf8c", "#f0bcc4"],
    images: [
      { src: img("real-verde-rosa"), label: "Almohada con encaje" },
      { src: img("set-verde-mariposas"), label: "Set con mariposas" },
      { src: img("real-verde"), label: "Protectores verde" },
    ],
  },
  {
    name: "Celeste y crema",
    colors: ["#bcd6ee", "#efe6d2"],
    images: [
      { src: img("real-celeste"), label: "Protectores celeste" },
      { src: img("flatlay"), label: "Protector enrollado y sábanas" },
    ],
  },
];

export const CATEGORIES = [
  { name: "Sets de cuna", image: img("hero-set-taupe") },
  { name: "Protectores", image: img("real-marino") },
  { name: "Almohadas con nombre", image: img("almohada-aitana") },
  { name: "Sábanas", image: img("real-sabana") },
];

export const DETAILS = [
  { name: "Algodón de 200 hilos", image: img("real-sabana") },
  { name: "Funda desmontable y lavable", image: img("real-verde-rosa") },
  { name: "Bordado a mano", image: img("real-aitana") },
];

export const IMG = {
  hero: img("hero-set-taupe"),
  mama: img("mama-bebe"),
  costura: img("real-costura"),
  almohada: img("almohada-bordada"),
  banner: img("cuna-lilo"),
  ella: img("set-verde-mariposas-v"),
  el: img("set-marino"),
  aitanaThumb: img("almohada-aitana"),
};
