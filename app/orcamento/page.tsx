"use client";

import { useState, useMemo } from "react";
import { MessageCircle, Zap, DollarSign, Calendar, TrendingUp, Sun, Layers, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextField } from "@/components/ui/TextField";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";

const UNIT_TYPES = [
  { code: "RES", label: "Residencial" },
  { code: "COM", label: "Comercial" },
  { code: "IND", label: "Industrial" },
  { code: "AGR", label: "Rural" },
];

const TARIFF_PER_KWH = 0.85;
const KWH_PER_KWP_MONTH = 120;
const MODULE_WATTS = 0.45;
const SYSTEM_COST_PER_KWP = 4200;
const WHATSAPP_NUMBER = "5527997219703";

function currency(v: number) {
  if (!isFinite(v) || v <= 0) return "R$ 0";
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// Aceita só dígitos (máximo 9) e devolve string formatada em BRL sem decimais.
// Ex.: "1500" → "R$ 1.500"
function formatBRLInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  if (digits.length === 0) return "";
  return Number(digits).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export default function OrcamentoPage() {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [unitType, setUnitType] = useState("RES");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [economyPct, setEconomyPct] = useState(95);

  const STEPS = [
    { label: "Consumo", short: "Consumo" },
    { label: "Localização", short: "Cidade" },
    { label: "Contato", short: "Contato" },
  ];

  const canAdvance = (s: number): boolean => {
    if (s === 0) return (Number(monthlyBill) || 0) > 0 && unitType !== "";
    if (s === 1) return city.trim().length > 0;
    if (s === 2) return name.trim().length > 0 && phone.replace(/\D/g, "").length >= 10 && /\S+@\S+\.\S+/.test(email);
    return false;
  };
  const stepReady = canAdvance(step);
  const allDone = canAdvance(0) && canAdvance(1) && canAdvance(2);

  const calc = useMemo(() => {
    const bill = Number(monthlyBill) || 0;
    const monthlyKwh = bill / TARIFF_PER_KWH;
    const monthlySavings = bill * (economyPct / 100);
    const newBill = bill - monthlySavings;
    const requiredKwp = monthlyKwh > 0 ? monthlyKwh / KWH_PER_KWP_MONTH : 0;
    const modules = requiredKwp > 0 ? Math.ceil(requiredKwp / MODULE_WATTS) : 0;
    const systemCost = requiredKwp * SYSTEM_COST_PER_KWP;
    const paybackMonths = monthlySavings > 0 ? Math.round(systemCost / monthlySavings) : 0;
    const paybackYears = paybackMonths / 12;
    const savings25y = monthlySavings * 12 * 25;
    return { bill, monthlyKwh, monthlySavings, newBill, requiredKwp, modules, systemCost, paybackMonths, paybackYears, savings25y };
  }, [monthlyBill, economyPct]);

  const hasInput = calc.bill > 0;
  const unitLabel = UNIT_TYPES.find((u) => u.code === unitType)?.label ?? "";

  const whatsappMessage = useMemo(() => {
    const lines = [
      "*ORÇAMENTO ME ENERGIA SOLAR*",
      "",
      "Olá! Fiz minha simulação no site e gostaria de receber a proposta detalhada.",
      "",
      "*Meus dados*",
      `• Nome: ${name || "—"}`,
      `• Telefone: ${phone || "—"}`,
      `• E-mail: ${email || "—"}`,
      `• Cidade: ${city || "—"}`,
      `• Tipo: ${unitLabel}`,
      "",
      "*Minha simulação*",
      `• Conta atual: ${currency(calc.bill)}`,
      `• Economia mensal: ${currency(calc.monthlySavings)} (${economyPct}%)`,
      `• Nova conta: ${currency(calc.newBill)}`,
      `• Potência recomendada: ${calc.requiredKwp.toFixed(2)} kWp`,
      `• Módulos: ${calc.modules}`,
      `• Geração estimada: ${Math.round(calc.monthlyKwh).toLocaleString("pt-BR")} kWh/mês`,
      `• Investimento aproximado: ${currency(calc.systemCost)}`,
      `• Payback: ${calc.paybackMonths} meses (~${calc.paybackYears.toFixed(1)} anos)`,
      `• Economia em 25 anos: ${currency(calc.savings25y)}`,
      "",
      "Aguardo retorno para agendar a visita técnica gratuita. Obrigado!",
    ];
    return lines.join("\n");
  }, [name, phone, email, city, unitLabel, calc, economyPct]);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleSend = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Copia a mensagem para o clipboard antes de abrir o WhatsApp,
    // como fallback caso o cliente não preencha o texto da URL.
    try {
      if (navigator.clipboard) {
        e.preventDefault();
        await navigator.clipboard.writeText(whatsappMessage);
        window.open(whatsappHref, "_blank", "noopener,noreferrer");
      }
    } catch {
      // Se clipboard falhar, deixa o comportamento padrão do link
    }
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-hanken, sans-serif)",
    fontWeight: 700,
    fontSize: "11px",
    color: "#6A6A60",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <main>
      <Header />

      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden"
        style={{
          backgroundImage: "url('/Orcamento/img/placa-solar.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay escuro para legibilidade do texto */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,31,56,0.88) 0%, rgba(10,31,56,0.72) 50%, rgba(0,82,155,0.62) 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <Eyebrow tone="accent" className="mb-3">— Calculadora solar</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              color: "#fff",
              maxWidth: "880px",
              textShadow: "0 2px 24px rgba(0,0,0,0.35)",
            }}
          >
            Descubra agora quanto você pode{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 900,
                background: "linear-gradient(90deg, #68AF25 0%, #6FB8EE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline-block",
              }}
            >
              economizar.
            </em>
          </h1>
          <p
            className="mt-6 text-base lg:text-lg max-w-2xl"
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.6,
              textShadow: "0 1px 12px rgba(0,0,0,0.3)",
            }}
          >
            Informe o valor da sua conta de luz mensal — a simulação atualiza em tempo real conforme você digita. Sem cadastro obrigatório.
          </p>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section id="calculadora" className="py-12 lg:py-16 scroll-mt-24" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 xl:gap-16">

            {/* Form */}
            <div className="space-y-8">
              {/* Eyebrow + stepper */}
              <div className="space-y-4">
                <Eyebrow tone="primary">— Etapa {step + 1} de {STEPS.length} · {STEPS[step].label}</Eyebrow>

                <div className="flex items-center gap-3">
                  {STEPS.map((s, i) => {
                    const done = i < step || (i === step && canAdvance(i));
                    const active = i === step;
                    const clickable = i < step || done;
                    return (
                      <div key={s.short} className="flex items-center gap-3 flex-1">
                        <button
                          type="button"
                          onClick={() => clickable && setStep(i)}
                          disabled={!clickable}
                          className="flex items-center justify-center w-8 h-8 transition-all duration-200"
                          style={{
                            borderRadius: "999px",
                            border: `1.5px solid ${active || done ? "#00529B" : "#C9C2B4"}`,
                            background: done && !active ? "#00529B" : active ? "#00529B" : "transparent",
                            color: active || done ? "#fff" : "#9A9A90",
                            fontFamily: "var(--font-hanken, sans-serif)",
                            fontWeight: 800,
                            fontSize: "12px",
                            cursor: clickable ? "pointer" : "default",
                          }}
                        >
                          {done && !active ? "✓" : i + 1}
                        </button>
                        {i < STEPS.length - 1 && (
                          <div className="flex-1 h-px" style={{ background: i < step ? "#00529B" : "#DEDED6" }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 0: Consumo + Tipo de unidade */}
              {step === 0 && (
                <div className="space-y-8">
                  <TextField
                    id="bill"
                    label="Conta de luz mensal (R$)"
                    type="text"
                    inputMode="numeric"
                    maxLength={15}
                    placeholder="R$ 350"
                    value={formatBRLInput(monthlyBill)}
                    onChange={(e) => setMonthlyBill(e.target.value.replace(/\D/g, "").slice(0, 9))}
                    autoFocus
                  />

                  <div>
                    <label style={labelStyle}>Tipo de unidade</label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {UNIT_TYPES.map((u) => (
                        <Pill key={u.code} active={u.code === unitType} onClick={() => setUnitType(u.code)}>
                          {u.label}
                        </Pill>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Cidade */}
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <TextField
                      id="city"
                      label="Cidade"
                      type="text"
                      placeholder="São Mateus"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      autoFocus
                    />
                    <p
                      className="mt-2"
                      style={{ fontFamily: "var(--font-hanken, sans-serif)", fontSize: "12px", color: "#6A6A60", fontWeight: 500 }}
                    >
                      Atendemos todo Espírito Santo e sul da Bahia.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Nome, Telefone, Email */}
              {step === 2 && (
                <div className="space-y-8">
                  <TextField
                    id="name"
                    label="Nome"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                      id="phone"
                      label="Telefone (WhatsApp)"
                      type="tel"
                      inputMode="numeric"
                      placeholder="(27) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                    />
                    <TextField
                      id="email"
                      label="E-mail"
                      type="email"
                      placeholder="voce@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center gap-3 pt-4">
                {step > 0 && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setStep((s) => Math.max(s - 1, 0))}
                    iconLeft={<ArrowLeft size={14} strokeWidth={2.5} />}
                    style={{ width: "120px" }}
                  >
                    Voltar
                  </Button>
                )}
                {step < STEPS.length - 1 && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => stepReady && setStep((s) => Math.min(s + 1, STEPS.length - 1))}
                    disabled={!stepReady}
                    iconRight={<ArrowRight size={14} strokeWidth={2.5} />}
                    style={{
                      background: stepReady ? "#00529B" : "#C9C2B4",
                      boxShadow: "none",
                      borderRadius: "999px",
                      cursor: stepReady ? "pointer" : "not-allowed",
                    }}
                  >
                    Continuar
                  </Button>
                )}
                {step === STEPS.length - 1 && (
                  allDone ? (
                    <Button
                      as="a"
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleSend}
                      variant="whatsapp"
                      size="sm"
                      iconLeft={<MessageCircle size={14} strokeWidth={2.5} />}
                      style={{ width: "240px", boxShadow: "0 8px 24px rgba(61,122,0,0.35)" }}
                    >
                      Enviar pelo WhatsApp
                    </Button>
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--font-hanken, sans-serif)",
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#6A6A60",
                      }}
                    >
                      Preencha os campos acima
                    </span>
                  )
                )}
              </div>

              {/* ── Slider persistente: % de economia estimada (visível em todas as etapas) ── */}
              <div
                className="pt-6 mt-4"
                style={{ borderTop: "1px solid #DEDED6" }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor="economyPct" style={labelStyle}>
                    Estimativa de economia
                  </label>
                  <span
                    style={{
                      fontFamily: "var(--font-hanken, sans-serif)",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                      color: "#00529B",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {economyPct}%
                  </span>
                </div>
                <input
                  id="economyPct"
                  type="range"
                  min={70}
                  max={100}
                  step={1}
                  value={economyPct}
                  onChange={(e) => setEconomyPct(Number(e.target.value))}
                  className="w-full accent-[#00529B]"
                />
                <div
                  className="flex justify-between mt-1"
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontWeight: 600,
                    fontSize: "10px",
                    color: "#9A9A90",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  <span>70%</span>
                  <span>Médio · 85%</span>
                  <span>100%</span>
                </div>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#6A6A60",
                    lineHeight: 1.5,
                  }}
                >
                  Sistemas fotovoltaicos geralmente cobrem entre 90% e 95% da conta. Ajuste para ver outros cenários — a simulação atualiza em tempo real.
                </p>
              </div>
            </div>

            {/* Results */}
            <div
              className="relative p-8 lg:p-10"
              style={{
                background: hasInput ? "linear-gradient(135deg, #0A1F38 0%, #003A6B 100%)" : "#FAFAF7",
                color: hasInput ? "#fff" : "#141410",
                border: hasInput ? "none" : "1.5px solid #C9C2B4",
                transition: "background 0.3s ease",
              }}
            >
              <Eyebrow tone={hasInput ? "accent" : "primary"} className="mb-2">— Sua simulação</Eyebrow>
              <h2
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: "32px",
                }}
              >
                {hasInput ? (
                  <>
                    Você economiza{" "}
                    <span style={{ color: "#68AF25" }}>{currency(calc.monthlySavings)}</span>
                    {" "}por mês.
                  </>
                ) : (
                  "Aguardando sua conta…"
                )}
              </h2>

              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <ResultStat icon={<DollarSign size={16} />} label="Nova conta" value={currency(calc.newBill)} hasInput={hasInput} />
                <ResultStat icon={<Sun size={16} />} label="Potência" value={`${calc.requiredKwp.toFixed(2)} kWp`} hasInput={hasInput} />
                <ResultStat icon={<Layers size={16} />} label="Módulos" value={String(calc.modules)} hasInput={hasInput} accent />
                <ResultStat icon={<Zap size={16} />} label="Geração mensal" value={`${Math.round(calc.monthlyKwh).toLocaleString("pt-BR")} kWh`} hasInput={hasInput} />
                <ResultStat icon={<Calendar size={16} />} label="Payback" value={calc.paybackMonths > 0 ? `${calc.paybackMonths} meses` : "—"} hasInput={hasInput} />
                <ResultStat icon={<TrendingUp size={16} />} label="25 anos" value={currency(calc.savings25y)} hasInput={hasInput} highlight />
              </div>

              {hasInput && (
                <div
                  className="mt-8 pt-6"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.15)",
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.55,
                  }}
                >
                  Custo aproximado do sistema: <strong style={{ color: "#fff", fontWeight: 800 }}>{currency(calc.systemCost)}</strong> · Os valores são estimativas baseadas em médias do mercado e podem variar conforme localização, telhado e equipamentos.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact + CTA ── */}
      <section className="py-16 lg:py-24" style={{ background: "linear-gradient(90deg, #68AF25 0%, #00529B 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Eyebrow tone="light" className="mb-4">— Próximo passo</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            Receba seu orçamento detalhado.
          </h2>
          <p
            className="max-w-xl text-base lg:text-lg"
            style={{ fontFamily: "var(--font-hanken, sans-serif)", fontWeight: 500, color: "rgba(255,255,255,0.88)", lineHeight: 1.6 }}
          >
            Enviamos sua simulação direto para o WhatsApp da equipe — com visita técnica gratuita inclusa.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button
              as="a"
              href="#calculadora"
              variant="whatsapp"
              size="lg"
              iconLeft={<MessageCircle size={16} strokeWidth={2.5} />}
              style={{ boxShadow: "0 12px 32px rgba(61,122,0,0.4)" }}
            >
              Solicitar orçamento
            </Button>
            <span
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 600,
                fontSize: "13px",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {hasInput ? "Sua simulação será enviada junto com a mensagem." : "Preencha a conta para enviar dados pré-calculados."}
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ────────────────────────────────────────────────────────────
   SUBCOMPONENTS
   ──────────────────────────────────────────────────────────── */

function ResultStat({
  icon,
  label,
  value,
  hasInput,
  accent,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hasInput: boolean;
  accent?: boolean;
  highlight?: boolean;
}) {
  const valueColor = !hasInput
    ? "#C9C2B4"
    : highlight
    ? "#6FB8EE"
    : accent
    ? "#68AF25"
    : "#fff";
  return (
    <div>
      <div
        className="flex items-center gap-1.5 mb-1.5"
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontWeight: 700,
          fontSize: "10px",
          color: hasInput ? "rgba(255,255,255,0.55)" : "#6A6A60",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ opacity: hasInput ? 0.65 : 0.45 }}>{icon}</span>
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontWeight: 900,
          fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
          letterSpacing: "-0.025em",
          lineHeight: 1,
          color: valueColor,
          transition: "color 0.2s ease",
        }}
      >
        {value}
      </div>
    </div>
  );
}

