const languageCodes = require ("../resources/language_codes");

const CountryList = function(url) { // is it a list?
  this.countries = [];
  this.onUpdate = null;
  this.url = url;
};

CountryList.prototype.populate = function(){
  // let filteredCountries = [{"languages": [
  //   { "iso639_1": "en", "name": ""} ] , name: "Select destination country", index: 0}];

  let filteredCountries = [];
  const request = new XMLHttpRequest();
  request.open("GET", this.url);
  request.onload = function() {
    if (request.status === 200) {
      const jsonString = request.responseText;
      const countries = JSON.parse(jsonString);
      this.countries = countries;
      this.countries.forEach(function(country){
        //.filter
        if (languageCodes.includes(country.languages[0].iso639_1)){
          filteredCountries.push(country);
        }
      });
      this.onUpdate(filteredCountries);
    }
  }.bind(this);
  request.send(null);
};

CountryList.prototype.getCommonLanguage = function (languageCode) {
  const newCountries = this.countries.filter( function (country) {
    const spokenLanguages = country.languages.map( function (language) {
      return language.iso639_1;
    });
    return spokenLanguages.includes(languageCode);
  });
  return newCountries;
};



module.exports = CountryList;
