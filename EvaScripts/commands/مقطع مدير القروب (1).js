module.exports.config = {
  name: "مدير القروب",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "HUSSEIN",
  description: "مقطع فيديو",
  commandCategory: "تاك",
  usages: "متعة",
  usePrefix:true,
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
   var hi = [""];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [

    "https://i.imgur.com/lBEuTEN.mp4",
      // Add more video links here
];
     var callback = () => api.sendMessage({body:` ${know} `,attachment: fs.createReadStream(__dirname + "/cache/15.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/15.mp4"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/15.mp4")).on("close",() => callback());
   };