const express = require("express");
const path = require("path");
const config = require("./config");
const routes = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use("/", routes);
console.log(process.env);
app.listen(process.env.PORT || config.PORT, error => {
  if (error) {
    console.log(`Não foi possível iniciar o servidor: ${error}`);
  }
  console.log("Servidor rodando.");
});
