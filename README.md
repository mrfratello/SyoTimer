jQuery SyoTimer Plugin
========

jQuery plugin of countdown on html-page


### Requirements

jQuery SyoTimer Plugin has been tested with jQuery 1.7+ on all major browsers:
* Firefox 2+ (Win, Mac, Linux);
* IE8+ (Win);
* Chrome 6+ (Win, Mac, Linux, Android, iPhone);
* Safari 3.2+ (Win, Mac, iPhone);
* Opera 8+ (Win, Mac, Linux, Android, iPhone).


### Features

* Callback after the end of the countdown timer with the possibility of changing the structure of the timer
* Periodic counting with the specified period
* The effect of fading in the countdown
* The correct declension of nouns next to numeral numerals
* Custom formatting and styling timer


### How to use



### Options

|Option          |   Description                         | Type of Value | Default Value | Available Values |
| -------------- | ------------------------------------- | ------------- | ------------- | ---------------- |
|**year**        | year of date, which should count down timer | integer | 2014 | >1979 |
|**month**       | month of date, which should count down timer | integer | 7 | 1-12|
|**day**         | day of date, which should count down timer | integer | 31 | 1-31 |
|**hour**        | hour of date, which should count down timer | integer | 0 | 0-23 |
|**minute**      | minute of date, which should count down timer | integer | 0 | 0-59 |
|**second**      | second of date, which should count down timer | integer | 0 | 0-59 |
|**timeZone**    | setting the time zone of deadline. If `local` then the time zone is ignored and the deadline is determined by local time of the user. Otherwise, specifies the offset from the UTC | float/string | 'local' | 'local', >-12 && <12 |
|**ignoreTransferTime**|  | boolean | false |  |
|**dayVisible**  | *true* - show the number of days.  *false* - the number of days is not shown in the timer and the number of hours may exceed 23 | boolean | true |  |
|**doubleNumbers**| *true* - show hours, minutes and seconds with leading zeros (2 hours 5 minutes 4 seconds = 02:05:04) | boolean | true |  |
|**dubleNumbers** (deprecated)| *true* - show hours, minutes and seconds with leading zeros (2 hours 5 minutes 4 seconds = 02:05:04) | boolean | true |  |
|**effectType**  | The effect of changing the value of seconds | string  | 'none' | 'none',  'opacity' |
|**lang**        | localization signatures timer (days, hours, minutes, seconds) | string  | 'eng'  | 'eng',  'rus' |
|**periodic**    | *true* - the timer is periodic. If the date until which counts the timer is reached, the next value date which will count down the timer is incremented by the value **periodInterval** | boolean | false |  |
|**periodInterval**| the period of the timer in **periodUnit** (if **periodic** is set to *true*) | integer | 7 | >0 |
|**periodUnit**  | the unit of measurement period timer | string | 'd' | 'd',  'h',  'm',  's' |


### HTML Structure of SyoTimer

```html
<div class="timer">
    <div class="timer-head-block"></div>
    <div class="timer-body-block">
        <div class="table-cell day">
            <div class="tab-val">1</div>
            <div class="tab-unit">day</div>
        </div>
        <div class="table-cell hour">
            <div class="tab-val">1</div>
            <div class="tab-unit">hour</div>
        </div>
        <div class="table-cell minute">
            <div class="tab-val">1</div>
            <div class="tab-unit">minute</div>
        </div>
        <div class="table-cell second">
            <div class="tab-val">1</div>
            <div class="tab-unit">second</div>
        </div>
    </div>
    <div class="timer-foot-block"></div>
</div>
```
### Demo

[Examples of usage jQuery SyoTimer Plugin](http://syomochkin.xyz/folio/syotimer/demo.html)

### Version History

* **1.1.0** *2016-07-30*
    - added option 'timeZone'
    - added support for methods
    - added method of set value to option
    - added minified version of plugin
* **1.0.1** *2015-02-24*
    - added option for change effect of counting
    - added documentation
    - added examples
* **1.0.0** *2014-12-10*
    - first use timer on real web-site
