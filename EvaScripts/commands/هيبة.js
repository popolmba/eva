module.exports.config = {
  name: "هيبة",
  version: "1.0.0",
  permission: 0,
  credits: "Dipto",//don't change the credit please.New coder .So support 🙂🫶🏻
  description: "يرسل فيديوهات  رجولية هيبه",
  usePrefix: true,
  commandCategory: "صور",
  usages: "سيجما",
  cooldowns: 5
};
  module.exports.run = async ({ api, event, args }) => {
  const dipto  =  ["♡︎••🌼إستمتع🌼••♡︎\n♡︎••🌼وكن سيجما 😎🌼••♡︎"];
  const randText = dipto[Math.floor(Math.random() * dipto.length)];

  const videoLinks = [
  "https://drive.google.com/uc?export=download&id=1ApgiGXx--a9Kea2wvar9G7GodlIjLMH-",
    "https://drive.google.com/uc?export=download&id=1Ao2b-fJnl5vhPhEUS6WM-HrAqpPSNPpn",
    "https://drive.google.com/uc?export=download&id=1Am_ta_bIZXISj5jPVWDp3XmviOR1fYQ6",
    "https://drive.google.com/uc?export=download&id=1ArMVMh0AXg_AhoHixNpxv2uk_qbCz70j",
    "https://drive.google.com/uc?export=download&id=1AseJm--0KgVMrWSu1oHu75WOyTJobEMq",
    "https://drive.google.com/uc?export=download&id=1Ax7tflOk4X3uPogfN-khftFJGzKwGmLS",
    "https://drive.google.com/uc?export=download&id=1Az7MLF6M5m07fi0aW95DRYzQ1CRzKK10",
    "https://drive.google.com/uc?export=download&id=1Az_TiuQ1IFI6sfWiWOICXhetzPnTCdhe",
    "https://drive.google.com/uc?export=download&id=1B-VHwkMWF8YyW3_tWIagINirWrlkmC0W",
    "https://drive.google.com/uc?export=download&id=1B-kXLIRQKFJnhe_9KS382axqG-QQUh4c",
    "https://drive.google.com/uc?export=download&id=1B0vwTsKqm3lGU2OlpzlOVOB7m2OcqLlL",
    "https://drive.google.com/uc?export=download&id=1B1ukwU51UGQ-itVQkFe2RTONt1sGfYgN",
    "https://drive.google.com/uc?export=download&id=1B2IsNhIolfn0knWWD4XNKbQVGI189MaA",
    "https://drive.google.com/uc?export=download&id=1B2N_gLFBZf-o36VGvIY1NOuhRUoIDgDk",
    "https://drive.google.com/uc?export=download&id=1B4z-IqYPAzTF8CQKGuXsQeZOz5ThPHTJ",
    "https://drive.google.com/uc?export=download&id=1B64VgFjw7OHK8iZF0jU_q72hRfpi6Zhs",
    "https://drive.google.com/uc?export=download&id=1B71x7Lvbg3La3rOhjtVcpAzNl4XuKqBp"
  ];

  const randomIndex = Math.floor(Math.random() * videoLinks.length);
  const randomVideoLink = videoLinks[randomIndex];

  let messageText = 'المالك = علي حسين 📺\n';

  global.nodemodule["axios"]
    .get(randomVideoLink, { responseType: "arraybuffer" })
    .then((response) => {
      const path = __dirname + `/cache/dipto_${Date.now()}.mp4`;
      global.nodemodule["fs"].writeFileSync(path, Buffer.from(response.data, 'utf-8'));
      api.sendMessage({ 
        body: messageText + randText,
        attachment: global.nodemodule["fs"].createReadStream(path)
      }, event.threadID, () => global.nodemodule["fs"].unlinkSync(path), event.messageID);
    })
    .catch(error => {
      console.error("❌ | خطأ", error);
      api.sendMessage("❌ | خطأ", event.threadID, event.messageID);
    });
};