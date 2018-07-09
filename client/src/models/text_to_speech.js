const TextToSpeech = function(){
  this.voices = [];
};

TextToSpeech.prototype.getVoices = function(){
  if(typeof speechSynthesis === "undefined") {
    return;
  }
  this.voices = speechSynthesis.getVoices();
}

TextToSpeech.prototype.speakPhrase = function(phrase, speechLanguage){
  let speech = new SpeechSynthesisUtterance();
  speech.text = phrase;
  speech.lang = speechLanguage;

  if (this.voices.includes(speechLanguage)){
      speech.voice = speechLanguage;
  }

  speechSynthesis.speak(speech);
}

module.exports = TextToSpeech;
