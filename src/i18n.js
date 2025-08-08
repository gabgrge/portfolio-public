import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Traductions pour les langues FR (français) et EN (anglais)
const resources = {
  fr: {
    translation: {
      header: {
        portfolio: "Portfolio",
        nav: {
          projects: "Projets",
          about: "À propos",
          contact: "Contact",
        },
      },
      hero: {
        line1: "Bonjour !",
        line2: "Moi c'est Gabriel,",
        line3: "Ingénieur en Data Science.",
        line4: "J'allie rigueur d'ingénieur et passion pour la donnée pour développer des solutions intelligentes au service des métiers.",
        cv: "CV",
        github: "GitHub",
        linkedin: "LinkedIn",
        email: "Email",
      },
      projects: {
        title: "Mes Projets",
        more: "En savoir plus",
      },
      about: {
        skills: {
          title: "Compétences",
        },
        timeline: {
          title: "Parcours",
          seeCertification: "Voir la certification",
        },
        goals: {
          title: "Construire avec sens",
        },
      },
      contact: {
        subtitle: "Contactez-moi",
        title: "Discutons de vos projets",
        name: "Nom",
        namePlaceholder: "Entrez votre nom",
        email: "Email",
        emailPlaceholder: "Entrez votre adresse email",
        message: "Message",
        messagePlaceholder: "Écrivez votre message ici",
        send: "Envoyer",
        success: "Merci pour votre message !",
        error: "Une erreur est survenue. Veuillez réessayer.",
        cv: "Télécharger le CV",
        hrefCv: "/CV-Gabriel-George.pdf",
        github: "GitHub",
        linkedin: "LinkedIn",
        location: "Rueil-Malmaison, France",
        hrefLocation: "https://www.google.com/maps/search/?api=1&query=Rueil-Malmaison,+France",
        ariaLocation: "Voir sur la carte",
        ariaMail: "Envoyer un mail",
      },
      footer: {
        madeWith: "Fait avec",
        portfolio: "Portfolio personnel.",
        and: "et",
      },
    },
  },
  en: {
    translation: {
      header: {
        portfolio: "Portfolio",
        nav: {
          projects: "Projects",
          about: "About",
          contact: "Contact",
        },
      },
      hero: {
        line1: "Hello there!",
        line2: "I'm Gabriel,",
        line3: "Data Science Engineer.",
        line4: "I combine the rigor of an engineer with a passion for data to develop smart solutions for business needs.",
        cv: "CV",
        github: "GitHub",
        linkedin: "LinkedIn",
        email: "Email",
      },
      projects: {
        title: "My Projects",
        more: "Learn more",
      },
      about: {
        skills: {
          title: "Skills",
        },
        timeline: {
          title: "Timeline",
          seeCertification: "See certification",
        },
        goals: {
          title: "Building with purpose",
        },
      },
      contact: {
        subtitle: "Contact me",
        title: "Let's discuss your projects",
        name: "Name",
        namePlaceholder: "Enter your name",
        email: "Email",
        emailPlaceholder: "Enter your email address",
        message: "Message",
        messagePlaceholder: "Write your message here",
        send: "Send",
        success: "Thank you for your message!",
        error: "An error occurred. Please try again.",
        cv: "Download CV",
        hrefCv: "/CV-Gabriel-George-EN.pdf",
        github: "GitHub",
        linkedin: "LinkedIn",
        location: "Paris, France",
        hrefLocation: "https://www.google.com/maps/search/?api=1&query=Paris,+France",
        ariaLocation: "View on map",
        ariaMail: "Send an email",
      },
      footer: {
        madeWith: "Made with",
        portfolio: "Personal portfolio.",
        and: "and",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    lowerCaseLng: true,
  });

export default i18n;
