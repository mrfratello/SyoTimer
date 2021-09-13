import $ from 'jquery';
import type { SyoTimerInternalOptions, ItemsHas, LinkedList, UnitLong, UnitShort } from './types';

export const DAY: UnitLong = 'day';
export const HOUR: UnitLong = 'hour';
export const MINUTE: UnitLong = 'minute';
export const SECOND: UnitLong = 'second';
export const DAY_IN_SEC = 24 * 60 * 60;
export const HOUR_IN_SEC = 60 * 60;
export const MINUTE_IN_SEC = 60;
export const LAYOUT_TYPES: Record<UnitShort, UnitLong> = {
  d: DAY,
  h: HOUR,
  m: MINUTE,
  s: SECOND,
};

export const unitLinkedList: LinkedList<UnitLong> = {
  list: [SECOND, MINUTE, HOUR, DAY],
  next(current) {
    const currentIndex = this.list.indexOf(current);
    return currentIndex < this.list.length ? this.list[currentIndex + 1] : null;
  },
  prev(current) {
    const currentIndex = this.list.indexOf(current);
    return currentIndex > 0 ? this.list[currentIndex - 1] : null;
  },
};

export const defaultItemsHas: ItemsHas = {
  second: false,
  minute: false,
  hour: false,
  day: false,
};

export const defaultOptions: SyoTimerInternalOptions = {
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
  afterDeadline: (timerBlock) => {
    timerBlock.bodyBlock.html('<p style="font-size: 1.2em;">The countdown is finished!</p>');
  },
  itemTypes: ['day', 'hour', 'minute', 'second'],
  itemsHas: $.extend({}, defaultItemsHas),
};
