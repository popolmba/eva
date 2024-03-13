const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "كلبس",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Rishad",
  description: "مقاطع حسب الكلمة بالانكليزي",
  commandCategory: "صور",
  usages: "مثلا كلبس Hi",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const text = args.join(" ");
    const response = await axios.get(`https://for-devs.rishadapis.repl.co/api/movie/clips?apikey=fuck&text=${encodeURIComponent(text)}`);
    const clipUrl = response.data.data[0];

    if (!clipUrl) {
      return api.sendMessage('مالكيت اي مقطع على كلامك.', event.threadID);
    }

    const clipResponse = await axios.get(clipUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(__dirname + '/cache/clips.mp4', Buffer.from(clipResponse.data));

    return api.sendMessage({
      body: "هذا الرياكشن ✨",
      attachment: fs.createReadStream(__dirname + '/cache/clips.mp4')
    }, event.threadID);
  } catch (error) {
    console.error(error);
    return api.sendMessage('An error occurred while fetching the clip.', event.threadID);
  }
};
