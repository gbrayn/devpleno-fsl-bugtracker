const { promisify } = require("util");
const config = require("./config");
const GoogleSpreadsheet = require("google-spreadsheet");
const sgMail = require("@sendgrid/mail");

const credentials = require("./bugtracker.json");

const docId = config.docId || process.env.docId;
const sendGridKey = config.sendGridKey || process.env.sendGridKey;
const worksheetIndex = 0;

const store = async (req, res) => {
  try {
    const {
      name,
      email,
      issueType,
      howToReproduce,
      expectedOutput,
      receivedOutput,
      userAgent,
      userDate
    } = req.body;

    const source = req.query.source || "direct";

    const doc = new GoogleSpreadsheet(docId);
    await promisify(doc.useServiceAccountAuth)(credentials);
    const info = await promisify(doc.getInfo)();
    const worksheet = info.worksheets[worksheetIndex];
    await promisify(worksheet.addRow)({
      name,
      email,
      issueType,
      source,
      howToReproduce,
      expectedOutput,
      receivedOutput,
      userAgent,
      userDate
    });

    if (issueType === "CRITICAL") {
      sgMail.setApiKey(sendGridKey);
      const msg = {
        to: "gustavo.augusto.brayn@gmail.com",
        from: "gustavo.augusto.brayn@gmail.com",
        subject: "Report de BUG Critíco",
        text: `
          O usuário ${name}, reportou um problema no módulo ${source}.
        `,
        html: `O usuário ${name}, reportou um problema no módulo ${source}.`
      };
      await sgMail.send(msg);
    }

    res.render("success");
  } catch (error) {
    console.log(error);
    res.render("fail");
  }
};

module.exports = { store };
