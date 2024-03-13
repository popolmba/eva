module.exports.config = {
    name: "معلومة",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ياسمين",
    description: "اكتب معلومة وسوالك الي تريدة",
    commandCategory: "ذكاء اصطناعي",
    usages: "اساله اي معلومة",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("رجاءا اكتب نص الذي تريد بحث عن معلومات عنه...", tid, mid);
    try {
        const res = await axios.get(`https://api.kenliejugarap.com/gptgo/?text=${content}`);
        const respond = res.data.response;
        if (res.data.error) {
            api.sendMessage("Error: " + res.data.error, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(respond, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("حصل خطأ السيرفر يتلقى العديد من الاستجابات  ❌", tid, mid);
    }
};
