module.exports.config = {
	name: "2023",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Hoài Bảo",
	description: "العد التنازلي للسنة الجديدة",
	commandCategory: "ذكاء اصطناعي",
	cooldowns: 5
}

module.exports.run = function ({ event, api }) {
    const t = Date.parse("January 1, 2023 00:00:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );

    return api.sendMessage(`「الوقت المتبقي للسنة الجديدة」\n» ${days} يوم , ${hours} ساعة , ${minutes} دقيقة و ${seconds} ثانية «`, event.threadID, event.messageID);
} 