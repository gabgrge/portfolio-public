import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaAward } from "react-icons/fa";
import { useResponsiveViewportAmount } from "../../hooks/useResponsiveViewportAmount";
import { parseDate } from "../../utils/parseDate";
import about from "../../data/aboutData";
import {
  timelineColors,
  fadeVariants,
  titleVariants,
  borderVariants,
} from "../../utils/aboutConstants";
import { useTranslation } from "react-i18next";

/**
 * AboutTimeline
 * Sous-section de la page About : parcours (expériences, formations, certifications).
 * - Affiche une timeline verticale, animée et responsive.
 * - Couleurs, icônes et effets dynamiques selon le type d'entrée.
 * - Animation d'apparition via Framer Motion.
 * - Utilise des variants et styles centralisés.
 */

/**
 * getTimelineData
 * Transforme les données brutes du profil en une liste d'objets pour la timeline.
 * @param {object} about - Données du profil (expérience, formation, certifications).
 * @returns {Array} - Liste d'objets timeline triés par date décroissante.
 *
 * Chaque entrée contient :
 * - type : "exp", "edu" ou "cert"
 * - icon : composant React pour l'icône
 * - title, org, desc, period, location, stack, badge, url, date
 */
function getTimelineData(about, lang) {
  return [
    ...about.experience.map((e) => ({
      type: "exp",
      icon: <FaBriefcase className={timelineColors.exp.icon} />,
      title: e.title[lang],
      org: e.organization[lang] || e.organization,
      desc: e.description[lang],
      period: e.period[lang],
      location: e.location[lang],
      stack: e.stack,
      date: parseDate(e.period[lang].split(" - ")[0]),
    })),
    ...about.education.map((e) => ({
      type: "edu",
      icon: <FaGraduationCap className={timelineColors.edu.icon} />,
      title: e.degree[lang],
      org: e.school,
      desc: null,
      period: e.period[lang],
      location: e.location[lang],
      stack: null,
      date: parseDate(e.period[lang].split(" - ")[0]),
    })),
    ...about.certifications.map((c) => ({
      type: "cert",
      icon: <FaAward className={timelineColors.cert.icon} />,
      title: c.name,
      org: c.issuer,
      desc: null,
      period: c.date[lang],
      location: null,
      stack: null,
      badge: c.badge,
      url: c.url,
      date: parseDate(c.date[lang]),
    })),
  ].sort((a, b) => b.date - a.date);
}

export default function AboutTimeline() {
  // Traduction
  const { t, i18n } = useTranslation();

  // Normalise la langue détectée
  const lang = i18n.language && i18n.language.toUpperCase().startsWith("FR") ? "FR" : "EN";

  // Données de la timeline, triées par date
  const timelineData = getTimelineData(about, lang);
  // Ratio de viewport pour l'animation d'apparition
  const viewportAmount = useResponsiveViewportAmount(0.1, 0.15);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={fadeVariants}
      className="w-full"
    >
      {/* Titre avec bordure animée */}
      <div className="flex flex-col items-start mb-12">
        <motion.h2
          variants={titleVariants}
          className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent mb-3"
        >
          {t("about.timeline.title")}
        </motion.h2>
        <motion.div
          variants={borderVariants}
          className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full origin-left"
        />
      </div>

      {/* Timeline verticale */}
      <div className="flex w-full flex-col items-start">
        {timelineData.map((item, idx) => (
          <div
            key={`${item.type}-${item.title}-${item.period}`}
            className="group flex gap-x-6 rounded-xl p-3 -m-3"
          >
            <div className="relative">
              {/* Ligne verticale avec couleur dynamique et effet au hover */}
              <div
                className={`absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-white/50 backdrop-blur-md
                group-hover:bg-gradient-to-b ${
                  timelineColors[item.type].line
                } group-hover:to-white/50 group-hover:w-1
                transition-all duration-400 ease-in-out`}
              />

              {/* Icône avec couleur dynamique et animation bounce fluide */}
              <span
                className={`relative z-10 grid h-10 w-10 place-items-center rounded-full bg-white/50 backdrop-blur-md
                group-hover:shadow-xl ${
                  timelineColors[item.type].shadow
                } group-hover:-translate-y-3 group-hover:-rotate-12 group-hover:animate-[smoothBounce_1s_ease-in-out_infinite] ${
                  timelineColors[item.type].iconSpan
                }
                transition-all duration-400 ease-in-out`}
              >
                {item.icon}
              </span>
            </div>

            {/* Contenu avec effet de slide horizontal au hover */}
            <div
              className={`-translate-y-1.5 flex-1 group-hover:translate-x-3 transition-all duration-600 ${
                idx < timelineData.length - 1 ? "pb-8" : "pb-0"
              }`}
            >
              {/* Titre et organisation */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-y-1 gap-x-2">
                <span className="font-semibold text-gray-900">
                  {item.title}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {item.org}
                </span>
              </div>
              {/* Période et localisation */}
              <div className="text-sm text-gray-500 mt-0.5">
                {item.period}
                {item.location && <> — {item.location}</>}
              </div>
              {/* Description */}
              {item.desc && (
                <p className="text-gray-800 leading-relaxed mt-2">
                  {item.desc}
                </p>
              )}
              {/* Stack technique */}
              {item.stack && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {/* Badge de certification et lien */}
              {item.type === "cert" && item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 text-sm text-yellow-600
                  hover:text-yellow-800
                  transition-colors duration-300"
                >
                  {item.badge && (
                    <img
                      src={item.badge}
                      alt={item.title}
                      className="h-5 w-5"
                    />
                  )}
                  {t("about.timeline.seeCertification")}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
