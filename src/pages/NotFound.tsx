import { Link } from "react-router-dom";
import { btnDark, useTitle } from "@/components/ui";

const NotFound = () => {
  useTitle("Página no encontrada");
  return (
    <div className="px-5 py-32 text-center">
      <h1 className="font-serif font-light text-[44px] leading-[1]">Esta página no existe.</h1>
      <p className="mt-4 text-ink-soft">Puede que el producto haya cambiado de nombre.</p>
      <Link to="/" className={`${btnDark} mt-8`}>Volver a la tienda</Link>
    </div>
  );
};

export default NotFound;
