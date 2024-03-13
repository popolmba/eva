module.exports.config = {
  name: "قطط",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Joshu",
  description: "صور قطط",
  commandCategory: "صور",
  cooldowns: 5
};

module.exports.run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let juswa = args.join(" ");
const res = await axios.get(`https://api.popcat.xyz/lulcat?text=${juswa}`);
var text = res.data.text;
return api.sendMessage(`${text}`, event.threadID, event.messageID)
}