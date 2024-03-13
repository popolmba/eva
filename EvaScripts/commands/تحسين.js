const axios = require('axios');
const fs = require('fs-extra');
const tinyurl = require('tinyurl');

module.exports.config = {
  name: "تحسين",
  version: "1.0.",
  hasPermssion: 0,
  credits: "ewan",
  description: "تصفية بتقنية Remini",
  commandCategory: "تصفية الصور",
  usages: "[الرد على الصورة أو وضع رابط الصورة]",
  cooldowns: 1,
};

module.exports.run = async ({ api, event }) => {
  const { threadID, messageID } = event;

  if (event.type === "message_reply") {
    var imageURL = event.messageReply.attachments[0].url;
  } else {
    api.sendMessage("الرجاء الرد على صورة أو توفير رابط للصورة.", threadID, messageID);
    return;
  }

  try {
    api.sendMessage("جاري المعالجة...", threadID, messageID);

    const shortURL = await tinyurl.shorten(imageURL);
    const response = await axios.get(`https://api.vyturex.com/upscale?imageUrl=${shortURL}`);
    const processedImageURL = response.data.resultUrl;

    const img = (await axios.get(processedImageURL, { responseType: "arraybuffer"})).data;

    const pathie = __dirname + "/cache/remini.png";
    fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

    api.sendMessage({
      body: "تم التحسين بنجاح < 😘",
      attachment: fs.createReadStream(pathie)
    }, threadID, () => fs.unlinkSync(pathie), messageID);
  } catch (error) {
    console.log(error.message);
    api.sendMessage("حدث خطأ ما.\n" + error.message, threadID, messageID);
  }
};
