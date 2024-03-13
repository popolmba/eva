module.exports.config = {
  name: "طوكيو",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "S H A D Y",
  description: "صور شخصية طوكيو رفنجر",
  commandCategory: "انمي",
  usages: "tokyo revengers",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
    // ... your array of links ...
  ];
  var max = Math.floor(Math.random() * 6);  
  var min = Math.floor(Math.random() * 2);
  var callback = () => api.sendMessage({
      body: `صور : 𝘁𝗼𝗸𝘆𝗼 𝗿𝗲𝘃𝗲𝗻𝗴𝗲𝗿𝘀\n عدد الصور : ${link.length}`,
      attachment: fs.createReadStream(__dirname + "/cache/28.jpg")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/28.jpg"), event.messageID); 
  return request(encodeURI(link[Math.floor(Math.random() * link.length)] + (max - min)))
    .pipe(fs.createWriteStream(__dirname + "/cache/28.jpg"))
    .on("close",() => callback());
};