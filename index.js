require('dotenv').config();
const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_BOT_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;

const web = new WebClient(token);

async function slackOperations() {
  try {
    // 1. Send a message
    const sendResult = await web.chat.postMessage({
      channel: channelId,
      text: '🚀 Hello from my Slack bot!',
    });
    console.log('Message sent:', sendResult.ts);

    const ts = sendResult.ts;

    // 2. Edit message
    await web.chat.update({
      channel: channelId,
      ts: ts,
      text: '✅ Message updated!',
    });
    console.log('Message updated');

    // 3. Delete message
    await web.chat.delete({
      channel: channelId,
      ts: ts,
    });
    console.log('Message deleted');

  } catch (error) {
    console.error('Error occurred:', error.data || error.message);
  }
}

slackOperations();
