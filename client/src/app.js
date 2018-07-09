const CountriesSelectView = require("./views/countries_select_view");
const CountryList = require("./models/country_list");
const phraseList = require("./models/phrase_list");
const Request = require("./services/request");
const WeatherDisplay = require("./models/weather_display");
const LocationMap = require("./models/location_map");
const TextToSpeech = require("./models/text_to_speech.js");
const textToSpeech = new TextToSpeech();

const app = function(){

  textToSpeech.getVoices();
  if (typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = textToSpeech.getVoices;
  }

  const getCustomPhraseButton = document.querySelector("#submit-phrase");
  getCustomPhraseButton.addEventListener("click", getCustomPhraseButtonClicked);

  const countriesSelectView = new CountriesSelectView(document.querySelector("#countries"));

  const countriesUrl = "https://restcountries.eu/rest/v2/all?fields=name;languages;flag;capital;latlng;alpha2Code";
  const countryList = new CountryList(countriesUrl);

  countryList.onUpdate = function(countries) {
    countriesSelectView.render(countries);
  };
  countryList.populate();

  countriesSelectView.onChange = function(country){
    const targetLanguageCode = country.languages[0].iso639_1;

    // find out where else that language is spoken:
    const countriesWhereTargetIsSpoken = countryList.getCommonLanguage(targetLanguageCode);

    localStorage.setItem("targetLanguage", targetLanguageCode);
    const flag_src = country.flag;
    const countryName = country.name;
    const countryCapital = country.capital;
    const country_alpha2Code = country.alpha2Code;
    const speechLanguage =  targetLanguageCode + "-" + country_alpha2Code;
    localStorage.setItem("speechLanguage", speechLanguage);
    const phraseTable = document.getElementById("phrase-table-id");
    phraseTable.hidden = false;
    const tableBody = document.getElementById("phrase-table-body");
    tableBody.innerText = "";
    const inputPhraseSection = document.getElementById("input-phrase-section");
    inputPhraseSection.hidden = false;
    if (targetLanguageCode != "en"){
      buildPhraseTable(country);
      // see if there is  db entry for this languageCode
      const requestURL = "http://localhost:3000/phrases/" + targetLanguageCode ;
      const mongoRequest = new Request(requestURL);
      mongoRequest.get(languagePresentRequestComplete);
    } else clearPhraseTable();

    createFlag(flag_src, countryName);
    const localWeatherDisplay = new WeatherDisplay();
    localWeatherDisplay.create(countryCapital);

    const mapDiv = document.getElementById("map");
    mapDiv.hidden = false;
    const countryLocationMap = new LocationMap();

    countryLocationMap.createCommonLanguageCountries("map",countriesWhereTargetIsSpoken, country);

  };
};





const languagePresentRequestComplete = function(allPhrases){

  if (allPhrases.length === 0){
    const targetLanguageCode = localStorage.getItem("targetLanguage");
    const request = new XMLHttpRequest();
    request.open("POST", "/translate_api/");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onload = translateRequestComplete;
    const requestBody = {language: targetLanguageCode, phrase: "n/a" };
    request.send(JSON.stringify(requestBody));
  } else {
    for (let i=0; i < allPhrases.length; i++){
      const originalPhrase = allPhrases[i].originalPhrase;
      const translatedPhrase = allPhrases[i].translatedPhrase;
      appendTranslationPair (originalPhrase, translatedPhrase);
    }
  }
};

const translateRequestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const translatedPhraseArray = JSON.parse(jsonString);

  for (let i=0; i < translatedPhraseArray.data.length; i++){

    const originalPhrase = phraseList[i];
    const translatedPhrase = translatedPhraseArray.data[i];
    savePhrasePair(originalPhrase, translatedPhrase);
  }
};

const buildPhraseTable = function(country){
  const homeLanguage = document.getElementById("home-language");
  homeLanguage.innerText = "English";
  const targetLanguage = document.getElementById("target-language");
  targetLanguage.innerText = country.languages[0].name;
};

const clearPhraseTable = function(){
  const homeLanguage = document.getElementById("home-language");
  homeLanguage.innerText = "";
  const targetLanguage = document.getElementById("target-language");
  targetLanguage.innerText = "";

};

const createFlag = function(flagImage, countryName){
  const div = document.getElementById("flag-id");
  div.innerHTML = "";
  const img = document.createElement("img");
  img.src = flagImage;
  img.id = "flag-image";
  img.alt = "Flag of " + countryName;
  div.appendChild(img);
};



const getCustomPhraseButtonClicked = function(){
  const phraseInput = document.getElementById("phrase-input");
  const phraseToTranslate = phraseInput.value;
  const languageCode = localStorage.getItem("targetLanguage");

  const requestPhrase = new XMLHttpRequest();
  requestPhrase.open("POST", "/translate_api/single_phrase/");
  requestPhrase.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  requestPhrase.onload = requestCompleteSinglePhrase;
  const requestBody = {language: languageCode, phrase: phraseToTranslate};
  requestPhrase.send(JSON.stringify(requestBody));
  event.preventDefault(); // ensures that the standard form action on button click does not get called
};

const requestCompleteSinglePhrase = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const translatedPhrase = JSON.parse(jsonString).data;
  const originalPhrase = document.getElementById("phrase-input").value;
  const speechLanguage  = localStorage.getItem("speechLanguage");

  textToSpeech.speakPhrase(translatedPhrase, speechLanguage);

  savePhrasePair(originalPhrase, translatedPhrase);
};

const savePhrasePair = function(originalPhrase, translatedPhrase){

  const languageCode = localStorage.getItem("targetLanguage");

  const requestURL = "http://localhost:3000/phrases/" + languageCode ;
  const mongoRequest = new Request(requestURL);
  const bodyToSend = {originalPhrase: originalPhrase, translatedPhrase: translatedPhrase };
  mongoRequest.post(mongoRequestComplete, bodyToSend);
  appendTranslationPair(originalPhrase, translatedPhrase);
};


const appendTranslationPair = function(originalPhrase, translatedPhrase){
  const languageCode = localStorage.getItem("targetLanguage");

  const tableBody = document.getElementById("phrase-table-body");

  const tableRow = document.createElement("tr");
  tableRow.setAttribute("id", translatedPhrase);
  const originalPhraseTag = document.createElement("td");
  originalPhraseTag.innerText = originalPhrase;
  const translatedPhraseTag = document.createElement("td");

  const speakButtonCell = document.createElement("td");
  const speakButton = document.createElement("button");
  speakButton.addEventListener("click", function() {
    speakButtonClicked(translatedPhrase);
  });
  speakButton.innerText = "speak";
  speakButtonCell.appendChild(speakButton);

  const deleteButtonCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", function(){
    deleteButtonClicked(languageCode, translatedPhrase);
  });
  deleteButton.innerText = "delete";
  deleteButtonCell.appendChild(deleteButton);


  translatedPhraseTag.setAttribute("lang", languageCode);
  translatedPhraseTag.innerText = translatedPhrase;

  tableRow.appendChild(originalPhraseTag);
  tableRow.appendChild(translatedPhraseTag);
  tableRow.appendChild(speakButtonCell);
  tableRow.appendChild(deleteButtonCell);
  tableBody.appendChild(tableRow);

};

const mongoRequestComplete = function(){
  console.log("mongo post complete");
};

const speakButtonClicked = function(translatedPhrase){
  const speechLanguage = localStorage.getItem("speechLanguage");

  textToSpeech.speakPhrase(translatedPhrase, speechLanguage);
};

const deleteButtonClicked = function(languageCode, translatedPhrase){
  const encodedPhrase = encodeURIComponent(translatedPhrase);
  const requestURL = "http://localhost:3000/phrases/" + languageCode +"/"+ encodedPhrase ;
  const mongoRequest = new Request(requestURL);
  mongoRequest.delete(mongoRequestComplete);
  const rowToRemove = document.getElementById(translatedPhrase);
  rowToRemove.innerHTML = "";
};


document.addEventListener("DOMContentLoaded", app);
