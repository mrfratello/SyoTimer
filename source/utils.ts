import {
  DAY,
  HOUR,
  MINUTE,
  SECOND,
  DAY_IN_SEC,
  HOUR_IN_SEC,
  MINUTE_IN_SEC,
  LAYOUT_TYPES,
  unitLinkedList,
} from './constants';
import type { LanguageHandler, SyoTimerInternalOptions, Unit, UnitLong, UnitShort } from './types';

/**
 * Determine a unit of period in milliseconds
 */
function getPeriodUnit(periodUnit: Unit) {
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
export function format2(numb: number, isUse?: boolean) {
  return numb <= 9 && !!isUse ? `0${numb}` : String(numb);
}

export function getItemTypesByLayout(layout: string) {
  const itemTypes = [] as UnitLong[];
  for (let i = 0; i < layout.length; i += 1) {
    itemTypes.push(LAYOUT_TYPES[layout[i] as UnitShort]);
  }
  return itemTypes;
}

/**
 * Getting count of units to deadline
 */
export function getUnitsToDeadLine(secondsToDeadLine: number) {
  let remainsSeconds = secondsToDeadLine;
  let unit: UnitLong | null = DAY;
  const unitsToDeadLine: Record<UnitLong, number> = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  };
  do {
    const unitInMilliSec = getPeriodUnit(unit);
    unitsToDeadLine[unit] = Math.floor(remainsSeconds / unitInMilliSec);
    remainsSeconds %= unitInMilliSec;
    // eslint-disable-next-line no-cond-assign
  } while ((unit = unitLinkedList.prev(unit)));
  return unitsToDeadLine;
}

/**
 * Return once cell DOM of countdown: day, hour, minute, second
 */
export function getTimerItem() {
  const timerCellValue = $('<div/>', {
    class: 'syotimer-cell__value',
    text: '0',
  });
  const timerCellUnit = $('<div/>', { class: 'syotimer-cell__unit' });
  const timerCell = $('<div/>', { class: 'syotimer-cell' });
  timerCell.append(timerCellValue).append(timerCellUnit);
  return timerCell;
}

/**
 * Getting count of seconds to deadline
 */
export function getSecondsToDeadLine(
  differenceInMilliSec: number,
  options: SyoTimerInternalOptions,
) {
  let differenceInSeconds = differenceInMilliSec / 1000;
  differenceInSeconds = Math.floor(differenceInSeconds);

  if (!options.periodic) return differenceInSeconds;

  let differenceInUnit: number;
  const periodUnitInSeconds = getPeriodUnit(options.periodUnit);
  let fullTimeUnitsBetween = differenceInMilliSec / (periodUnitInSeconds * 1000);
  fullTimeUnitsBetween = Math.ceil(fullTimeUnitsBetween);
  fullTimeUnitsBetween = Math.abs(fullTimeUnitsBetween);
  if (differenceInSeconds >= 0) {
    differenceInUnit = fullTimeUnitsBetween % options.periodInterval;
    differenceInUnit = differenceInUnit === 0 ? options.periodInterval : differenceInUnit;
    differenceInUnit -= 1;
  } else {
    differenceInUnit = options.periodInterval - (fullTimeUnitsBetween % options.periodInterval);
  }

  const additionalInUnit = differenceInSeconds % periodUnitInSeconds;
  // fix когда дедлайн раньше текущей даты,
  // возникает баг с неправильным расчетом интервала при different пропорциональной periodUnit
  if (additionalInUnit === 0 && differenceInSeconds < 0) {
    differenceInUnit -= 1;
  }
  const secondsToDeadLine = Math.abs(differenceInUnit * periodUnitInSeconds + additionalInUnit);
  return secondsToDeadLine;
}

/**
 * Universal function for get correct inducement of nouns after a numeral (`number`)
 */
const universal: LanguageHandler = (n: number, words: string[]) => (n === 1 ? words[0] : words[1]);

/**
 * Getting the correct declension of words after numerals
 */
export function getNumeral(n: number, lang: string, unit: UnitLong) {
  const handler: LanguageHandler = $.syotimerLang[lang].handler || universal;
  const words: string[] = $.syotimerLang[lang][unit];
  return handler(n, words);
}
