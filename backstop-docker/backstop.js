// This script will make changes to the overall Backstop.
const pages = require('./page');
const environments = require('./environment');

function parseOpt(optname, defaultValue = undefined) {
  const matches = process.argv.filter(arg => arg.indexOf(`--${optname}=`) === 0);
  return matches.length ? matches[0].replace(`--${optname}=`, '') : defaultValue
}

// Determine the proper environment to point at.
const target = parseOpt('target', 'local');
let environment;
if(target in environments) {
  environment = environments[target];
}
// Detect appserver URL from LANDO_INFO if possible.
else if(target === 'local' && process.env.LANDO_INFO) {
  const info = JSON.parse(process.env.LANDO_INFO);
  if(info.appserver_nginx && info.appserver_nginx.urls.length > 0) {
    const url = info.appserver_nginx.urls.pop();
    environment = {name: "Local", url: url}
  }
  else if(info.appserver && info.appserver.urls.length > 0) {
    const url = info.appserver.urls.pop();
    environment = {name: "Local", url: url}
  }
}
else if(target.match(/^http:/)) {
  environment = {name: 'Local', url: target}
}
else {
  throw new Error(`--target flag must be set to a known environment or a URL. ${target} is not known.`)
}

// Creates the URL and labels that are used during the process.
// The misMatchThresold can be change to show diffs in the comparison of screen captures.
const scenarios = pages.map(function(page) {
  return {
    label: page.label,
    url: `${environment.url}${page.url}`,
    misMatchThreshold: 0.05,
    selectors: page.backstopSelectors || []
  }
});

// The viewports can be added if needed.
module.exports = {
  id: 'regression',
  viewports: [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    },
    {
      "label": "desktop",
      "width": 1920,
      "height": 1080
    }
  ],
  "scenarios": scenarios,
  "paths": {
    "bitmaps_reference": `${__dirname}/reference`,
    "bitmaps_test": `${__dirname}/runs`,
    "engine_scripts": `${__dirname}/scripts`,
    "html_report": `${__dirname}/report`,
    "ci_report": `${__dirname}/report`,
  },
  "onBeforeScript": "before.js",
  "onReadyScript": "ready.js",
  "report": ["browser"],
  "engine": "puppeteer",
  "engineFlags": [],
  "engineOptions": {
    "ignoreHTTPSErrors": true,
    "args": [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--enable-features=NetworkService",
      "--ignore-certificate-errors"
    ]
  },
  "asyncCaptureLimit": 3,
  "asyncCompareLimit": 10,
  "debug": false,
  "debugWindow": false
}
