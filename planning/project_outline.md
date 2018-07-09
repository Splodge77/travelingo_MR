# Multi-Language Travel Phrase Web App - High Level Design


## MVP

### Welcome page
 - on 1st visit of app allows user to enter their name and home country

### Translation View
- Provide a drop down list of destination countries.  
- On country selection displays the country’s default language and top 10 travel phrases.
- Provide an option to save favourite country/language pairing & phrases for later use.


## Extensions

### Priority
- On subsequent visits to web app displays welcome greeting in home language e.g. “Bonjour Jean-Marie”
- Create a settings option to allow user to change name and home country
- User can enter their own phrase to translate and save if desired
- Map view showing visited countries / planned journeys
  - this could also be shown in the text version with a simple flag

### Consider
- User can set the display order of phrases
- Map interaction to show country information
- Text to speech output for pronunciation
- Local weather
- Local timezones


## APIs

#### Country language API
-  https://www.npmjs.com/package/country-language

#### Google Translate
- https://www.npmjs.com/package/google-translate-api

#### Something with country/language links

#### Potentially Google Maps or HighCharts Maps
- something where a user could click on a country to select it and/or get information?
- a map with the chosen country highlighted?

#### Text to Speech

## Reference
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://developers.google.com/web/fundamentals/primers/promises
