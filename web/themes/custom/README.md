Examples of using BackstopJS with Mannequin
======================

Mannequin is a Component Theming Tool from Last Call Media. Here is a blog about
 [Mannequin](https://lastcallmedia.com/blog/introducing-mannequin).

## Understanding BackstopJS NPM

All information and examples for BackstopJS is under the [backstop_data](/web/themes/custom/scaffold/backstop_data).

Describe each section under backstop_data:
- bitmaps_reference - References (before or baseline) for each run of reference backstop.
- bitmaps_test - Test (after or comparison) for each run of test in backstop.
- engine_scripts - Find the onReady.js or onBefore.js with each headless browser.
- html_report - This directory has the config.js and index.html files.
To adjust the config.js tell what, how, and where to run backstop. The index.html to show the results from the run of backstop with reference and test.


## How to run the example?

First need to have lando up and running.

Here is the following order to capture and view results from BackstopJS:

-  `backstop ref` - references screen captures
- `backstop test` - test screen captures
- `open backstop/report/index.html` - view the results from BackstopJS


