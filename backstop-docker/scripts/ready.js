/**
 * Ready script, fires after pages have loaded, but before screenshots are captured.
 *
 * This script is used to hide or modify highly dynamic elements that may cause trouble
 * during visual regression testing.  If you are constantly seeing trivial failures for
 * an element, you can probably deal with it here.
 */
module.exports = async function(page, scenario, vp) {
  await page.addStyleTag({
    content: '' +
      // Kill reCAPTCHA display (show black box instead)
      '.g-recaptcha {' +
      '  background: green;\n' +
      '  content: \'\';\n' +
      '  display: block;\n' +
      '  visibility: hidden;\n' +
      '  top: 0;\n' +
      '  left: 0;\n' +
      '  right: 0;\n' +
      '  bottom: 0;\n' +
      '  z-index: 100;\n' +
      '}'
  })
  // await page.evaluate(function (url) {
  //   if (!window.jQuery) {
  //     throw new Error(`jQuery was not found. This is usually caused by the server returning a 500 response. Please check ${url} in your browser.`);
  //   }
  //   // Disable jQuery animation for any future calls.
  //   jQuery.fx.off = true;
  //   // Immediately complete any in-progress animations.
  //   jQuery(':animated').finish();
  //
  //   document.querySelectorAll('img[src]').forEach(function(img) {
  //     if (img.src.match(/\.gif$/)) {
  //       // Hide the all gif images (display: none)
  //       img.style.display = "none";
  //     }
  //   });
  // }, scenario.url);

  // Finally, wait for ajax to complete - this is to give alerts
  // time to finish rendering. This can take a while, especially
  // in local environments.
  // await page.waitForFunction('jQuery.active == 0');

  // Add a slight delay.  This covers up some of the jitter caused
  // by weird network conditions, slow javascript, etc. We should
  // work to reduce this number, since it represents instability
  // in our styling.
  await page.waitFor(10000);
}
