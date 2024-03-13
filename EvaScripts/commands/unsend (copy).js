module.exports.config = {
	name: "مسحح",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: " ",
	commandCategory: "المطور",
	usages: " ",
	cooldowns: 0
};

module.exports.languages = {
	"vi": {
		"returnCant": "لا يمكن إزالة رسائل الآخرين.",
		"missingReply": "Hãy reply tin nhắn cần gỡ."
	},
	"en": {
		"returnCant": "لا يمكن إزالة رسائل الآخرين.",
		"missingReply": "رد ع رسالة البوت حتى تمسحها ."
	}
}

module.exports.run = function({ api, event, getText }) {
    const permission = ["100065172561645"];                  
    if (!permission.includes(event.senderID)) return api.sendMessage("ماعدك صلاحية حب", event.threadID, event.messageID);
	if (event.messageReply.senderID != api.getCurrentUserID()) return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
	if (event.type != "message_reply") return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
	return api.unsendMessage(event.messageReply.messageID);
}