const modname = "questions_db";

var greeting_rcvd = ["hi","hello","sup","hows it going", "good morning", "good evening", "good afernoon",":wave:"]
var greeting_resp = ["Hi! Pleased to meet you :/", "What's Up!?", "How you doing?", "What's going on?", "Hola!", "Hey!"]

exports.confused_resp = [
  `Sorry, didn\'t quite catch that`,
  `That doesn\'t seem right`,
  `I just don't know what you're getting at with that. You messin' with me?`,
  `Sorry, I have no idea what you're talking about.`
]; 

var questions_list = {
    "who are you?":"I'm Rita, the Keystone Hops chatbot! :robot_face:",
    "what are you?":"I am an alcoholic chatbot :beers:",
    "what is your purpose?": "Not to pass butter :butter:"
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