import { FaHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";

/**
 * Footer
 * Composant pied de page du portfolio.
 */
export default function Footer() {
  // Traduction
  const { t } = useTranslation();

  return (
    <footer
      className="
        w-full
        py-6
        text-center text-sm
        text-muted-foreground
        bg-blue-100 dark:bg-blue-950/70
        transition-colors duration-300
      "
    >
      <p
        className="
          text-gray-900 dark:text-gray-200
          transition-colors duration-300
        "
      >
        &copy; {new Date().getFullYear()} Gabriel George —{" "}
        {t("footer.portfolio")}{" "}
        {t("footer.madeWith")}{" "}
        <FaHeart
          className="
            inline
            mx-0.5
            text-purple-500 dark:text-purple-400
            transition-colors duration-300
          "
          aria-label="love"
        />{" "}
        {t("footer.and")} React.
      </p>
    </footer>
  );
}
