module.exports.config = {
  name: "زوجني",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "S H A D Y",
  description: "يزوجك عشوائي",
  commandCategory: "تاك",
  cooldowns: 5,
  dependencies: {
      "axios": "",
      "fs-extra": ""
  }
}
module.exports.onLoad = async() => {
  const { resolve } = global.nodemodule["path"];
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { downloadFile } = global.utils;
  const dirMaterial = __dirname + `/cache/canvas/`;
  const path = resolve(__dirname, 'cache/canvas', 'wifei.jpg');
  if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
  if (!existsSync(path)) await downloadFile("https://scontent.xx.fbcdn.net/v/t1.15752-9/400045025_1985135591868400_6298557773231921332_n.jpg?stp=dst-jpg_p480x480&_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFWabucaU6-I9wyShp3BqBVxmAOhJFVD5HGYA6EkVUPkV1Jpqy6B4Kh9Nsuv4lIWsvZFCKHlsAWQE67m_zQ76Gw&_nc_ohc=zcrqooynXvkAX_Emg_z&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTYWmFVzk_ZU2rxe1Wtp6xMGUKSg_wclphH-8floOofLQ&oe=65C130C1", path);
}

async function makeImage({ one, two }) {
  const fs = global.nodemodule["fs-extra"];
  const path = global.nodemodule["path"];
  const axios = global.nodemodule["axios"]; 
  const jimp = global.nodemodule["jimp"];
  const __root = path.resolve(__dirname, "cache", "canvas");

  let pairing_img = await jimp.read(__root + "/wifei.jpg");
  let pathImg = __root + `/wifei_${one}_${two}.png`;
  let avatarOne = __root + `/avt_${one}.png`;
  let avatarTwo = __root + `/avt_${two}.png`;

  let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

  let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

  let circleOne = await jimp.read(await circle(avatarOne));
  let circleTwo = await jimp.read(await circle(avatarTwo));
  pairing_img.composite(circleOne.resize(110, 110), 160, 20).composite(circleTwo.resize(110, 110), 290, 45);

  let raw = await pairing_img.getBufferAsync("image/png");

  fs.writeFileSync(pathImg, raw);
  fs.unlinkSync(avatarOne);
  fs.unlinkSync(avatarTwo);

  return pathImg;
}
async function circle(image) {
  const jimp = require("jimp");
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.run = async function({ api, event, args, Users, Threads, Currencies }) {
const axios = require("axios");
  const fs = require("fs-extra");
  const { threadID, messageID, senderID } = event;
  var tl = ['21%', '30%', '41%', '52%', '63%', '84%', '95%', '59%', '74%', '67%', '19%', '37%', '17%', '96%', '52%', '62%', '76%', '83%', '100%', '99%', "75%", "48%"];
      var tle = tl[Math.floor(Math.random() * tl.length)];
      let dataa = await api.getUserInfo(event.senderID);
      let namee = await dataa[event.senderID].name
      let loz = await api.getThreadInfo(event.threadID);
      var emoji = loz.participantIDs;
      var id = emoji[Math.floor(Math.random() * emoji.length)];
      let data = await api.getUserInfo(id);
      let name = await data[id].name
      var arraytag = [];
              arraytag.push({id: event.senderID, tag: namee});
              arraytag.push({id: id, tag: name});

      var sex = await data[id].gender;
      var gender = sex == 2 ? "Nam🧑" : sex == 1 ? "Nữ👩‍🦰" : "Trần Đức Bo";
var one = senderID, two = id;
  return makeImage({ one, two }).then(path => api.sendMessage({ body: `⌯${namee}︙↫ باركو للزلمه \n⌯${name}︙↫ دخل القفص وصار زوج هاي  \n•-› ✓  ونسبه القواسم المشتركة بينكم هي : ${tle}`, mentions: arraytag, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
  }
