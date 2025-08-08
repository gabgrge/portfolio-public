import { CONTACT_INFOS, SOCIAL_LINKS } from "../data/contactData";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { FiMail, FiFileText, FiGithub, FiLinkedin, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useResponsiveViewportAmount } from "../hooks/useResponsiveViewportAmount";
import {
  titleVariant,
  slideUpVariant,
  infoVariants,
  containerVariants,
  socialItemVariants,
} from "../utils/contactConstants";
import { useTranslation } from "react-i18next";

/**
 * Section Contact
 * Affiche un formulaire de contact Netlify, les infos de contact et les réseaux sociaux.
 * - Formulaire Netlify avec champs Nom, Email, Message.
 * - Alertes de succès/erreur après envoi.
 * - Responsive et accessible.
 * - Utilise des icônes pour les champs et les réseaux sociaux.
 * - Animation d'apparition via Framer Motion.
 * - Utilise des variants centralisés.
 */
export default function ContactSection() {
  // Traduction
  const { t } = useTranslation();

  // États pour la gestion du formulaire : idle, sending, success, error
  const [status, setStatus] = useState("idle");

  // États pour afficher l'alerte de succès ou d'erreur
  const [showAlert, setShowAlert] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  // États pour les valeurs des champs du formulaire
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  
  // Ratio de viewport pour l'animation d'apparition
  const viewportAmount = useResponsiveViewportAmount(0.2, 0.5);

  // Effet pour gérer l'affichage de l'alerte après l'envoi du formulaire
  // Affiche l'alerte si le statut est success ou error et showAlert est true
  // Masque l'alerte après 4 secondes
  // Si showAlert devient false, attend la fin de l'animation avant de démonter
  useEffect(() => {
    if ((status === "success" || status === "error") && showAlert) {
      setAlertVisible(true);
      const timer = setTimeout(() => setShowAlert(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [status, showAlert]);

  // Effet pour masquer l'alerte après l'animation
  // Si showAlert est false et alertVisible est true, attend 500ms (durée de l'animation)
  // avant de masquer complètement l'alerte
  useEffect(() => {
    if (!showAlert && alertVisible) {
      const timer = setTimeout(() => setAlertVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [showAlert, alertVisible]);

  // Fonction pour gérer l'envoi du formulaire
  // Utilise l'API Fetch pour envoyer les données au backend Netlify
  // Gère les erreurs et met à jour le statut en conséquence
  // Réinitialise les champs du formulaire en cas de succès
  // Affiche l'alerte de succès ou d'erreur
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setShowAlert(false);

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });

      if (response.ok) {
        setStatus("success");
        setShowAlert(true);
        form.reset();
      } else {
        setStatus("error");
        setShowAlert(true);
      }
    } catch (err) {
      setStatus("error");
      setShowAlert(true);
    }
  };

  return (
    <section
      id="contact"
      className="
        relative min-h-screen
        px-6 py-12
        flex flex-col justify-center
        overflow-hidden
      "
    >
      {/* Arrière-plan */}
      <div className="
        absolute inset-0 z-[-1]
        bg-gradient-to-b from-purple-200 to-blue-100
        dark:from-purple-950/50 dark:to-blue-950/70
        transition-colors duration-300
        pointer-events-none
      " />

      {/* Pop-up d'alerte (success ou error) */}
      {alertVisible && (
        <div
          className={`
            fixed top-6 left-1/2 z-50 -translate-x-1/2
            px-6 py-3
            rounded-full
            shadow-md
            flex items-center gap-3
            ${
              status === "success"
                ? "bg-blue-400 dark:bg-blue-900 text-white dark:text-gray-200"
                : "bg-red-400 dark:bg-red-900 text-white dark:text-gray-200"
            }
            transition-all duration-500
            ${showAlert ? "animate-slideIn" : "animate-slideOut"}
          `}
          role="alert"
        >
          <span className="font-medium">
            {status === "success"
              ? t("contact.success")
              : t("contact.error")}
          </span>
        </div>
      )}

      {/* Conteneur principal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: viewportAmount }}
        variants={containerVariants}
        className="
          max-w-4xl w-full mx-auto
          grid grid-cols-1 md:grid-cols-5
          gap-8 md:gap-12
        "
      >
        {/* Titres & Informations de contact */}
        <div className="
          flex flex-col
          md:col-span-2
          h-full
          items-center md:items-start
          gap-8 md:gap-0
        ">
          {/* Titres */}
          <motion.div
            className="
              flex flex-col justify-center flex-1
              pb-0 mb:pb-4
              items-center md:items-start
            "
            variants={titleVariant}
          >
            <p className="
              text-xs uppercase
              tracking-[0.2em]
              text-purple-600/50 dark:text-purple-400/50
              font-semibold
              mb-2
              text-center md:text-left
              transition-colors duration-300
            ">
              {t("contact.subtitle")}
            </p>
            <h2 className="
              text-3xl md:text-5xl
              font-extrabold
              text-gray-900 dark:text-gray-100
              leading-tight
              text-center md:text-left
              transition-colors duration-300
            ">
              {t("contact.title")}
            </h2>
          </motion.div>

          {/* Infos & Réseaux sociaux */}
          <div className="
            flex flex-col justify-end
            gap-8 md:gap-12
            pb-0 mb:pb-4
            w-full
            items-center md:items-start
          ">
            {/* Localisation & Email */}
            <motion.div
              variants={infoVariants}
              className="
                flex flex-col sm:flex-row md:flex-col
                gap-3 sm:gap-8 md:gap-0
                space-y-0 md:space-y-4
                text-base w-full
                justify-center md:justify-start
              "
            >
              {CONTACT_INFOS.map((info) => (
                <div key={info.type} className="flex items-center justify-center md:justify-start">
                  <a
                    href={info.href.startsWith("contact.") ? t(info.href) : info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center gap-3 group
                      transition
                    "
                    aria-label={t(info.aria)}
                  >
                    {info.icon === "FaMapMarkerAlt" && (
                      <FaMapMarkerAlt className="
                        text-gray-700/70 dark:text-gray-200/80
                        group-hover:text-purple-600/50 dark:group-hover:text-purple-400
                        transition duration-300
                      " size={18} />
                    )}
                    {info.icon === "FaEnvelope" && (
                      <FaEnvelope className="
                        text-gray-700/70 dark:text-gray-200/80
                        group-hover:text-purple-600/50 dark:group-hover:text-purple-400
                        transition duration-300
                      " size={18} />
                    )}
                    <span className="
                      text-gray-700/70 dark:text-gray-200/80
                      font-medium
                      group-hover:text-purple-600/50 dark:group-hover:text-purple-400
                      transition duration-300
                    ">
                      {info.label.startsWith("contact.") ? t(info.label) : info.label}
                    </span>
                  </a>
                </div>
              ))}
            </motion.div>
            {/* Réseaux sociaux */}
            <motion.div
              variants={containerVariants}
              className="
                flex items-center justify-center md:justify-start
                gap-5
              "
            >
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href.startsWith("contact.") ? t(item.href) : item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(item.label)}
                  className="
                    text-gray-700/70 dark:text-gray-200/80
                    hover:text-purple-600/50 dark:hover:text-purple-400
                    hover:scale-110
                    transition duration-300
                  "
                >
                  <motion.span variants={socialItemVariants} className="inline-block">
                    {item.icon === "FiFileText" && <FiFileText size={22} />}
                    {item.icon === "FiGithub" && <FiGithub size={22} />}
                    {item.icon === "FiLinkedin" && <FiLinkedin size={22} />}
                  </motion.span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Formulaire Netlify */}
        <motion.form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          variants={slideUpVariant}
          className="
            w-full md:col-span-3
            flex flex-col justify-center
          "
        >
          <div className="
            w-full
            rounded-2xl
            bg-white/10 dark:bg-purple-950/10
            border-2 border-white/10 dark:border-purple-400/10
            shadow-[0_8px_32px_0_rgba(0,0,0,0.10)] dark:shadow-[0_8px_32px_0_rgba(88,51,160,0.15)]
            backdrop-blur-[35px]
            px-8 py-12
            space-y-12
            transition duration-300
          ">
            {/* Champs cachés Netlify */}
            <input type="hidden" name="form-name" value="contact-form" />
            <input type="hidden" name="bot-field" />

            <div className="space-y-6">
              {/* Champ Nom */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="
                    block
                    mb-2
                    text-sm font-medium
                    text-gray-800 dark:text-gray-200
                    transition-colors duration-300
                  "
                >
                  {t("contact.name")}
                </label>
                <div className="relative">
                  <FiUser
                    className={`
                      absolute left-4 top-1/2 -translate-y-1/2
                      text-lg
                      pointer-events-none
                      transition-colors duration-200
                      ${
                        nameValue
                          ? "text-gray-800 dark:text-purple-200/90"
                          : "text-gray-400/70 dark:text-purple-400/25"
                      }
                    `}
                  />
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder={t("contact.namePlaceholder")}
                    required
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    className="
                      w-full
                      rounded-full
                      pl-10 pr-4 py-2.5
                      border-2 border-white/15 dark:border-purple-400/10
                      bg-white/15 dark:bg-purple-950/15
                      focus:outline-none focus:ring-2 focus:ring-purple-500/30
                      text-gray-800 dark:text-purple-200/90
                      placeholder:text-gray-400/70 dark:placeholder:text-purple-400/25
                      transition duration-200
                    "
                  />
                </div>
              </div>

              {/* Champ Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="
                    block
                    mb-2
                    text-sm font-medium
                    text-gray-800 dark:text-gray-200
                    transition-colors duration-300
                  "
                >
                  {t("contact.email")}
                </label>
                <div className="relative">
                  <FiMail
                    className={`
                      absolute left-4 top-1/2 -translate-y-1/2
                      text-lg
                      pointer-events-none
                      transition-colors duration-200
                      ${
                        emailValue
                          ? "text-gray-800 dark:text-purple-200/90"
                          : "text-gray-400/70 dark:text-purple-400/25"
                      }
                    `}
                  />
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t("contact.emailPlaceholder")}
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="
                      w-full
                      rounded-full
                      pl-10 pr-4 py-2.5
                      border-2 border-white/15 dark:border-purple-400/10
                      bg-white/15 dark:bg-purple-950/15
                      focus:outline-none focus:ring-2 focus:ring-purple-500/30
                      text-gray-800 dark:text-purple-200/90
                      placeholder:text-gray-400/70 dark:placeholder:text-purple-400/25
                      transition duration-200
                    "
                  />
                </div>
              </div>

              {/* Champ Message */}
              <div>
                <label
                  htmlFor="message"
                  className="
                    block
                    mb-2
                    text-sm font-medium
                    text-gray-800 dark:text-gray-200
                    transition-colors duration-300
                  "
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder={t("contact.messagePlaceholder")}
                  required
                  className="
                    w-full
                    rounded-3xl
                    px-4 py-3
                    border-2 border-white/15 dark:border-purple-400/10
                    bg-white/15 dark:bg-purple-950/15
                    focus:outline-none focus:ring-2 focus:ring-purple-500/30
                    text-gray-800 dark:text-purple-200/90
                    placeholder:text-gray-400/70 dark:placeholder:text-purple-400/25
                    transition duration-200
                    resize-none
                  "
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="
                w-full
                rounded-full
                px-4 py-3
                bg-purple-600/30 hover:bg-purple-600/40
                text-white dark:text-purple-100/90
                font-semibold
                shadow-lg
                transition duration-300
                disabled:opacity-60 disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              {t("contact.send")} <FaPaperPlane className="inline ml-2" size={18} />
            </button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}
