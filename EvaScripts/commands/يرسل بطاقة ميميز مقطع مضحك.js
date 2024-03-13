module.exports.config = {
  name: "بطاقات",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "HUSSEIN",
  description: "يرسل لك مقطع عن ميمز البطاقات المضحكة ",
  commandCategory: "صور",
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
   var hi = ["إستمتع..🤍"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [

    "https://drive.google.com/uc?export=download&id=18NkYRxHPWLfYFcxgMtjIT7q6K6NOPaYU",// video credits lyrics edit vibe (fb group)
      "https://drive.google.com/uc?export=download&id=18OueEENy1fD_ImNmZavFkF6x-_OZAEIG",
      "https://drive.google.com/uc?export=download&id=18SsFFlzfmpNDcgzbDwNuY1IFQ5fxSPW8",
      "https://drive.google.com/uc?export=download&id=18jrCBjm-IjE8ecOeiesI7KYN7G2SZkDb",
      "https://drive.google.com/uc?export=download&id=18nVQ23geL1R4aYdwyYc5gWN-UpQCFlCQ",
      "https://drive.google.com/uc?export=download&id=1980ln25eCc6dwOZrPLV-LHoZ8Ov9Y9wV",
      "https://drive.google.com/uc?export=download&id=18XVc8I7vfXIScbsf2CsAeg0y3XKl3f05",
      "https://drive.google.com/uc?export=download&id=19MYeeWJowJDgkWJ9Hkh_1ttgz_ezJDxJ",
      "https://drive.google.com/uc?export=download&id=192xSsosIkvY84c7KXtuR2ia2iv7rLPBH",
      "https://drive.google.com/uc?export=download&id=194mFiMAUdTYyTkBpeZNvC-y6raZySVM2",
      "https://drive.google.com/uc?export=download&id=18qG-ND-uviXny9VyxcTtlbMpXFxsJS25",
      "https://drive.google.com/uc?export=download&id=19QhMJvBvNtlSiNZCic52W9nN2Trle4Jw",
      "https://drive.google.com/uc?export=download&id=19L7HFai5KoExl8C8onBYE7xlCNHy1Ksl",
      "https://drive.google.com/uc?export=download&id=18qgTKEPL7tlPtwoKXNPbiaQDZzoDvx-Q",
      "https://drive.google.com/uc?export=download&id=19Qp-o3GXRfG0IkyMlHQp8lQVe5Zkl8FT",
      "https://drive.google.com/uc?export=download&id=195-7x2N7d3YJHlBg_B_fqN72wGUa-C6r",
      "https://drive.google.com/uc?export=download&id=19GszMDvbusrzCvfSrU0HLzEWCY6ePXrT",
      "https://drive.google.com/uc?export=download&id=19TI3nJmxX5fNNjdHZehpbkpukYDrmTMl",
      "https://drive.google.com/uc?export=download&id=18r1ZgPMdotO6UOKrsDMbvNl0Hb9VDFD1",
      "https://drive.google.com/uc?export=download&id=18Xwd0xvYh8wLTGaWA4s20KtqaF7KIoNS",
      "https://drive.google.com/uc?export=download&id=19K6aaF2IDgs8PvJxvPrVBQR_waPzj6XO",
      "https://drive.google.com/uc?export=download&id=19VEjwxN9QTJDrD-stqmrRpi9O-xjVF8r",
      "https://drive.google.com/uc?export=download&id=19NvTISyS_tBMfpOyv8wF82DMpiM1IuaR",
      "https://drive.google.com/uc?export=download&id=18jkbvsBjeW1GRwhdI1m0anywZXrbrNXw",
      "https://drive.google.com/uc?export=download&id=18_Iaa8JCdaWI_NtjI57NhfhNsjT_7kBV",
      "https://drive.google.com/uc?export=download&id=19WdBzDB4mt6-oKscqViUDreEldXHdoA2",
      "https://drive.google.com/uc?export=download&id=18OvXiHCYajTZxwlpKL4iZKJuKiJIF1Uf",
      "https://drive.google.com/uc?export=download&id=19TdmKk6kxbZ4AVKSMQISQ26PtLDRQ04-",
      "https://drive.google.com/uc?export=download&id=19PtlftjYRytdxGJlIyYPw8K8_pXtoBLM",
      "https://drive.google.com/uc?export=download&id=19Lo6Ze-4smf3ScXQRg4lJajzvyCictLQ",
      "https://drive.google.com/uc?export=download&id=1910JIK5WMCeSclfXx9_Y5QH-kgJFJKDE",
      "",
      // Add more video links here
];
     var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/15.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/15.mp4"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/15.mp4")).on("close",() => callback());
   };