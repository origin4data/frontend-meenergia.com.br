"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Check, MessageCircle } from "lucide-react";

/* ────────────────────────────────────────────────────────────
   TYPES & DATA
   ──────────────────────────────────────────────────────────── */

interface FormData {
  monthlyBill: string;
  name: string;
  unitType: string;
  email: string;
  phone: string;
  city: string;
}

const INITIAL: FormData = {
  monthlyBill: "",
  name: "",
  unitType: "",
  email: "",
  phone: "",
  city: "",
};

const UNIT_TYPES = [
  { code: "RES", label: "Residencial" },
  { code: "COM", label: "Comercial" },
  { code: "IND", label: "Industrial" },
  { code: "AGR", label: "Rural" },
];

const STEP_META = [
  { num: "01", title: "Sua conta", subtitle: "Quanto você paga por mês" },
  { num: "02", title: "Seus dados", subtitle: "Quem é, e onde fica" },
  { num: "03", title: "Contato", subtitle: "Como te enviar o orçamento" },
];

const TOTAL_STEPS = STEP_META.length;

/* ────────────────────────────────────────────────────────────
   HELPERS
   ──────────────────────────────────────────────────────────── */

function currency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -30 : 30, opacity: 0 }),
};

/* ────────────────────────────────────────────────────────────
   ROOT MODAL
   ──────────────────────────────────────────────────────────── */

export default function SimulationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);

  const next = useCallback(() => { setDir(1); setStep((s) => Math.min(s + 1, 4)); }, []);
  const prev = useCallback(() => { setDir(-1); setStep((s) => Math.max(s - 1, 0)); }, []);
  const set = useCallback(
    (field: keyof FormData, value: string) => setForm((f) => ({ ...f, [field]: value })),
    [],
  );

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep(0); setForm(INITIAL); }, 300);
  };

  /* derived */
  const bill = Number(form.monthlyBill) || 0;
  const monthlySavings = bill * 0.95;
  const newBill = bill - monthlySavings;
  const systemCost = bill * 65;
  const paybackMonths = monthlySavings > 0 ? Math.round(systemCost / monthlySavings) : 0;
  const savings25y = monthlySavings * 12 * 25;

  const isFormStep = step >= 1 && step <= 3;
  const formStepIndex = step - 1;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={handleClose}>
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(10,31,56,0.78)", backdropFilter: "blur(8px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-[960px] max-h-[92vh] overflow-y-auto"
        style={{
          background: "#fff",
          border: "1.5px solid #141410",
          boxShadow: "0 40px 100px rgba(10,31,56,0.5)",
        }}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ════════════════════════════════════════════
            HEADER + PROGRESS
            ════════════════════════════════════════════ */}
        <header
          className="sticky top-0 z-30 px-5 lg:px-7 py-4 border-b bg-white"
          style={{ borderColor: "#141410", borderBottomWidth: "1.5px" }}
        >
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-baseline gap-3">
              <span
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 900,
                  fontSize: "11px",
                  color: "#00529B",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                — Simulação ME
              </span>
              {step === 0 && (
                <span style={smallMetaStyle}>Apresentação</span>
              )}
              {isFormStep && (
                <span style={smallMetaStyle}>
                  Etapa <strong style={{ color: "#141410", fontWeight: 900 }}>{formStepIndex + 1}</strong> / {TOTAL_STEPS}
                </span>
              )}
              {step === 4 && (
                <span style={{ ...smallMetaStyle, color: "#00529B", fontWeight: 800 }}>
                  ✓ Concluído
                </span>
              )}
            </div>

            <button
              onClick={handleClose}
              className="flex items-center justify-center w-9 h-9 transition-all duration-200 hover:bg-[#141410] hover:text-white"
              style={{
                border: "1.5px solid #141410",
                color: "#141410",
              }}
              aria-label="Fechar"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Progress bar */}
          {(isFormStep || step === 4) && (
            <div className="flex items-center gap-1.5">
              {STEP_META.map((s, i) => {
                const isActive = step === 4 ? false : i === formStepIndex;
                const isDone = step === 4 || i < formStepIndex;
                return (
                  <div
                    key={s.num}
                    className="flex-1 h-1 transition-all duration-500"
                    style={{
                      background: isDone ? "#00529B" : isActive ? "#6FB8EE" : "#E8E8E2",
                    }}
                  />
                );
              })}
            </div>
          )}
        </header>

        {/* ════════════════════════════════════════════
            STEPS CONTAINER
            ════════════════════════════════════════════ */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {step === 0 && <Step0 onNext={next} />}
              {step === 1 && <Step1 form={form} set={set} onNext={next} onPrev={prev} />}
              {step === 2 && <Step2 form={form} set={set} onNext={next} onPrev={prev} />}
              {step === 3 && <Step3 form={form} set={set} onNext={next} onPrev={prev} />}
              {step === 4 && (
                <Step4
                  form={form}
                  bill={bill}
                  newBill={newBill}
                  monthlySavings={monthlySavings}
                  systemCost={systemCost}
                  paybackMonths={paybackMonths}
                  savings25y={savings25y}
                  onClose={handleClose}
                  onPrev={prev}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SHARED STYLES & COMPONENTS
   ──────────────────────────────────────────────────────────── */

const smallMetaStyle: React.CSSProperties = {
  fontFamily: "var(--font-hanken, sans-serif)",
  fontWeight: 700,
  fontSize: "11px",
  color: "#6A6A60",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-hanken, sans-serif)",
  fontWeight: 700,
  fontSize: "10px",
  color: "#6A6A60",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  marginBottom: "8px",
  display: "block",
};

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-hanken, sans-serif)",
  fontSize: "1.125rem",
  fontWeight: 600,
  color: "#141410",
  background: "transparent",
  border: "none",
  borderBottom: "1.5px solid #141410",
  borderRadius: 0,
  padding: "12px 0",
  width: "100%",
  outline: "none",
  letterSpacing: "-0.01em",
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-hanken, sans-serif)",
  fontWeight: 900,
  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
  color: "#141410",
  letterSpacing: "-0.035em",
  lineHeight: 1.0,
  margin: 0,
};

function PrimaryBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-3 px-7 py-3.5 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-30 disabled:pointer-events-none"
      style={{
        background: "#0A1F38",
        color: "#fff",
        fontFamily: "var(--font-hanken, sans-serif)",
        fontWeight: 800,
        fontSize: "12px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        borderRadius: "999px",
      }}
    >
      {children}
    </button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#141410]"
      style={{
        fontFamily: "var(--font-hanken, sans-serif)",
        fontWeight: 700,
        fontSize: "11px",
        color: "#6A6A60",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      <ArrowLeft size={13} strokeWidth={2.5} /> Voltar
    </button>
  );
}

function StepSidePanel({ num, title, subtitle }: { num: string; title: string; subtitle: string }) {
  return (
    <div
      className="hidden md:flex md:col-span-5 flex-col justify-between p-8 lg:p-10"
      style={{
        background: "#0A1F38",
        color: "#F4EFE6",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(168,216,78,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative">
        <div
          className="mb-3"
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontWeight: 700,
            fontSize: "11px",
            color: "#6FB8EE",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          — {subtitle}
        </div>
      </div>

      <div className="relative">
        <div
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontWeight: 900,
            fontSize: "clamp(7rem, 12vw, 10rem)",
            color: "#6FB8EE",
            lineHeight: 0.85,
            letterSpacing: "-0.06em",
          }}
        >
          {num}
        </div>
        <div
          className="mt-2"
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "#fff",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   STEP 0 — INTRO
   ──────────────────────────────────────────────────────────── */

function Step0({ onNext }: { onNext: () => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
      {/* Side panel */}
      <div
        className="hidden md:flex md:col-span-5 flex-col justify-between p-8 lg:p-10 relative overflow-hidden"
        style={{ background: "#0A1F38", color: "#F4EFE6" }}
      >
        <Image
          src="/mepessoa.jpg"
          alt=""
          fill
          className="object-cover opacity-25"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(26,58,10,0.85) 0%, rgba(10,31,56,0.95) 100%)" }}
        />

        <div className="relative">
          <div
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontWeight: 700,
              fontSize: "11px",
              color: "#6FB8EE",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            — ME Energia Solar
          </div>
        </div>

        <div className="relative">
          <h2
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              color: "#fff",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: 0,
              marginBottom: "16px",
            }}
          >
            Sua{" "}
            <em style={{ fontStyle: "italic", color: "#6FB8EE" }}>economia</em>{" "}
            em 3 etapas.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontWeight: 500,
              fontSize: "0.95rem",
              color: "rgba(244,239,230,0.80)",
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            ~40 segundos para receber sua simulação personalizada.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="md:col-span-7 px-6 py-8 md:px-10 md:py-12 flex flex-col justify-center">
        <h3 style={sectionTitleStyle}>Vamos começar?</h3>
        <p
          className="mt-4 mb-8"
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontWeight: 500,
            fontSize: "1rem",
            color: "#3A3A34",
            lineHeight: 1.6,
          }}
        >
          Em <strong style={{ fontWeight: 800, color: "#141410" }}>3 etapas curtas</strong>, você recebe a projeção da economia mensal, payback estimado e custo aproximado do seu sistema solar.
        </p>

        {/* Steps preview */}
        <div className="space-y-3 mb-10">
          {STEP_META.map((s) => (
            <div
              key={s.num}
              className="flex items-baseline gap-4 py-3 border-b"
              style={{ borderColor: "#EEEEE8" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontWeight: 900,
                  fontSize: "1.25rem",
                  color: "#00529B",
                  letterSpacing: "-0.03em",
                  minWidth: "2rem",
                }}
              >
                {s.num}
              </span>
              <div className="flex-1">
                <div
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontWeight: 800,
                    fontSize: "0.9375rem",
                    color: "#141410",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontWeight: 500,
                    fontSize: "0.8125rem",
                    color: "#6A6A60",
                  }}
                >
                  {s.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>

        <PrimaryBtn onClick={onNext}>
          Iniciar simulação <ArrowRight size={14} strokeWidth={2.5} />
        </PrimaryBtn>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   STEP 1 — Conta
   ──────────────────────────────────────────────────────────── */

function Step1({
  form,
  set,
  onNext,
  onPrev,
}: {
  form: FormData;
  set: (k: keyof FormData, v: string) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
      <StepSidePanel num="01" title="Sua conta de luz" subtitle="Etapa 01 — Conta" />

      <div className="md:col-span-7 px-6 py-8 md:px-10 md:py-12 flex flex-col justify-center">
        <h3 style={sectionTitleStyle}>Quanto você paga por mês na conta de luz?</h3>
        <p
          className="mt-3 mb-8"
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontWeight: 500,
            fontSize: "0.9375rem",
            color: "#5A5448",
            lineHeight: 1.55,
          }}
        >
          Informe o valor médio da sua fatura mensal.
        </p>

        <label style={labelStyle}>Valor mensal (R$)</label>
        <div className="flex items-baseline gap-3">
          <span
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#6A6A60",
            }}
          >
            R$
          </span>
          <input
            type="number"
            placeholder="450"
            value={form.monthlyBill}
            onChange={(e) => set("monthlyBill", e.target.value)}
            style={inputStyle}
            min={0}
            autoFocus
          />
        </div>

        {/* Quick picks */}
        <div className="mt-8">
          <div style={{ ...labelStyle, marginBottom: "10px" }}>Sugestões</div>
          <div className="flex flex-wrap gap-2">
            {[200, 400, 600, 1000, 2000, 5000].map((v) => {
              const active = form.monthlyBill === String(v);
              return (
                <button
                  key={v}
                  onClick={() => set("monthlyBill", String(v))}
                  className="px-4 py-2 transition-all duration-200"
                  style={{
                    border: `1.5px solid ${active ? "#141410" : "#C9C2B4"}`,
                    background: active ? "#141410" : "transparent",
                    color: active ? "#fff" : "#141410",
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontWeight: 700,
                    fontSize: "12px",
                    letterSpacing: "0.05em",
                    borderRadius: "999px",
                  }}
                >
                  R$ {v.toLocaleString("pt-BR")}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-12 pt-6 border-t" style={{ borderColor: "#C9C2B4" }}>
          <BackBtn onClick={onPrev} />
          <PrimaryBtn onClick={onNext} disabled={!form.monthlyBill}>
            Próxima etapa <ArrowRight size={14} strokeWidth={2.5} />
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   STEP 2 — Perfil
   ──────────────────────────────────────────────────────────── */

function Step2({
  form,
  set,
  onNext,
  onPrev,
}: {
  form: FormData;
  set: (k: keyof FormData, v: string) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
      <StepSidePanel num="02" title="Seus dados" subtitle="Etapa 02 — Perfil" />

      <div className="md:col-span-7 px-6 py-8 md:px-10 md:py-12 flex flex-col justify-center">
        <h3 style={sectionTitleStyle}>Quem é, e onde fica a unidade?</h3>
        <p
          className="mt-3 mb-8"
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontWeight: 500,
            fontSize: "0.9375rem",
            color: "#5A5448",
            lineHeight: 1.55,
          }}
        >
          Para preparar sua simulação personalizada.
        </p>

        <div className="space-y-7">
          <div>
            <label style={labelStyle}>Seu nome completo</label>
            <input
              type="text"
              placeholder="João da Silva"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              style={inputStyle}
              autoFocus
            />
          </div>

          <div>
            <label style={labelStyle}>Tipo de unidade consumidora</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {UNIT_TYPES.map((t) => {
                const active = form.unitType === t.label;
                return (
                  <button
                    key={t.code}
                    onClick={() => set("unitType", t.label)}
                    className="px-4 py-3 text-left transition-all duration-200"
                    style={{
                      border: `1.5px solid ${active ? "#141410" : "#C9C2B4"}`,
                      background: active ? "#141410" : "transparent",
                      color: active ? "#fff" : "#141410",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-hanken, sans-serif)",
                        fontWeight: 700,
                        fontSize: "10px",
                        color: active ? "#6FB8EE" : "#00529B",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        marginBottom: "2px",
                      }}
                    >
                      {t.code}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-hanken, sans-serif)",
                        fontWeight: 800,
                        fontSize: "0.9375rem",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {t.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t" style={{ borderColor: "#C9C2B4" }}>
          <BackBtn onClick={onPrev} />
          <PrimaryBtn onClick={onNext} disabled={!form.name || !form.unitType}>
            Próxima etapa <ArrowRight size={14} strokeWidth={2.5} />
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   STEP 3 — Contato
   ──────────────────────────────────────────────────────────── */

function Step3({
  form,
  set,
  onNext,
  onPrev,
}: {
  form: FormData;
  set: (k: keyof FormData, v: string) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
      <StepSidePanel num="03" title="Contato" subtitle="Etapa 03 — Última" />

      <div className="md:col-span-7 px-6 py-8 md:px-10 md:py-12 flex flex-col justify-center">
        <h3 style={sectionTitleStyle}>
          Última etapa.{" "}
          <em style={{ fontStyle: "italic", color: "#00529B" }}>Quase lá.</em>
        </h3>
        <p
          className="mt-3 mb-8"
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontWeight: 500,
            fontSize: "0.9375rem",
            color: "#5A5448",
            lineHeight: 1.55,
          }}
        >
          Para te enviar o orçamento detalhado.
        </p>

        <div className="space-y-7">
          <div>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              style={inputStyle}
              autoFocus
            />
          </div>
          <div>
            <label style={labelStyle}>Telefone (WhatsApp)</label>
            <input
              type="tel"
              placeholder="(27) 99999-9999"
              value={form.phone}
              onChange={(e) => set("phone", formatPhone(e.target.value))}
              maxLength={15}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Cidade</label>
            <input
              type="text"
              placeholder="Vitória — ES"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t" style={{ borderColor: "#C9C2B4" }}>
          <BackBtn onClick={onPrev} />
          <PrimaryBtn onClick={onNext} disabled={!form.email || !form.phone || !form.city}>
            Ver minha economia <ArrowRight size={14} strokeWidth={2.5} />
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   STEP 4 — Resultado
   ──────────────────────────────────────────────────────────── */

function Step4({
  form,
  bill,
  newBill,
  monthlySavings,
  systemCost,
  paybackMonths,
  savings25y,
  onClose,
  onPrev,
}: {
  form: FormData;
  bill: number;
  newBill: number;
  monthlySavings: number;
  systemCost: number;
  paybackMonths: number;
  savings25y: number;
  onClose: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
      {/* Hero result side */}
      <div
        className="md:col-span-5 relative flex flex-col justify-between p-8 md:p-10 overflow-hidden"
        style={{ background: "#0A1F38", color: "#F4EFE6" }}
      >
        <div
          className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(168,216,78,0.18) 0%, transparent 70%)" }}
        />

        <div className="relative">
          <div
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontWeight: 700,
              fontSize: "11px",
              color: "#6FB8EE",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            ✓ Sua economia
          </div>
        </div>

        <div className="relative">
          <p
            className="mb-2"
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontWeight: 700,
              fontSize: "0.75rem",
              color: "rgba(244,239,230,0.55)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Conta atual: <span style={{ textDecoration: "line-through" }}>{currency(bill)}</span>
          </p>
          <div
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontWeight: 900,
              fontSize: "clamp(2.75rem, 5vw, 4rem)",
              color: "#6FB8EE",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              marginBottom: "8px",
            }}
          >
            {currency(monthlySavings)}
          </div>
          <p
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontWeight: 600,
              fontSize: "0.875rem",
              color: "rgba(244,239,230,0.80)",
            }}
          >
            de economia mensal estimada
          </p>

          <div className="mt-7 pt-5 border-t" style={{ borderColor: "rgba(168,216,78,0.30)" }}>
            <p
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 700,
                fontSize: "10px",
                color: "rgba(244,239,230,0.55)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Sua nova conta
            </p>
            <p
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 800,
                fontSize: "1.75rem",
                color: "#fff",
                letterSpacing: "-0.025em",
              }}
            >
              {currency(newBill)}
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(244,239,230,0.55)", marginLeft: "4px" }}>
                /mês
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="md:col-span-7 px-6 py-8 md:px-10 md:py-12">
        <h3 style={sectionTitleStyle}>
          Olá, {form.name.split(" ")[0]}.
        </h3>
        <p
          className="mt-3 mb-8"
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontWeight: 500,
            fontSize: "0.9375rem",
            color: "#5A5448",
            lineHeight: 1.55,
          }}
        >
          Aqui está a projeção para sua unidade <strong style={{ fontWeight: 800, color: "#141410" }}>{form.unitType.toLowerCase()}</strong> em {form.city}.
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-8 pt-6 border-t" style={{ borderColor: "#141410", borderTopWidth: "1.5px" }}>
          <ResultStat code="R-01" label="Em 25 anos" value={currency(savings25y)} highlight />
          <ResultStat code="R-02" label="Por mês" value={currency(monthlySavings)} />
          <ResultStat code="R-03" label="Investimento" value={currency(systemCost)} />
          <ResultStat code="R-04" label="Payback" value={`${paybackMonths} meses`} />
        </div>

        <p
          className="mb-8"
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontWeight: 500,
            fontSize: "0.75rem",
            color: "#9A9A90",
            lineHeight: 1.55,
          }}
        >
          * Valores estimados com base na conta informada. Simulação técnica detalhada após visita.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t" style={{ borderColor: "#C9C2B4" }}>
          <BackBtn onClick={onPrev} />
          <div className="flex items-center gap-5">
            <button
              onClick={onClose}
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 700,
                fontSize: "11px",
                color: "#6A6A60",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Fechar
            </button>
            <a
              href={`https://wa.me/5527997218703?text=${encodeURIComponent(
                `Olá! Fiz a simulação no site e gostaria de um orçamento.\nNome: ${form.name}\nConta mensal: R$${form.monthlyBill}\nTipo: ${form.unitType}\nCidade: ${form.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "#68AF25",
                color: "#fff",
                fontFamily: "var(--font-hanken, sans-serif)",
                fontWeight: 800,
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                borderRadius: "999px",
              }}
            >
              <MessageCircle size={14} strokeWidth={2.5} /> Solicitar orçamento
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultStat({ code, label, value, highlight }: { code: string; label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-2">
        <span
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontWeight: 900,
            fontSize: "10px",
            color: "#00529B",
            letterSpacing: "0.18em",
          }}
        >
          {code}
        </span>
        <span
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontWeight: 700,
            fontSize: "10px",
            color: "#6A6A60",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontWeight: 900,
          fontSize: highlight ? "clamp(1.5rem, 2.5vw, 1.875rem)" : "clamp(1.25rem, 2vw, 1.5rem)",
          color: highlight ? "#00529B" : "#141410",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}

// Suppress unused warning for Check (kept for future reference)
void Check;
