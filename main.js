// xn$ npm install express
//# sourceMappingURL=index.js.map
////////////////////////////////////////////////////
// const { response } = require("express");
// const express = require("express");
// const nodemailer = require("nodemailer");
// const app = express();
// const port = 5002;
// const cron = require("node-cron");
(function () {

  const { response } = require("express");
  const express = require("express");
  const nodemailer = require("nodemailer");
  const app = express();
  const port = 5002;
  const cron = require("node-cron");
}).call(this);

//# sourceMappingURL=index.js.map
// var email = 'process.env.recipient_email';
function run() {
  var email_ = document.getElementById("email").value
  console.log(email);

}
// var myemail = process.env.sender_email;
var email_ = document.getElementById("email").value
var email = email_
var myemail = 'coldplane567@gmail.com'
var mypassword = 'wiqbilarhpyofwzm';
''
function sendEmail(name) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myemail,
        pass: mypassword,
      },
    });

    const mail_configs = {
      from: myemail,
      to: email,
      attachments: [
        {
          // utf-8 string as an attachment
          filename: "text1.txt",
          content: "hello world!",
        },
        {
          // binary buffer as an attachment
          filename: "text2.txt",
          content: new Buffer.from("hello world!", "utf-8"),
        },
        {
          path: `data:image/png;base64,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`,
        },
        {
          filename: "resume.pdf",
          path: "https://res.cloudinary.com/thito-holdings/image/upload/v1673289988/resume_4_ylclzl.pdf",
        },
      ],
      subject: "Testing Koding 101 Email",
      html: `<html>
	<head>
		<title>Codebeautify.org Text to HTML Converter</title>
	</head>
	<body>
		<p>dear lic users 
  It is hereby informed that your policy will expire soon 
  Renew It Now !!! 
                                        -rode(lic)</p>
	</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

app.get("/sendEmail", (req, res) => {
  const { name } = req.query;

  sendEmail(name)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

const task = () => {
  console.log("Running a task every minute");
};

cron.schedule("1 * * * * *", sendEmail);

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
