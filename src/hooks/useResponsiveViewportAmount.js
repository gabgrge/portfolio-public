import { useEffect, useState } from "react";

/**
 * useResponsiveViewportAmount
 * Hook personnalisé pour adapter la valeur du paramètre "viewport amount" selon la largeur de l'écran.
 * Utile pour Framer Motion (animation d'apparition) ou tout autre usage responsive.
 *
 * @param {number} mobileAmount - Valeur pour mobile (par défaut 0.1)
 * @param {number} desktopAmount - Valeur pour desktop (par défaut 0.2)
 * @param {number} breakpoint - Largeur en px pour le switch mobile/desktop (par défaut 640)
 * @returns {number} - La valeur responsive à utiliser
 */
export function useResponsiveViewportAmount(
  mobileAmount = 0.1,
  desktopAmount = 0.2,
  breakpoint = 640
) {
  // Initialise la valeur selon la largeur courante
  const [amount, setAmount] = useState(
    typeof window !== "undefined" && window.innerWidth < breakpoint
      ? mobileAmount
      : desktopAmount
  );

  useEffect(() => {
    // Met à jour la valeur au resize
    function handleResize() {
      setAmount(window.innerWidth < breakpoint ? mobileAmount : desktopAmount);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileAmount, desktopAmount, breakpoint]);

  return amount;
}
