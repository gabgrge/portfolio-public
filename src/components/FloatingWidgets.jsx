import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGlobe } from "react-icons/fi";
import { useTranslation } from "react-i18next";

/**
 * FloatingWidgets
 * Affiche les widgets flottants (langue) en bas à droite.
 * Change de couleur automatiquement au-dessus de la section projets.
 *
 * Props :
 * - toggleLang : Fonction pour basculer la langue
 * - projectsRef : Référence à la section projets pour détecter le scroll
 */
export default function FloatingWidgets({ toggleLang, projectsRef }) {
  // Traduction
  const { i18n } = useTranslation();

  // Normalise la langue détectée
  const currentLang = i18n.language && i18n.language.toLowerCase().startsWith("fr") ? "fr" : "en";

  // État pour le hover du bouton langue
  const [isHovered, setIsHovered] = useState(false);
  // Compteur pour l'animation de rotation du globe
  const [flipCount, setFlipCount] = useState(0);
  // Indique si les widgets sont au-dessus de la section projets
  const [overProjects, setOverProjects] = useState(false);

  // Liste des langues disponibles
  const languages = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
  ];

  // Détection du scroll au-dessus de la section projets
  useEffect(() => {
    const scrollContainer = document.querySelector(".hidden.sm\\:block");

    function handleScroll() {
      if (!projectsRef?.current) return;
      const widget = document.getElementById("floating-widgets");
      if (!widget) return;

      const widgetRect = widget.getBoundingClientRect();
      const projectsRect = projectsRef.current.getBoundingClientRect();

      const overlap =
        widgetRect.bottom > projectsRect.top &&
        widgetRect.top < projectsRect.bottom;

      setOverProjects(overlap);
    }

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      handleScroll();
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [projectsRef]);

  return (
    <div
      id="floating-widgets"
      className="
        hidden sm:flex
        fixed bottom-6 right-6
        z-50
        gap-3
      "
    >
      {/* --- Bouton Langue --- */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 22,
          delay: 0.15,
        }}
        className="
          relative
          flex flex-col items-end
        "
      >
        <motion.button
          initial={{
            width: 48,
            height: 48,
            borderRadius: 999,
            paddingLeft: 0,
            paddingRight: 48,
            justifyContent: "flex-start",
          }}
          animate={{
            width: isHovered ? 134 : 48,
            height: 48,
            borderRadius: 999,
            paddingLeft: isHovered ? 16 : 0,
            paddingRight: 48,
            justifyContent: "flex-start",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            flex items-center
            ${overProjects ? "bg-white text-blue-600" : "bg-blue-600 text-white"}
            dark:bg-blue-400 dark:text-white
            shadow-lg
            overflow-hidden
            relative
            transition-colors duration-300 ease-in-out
          `}
          style={{ minWidth: 48 }}
        >
          {/* Liste des langues (affichée au hover) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="
                  flex gap-3
                  ml-2
                "
              >
                {languages.map((lang) => {
                  const isActive = currentLang === lang.code;
                  return (
                    <span
                      key={lang.code}
                      onClick={() => {
                        if (!isActive) {
                          setFlipCount((c) => c + 1);
                          setIsHovered(false);
                          setTimeout(() => {
                            toggleLang(lang.code);
                          }, 300);
                        }
                      }}
                      role="button"
                      tabIndex={isActive ? -1 : 0}
                      aria-current={isActive ? "true" : undefined}
                      className={`
                        text-xs font-semibold
                        transition
                        ${isActive
                          ? "opacity-100 font-bold cursor-default"
                          : "opacity-60 hover:opacity-90 cursor-pointer"
                        }
                      `}
                      style={{
                        background: "none",
                        border: "none",
                        color: "inherit",
                        padding: 0,
                        minWidth: 24,
                      }}
                    >
                      {lang.code.toUpperCase()}
                    </span>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Icône globe animé */}
          <motion.span
            className="
              absolute right-0 top-1/2
              -translate-y-1/2
              flex items-center justify-center
              w-12 h-12
              pointer-events-none
            "
            initial={{ rotate: -90, opacity: 0 }}
            animate={{
              rotate: 360 * flipCount,
              opacity: 1,
            }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{
              rotate: { duration: 0.3 },
              opacity: { duration: 0.3 },
            }}
          >
            <FiGlobe size={20} />
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}
