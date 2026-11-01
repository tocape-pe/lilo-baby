import { AnnouncementBar, Header } from "@/components/Header";
import { Banner, BestSellers, Categories, Details, Editorial, Feature, Halves, Hero, Intro, Palette, Season } from "@/components/Sections";
import { Footer, WhatsAppFloat } from "@/components/Footer";

// Mismo orden de secciones que la portada de referencia
const App = () => (
  <>
    <AnnouncementBar />
    <Header />
    <main>
      <Hero />
      <Intro />
      <BestSellers />
      <Feature />
      <Palette />
      <Season />
      <Editorial />
      <Categories />
      <Banner />
      <Halves />
      <Details />
    </main>
    <Footer />
    <WhatsAppFloat />
  </>
);

export default App;
