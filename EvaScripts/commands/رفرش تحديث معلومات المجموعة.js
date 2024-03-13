module.exports.config = {
  name: "انعاش",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "إعادة تحميل جميع معلومات المجموعة",
  commandCategory: "البوت",
  cooldowns: 500
};

module.exports.run = async ({ event, api, Threads }) => {
    const threadInfo = await api.getThreadInfo(event.threadID);
  await Threads.setData(event.threadID, { name: threadInfo.name, threadInfo });
  global.data.threadInfo.set(parseInt(event.threadID), threadInfo);
    return api.sendMessage("تم تحديث معلومات المجموعة بنجاح! ✅", event.threadID, event.messageID);
}