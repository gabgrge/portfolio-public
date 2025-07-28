/**
 * Framer Motion variants
 * Centralise les variants d'animation utilisés dans les sous-sections About.
 * - fadeVariants : apparition générale (fade + slide)
 * - titleVariants : animation des titres
 * - borderVariants : animation des bordures sous les titres
 * - containerVariants : animation de conteneur avec stagger
 * - itemVariants : animation des items enfants
 * - quoteVariant : animation de l'icône de citation d'introduction
 * - textVariant : animation du texte d'introduction
 * - photoVariant : animation de la photo d'introduction
 */
export const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut", delay: 0.15 },
  },
};

export const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
  },
};

export const borderVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
  },
};

export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};

export const quoteVariant = {
  hidden: { opacity: 0, rotate: 90 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.5, delay: 0.15, ease: "easeInOut" },
  },
};

export const textVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay: 0.5, ease: "easeInOut" },
  },
};

export const photoVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay: 0.8, ease: "easeInOut" },
  },
};

/**
 * skillsColors
 * Couleurs des bordures et textes pour chaque catégorie de compétences.
 * Utilisé pour styliser les tags de skills.
 */
export const skillsColors = {
  dataEngineering: "border-blue-700 text-blue-700",
  dataScience: "border-purple-700 text-purple-700",
  cloudDevOps: "border-cyan-700 text-cyan-700",
  biDataViz: "border-yellow-700 text-yellow-700",
  development: "border-green-700 text-green-700",
  projectManagement: "border-pink-700 text-pink-700",
};

/**
 * timelineColors
 * Couleurs dynamiques pour la timeline (expérience, formation, certification).
 * Utilisé dans AboutTimeline pour styliser les lignes, icônes et ombres selon le type d'entrée.
 */
export const timelineColors = {
  exp: {
    line: "group-hover:from-blue-400",
    iconSpan: "group-hover:bg-blue-500",
    icon: "text-blue-600 group-hover:text-white",
    shadow: "group-hover:shadow-blue-300/50",
  },
  edu: {
    line: "group-hover:from-green-400",
    iconSpan: "group-hover:bg-green-500",
    icon: "text-green-600 group-hover:text-white",
    shadow: "group-hover:shadow-green-300/50",
  },
  cert: {
    line: "group-hover:from-yellow-400",
    iconSpan: "group-hover:bg-yellow-500",
    icon: "text-yellow-600 group-hover:text-white",
    shadow: "group-hover:shadow-yellow-300/50",
  },
};
