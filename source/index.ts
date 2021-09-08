import $ from "jquery";
import "./localization";
import { mapSyoTimer } from "./SyoTimer";
import type {
  SyoTimerOptions,
  SyoTimerMethods,
  SyoTimerOptionProps,
  SyoTimerOptionValues,
} from "./types";

const methods: Record<SyoTimerMethods, Function> = {
  setOption: function (name: SyoTimerOptionProps, value: SyoTimerOptionValues) {
    const elementBox = $(this);
    const options = elementBox.data("syotimer-options");
    if (options.hasOwnProperty(name)) {
      options[name] = value;
      elementBox.data("syotimer-options", options);
    }
  },
};

$.fn.extend({
  syotimer: function (
    this: JQuery,
    options: SyoTimerOptions | SyoTimerMethods
  ) {
    if (typeof options === "string" && options === "setOption") {
      var otherArgs = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        methods[options].apply(this, otherArgs);
      });
    }
    if (
      options === null ||
      options === undefined ||
      typeof options === "object"
    ) {
      return mapSyoTimer(this, options);
    }
    $.error("SyoTimer. Error in call methods: methods is not exist");
  },
});
