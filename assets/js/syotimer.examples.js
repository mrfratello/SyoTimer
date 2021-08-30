jQuery(function ($) {
  /* Simple Timer. The countdown to 20:30 2035.05.09 */
  $("#simple-timer").syotimer({
    date: new Date(2035, 4, 9, 20, 30),
  });

  /* Timer with Head and Foot. Countdown is over */
  $("#expired-timer").syotimer({
    date: new Date(1990, 0),
    headTitle: "<h3>Timer with header and footer. Countdown is over</h3>",
    footTitle: '<i style="color: brown;">Footer of timer.</i>',
  });

  /* Callback after the end of the countdown timer */
  $("#expired-timer_event").syotimer({
    date: new Date(2000, 11, 31),
    headTitle: "<h3>Timer with header and footer. Countdown is over</h3>",
    footTitle: '<i style="color: brown;">Footer of timer.</i>',
    afterDeadline: function (syotimer) {
      syotimer.bodyBlock.html(
        "<p>The countdown is finished 00:00 2000.12.31</p>"
      );
      syotimer.headBlock.html(
        "<h3>Callback after the end of the countdown timer</h3>"
      );
      syotimer.footBlock.html(
        '<em style="color:brown;">' +
          "Footer of timer after countdown is finished" +
          "</em>"
      );
    },
  });

  /* Periodic Timer. Period is equal 3 minutes. Effect of fading in */
  $("#periodic-timer_period_minutes").syotimer({
    date: new Date(2015, 0, 1),
    layout: "hms",
    doubleNumbers: false,
    effectType: "opacity",

    periodUnit: "m",
    periodic: true,
    periodInterval: 3,
  });

  /* Periodic Timer. Period is equal 10 days */
  $("#periodic-timer_period_days").syotimer({
    date: new Date(2015, 0, 1, 20),
    layout: "hms",
    periodic: true,
    periodInterval: 10,
    periodUnit: "d",
  });

  /* Demonstrate layout. Period is equal 2 hours. Display only seconds */
  $("#layout-timer_only-seconds").syotimer({
    layout: "s",
    periodic: true,
    periodInterval: 2,
    periodUnit: "h",
  });

  /* Demonstrate layout. Period is equal 2 days and 5 hours.
  Units of countdown in reverse order */
  $("#layout-timer_reversed-units").syotimer({
    layout: "smhd",
    effectType: "opacity",

    periodic: true,
    periodInterval: 53,
    periodUnit: "h",
  });

  /* Demonstrate layout. Period is equal 2 days and 5 hours.
  Display only days and minutes in reverse order */
  $("#layout-timer_mixed-units").syotimer({
    layout: "md",

    periodic: true,
    periodInterval: 1777,
    periodUnit: "m",
  });

  /* Periodic Timer. Countdown timer with given time zone */
  $("#periodic-timer_timezone_given").syotimer({
    date: new Date("2000-07-01T18:00:00.000+02:00"),
    layout: "hms",

    periodic: true,
    periodInterval: 1,
    periodUnit: "d",
  });

  /**
   * Periodic Timer.
   * Change options: doubleNumbers, effect type, language
   */
  var EFFECT_TYPES = ["opacity", "none"];
  var LANGUAGES = ["eng", "rus", "heb"];
  var changeOptionsTimer = $("#periodic-timer_change-options");
  var changeOptionsEffectType = $("#change_options__effect-type");
  var changeOptionsDoubleNumbers = $("#change_options__double-numbers");
  var changeOptionsLang = $("#change_options__lang");

  changeOptionsTimer.syotimer({
    periodic: true,
    periodInterval: 10,
    periodUnit: "d",
    headTitle:
      "<div>Effect type: " +
      '<span class="option option_type_effect-type">none</span>' +
      "</div>" +
      "<div>Use double numbers: " +
      '<span class="option option_type_double-numbers">true</span>' +
      "</div>" +
      "<div>Language: " +
      '<span class="option option_type_language">eng</span>' +
      "</div>",
  });

  /**
   * Getting a next of current index of array by circle
   * @param array
   * @param currentIndex
   * @returns {*}
   */
  function getNextIndex(array, currentIndex) {
    return currentIndex === array.length - 1 ? 0 : currentIndex + 1;
  }

  /**
   * Update values in header title of timer `#periodic-timer_change-options`
   */
  function updateOptionTitles() {
    var effectIndex = parseInt(changeOptionsEffectType.data("index"));
    var doubleNumberIndex = parseInt(changeOptionsDoubleNumbers.data("index"));
    var languageIndex = parseInt(changeOptionsLang.data("index"));
    var blocks = changeOptionsTimer.data("syotimer-blocks");
    blocks.headBlock
      .find(".option_type_effect-type")
      .html(EFFECT_TYPES[effectIndex]);
    blocks.headBlock
      .find(".option_type_double-numbers")
      .html(doubleNumberIndex ? "true" : "false");
    blocks.headBlock
      .find(".option_type_language")
      .html(LANGUAGES[languageIndex]);
  }

  changeOptionsEffectType.on("click", function () {
    var button = $(this);
    var effectIndex = parseInt(button.data("index"));
    var nextEffectIndex = getNextIndex(EFFECT_TYPES, effectIndex);
    button.data("index", nextEffectIndex);
    changeOptionsTimer.syotimer(
      "setOption",
      "effectType",
      EFFECT_TYPES[nextEffectIndex]
    );
    updateOptionTitles();
  });
  changeOptionsDoubleNumbers.on("click", function () {
    var button = $(this);
    var index = parseInt(button.data("index"));
    var useDoubleNumbers = Math.abs(index - 1);
    button.data("index", useDoubleNumbers);
    changeOptionsTimer.syotimer(
      "setOption",
      "doubleNumbers",
      useDoubleNumbers === 1
    );
    updateOptionTitles();
  });
  changeOptionsLang.on("click", function () {
    var button = $(this);
    var langIndex = parseInt(button.data("index"));
    var nextLangIndex = getNextIndex(LANGUAGES, langIndex);
    button.data("index", nextLangIndex);
    changeOptionsTimer.syotimer("setOption", "lang", LANGUAGES[nextLangIndex]);
    updateOptionTitles();
  });

  /**
   * Localization in timer.
   * Add new language
   */

  // Adding of a words for signatures of countdown
  $.syotimerLang.neng = {
    second: ["secondone", "secondfive", "seconds"],
    minute: ["minuteone", "minutefive", "minutes"],
    hour: ["hourone", "hourfive", "hours"],
    day: ["dayone", "dayfive", "days"],
    // Adding of the handler that selects an index from the list of words
    // based on ahead the going number
    handler: function nengNumeral(number, words) {
      var lastDigit = number % 10;
      var index = 2;
      if (lastDigit === 1) {
        index = 0;
      } else if (lastDigit === 5) {
        index = 1;
      }
      return words[index];
    },
  };

  $("#periodic-timer_localization_new-english").syotimer({
    lang: "neng",
    layout: "ms",

    periodic: true,
    periodInterval: 6,
    periodUnit: "m",
  });
});
