module.exports.config = {
  name: "بارق",
  version: "1.2.3",
  hasPermssion: 0,
  credits: "Azeu_Markヅ",
  description: "From ChatGPT API V2",
  commandCategory: "غير شغال",
  usages: "Ask, Automate, AI",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
    var question = args.join(" ");
  if (!question) {
      api.setMessageReaction("🤡", event.messageID, (err) => {}, true);
      return api.sendMessage("Please provide a question or message!\nExample: .ai2 How to sit?", event.threadID, event.messageID);
  };
  // AI Now!
  api.setMessageReaction("🗿", event.messageID, (err) => {}, true);
  const axios = require("axios");
    try{
      const res = await axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/ai?question=${question}`);
      const respond = res.data.answer;
      return api.sendMessage(respond, event.threadID, event.messageID);
    }catch(error){
      return api.sendMessage("There was an error on your request, maybe try again or later?", event.threadID, event.messageID);
    };
}


