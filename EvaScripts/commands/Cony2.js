module.exports.config = {
	name: "كسي",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "S H A D Y",
	description: "عرض كسك",
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
"https://memegenerator.net/img/instances/400x/30181484/my-vagina-is-on-fire.jpg",
"https://c.tenor.com/GOcjrBjKr50AAAAM/im-dangerous-vagina-in-fire.gif",
"https://i.imgflip.com/5z9hat.jpg",
"https://i.postimg.cc/6pQVhTdd/295933548-351955097135228-5782656783744377482-n.jpg",
"https://joshrimer.com/wp-content/uploads/2016/03/1-23.png",
"https://pbs.twimg.com/media/ExY0b_fU8AA-cLM.jpg",];
  var callback = () => api.sendMessage({body:`📏 ${name}\n عرض كسك هو ${tle}cm `,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };