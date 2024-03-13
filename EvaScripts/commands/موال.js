module.exports.config = {
  name: "موال",
  version: "1.0.0",
  permission: 0,
  credits: "علي حسين",
  description: "يرسل فيديوهات  موال شعر",
  usePrefix: true,
  commandCategory: "صور",
  usages: "موال",
  cooldowns: 5
};
  module.exports.run = async ({ api, event, args }) => {
  const dipto  =  [""];
  const randText = dipto[Math.floor(Math.random() * dipto.length)];

  const videoLinks = [
  "https://i.imgur.com/TYWY4VS.mp4",
    "https://i.imgur.com/8dxd3Cg.mp4",
    "https://i.imgur.com/fj3PVxW.mp4",
    "https://i.imgur.com/C6sUjc2.mp4",
    "https://i.imgur.com/A7oSryX.mp4",
    "https://i.imgur.com/Qq0B5yQ.mp4",
    "https://i.imgur.com/AaKlg6p.mp4",
    "https://i.imgur.com/Iy4AtQE.mp4",
    "https://i.imgur.com/sfBvFWx.mp4",
    "https://i.imgur.com/MmHalDE.mp4",
    "https://i.imgur.com/fCYhX6Y.mp4",
    "https://i.imgur.com/opD4xf4.mp4",
    "https://i.imgur.com/GEjEIsq.mp4",
    "https://i.imgur.com/bGZRxpE.mp4",
    "https://i.imgur.com/WlJqwq1.mp4",
    "https://i.imgur.com/FXwjHFQ.mp4",
    "https://i.imgur.com/IaRR49x.mp4",
    "https://i.imgur.com/u3FGbEY.mp4",
    "https://i.imgur.com/VQSWejp.mp4",
    "https://i.imgur.com/b35rBgC.mp4",
    "https://i.imgur.com/fmZ4iUc.mp4",
    "https://i.imgur.com/UcnDFcc.mp4",
    
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