module.exports.config = {
    name: "صعد",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Ali Hussein",
    description: "ارفع شخص ما إلى الأدمنية في المجموعة",
    commandCategory: "المطور",
    usages: "[تاك]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const threadID = event.threadID;
    const mentions = Object.keys(event.mentions);

    if (mentions.length !== 1) {
        return api.sendMessage("سوي تاك للشخص الي تريد ترفعه ادمن", threadID);
    }

    const userID = mentions[0];
    api.changeAdminStatus(threadID, userID, true, (err) => {
        if (err) {
            api.sendMessage("حدث خطأ عند محاولة ترقية هذا الشخص إلى أدمن، قد لا تملك الصلاحيات الكافية", threadID);
        } else {
            api.sendMessage({ text: "تم ترقية الشخص المحدد إلى أدمن." , mentions: [{
                tag: event.mentions[userID],
                id: userID
            }]}, threadID);
        }
    });
};
