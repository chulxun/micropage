
const mongoose = require("mongoose");
const config = require("config");
const autoIncrement = require("mongoose-auto-increment-fix");
const { logger } = require("../utils/log");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(
  config.get("mongodb"),
  {
    // useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 20,
  },
  (err) => {
    /* istanbul ignore if */
    if (err) {
      logger.error("connect to %s error: ", config.get("mongodb"), err.message);
      process.exit(1);
    }
  }
);

mongoose.connection.on("open", function () {
  logger.info("connect to %s is success", config.get("mongodb"));
});

autoIncrement.initialize(mongoose);

module.exports = {
  Users: require("./users"),
  Resources: require("./resources"),
  Works: require("./works"),
  Forms: require("./forms"),
};

