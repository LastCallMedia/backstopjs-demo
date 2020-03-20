report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Grid_of_Cards_0_document_0_desktop.png",
        "test": "../bitmaps_test/20200319-145644/backstop_default_Grid_of_Cards_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "backstop_default_Grid_of_Cards_0_document_0_desktop.png",
        "label": "Grid of Cards",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://mannequin.lndo.site/m-render/babea2a0c7900e6c1c3de42ee0f8724f/Default.html",
        "referenceUrl": "http://mannequin.lndo.site/m-render/ba05dc39e8240611cf78965386286f49/Default.html",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "11.11",
          "analysisTime": 44
        },
        "diffImage": "../bitmaps_test/20200319-145644/failed_diff_backstop_default_Grid_of_Cards_0_document_0_desktop.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});