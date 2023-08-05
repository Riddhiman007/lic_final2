const scheduler = require("node-schedule")
const fs = require("fs")
const job = scheduler.scheduleJob({ hour: 12, minute: 54 }, function () {
    fs.writeFile("test.txt", "hello world", function (err) { if (err) throw err })
    console.log("tast completed");
})


