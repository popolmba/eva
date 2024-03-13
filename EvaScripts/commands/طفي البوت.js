module.exports.config = {
  name: "اطفى",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "HTHB",
  description: "Tắt Bot.",
  commandCategory: "المطور",
  cooldowns: 0
        };
module.exports.run = ({event, api}) =>api.sendMessage("باي باي فروخ ✅",event.threadID, () =>process.exit(0))