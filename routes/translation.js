let failJson = { success: 0, message: "There was an error!" };
let translationModule = require("../modules/translation.module");
let getCode = require("../modules/getCode");
module.exports = {
  configure: function (app) {
    app.get("/getTranslation", (req, res) => {
      try {
        let isValid = validator(req.query);
        if (!isValid.success) {
          return res.json({ success: 0, message: isValid.message });
        }
        translationModule.getTranslationModule(
          req.query,
          (response, isSave) => {
            res.json(response);
            if (response.success === 1 && !isSave) {
              translationModule.saveAllLanguageTranslationInRedis(req.query);
            }
          }
        );
      } catch (err) {
        console.log("Error: ", err);
        return res.json(failJson);
      }
    });
  },
};

let validator = function (query) {
  if (!query.hasOwnProperty("source")) {
    return { success: false, message: "source is required" };
  }
  if (!query.hasOwnProperty("target")) {
    return { success: false, message: "target is required" };
  }
  if (!query.hasOwnProperty("text") || query.text.trim().length === 0) {
    return { success: false, message: "text is required" };
  }
  let sourceCode = getCode(query.source);

  if (!sourceCode[0]) {
    return { success: false, message: sourceCode[1] };
  }
  let targetCode = getCode(query.target);

  if (!targetCode[0]) {
    return { success: false, message: targetCode[1] };
  }
  if (sourceCode[1] === targetCode[1]) {
    return {
      success: false,
      message: "source and target language are same",
    };
  }

  query.source = sourceCode[1];
  query.target = targetCode[1];
  return {
    success: true,
    message: "validation done",
  };
};
