const express = require("express");
const phrasesRouter = express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/travel_lingo";

MongoClient.connect(url, function(err, client){
  console.log("error log:", err);
  const db = client.db("travel_lingo");

  // Gets all phrases for the language code
  phrasesRouter.get("/phrases/:languageCode", function(req, res){
    const languageCode = req.params.languageCode;
    const collection = db.collection(languageCode);
    collection.find({}).toArray(function(err, docs){
      res.json(docs);
    })
  })

  // Create one phrase for language code
  phrasesRouter.post("/phrases/:languageCode", function(req, res){
    const languageCode = req.params.languageCode;
    const collection = db.collection(languageCode);
    collection.insert({originalPhrase: req.body.originalPhrase, translatedPhrase: req.body.translatedPhrase});
    res.status(201);
    res.send();
  })

  // Delete All route - Deletes all phrases in a language collection

  phrasesRouter.delete("/phrases/:languageCode", function(req, res){
    const languageCode = req.params.languageCode;
    const collection = db.collection(languageCode);
    collection.remove();
    res.status(204);
    res.send();

  })

  phrasesRouter.delete("/phrases/:languageCode/:phrase", function(req, res){
    const languageCode = req.params.languageCode;
    const phrase = req.params.phrase;
    const collection = db.collection(languageCode);
    collection.remove({"translatedPhrase": phrase });
    res.status(204);
    res.send();

  })

})

module.exports = phrasesRouter;
