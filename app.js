// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const fetch = require("node-fetch"); 
var giphy_url;

/*    var giphy = fetch("https://api.giphy.com/v1/gifs/random?api_key=TkGj3T09bCiXLMcXZecHYvWeLf3qTRvq&tag=limit=1&rating=r")
                    .then(response => response.json())
                    .then(data => {console.log(data.data.images.fixed_height_downsampled.url);
                                   giphy_url = data.data.images.fixed_height_downsampled.url;
                                  });
*/

const reps = ["reply 1", "reply 2", "reply 3"];

const CONFUSED_RESPONSES = [
  `Sorry, didn\'t quite catch that. Try again, or ask for "help". Woof woof.`,
  `Hmmm... <wags tail> <tilts head in confusion> Ask for "help" if you're confused too!`,
  `That doesn\'t seem right. Do you need help? Just ask for it!`,
  `I just don't know what you're getting at with that. You messin' with me? Just cause I'm a cute lil corgi?`,
  `Hmmm, try something else. That didn't seem to match any of my expectations. Ask for "help" if you need it!`,
  `Arf! I am confused by your request. I am very smart for a corgi, but I am still a corgi, after all. Ask for "help" if you need it!`
];

const questions_list = {
  hello: "Hi! Pleased to meet you :/",
  "who are you?":
    "I am a just a chatbot, that's sad because I even have a name :/",
  "what is a chatbot?":
    "Chatbot is a applicati0n th47 coNDuc7 4 c0nv3rS47i0 i7h   um4n",
  "what is your purpose?": "Not to pass butter, sadly."
};

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

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
    let rando = Math.floor(Math.random() * 6);
    let answer = "";
    
    var giphy = fetch("https://api.giphy.com/v1/gifs/random?api_key=TkGj3T09bCiXLMcXZecHYvWeLf3qTRvq&tag=limit=1&rating=r")
                    .then(response => response.json())
                    .then(data => {console.log(data.data.images.fixed_height_downsampled.url);
                                   giphy_url = data.data.images.fixed_height_downsampled.url;
                                  });
    //let answer = "I got not answer";

    //say(CONFUSED_RESPONSES[rando]);

    say(event.text.substring(15).toLowerCase());
    answer = questions_list[event.text.substring(15).toLowerCase()]; //Trimming username from @mention
    
    if (answer) {
      say(answer);
    } else {
      say("Sorry, I got nothin");
    }
    //say(event.user);
    //say(event.channel);
  } catch (error) {
    console.error(error);
  }
    
  try {
    const result = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      // Channel to send message to
      channel: event.channel,
      // Include a button in the message (or whatever blocks you want!)
      blocks: [
        		{
	        	"type": "image",  
			      "title": {
				      "type": "plain_text",
				      "text": "Test",
				      "emoji": true
			      },
			      "image_url": giphy_url,
		      	"alt_text": "Test"
	         },
          ], text: "This is your cat"
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

/* function (deps) {
    return [
        (session, course) => {
            const user_input = session.getMessage().data;
            if (!(user_input && user_input.length)) {
                return course.next();
            }

            const answer = questions_list[user_input.toLowerCase()];
            if (answer) {
                session.storage.set("answer", answer);
                return course.replace("faq");
            }


            return course.next();
        }
    ];
} */
