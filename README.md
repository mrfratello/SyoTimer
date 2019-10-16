# jQuery SyoTimer Plugin

jQuery plugin of countdown on html page


## Demo

[Examples of usage jQuery SyoTimer Plugin](http://syomochkin.xyz/folio/syotimer/demo.html)


## Features

* Periodic counting with the specified period
* Effects of change of indications of the countdown
* The correct declension of nouns next to numeral numerals
* An opportunity to add the language of countdown signatures which isn't included in the standard version of the plugin
* Callback after the end of the countdown timer with the possibility of changing the structure of the timer
* Custom formatting and styling timer


## Installing

In a browser. Need download the [latest release](https://github.com/mrfratello/syotimer/releases/latest). And include the JavaScript file which you can find in the `build` folder:

```html
<script type="text/javascript" src="path/to/jquery.js"></script>
<script type="text/javascript" src="path/to/jquery.syotimer.min.js"></script>
```

Using npm:

```
$ npm install jquery-syotimer
```

Using yarn:

```
$ yarn add jquery-syotimer
```


## Usage

Syotimer plugin can be integrated with plain JavaScript or with different module loaders.

Script Tag:

```html
<script type="text/javascript">
    jQuery(function($) {
        $('.selector_to_countdown').syotimer();
    });
</script>
```

Common JS:

```javascript
const $ = require('jquery');
require('jquery-syotimer');

$('.selector_to_countdown').syotimer();
```

Bundlers (Webpack, etc):

```javascript
import $ from 'jquery';
import 'jquery-syotimer';

$('.selector_to_countdown').syotimer();
```


## Markup

Classes is named by [BEM methodology](https://en.bem.info/methodology/naming-convention/)

```html
<div class="syotimer">
    <div class="syotimer__head"></div>
    <div class="syotimer__body">
        <div class="syotimer__item syotimer-cell syotimer-cell_type_day">
            <div class="syotimer-cell__value">1</div>
            <div class="syotimer-cell__unit">day</div>
        </div>
        <div class="syotimer__item syotimer-cell syotimer-cell_type_hour">
            <div class="syotimer-cell__value">1</div>
            <div class="syotimer-cell__unit">hour</div>
        </div>
        <div class="syotimer__item syotimer-cell syotimer-cell_type_minute">
            <div class="syotimer-cell__value">1</div>
            <div class="syotimer-cell__unit">minute</div>
        </div>
        <div class="syotimer__item syotimer-cell syotimer-cell_type_second">
            <div class="syotimer-cell__value">1</div>
            <div class="syotimer-cell__unit">second</div>
        </div>
    </div>
    <div class="syotimer__footer"></div>
</div>
```

Example of css styles for syotimer in [resources/default.css](resources/default.css).


## Options

| Option               | Description                                                                                                                                                                           | Type of Value | Default Value | Available Values      |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------|-----------------------|
| `year`               | year of date, which should count down timer                                                                                                                                           | integer       | 2014          | >1979                 |
| `month`              | month of date, which should count down timer                                                                                                                                          | integer       | 7             | 1-12                  |
| `day`                | day of date, which should count down timer                                                                                                                                            | integer       | 31            | 1-31                  |
| `hour`               | hour of date, which should count down timer                                                                                                                                           | integer       | 0             | 0-23                  |
| `minute`             | minute of date, which should count down timer                                                                                                                                         | integer       | 0             | 0-59                  |
| `second`             | second of date, which should count down timer                                                                                                                                         | integer       | 0             | 0-59                  |
| `layout`             | sets an order of layout of units of the timer: days (d) of hours ('h'), minute ('m'), second ('s').                                                                                   | string        | 'dhms'        |                       |
| `timeZone`           | setting the time zone of deadline. If '_local_' then the time zone is ignored and the deadline is determined by local time of the user. Otherwise, specifies the offset from the UTC  | float/string  | 'local'       | 'local', >-12 && <12  |
| `ignoreTransferTime` | If `true` then transfer to summer/winter time will not be considered. For details, see "About summer/winter time"                                                                     | boolean       | false         |                       |
| `doubleNumbers`      | `true` - show hours, minutes and seconds with leading zeros (2 hours 5 minutes 4 seconds = 02:05:04)                                                                                  | boolean       | true          |                       |
| `effectType`         | The effect of changing the value of seconds                                                                                                                                           | string        | 'none'        | 'none',  'opacity'    |
| `lang`               | localization of a countdown signatures (days, hours, minutes, seconds)                                                                                                                | string        | 'eng'         | see "Localization"    |
| `periodic`           | `true` - the timer is periodic. If the date until which counts the timer is reached, the next value date which will count down the timer is incremented by the value `periodInterval` | boolean       | false         |                       |
| `periodInterval`     | the period of the timer in `periodUnit` (if `periodic` is set to `true`)                                                                                                              | integer       | 7             | >0                    |
| `periodUnit`         | the unit of measurement period timer                                                                                                                                                  | string        | 'd'           | 'd',  'h',  'm',  's' |


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

## Localization

### Default languages

By default the supported plugin languages:

| Language   | Value of `lang` option |
|------------|------------------------|
| English    | 'eng'                  |
| Russian    | 'rus'                  |
| Spanish    | 'spa'                  |
| Portuguese | 'por'                  |
| Hebrew     | 'heb'                  |

### Adding new language

It is very simple to execute localization of a plugin under the language. You need to add the translations of signatures to timer elements as the parameter of an object of `$.syotimerLang`. Then you need determine a new language in the syotimer options. For example we will add support of Spanish (though this language is supported by default):

```javascript
$.syotimerLang.spa = {
    seconds: ['segundo', 'segundos'],
    minute: ['minuto', 'minutos'],
    hour: ['hora', 'horas'],
    day: ['dia', 'dias']
};

$('.your_selector_to_countdown').syotimer({
    lang: 'spa'
});
```

### Inducement of a noun after a numeral

At the majority of languages a simple algorithm of determination of inducement of a noun after a numeral. If numeral is equal `1` then need input first element from array. Otherwise - second element.

But there are languages in which more difficult rules of determination of the correct inducement of nouns after a numeral (for example, Russian).

For example, consider a completely synthetic language (let it be called "Nenglish"). It is very similar to English but there are significant differences in the spelling of nouns after numerals. Namely, the difference in the suffixes of these nouns:

- if the number ends with the digit `1` then to the noun added the suffix "one" (21 secondone, 1 minuteone, ...);
- if the number ends with the digit `5` then the suffix is equal "five" (35 hourfive, 5 secondfive);
- otherwise the suffix is equal to "s" (24 minutes, 3 days).

To add a Nenglish in Syotimer need first add all possible variants of a writing of the captions of the items of the plugin. The abbreviated name of the language will take "neng":

```javascript
$.syotimerLang.neng = {
    second: ['secondone', 'secondfive', 'seconds'],
    minute: ['minuteone', 'minutefive', 'minutes'],
    hour: ['hourone', 'hourfive', 'hours'],
    day: ['dayone', 'dayfive', 'days'],
    handler: 'nengNumeral'
};
```

The "handler" must contain a name of method that receive the one argument is a number. This method should return the array index that determines the correct variant of the noun:

```javascript
$.syotimerLang.nengNumeral = function(number) {
    var lastDigit = number % 10;
    if ( lastDigit === 1 ) {
        return 0;
    } else if ( lastDigit === 5) {
        return 1;
    } else {
        return 2;
    }
};
```

Then only have to specify the language when you create the instance Syotimer:

```javascript
$('.your_selector_to_countdown').syotimer({
    lang: 'neng'
});
```


## About summer/winter time

In some countries, there are the division between summer and winter time. This artifact may affect the correct operation of the countdown when the difference between the current time and the deadline is very large.

For example, used a timer with a period of one day, for which the deadline set on the winter time. Then for users from New York in the summer this timer will produce an error for 1 hour.

To exclude these cases set `ignoreTransferTime` to `false`.


## Requirements

jQuery SyoTimer Plugin has been tested with jQuery 1.7+ on all major browsers:

+ Firefox 2+ (Win, Mac, Linux);
+ IE8+ (Win);
+ Chrome 6+ (Win, Mac, Linux, Android, iPhone);
+ Safari 3.2+ (Win, Mac, iPhone);
+ Opera 8+ (Win, Mac, Linux, Android, iPhone).


## Version History

+ **2.1.1** _2019-10-17_

    - publish on npm
    - used universal module definition
    - added default CSS styles

+ **2.0.0** _2017-06-24_

    - redesigned the structure of a plugin
    - `effectType` applies to all units
    - added possibility to sets an order of layout of units of the timer
    - added possibility to add new language
    - rename CSS classes by BEM methodology

+ **1.1.0** _2016-07-30_

    - added time zone support
    - added support of the time transfer on summer/winter time
    - added methods support
    - added method of set value to option
    - added minified version of plugin

+ **1.0.1** _2015-02-24_

    - added option for change effect of counting
    - added documentation
    - added examples

+ **1.0.0** _2014-12-10_

    - first use timer on real web-site


Gratitude to [Yuri Danilchenko](https://github.com/yuri-danilchenko) and Elena Levin.