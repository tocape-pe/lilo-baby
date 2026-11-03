import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnnouncementBar, Header } from "@/components/Header";
import { Footer, WhatsAppFloat } from "@/components/Footer";
import { ScrollToTop } from "@/components/ui";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import Product from "@/pages/Product";
import Colors from "@/pages/Colors";
import Guide from "@/pages/Guide";
import NotFound from "@/pages/NotFound";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <AnnouncementBar />
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:slug" element={<Category />} />
        <Route path="/producto/:slug" element={<Product />} />
        <Route path="/colores" element={<Colors />} />
        <Route path="/guia-de-medidas" element={<Guide />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <WhatsAppFloat />
  </BrowserRouter>
);

export default App;
