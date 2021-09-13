export interface SyoTimerInternalOptions {
  date: Date | number;
  /**
   * sets an order of layout of units of the timer:
   * days (d) of hours ('h'), minute ('m'), second ('s').
   */
  layout: string;
  /**
   * `true` - the timer is periodic.
   * If the date until which counts the timer is reached,
   * the next value date which will count down
   * the timer is incremented by the value `periodInterval`
   */
  periodic: boolean;
  /**
   * the period of the timer in `periodUnit` (if `periodic` is set to `true`)
   */
  periodInterval: number;
  /**
   * the unit of measurement period timer
   */
  periodUnit: Unit;
  /**
   * `true` - show hours, minutes and seconds with leading zeros
   * (2 hours 5 minutes 4 seconds = 02:05:04)
   */
  doubleNumbers: boolean;
  /**
   * The effect of changing the value of seconds
   */
  effectType: SyoTimerEffectType;
  /**
   * localization of a countdown signatures (days, hours, minutes, seconds)
   */
  lang: string;
  /**
   * text above the countdown (may be as html string)
   */
  headTitle: string;
  /**
   * text under the countdown (may be as html string)
   */
  footTitle: string;
  afterDeadline(timerBlock: SyoTimerTimerBlock): void;
  itemTypes: UnitLong[];
  itemsHas: ItemsHas;
}

export type SyoTimerOptions = Partial<Omit<SyoTimerInternalOptions, 'itemTypes' | 'itemsHas'>>;

export type SyoTimerOptionProps = Exclude<keyof SyoTimerOptions, 'layout'>;
export type SyoTimerOptionValues = Required<SyoTimerOptions>[SyoTimerOptionProps];

export interface SyoTimerTimerBlock {
  headBlock: JQuery;
  bodyBlock: JQuery;
  footBlock: JQuery;
}

export type SyoTimerItemBlocks = {
  [key in UnitLong]?: JQuery;
};

export type SyoTimerEffectType = 'none' | 'opacity';

export type SyoTimerMethods = 'setOption';

export type UnitLong = 'day' | 'hour' | 'minute' | 'second';
export type UnitShort = 'd' | 'h' | 'm' | 's';

export type Unit = UnitShort | UnitLong;

export interface LinkedList<T> {
  list: T[];
  next(current: T): T | null;
  prev(current: T): T | null;
}

export type ItemsHas = Record<UnitLong, boolean>;

export interface LanguageHandler {
  (n: number, words: string[]): string;
}

type LanguageConfigBase = Record<UnitLong, string[]>;

interface LanguageConfig extends LanguageConfigBase {
  handler?: LanguageHandler;
}

export type SyoTimerLocalization = Record<string, LanguageConfig>;

export interface SyoTimerLang extends JQueryStatic {
  syotimerLang: SyoTimerLocalization;
}
