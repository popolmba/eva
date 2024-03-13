module.exports.config = {
 name: "منع دخول",
 version: "1.0.0",
 credits: "D-Jukie",
 hasPermssion: 1,
 description: "منع اي شخص من الانظمام",
 usages: "منع دخول on او off",
 commandCategory: "حماية",
 cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('[😈]➜ صعد البوت ادمن (البوت ليس ادمن)', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data.newMember == "undefined" || data.newMember == false) data.newMember = true;
    else data.newMember = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`[👿]➜ لاستخدام ${(data.newMember == true) ? "on" : "off"} امر حماية منع انضمام اي شخص للمجموعة شغله او وقفه`, event.threadID, event.messageID);
}