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
    var changeOptionsTimer = $('#periodic-timer_change-options');
    changeOptionsTimer.syotimer({
        periodic: true,
        periodInterval: 10,
        periodUnit: 'd'
    });
    $('#change_options__effect-type').click(function() {
        var button = $(this),
            effectTypes = ['opacity', 'none'],
            effectIndex = parseInt( button.data('index') ),
            nextEffectIndex = ( effectIndex === (effectTypes.length - 1) )
                ? 0
                : (effectIndex + 1);
        button.data('index', nextEffectIndex);
        changeOptionsTimer.syotimer(
            'setOption',
            'effectType',
            effectTypes[nextEffectIndex]
        );
    });
    $('#change_options__double-numbers').click(function() {
        var button = $(this),
            index = parseInt( button.data('index') ),
            nextIndex = Math.abs(index - 1);
        button.data('index', nextIndex);
        changeOptionsTimer.syotimer(
            'setOption',
            'doubleNumbers',
            nextIndex === 1
        );
    });
    $('#change_options__lang').click(function() {
        var button = $(this),
            languages = ['eng', 'rus'],
            langIndex = parseInt( button.data('index') ),
            nextLangIndex = ( langIndex === (languages.length - 1) )
                ? 0
                : (langIndex + 1);
        button.data('index', nextLangIndex);
        changeOptionsTimer.syotimer(
            'setOption',
            'lang',
            languages[nextLangIndex]
        );
    });

    /* Periodic Timer.
       Add localization */
    $.syotimerLang.neng = {
        second: ['secondone', 'secondfive', 'seconds'],
        minute: ['minuteone', 'minutefive', 'minutes'],
        hour: ['hourone', 'hourfive', 'hours'],
        day: ['dayone', 'dayfive', 'days'],
        handler: 'nengNumeral'
    };
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
        periodUnit: 'm'
    });
});
