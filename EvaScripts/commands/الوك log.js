module.exports.config = {
  name: "الوك",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TuanDzz",
  description: "بيانات الاكروب",
  commandCategory: "المطور",
  usages: "",
  cooldowns: 3,
  denpendencies: {
  }
};

module.exports.run = async function ({ api, event, Threads, getText }) {
  const fs = global.nodemodule["fs-extra"];
  var { threadID, messageID, senderID } = event;
  //if (senderID == global.data.botID) return;

  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  //console.log(data)
  //var prefix = data.PREFIX;
  var rankup = data.rankup;
  var resend = data.resend;
  var log = data.log;
  var tagadmin = data.tagadmin;
  var guard = data.guard;
  var antiout = data.antiout;
  //prefix == null ? rankup = `!` : rankup = `${prefix}`;
  log == null ? log = `مشتغل` : log = `${log}`;
  rankup == null ? rankup = `معطل` : rankup = `${rankup}`;
  resend == null ? resend = `مشتغل` : resend = `${resend}`;
  tagadmin == null ? tagadmin = `مشتغل` : tagadmin = `${tagadmin}`;
  guard == null ? guard = `مشتغل` : guard = `${guard}`;
  antiout == null ? antiout = `مشتغل` : antiout = `${antiout}`;
return api.sendMessage(` ☣️المعلومات☣️ \n\n\n🍄────•🦋• ────🍄\n❯ 🍉 الوگ: ${log}\n❯ 🍇 الرانك: ${rankup}\n❯ 🍓 الرسائل المحذوفة: ${resend}\n❯ 🥕 تاگ ادمن: ${tagadmin}\n❯ 🍑 حماية الادمن ${guard}\n❯ 🍒 منع خروج: ${antiout}\n🍄────•🦋• ────🍄`, threadID, messageID);
}
