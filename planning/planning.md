# JavaScript Project Specs


## Shares App

A local trader has come to you with a portfolio of shares. She wants to be able to analyse it more effectively. She has a small sample data set to give you and would like you to build a minimal viable product (MVP) that uses the data to display her portfolio in useful ways so that she can make better decisions.

### MVP

 - View total current value
 - View individual and total performance trends
 - Retrieve a list of share prices from an external API and allow the user to add shares to her portfolio
 - Provide a chart of the current values in her portfolio

### Examples of further features

Speculation based on trends and further financial modelling.

  - Based on the last 6 weeks of data, (e.g. it reduced by 5%) predict the performance of a stock for the next 6 weeks. Based on that what would be the sum of the total on a certain day in the future.

  - She wants to know what would happen to the value of her portfolio if the price of a share changed by 10% or if she reduced her quantity by 15%.
  - What price does a stock have to get to in order to meet her investment target?
  - To get her £1700 worth of RBS shares what price does it have to go to?
  - Buy new shares
  - Sell shares

  ### Example API
   https://www.alphavantage.co/ (Requires sign up)

## Flightr

A new start-up Flightr, has spotted a niche in the Flight + Hotel comparison web app market. It realises it can simultaneously compare flights and hotels to offer the best package possible.

It wants a user to be able to reach our web app and input a departure date and return date and then display possible flight + hotel options. Once searched, it would calculate the available options of flights and represent the data analytically to show travel times or perhaps best value options. It will also display hotel options nearby and a total package price for return flights and hotel nights based on the user input.

Flightr have explored the idea and has come up with some sample data for you to start with, based on flights from Edinburgh. You can add to the data supplied if you wish. They would like the MVP built as soon as possible along with any other features you can implement.

### MVP

- User can search by departure and return dates
- User can view available flight and hotel options for their dates
- User can sort flight & hotel packages by price
- User can add packages to a favourites list

## Sports Dashboard

Sports fans want to be able to view relevant sporting events on a dashboard. With a sport of your choice, use an existing API or create a new API to display information about fixtures, news and travel information for events.

Possible APIs to use:

- UFC: http://ufc-data-api.ufc.com/api/v1/us
- Football: http://api.football-data.org/index
- Triathalon: https://developers.triathlon.org/docs

### MVP

 - Display upcoming events on a map
 - Display results and ranking of players/teams
 - Allow users to add events to a favourites list

## Educational App

The BBC are looking to improve their online offering of educational content by developing some interactive apps that display information in a fun and interesting way.

Your task is to make an MVP to put forward to them - this may only be for a small set of information, and may only showcase some of the features to be included in the final app. You might use an API to bring in content or a database to store facts. The topic of the app is your choice, but here are some suggestions you could look into:

- Interactive timeline, e.g. of the history of computer programming
- Interactive map of a historical event - e.g. World War 1, the travels of Christopher Columbus

### MVP

- Display some information about a particular topic in an interesting way
- Have some user interactivity using event listeners, e.g to move through different sections of content

Some samples of existing apps for inspiration:

- http://chemistryset.chemheritage.org/#/
- http://www.royalmailheritage.com/main.php
- http://education.iceandsky.com/
- http://histography.io - may only work in Safari
- http://worldpopulationhistory.org/map/1838/mercator/1/0/24/


## Store Finder

Global pub giant Withoutaspoon, wants a pub finder that allows users to "Find your nearest pub" for their website.

User should be able to enter their postcode or town or street name and get a list of the top ten nearest stores. Each pub should have a distance, address, phone number, opening hours and a list of facilities and services (e.g. cash machine, car parking).

You'll have to build your own API to persist the store data and use an external api to find addresses from postcodes.

### MVP

- Search by postcode or town or street name
- A list of pubs including the details of the pubs
- A map marking the stores
- Use Geolocation to allow users to "use current location" to find stores

E.G. www.marksandspencer.com/mn/storeLocator

## Browser Game

Create a browser game based on an existing card or dice game. Model the game logic and then display it in the browser for a user to interact with.

Make your own MVP with some specific goals to be achieved based on the game you choose to model.

You might use persistence to keep track of the state of the game or track scores/wins. Other extended features will depend on the game you choose.
