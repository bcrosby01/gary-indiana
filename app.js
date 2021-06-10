//------MODULES--------//
const { App } = require("@slack/bolt");
const egg = require("./easter_eggs.js");
const ques = require("./questions_db.js");
const count = require("./countdown.js");
const beer_name = require("./beername.js");
const gif = require("./gif_command.js");

//Main APP Object
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

//Start up Rita!!
(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("👁‍🗨👅👁‍🗨 Rita is Alive!");
})();

//-------EVENT LISTENERS--------//
//If someone directly asks Gary a question
app.event("app_mention", async ({ event, payload, say }) => {
  try {
    let answer = ques.answer_the_question(event.text.substring(15).toLowerCase());

    if (answer) {   //Check if there is a captured question/response
      say(answer);
    } else {       //Send confused answer if no known question/response
      say(ques.confused_resp[Math.floor(Math.random() * ques.confused_resp.length)]);
    }
    
  } catch (error) {
    console.error(error);
  }
});

app.event("member_joined_channel", async ({ event, payload, say }) => {
  try {
    say('Welcome ' + '<@' + event.user + '>\ to the <#' + event.channel + '> channel. Prost! :beers:')
    console.log("user was added"  + '<' + event.user + '> to ' + '<#' + event.channel + '>')
  } catch (error) {
    console.error(error);
  }
});

app.event("member_left_channel", async ({ event, payload, say }) => {
  try {
    say('<@' + event.user + '> left <#' + event.channel + '>! How rude!! :cry:')
    console.log("user left "  + '<' + event.user + '> from ' + '<#' + event.channel + '>')
  } catch (error) {
    console.error(error);
  }
});

//-------MESSAGE LISTENERS--------//
//If someone mentions Frank, send a message :)
app.message(/^.*([f|F]rank).*/, async ({ context, say }) => {
  try {
    await say(egg.frank()); //Who the fuck is this guy?  dev. Gary Glass

  } catch (error) {
    console.error(error);
  }
}); 

//-------COMMANDS--------//
//Countdown ---NOT YET USED
app.command("/countdown", async ({ command, ack, say }) => {
  await ack();
  let days_left_msg = count.count_to_asheville() + " days to Asheville!"
  await say(days_left_msg);
});

//AI Beer Name.Style
app.command("/beername", async ({ command, ack, say }) => {
  await ack();

  try {
    say(await beer_name.random_name_api());
  } catch(error) {
    console.log(error)
  }
});

//Random GIF 
app.command("/randomgif", async ({payload, command, ack, say }) => {
  await ack();

  try {
    await gif.random_gif(payload);
  } catch(error) {
    console.log(error)
  }
});