import $ from 'jquery';
import { defaultOptions, defaultItemsHas, DAY, SECOND, unitLinkedList } from './constants';
import {
  getItemTypesByLayout,
  getNumeral,
  getSecondsToDeadLine,
  getTimerItem,
  getUnitsToDeadLine,
  format2,
} from './utils';
import type {
  SyoTimerOptions,
  SyoTimerInternalOptions,
  SyoTimerItemBlocks,
  SyoTimerEffectType,
  UnitLong,
} from './types';

export class SyoTimer {
  element: JQuery;

  constructor(element: HTMLElement, options: SyoTimerInternalOptions) {
    this.element = $(element);
    this.element.data('syotimer-options', options);
    this.render();
  }

  /**
   * Rendering base elements of countdown
   * @private
   */
  private render() {
    const options = this.element.data('syotimer-options') as SyoTimerInternalOptions;

    const timerItem = getTimerItem();
    const headBlock = $('<div/>', { class: 'syotimer__head' }).html(options.headTitle);
    const bodyBlock = $('<div/>', { class: 'syotimer__body' });
    const footBlock = $('<div/>', { class: 'syotimer__footer' }).html(options.footTitle);
    const itemBlocks: SyoTimerItemBlocks = {};

    for (let i = 0; i < options.itemTypes.length; i += 1) {
      const item = timerItem.clone();

      item.addClass(`syotimer-cell_type_${options.itemTypes[i]}`);
      bodyBlock.append(item);

      itemBlocks[options.itemTypes[i]] = item;
    }

    const timerBlocks = { headBlock, bodyBlock, footBlock };

    this.element
      .data('syotimer-blocks', timerBlocks)
      .data('syotimer-items', itemBlocks)
      .addClass('syotimer')
      .append(headBlock)
      .append(bodyBlock)
      .append(footBlock);
  }

  /**
   * Handler called per seconds while countdown is not over
   */
  tick() {
    const options = this.element.data('syotimer-options') as SyoTimerInternalOptions;
    $('.syotimer-cell > .syotimer-cell__value', this.element).css('opacity', 1);
    const currentTime = new Date().getTime();
    const deadLineTime = options.date instanceof Date ? options.date.getTime() : options.date;
    const differenceInMilliSec = deadLineTime - currentTime;
    const secondsToDeadLine = getSecondsToDeadLine(differenceInMilliSec, options);
    if (secondsToDeadLine >= 0) {
      this.refreshUnitsDom(secondsToDeadLine);
      this.applyEffectSwitch(options.effectType);
    } else {
      const elementBox = $.extend(this.element, this.element.data('syotimer-blocks'));
      options.afterDeadline(elementBox);
    }
  }

  /**
   * Refresh unit DOM of countdown
   * @private
   */
  private refreshUnitsDom(secondsToDeadLine: number) {
    const options = this.element.data('syotimer-options') as SyoTimerInternalOptions;
    const itemBlocks = this.element.data('syotimer-items');
    const unitList = options.itemTypes;
    const unitsToDeadLine = getUnitsToDeadLine(secondsToDeadLine);

    if (!options.itemsHas.day) {
      unitsToDeadLine.hour += unitsToDeadLine.day * 24;
    }
    if (!options.itemsHas.hour) {
      unitsToDeadLine.minute += unitsToDeadLine.hour * 60;
    }
    if (!options.itemsHas.minute) {
      unitsToDeadLine.second += unitsToDeadLine.minute * 60;
    }
    for (let i = 0; i < unitList.length; i += 1) {
      const unit = unitList[i];
      const unitValue = unitsToDeadLine[unit];
      const itemBlock = itemBlocks[unit];
      itemBlock.data('syotimer-unit-value', unitValue);
      $('.syotimer-cell__value', itemBlock).html(
        format2(unitValue, unit !== DAY ? options.doubleNumbers : false),
      );
      $('.syotimer-cell__unit', itemBlock).html(getNumeral(unitValue, options.lang, unit));
    }
  }

  /**
   * Applying effect of changing numbers
   * @private
   */
  private applyEffectSwitch(effectType: SyoTimerEffectType, unit: UnitLong = SECOND) {
    switch (effectType) {
      case 'opacity': {
        const itemBlocks = this.element.data('syotimer-items');
        const unitItemBlock = itemBlocks[unit];
        if (unitItemBlock) {
          const nextUnit = unitLinkedList.next(unit);
          const unitValue = unitItemBlock.data('syotimer-unit-value');
          $('.syotimer-cell__value', unitItemBlock).animate({ opacity: 0.1 }, 1000, 'linear', () =>
            this.tick(),
          );
          if (nextUnit && unitValue === 0) {
            this.applyEffectSwitch(effectType, nextUnit);
          }
        }
        return;
      }
      case 'none':
      default: {
        setTimeout(() => this.tick(), 1000);
      }
    }
  }
}

export default function mapSyoTimer(elements: JQuery, inputOptions?: SyoTimerOptions) {
  const options = $.extend({}, defaultOptions, inputOptions || {});
  options.itemTypes = getItemTypesByLayout(options.layout);
  options.itemsHas = $.extend({}, defaultItemsHas);

  for (let i = 0; i < options.itemTypes.length; i += 1) {
    options.itemsHas[options.itemTypes[i]] = true;
  }

  return elements.each(function init() {
    const timer = new SyoTimer(this, options);
    timer.tick();
  });
}
