const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");
const path = require("path");

const URI = "mongodb://localhost:27017";
const DB_NAME = "restaurant-menu";
const ARTIFACT_DIR = "C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f38bffc1-c34c-40ee-a266-765c7ae47554";
const PUBLIC_DIR = path.join(__dirname, "public");

async function run() {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    
    const queue = JSON.parse(fs.readFileSync("queue.json", "utf8"));
    let updatedCount = 0;

    for (let i = 0; i < queue.length; i++) {
      if (queue[i].status === "pending" && queue[i].artifactPath) {
        // Move image
        const ext = path.extname(queue[i].artifactPath);
        const fileName = `img_${queue[i]._id}${ext}`;
        const destPath = path.join(PUBLIC_DIR, fileName);
        
        fs.copyFileSync(queue[i].artifactPath, destPath);
        
        // Update DB
        await db.collection("menuitems").updateOne(
          { _id: new ObjectId(queue[i]._id) },
          { $set: { image: `/${fileName}` } }
        );
        
        queue[i].status = "done";
        queue[i].image = `/${fileName}`;
        updatedCount++;
      }
    }
    
    fs.writeFileSync("queue.json", JSON.stringify(queue, null, 2));
    console.log(`Processed ${updatedCount} items.`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
