/**
 * SyoTimer - countdown jquery plugin
 * @version: 1.1.0 
 * @author: John Syomochkin 
 * @homepage: https://github.com/mrfratello/SyoTimer#readme 
 * @date: 2016.7.18
 * @license under MIT license
 */
(function($){
    const DAY_MS = 24 * 60 * 60;
    const HOUR_MS = 60 * 60;
    const MINUTE_MS = 60;

    var lang = {
        rus: {
            second: ['секунда', 'секунды', 'секунд'],
            minute: ['минута', 'минуты', 'минут'],
            hour: ['час', 'часа', 'часов'],
            day: ['день', 'дня', 'дней']
        },
        eng: {
            second: ['second', 'seconds'],
            minute: ['minute', 'minutes'],
            hour: ['hour', 'hours'],
            day: ['day', 'days']
        }
    };
    $.fn.syotimer = function(options){
        // установки по умолчанию
        var defaultTimer = {
            year: 2014,
            month: 7,
            day: 31,
            hour: 0,
            minute: 0,
            second: 0,

            periodic: false, // true - таймер периодичный
            periodInterval: 7, // (если periodic установлен как true) период таймера. Единица измерения указывается в periodType
            periodUnit: 'd', // единица измерения периода таймера

            dayVisible: true, // показывать ли количество дней, если нет, то количество часов может превышать 23
            dubleNumbers: true, // показывать часы, минуты и секунды с ведущими нолями ( 2часа 5минут 4секунды = 02:05:04)
            effectType: 'none', // эффект отсчета таймера: 'none' - нет эффекта, 'opacity' - выцветание
            lang: 'eng',

            headTitle: '', // текст над таймером (можно в HTML формате)
            footTitle: '', // текст под таймером (можно в HTML формате)
            afterDeadline: function(timerBlock){
                timerBlock.bodyBlock.html('<p style="font-size: 1.2em;">The countdown is finished!</p>');
            }
        };
        // инициалиация параметров пользователя
        var settings = $.extend(defaultTimer, options || {});

        // инициализация прочих переменных
        var el = this;

        return el.each(function(){
            // инициализация плагина
            var obj = $(this);
            obj = init( obj, settings );

            (function timeout(){
                $('.second .tab-val', obj).css( 'opacity', 1 );
                var currentDate = new Date(),
                    deadLineDate = new Date(
                        settings.year,
                        settings.month - 1,
                        settings.day,
                        settings.hour,
                        settings.minute,
                        settings.second
                    );

                var alls = getSecondsCountToDeadLine(currentDate, deadLineDate, settings);

                // количество секунд до дедлайна (alls) при наличии
                if ( alls >= 0 ){
                    dd = Math.floor(alls/DAY_MS);

                    alls = alls%DAY_MS;
                    dh = Math.floor(alls/HOUR_MS);

                    alls = alls%HOUR_MS;
                    dm = Math.floor(alls/MINUTE_MS);

                    alls = alls%MINUTE_MS;
                    ds = Math.floor(alls);

                    if ( settings.dayVisible ){
                        $('.day .tab-val',obj).html(dd);
                        $('.day .tab-metr',obj).html(definitionOfNumerals(dd, lang[settings.lang].day, settings.lang));

                        $('.hour .tab-val',obj).html(format2(dh, settings.dubleNumbers));
                        $('.hour .tab-metr',obj).html(definitionOfNumerals(dh, lang[settings.lang].hour, settings.lang));
                    } else {
                        dh += dd * 24;
                        $('.hour .tab-val',obj).html(format2(dh, settings.dubleNumbers));
                        $('.hour .tab-metr',obj).html(definitionOfNumerals(dh, lang[settings.lang].hour, settings.lang));
                    }

                    $('.minute .tab-val',obj).html(format2(dm, settings.dubleNumbers));
                    $('.minute .tab-metr',obj).html(definitionOfNumerals(dm, lang[settings.lang].minute, settings.lang));

                    $('.second .tab-val',obj).html(format2(ds, settings.dubleNumbers));
                    $('.second .tab-metr',obj).html(definitionOfNumerals(ds, lang[settings.lang].second, settings.lang));

                    switch ( settings.effectType ){
                        case 'none':
                            setTimeout( function(){
                                timeout();
                            },1000);
                            break;
                        case 'opacity':
                            $('.second .tab-val',obj).animate({opacity: 0.1 }, 1000, 'linear', timeout);
                            break;
                    }
                } else {
                    settings.afterDeadline(obj);
                }
            })();
        });
    };

    /**
     *
     * @param currentDate
     * @param deadLineDate
     * @param settings
     * @returns {*}
     */
    function getSecondsCountToDeadLine(currentDate, deadLineDate, settings) {
        var alls,
            differenceInSeconds = (deadLineDate.getTime() - currentDate.getTime()) / 1000;
        differenceInSeconds = Math.floor( differenceInSeconds );
        if ( settings.periodic ) { // если надо отсчитывать таймер по периоду
            var periodUnitInMilliSec = getPeriodUnit(settings.periodUnit),
                fullTimeUnitsBetween = (deadLineDate.getTime() - currentDate.getTime()) / (periodUnitInMilliSec * 1000);
            fullTimeUnitsBetween = Math.ceil( fullTimeUnitsBetween );
            fullTimeUnitsBetween = Math.abs( fullTimeUnitsBetween );
            if ( differenceInSeconds >= 0 ) {
                dUnits = fullTimeUnitsBetween%settings.periodInterval;
                dUnits = (dUnits==0)? settings.periodInterval-1 : dUnits-1;
            } else {
                dUnits = settings.periodInterval - fullTimeUnitsBetween % settings.periodInterval;
            }
            addUnits = differenceInSeconds % periodUnitInMilliSec;

            // fix когда дедлайн раньше текущей даты, возникает баг с неправильным расчетом интервала при different пропорциональной periodUnit
            if ( ( addUnits == 0 ) && ( differenceInSeconds < 0 ) )
                dUnits--;

            alls = Math.abs( dUnits * periodUnitInMilliSec + addUnits );

        } else
            alls = differenceInSeconds;
        return alls;
    }

    /**
     * Determine a unit of period in milliseconds
     * @returns {number}
     */
    function getPeriodUnit(given_period_unit) {
        switch (given_period_unit) {
            case 'd': return DAY_MS;
            case 'h': return HOUR_MS;
            case 'm': return MINUTE_MS;
            case 's': return 1;
        }
    }

    /**
     *
     * @param elem
     * @param options
     * @returns {*|Object|void}
     */
    function init( elem, options ) { // установка html разметки в блоке с таймером
        var timerDom,
            dayCellDom = ( options.dayVisible) ? getCellDom('day', '0') : '';
        timerDom = '' +
            '<div class="timer-head-block">' + options.headTitle + '</div>' +
                '<div class="timer-body-block">' +
                    dayCellDom +
                    getCellDom('hour') +
                    getCellDom('minute') +
                    getCellDom('second') +
                '</div>' +
            '<div class="timer-foot-block">' + options.footTitle + '</div>';
        elem.addClass('timer').html( timerDom );
        var headBlock = $('.timer-head-block', elem),
            bodyBlock = $('.timer-body-block', elem),
            footBlock = $('.timer-foot-block', elem),
            timerBlocks = {
                headBlock: headBlock,
                bodyBlock: bodyBlock,
                footBlock: footBlock
            };
        return $.extend(elem, timerBlocks);
    }

    /**
     * Return once cell DOM of countdown: day, hour, minute, second
     * @param cls                 class of cell
     * @param start_count_format
     * @returns {string}
     */
    function getCellDom(cls, start_count_format) {
        cls = cls || '';
        start_count_format = start_count_format || '00';
        return '' +
            '<div class="table-cell ' + cls + '">' +
                '<div class="tab-val">' + start_count_format + '</div>' +
                '<div class="tab-metr"></div>' +
            '</div>';
    }

    /**
     *
     * @param ANumber
     * @param isUse
     * @returns {string}
     */
    function format2(ANumber, isUse){ // формирования чисел с ведущими нулями
        isUse = (isUse !== false) ? true : false;
        return ( ( ANumber <= 9 ) && isUse ) ? ( "0" + ANumber ) : ( "" + ANumber );
    }

    /**
     *
     * @param number
     * @param titles
     * @param lang
     * @returns {*}
     */
    function definitionOfNumerals(number, titles, lang){ // установка правильного склонения после числительных
        switch (lang){
            case 'rus':
                var cases = [2, 0, 1, 1, 1, 2];
                return titles[ (number%100>4 && number%100<20) ? 2 : cases[(number%10<5) ? number%10 : 5] ];
            case 'eng':
                return titles[ ( number == 1 ) ? 0 : 1 ];
        }
    }
})(jQuery);
