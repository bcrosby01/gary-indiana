// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const egg = require("./easter_eggs.js");
const ques = require("./questions_db.js");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const questions_list = {
  "hello": "Hi! Pleased to meet you :/",
  "who are you?":
    "I am a just a chatbot, that's sad because I even have a name :/",
  "what is a chatbot?":
    "Chatbot is a applicati0n th47 coNDuc7 4 c0nv3rS47i0 i7h   um4n",
  "what is your purpose?": "Not to pass butter, sadly."
};

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️👁‍🗨 Bolt app is running!");
})();

app.message(":wave:", async ({ message, say }) => {
  await say(`Hello, <@${message.user}>`);
});

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

app.message(/^.*([f|F]rank).*/, async ({ context, say }) => {
  try {
    await say(egg.frank()); //Who the fuck is this guy?  dev. Gary Glass

  } catch (error) {
    console.error(error);
  }
}); 