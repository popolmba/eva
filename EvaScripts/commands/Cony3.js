module.exports.config = {
	name: "عيري",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "S H A D Y",
	description: "طول عيرك",
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
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCx8KX6Y9C78DSupCGiTkGblITI8q5eWuTkA&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToNa5SveCCaum4QRAIXsAr1RH4mg_lsg1lLw&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VFevrtEybiCbnJMAGF228AsUNgdaVDg-SQ&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_loLAyvoHAjBuOkGVWArgM8NS0UpacQndA&usqp=CAU",
"https://thechive.com/wp-content/uploads/2020/08/women-share-the-most-surprising-things-they-didnt-know-about-penises-18-photos-17-21.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgkpbFNCCvlIZU5LuefjgWWltcIel19DNkGA&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSTzfEYSKV_FHU3a9hL1gdRx1rFOtj7fjk-g&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOJlL_OJjBaNHuqmUBJGJFl9R4J8wmsuwlbw&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXuTzESuYDxPtEX26x4KkwJYje6BSJGOGkVg&usqp=CAU",
"https://cdn-www.mandatory.com/assets/uploads/2021/08/GettyImages-1127725958-e1629389007829.jpg",];
  var callback = () => api.sendMessage({body:`📏 ${name}\n طول عيرك هو ${tle}cm `,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };