module.exports.config = {
  name: "ريستارت",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "manhIT",
  description: "ريستارت بوت",
  usePrefix: false,
  commandCategory: "المطور",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  return api.sendMessage(`${global.config.BOTNAME} ماشي حبيبي\n-انتضر خل ارست لدوخني🐸`, threadID, () => process.exit(1));
}