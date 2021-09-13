import $ from 'jquery';
import './localization';
import mapSyoTimer from './SyoTimer';
import type {
  SyoTimerOptions,
  SyoTimerMethods,
  SyoTimerOptionProps,
  SyoTimerOptionValues,
} from './types';

const methods: Record<SyoTimerMethods, Function> = {
  setOption(name: SyoTimerOptionProps, value: SyoTimerOptionValues) {
    const elementBox = $(this);
    const options = elementBox.data('syotimer-options');
    if (Object.prototype.hasOwnProperty.call(options, name)) {
      options[name] = value;
      elementBox.data('syotimer-options', options);
    }
  },
};

$.fn.extend({
  syotimer(
    this: JQuery,
    options: SyoTimerOptions | SyoTimerMethods,
    property: SyoTimerOptionProps,
    value: SyoTimerOptionValues,
  ) {
    if (typeof options === 'string' && options === 'setOption') {
      return this.each(function method() {
        methods[options].apply(this, [property, value]);
      });
    }
    if (options === null || options === undefined || typeof options === 'object') {
      return mapSyoTimer(this, options);
    }
    return $.error('SyoTimer. Error in call methods: methods is not exist');
  },
});
