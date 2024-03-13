module.exports.config = {
 name: "منعسرقة",
 version: "1.0.0",
 credits: "𝒍𝒊𝒏𝒖𝒙",
 hasPermssion: 1,
 description: "منع ازالة ادمن المجموعة",
 usages: "",
 commandCategory: "حماية",
 cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('بحاجة إلى أذونات مسؤول المجموعة ، يرجى رفع البوت والمحاولة مرة أخرى!', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["guard"] == "guard" || data["guard"] == false) data["guard"] = true;
    else data["guard"] = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`${(data["guard"] == true) ? "تشغيل" : "ايقاف"} منع السرقة ✅.`, event.threadID, event.messageID);
}