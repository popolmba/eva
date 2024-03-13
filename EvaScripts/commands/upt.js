function convert(time){
  var date = new Date(`${time}`);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var formattedDate = `${ day < 10 ? "0" + day : day}` + "/" +`${ month < 10 ? "0" + month : month}` + "/" + year + "||" + `${ hours < 10 ? "0" + hours : hours}` + ":" + `${ minutes < 10 ? "0" + minutes : minutes}` + ":" + `${ seconds < 10 ? "0" + seconds : seconds}`;
  return formattedDate;
};

const headers = {
  "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like) Version/12.0 eWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
  "accept": "application/json, text/plain, /"
};

module.exports.config = {
  name: "pmp",
  version: "0.0.1",
  hasPermsion: 0,
  credits: "Arjhil",
  description: "قم بالحصول على معلومات حول الأعضاء",
  usePrefix: true,
  usages: "[رد على رسالة/آيدي/@منشن]",
  commandCategory: "",
  usePrefix: false,
  cooldowns: 0
};

module.exports.run = async function({ api, event, args }) {
  const request = require("request");
  const axios = require("axios");
  const fs = require("fs");
  let path = __dirname + `/cache/ArjhilPogi1.png`;
  let token = "EAAAAUaZA8jlABO4ITJA0lRltHNeLRzWFziD9ZCjLJqZAlOZCORKMgbUYpzMPjA3ldA90vRNiX7VX4Jo8IYDZBmCPB3Y3xTURwre94wvmwKcSXeVqORW5n5QXBzB8HXE4BZAzBgHdUFtDymJ9WvEC9RTxpAKdmL8KHKZAZBkYHoiI1LyBO4hDKqxdhpkqr89gZB8KwNNpUKBvA"; 

  if (args.join().indexOf('@') !== -1){ var id = Object.keys(event.mentions) }
  else var id = args[0] || event.senderID;
  if(event.type == "message_reply") { var id = event.messageReply.senderID }
  try{
    const resp = await axios.get(`https://graph.facebook.com/${id}?fields=id,is_verified,cover,created_time,work,hometown,username,link,name,locale,location,about,website,birthday,gender,relationship_status,significant_other,quotes,first_name,subscribers.limit(0)&access_token=${token}`,{ headers: headers });
    var name = resp.data.name;
    var link_profile = resp.data.link;
    var uid = resp.data.id;
    var first_name = resp.data.first_name;
    var username = resp.data.username || "لا بيانات!";
    var created_time = convert(resp.data.created_time);
    var web = resp.data.website || "لا بيانات!";
    var gender = resp.data.gender;
    var relationship_status = resp.data.relationship_status || "لا بيانات!";
    var love = resp.data.significant_other || "لا بيانات!";
    var bday = resp.data.birthday || "لا بيانات!";
    var follower = resp.data.subscribers.summary.total_count || "لا بيانات!";
    var is_verified = resp.data.is_verified;
    var quotes = resp.data.quotes || "لا بيانات!";
    var about = resp.data.about || "لا بيانات!";
    var locale = resp.data.locale || "لا بيانات!";
    var hometown = !!resp.data.hometown?resp.data.hometown.name:"لا بيانات";
    var cover = resp.data.source || " هذا الشخص لم يقم بوضع صورة";
    var avatar = `https://graph.facebook.com/${id}/picture?width=1500&height=1500&access_token=1174099472704185|0722a7d5b5a4ac06b11450f7114eb2e9`;

    //callback
    let cb = function() {
      api.sendMessage({
        body: `\n💮━━مِـٰٚـِْ✮ِـٰٚـِْعِـٰٚـِْ✮ِـٰٚـِْلِـٰٚـِْ✮ِـٰٚـِْﯛ̲୭مِـٰٚـِْ✮ِـٰٚـِْآتِـٰٚـِْ✮ِـٰٚـِْ ❀🎼━━💮\n
اࠗلإسܱܰـــمࣩــ ∬💛: ${name}
اࠗلإسܱܰـــمࣩــ اࠗلأ୨ول •🌱💚﴿ֆ ❥: ${first_name}
تاࢪيخــ۫͜ـ اݪإنضــٰـُ͢ـًُمـٰامـٰ ∬❖: ${created_time}
آيٰدَيٰ 🌸⇣: ${uid}
رٰآبِٰـِﮧۢطِٰـﮧِۢ فِٰـِﮧۢيِٰـﮧِۢسِٰـﮧِۢبِٰـِﮧۢﯛ̲୭ڪِٰـﮧِۢ 😻💞؛: ${link_profile}
اིلཻنوٰ໑ٰع 🌸❥˓: ${gender}
اٰلـٰ̲ـہحـٰ̲ـہاٰلـٰ̲ـہة اٰلـٰ̲ـہاٰجـٰ̲ـہتـٰ̲ـہمـٰ̲ـہاٰعـٰ̲ـہيـٰ̲ـہة ⚡️ֆ⎝: ${relationship_status}
تِٰـِۢآريِٰـِۢخٰ̐ـِۢ آلِٰـِۢإزديِٰـِۢآد ♚꫶😼: ${bday}
اٰلـہٰٖمٰـہٰٖتٰـہٰٖاٰبٰـہٰٖعٰـہٰٖـ૭نٰـہٰٖ ֆ🔱ۦ: ${follower}
مسقط الرأس ֆ☻: ${hometown}
اࠗلمࣩ୨وق֯عٌ ║🐌: ${locale}
\n💮━━━━━━━━━━━━━━━━━━💮\n`, attachment: fs.createReadStream(path)
      }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    };
    request(encodeURI(avatar)).pipe(fs.createWriteStream(path)).on("close", cb);
  } catch (err) {
    api.sendMessage(` ❌ | خطأ: ${err.message}`, event.threadID, event.messageID)
  }
}