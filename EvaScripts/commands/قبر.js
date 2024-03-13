module.exports.config = {
    name: "قبر",
    version: "2.2.2",
    hasPermssion: 0,
    credits: "CHIP2502",
    description: "سوي صاحيك ميت",
    commandCategory: "تاك",
    usages: "[@تاك]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async () => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'tabot.jpg');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/6WqT8E3.jpeg", path);
};

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    // Load the tabot.jpg image
    let m9_image = await jimp.read(__root + "/tabot.jpg");
    let pathImg = __root + `/tabot_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;

    // Download avatars
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

  let circleOne = await jimp.read(await circle(avatarOne));
  let originalTwo = await jimp.read(avatarTwo);
  m9_image.composite(circleOne.resize(120, 120), 530, 490).composite(originalTwo.resize(250, 250), 150, 350);

    // Save and get buffer
    let raw = await m9_image.getBufferAsync("image/png");

    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);

    return pathImg;
}

async function circle(image) {
    const jimp = global.nodemodule["jimp"];
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async ({ event, api, args }) => {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);

    if (!mention[0]) {
        return api.sendMessage("سوي تاك الصاحبك الميت", threadID, messageID);
    } else {
        const one = senderID, two = mention[0];
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
};module.exports.run = async ({ event, api, args }) => {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);

    if (!mention[0]) {
        return api.sendMessage("سوي تاك الصاحبك الميت", threadID, messageID);
    } else {
        const one = senderID, two = mention[0];
        return makeImage({ one, two }).then(path => {
            // الرسالة التي سترسل مع الصورة
            const msg = {
                body: `محد مهتم چلب ومات`,
                attachment: fs.createReadStream(path)
            };

            // أرسل الرسالة مع الصورة
            api.sendMessage(msg, threadID, () => {
                // حذف ملف الصورة بعد الإرسال
                fs.unlinkSync(path);
            }, messageID);
        });
    }
};
