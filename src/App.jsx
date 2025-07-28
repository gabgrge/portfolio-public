import { useState, useRef } from "react";
import i18n from "./i18n";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWidgets from "./components/FloatingWidgets";

/**
 * Composant principal de l'application Portfolio.
 * Gère le thème, la langue, et l'affichage responsive (desktop/mobile).
 * Passe les refs et callbacks nécessaires aux composants enfants.
 */
function App() {
  // Détermine la langue actuelle à partir de i18n
  const currentLang =
    i18n.language && i18n.language.toLowerCase().startsWith("fr")
      ? "fr"
      : "en";

  // Bascule la langue entre français et anglais
  const toggleLang = (lang) => {
    const nextLang = lang
      ? lang.toLowerCase()
      : currentLang === "fr"
      ? "en"
      : "fr";
    i18n.changeLanguage(nextLang);
  };

  // État du mode sombre
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Bascule le thème clair/sombre
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Ref pour détecter la position de la section projets (pour les widgets flottants)
  const projectsRef = useRef(null);
  const scrollContainerRef = useRef(null);

  return (
    <>
      {/* --- Version desktop avec scroll snap --- */}
      <div
        ref={scrollContainerRef}
        className="hidden sm:block h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative"
      >
        <main>
          {/* Section Hero (avec Header intégré) */}
          <section id="hero" className="snap-start min-h-screen">
            <Hero
              withHeader={true}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              toggleLang={toggleLang}
            />
          </section>

          {/* Section Projets (avec ref pour widgets) */}
          <section id="projects" className="snap-start min-h-screen">
            <Projects sectionRef={projectsRef} />
          </section>

          {/* Section À propos */}
          <section id="about" className="snap-start min-h-screen">
            <About />
          </section>

          {/* Section Contact */}
          <section id="contact" className="snap-start min-h-screen">
            <Contact />
          </section>

          {/* Footer */}
          <section id="footer" className="snap-start">
            <Footer />
          </section>
        </main>
        {/* Widgets flottants (desktop) */}
        <FloatingWidgets
          projectsRef={projectsRef}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          toggleLang={toggleLang}
        />
      </div>

      {/* --- Version mobile sans scroll snap --- */}
      <div className="block sm:hidden scroll-smooth">
        {/* Header mobile */}
        <Header
          withHeader={false}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          toggleLang={toggleLang}
        />
        <main>
          {/* Section Hero mobile */}
          <section id="hero-mobile">
            <Hero />
          </section>
          {/* Section Projets mobile */}
          <section id="projects-mobile">
            <Projects />
          </section>
          {/* Section À propos mobile */}
          <section id="about-mobile">
            <About />
          </section>
          {/* Section Contact mobile */}
          <section id="contact-mobile">
            <Contact />
          </section>
        </main>
        {/* Footer mobile */}
        <Footer />
      </div>
    </>
  );
}

export default App;
