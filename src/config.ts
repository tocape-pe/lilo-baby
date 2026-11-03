export const STORE = {
  name: "Lilo Baby",
  // WhatsApp de pedidos: código de país + número, solo dígitos
  whatsapp: "51956217483",
  whatsappDisplay: "956 217 483",
  tiktok: "https://www.tiktok.com/@lilobaby.pe",
  instagram: "https://www.instagram.com/lilobaby.pe/",
  workshop: "Lima, SJL",
  shipping: "Envíos a todo el Perú por courier y Shalom",
};

// api.whatsapp.com directo: la redirección de wa.me cambia los emojis como 🤍 por "�"
export const waLink = (message: string) =>
  `https://api.whatsapp.com/send?phone=${STORE.whatsapp}&text=${encodeURIComponent(message)}`;

export const waProduct = (product: string) =>
  waLink(`¡Hola Lilo Baby! 🤍 Me interesa: ${product}. ¿Me ayudan con los colores disponibles?`);

/** Mensaje de pedido armado desde la ficha de producto */
export const waOrder = (lines: string[]) =>
  waLink(["¡Hola Lilo Baby! 🤍 Quiero hacer este pedido:", ...lines.map((l) => `• ${l}`), "", "¿Me ayudan con los colores disponibles y el envío?"].join("\n"));
