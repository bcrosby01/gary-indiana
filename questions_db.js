const modname = "questions_db";

var greeting_rcvd = ["hi","hello","sup","hows it going", "good morning", "good evening", "good afernoon"]
var greeting_resp = ["Hi! Pleased to meet you :/", "What's Up!?", "How you doing?", "Something", "Something else", "Ugh", "Dragging today"]

exports.confused_resp = [
  `Sorry, didn\'t quite catch that. Try again, or ask for "help". Woof woof.`,
  `Hmmm... <wags tail> <tilts head in confusion> Ask for "help" if you're confused too!`,
  `That doesn\'t seem right. Do you need help? Just ask for it!`,
  `I just don't know what you're getting at with that. You messin' with me? Just cause I'm a cute lil corgi?`,
  `Hmmm, try something else. That didn't seem to match any of my expectations. Ask for "help" if you need it!`,
  `Arf! I am confused by your request. I am very smart for a corgi, but I am still a corgi, after all. Ask for "help" if you need it!`,
  `Sorry, I have no idea what you're talking about.`
]; 

var questions_list = {
    "who are you?":"I am a just a chatbot, that's sad because I even have a name :/",
    "what is a chatbot?":"Chatbot is a applicati0n th47 coNDuc7 4 c0nv3rS47i0 i7h   um4n",
    "what is your purpose?": "Not to pass butter, sadly."
};

exports.answer_the_question = function (text) {
  //Debug console.log(modname + " Started");
  let rand = Math.floor(Math.random() * 7);
  
  let greet = greeting_rcvd.includes(text);
  
  if (greet){
    return greeting_resp[rand];
  } else {
    return questions_list[text]
  }
}