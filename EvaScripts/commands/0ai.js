const axios = require("axios");
module.exports.config = {
    name: "زهوري",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Gry KJ",
    description: "يتخيل اي شي",
    usePrefix: true,
    commandCategory: "ذكاء اصطناعي",
    cooldowns: 0
}
module.exports.run = async  ({ api, event, args }) => {
  const query = args.join(" ");
  if (!query) return api.sendMessage("اكتب شيء بعد الامر", event.threadID);
var arr = []
for(i = 0; i < 4; ++i) {
const res = await axios.get(`https://vihangayt.me/tools/photoleap?q=${query}`)
const data = res.data.data
const rr = await axios.get(data, {responseType: "stream"});
arr.push(rr.data)
}
api.sendMessage({
body: "هاهي صورك",
attachment: arr
}, event.threadID, event.messageID)
}