const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const { docId, sendGridKey, PORT } = process.env;

module.exports = {
  docId,
  sendGridKey,
  PORT
};
