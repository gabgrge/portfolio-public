import { useState } from "react";
import { motion } from "framer-motion";
import AnimateHeight from "react-animate-height";
import {
  FaDatabase,
  FaBrain,
  FaCloud,
  FaChartBar,
  FaCode,
  FaProjectDiagram,
  FaChevronDown,
} from "react-icons/fa";
import { useResponsiveViewportAmount } from "../../hooks/useResponsiveViewportAmount";
import about from "../../data/aboutData";
import {
  skillsColors,
  containerVariants,
  itemVariants,
  titleVariants,
  borderVariants,
} from "../../utils/aboutConstants";
import { useTranslation } from "react-i18next";

/**
 * AboutSkills
 * Sous-section de la page About : compétences par catégorie.
 * - Affiche les catégories de compétences avec icône et tags.
 * - Animation d'apparition et d'ouverture (hover/click) des catégories.
 * - Responsive : grid adaptative, chevron mobile, effet glass.
 * - Utilise AnimateHeight pour l'ouverture/fermeture fluide.
 * - Utilise des variants et styles centralisés.
 */

/**
 * skillsIcons
 * Icônes associées à chaque catégorie de compétences.
 * Utilisé pour illustrer chaque bloc de compétences.
 * @type {Object.<string, JSX.Element>}
 */
const skillsIcons = {
  dataEngineering: <FaDatabase className="text-3xl text-blue-500 dark:text-blue-400" />,
  dataScience: <FaBrain className="text-3xl text-purple-500 dark:text-purple-400" />,
  cloudDevOps: <FaCloud className="text-3xl text-cyan-500 dark:text-cyan-400" />,
  biDataViz: <FaChartBar className="text-3xl text-yellow-500 dark:text-yellow-400" />,
  development: <FaCode className="text-3xl text-green-500 dark:text-green-400" />,
  projectManagement: <FaProjectDiagram className="text-3xl text-pink-500 dark:text-pink-400" />,
};

export default function AboutSkills() {
  // Traduction
  const { t, i18n } = useTranslation();

  // Normalise la langue détectée
  const lang = i18n.language && i18n.language.toUpperCase().startsWith("FR") ? "FR" : "EN";

  // État pour gérer l'ouverture des catégories
  const [open, setOpen] = useState(null);

  // Ouvre/ferme une catégorie (mobile: click, desktop: hover)
  const handleOpen = (cat) => setOpen(open === cat ? null : cat);

  // Ratio de viewport pour l'animation d'apparition
  const viewportAmount = useResponsiveViewportAmount(0.2, 0.6, 768);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={containerVariants}
      className="w-full"
    >
      {/* Titre avec bordure animée */}
      <div className="flex flex-col items-start mb-12">
        <motion.h2
          variants={titleVariants}
          className="
            text-3xl font-bold
            bg-gradient-to-r from-blue-500 dark:from-blue-400 to-blue-400 dark:to-blue-300
            bg-clip-text text-transparent
            mb-3
            transition-colors duration-300
          "
        >
          {t("about.skills.title")}
        </motion.h2>
        <motion.div
          variants={borderVariants}
          className="
            w-20 h-1
            bg-gradient-to-r from-blue-500 dark:from-blue-400 to-blue-400 dark:to-blue-300
            rounded-full origin-left
            transition-colors duration-300
          "
        />
      </div>

      {/* Grid des catégories de compétences */}
      <div className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        gap-6 items-start
      ">
        {Object.entries(about.skills).map(([key, { label, skills }]) => {
          const isOpen = open === key;
          return (
            <motion.div
              key={key}
              variants={itemVariants}
              onMouseEnter={() => setOpen(key)}
              onMouseLeave={() => setOpen(null)}
              onClick={() => window.innerWidth < 640 && handleOpen(key)}
              className={`
                relative
                rounded-xl
                shadow-md
                backdrop-blur-md
                bg-white/50 dark:bg-white/5
                border border-white/15 dark:border-white/10
                transition-all duration-300
                ${isOpen ? "ring-2 ring-blue-400 dark:ring-white/20 z-10" : ""}
              `}
              style={{
                padding: "1.25rem",
                minHeight: 80,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {/* Carte de la catégorie */}
              <div className="flex items-center gap-3 mb-1 w-full justify-between">
                <div className="flex items-center gap-3">
                  {/* Icône de la catégorie */}
                  {skillsIcons[key]}
                  {/* Nom de la catégorie */}
                  <span className="
                    font-semibold text-lg
                    text-gray-800 dark:text-gray-100
                    transition-colors duration-300
                  ">
                    {typeof label === "string" ? label : label[lang]}
                  </span>
                </div>
                {/* Chevron visible sur mobile uniquement */}
                <span
                  className="
                    block sm:hidden
                    transition-transform duration-300
                  "
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <FaChevronDown className="
                    text-gray-400 dark:text-gray-600
                    transition-colors duration-300
                  " />
                </span>
              </div>
              {/* Liste des compétences, ouverture animée */}
              <AnimateHeight
                duration={300}
                height={isOpen ? "auto" : 0}
                animateOpacity
              >
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className={`
                        px-3 py-1
                        rounded-full
                        text-xs font-medium
                        border
                        ${skillsColors[key]}
                        transition-colors duration-300
                      `}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </AnimateHeight>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
