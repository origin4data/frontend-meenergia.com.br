import Header from "@/components/Header";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import Sobre from "@/components/Sobre";
import CompaniesSlider from "@/components/CompaniesSlider";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <ScrollVideoHero />
      <Sobre />
      <CompaniesSlider />
      <ProjectsCarousel />
      <Footer />
    </main>
  );
}
