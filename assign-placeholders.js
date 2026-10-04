const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");

const URI = "mongodb://localhost:27017";
const DB_NAME = "restaurant-menu";

async function run() {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    
    const queue = JSON.parse(fs.readFileSync("queue.json", "utf8"));
    let updatedCount = 0;

    for (let i = 0; i < queue.length; i++) {
      if (queue[i].status === "pending") {
        
        // Create placeholder URL
        const encodedName = encodeURIComponent(queue[i].name);
        const imgUrl = `https://placehold.co/400x300/4c0519/FFFFFF?text=${encodedName}`;
        
        // Update DB
        await db.collection("menuitems").updateOne(
          { _id: new ObjectId(queue[i]._id) },
          { $set: { image: imgUrl } }
        );
        
        queue[i].status = "done";
        queue[i].image = imgUrl;
        updatedCount++;
      }
    }
    
    fs.writeFileSync("queue.json", JSON.stringify(queue, null, 2));
    console.log(`Assigned text placeholders to ${updatedCount} items.`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
