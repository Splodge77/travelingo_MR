# User journey for MVP

## First visit:
1. User is given option to add name and home language on first visit - this is persisted to local storage?
2. Call to restful countries API to get list of countries and default language for each Country
3. Data used to populate dropdown list  
4. Selecting a country option results in a selected language
5. PHRASES hardcoded object contains the top 10 travel phrases in English
6. API call to google translate results in phrases translated to selected language
7. View is generated to display translated phrases
8. User is given an option to save the country / language and phrases for offline use
9. Data is saved for offline use


## Subsequent visits
1. User name and home language are used to generate greeting in home language
2. If they have saved phrases these are displayed immediately
3. User is given option to choose a different country/language
4. If they change language, MVP would give option to save this and over-write the original saved phrases
5. Extension would be to add the language and phrases to their saved collection of language/country/phrases
