import $ from "jquery";

/**
 * Universal function for get correct inducement of nouns after a numeral (`number`)
 * @param number
 * @param words
 * @returns {string}
 */
function universal(number, words) {
  var index = number === 1 ? 0 : 1;
  return words[index];
}

$.syotimerLang = {
  rus: {
    second: ["секунда", "секунды", "секунд"],
    minute: ["минута", "минуты", "минут"],
    hour: ["час", "часа", "часов"],
    day: ["день", "дня", "дней"],
    handler: function rusNumeral(number, words) {
      var cases = [2, 0, 1, 1, 1, 2],
        index;
      if (number % 100 > 4 && number % 100 < 20) {
        index = 2;
      } else {
        index = cases[number % 10 < 5 ? number % 10 : 5];
      }
      return words[index];
    },
  },
  eng: {
    second: ["second", "seconds"],
    minute: ["minute", "minutes"],
    hour: ["hour", "hours"],
    day: ["day", "days"],
  },
  por: {
    second: ["segundo", "segundos"],
    minute: ["minuto", "minutos"],
    hour: ["hora", "horas"],
    day: ["dia", "dias"],
  },
  spa: {
    second: ["segundo", "segundos"],
    minute: ["minuto", "minutos"],
    hour: ["hora", "horas"],
    day: ["día", "días"],
  },
  heb: {
    second: ["שניה", "שניות"],
    minute: ["דקה", "דקות"],
    hour: ["שעה", "שעות"],
    day: ["יום", "ימים"],
  },

  /**
   * Getting the correct declension of words after numerals
   * @param number
   * @param lang
   * @param unit
   * @returns {string}
   */
  getNumeral: function (number, lang, unit) {
    var handler = $.syotimerLang[lang].handler || universal;
    var words = $.syotimerLang[lang][unit];
    return handler(number, words);
  },
};
