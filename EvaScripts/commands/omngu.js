const request = require("request");
const fs = require("fs")
const axios = require("axios");
module.exports.config = {
  name: "باي",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "huy hoàng và hoàng mod by Kaiser",
  description: "باي وتسوي تاك",
  commandCategory: "تاك",
  usages: "[تاك]",
  cooldowns: 5,
};

module.exports.run = async ({
  api,
  event,
  args,
  client,
  Users,
  Threads,
  __GLOBAL,
  Currencies
}) => {
  const request = require("request");

  const fs = require("fs");

  var mention = Object.keys(event.mentions)[0];

  let tag = event.mentions[mention].replace("@", "");

  var link = ["https://i.imgur.com/YfyVp3P.gif"];

  var callback = () =>
    api.sendMessage(
      {
        body: `${tag} , تصبح ع خير 💕`,
        mentions: [
          {
            tag: tag,

            id: Object.keys(event.mentions)[0]
          }
        ],

        attachment: fs.createReadStream(__dirname + "/cache/omngu.gif")
      },
      event.threadID,
      () => fs.unlinkSync(__dirname + "/cache/omngu.gif")
    );

  return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
    .pipe(fs.createWriteStream(__dirname + "/cache/omngu.gif"))
    .on("close", () => callback());
};
