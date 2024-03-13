const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "نوني",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "S H A D Y",
  description: "goibot",
  commandCategory: "المطور",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["عمكم😺؟" , "منو ينادي محبوب الكل >_<..." , "أحبك🤧🖤" , "الورد الطيب💞🙃 " , "خادمتك فاي وقت 🖤🙁", "سمعتك تصيحني؟👀", "كنت هموت ملل بدونك 🙃💞", "حبك الاول والاخير🙂🎧"];
   var rand = tl[Math.floor(Math.random() * tl.length)]

  if ((event.body.toLowerCase() == "مشتاقلك") || (event.body.toLowerCase() == "شتاقيتلك")) {
     return api.sendMessage("️ ياعمري فدووة 🥺❤️", threadID, messageID);
   };
  if ((event.body.toLowerCase() == "احبك") || (event.body.toLowerCase() == "حبك")) {
     return api.sendMessage("️حبيبي بس علوش 😑", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "ضايج") || (event.body.toLowerCase() == "مخنوك")) {
     return api.sendMessage("️ امشيطلعبرراااااا", threadID, messageID);
   };

  if ((event.body.toLowerCase() == " كيوت") || (event.body.toLowerCase() == "كيوتت")) {
     return api.sendMessage("️يعمريييي🤧💞", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "تحبني") || (event.body.toLowerCase() == "اتحبني")) {
     return api.sendMessage("️شوية احبك 💓🙄", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "شسمك") || (event.body.toLowerCase() == "شنو اسمك")) {
     return api.sendMessage("️نوني💞😺", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "شلونكم") || (event.body.toLowerCase() == "شلونك")) {
     return api.sendMessage("️بخير وانت✨❤️", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "السلام عليكم") || (event.body.toLowerCase() == "سلام عليكم")) {
     return api.sendMessage("️ وعليكم السلام", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "جيت") || (event.body.toLowerCase() == "اجيت")) {
     return api.sendMessage("️منور", threadID, messageID);
   };
   if ((event.body.toLowerCase() == "كسمك") || (event.body.toLowerCase() == " كستخك")) {
     return api.sendMessage("️ابن لكحبه لتغلط بلاع العير", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "سيد سجاد") || (event.body.toLowerCase() == "سيد")) {
     return api.sendMessage("️تاج وباج", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "عير بيك") || (event.body.toLowerCase() == "كس امك")) {
     return api.sendMessage("️ ياخي عيب عيبببببب عيببب🗿", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "نعسان ") || (event.body.toLowerCase() == "تصبحون على خير")) {
     return api.sendMessage("️نام نامت عليك طابوكة", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "بيس") || (event.body.toLowerCase() == "منو يلعب بيس")) {
     return api.sendMessage("️روح العب ويا علش يطلع طينك ", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "ديزي") || (event.body.toLowerCase() == "سلوم")) {
     return api.sendMessage("️هذا حامظ الخلابيك ارحم منه فد حاممممض خرب يومه حموضه", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "خرب الله") || (event.body.toLowerCase() == "خربربك")) {
     return api.sendMessage("️ياخي والله العظيم حرام تكفر شستفاديت هسه من كفرت ؟", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "تصبحون ع خير") || (event.body.toLowerCase() == "تصبحون على خير")) {
     return api.sendMessage("️وانت بالف خير حبيبي", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "من هو هيما") || (event.body.toLowerCase() == "مسعود الكلب")) {
     return api.sendMessage("هو زاحف كبير يطبق المعني الحرفي لحريم السلطان", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "خرب دينك") || (event.body.toLowerCase() == "خربلة")) {
     return api.sendMessage("️ياخي والله العظيم حرام شستفاديت هسه من كفرت ؟", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "خربدينك") || (event.body.toLowerCase() == "خربله")) {
     return api.sendMessage("ياخي والله العظيم حرام شستفاديت هسه من كفرت ؟", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "من هي ريهام") || (event.body.toLowerCase() == "الجراده المعفنه")) {
     return api.sendMessage("️هي بنت براس جراده نتنه بس وجودها مش بيعمل ريحه زي اميره", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "من هو رضا") || (event.body.toLowerCase() == "المهزء")) {
     return api.sendMessage("️مهزء حقير بيعيط علي رفاق راحو من قبل منتولد", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "من هو ايرين") || (event.body.toLowerCase() == "ابو جرده")) {
     return api.sendMessage("️كاءن معفن عايش يسب ويتجرد ويتعاقب ويرجع يسب ويتجرد", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "جيت") || (event.body.toLowerCase() == "باااكك")) {
     return api.sendMessage("️نورت البيت🫣❤", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "المطور") || (event.body.toLowerCase() == "من المطور")) {
     return api.sendMessage("✨علي حسين ✨داريو", threadID);
   };
   mess = "{name}"

  if (event.body.indexOf("كيوت") == 0 || (event.body.indexOf("نوني") == 0)) {
    var msg = {
      body: ` ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }