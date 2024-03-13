module.exports.config = {
  name: "حذفكلشي",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Kshitiz", 
  description: "يمسح مجموعة من رسائل البوت",
  usePrefix: false,
  commandCategory: "البوت",
  usages: "",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event }) {

  const unsendBotMessages = async () => {
    const threadID = event.threadID;

    const botMessages = await api.getThreadHistory(threadID, 25); // Adjust the limit as needed (50 = 50 messages)

    const botSentMessages = botMessages.filter(message => message.senderID === api.getCurrentUserID());

    for (const message of botSentMessages) {
      await api.unsendMessage(message.messageID);
    }
  };

  await unsendBotMessages();
};