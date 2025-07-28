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
    <footer className="w-full text-center py-6 text-sm text-muted-foreground bg-blue-100">
      <p>
        &copy; {new Date().getFullYear()} Gabriel George —{" "}
        {t("footer.portfolio")}{" "}
        {t("footer.madeWith")}{" "}
        <FaHeart className="inline text-purple-500 mx-0.5" aria-label="love" />{" "}
        {t("footer.and")} React.
      </p>
    </footer>
  );
}
