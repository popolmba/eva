onst chalk = require('chalk');
module.exports.config = {
  name: "rbg",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "عمر",
  description: "الانضمام إلى مجموعة مقابل 5000 دولار",
  commandCategory: "الاموال",
  usages: "",
  cooldowns: 5
};

module.exports.onLoad = () => {
  console.log(chalk.bold.hex("#00c300").bold("============ تم تحميل أمر الانضمام بنجاح ============"));
}

module.exports.handleReply = async function ({ api, event, handleReply, Threads, Currencies }) {
  var { threadID, messageID, senderID, body } = event;
  var { ID } = handleReply;
  console.log(ID)
  if (!body || !parseInt(body)) return api.sendMessage('يجب أن يكون اختيارك رقمًا.', threadID, messageID);
  if ((parseInt(body) - 1) > ID.length) return api.sendMessage("الرقم الذي أدخلته غير موجود في القائمة.", threadID, messageID);
  try {
    var data = await Currencies.getData(event.senderID);
    var money = data.money;
    if (money < 5000) {
      api.sendMessage("تحتاج إلى 5000 دولار للانضمام إلى المجموعة. 💰", threadID, messageID);
    } else {

      Currencies.setData(event.senderID, { money: money - 5000 });


      api.addUserToGroup(senderID, ID[body - 1]);


      api.sendMessage("تمت إضافتك إلى المجموعة بنجاح. 🎉", threadID, messageID);
    }
  } catch (error) {
    return api.sendMessage(`لا يمكن إضافتك إلى المجموعة. خطأ: ${error}`, threadID, messageID);
  }
}

module.exports💔.run = async function ({ api, event, Threads }) {
  var { threadID, messageID, senderID } = event;
  var msg = `🔰==[ قائمة المجموعات ]==🔰\n\n`, number = 0, ID = [];
  var allThreads = await Threads.getAll();
  for (var i of allThreads) {
    number++;
    msg += `${number}. ${i.threadInfo.threadName}\n`;
    ID.push(i.threadID)
  }
  msg += `\n👉 رد برقم المجموعة للانضمام إليها مقابل 5000 دولار`
  return api.sendMessage(msg, threadID, (error, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      author: senderID,
      messageID: info.messageID,
      ID: ID
    })
  }, messageID)
}