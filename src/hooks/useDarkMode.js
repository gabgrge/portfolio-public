import { useState, useEffect } from "react";

/**
 * useDarkMode
 * Hook personnalisé pour détecter si le mode sombre est actif dans l'application.
 * Se base sur la présence de la classe 'dark' sur l'élément <html>, gérée globalement (dans App.jsx).
 * Met à jour automatiquement l'état si le mode change (mutation de la classe).
 *
 * @returns {boolean} - true si le mode sombre est actif, false sinon
 */
export default function useDarkMode() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
