// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const egg = require("./easter_eggs.js");
const ques = require("./questions_db.js");
const count = require("./countdown.js");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

//Start up the Bot
(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("👁‍🗨👅👁‍🗨 Gary is Alive!");
})();

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

//If someone mentions Frank, send a message :)
app.message(/^.*([f|F]rank).*/, async ({ context, say }) => {
  try {
    await say(egg.frank()); //Who the fuck is this guy?  dev. Gary Glass

  } catch (error) {
    console.error(error);
  }
}); 

app.command("/countdown", async ({ command, ack, say }) => {
  await ack();
  let days_left_msg = count.count_to_asheville() + " days to Asheville!"
  await say(days_left_msg);
});
