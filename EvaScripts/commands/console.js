module.exports.config = {
    name: "console",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "D-Jukie",//mod lại by toàn
    description: " ",
    commandCategory: "",
    usages: "",
    cooldowns: 5
};

module.exports.handleEvent = async function ({
    api,
    event,
    args,
    Users,
    Threads
}) {
    const {
        configPath
    } = global.client;
    const {
        DeveloperMode
    } = global.config;
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    const modDev = config.DeveloperMode
     if ((this.config.credits) != "D-Jukie") { return }
    if (modDev == true) return
    else {
   const chalk = require('chalk');
     const moment = require("moment-timezone");
var time= moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:s");
    var d = new Date();
    const cc = d.getDay();
    const ss = d.getYear();
    const yy = d.getMonth();
    switch (cc) {
        case 0: {
            textt = "Chủ Nhật"
            break;
        }
        case 1: {
            textt = "Thứ Hai"
            break;
        }
        case 2: {
            textt = "Thứ Ba"
            break;
        }
        case 3: {
            textt = "Thứ Bốn"
            break;
        }
        case 4: {
            textt = "Thứ Năm"
            break;
        }
        case 5: {
            textt = "Thứ Sáu"
            break;
        }
        default: {
            textt = "Thứ Bảy"
        }
    }
    var msg = event.body||"الصور ومقاطع الفيديو أو الشخصيات الخاصة";
    const threadInfo = await api.getThreadInfo(event.threadID)
    var threadName = threadInfo.threadName||"الاسم غير موجود";
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var randomColor1 = Math.floor(Math.random()*12345678).toString(16);
    var randomColor2 = Math.floor(Math.random()*13245769).toString(16);
    var randomColor3 = Math.floor(Math.random()*13333333).toString(16);
    const name = await Users.getNameUser(event.senderID)
    return console.log(chalk.hex("#" + randomColor)(`${threadName} `) + chalk.hex("#" + randomColor)(`|`) +chalk.hex("#" + randomColor1) (` ${name} `) + chalk.hex("#" + randomColor)(`|`) + chalk.hex("#" + randomColor2)(` ${msg} `) + chalk.hex("#" + randomColor) (`|`) + chalk.hex("#" + randomColor3)(`\n${textt} ${time}`) );
}
}
module.exports.run = async ({
    api,
    event,
    args
}) => {
    if ((this.config.credits) != "D-Jukie") { return api.sendMessage(`⚡️تم تغيير الاعتمادات المكتشفة`, event.threadID, event.messageID)}
    const {
        configPath
    } = global.client;
    const {
        DeveloperMode
    } = global.config;
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    const modDev = config.DeveloperMode

    if (modDev == true) {
        api.sendMessage(`🐧مود المطور: ${modDev}\n🐧يرجى الضبط على false  للاستخدام  !!!`, event.threadID)
    } else
        return api.sendMessage(`🐧مود المطور: ${modDev}\n🐧وحدة التحكم قيد التشغيل...`, event.threadID)
    }