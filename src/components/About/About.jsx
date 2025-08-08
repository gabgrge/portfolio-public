import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import AboutIntro from "./AboutIntro";
import AboutSkills from "./AboutSkills";
import AboutTimeline from "./AboutTimeline";
import AboutGoals from "./AboutGoals";

/**
 * Section About
 * Présente le profil, les compétences, le parcours et les objectifs.
 * - Arrière-plan organique pastel, responsive.
 * - Structure modulaire : Intro, Skills, Timeline, Goals.
 * - Animations d’apparition via Framer Motion.
 * - Bouton animé vers la section Contact.
 */
export default function About() {
  // Référence pour le bouton de contact
  const buttonRef = useRef(null);

  // État pour observer l'animation du bouton
  const [inView, setInView] = useState(false);

  // État pour observer l'animation des objectifs
  const [goalsDone, setGoalsDone] = useState(false);

  // Effet pour observer l'animation du bouton
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (buttonRef.current) observer.observe(buttonRef.current);
    return () => {
      if (buttonRef.current) observer.unobserve(buttonRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan */}
      <div
        className="
          absolute inset-0
          z-0
          pointer-events-none
        "
      >
        <div
          className="
            absolute top-0 left-0 w-full h-full
            bg-[radial-gradient(70%_120%_at_50%_40%,rgba(196,181,253,0.28)_0,rgba(251,207,235,0.18)_60%,rgba(186,230,253,0.12)_100%)]
            dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(32,129,255,0.38)_0,rgba(32,129,255,0.16)_70%,transparent_100%)]
            transition-colors duration-300
          "
        />
        <div
          className="
            absolute top-0 left-0 w-full h-full
            bg-[radial-gradient(60%_80%_at_20%_80%,rgba(251,207,235,0.16)_0,rgba(186,230,253,0.08)_100%)]
            dark:bg-[radial-gradient(80%_60%_at_50%_100%,rgba(186,104,200,0.32)_0,rgba(251,207,235,0.18)_60%,transparent_100%)]
            transition-colors duration-300
          "
        />
        <div
          className="
            absolute top-0 left-0 w-full h-full
            bg-[radial-gradient(50%_70%_at_80%_20%,rgba(186,230,253,0.12)_0,rgba(196,181,253,0.06)_100%)]
            dark:bg-none
            transition-colors duration-300
          "
        />
        <div
          className="
            absolute top-0 left-0 w-full h-full
            bg-white dark:bg-[#20143A]
            opacity-30 dark:opacity-60
            transition-colors duration-300
          "
        />
      </div>
      {/* Contenu principal */}
      <div
        className="
          relative z-10
          max-w-4xl
          mx-auto space-y-16
          pt-16 pb-6 px-6 sm:px-6
        "
      >
        {/* Sous-sections */}
        <AboutIntro />
        <AboutSkills />
        <AboutTimeline />
        <AboutGoals onAnimationComplete={() => setGoalsDone(true)} />
        {/* Lien vers la section Contact */}
        <div className="flex justify-center">
          <motion.a
            href="#contact"
            ref={buttonRef}
            initial={false}
            animate={
              goalsDone && inView
                ? { scaleX: 1, opacity: 1 }
                : { scaleX: 0, opacity: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.8,
            }}
            className={`
              block w-fit
              ${goalsDone && inView ? "pointer-events-auto" : "pointer-events-none"}
            `}
          >
            <span
              className="
                group inline-block
                text-lg font-semibold
                origin-center
                text-purple-400 hover:text-purple-500 dark:hover:text-purple-300
                transition-colors duration-300
              "
            >
              Me contacter
              <FiChevronDown
                className="
                  block mx-auto mt-2
                  text-xl
                  text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300
                  transition-colors duration-300
                "
              />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
