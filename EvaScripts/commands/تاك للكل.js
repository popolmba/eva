module.exports.config = {
  name: "الكل",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "NTKhang",
  description: "سوي تاك للكل",
  commandCategory: "الگروب",
  usages: "[تاك للكل]",
  cooldowns: 80
};

module.exports.run = async function({ api, event, args }) {
  const mentions = [];
  for (const userID of event.participantIDs) {
    mentions.push({ tag: '@user', id: userID });
  }

  const body = args.join(' ') + '\n' + mentions.map(m => m.tag).join(' ');
  api.sendMessage({ body: body, mentions: mentions }, event.threadID, event.messageID);
};
