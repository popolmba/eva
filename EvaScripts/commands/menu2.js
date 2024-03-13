module.exports.config = {
  name: "menu",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Dunguwu mod by Dien",
  description: "الاقسام",
  usages: " ",
  commandCategory: "البوت",
  cooldowns: 5
};

const fs = require('fs-extra');

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const num = parseInt(event.body.split(" ")[0].trim());
  const msg = "";
  const data = handleReply.content;
  let check = false;

  if (isNaN(num)) msg = "✓اختر من فضلك";
  else if (num > data.length || num <= 0) msg = "غبي اختار رقم موجود ";
  else {
    const { commands } = global.client;
    let dataAfter = data[num -= 1];

    if (handleReply.type == "cmd_info") {
      let command_config = commands.get(dataAfter).config;
      msg += ` 【  ${command_config.commandCategory.toUpperCase()}  】   \n`;
      msg += `\n【】☛ الأسم: ${dataAfter}`;
      msg += `\n【】☛ الوصف: ${command_config.description}`;
      msg += `\n【】☛ طريقة الأستخدام: ${(command_config.usages) ? command_config.usages : ""}`;
      msg += `\n【】☛ وقت الانتظار: ${command_config.cooldowns || 5}s`;
      msg += `\n【】☛ الصلاحية: ${(command_config.hasPermssion == 0) ? "المستخدمين" : (command_config.hasPermssion == 1) ? "أدمنية المجموعات" : "أدمنية البوت"}`;
    } else {
      check = true;
      let count = 0;
      msg += `【    ${dataAfter.group.toUpperCase()}    】\n`;

      dataAfter.cmds.forEach(item => {
        msg += `\n 【${count += 1}】 ${item}: ${commands.get(item).config.description}`;
      })
      msg += "\n【ＮＯＮＥ】☛ قم بالرد على الرسالة برقم لعرض تفاصيل الأمر";
    }
  }

  const imgPath = "received_351794397462708 (1).jpeg"; // استبدل هذا بالمسار الصحيح للصورة داخل مشروعك
  const imgP = [fs.createReadStream(imgPath)];

  api.unsendMessage(handleReply.messageID);
  return api.sendMessage({ body: msg, attachment: imgP }, event.threadID, event.messageID);
}

module.exports.run = async function ({ api, event, args }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  const imgPath = "received_351794397462708 (1).jpeg"; // استبدل هذا بالمسار الصحيح للصورة داخل مشروعك
  const imgP = [fs.createReadStream(imgPath)];

  const command = commands.values();
  let group = [], msg = "〆╔╦══• •الأوامر• •══╦╗〆";
  msg += `  `;
  let check = true;
  let page_num_input = "";
  let bonus = 0;

  for (const commandConfig of command) {
    if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
    else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
  }

  if (args[0] && ["الكل", "-a"].includes(args[0].trim())) {
    let all_commands = [];
    group.forEach(commandGroup => {
      commandGroup.cmds.forEach(item => all_commands.push(item));
    });
    let page_num_total = Math.ceil(all_commands.length / 22);
    if (args[1]) {
      check = false;
      page_num_input = parseInt(args[1]);
      if (isNaN(page_num_input)) msg = " ";
      else if (page_num_input > page_num_total || page_num_input <= 0) msg = " ";
      else check = true;
    }
    if (check) {
      index_start = (page_num_input) ? (page_num_input * 20) - 20 : 0;
      bonus = index_start;
      index_end = (index_start + 20 > all_commands.length) ? all_commands.length : index_start + 20;
      all_commands = all_commands.slice(index_start, index_end);
      all_commands.forEach(e => {
        msg += `\n${index_start += 1} ${e}: ${commands.get(e).config.description}`;
      })
      msg += ` `;
      msg += ` `;
      msg += "\n【】☛ لمشاهدة قسم ثاني من الاوامر اكتب .الاوامر الكل 2 او 3 الى ... ";
    }
    return api.sendMessage({ body: msg, attachment: imgP }, threadID, messageID);
  }

  let page_num_total = Math.ceil(group.length / 20);
  if (args[0]) {
    check = false;
    page_num_input = parseInt(args[0]);
    if (isNaN(page_num_input)) msg = "】☛ يمكنك الرد برقم فقط";
    else if (page_num_input > page_num_total || page_num_input <= 0) msg = " ";
    else check = true;
  }
  if (check) {
    index_start = (page_num_input) ? (page_num_input * 10) - 10 : 0;
    bonus = index_start;
    index_end = (index_start + 10 > group.length) ? group.length : index_start + 20;
    group = group.slice(index_start, index_end);
    group.forEach(commandGroup => msg += `\n${index_start += 1} - ｢〆｣➟ ${commandGroup.group.toUpperCase()}`);
    msg += ` `;
    msg += ` `;
    msg += `\n╚╩══• •ＮＯＮＥ• •══╩╝`;
    msg += `\n☛ قم بالرد على هذه الرسالة برقم القسم ثم أكتب إسم الأمر مباشرةً `;
    msg += `  `;
  }
  return api.sendMessage({ body: msg, attachment: imgP }, threadID, messageID);
}
