import $ from 'jquery';

$.syotimerLang = {
  rus: {
    second: ['секунда', 'секунды', 'секунд'],
    minute: ['минута', 'минуты', 'минут'],
    hour: ['час', 'часа', 'часов'],
    day: ['день', 'дня', 'дней'],
    handler: function rusNumeral(number, words) {
      const cases = [2, 0, 1, 1, 1, 2];
      if (number % 100 > 4 && number % 100 < 20) {
        return words[2];
      }
      const index = cases[number % 10 < 5 ? number % 10 : 5];
      return words[index];
    },
  },
  eng: {
    second: ['second', 'seconds'],
    minute: ['minute', 'minutes'],
    hour: ['hour', 'hours'],
    day: ['day', 'days'],
  },
  por: {
    second: ['segundo', 'segundos'],
    minute: ['minuto', 'minutos'],
    hour: ['hora', 'horas'],
    day: ['dia', 'dias'],
  },
  spa: {
    second: ['segundo', 'segundos'],
    minute: ['minuto', 'minutos'],
    hour: ['hora', 'horas'],
    day: ['día', 'días'],
  },
  heb: {
    second: ['שניה', 'שניות'],
    minute: ['דקה', 'דקות'],
    hour: ['שעה', 'שעות'],
    day: ['יום', 'ימים'],
  },
};
