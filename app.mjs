import { dirname } from "path";
import { fileURLToPath } from "url";
import { createTransport } from "nodemailer";
import express from "express";
import { schedule } from "node-cron";

const __dirname = dirname(fileURLToPath(import.meta.url));
// const form = document.getElementById('form');

var myemail = "coldplane567@gmail.com";
var mypassword = "wiqbilarhpyofwzm";
const mailer = createTransport(
  `smtp://${myemail}:${mypassword}@smtp.gmail.com:587`
);

/**
 *
 * @param {string} email
 */
function sendMail(email, price, policy_name) {
  const mail = mailer.sendMail({
    from: myemail,
    to: email,
    subject: "Policy Insurance Renewal Rode",
    html: `<html>
    <head>
      <style>@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
  
  *{
      font-family: "Poppins", sans-serif;
      color: #fff;
  }
  
  body{
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
  
      background: #101825;
  }
  
  .box{
      width: 550px;
      height: 350px;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(5px);
      border: 4px solid rgba(255, 255, 255, 0.18);
      border-radius: 40px;
      z-index: 1;
  }
  
  .content{
      margin: 20px 50px;
  }
  
  h2{
      margin-top: 15px;
      width: 350px;
      font-size: 3.5em;
      letter-spacing: 1px;
      text-transform: uppercase;
  }
  
  p{
      width: 350px;
      font-size: 1em;
      margin-top: -30px;
  }
  
  button{
      margin-top: 10px;
      width: 150px;
      height: 40px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      word-spacing: 2px;
      background: transparent;
      border: 2.4px solid #fff;
      border-radius: 50px;
  }
  
  button:hover{
      transition: 0.5s;
      color: #000;
      background: #fff;
  }
  
  // .circle{
  //     position: absolute;
  //     width: 300px;
  //     height: 300px;
  //     transform: translate(-15rem, 9rem);
  //     z-index: 0;
  //     border-radius: 50%;
  //     background: linear-gradient(to right,  #0062a3, #29ABE2);
  // }
  
  // .circle:nth-child(2){
  //     background: linear-gradient(to right, #F15, #F15A2A);
  //     transform: translate(15rem, -9rem);
  // }</style>
    </head>
    <body>
  // <div class="circle"></div>
  //     <div class="circle"></div>
      <div class="box">
          <div class="content">
              <h2>Lic Renew Reminder</h2>
              <p>It is hereby informed that your policy ${policy_name} will expire soon please renew it by paying ₹${price} within 24hours</button>
          </div>
      </div>
      </body>
    <html>`,
  });

  return mail;
}
const app = express();
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
app.post("/api/schedule", (req, res) => {
  const query = req.query;
  const email = query.email;
  const price = query.price;
  const policy_name = query.policy_name;
  console.log(price);
  console.log(policy_name)
  const date = new Date(query.date);
  console.log("task scheduled");
  const job = schedule(
    `34 19 ${date.getDate()} ${month[date.getMonth()]} *`,
    () => {
      console.log("job started");
      const mail = sendMail(email, price,policy_name);
      console.log(mail);
      mail
        .then(() => {
          console.log("mail sent");
        })
        .catch((reason) => console.log(reason));
    },
    { timezone: "Asia/Kolkata" }
  );
  job.start();
  res.json({ message: "task scheduled" });
});
app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

app.use("/1.jpg", express.static(__dirname + "/1.jpg"));
const port = process.env.PORT || 8080;
app.listen(port, () => console.log("listening on " + port));
// export default app
// export const handler = serverless(app)
