use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const companies = [
  { id: "aymores", description: "Aymores Embalagens", image: "/Empresas/Aymores-Embalagens.jpg" },
  { id: "brasigran", description: "BrasiGran Granitos", image: "/Empresas/BrasiGran-Granitos.jpg" },
  { id: "cescom", description: "Cescom Distribuidor", image: "/Empresas/Cescom-Distribuidor.jpg" },
  { id: "damiani", description: "Damiani Grupo", image: "/Empresas/Damiani-grupo.jpg" },
  { id: "gbj", description: "GBJ Metalmecanica", image: "/Empresas/GBJ-metalmecanica.jpg" },
  { id: "ibis", description: "Ibis Styles", image: "/Empresas/Ibis-styles.jpg" },
  { id: "master", description: "Master", image: "/Empresas/Master.jpg" },
  { id: "multishow", description: "Multi Show Supermercados", image: "/Empresas/Multi-Show-Supermercados.jpg" },
  { id: "norte-palace", description: "Norte Palace Hotel", image: "/Empresas/Norte-Palece-Hotel.png" },
  { id: "polimix", description: "Polimix Concreto", image: "/Empresas/Polimix-concreto.jpg" },
  { id: "protein-norte", description: "Protein Norte", image: "/Empresas/Protein-Norte.jpg" },
  { id: "rio-doce", description: "Rio Doce Hospital", image: "/Empresas/Rio-Doce-Hospital.jpg" },
  { id: "sao-rafael", description: "SÃ£o Rafael Esquadrias", image: "/Empresas/Sao-Rafael-Esquadrias-Moveis-Decoracao.jpg" },
  { id: "steffen", description: "Steffen Centro de Eventos", image: "/Empresas/Steffen-Centro-de-Eventos.jpg" },
];

export default function CompaniesSlider() {
  return (
    <section
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{ background: "#FFFFFF", color: "#141410" }}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        {/* â”€â”€ Header â”€â”€ */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 mb-16 lg:mb-20 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div
              className="mb-3"
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 700,
                fontSize: "11px",
                color: "#00529B",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              â€” Clientes
            </div>
            <h2
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.05em",
                color: "#141410",
              }}
            >
              Em todo o<br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 900,
                  color: "#00529B",
                }}
              >
                Sudeste.
              </em>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pb-2">
            <p
              className="text-base leading-[1.55]"
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 500,
                color: "#3A3A34",
              }}
            >
              IndÃºstrias, comÃ©rcios, hotÃ©is e hospitais â€” projetos solares no EspÃ­rito Santo e sul da Bahia.
            </p>
          </div>
        </div>
      </div>

      {/* â”€â”€ Slider full-bleed â”€â”€ */}
      <div className="relative w-full">
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: "2px", background: "#141410" }}
        />

        <div className="relative h-32 lg:h-40 w-full overflow-hidden flex items-center">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={45}
            gap={64}
          >
            {companies.map((company) => (
              <div
                key={company.id}
                className="group relative flex h-full shrink-0 items-center justify-center px-6"
                style={{ width: "180px" }}
              >
                <img
                  src={company.image}
                  alt={company.description}
                  className="max-h-20 lg:max-h-24 w-auto object-contain transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-105"
                  style={{
                    filter: "grayscale(100%) contrast(1.05)",
                    opacity: 0.65,
                  }}
                />
              </div>
            ))}
          </InfiniteSlider>

          {/* Fade edges */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-32 lg:w-48 z-10"
            style={{
              background: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute top-0 bottom-0 right-0 w-32 lg:w-48 z-10"
            style={{
              background: "linear-gradient(to left, #FFFFFF 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
            }}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-32 lg:w-48 z-10"
            direction="left"
            blurIntensity={0.4}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-32 lg:w-48 z-10"
            direction="right"
            blurIntensity={0.4}
          />
        </div>

        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "2px", background: "#141410" }}
        />
      </div>

      {/* â”€â”€ Footer caption â”€â”€ */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 mt-12 lg:mt-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex items-baseline gap-4">
            <span
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 900,
                fontSize: "clamp(3rem, 5vw, 4.5rem)",
                color: "#00529B",
                lineHeight: 0.9,
                letterSpacing: "-0.05em",
              }}
            >
              14
            </span>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#6A6A60",
                  fontWeight: 700,
                }}
              >
                Empresas
              </div>
              <div
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#6A6A60",
                  fontWeight: 700,
                }}
              >
                em destaque
              </div>
            </div>
          </div>

          <p
            className="text-sm max-w-md md:text-right"
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontWeight: 500,
              color: "#5A5448",
            }}
          >
            Cada cliente Ã© um projeto Ãºnico â€” engenharia desenhada para o porte e contexto de cada operaÃ§Ã£o.
          </p>
        </div>
      </div>
    </section>
  );
}
