module.exports.config = {
	name: "طيزي",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "S H A D Y",
	description: "عرض طيزك",
	commandCategory: "تاك", 
	usages: "", 
	cooldowns: 0,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {

    var tle = Math.floor(Math.random() * 101);
    var name = (await Users.getData(event.senderID)).name
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
"https://i.postimg.cc/X7n7hhhm/received-1012302329447738.jpg",
"https://i.postimg.cc/pLTVVjPB/received-1375820862930604.jpg",
"https://i.postimg.cc/d3wvbkWr/received-1599678703760447.jpg",
"https://i.postimg.cc/KzXm5sB9/received-348523790730291.jpg",
"https://i.postimg.cc/Gm5L4p2n/received-436690154613797.jpg",
"https://i.postimg.cc/gjCRHGLk/received-566112211770539.jpg",
"https://i.postimg.cc/d1X5kkvh/received-335334368784301.jpg",
"https://i.postimg.cc/63THpLss/received-742278120229750.jpg",];
  var callback = () => api.sendMessage({body:`📏 ${name}\n عرض طيزك هو ${tle}cm `,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };