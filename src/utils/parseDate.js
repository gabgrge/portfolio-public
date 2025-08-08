/**
 * parseDate
 * Analyse une chaîne de date en français ou anglais et retourne un objet Date JavaScript.
 * Gère les formats suivants :
 *   - "mars 2025 - aujourd'hui"
 *   - "2019 - 2024"
 *   - "janv. 2024"
 *   - "2022"
 *
 * @param {string} str - Chaîne de date à analyser.
 * @returns {Date} L'objet Date correspondant, ou le 1er janvier 1970 si l'analyse échoue.
 */
export function parseDate(str) {
  // Abréviations françaises et anglaises des mois, mappées sur les indices JS (0 = janvier)
  const months = {
    // Français
    janv: 0, jan: 0,
    févr: 1, feb: 1,
    mars: 2, mar: 2,
    avr: 3, apr: 3,
    mai: 4, may: 4,
    juin: 5, jun: 5,
    juil: 6, jul: 6,
    août: 7, aug: 7,
    sept: 8, sep: 8,
    oct: 9,
    nov: 10,
    déc: 11, dec: 11,
  };

  if (!str || typeof str !== "string") return new Date(0);

  // Tente de détecter "mois année" (ex : "mars 2025", "janv. 2024", "mar 2025", "feb 2024")
  const match = str.match(/([a-zéû.]+)\s?(\d{4})/i);
  if (match) {
    // Retire le point éventuel (ex : "janv.")
    const monthKey = match[1].replace(".", "").toLowerCase();
    const month = months[monthKey] ?? 0;
    return new Date(Number(match[2]), month);
  }

  // Tente de détecter uniquement l'année (ex : "2022")
  const yearMatch = str.match(/(\d{4})/);
  if (yearMatch) {
    return new Date(Number(yearMatch[1]), 0);
  }

  // Par défaut : retourne le 1er janvier 1970 (date invalide)
  return new Date(0);
}
