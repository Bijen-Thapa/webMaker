const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const Cheerio = require("cheerio");

// const upload = require("./multerconfig");
app.use("/images", express.static("images"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

const port = 3000 || process.env.port;

app.listen(port);

// app.use("/scraper", require("./scraper"));
app.get("/", async (req, res) => {
  // console.log(
  //   token().then((res) => {
  //     const $ = Cheerio.load(res);
  //     $("._token");
  //   })
  // );
  let too;
  const tt = token().then((res) => {
    const $ = Cheerio.load(res);
    $(".form").each((i, tokn) => {
      too = $(tokn).find("_token").text();
    });
  });
  console.log(too);

  await res.render("index.ejs", {
    token: too,
  });
});

const token = async () => {
  const { data: html } = await axios.get("https://register.com.np/");
  // console.log(html);

  return html;
};
