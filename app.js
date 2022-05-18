const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/e9a874f44c";

  const options = {
    method: "POST",
    auth: "adam:82df6cd2fb78a7dde66861ada2509ff8-us14"
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failur", function (req,res) {
  res.redirect("/")
})

app.listen(process.env.PORT || 3000,function (req,res) {
  console.log("Connectd");
})
// apikey

// 82df6cd2fb78a7dde66861ada2509ff8-us14

// list id
// e9a874f44c
