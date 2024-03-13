module.exports.config = {
  name: "تفاهة",
  version: "1.0.0",
  permission: 0,
  credits: "علي حسين",
  description: "يرسل فيديوهات تافة او ميمز",
  usePrefix: true,
  commandCategory: "صور",
  usages: "ميمز",
  cooldowns: 5
};
  module.exports.run = async ({ api, event, args }) => {
  const dipto  =  [""];
  const randText = dipto[Math.floor(Math.random() * dipto.length)];

  const videoLinks = [
  "https://i.imgur.com/Sz4NEI5.mp4",
    "https://i.imgur.com/swSizMI.mp4",
    "https://i.imgur.com/vxNEeNZ.mp4",
    "https://i.imgur.com/Z7jlr92.mp4",
    "https://i.imgur.com/fhV2KXI.mp4",
    "https://i.imgur.com/21RZpXj.mp4",
    "https://i.imgur.com/ugfZ0qr.mp4",
    "https://i.imgur.com/PIkSdKe.mp4",
    "https://i.imgur.com/50AimO0.mp4",
    "https://i.imgur.com/9xRGoBJ.mp4",
  ];

  const randomIndex = Math.floor(Math.random() * videoLinks.length);
  const randomVideoLink = videoLinks[randomIndex];

  let messageText = 'المالك = علي حسين 📺\n';

  global.nodemodule["axios"]
    .get(randomVideoLink, { responseType: "arraybuffer" })
    .then((response) => {
      const path = __dirname + `/cache/dipto_${Date.now()}.mp4`;
      global.nodemodule["fs"].writeFileSync(path, Buffer.from(response.data, 'utf-8'));
      api.sendMessage({ 
        body: messageText + randText,
        attachment: global.nodemodule["fs"].createReadStream(path)
      }, event.threadID, () => global.nodemodule["fs"].unlinkSync(path), event.messageID);
    })
    .catch(error => {
      console.error("❌ | خطأ", error);
      api.sendMessage("❌ | خطأ", event.threadID, event.messageID);
    });
};