import type {
  SyoTimerOptions,
  SyoTimerLocalization,
  SyoTimerMethods,
  SyoTimerOptionProps,
  SyoTimerOptionValues,
} from './source/types';
export type { SyoTimerOptions, SyoTimerLocalization } from './source/types';

declare global {
  interface JQuery {
    syotimer(options: SyoTimerOptions): JQuery;
    syotimer(
      method: SyoTimerMethods,
      property: SyoTimerOptionProps,
      value: SyoTimerOptionValues,
    ): JQuery;
  }

  interface JQueryStatic {
    syotimerLang: SyoTimerLocalization;
  }
}
