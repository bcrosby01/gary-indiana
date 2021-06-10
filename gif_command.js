const fetch = require("node-fetch");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

var giphy_url;
var giphy_title;

exports.random_gif = async function (payload) {
  let response = await fetch("https://api.giphy.com/v1/gifs/random?api_key=" + process.env.GIPHY_API_TOKEN + "&tag=limit=1&rating=r");
  
  try {
    if (response.status === 200) {
      let data = await response.json();
      //console.log(data.data.images.fixed_height_downsampled.url);
      giphy_url = data.data.images.fixed_height_downsampled.url;
      giphy_title = data.data.title;
      
      const result = app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        // Channel to send message to
        channel: payload.channel_id,
        blocks: [
          {
            type: "image",
            title: {
              type: "plain_text",
              text: giphy_title,
              emoji: true
          },
            image_url: giphy_url,
            alt_text: giphy_title
          }
        ],
        text: "test"
      });
    }
  } catch (error) {
     console.log(error);
  } 
};