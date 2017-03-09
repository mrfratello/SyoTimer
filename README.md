jQuery SyoTimer Plugin
========

jQuery plugin of countdown on html-page


## Demo

[Examples of usage jQuery SyoTimer Plugin](http://syomochkin.xyz/folio/syotimer/demo.html)


## Requirements

jQuery SyoTimer Plugin has been tested with jQuery 1.7+ on all major browsers:

* Firefox 2+ (Win, Mac, Linux);
* IE8+ (Win);
* Chrome 6+ (Win, Mac, Linux, Android, iPhone);
* Safari 3.2+ (Win, Mac, iPhone);
* Opera 8+ (Win, Mac, Linux, Android, iPhone).


## Features

* Callback after the end of the countdown timer with the possibility of changing the structure of the timer
* Periodic counting with the specified period
* The effect of fading in the countdown
* The correct declension of nouns next to numeral numerals
* Custom formatting and styling timer


## Usage
Include the js-files which you can find in the `build` folder and call the method `syotimer`:

```html
<div class="your_selector_to_countdown"></div>

<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="jquery.syotimer.min.js"></script>
<script type="text/javascript">
    jQuery(function($) {
        $('.your_selector_to_countdown').syotimer();
    });
</script>
```

## HTML Structure of SyoTimer

Classes is named by [BEM methodology](https://en.bem.info/methodology/naming-convention/)

```html
<div class="syotimer">
    <div class="syotimer__head"></div>
    <div class="syotimer__body">
        <div class="syotimer__item syotimer-cell syotimer-cell_day">
            <div class="syotimer-cell__value">1</div>
            <div class="syotimer-cell__unit">day</div>
        </div>
        <div class="syotimer__item syotimer-cell syotimer-cell_hour">
            <div class="syotimer-cell__value">1</div>
            <div class="syotimer-cell__unit">hour</div>
        </div>
        <div class="syotimer__item syotimer-cell syotimer-cell_minute">
            <div class="syotimer-cell__value">1</div>
            <div class="syotimer-cell__unit">minute</div>
        </div>
        <div class="syotimer__item syotimer-cell syotimer-cell_second">
            <div class="syotimer-cell__value">1</div>
            <div class="syotimer-cell__unit">second</div>
        </div>
    </div>
    <div class="timer__footer"></div>
</div>
```


## Options

|Option          |   Description                         | Type of Value | Default Value | Available Values |
| -------------- | ------------------------------------- | ------------- | ------------- | ---------------- |
|**year**        | year of date, which should count down timer | integer | 2014 | >1979 |
|**month**       | month of date, which should count down timer | integer | 7 | 1-12|
|**day**         | day of date, which should count down timer | integer | 31 | 1-31 |
|**hour**        | hour of date, which should count down timer | integer | 0 | 0-23 |
|**minute**      | minute of date, which should count down timer | integer | 0 | 0-59 |
|**second**      | second of date, which should count down timer | integer | 0 | 0-59 |
|**timeZone**    | setting the time zone of deadline. If `local` then the time zone is ignored and the deadline is determined by local time of the user. Otherwise, specifies the offset from the UTC | float/string | 'local' | 'local', >-12 && <12 |
|**ignoreTransferTime**| If `true` then transfer to summer/winter time will not be considered. For details, see "About summer/winter time"   | boolean | false |  |
|**dayVisible**  | *true* - show the number of days.  *false* - the number of days is not shown in the timer and the number of hours may exceed 23 | boolean | true |  |
|**doubleNumbers**| *true* - show hours, minutes and seconds with leading zeros (2 hours 5 minutes 4 seconds = 02:05:04) | boolean | true |  |
|**dubleNumbers** (deprecated)| *true* - show hours, minutes and seconds with leading zeros (2 hours 5 minutes 4 seconds = 02:05:04) | boolean | true |  |
|**effectType**  | The effect of changing the value of seconds | string  | 'none' | 'none',  'opacity' |
|**lang**        | localization signatures timer (days, hours, minutes, seconds) | string  | 'eng'  | 'eng',  'rus' |
|**periodic**    | *true* - the timer is periodic. If the date until which counts the timer is reached, the next value date which will count down the timer is incremented by the value **periodInterval** | boolean | false |  |
|**periodInterval**| the period of the timer in **periodUnit** (if **periodic** is set to *true*) | integer | 7 | >0 |
|**periodUnit**  | the unit of measurement period timer | string | 'd' | 'd',  'h',  'm',  's' |


## Methods

The use of the methods has the following syntax:

```javascript
$('.your_selector_to_countdown').syotimer(nameOfMethod, param1, param2, ... , paramN);
```

### setOption

`setOption` - assigns a value to the option

**Parameters:**

1. Name of option

1. Value

**Code examples:**

```javascript
$('.your_selector_to_countdown').syotimer('setOption', 'effectType', 'opacity');
```


## About summer/winter time

In some countries, there are the division between summer and winter time. This artifact may affect the correct operation of the countdown when the difference between the current time and the deadline is very large.

For example, used a timer with a period of one day, for which the deadline set on the winter time. Then for users from New York in the summer this timer will produce an error for 1 hour.

To exclude these cases set `ignoreTransferTime` to `false`.


## Version History

* **1.1.0** *2016-07-30*
    - added time zone support
    - added support of the time transfer on summer/winter time
    - added methods support
    - added method of set value to option
    - added minified version of plugin
* **1.0.1** *2015-02-24*
    - added option for change effect of counting
    - added documentation
    - added examples
* **1.0.0** *2014-12-10*
    - first use timer on real web-site
