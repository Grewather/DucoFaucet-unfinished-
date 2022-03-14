const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const cors = require("cors");
const res = require("express/lib/response");
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  console.log(req);
  res.send("work");
});
app.post("/username", (req, res) => {
  const secretKey = "SecretKey";
  let nickname = req.body.name;
  console.log(nickname);

  request(
    "https://www.google.com/recaptcha/api/siteverify?secret=SecretKey!&response=" +
      req.body.captcha,
    function (error, response, body) {
      console.log("error:", error);
      console.log("statusCode", response && response.statusCode);
      console.log("body", body);
      if (error == null) {
        console.log("dziala");
        requestDuco(nickname);
      } else {
        console.log("nie dziala");
      }
    }
  );
});
var numberDuco;
function requestDuco(nick) {
  let randomNumber = Math.random() * (0.4 - 0.001);
  console.log(randomNumber);
  console.log(nick);
  let ducoUser = nick;
  let faucetNick = "Ur nick"; //tymczasowe
  let faucetPass = "password";
  request(
    "https://server.duinocoin.com/transaction/?username=" +
      faucetNick +
      "&" +
      "password=" +
      faucetPass +
      "&recipient=" +
      ducoUser +
      "&amount=" +
      "0.001" +
      "&memo=test",
    function (error, response, body) {
      console.log("error:", error);
      console.log("statusCode", response && response.statusCode);
      console.log("body", body);
      numberDuco = body;
      console.log(numberDuco);
    }
  );
}

app.get("/username", (req, res) => {
  res.send(numberDuco);
});
console.log(numberDuco);
// app.get('results', (req,res)=>{
//   res.json(numberDuco)
// });

app.listen(8888, () => {
  console.log("Aplikacja Wystartowała Pomyślnie (port 8888)");
});

// console.log(req.body);
// res.status(200).end();
