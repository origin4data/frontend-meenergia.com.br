import type { Metadata } from "next";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Serviços e Soluções | ME Energia Solar",
  description:
    "Projetos otimizados, instalação personalizada, equipamentos certificados WEG e monitoramento em tempo real.",
};

export default function ServicosPage() {
  return (
    <main>
      <Header />
      <Services />
      <Footer />
    </main>
  );
}
