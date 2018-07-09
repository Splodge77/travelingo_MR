const Highcharts = require("highcharts/highmaps");

const worldMap = require("../resources/world_robinson.js");

const LocationMap = function () {
  this.map = null;
};


LocationMap.prototype.createCommonLanguageCountries = function (container, countriesWhereTargetIsSpokenArray, selectedCountry){
  const countryCodeArray = countriesWhereTargetIsSpokenArray.map( function (country) {
    let selectedCountryCode = selectedCountry.alpha2Code.toLowerCase()
    let countryCode = country.alpha2Code.toLowerCase();
    let requiredData = [];
    if (countryCode === selectedCountryCode){
      requiredData = [countryCode, 40];
    } else {
      requiredData = [countryCode, 20];
    }
    return requiredData;
  });
  const mapDataObject =
  {
    chart: {
      map: worldMap,
      borderWidth: 0
    },
    title: {
      text: "Where you will be understood"
    },
    subtitle: {
      text: ""
    },

    legend: {
      enabled: false
    },

    colorAxis: {
            min: 0,
            max: 50,
            type: 'linear'
    },

    series: [{
      enableMouseTracking: false,
      data:
      countryCodeArray
    }],

  };
  const map = Highcharts.mapChart(container, mapDataObject);
  this.map = map;
};



module.exports = LocationMap;
