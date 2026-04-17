import type { Metadata } from "next";
import Header from "@/components/Header";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfólio | ME Energia Solar",
  description:
    "Projetos de energia solar fotovoltaica executados pela ME Energia no Espírito Santo e sul da Bahia — residenciais, comerciais e industriais.",
};

export default function PortfolioPage() {
  return (
    <main>
      <Header />
      <Portfolio />
      <Footer />
    </main>
  );
}
