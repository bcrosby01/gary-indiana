const fetch = require("node-fetch");
const { App } = require("@slack/bolt");
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

exports.random_gif = function (event) {
  var giphy_url;

  var giphy = fetch(
      "https://api.giphy.com/v1/gifs/random?api_key=TkGj3T09bCiXLMcXZecHYvWeLf3qTRvq&tag=limit=1&rating=r"
    )
      .then(response => response.json())
      .then(data => {
        console.log(data.data.images.fixed_height_downsampled.url);
        giphy_url = data.data.images.fixed_height_downsampled.url;
      });
  
  try {
      const result = app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        // Channel to send message to
        channel: event.channel,
        blocks: [
          {
            type: "image",
            title: {
              type: "plain_text",
              text: "Just Text",
              emoji: true
          },
            image_url: giphy_url,
            alt_text: "Nothing"
          }
        ],
        text: "test"
      });
         return(result);
    } catch (error) {
     return(error);
  }
};