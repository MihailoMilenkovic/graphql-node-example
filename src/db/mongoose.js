const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017/hackernews-node";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
