const keystone = require("keystone");

keystone.init({
  "cookie secret": "thisIsTheAwesomeSecretChangeMeLaterAndMoveToEnv",
  views: "templates/views",
  "view engine": "pug",
  name: "DS Project",
  "user model": "User",
  "auto update": true,
  auth: true
});

keystone.import("models");

keystone.set("routes", require("./routes"));

keystone.start();
