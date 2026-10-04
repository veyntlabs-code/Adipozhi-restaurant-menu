const { MongoClient } = require("mongodb");
const fs = require("fs");

const URI = "mongodb://localhost:27017";
const DB_NAME = "restaurant-menu";

async function run() {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    
    // Find items that currently have unsplash images or no images
    // Basically all items since we want unique AI photos for all
    const items = await db.collection("menuitems").find({}).toArray();
    
    const queue = items.map(item => ({
      _id: item._id.toString(),
      name: item.name,
      status: "pending", // pending, processing, done
      image: null
    }));
    
    fs.writeFileSync("queue.json", JSON.stringify(queue, null, 2));
    console.log(`Queue initialized with ${queue.length} items.`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
