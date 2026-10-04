const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const DB_NAME = "restaurant-menu";

const imageMap = {
  "SOUPS": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
  "EGG SPECIAL": "https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?w=600&q=80",
  "VEG STARTERS": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
  "NON-VEG STARTERS — CHICKEN": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&q=80",
  "NON-VEG STARTERS — MUTTON": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
  "NON-VEG STARTERS — BEEF": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
  "NON-VEG STARTERS — SEAFOODS": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600&q=80",
  "ARABIAN STARTERS": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
  "ARABIAN SPICY'S": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
  "PULAOS": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
  "BIRIYANI'S": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
  "FAMILY PACK — ONLY PARCEL": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
  "CHETTINADU MASALAS": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
  "INDIAN GRAVY & MASALA": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
  "CHINESE RICE / NOODLES": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
  "INDIAN BREADS": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80",
  "DOSA VARIETIES": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80",
  "PAROTTA VARIETIES": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80",
  "FRESH JUICE": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
  "MOJITO": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
  "ICE CREAMS": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&q=80"
};

async function run() {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    
    const categories = await db.collection("categories").find().toArray();
    
    let updatedCount = 0;
    for (const cat of categories) {
      const imgUrl = imageMap[cat.name];
      if (imgUrl) {
        // Update all items in this category that don't already have a generated local image
        const res = await db.collection("menuitems").updateMany(
          { categoryId: cat._id, image: null },
          { $set: { image: imgUrl } }
        );
        updatedCount += res.modifiedCount;
      }
    }
    
    console.log(`Successfully assigned Unsplash images to ${updatedCount} items!`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
