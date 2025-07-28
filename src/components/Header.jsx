import { useState } from "react";
import { FiMenu, FiX, FiGlobe, FiMoon, FiSun } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import profilePicture from "../assets/logo/logo-cartoon.png";

/**
 * Header
 * Affiche la barre de navigation principale du portfolio.
 * - Logo et nom
 * - Navigation desktop (liens vers sections)
 * - Boutons d'action mobile (thème, langue, navigation)
 * - Menus animés pour la langue et la navigation sur mobile
 * 
 * Props :
 * - isDarkMode : Indique si le thème sombre est activé
 * - toggleTheme : Fonction pour basculer le thème
 * - toggleLang : Fonction pour basculer la langue
 */
function Header({ isDarkMode, toggleTheme, toggleLang }) {
  // Traduction
  const { t, i18n } = useTranslation();

  // Normalise la langue détectée
  const currentLang = i18n.language && i18n.language.toLowerCase().startsWith("fr") ? "fr" : "en";

  // État d'ouverture du menu navigation mobile
  const [isNavOpen, setIsNavOpen] = useState(false);
  // État d'ouverture du menu langue mobile
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <header className="w-full z-20 absolute top-0 left-0 sm:static sm:top-auto sm:left-auto">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo + Nom */}
        <div className="flex items-center gap-3">
          <img
            src={profilePicture}
            alt="Gabriel"
            className="w-10 h-10 rounded-full ring-1 ring-blue-600/20"
          />
          <span className="text-sm text-gray-700 font-medium tracking-wide">
            Gabriel George <span className="hidden sm:inline">· {t("header.portfolio")}</span>
          </span>
        </div>

        {/* Navigation desktop */}
        <nav className="hidden sm:flex gap-6 text-gray-700 text-sm font-medium">
          <a href="#projects" className="hover:text-blue-600 transition">
            {t("header.nav.projects")}
          </a>
          <a href="#about" className="hover:text-blue-600 transition">
            {t("header.nav.about")}
          </a>
          <a href="#contact" className="hover:text-blue-600 transition">
            {t("header.nav.contact")}
          </a>
        </nav>

        {/* Boutons menus mobile (thème, langue, navigation) */}
        <div className="flex sm:hidden gap-3 items-center">
          {/* Bouton thème clair/sombre */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center p-2 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            <motion.div
              key={isDarkMode ? "dark" : "light"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.div>
          </motion.button>

          {/* Bouton menu langue */}
          <motion.button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center p-2 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            <motion.div
              key={isLangMenuOpen ? "close" : "globe"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isLangMenuOpen ? <FiX size={18} /> : <FiGlobe size={18} />}
            </motion.div>
          </motion.button>

          {/* Bouton menu navigation */}
          <motion.button
            onClick={() => setIsNavOpen(!isNavOpen)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center p-2 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            <motion.div
              key={isNavOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isNavOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Menu langue mobile animé */}
      <AnimatePresence>
        {isLangMenuOpen && (
          <>
            {/* Backdrop pour fermer le menu langue */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsLangMenuOpen(false)}
            />
            {/* Menu Langue mobile */}
            <motion.div
              key="lang-menu"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="sm:hidden fixed top-0 right-0 mt-20 mr-4 z-40
                         flex flex-col gap-2 items-end
                         bg-white/30 backdrop-blur-lg
                         shadow-2xl rounded-2xl px-6 py-6
                         text-gray-700 text-base font-medium"
              style={{ boxShadow: "0 8px 32px 0 rgba(30,64,175,0.10)" }}
            >
              {/* Boutons de sélection de langue */}
              {["fr", "en"].map((lang) => (
                <motion.button
                  key={lang}
                  onClick={() => {
                    if (currentLang !== lang) {
                      toggleLang(lang);
                      setIsLangMenuOpen(false);
                    }
                  }}
                  disabled={currentLang === lang}
                  whileHover={currentLang !== lang ? { scale: 1.04 } : {}}
                  whileTap={currentLang !== lang ? { scale: 0.97 } : {}}
                  className={`transition-colors duration-200 px-4 py-2 rounded-lg text-right w-full
                    ${
                      currentLang === lang
                        ? "bg-blue-600 text-white font-bold cursor-default"
                        : "hover:text-blue-600 cursor-pointer"
                    }`}
                >
                  {lang.toUpperCase()}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Menu navigation mobile animé */}
      <AnimatePresence>
        {isNavOpen && (
          <>
            {/* Backdrop pour fermer le menu navigation */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsNavOpen(false)}
            />
            {/* Menu navigation mobile */}
            <motion.div
              key="mobile-menu"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="sm:hidden fixed top-0 right-0 mt-20 mr-4 z-40
                         flex flex-col gap-4 items-end
                         bg-white/30 backdrop-blur-lg
                         shadow-2xl rounded-2xl px-6 py-6
                         text-gray-700 text-base font-medium"
              style={{ boxShadow: "0 8px 32px 0 rgba(30,64,175,0.10)" }}
            >
              {/* Liens de navigation mobile */}
              <motion.a
                href="#projects-mobile"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="transition-colors duration-200 px-2 py-2 rounded-lg text-right w-full hover:text-blue-600"
                onClick={() => setIsNavOpen(false)}
              >
                {t("header.nav.projects")}
              </motion.a>
              <motion.a
                href="#about-mobile"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="transition-colors duration-200 px-2 py-2 rounded-lg text-right w-full hover:text-blue-600"
                onClick={() => setIsNavOpen(false)}
              >
                {t("header.nav.about")}
              </motion.a>
              <motion.a
                href="#contact-mobile"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="transition-colors duration-200 px-2 py-2 rounded-lg text-right w-full hover:text-blue-600"
                onClick={() => setIsNavOpen(false)}
              >
                {t("header.nav.contact")}
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
