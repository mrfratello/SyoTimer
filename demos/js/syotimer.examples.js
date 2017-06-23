jQuery(function($){
    /* Simple Timer. The countdown to 20:30 2100.05.09 */
    $('#simple-timer').syotimer({
        year: 2020,
        month: 5,
        day: 9,
        hour: 20,
        minute: 30
    });


    /* Timer with Head and Foot. Countdown is over */
    $('#expired-timer').syotimer({
        year: 1990,
        headTitle: '<h3>Timer with header and footer. Countdown is over</h3>',
        footTitle: '<i style="color: brown;">Footer of timer.</i>'
    });


    /* Callback after the end of the countdown timer */
    $('#expired-timer_event').syotimer({
        year: 2000,
        month: 12,
        day: 31,
        hour: 0,
        minute: 0,

        headTitle: '<h3>Timer with header and footer. Countdown is over</h3>',
        footTitle: '<i style="color: brown;">Footer of timer.</i>',
        afterDeadline: function(syotimer){
            syotimer.bodyBlock
                .html(
                    '<p>The countdown is finished 00:00 2000.12.31</p>'
                );
            syotimer.headBlock
                .html(
                    '<h3>Callback after the end of the countdown timer</h3>'
                );
            syotimer.footBlock
                .html(
                    '<em style="color:brown;">' +
                        'Footer of timer after countdown is finished' +
                    '</em>'
                );
        }
    });


    /* Periodic Timer. Period is equal 3 minutes. Effect of fading in */
    $('#periodic-timer_period_minutes').syotimer({
        year: 2015,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        layout: 'hms',
        headTitle:
            '<h3>' +
                'Periodic Timer. ' +
                'The countdown begins first through each 3 minutes. ' +
                'Effect of fading in' +
            '</h3>',
        doubleNumbers: false,
        effectType: 'opacity',

        periodUnit: 'm',
        periodic: true,
        periodInterval: 3
    });


    /* Periodic Timer. Period is equal 10 days */
    $('#periodic-timer_period_days').syotimer({
        year: 2015,
        month: 1,
        day: 1,
        hour: 20,
        minute: 0,
        layout: 'hms',
        headTitle: '<h3>' +
                'Periodic Timer. ' +
                'The countdown begins first through each 10 days' +
            '</h3>' +
            '<p style="font-size:.8em;color:#666;">' +
                'The date equal 20:00 2015.01.01' +
            '</p>',
        periodic: true,
        periodInterval: 10,
        periodUnit: 'd'
    });


    /* Demonstrate layout. Period is equal 2 hours. Display only seconds */
    $('#layout-timer_only-seconds').syotimer({
        hour: 0,
        minute: 0,
        second: 0,
        layout: 's',

        headTitle: '<h3>Display only seconds</h3>' +
            '<p>Demonstrate layout. Period is equal 2 hours.</p>',

        periodic: true,
        periodInterval: 2,
        periodUnit: 'h'
    });


    /* Demonstrate layout. Period is equal 2 days and 5 hours.
       Units of countdown in reverse order */
    $('#layout-timer_reversed-units').syotimer({
        hour: 0,
        minute: 0,
        second: 0,
        layout: 'smhd',

        headTitle: '<h3>Units of countdown in reverse order</h3>' +
            '<p>Demonstrate layout. ' +
            'Period is equal 2 days and 5 hours.</p>',
        effectType: 'opacity',

        periodic: true,
        periodInterval: 53,
        periodUnit: 'h'
    });


    /* Demonstrate layout. Period is equal 2 days and 5 hours.
       Display only days and minutes in reverse order */
    $('#layout-timer_mixed-units').syotimer({
        hour: 0,
        minute: 0,
        second: 0,
        layout: 'md',
        headTitle: '<h3>Display only days and minutes in reverse order</h3>' +
            '<p>Demonstrate layout. ' +
            'Period is equal 1 days, 5 hours and 37 minutes.</p>',
        periodic: true,
        periodInterval: 1777,
        periodUnit: 'm'
    });


    /* Periodic Timer. Countdown timer with given time zone */
    $('#periodic-timer_timezone_given').syotimer({
        year: 2000,
        month: 7,
        day: 1,
        hour: 18,
        minute: 0,
        timeZone: 2,
        ignoreTransferTime: true,
        layout: 'hms',
        headTitle: '<h3>Countdown timer with given timezone</h3>' +
            '<p>The deadline is 18:00:00 by the time Rome, Italy (UTC+2)</p>',
        periodic: true,
        periodInterval: 1,
        periodUnit: 'd'
    });


    /* Periodic Timer.
       Change options: doubleNumbers, effect type, language */
    var EFFECT_TYPES = ['opacity', 'none'],
        LANGUAGES = ['eng', 'rus', 'heb'],
        changeOptionsTimer = $('#periodic-timer_change-options'),
        changeOptionsEffectType = $('#change_options__effect-type'),
        changeOptionsDoubleNumbers = $('#change_options__double-numbers'),
        changeOptionsLang = $('#change_options__lang');

    changeOptionsTimer.syotimer({
        periodic: true,
        periodInterval: 10,
        periodUnit: 'd',
        headTitle: '<div>Effect type: ' +
                '<span class="option option_type_effect-type">none</span>' +
            '</div>' +
            '<div>Use double numbers: ' +
                '<span class="option option_type_double-numbers">true</span>' +
            '</div>' +
            '<div>Language: ' +
                '<span class="option option_type_language">eng</span>' +
            '</div>'
    });

    /**
     * Getting a next of current index of array by circle
     * @param array
     * @param currentIndex
     * @returns {*}
     */
    function getNextIndex(array, currentIndex) {
        return ( currentIndex === (array.length - 1) )
            ? 0
            : (currentIndex + 1);
    }

    /**
     * Update values in header title of timer `#periodic-timer_change-options`
     */
    function updateOptionTitles() {
        var effectIndex = parseInt(changeOptionsEffectType.data('index')),
            doubleNumberIndex = parseInt(changeOptionsDoubleNumbers.data('index')),
            languageIndex = parseInt(changeOptionsLang.data('index')),
            blocks = changeOptionsTimer.data('syotimer-blocks');
        blocks.headBlock.find('.option_type_effect-type')
            .html(EFFECT_TYPES[effectIndex]);
        blocks.headBlock.find('.option_type_double-numbers')
            .html((doubleNumberIndex) ? 'true' : 'false');
        blocks.headBlock.find('.option_type_language')
            .html(LANGUAGES[languageIndex]);
    }

    changeOptionsEffectType.click(function() {
        var button = $(this),
            effectIndex = parseInt( button.data('index') ),
            nextEffectIndex = getNextIndex(EFFECT_TYPES, effectIndex);
        button.data('index', nextEffectIndex);
        changeOptionsTimer.syotimer(
            'setOption',
            'effectType',
            EFFECT_TYPES[nextEffectIndex]
        );
        updateOptionTitles();
    });
    changeOptionsDoubleNumbers.click(function() {
        var button = $(this),
            index = parseInt( button.data('index') ),
            useDoubleNumbers = Math.abs(index - 1);
        button.data('index', useDoubleNumbers);
        changeOptionsTimer.syotimer(
            'setOption',
            'doubleNumbers',
            useDoubleNumbers === 1
        );
        updateOptionTitles();
    });
    changeOptionsLang.click(function() {
        var button = $(this),
            langIndex = parseInt( button.data('index') ),
            nextLangIndex = getNextIndex(LANGUAGES, langIndex);
        button.data('index', nextLangIndex);
        changeOptionsTimer.syotimer(
            'setOption',
            'lang',
            LANGUAGES[nextLangIndex]
        );
        updateOptionTitles();
    });


/* Localization in timer.
   Add new language */

// Adding of a words for signatures of countdown
$.syotimerLang.neng = {
    second: ['secondone', 'secondfive', 'seconds'],
    minute: ['minuteone', 'minutefive', 'minutes'],
    hour: ['hourone', 'hourfive', 'hours'],
    day: ['dayone', 'dayfive', 'days'],
    handler: 'nengNumeral'
};

// Adding of the handler that selects an index from the list of words
// based on ahead the going number
$.syotimerLang.nengNumeral = function(number) {
    var lastDigit = number % 10;
    if ( lastDigit === 1 ) {
        return 0;
    } else if ( lastDigit === 5) {
        return 1;
    } else {
        return 2;
    }
};

$('#periodic-timer_localization_new-english').syotimer({
    lang: 'neng',
    layout: 'ms',
    periodic: true,
    periodInterval: 6,
    periodUnit: 'm',
    headTitle: '<h3>Adding new language</h3>' +
        '<p>Demonstrate adding the new language of signatures.</p>'
});
});
