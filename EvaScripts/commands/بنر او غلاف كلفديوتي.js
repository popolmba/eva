var hiro = "Atsushi Nakajima";
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "كودبنر",
  version: "1",
  hasPermssion: 0,
  credits: `Atsushi Nakajima`, // Credits to Grey for the banner I just putted all of them
  description: "سوي غلاف كلفديوتي لأسمك",
  usePrefix: true,
  commandCategory: "صور",
  usages: "اكتب .كودبنر كود1 واسمك مثلا .كودبنر كود1 Ali لمشاهدة الافسام اكتب كودبنر اقسام",
  cooldowns: 2,
};
module.exports.run = async function ({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;

  if (args.length === 1 && args[0] === "اقسام") {
    const bannerTypes = [
      "كود1", "كود2", "كود3"];
    return api.sendMessage(`كل اقسام البنر:\n\n${bannerTypes.join(", ")}`, threadID, messageID);
  }

  if (args.length < 2) {
    return api.sendMessage(`خطأ في استخدام الأمر! استخدم: -كودبنر <كود1 او كود2 او كود3> <اسمك>\nلمشاهدة كل اقسام كودبنر: -كودبنر اقسام`, threadID, messageID);
  }

  let type = args[0].toLowerCase();
  let name = args[1];
  let name2 = args.slice(2).join(" ");
  let pathImg = __dirname + `/cache/${type}_${name}.png`;
  let apiUrl, message;

  switch (type) {
    case "كود1":
      apiUrl = `https://canvastest.heckerman06.repl.co/burat?name=${name}`;
      message = "Call of duty banner created:";
      break;
    case "كود2":
      apiUrl = `https://canvastest.heckerman06.repl.co/burat1?name=${name}`;
      message = "Call of duty banner created:";
      break;
    case "كود3":
      apiUrl = `https://canvastest.heckerman06.repl.co/burat3?name=${name}`;
      message = "Call of duty banner created:";
      break;
     default:
      return api.sendMessage(`Wrong banner Use: -codbanner list to show all banners`, threadID, messageID);
  }
  api.sendMessage("Wait..", threadID, messageID);
  let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
  let logo = response.data;
  fs.writeFileSync(pathImg, Buffer.from(logo, "utf-8"));
  return api.sendMessage(
    {
      body: message,
      attachment: fs.createReadStream(pathImg),
    },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
}; 