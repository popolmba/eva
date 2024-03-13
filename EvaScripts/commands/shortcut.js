module.exports.config = {
	name: "ردود",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "CatalizCS",
	description: "ضيف ردود لمجموعتك",
	commandCategory: "ادمنية الگروبات",
    usages: "[الكل/حذف]",
	cooldowns: 5,
	dependencies: {
		"fs-extra": "",
        "path": ""
	}
}

module.exports.onLoad = function () {
    const { existsSync, writeFileSync, mkdirSync, readFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, "Shortcut", "shortcutdata.json");
    const pathGif = resolve(__dirname, "Shortcut", "shortcutGif");

    if (!global.moduleData.shortcut) global.moduleData.shortcut = new Map();

    if (!existsSync(path)) writeFileSync(path, JSON.stringify([]), "utf-8");
    if (!existsSync(pathGif)) mkdirSync(pathGif, { recursive: true });

    const data = JSON.parse(readFileSync(path, "utf-8"));

    for (const threadData of data) global.moduleData.shortcut.set(threadData.threadID, threadData.shortcuts);

    return;
}

module.exports.handleEvent = async function ({ event, api, Users }) {
    const { threadID, messageID, body, senderID } = event;
    if (!global.moduleData.shortcut) global.moduleData.shortcut = new Map();
    if (!global.moduleData.shortcut.has(threadID)) return;
    const data = global.moduleData.shortcut.get(threadID);

    if (data.some(item => item.input == body)) {
        const { resolve } = global.nodemodule["path"];
        const { existsSync, createReadStream } = global.nodemodule["fs-extra"];
        const dataThread = data.find(item => item.input == body);
        const path = resolve(__dirname, "Shortcut", "shortcutGif", `${dataThread.id}.gif`);
        
        var object, output;
        var output = dataThread.output;
        if (/\{name}/g.test(output)) {
            const name = global.data.userName.get(senderID) || await Users.getNameUser(senderID);
            output = output.replace(/\{name}/g, name);
        }
        
        if (existsSync(path)) object = { body: output, attachment: createReadStream(path) }
        else object = { body: output };
        
        return api.sendMessage(object, threadID, messageID);

    }
}

module.exports.handleReply = async function ({ event, api, handleReply }) {
    if (handleReply.author != event.senderID) return;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const { threadID, messageID, senderID, body } = event;
    const name = this.config.name;

    const path = resolve(__dirname, "Shortcut", "shortcutdata.json");

    switch (handleReply.type) {
        case "requireInput": {
            if (body.length == 0) return api.sendMessage("لا يمكن ترك الإجابات فارغة !", threadID, messageID);
            const data = global.moduleData.shortcut.get(threadID) || [];
            if (data.some(item => item.input == body)) return api.sendMessage(" هذا الرد موجود !", threadID, messageID);
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage("رد ع هاي الرسالة واكتب الرد !", threadID, function (error, info) {
                return global.client.handleReply.push({
                    type: "requireOutput",
                    name,
                    author: senderID,
                    messageID: info.messageID,
                    input: body
                });
            }, messageID);
        }
        case "requireOutput": {
            if (body.length == 0) return api.sendMessage("لا يمكن ترك الإجابات فارغة!", threadID, messageID);
            api.unsendMessage(handleReply.messageID);
            return api.sendMessage("اذا تريد تخلي الرد بصورة رد ع هاي الرسالة وحط رابط الصورة \n-(اذا متعرف تضيف رابط شوف هذا الفيديو https://t.me/بعدني ممسوي شرح)\n- اذا تريده بدون صورة رد ع هاي الرسالة بأيشي حتى احفظ الرد ", threadID, function (error, info) {
                return global.client.handleReply.push({
                    type: "requireGif",
                    name,
                    author: senderID,
                    messageID: info.messageID,
                    input: handleReply.input,
                    output: body
                });
            }, messageID);
        }
        case "requireGif": {
            const id = global.utils.randomString(10);
            if (body.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:gif|GIF)/g)) {
                const pathGif = resolve(__dirname, "Shortcut", "shortcutGif", `${id}.gif`);
                try {
                    await global.utils.downloadFile(body, pathGif);
                } catch (e) { return api.sendMessage("تعذر تنزيل الملف لأن الرابط غير موجود أو أن البوت  لديه مشكلة في الشبكة!", threadID, messageID); }
            }
            
            const readData = readFileSync(path, "utf-8");
            var data = JSON.parse(readData);
            var dataThread = data.find(item => item.threadID == threadID) || { threadID, shortcuts: [] };
            var dataGlobal = global.moduleData.shortcut.get(threadID) || [];
            const object = { id, input: handleReply.input, output: handleReply.output };

            dataThread.shortcuts.push(object);
            dataGlobal.push(object);

            if (!data.some(item => item.threadID == threadID)) data.push(dataThread);
            else {
                const index = data.indexOf(data.find(item => item.threadID == threadID));
                data[index] = dataThread;
            }

            global.moduleData.shortcut.set(threadID, dataGlobal);
            writeFileSync(path, JSON.stringify(data, null, 4), "utf-8");

            return api.sendMessage(`تمت إضافة اختصار جديد بنجاح ، إليك نظرة عامة :\n- ID: ${id}\n- الكلمة : ${handleReply.input}\n- الرد: ${handleReply.output}`, threadID, messageID);
        }
    }
}

module.exports.run = function ({ event, api, args }) {
    const { readFileSync, writeFileSync, existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const { threadID, messageID, senderID } = event;
    const name = this.config.name;

    const path = resolve(__dirname, "Shortcut", "shortcutdata.json");

    switch (args[0]) {
        case "remove":
        case "delete":
        case "del":
        case "حذف": {
            const readData = readFileSync(path, "utf-8");
            var data = JSON.parse(readData);
            const indexData = data.findIndex(item => item.threadID == threadID);
            if (indexData == -1) return api.sendMessage("لا تمتلك مجموعتك حاليًا أي ردود .!", threadID, messageID);
            var dataThread = data.find(item => item.threadID == threadID) || { threadID, shortcuts: [] };
            var dataGlobal = global.moduleData.shortcut.get(threadID) || [];
            var indexNeedRemove;

            if (dataThread.shortcuts.length == 0) return api.sendMessage("لا تمتلك مجموعتك حاليًا أي ردود .!", threadID, messageID);

            if (isNaN(args[1])) indexNeedRemove = args[1];
            else indexNeedRemove = dataThread.shortcuts.findIndex(item => item.input == (args.slice(1, args.length)).join(" ") || item.id == (args.slice(1, args.length)).join(" "));
            
            dataThread.shortcuts.splice(indexNeedRemove, 1);
            dataGlobal.splice(indexNeedRemove, 1);

            global.moduleData.shortcut.set(threadID, dataGlobal);
            data[indexData] = dataThread;
            writeFileSync(path, JSON.stringify(data, null, 4), "utf-8");

            return api.sendMessage("تم الحذف بنجاح !", threadID, messageID);
        }

        case "list":
        case "all":
        case "الكل": {
            const data = global.moduleData.shortcut.get(threadID) || [];
            var array = [];
            if (data.length == 0) return api.sendMessage("لا تمتلك مجموعتك حاليًا أي ردود .!", threadID, messageID);
            else {
                var n = 1;
                for (const single of data) {
                    const path = resolve(__dirname, "Shortcut", "shortcutGif", `${single.id}.gif`);
                    var existPath = false;
                    if (existsSync(path)) existPath = true;
                    array.push(`${n++}/ ${single.input} => ${single.output} (${(existPath) ? "YES" : "NO"})`);
                }
                return api.sendMessage(`「الاختصارات」فيما يلي جميع اختصارات المجموعة المتاحة :\n[stt]/ [الكلمة] => [الرد] (exist gif)\n\n${array.join("\n")}`, threadID, messageID);
            }
        }

        default: {
            return api.sendMessage("قم بالرد على هذه الرسالة لإدخال الكلمات", threadID, function (error, info) {
                return global.client.handleReply.push({
                    type: "requireInput",
                    name,
                    author: senderID,
                    messageID: info.messageID
                });
            }, messageID);
        }
    }

    
}