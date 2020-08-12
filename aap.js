const express = require("express");
const app = express();
const routesTranslation = require("./routes/translation");

routesTranslation.configure(app);
const server = app.listen(7001, function () {
  console.log("Translation listening on port " + server.address().port);
});
