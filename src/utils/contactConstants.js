/**
 * Framer Motion variants
 * Centralise les variants d'animation utilisés dans la section Contact.
 * - titleVariant : animation des titres de la section
 * - slideUpVariant : animation du formulaire de contact
 * - infoVariants : animation des informations de contact (email, localisation)
 * - containerVariants : animation de conteneur avec stagger
 * - socialItemVariants : animation des icônes de réseaux sociaux
 */
export const titleVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay: 0.3 },
  },
};

export const slideUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.5 },
  },
};

export const infoVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, delay: 1 } },
};

export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.6,
    },
  },
};

export const socialItemVariants = {
  hidden: { opacity: 0, rotate: -90 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.7 },
  },
};