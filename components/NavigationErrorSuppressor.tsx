"use client";

import { useEffect } from "react";

/**
 * Suprime silenciosamente erros do tipo `Cannot read properties of null (reading 'dispatchEvent')`
 * que vêm do dev tools do Next.js 16 / Turbopack durante navegação.
 * Bug conhecido — só afeta dev mode, produção não tem.
 */
export default function NavigationErrorSuppressor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const origPush = window.history.pushState;
    const origReplace = window.history.replaceState;

    window.history.pushState = function (...args) {
      try {
        return origPush.apply(this, args as Parameters<typeof origPush>);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "";
        if (msg.includes("dispatchEvent") || msg.includes("removeChild")) return;
        throw e;
      }
    };

    window.history.replaceState = function (...args) {
      try {
        return origReplace.apply(this, args as Parameters<typeof origReplace>);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "";
        if (msg.includes("dispatchEvent") || msg.includes("removeChild")) return;
        throw e;
      }
    };

    return () => {
      window.history.pushState = origPush;
      window.history.replaceState = origReplace;
    };
  }, []);

  return null;
}
