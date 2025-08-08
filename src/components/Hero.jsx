import { useState, useEffect } from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { FiFileText, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import meshBgLight from "../assets/hero/light/mesh-bg.svg";
import meshBgDark from "../assets/hero/dark/mesh-bg.svg";
import { useTranslation } from "react-i18next";
import useDarkMode from "../hooks/useDarkMode";
import { buttonBase, iconBase, textBase } from "../utils/heroConstants";

/**
 * Section Hero
 * Affiche l'en-tête, une présentation animée ligne par ligne, et des boutons d'action.
 * - Affichage progressif du texte (effet machine à écrire)
 * - Boutons animés pour CV, GitHub, LinkedIn, Email
 * - Affiche le Header intégré (version desktop uniquement)
 *
 * Props :
 * - withHeader : Affiche le Header (version desktop uniquement)
 * - toggleLang : Fonction pour basculer la langue
 */
export default function Hero({ withHeader, toggleLang }) {
  // Traduction
  const { t } = useTranslation();

  // Détermine le thème actuel (clair/sombre)
  const isDark = useDarkMode();

  // Lignes avec effet machine à écrire
  const lines = [
    t("hero.line1"),
    t("hero.line2"),
    t("hero.line3"),
    t("hero.line4"),
  ];

  // États pour l'animation du texte
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState(["", "", "", ""]);
  const [showButtons, setShowButtons] = useState(false);

  // Effet pour réinitialiser l'animation lorsque la langue change
  useEffect(() => {
    setCurrentLine(0);
    setCharIndex(0);
    setDisplayedLines(["", "", "", ""]);
    setShowButtons(false);
  }, lines);

  // Effet machine à écrire ligne par ligne
  useEffect(() => {
    if (currentLine === 0 && charIndex === 0) {
      setShowButtons(false);
    }

    if (currentLine < lines.length) {
      if (charIndex < lines[currentLine].length) {
        const timeoutId = setTimeout(() => {
          setDisplayedLines((prev) => {
            const updated = [...prev];
            updated[currentLine] += lines[currentLine][charIndex];
            return updated;
          });
          setCharIndex((prev) => prev + 1);
        }, 20);
        return () => clearTimeout(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          setCurrentLine((prev) => prev + 1);
          setCharIndex(0);
        }, 400);
        return () => clearTimeout(timeoutId);
      }
    } else {
      setShowButtons(true);
    }
  }, [lines, currentLine, charIndex]);

  return (
    <section
      className="
        relative
        min-h-screen
        flex flex-col
      "
    >
      {/* Header intégré (version desktop uniquement) */}
      {withHeader && <Header toggleLang={toggleLang} />}
      <div
        className="
          flex-grow
          flex items-center justify-center
          px-4
          font-sans
        "
      >
        {/* Fond SVG */}
        <img
          src={meshBgLight}
          alt="mesh background light"
          className={`
            absolute inset-0
            w-full h-full
            object-cover
            -z-10
            transition-opacity duration-300
            ${isDark ? "opacity-0" : "opacity-100"}
          `}
          draggable={false}
        />
        <img
          src={meshBgDark}
          alt="mesh background dark"
          className={`
            absolute inset-0
            w-full h-full
            object-cover
            -z-10
            transition-opacity duration-300
            ${isDark ? "opacity-100" : "opacity-0"}
          `}
          draggable={false}
        />

        <div className="text-center max-w-2xl">
          {/* Ligne 1 - Bonjour */}
          <motion.p
            className="
              text-lg sm:text-2xl
              mb-4
              text-gray-600 dark:text-gray-200
              transition-colors duration-300 ease-in-out
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {displayedLines[0]}
          </motion.p>

          {/* Ligne 2 - Nom */}
          <motion.p
            className="
              text-3xl sm:text-4xl
              mb-1
              text-gray-700 dark:text-gray-100
              transition-colors duration-300 ease-in-out
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {displayedLines[1]}
          </motion.p>

          {/* Ligne 3 - Métier */}
          <motion.p
            className="
              text-3xl sm:text-4xl
              font-semibold
              mb-4
              text-blue-600 dark:text-blue-400
              transition-colors duration-300 ease-in-out
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {displayedLines[2]}
          </motion.p>

          {/* Ligne 4 - Accroche */}
          <motion.p
            className="
              text-lg sm:text-xl
              leading-relaxed
              mt-6 px-2
              max-w-2xl
              text-gray-700 dark:text-gray-200
              transition-colors duration-300 ease-in-out
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {displayedLines[3]}
          </motion.p>

          {/* Boutons d'action (affichés après l'animation) */}
          <div className="h-20 mt-10">
            {showButtons && (
              <div className="flex justify-center gap-4">
                {/* Bouton 1 : Télécharger CV */}
                <motion.a
                  href={t("contact.hrefCv")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("hero.cv")}
                  className={buttonBase}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0, duration: 0.4, ease: "easeIn" }}
                >
                  <span className={iconBase}>
                    <FiFileText />
                  </span>
                  <span className={textBase}>
                    {t("hero.cv")}
                  </span>
                </motion.a>

                {/* Bouton 2 : GitHub */}
                <motion.a
                  href="https://github.com/gabgrge"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("hero.github")}
                  className={buttonBase}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: "easeIn" }}
                >
                  <span className={iconBase}>
                    <FiGithub />
                  </span>
                  <span className={textBase}>
                    {t("hero.github")}
                  </span>
                </motion.a>

                {/* Bouton 3 : LinkedIn */}
                <motion.a
                  href="https://linkedin.com/in/gab-george"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("hero.linkedin")}
                  className={buttonBase}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: "easeIn" }}
                >
                  <span className={iconBase}>
                    <FiLinkedin />
                  </span>
                  <span className={textBase}>
                    {t("hero.linkedin")}
                  </span>
                </motion.a>

                {/* Bouton 4 : Email */}
                <motion.a
                  href="mailto:gabriel.george@efrei.net"
                  aria-label={t("hero.email")}
                  className={buttonBase}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: "easeIn" }}
                >
                  <span className={iconBase}>
                    <FiMail />
                  </span>
                  <span className={textBase}>
                    {t("hero.email")}
                  </span>
                </motion.a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
