/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

module.exports.config = {
    name: "قفلل",
    version: "1.1.2",
    hasPermssion: 0,
    credits: "ProCoderMew",
    description: " ",
    commandCategory: "المطور",
    usages: "قفل",
    cooldowns: 5,
    dependencies: {
        "path": "",
        "fs-extra": ""
    }
};

module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const log = require(process.cwd() + '/utils/log');
    const permission = ["100065172561645"];                  
    if (!permission.includes(event.senderID)) return api.sendMessage("ماعدك صلاحية حب", event.threadID, event.messageID);
    const path = resolve(__dirname, 'cache', 'meewmeew.json');
    if (!existsSync(path)) {
        const obj = {
            antiout: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('antiout')) data.antiout = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }

    log("[!]  [!]", '[ ANTIOUT ]');
    log("- لا تستخدم هذا الامر حتى تضوج العالم.", '[ ANTIOUT ]');
    log("- سيتم تضمين مخالفات ما ورد أعلاه  في : gban.", '[ ANTIOUT ]');
    log("[!] من أجل بيئة أنظف [!] ", '[ ANTIOUT ]');
    log("- يرجى ابلاغ المطور على من قام بهذا الاجراء.", '[ ANTIOUT ]');
}

module.exports.run = async function({ api, event }) {
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, 'cache', 'meewmeew.json');
    const { threadID, messageID } = event;
    const database = require(path);
    const { antiout } = database;
    if (antiout[threadID] == true) {
        antiout[threadID] = false;
        api.sendMessage("طفيت قفل المغادرة وحيكدرون يفلتون .", threadID, messageID);
    } else {
        antiout[threadID] = true;
        api.sendMessage("تم , شغلت قفل المجموعة ومحد راح يكدر يطلع 👉🏻👈🏻.", threadID, messageID);
    }
    writeFileSync(path, JSON.stringify(database, null, 4));
}
