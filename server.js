const express = require("express");
const app = express();
const translate = require("google-translate-api");
const bodyParser = require("body-parser");
const path = require("path");
const phraseList = require("./client/src/models/phrase_list");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.post("/translate_api/", function (req, expressResponse) {

  const languageToTranslateTo = req.body.language;
  const promises = phraseList.map( function (phraseToTranslate) {
    return translate(phraseToTranslate, {to: languageToTranslateTo});
  });

  Promise.all(promises)
  // values is the array which results from the promises being fulfilled
  .then( function (values) {
    const phrases = values.map( function (value) {
      return value.text;
    });
    expressResponse.json({data: phrases});

  })
  .catch(err => {
    console.error("console error", err);
  });
});

app.post("/translate_api/single_phrase/", function (req, expressResponse) {


  const languageToTranslateTo = req.body.language;
  const bodyPhrase = req.body.phrase;

  translate(bodyPhrase, {from: "en", to: languageToTranslateTo}).then(translateResponse => {
      const aPhrase = translateResponse.text;
      expressResponse.json({data: aPhrase});

    }).catch(err => {
      console.error("console error", err);
    });

});

app.use(express.static("client/build"));
app.use(require(__dirname + "/controllers/phrases_controller"))

const server = app.listen(3000, function () {
  console.log("traveLingo listening at " + this.address().port);
});
