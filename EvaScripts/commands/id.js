module.exports.config = {
	name: "معرف الكروب",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "NTKhang",
	description: "ايدي الكروب", 
	commandCategory: "المطور",
	usages: " ",
	cooldowns: 5, 
	dependencies: '',
};

module.exports.run = async function({ api, event }) {
  api.sendMessage(event.threadID, event.threadID);
};
