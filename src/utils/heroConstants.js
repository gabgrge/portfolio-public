/**
 * Classes utilitaires pour les boutons de la section Hero.
 * Centralise les styles Tailwind utilisés pour les boutons animés.
 * - buttonBase : styles de base pour le bouton (taille, couleur, animation, etc.)
 * - iconBase : styles pour l'icône à gauche du bouton
 * - textBase : styles pour le texte qui apparaît lors du hover
 *
 * Utilisé dans Hero.jsx pour les boutons CV, GitHub, LinkedIn, Email.
 */
export const buttonBase = `
  group
  relative
  flex items-center justify-center
  overflow-hidden
  w-12 hover:w-40 h-12
  border-2 border-blue-600 dark:border-blue-400
  text-blue-600 dark:text-blue-400
  bg-transparent
  rounded-full
  transition-all duration-300 ease-in-out
`;

export const iconBase = `
  text-xl
  flex-shrink-0
`;

export const textBase = `
  overflow-hidden
  max-w-0 group-hover:max-w-xs
  opacity-0 group-hover:opacity-100
  ml-0 group-hover:ml-3
  whitespace-nowrap font-medium
  pointer-events-none
  transition-all duration-150 ease-in-out
`;
