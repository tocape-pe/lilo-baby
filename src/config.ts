export const STORE = {
  name: "Lilo Baby",
  // WhatsApp de pedidos: código de país + número, solo dígitos
  whatsapp: "51956217483",
  whatsappDisplay: "956 217 483",
  tiktok: "https://www.tiktok.com/@lilobaby.pe",
  city: "Lima – Perú",
  shipping: "Envíos a todo el Perú por Shalom",
};

// api.whatsapp.com directo: la redirección de wa.me cambia los emojis como 🤍 por "�"
export const waLink = (message: string) =>
  `https://api.whatsapp.com/send?phone=${STORE.whatsapp}&text=${encodeURIComponent(message)}`;

export const waProduct = (product: string) =>
  waLink(`¡Hola Lilo Baby! 🤍 Me interesa: ${product}. ¿Me pasan precio y colores disponibles?`);
