"use client";

import {
  useMemo,
  useRef,
  useState,
  useEffect,
  type FormEvent,
  type ReactNode,
} from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const CONTACT = {
  email: "Elinabz2003@gmail.com",
  linkedin: "https://www.linkedin.com/in/elina-bazzaz-abkenar/",
  instagram:
    "https://www.instagram.com/this_is_elina_?igsh=MTJqdGE3ajFjNTNwag==",
};

function isValidEmail(v: string) {
  return /\S+@\S+\.\S+/.test(v.trim());
}

function SocialButton({
  href,
  label,
  children,
  disabled,
}: {
  href: string;
  label: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/40">
        {children}
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-cyan-300/30 hover:text-white"
      aria-label={label}
      title={label}
    >
      {children}
      {label}
    </a>
  );
}

export default function Contact() {
  const { lang } = useLanguage();

  const t = {
    title: lang === "fr" ? "Contact" : "Contact",
    subtitle:
      lang === "fr"
        ? "Je réponds dès que possible."
        : "I’ll get back to you as soon as possible.",
    details: lang === "fr" ? "Coordonnées" : "Details",
    available: lang === "fr" ? "Disponible" : "Available",
    unavailable:
      lang === "fr" ? "Indisponible (20h–6h)" : "Unavailable (8pm–6am)",
    email: "Email",
    copy: lang === "fr" ? "Copier" : "Copy",
    copied: lang === "fr" ? "Copié ✓" : "Copied ✓",
    openMail: lang === "fr" ? "Ouvrir mail" : "Open email",
    social: lang === "fr" ? "Réseaux" : "Social",
    sendTitle: lang === "fr" ? "Envoyer un message" : "Send a message",

    tx1: lang === "fr" ? "> transmission en cours..." : "> transmitting...",
    tx2:
      lang === "fr"
        ? "> canal sécurisé établi"
        : "> secure channel established",
    tx3: lang === "fr" ? "> message délivré ✓" : "> message delivered ✓",

    nameLabel: lang === "fr" ? "Nom" : "Name",
    namePh: lang === "fr" ? "Ex: Stephanie" : "e.g., Stephanie",

    emailLabel: "Email",
    emailPh: lang === "fr" ? "Ex: stephanie@email.com" : "e.g., stephanie@email.com",
    invalidEmail: lang === "fr" ? "Email invalide." : "Invalid email.",

    messageLabel: lang === "fr" ? "Message" : "Message",
    messagePh: lang === "fr" ? "Votre message ici…" : "Your message here…",
    minChars:
      lang === "fr" ? "Minimum 10 caractères." : "Minimum 10 characters.",

    sending: lang === "fr" ? "Envoi..." : "Sending...",
    send: lang === "fr" ? "Envoyer" : "Send",
    sentOk: lang === "fr" ? "Message envoyé ✅" : "Message sent ✅",

    checkFields:
      lang === "fr"
        ? "Vérifie les champs (nom, email, message)."
        : "Please check the fields (name, email, message).",
    sendError:
      lang === "fr" ? "Erreur lors de l’envoi." : "Error while sending.",
    networkError:
      lang === "fr"
        ? "Impossible d’envoyer (réseau)."
        : "Unable to send (network).",
  };

  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const [showTx, setShowTx] = useState(false);
  const [txStep, setTxStep] = useState(0);

  const [availability, setAvailability] = useState<"day" | "night">("day");

  const step2Timer = useRef<number | null>(null);
  const step3Timer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);

  const canSend = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      isValidEmail(fromEmail) &&
      message.trim().length >= 10
    );
  }, [name, fromEmail, message]);

  useEffect(() => {
    function computeAvailability() {
      const now = new Date();

      const hourStr = new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        hour12: false,
        timeZone: "Europe/Paris",
      }).format(now);

      const hour = parseInt(hourStr, 10);
      setAvailability(hour >= 6 && hour < 20 ? "day" : "night");
    }

    computeAvailability();
    const id = window.setInterval(computeAvailability, 60_000);
    return () => window.clearInterval(id);
  }, []);

  function clearTimers() {
    if (step2Timer.current) window.clearTimeout(step2Timer.current);
    if (step3Timer.current) window.clearTimeout(step3Timer.current);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    step2Timer.current = null;
    step3Timer.current = null;
    hideTimer.current = null;
  }

  function startTransmission() {
    clearTimers();
    setShowTx(true);
    setTxStep(1);

    step2Timer.current = window.setTimeout(() => setTxStep(2), 450);
    step3Timer.current = window.setTimeout(() => setTxStep(3), 900);
  }

  function stopTransmissionSoon() {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);

    hideTimer.current = window.setTimeout(() => {
      setShowTx(false);
      setTxStep(0);
    }, 1600);
  }

  function stopTransmissionNow() {
    clearTimers();
    setShowTx(false);
    setTxStep(0);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!canSend) {
      stopTransmissionNow();
      setStatus("error");
      setErrorMsg(t.checkFields);
      return;
    }

    startTransmission();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: fromEmail,
          message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        stopTransmissionNow();
        setStatus("error");
        setErrorMsg(data?.error ?? t.sendError);
        return;
      }

      setStatus("sent");
      setTxStep(3);
      stopTransmissionSoon();

      setName("");
      setFromEmail("");
      setMessage("");

      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      stopTransmissionNow();
      setStatus("error");
      setErrorMsg(t.networkError);
    }
  }

  const cursor = showTx ? <span className="tx-cursor">▍</span> : null;

  return (
    <section id="contact" className="mt-16 pb-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white/90">{t.title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/60">{t.subtitle}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 md:items-stretch">
        <div className="glass glow-hover p-6 h-full flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-white/85">{t.details}</p>

            {availability === "day" ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                <span className="avail-dot" aria-hidden="true" />
                {t.available}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
                <span
                  className="h-2.5 w-2.5 rounded-full bg-amber-300/90 shadow-[0_0_0_0_rgba(252,211,77,0.35)]"
                  aria-hidden="true"
                />
                {t.unavailable}
              </span>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-white/50">{t.email}</p>
            <p className="mt-2 break-all font-mono text-lg text-white/90">
              {CONTACT.email}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={copyEmail}
                className="rounded-full px-4 py-2 text-sm text-white/85 btn-soft"
                type="button"
              >
                {copied ? t.copied : t.copy}
              </button>

              <a
                className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/15"
                href={`mailto:${CONTACT.email}`}
              >
                {t.openMail}
              </a>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-white/50">{t.social}</p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <SocialButton href={CONTACT.linkedin} label="LinkedIn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.849-3.037-1.85 0-2.134 1.445-2.134 2.939v5.667H9.356V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.37-1.849 3.604 0 4.268 2.372 4.268 5.456v6.284zM5.337 7.433a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zM6.997 20.452H3.676V9h3.321v11.452z" />
                </svg>
              </SocialButton>

              <SocialButton
                href={CONTACT.instagram}
                label="Instagram"
                disabled={!CONTACT.instagram}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-.75a1 1 0 110 2 1 1 0 010-2z" />
                </svg>
              </SocialButton>
            </div>
          </div>

          <div className="mt-auto" />
        </div>

        <div className="glass glow-hover p-6 h-full flex flex-col justify-center">
          <p className="text-sm font-semibold text-white/85">{t.sendTitle}</p>

          {showTx && (
            <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
              <p className="font-mono text-xs text-cyan-200/90">
                {t.tx1} {cursor}
              </p>
              <p className="mt-1 font-mono text-xs text-violet-200/80">
                {txStep >= 2 ? (
                  <>
                    {t.tx2} {cursor}
                  </>
                ) : (
                  <span className="text-white/30">{t.tx2}</span>
                )}
              </p>
              <p className="mt-1 font-mono text-xs text-emerald-200/80">
                {txStep >= 3 ? (
                  <>
                    {t.tx3} {cursor}
                  </>
                ) : (
                  <span className="text-white/30">{t.tx3}</span>
                )}
              </p>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-5 grid gap-4">
            <div className="grid gap-2">
              <label className="text-xs text-white/50" htmlFor="name">
                {t.nameLabel}
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePh}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 placeholder:text-white/30 outline-none focus:border-cyan-300/30"
                autoComplete="name"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-xs text-white/50" htmlFor="email">
                {t.emailLabel}
              </label>
              <input
                id="email"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                placeholder={t.emailPh}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 placeholder:text-white/30 outline-none focus:border-cyan-300/30"
                autoComplete="email"
              />
              {fromEmail.length > 0 && !isValidEmail(fromEmail) && (
                <p className="text-xs text-pink-200/80">{t.invalidEmail}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-xs text-white/50" htmlFor="message">
                {t.messageLabel}
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePh}
                rows={5}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 placeholder:text-white/30 outline-none focus:border-cyan-300/30"
              />
              {message.length > 0 && message.trim().length < 10 && (
                <p className="text-xs text-white/45">{t.minChars}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={!canSend || status === "sending"}
                className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  !canSend || status === "sending"
                    ? "cursor-not-allowed bg-white/20 text-white/50"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {status === "sending" && (
                  <span className="sonar" aria-hidden="true" />
                )}
                <span className="relative z-10">
                  {status === "sending" ? t.sending : t.send}
                </span>
              </button>

              {status === "sent" && (
                <p className="text-sm text-cyan-200/90">{t.sentOk}</p>
              )}

              {status === "error" && (
                <p className="text-sm text-pink-200/90">
                  {errorMsg || t.sendError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}