const fs = require("fs");
const queue = JSON.parse(fs.readFileSync("queue.json", "utf8"));
const artifacts = [
  "C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f38bffc1-c34c-40ee-a266-765c7ae47554\\img_6ac0c43db1e854d32c0f191c_1791018788667.jpg",
  "C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f38bffc1-c34c-40ee-a266-765c7ae47554\\img_6ac0c43db1e854d32c0f191d_1791018812861.jpg",
  "C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f38bffc1-c34c-40ee-a266-765c7ae47554\\img_6ac0c43db1e854d32c0f191e_1791018827610.jpg",
  "C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f38bffc1-c34c-40ee-a266-765c7ae47554\\img_6ac0c43db1e854d32c0f191f_1791018989024.jpg",
  "C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f38bffc1-c34c-40ee-a266-765c7ae47554\\img_6ac0c43db1e854d32c0f1920_1791019004960.jpg",
  "C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f38bffc1-c34c-40ee-a266-765c7ae47554\\img_6ac0c43db1e854d32c0f1921_1791019021129.jpg",
  "C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f38bffc1-c34c-40ee-a266-765c7ae47554\\img_6ac0c43db1e854d32c0f1922_1791019038552.jpg",
  "C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f38bffc1-c34c-40ee-a266-765c7ae47554\\img_6ac0c43db1e854d32c0f1923_1791019055897.jpg"
];
for(let i=0; i<8; i++) {
  queue[i].artifactPath = artifacts[i];
}
fs.writeFileSync("queue.json", JSON.stringify(queue, null, 2));
