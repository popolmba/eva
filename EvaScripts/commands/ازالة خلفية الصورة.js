const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "ازالة",
  version: "2.7",
  hasPermission: 0,
  credits: "ديدوز",
  description: "زيل خلفية الصورة",
  commandCategory: "ذكاء اصطناعي",
  usages: "( رد على الصورة )", 
  usePrefix: true,
  cooldown: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.indexOf("ازالة") === 0 || event.body.indexOf("ازالة") === 0)) return;
  const args = event.body.split(/\s+/);
  args.shift();

  try {
    const response = await axios.get("https://hazeyy-apis-combine.kyrinwu.repl.co");
    if (response.data.hasOwnProperty("error")) {
      return api.sendMessage(response.data.error, event.threadID, event.messageID);
    }

    let pathie = __dirname + `/cache/removed_bg.jpg`;
    const { threadID, messageID } = event;

    let photoUrl = event.messageReply ? event.messageReply.attachments[0].url : args.join(" ");

    if (!photoUrl) {
      api.sendMessage("📸 رد على الصورة ليتم حذف خلفيتها.", threadID, messageID);
      return;
    }

    api.sendMessage("🕟 | ازالة الخلفية, يرجى الأنتظار...", threadID, async () => {
      try {
        const response = await axios.get(`https://hazeyy-apis-combine.kyrinwu.repl.co/api/try/removebg?url=${encodeURIComponent(photoUrl)}`);
        const processedImageURL = response.data.image_data;

        const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;

        fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

        api.sendMessage({
          body: "✨ تفضل الصورة يلطيف",
          attachment: fs.createReadStream(pathie)
        }, threadID, () => fs.unlinkSync(pathie), messageID);
      } catch (error) {
        api.sendMessage(`🔴 𝖤𝗋𝗋𝗈𝗋 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗂𝗆𝖺𝗀𝖾: ${error}`, threadID, messageID);
      }
    });
  } catch (error) {
    api.sendMessage(`𝖤𝗋𝗋𝗈𝗋: ${error.message}`, event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {};