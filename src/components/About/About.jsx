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
 */
export default function About() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(70%_120%_at_50%_40%,rgba(196,181,253,0.28)_0,rgba(251,207,235,0.18)_60%,rgba(186,230,253,0.12)_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(60%_80%_at_20%_80%,rgba(251,207,235,0.16)_0,rgba(186,230,253,0.08)_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(50%_70%_at_80%_20%,rgba(186,230,253,0.12)_0,rgba(196,181,253,0.06)_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30" />
      </div>
      {/* Contenu principal */}
      <div className="relative z-10 space-y-16 px-6 sm:px-6 max-w-4xl mx-auto py-16">
        <AboutIntro />
        <AboutSkills />
        <AboutTimeline />
        <AboutGoals />
      </div>
    </section>
  );
}
