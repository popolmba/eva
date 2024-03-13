module.exports.config = {
    name: "تفليش",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "...",
    description: "تفليش",
    commandCategory: "البوت",
    usages: " ",
    cooldowns: 10,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
    var a = function (a) { api.sendMessage(a, event.threadID); }
a("جار بدء التفليش!");
setTimeout(() => {a("1")} , 3000);
setTimeout(() => {a("2")} , 5000);
setTimeout(() => {a("3")} , 7000);
setTimeout(() => {a("4")} , 9000);
setTimeout(() => {a("5")} , 12000);
setTimeout(() => {a("6")} , 15000);
setTimeout(() => {a("7")} , 17000);
setTimeout(() => {a("8")} , 20000);
setTimeout(() => {a("9")} , 23000);
setTimeout(() => {a("10")} , 28500);
setTimeout(() => {a("كومبي صدكتوا")} , 30000);


  
  }