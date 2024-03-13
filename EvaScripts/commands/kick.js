module.exports.config = {
  name: "طرد" , 
  version: "2.0.0", // الإصدار
  hasPermssion: 1, // الصلاحيات المطلوبة
  credits: "Mirai Team", // الفريق المطور
  description: "إزالة الشخص الذي تحتاج لإزالته من المجموعة عبر الإشارة إليه", // الوصف
  commandCategory: "ادمنية الگروبات", // فئة الأمر
  usages: "طرد [إشارة]", // كيفية الاستخدام
  cooldowns: 5, // وقت الانتظار
};

module.exports.run = async function({ api, event, Users }) {
  var mention = Object.keys(event.mentions); // جلب الأشخاص الموسومين
  if (!mention[0]) return api.sendMessage("يجب عليك الإشارة للشخص الذي تريد طرده", event.threadID);
  let info = await api.getThreadInfo(event.threadID); // جلب معلومات المجموعة
  if (!info.adminIDs.some(item => item.id === api.getCurrentUserID())) return api.sendMessage("لا أملك صلاحيات إداري في هذه المجموعة. يرجى منحي صلاحيات الإداري وحاول مجددًا!", event.threadID, event.messageID);

  if (!info.adminIDs.some(item => item.id === event.senderID)) return api.sendMessage("فقط الإداريون يمكنهم طرد الأعضاء الآخرين", event.threadID, event.messageID);

  mention.forEach(async (userId) => {
    if (info.adminIDs.some(item => item.id === userId)) {
      return api.sendMessage({body: `لا يمكن طرد إداري آخر: ${(await Users.getNameUser(userId))}`, mentions: [{tag: (await Users.getNameUser(userId)), id: userId}]}, event.threadID, event.messageID);
    } else {
      api.removeUserFromGroup(userId, event.threadID); // إزالة العضو من المجموعة
    }
  });
}
