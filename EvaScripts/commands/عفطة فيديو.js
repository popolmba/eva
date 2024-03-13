module.exports.config = {
    name: "عفطة",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "D E Y A A",
    description: "عفطة فيديو",
    commandCategory: "تاك",
    usages: "",
    cooldowns: 0,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async function({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) {
    var loyalty = Math.floor(Math.random() * 101);
    var name = (await Users.getData(event.senderID)).name;
    const fs = global.nodemodule["fs-extra"];
    var videoLinks = [
        "https://j.top4top.io/m_2877golos0.mp4", // يجب استبدال هذا الرابط برابط الفيديو الفعلي
    ];
    var localVideoPath = __dirname + "/cache/canvas/3f9a.mp4";

    var callback = () => api.sendMessage({
        body: `❣️ ${name}\nنسبه ولائك هي: ${loyalty}%`,
        attachment: fs.createReadStream(localVideoPath)
    }, event.threadID, () => fs.unlinkSync(localVideoPath));

    return await global.nodemodule["axios"]({
        method: 'get',
        url: videoLinks[Math.floor(Math.random() * videoLinks.length)],
        responseType: 'stream'
    }).then(function (response) {
        const stream = response.data.pipe(fs.createWriteStream(localVideoPath));
        stream.on("finish", callback);
    }).catch(function (error) {
        api.sendMessage("حدث خطأ أثناء تحميل الفيديو.", event.threadID);
        console.error(error);
    });
};
