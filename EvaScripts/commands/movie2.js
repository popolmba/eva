module.exports.config = {
    name: "فلم",
    version: "1.0.0",
    hasPermision: 0,
    credit: "Kopiko",
    description: "معلومات أي فلم",
    commandCategory: "سينمانا",
    cooldowns: 0,
};

module.exports.run = async function({api, event, args, utils, Users, Threads}) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
        let juswa = args.join(" ");
	const res = await axios.get(`https://api.popcat.xyz/imdb?q=${juswa}`);
	console.log(res.data);
	var data = res.data;
	let callback = function() {
            return api.sendMessage({
                body:`-اسم الفلم: ${data.title}\n-سنة الانتاج: ${data.year}\n-الوقت : ${data.runtime}\n-التصنيف :${data.genres}\n-المخرجين: ${data.director}\n-التقييم :${data.rating}\n-ارباح البوكس اوفس : ${data.boxoffice}\n\n-القصة: ${data.plot}`,
                attachment: fs.createReadStream(__dirname + `/cache/poster.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/poster.png`), event.messageID);
        };
		return request(encodeURI(data.poster)).pipe(fs.createWriteStream(__dirname + `/cache/poster.png`)).on("close", callback);
		} catch (err) {
        console.log(err)
        return api.sendMessage(`اكتب اسم العنصر !`, event.threadID)
    }
}