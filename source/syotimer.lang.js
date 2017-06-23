    $.syotimerLang = {
        rus: {
            second: ['секунда', 'секунды', 'секунд'],
            minute: ['минута', 'минуты', 'минут'],
            hour: ['час', 'часа', 'часов'],
            day: ['день', 'дня', 'дней'],
            handler: 'rusNumeral'
        },
        eng: {
            second: ['second', 'seconds'],
            minute: ['minute', 'minutes'],
            hour: ['hour', 'hours'],
            day: ['day', 'days']
        },
        por: {
            second: ['segundo', 'segundos'],
            minute: ['minuto', 'minutos'],
            hour: ['hora', 'horas'],
            day: ['dia', 'dias']
        },
        spa: {
            second: ['segundo', 'segundos'],
            minute: ['minuto', 'minutos'],
            hour: ['hora', 'horas'],
            day: ['día', 'días']
        },
        heb: {
            second: ['שניה', 'שניות'],
            minute: ['דקה', 'דקות'],
            hour: ['שעה', 'שעות'],
            day: ['יום', 'ימים']
        },

        /**
         * Universal function for get correct inducement of nouns after a numeral (`number`)
         * @param number
         * @returns {number}
         */
        universal: function(number) {
            return ( number === 1 ) ? 0 : 1;
        },

        /**
         * Get correct inducement of nouns after a numeral for Russian language (rus)
         * @param number
         * @returns {number}
         */
        rusNumeral: function(number) {
            var cases = [2, 0, 1, 1, 1, 2],
                index;
            if ( number % 100 > 4 && number % 100 < 20 ) {
                index = 2;
            } else {
                index = cases[(number % 10 < 5) ? number % 10 : 5];
            }
            return index;
        },

        /**
         * Getting the correct declension of words after numerals
         * @param number
         * @param lang
         * @param unit
         * @returns {string}
         */
        getNumeral: function(number, lang, unit) {
            var handlerName = $.syotimerLang[lang].handler || 'universal',
                index = this[handlerName](number);
            return $.syotimerLang[lang][unit][index];
        }
    };
