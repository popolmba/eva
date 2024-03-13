module.exports.config = {
    name: "نزل",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Ali Hussein",
    description: "ازل شخص ما من الأدمنية في المجموعة",
    commandCategory: "المطور",
    usages: "[تاك]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const threadID = event.threadID;
    const mentions = Object.keys(event.mentions);

    if (mentions.length !== 1) {
        return api.sendMessage("سوي تاك للشخص الي تريد حذفه من الأدمنية", threadID);
    }

    const userID = mentions[0];
    api.changeAdminStatus(threadID, userID, false, (err) => {
        if (err) {
            api.sendMessage("حدث خطأ عند محاولة إزالة هذا الشخص من الأدمنية، قد لا تملك الصلاحيات الكافية", threadID);
        } else {
            api.sendMessage({ text: "تم إزالة الشخص المحدد من الأدمنية." , mentions: [{
                tag: event.mentions[userID],
                id: userID
            }]}, threadID);
        }
    });
};
