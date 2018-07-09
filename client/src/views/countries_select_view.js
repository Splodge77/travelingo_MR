const CountrySelectView = function(selectElement) {
  this.selectElement = selectElement;
  this.onChange = undefined;
  this.countries = [];
  // this.filteredCountries = [];
  this.selectElement.addEventListener("change", function (e) {
    const target = e.target;
    const index = target.selectedIndex - 1;
    const country = this.countries[index];
    this.onChange(country);
  }.bind(this), false);
};

CountrySelectView.prototype.render = function(filteredCountries){
  this.countries = filteredCountries;
  this.countries.forEach(function(country, index) {
    country.index = index;
    this.addOption(country, index);
  }.bind(this));
};

CountrySelectView.prototype.addOption = function(country, index){
  const option = document.createElement("option");
  option.value = index;
  option.text = country.name + " - " + country.languages[0].name;
  this.selectElement.appendChild(option);
};

module.exports = CountrySelectView;
