/**
 * SyoTimer - jquery countdown plugin
 * @version: 3.1.1
 * @author: John Syomochkin <info@syomochkin.xyz>
 * @homepage: https://mrfratello.github.io/SyoTimer
 * @repository: git+https://github.com/mrfratello/SyoTimer.git
 * @license: under MIT license
 */
(function ($$1) {
    'use strict';

    $$1.syotimerLang = {
        rus: {
            second: ['секунда', 'секунды', 'секунд'],
            minute: ['минута', 'минуты', 'минут'],
            hour: ['час', 'часа', 'часов'],
            day: ['день', 'дня', 'дней'],
            handler: function rusNumeral(number, words) {
                var cases = [2, 0, 1, 1, 1, 2];
                if (number % 100 > 4 && number % 100 < 20) {
                    return words[2];
                }
                var index = cases[number % 10 < 5 ? number % 10 : 5];
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

    var DAY = 'day';
    var HOUR = 'hour';
    var MINUTE = 'minute';
    var SECOND = 'second';
    var DAY_IN_SEC = 24 * 60 * 60;
    var HOUR_IN_SEC = 60 * 60;
    var MINUTE_IN_SEC = 60;
    var LAYOUT_TYPES = {
        d: DAY,
        h: HOUR,
        m: MINUTE,
        s: SECOND,
    };
    var unitLinkedList = {
        list: [SECOND, MINUTE, HOUR, DAY],
        next: function (current) {
            var currentIndex = this.list.indexOf(current);
            return currentIndex < this.list.length ? this.list[currentIndex + 1] : null;
        },
        prev: function (current) {
            var currentIndex = this.list.indexOf(current);
            return currentIndex > 0 ? this.list[currentIndex - 1] : null;
        },
    };
    var defaultItemsHas = {
        second: false,
        minute: false,
        hour: false,
        day: false,
    };
    var defaultOptions = {
        date: 0,
        layout: 'dhms',
        periodic: false,
        periodInterval: 7,
        periodUnit: 'd',
        doubleNumbers: true,
        effectType: 'none',
        lang: 'eng',
        headTitle: '',
        footTitle: '',
        afterDeadline: function (timerBlock) {
            timerBlock.bodyBlock.html('<p style="font-size: 1.2em;">The countdown is finished!</p>');
        },
        itemTypes: ['day', 'hour', 'minute', 'second'],
        itemsHas: $$1.extend({}, defaultItemsHas),
    };

    /**
     * Determine a unit of period in milliseconds
     */
    function getPeriodUnit(periodUnit) {
        switch (periodUnit) {
            case 'd':
            case DAY:
                return DAY_IN_SEC;
            case 'h':
            case HOUR:
                return HOUR_IN_SEC;
            case 'm':
            case MINUTE:
                return MINUTE_IN_SEC;
            case 's':
            case SECOND:
            default:
                return 1;
        }
    }
    /**
     * Formation of numbers with leading zeros
     */
    function format2(numb, isUse) {
        return numb <= 9 && !!isUse ? "0".concat(numb) : String(numb);
    }
    function getItemTypesByLayout(layout) {
        var itemTypes = [];
        for (var i = 0; i < layout.length; i += 1) {
            itemTypes.push(LAYOUT_TYPES[layout[i]]);
        }
        return itemTypes;
    }
    /**
     * Getting count of units to deadline
     */
    function getUnitsToDeadLine(secondsToDeadLine) {
        var remainsSeconds = secondsToDeadLine;
        var unit = DAY;
        var unitsToDeadLine = {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
        };
        do {
            var unitInMilliSec = getPeriodUnit(unit);
            unitsToDeadLine[unit] = Math.floor(remainsSeconds / unitInMilliSec);
            remainsSeconds %= unitInMilliSec;
            // eslint-disable-next-line no-cond-assign
        } while ((unit = unitLinkedList.prev(unit)));
        return unitsToDeadLine;
    }
    /**
     * Return once cell DOM of countdown: day, hour, minute, second
     */
    function getTimerItem() {
        var timerCellValue = $('<div/>', {
            class: 'syotimer-cell__value',
            text: '0',
        });
        var timerCellUnit = $('<div/>', { class: 'syotimer-cell__unit' });
        var timerCell = $('<div/>', { class: 'syotimer-cell' });
        timerCell.append(timerCellValue).append(timerCellUnit);
        return timerCell;
    }
    /**
     * Getting count of seconds to deadline
     */
    function getSecondsToDeadLine(differenceInMilliSec, options) {
        var differenceInSeconds = differenceInMilliSec / 1000;
        differenceInSeconds = Math.floor(differenceInSeconds);
        if (!options.periodic)
            return differenceInSeconds;
        var differenceInUnit;
        var periodUnitInSeconds = getPeriodUnit(options.periodUnit);
        var fullTimeUnitsBetween = differenceInMilliSec / (periodUnitInSeconds * 1000);
        fullTimeUnitsBetween = Math.ceil(fullTimeUnitsBetween);
        fullTimeUnitsBetween = Math.abs(fullTimeUnitsBetween);
        if (differenceInSeconds >= 0) {
            differenceInUnit = fullTimeUnitsBetween % options.periodInterval;
            differenceInUnit = differenceInUnit === 0 ? options.periodInterval : differenceInUnit;
            differenceInUnit -= 1;
        }
        else {
            differenceInUnit = options.periodInterval - (fullTimeUnitsBetween % options.periodInterval);
        }
        var additionalInUnit = differenceInSeconds % periodUnitInSeconds;
        // fix когда дедлайн раньше текущей даты,
        // возникает баг с неправильным расчетом интервала при different пропорциональной periodUnit
        if (additionalInUnit === 0 && differenceInSeconds < 0) {
            differenceInUnit -= 1;
        }
        var secondsToDeadLine = Math.abs(differenceInUnit * periodUnitInSeconds + additionalInUnit);
        return secondsToDeadLine;
    }
    /**
     * Universal function for get correct inducement of nouns after a numeral (`number`)
     */
    var universal = function (n, words) { return (n === 1 ? words[0] : words[1]); };
    /**
     * Getting the correct declension of words after numerals
     */
    function getNumeral(n, lang, unit) {
        var handler = $.syotimerLang[lang].handler || universal;
        var words = $.syotimerLang[lang][unit];
        return handler(n, words);
    }

    var SyoTimer = /** @class */ (function () {
        function SyoTimer(element, options) {
            this.element = $$1(element);
            this.element.data('syotimer-options', options);
            this.render();
        }
        /**
         * Rendering base elements of countdown
         * @private
         */
        SyoTimer.prototype.render = function () {
            var options = this.element.data('syotimer-options');
            var timerItem = getTimerItem();
            var headBlock = $$1('<div/>', { class: 'syotimer__head' }).html(options.headTitle);
            var bodyBlock = $$1('<div/>', { class: 'syotimer__body' });
            var footBlock = $$1('<div/>', { class: 'syotimer__footer' }).html(options.footTitle);
            var itemBlocks = {};
            for (var i = 0; i < options.itemTypes.length; i += 1) {
                var item = timerItem.clone();
                item.addClass("syotimer-cell_type_".concat(options.itemTypes[i]));
                bodyBlock.append(item);
                itemBlocks[options.itemTypes[i]] = item;
            }
            var timerBlocks = { headBlock: headBlock, bodyBlock: bodyBlock, footBlock: footBlock };
            this.element
                .data('syotimer-blocks', timerBlocks)
                .data('syotimer-items', itemBlocks)
                .addClass('syotimer')
                .append(headBlock)
                .append(bodyBlock)
                .append(footBlock);
        };
        /**
         * Handler called per seconds while countdown is not over
         */
        SyoTimer.prototype.tick = function () {
            var options = this.element.data('syotimer-options');
            $$1('.syotimer-cell > .syotimer-cell__value', this.element).css('opacity', 1);
            var currentTime = new Date().getTime();
            var deadLineTime = options.date instanceof Date ? options.date.getTime() : options.date;
            var differenceInMilliSec = deadLineTime - currentTime;
            var secondsToDeadLine = getSecondsToDeadLine(differenceInMilliSec, options);
            if (secondsToDeadLine >= 0) {
                this.refreshUnitsDom(secondsToDeadLine);
                this.applyEffectSwitch(options.effectType);
            }
            else {
                var elementBox = $$1.extend(this.element, this.element.data('syotimer-blocks'));
                options.afterDeadline(elementBox);
            }
        };
        /**
         * Refresh unit DOM of countdown
         * @private
         */
        SyoTimer.prototype.refreshUnitsDom = function (secondsToDeadLine) {
            var options = this.element.data('syotimer-options');
            var itemBlocks = this.element.data('syotimer-items');
            var unitList = options.itemTypes;
            var unitsToDeadLine = getUnitsToDeadLine(secondsToDeadLine);
            if (!options.itemsHas.day) {
                unitsToDeadLine.hour += unitsToDeadLine.day * 24;
            }
            if (!options.itemsHas.hour) {
                unitsToDeadLine.minute += unitsToDeadLine.hour * 60;
            }
            if (!options.itemsHas.minute) {
                unitsToDeadLine.second += unitsToDeadLine.minute * 60;
            }
            for (var i = 0; i < unitList.length; i += 1) {
                var unit = unitList[i];
                var unitValue = unitsToDeadLine[unit];
                var itemBlock = itemBlocks[unit];
                itemBlock.data('syotimer-unit-value', unitValue);
                $$1('.syotimer-cell__value', itemBlock).html(format2(unitValue, unit !== DAY ? options.doubleNumbers : false));
                $$1('.syotimer-cell__unit', itemBlock).html(getNumeral(unitValue, options.lang, unit));
            }
        };
        /**
         * Applying effect of changing numbers
         * @private
         */
        SyoTimer.prototype.applyEffectSwitch = function (effectType, unit) {
            var _this = this;
            if (unit === void 0) { unit = SECOND; }
            switch (effectType) {
                case 'opacity': {
                    var itemBlocks = this.element.data('syotimer-items');
                    var unitItemBlock = itemBlocks[unit];
                    if (unitItemBlock) {
                        var nextUnit = unitLinkedList.next(unit);
                        var unitValue = unitItemBlock.data('syotimer-unit-value');
                        $$1('.syotimer-cell__value', unitItemBlock).animate({ opacity: 0.1 }, 1000, 'linear', function () {
                            return _this.tick();
                        });
                        if (nextUnit && unitValue === 0) {
                            this.applyEffectSwitch(effectType, nextUnit);
                        }
                    }
                    return;
                }
                case 'none':
                default: {
                    setTimeout(function () { return _this.tick(); }, 1000);
                }
            }
        };
        return SyoTimer;
    }());
    function mapSyoTimer(elements, inputOptions) {
        var options = $$1.extend({}, defaultOptions, inputOptions || {});
        options.itemTypes = getItemTypesByLayout(options.layout);
        options.itemsHas = $$1.extend({}, defaultItemsHas);
        for (var i = 0; i < options.itemTypes.length; i += 1) {
            options.itemsHas[options.itemTypes[i]] = true;
        }
        return elements.each(function init() {
            var timer = new SyoTimer(this, options);
            timer.tick();
        });
    }

    var methods = {
        setOption: function (name, value) {
            var elementBox = $$1(this);
            var options = elementBox.data('syotimer-options');
            if (Object.prototype.hasOwnProperty.call(options, name)) {
                options[name] = value;
                elementBox.data('syotimer-options', options);
            }
        },
    };
    $$1.fn.extend({
        syotimer: function (options, property, value) {
            if (typeof options === 'string' && options === 'setOption') {
                return this.each(function method() {
                    methods[options].apply(this, [property, value]);
                });
            }
            if (options === null || options === undefined || typeof options === 'object') {
                return mapSyoTimer(this, options);
            }
            return $$1.error('SyoTimer. Error in call methods: methods is not exist');
        },
    });

})(jQuery);
