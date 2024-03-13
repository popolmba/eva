module.exports.config = {
  name: "حساب",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "ZiaRein", 
  description: "أحسب كل شيء", 
  commandCategory: "البوت", 
  usages: `أرجوك قم بإدخال بعض الفئات\n\nكيفية الإستعمال ؟\n${global.config.PREFIX}أحسب <الفئات>\n\nالفئات المتاحة:\n\nرسائلي ، المسؤولين ، الذكور ، إناث, ألوان ، الجميع ، ،الأعضاء كل_المستخدمين, بيانات_المجكوعة, عدد_المغادرات\n`,
  cooldowns: 5,  
  envConfig: {
  }
};

module.exports.run = async function ({ api, Threads, Users, event, args, client, __GLOBAL }) {
  const { threadID, messageID, participantIDs } = event;
  var input = args.join();
  var nameMen = [];
  var gendernam = [];
  var gendernu = [];
  var nope = [];
  let threadInfo = await api.getThreadInfo(threadID);
  for (let z in threadInfo.userInfo) {
    var gioitinhone = threadInfo.userInfo[z].gender;
    if (gioitinhone == "MALE") {
      gendernam.push(gioitinhone)
    } else {
      if (gioitinhone == "FEMALE") {
        gendernu.push(gioitinhone)
      } else { nope.push(gioitinhone) }
    }
  }
  ///////////////////////
      var threadList = [];
      var inbox = await api.getThreadList(150, null, ['INBOX']);
      let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

      for (var groupInfo of list) {
          threadList.push({
              id: groupInfo
          });
      } 
  ///////////////////////

  ///////////////////////
      var listLeave = [];
      var inbox = await api.getThreadList(100, null, ['ARCHIVED']);

      for (var groupInfo of inbox) {
          listLeave.push({
              id: groupInfo
          });
      } 
  ///////////////////////

  var threadData = (await Threads.getData(threadID)).threadInfo;
  var out = (msg) => api.sendMessage(msg, threadID, messageID);
  var boxget = await Threads.getAll(['threadID']);
  var userget = await Users.getAll(['userID']);
  if (input == "") { out(`أرجوك قم بإدخال بعض الفئات \n\nكيفية الإستعمال ؟\n${global.config.PREFIX}حساب <الفئات>\n\nالفئات المتوفرة:\n\nالرسائل, المسؤولين, الاعضاء, ذكور, اناث, الوان, الجميع, كل_المستخدمين, بيانات_المجموعة, عدد_المغادرات`) }
  if (input == "الرسائل") { out(`هذه المجموعة اديها ${threadInfo.messageCount} رسالة`) }
  if (input == "المسؤولين") { out(`المجموعة لديها  ${threadData.adminIDs.length} مسؤول`) }
  if (input == "الاعضاء") { out(`هذه المجموعة لديها ${participantIDs.length} عضو`) }
  if (input == "ذكور") { out(`هذه المجموعة لديها ${gendernam.length} ذكر`) }
  if (input == "اناث") { out(`هذه المجموعة لديها ${gendernu.length} أنثى`) }
  if (input == "الوان") { out(`هذه المجموعة لديا ${nope.length} عضو شاذ`) }
  if (input == "الجميع") { out(`الد الإجمالي: ${threadList.length} مجموعة تستعمل البوت`) }
  if (input == "كل_المستخدمين") { out(`العدد الإجمالي: ${userget.length} مستخدم يستعمل البوت `) }
  if (input == "بيانات_المجموعة") { out(`العدد الإجمالي ${boxget.length} مجموعة دردشة[البيانات] التي إستخدمها البوت`) }
  if (input == "عدد_المغادرات") { out(`العدد الإجمالي هو: ${listLeave.length} شخص قد غادر من المجموعة`) }
}