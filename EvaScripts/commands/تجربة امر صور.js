const fs = require('fs-extra');
const axios = require('axios');

module.exports.config = {
    name: "ارسم",
    version: "1.0.",
    hasPermssion: 0,
    credits: ".ديدوز.",
    description: "يحول نص إلى صورة",
    usePrefix: true,
    commandCategory: "ذكاء اصطناعي",
    usages: ".نص_إلى_صورة هذا نص للتحويل",
    cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID } = event;
    const query = args.join(" ");

    if (!query) return api.sendMessage("الرجاء إدخال نص للتحويل.", threadID, messageID);

    const formData = new FormData();
    formData.append('text', query);

    try {
        const resp = await axios.post('https://api.deepai.org/api/text2img', formData, {
            headers: {
                'api-key': 'e84ab6d1-006a-494f-a77a-ad0409f6605c',
                ...formData.getHeaders(),
            },
            responseType: "arraybuffer",
        });

        const path = __dirname + `/cache/text2img.png`;
        fs.writeFileSync(path, Buffer.from(resp.data, "utf-8"));

        api.sendMessage({
            body: "تفضل يلطيف✅",
            attachment: fs.createReadStream(path),
        }, threadID, () => fs.unlinkSync(path), messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("حدث خطأ أثناء معالجة النص إلى صورة.", threadID, messageID);
    }
};
