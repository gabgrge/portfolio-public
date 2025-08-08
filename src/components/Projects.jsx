import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import projects from "../data/projectsData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiX, FiGithub } from "react-icons/fi";
import useDarkMode from "../hooks/useDarkMode";

/**
 * Section Projets
 * Affiche une liste de projets avec un slider réactif et une modale pour les détails.
 * - Slider réactif avec navigation personnalisée.
 * - Modale glassmorphisme pour afficher un projet en détail.
 * - Responsive et accessible.
 *
 * Props :
 * - sectionRef : ref pour le scroll/repérage de la section.
 */
function Projects({ sectionRef }) {
  // Traduction
  const { t, i18n } = useTranslation();

  // Normalise la langue détectée
  const lang = i18n.language && i18n.language.toUpperCase().startsWith("FR") ? "FR" : "EN";

  // Référence pour contrôler le slider
  const sliderRef = useRef(null);

  // État de la modale projet
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);

  // Paramètres du slider react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Flèches custom, pas celles de react-slick
  };

  // SVG de fond pour la section (clair/sombre)
  const isDark = useDarkMode();
  const svgBgLight =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'><rect fill='%23155DFC' width='800' height='800'/><g fill='none' stroke='%23256DFF' stroke-width='1'><path d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/><path d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/><path d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/><path d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/><path d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/></g><g fill='%23256DFF'><circle cx='769' cy='229' r='5'/><circle cx='539' cy='269' r='5'/><circle cx='603' cy='493' r='5'/><circle cx='731' cy='737' r='5'/><circle cx='520' cy='660' r='5'/><circle cx='309' cy='538' r='5'/><circle cx='295' cy='764' r='5'/><circle cx='40' cy='599' r='5'/><circle cx='102' cy='382' r='5'/><circle cx='127' cy='80' r='5'/><circle cx='370' cy='105' r='5'/><circle cx='578' cy='42' r='5'/><circle cx='237' cy='261' r='5'/><circle cx='390' cy='382' r='5'/></g></svg>\")";
  const svgBgDark =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'><rect fill='%231C398E' width='800' height='800'/><g fill='none' stroke='%231C40A0' stroke-width='1'><path d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/><path d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/><path d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/><path d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/><path d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/></g><g fill='%231C40A0'><circle cx='769' cy='229' r='5'/><circle cx='539' cy='269' r='5'/><circle cx='603' cy='493' r='5'/><circle cx='731' cy='737' r='5'/><circle cx='520' cy='660' r='5'/><circle cx='309' cy='538' r='5'/><circle cx='295' cy='764' r='5'/><circle cx='40' cy='599' r='5'/><circle cx='102' cy='382' r='5'/><circle cx='127' cy='80' r='5'/><circle cx='370' cy='105' r='5'/><circle cx='578' cy='42' r='5'/><circle cx='237' cy='261' r='5'/><circle cx='390' cy='382' r='5'/></g></svg>\")";
  const svgBg = isDark ? svgBgDark : svgBgLight;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center py-12"
      style={{
        backgroundImage: svgBg,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-5xl mx-auto w-full px-4">
        {/* Titre principal */}
        <h2 className="text-3xl font-bold text-center mb-8 text-white dark:text-gray-100 transition-colors duration-300">
          {t("projects.title")}
        </h2>
        <div className="relative group">
          {/* Modale projet (détail) */}
          {modalOpen && modalProject && (
            <div className="
              fixed inset-0 z-50
              flex items-center justify-center
            ">
              {/* Overlay flouté, clic pour fermer */}
              <div
                className="
                  absolute inset-0
                  bg-black/30
                  backdrop-blur-sm
                  transition-opacity duration-300
                "
                onClick={() => setModalOpen(false)}
                aria-label="Fermer le modal"
              />
              {/* Contenu de la modale */}
              <div
                className="
                  relative z-10
                  flex flex-col items-center justify-center
                  w-full max-w-md sm:max-w-xl
                  h-[80vh] sm:h-auto sm:min-h-3/5
                  mx-4 p-6 sm:py-12 sm:px-10
                  rounded-2xl
                  shadow-2xl
                  border border-white/30 dark:border-blue-400/15
                  bg-white/30 dark:bg-blue-950/30
                  backdrop-blur-lg
                  animate-fade-in
                  transition-colors duration-300
                "
                style={{ maxHeight: "90vh" }}
              >
                {/* Bouton de fermeture */}
                <button
                  className="
                    absolute top-2 right-2
                    z-20
                    p-1 sm:p-2
                    rounded-full
                    text-gray-700 dark:text-gray-200
                    hover:rotate-90 hover:scale-110
                    hover:text-gray-800 dark:hover:text-blue-400
                    focus:outline-none
                    focus:text-blue-700 dark:focus:text-blue-400
                    cursor-pointer
                    transition duration-300
                  "
                  onClick={() => setModalOpen(false)}
                  aria-label="Fermer"
                  tabIndex={0}
                  type="button"
                >
                  <FiX size={22} />
                </button>
                {/* Titre et organisation */}
                <h3 className="
                  text-2xl font-bold mb-2
                  text-gray-800 dark:text-gray-200
                  transition-colors duration-300
                ">
                  {typeof modalProject.title === "string"
                    ? modalProject.title
                    : modalProject.title[lang]}
                </h3>
                <p className="
                  text-sm font-medium mb-3
                  self-start text-left
                  text-gray-800/70 dark:text-gray-300/70
                  transition-colors duration-300
                ">
                  {typeof modalProject.organization === "string"
                    ? modalProject.organization
                    : modalProject.organization[lang]}
                </p>
                {/* Description et technos (scrollable) */}
                <div className="w-full overflow-y-auto">
                  {/* Description détaillée */}
                  <div className="
                    text-base leading-relaxed w-full
                    text-gray-900 dark:text-gray-200
                    transition-colors duration-300
                  ">
                    {(typeof modalProject.description === "string"
                      ? modalProject.description
                      : modalProject.description[lang]
                    )
                      .split("\n\n")
                      .map((para, idx) => (
                        <p key={idx} className="mb-3">
                          {para.split("\n").map((line, i, arr) =>
                            i < arr.length - 1 ? (
                              <>
                                {line}
                                <br />
                              </>
                            ) : (
                              line
                            )
                          )}
                        </p>
                      ))}
                  </div>
                  {/* Liste des technologies */}
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {modalProject.tech?.map((tech, i) => (
                      <span
                        key={i}
                        className="
                          text-xs font-semibold px-3 py-1
                          rounded-full
                          border border-blue-700 dark:border-blue-400
                          text-blue-700 dark:text-blue-400
                          transition-colors duration-300
                        "
                      >
                        {typeof tech === "string" ? tech : tech[lang]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Animation d'apparition */}
              <style>{`
                .animate-fade-in {
                  animation: fadeInModal 0.25s cubic-bezier(.4,0,.2,1);
                }
                @keyframes fadeInModal {
                  from { opacity: 0; transform: translateY(30px) scale(0.98);}
                  to { opacity: 1; transform: translateY(0) scale(1);}
                }
              `}</style>
            </div>
          )}

          {/* Carrousel des projets */}
          <Slider {...settings} ref={sliderRef}>
            {projects.map((project, index) => (
              <div key={index} className="pt-4 pb-8 px-2 sm:px-4">
                <div className="
                  relative min-h-[400px] sm:min-h-[500px]
                  flex flex-col sm:flex-row items-center
                  overflow-hidden
                  gap-6 p-6
                  rounded-2xl
                  bg-gray-100 dark:bg-blue-950
                  border border-white dark:border-blue-400/15
                  shadow-lg dark:shadow-[0_0_10px_0_rgba(32,129,255,0.15)]
                  sm:shadow-xl sm:dark:shadow-[0_0_14px_0_rgba(32,129,255,0.35)]
                  transition-colors duration-300
                ">
                  {/* Flèche gauche (desktop, visible au survol) */}
                  <button
                    type="button"
                    aria-label="Précédent"
                    onClick={() => sliderRef.current?.slickPrev()}
                    className="
                      hidden sm:flex
                      absolute inset-y-0 left-0 w-14
                      items-center justify-center
                      z-10
                      backdrop-blur-md
                      rounded-l-2xl
                      cursor-pointer
                      bg-white/30 dark:bg-blue-950/30
                      border-r border-white/30 dark:border-blue-400/20
                      opacity-0 hover:opacity-100 focus:opacity-100
                      transition-opacity duration-200
                    "
                    tabIndex={0}
                  >
                    <FaChevronLeft
                      size={28}
                      className="
                        text-blue-600 dark:text-blue-400
                        group-active:scale-90
                        transition-transform duration-100
                      "
                    />
                  </button>

                  {/* Flèche droite (desktop, visible au survol) */}
                  <button
                    type="button"
                    aria-label="Suivant"
                    onClick={() => sliderRef.current?.slickNext()}
                    className="
                      hidden sm:flex
                      absolute inset-y-0 right-0 w-14
                      items-center justify-center
                      z-10
                      backdrop-blur-md
                      rounded-r-2xl
                      cursor-pointer
                      bg-white/30 dark:bg-blue-950/30
                      border-l border-white/30 dark:border-blue-400/20
                      opacity-0 hover:opacity-100 focus:opacity-100
                      transition-opacity duration-200
                    "
                    tabIndex={0}
                  >
                    <FaChevronRight
                      size={28}
                      className="
                        text-blue-600 dark:text-blue-400
                        group-active:scale-90
                        transition-transform duration-100
                      "
                    />
                  </button>

                  {/* Image du projet */}
                  <div className="w-full sm:w-1/2 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={typeof project.title === "string" ? project.title : project.title[lang]}
                      className="max-h-60 sm:max-h-[400px] w-auto h-auto object-contain mx-auto"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                  {/* Infos projet */}
                  <div className="w-full sm:w-1/2 text-center sm:text-left flex flex-col justify-center">
                    <h3 className="
                      mb-2
                      text-xl font-semibold
                      text-gray-800 dark:text-gray-200
                      transition-colors duration-300
                    ">
                      {typeof project.title === "string" ? project.title : project.title[lang]}
                    </h3>
                    <p className="
                      mb-1
                      text-sm
                      text-gray-500 dark:text-gray-300
                      transition-colors duration-300
                    ">
                      {typeof project.organization === "string" ? project.organization : project.organization[lang]}
                    </p>
                    <p className="
                      mb-3
                      text-gray-600 dark:text-gray-200
                      transition-colors duration-300
                    ">
                      {typeof project.summary === "string" ? project.summary : project.summary[lang]}
                    </p>
                    {/* Technologies utilisées */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="
                            px-2 py-1
                            rounded-full
                            text-xs font-medium
                            bg-white dark:bg-blue-950
                            text-blue-600 dark:text-blue-400
                            transition-colors duration-300
                          "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Boutons d'action */}
                    <div className="flex flex-row gap-3 justify-center sm:justify-start mt-2">
                      {/* Bouton pour ouvrir la modale projet */}
                      <button
                        className="
                          px-4 py-2
                          text-sm
                          rounded-full
                          cursor-pointer
                          shadow
                          bg-blue-600 dark:bg-blue-400
                          text-white dark:text-blue-950
                          hover:bg-blue-700 dark:hover:bg-blue-400 dark:hover:text-white
                          active:scale-90
                          transition duration-300
                        "
                        onClick={() => {
                          setModalProject(project);
                          setModalOpen(true);
                        }}
                        type="button"
                      >
                        {t("projects.more")}
                      </button>
                      {/* Lien vers le dépôt GitHub (si disponible) */}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex items-center
                            gap-2 px-4 py-2
                            text-sm
                            rounded-full
                            shadow
                            border border-blue-600 dark:border-blue-400
                            text-blue-600 dark:text-blue-400
                            hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white
                            active:scale-90
                            transition duration-300
                          "
                        >
                          <FiGithub size={18} />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Projects;
