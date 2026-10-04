const fs = require("fs");
const q = JSON.parse(fs.readFileSync("queue.json", "utf8"));
console.log(JSON.stringify(q.filter(x => x.status === "pending").slice(0, 12), null, 2));
