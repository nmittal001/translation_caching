let langs = {
  am: "Amharic",
  ar: "Arabic",
  eu: "Basque",
  bn: "Bengali",
  "en-GB": "English(UK)",
  "pt-BR": "Portuguese(Brazil)",
  bg: "Bulgarian",
  ca: "Catalan",
  chr: "Cherokee",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  et: "Estonian",
  fil: "Filipino",
  fi: "Finnish",
  fr: "French",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  iw: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  kn: "Kannada",
  ko: "Korean",
  lv: "Latvian",
  lt: "Lithuanian",
  ms: "Malay",
  ml: "Malayalam",
  mr: "Marathi",
  no: "Norwegian",
  pl: "Polish",
  "pt-PT": "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  "zh-CN": "Chinese(PRC)",
  sk: "Slovak",
  sl: "Slovenian",
  es: "Spanish",
  sw: "Swahili",
  sv: "Swedish",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  "zh-TW": "Chinese",
  tr: "Turkish",
  ur: "Urdu",
  uk: "Ukrainian",
  vi: "Vietnamese",
  cy: "Welsh",
};

function getCode(desiredLang) {
  if (!desiredLang) {
    return [false, "language is required"];
  }

  if (langs[desiredLang]) {
    return [true, desiredLang];
  }

  var keys = Object.keys(langs).filter(function (key) {
    return langs[key].toLowerCase() === desiredLang.toLowerCase();
  });
  return keys.length > 0
    ? [true, keys[0]]
    : [false, "source and target should be: " + Object.values(langs)];
}

module.exports = getCode;
