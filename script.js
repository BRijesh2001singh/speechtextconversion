// Initialize the SpeechSynthesis API
var synth = window.speechSynthesis;
// Create a new SpeechSynthesisUtterance object
var utterance = new SpeechSynthesisUtterance();
var SpeechRecognition=window.webkitSpeechRecognition

var recognition=new SpeechRecognition()
 var textbox=$("#textbox")
 var instructions=$("#instructions")
  var content='';

  recognition.continuous=true;
recognition.onstart=function(){
    instructions.text("Voice Recognition is on");
}
recognition.onspeechend=function(){
    instructions.text("Voice Recognition has stopped")
}
recognition.onerror=function(){
    instructions.text("Try Again")
}
recognition.onresult=function(event){
    var curr=event.resultIndex;
    var transcript=event.results[curr][0].transcript
    content+=transcript
  textbox.val(content)
}
$("#start-btn").click(function(event) {
  if (content.length) {
      content += '';
  }
  recognition.start();
  $("#start-btn").html("Listening..."); // Change inner HTML of start button
});

$("#stop-btn").click(function(event) {
  recognition.stop();
  instructions.text("Voice Recognition stopped");
  $("#start-btn").html("Start"); // Change inner HTML of start button
});
textbox.on('input',function(){
    content=$(this).val()
})
var voices = synth.getVoices();

// When the page loads, populate the voice dropdown menu with all available voices
window.onload = function() {
  var voices = synth.getVoices();

  for (var i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = voices[i].name + ' (' + voices[i].lang + ')';

    $("#voice-select").append(option);
  }
};
function speak() {
  utterance.text = content;

  // Get the index of the selected voice from the dropdown menu
  var voiceIndex = $("#voice-select").val();

  if (voiceIndex) {
    // If a voice is selected, set the voice property of the utterance object to the selected voice
    utterance.voice = synth.getVoices()[voiceIndex];
  }

  synth.speak(utterance);
}
$("#speak-btn").click(function(event) {
  speak();
});