import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import about from "../../data/aboutData";
import { useResponsiveViewportAmount } from "../../hooks/useResponsiveViewportAmount";
import parse, { domToReact } from "html-react-parser";
import { fadeVariants, titleVariants, borderVariants } from "../../utils/aboutConstants";
import { useTranslation } from "react-i18next";

/**
 * AboutGoals
 * Sous-section de la page About : objectifs et valeurs.
 * - Affiche les objectifs sous forme de paragraphes animés.
 * - Mots clés balisés (<mark>) mis en avant par gradient masking.
 * - Superposition de deux couches pour un effet de texte sélectif.
 * - Icône de citation en arrière-plan, responsive et décorative.
 * - Utilise des variants et styles centralisés.
 * 
 * Props:
 * - onAnimationComplete: callback appelé à la fin de l'animation d'apparition.
 */

/**
 * parseGoals
 * Parse le texte HTML d'un paragraphe et stylise les balises <mark> selon le type d'affichage.
 * @param {string} para - Le paragraphe HTML à parser.
 * @param {"normal"|"gradient"} type - Type d'affichage ("normal" pour texte gris, "gradient" pour texte masqué sauf mots clés).
 * @returns {React.ReactNode} - Le contenu JSX stylisé.
 *
 * - En mode "normal" : les mots clés (<mark>) sont invisibles.
 * - En mode "gradient" : seuls les mots clés (<mark>) sont visibles en gradient, le reste est masqué.
 */
function parseGoals(para, type) {
  return parse(para, {
    replace: (domNode) => {
      if (domNode.name === "mark") {
        return type === "gradient" ? (
          <span className="bg-clip-text text-transparent font-semibold">
            {domToReact(domNode.children)}
          </span>
        ) : (
          <span className="opacity-0 select-none font-semibold">
            {domToReact(domNode.children)}
          </span>
        );
      }
      if (type === "gradient" && domNode.type === "text") {
        return <span className="opacity-0 select-none">{domNode.data}</span>;
      }
    },
  });
}

export default function AboutGoals({ onAnimationComplete }) {
  // Traduction
  const { t, i18n } = useTranslation();

  // Normalise la langue détectée
  const lang = i18n.language && i18n.language.toUpperCase().startsWith("FR") ? "FR" : "EN";

  // Récupère le texte des objectifs selon la langue
  const goalsText = about.goals[lang];

  // Découpe les objectifs en paragraphes
  const goalsParagraphs = goalsText.split("\n\n");

  // Ratio de viewport pour l'animation d'apparition
  const viewportAmount = useResponsiveViewportAmount(0.3, 0.3);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={fadeVariants}
      className="
        w-full
        flex flex-col items-center
      "
      onAnimationComplete={onAnimationComplete}
    >
      {/* Titre centré avec bordure animée */}
      <div className="
        flex flex-col items-center
        mb-12
      ">
        <motion.h2
          variants={titleVariants}
          className="
            text-3xl sm:text-4xl font-bold
            bg-gradient-to-r from-purple-500 dark:from-purple-400 to-pink-400 dark:to-pink-300
            bg-clip-text text-transparent
            mb-3 sm:mb-4
            text-center
            transition-colors duration-300
          "
        >
          {t("about.goals.title")}
        </motion.h2>
        <motion.div
          variants={borderVariants}
          className="
            w-20 h-1 sm:h-1.25
            bg-gradient-to-r from-purple-400 dark:from-purple-400 to-pink-300 dark:to-pink-300
            rounded-full
            origin-center
            mx-auto
            transition-colors duration-300
          "
        />
      </div>
      {/* Bloc texte centré avec icône quote en fond */}
      <div className="
        relative w-full
        flex flex-col items-center
      ">
        {/* Icône quote asymétrique en arrière-plan */}
        <span className="
          absolute left-[0%] top-[-40%]
          text-[10rem]
          opacity-10
          text-purple-400 dark:text-purple-800
          pointer-events-none
          z-0
          select-none
          transition-colors duration-300
        ">
          <FaQuoteLeft />
        </span>
        {/* Texte avec gradient masking : superposition des deux couches */}
        <motion.blockquote
          variants={fadeVariants}
          className="
            relative z-10
            text-center
            max-w-2xl mx-auto
          "
        >
          {goalsParagraphs.map((para, idx) => (
            <div key={idx} className="relative mb-3 last:mb-0">
              {/* Couche normale : texte gris, mots clés invisibles */}
              <p className="
                text-base sm:text-lg
                font-light
                text-gray-800 dark:text-gray-200
                leading-snug
                transition-colors duration-300
              ">
                {parseGoals(para, "normal")}
              </p>
              {/* Couche gradient : mots clés en gradient, reste masqué */}
              <p
                className="
                  absolute inset-0 pointer-events-none
                  text-base sm:text-lg font-light leading-snug
                  bg-gradient-to-r from-purple-400 to-pink-300 dark:from-purple-400 dark:to-pink-300
                  bg-clip-text
                  transition-colors duration-300
                "
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                aria-hidden="true"
              >
                {parseGoals(para, "gradient")}
              </p>
            </div>
          ))}
        </motion.blockquote>
      </div>
    </motion.div>
  );
}
