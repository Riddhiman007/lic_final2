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
function sendMail(email, price) {
  const mail = mailer.sendMail({
    from: myemail,
    to: email,
    subject: "Policy Insurance Renewal Rode",
    html: `<html>

        <body>
            <h2>dear lic users 
    It is hereby informed that your policy  ${policy_name} will expire soon 
    Renew It Now by paying ₹${price} and last date is ${date}  !!! 
                                            -rode(lic)</h2>
        </body>
    </html>`,
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
  const date = new Date(query.date);
  console.log("task scheduled");
  const job = schedule(
    `23 19 ${date.getDate()} ${month[date.getMonth()]} *`,
    () => {
      console.log("job started");
      const mail = sendMail(email, price,date,policy_name);
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
