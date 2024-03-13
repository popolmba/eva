module.exports.config = {
    name: "ارضع",
    version: "2.2.2",
    hasPermssion: 2,
    credits: "Joshua Sy",
    description: "خلي يرضع صدرك",
    commandCategory: "+18",
    usages: "[@تاك]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async() => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'choiless.png');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/1fXAsXK.jpeg", path);
}

async function makeImage({ one, two }) {    
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let choiless_image = await jimp.read(__root + "/choiless.png");
    let avatarOnePath = __root + `/avatarOne_${two}.png`;
    let avatarTwoPath = __root + `/avatarTwo_${one}.png`;
    let pathImg = __root + `/choiless_${two}_${one}.png`;

    const getAvatarOne = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOnePath, Buffer.from(getAvatarOne, 'binary'));

    const getAvatarTwo = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwoPath, Buffer.from(getAvatarTwo, 'binary'));

    let circleOne = await jimp.read(await circle(fs.readFileSync(avatarOnePath)));
    let circleTwo = await jimp.read(await circle(fs.readFileSync(avatarTwoPath)));
    choiless_image.composite(circleOne.resize(150, 150), 180, 90).composite(circleTwo.resize(150, 150), 300, 300);

    let raw = await choiless_image.getBufferAsync("image/png");

    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOnePath); // Remove the temporary avatar file
    fs.unlinkSync(avatarTwoPath); // Remove the temporary avatar file

    return pathImg;
}

async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);
    if (!mention[0]) return api.sendMessage("Please mention 1 person.", threadID, messageID);
    else {
        var one = senderID, two = mention[0];
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "امممممم🤤🤍", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
}
