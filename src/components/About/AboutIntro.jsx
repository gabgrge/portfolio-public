import { motion } from "framer-motion";
import about from "../../data/aboutData";
import { FaQuoteLeft } from "react-icons/fa";
import { useResponsiveViewportAmount } from "../../hooks/useResponsiveViewportAmount";
import photo from "../../assets/about/intro-picture.png";
import { quoteVariant, textVariant, photoVariant } from "../../utils/aboutConstants";
import { useTranslation } from "react-i18next";

/**
 * AboutIntro
 * Sous-section de la page About : introduction du profil.
 * - Affiche une citation/introduction et une photo.
 * - Responsive, animations d’apparition via Framer Motion.
 * - Structure claire : bloc texte + bloc photo.
 * - Utilise des variants et styles centralisés.
 */
export default function AboutIntro() {
  // Traduction
  const { i18n } = useTranslation();

  // Normalise la langue détectée
  const lang = i18n.language && i18n.language.toUpperCase().startsWith("FR") ? "FR" : "EN";

  // Récupère le texte d'introduction selon la langue
  const introText = about.introduction[lang];
  
  // Découpe le texte d'introduction en paragraphes
  const introParagraphs = introText.split("\n\n");

  // Ratio de viewport pour l'animation d'apparition
  const viewportAmount = useResponsiveViewportAmount(0.3, 0.3);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      className="w-full"
    >
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
        {/* Bloc citation/texte */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center h-full">
          <motion.span variants={quoteVariant} className="inline-block">
            {/* Icône de citation décorative */}
            <FaQuoteLeft className="text-2xl sm:text-3xl text-blue-300 mb-4" />
          </motion.span>
          <motion.blockquote
            variants={textVariant}
            className="text-base sm:text-lg font-light text-gray-800 leading-snug mb-4 md:mb-0 text-center md:text-left max-w-xl"
          >
            {/* Affiche chaque paragraphe d'introduction */}
            {introParagraphs.map((para, idx) => (
              <p key={idx} className="mb-2 last:mb-0">
                {para}
              </p>
            ))}
          </motion.blockquote>
        </div>
        {/* Bloc photo */}
        <motion.div
          variants={photoVariant}
          className="flex-shrink-0 flex items-center justify-center"
        >
          <img
            src={photo}
            alt="Gabriel"
            className="w-52 h-52 md:w-80 md:h-80 object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
