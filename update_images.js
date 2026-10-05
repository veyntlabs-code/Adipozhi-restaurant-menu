/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const DB_NAME = "restaurant-menu";
const brainDir = "C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\b9478fe5-774c-4b10-9e71-53767f078f25";
const publicDir = path.join(__dirname, 'public');

const imageMap = {
  "EGG SPECIAL": { file: "cat_egg_special_1791128967350.jpg", target: "/cat_egg_special.jpg" },
  "VEG STARTERS": { file: "cat_veg_starters_1791128981653.jpg", target: "/cat_veg_starters.jpg" },
  "NON-VEG STARTERS — CHICKEN": { file: "cat_chicken_starters_1791128994686.jpg", target: "/cat_chicken_starters.jpg" },
  "NON-VEG STARTERS — MUTTON": { file: "cat_mutton_starters_1791129007947.jpg", target: "/cat_mutton_starters.jpg" },
  "NON-VEG STARTERS — BEEF": { file: "cat_beef_starters_1791129037706.jpg", target: "/cat_beef_starters.jpg" },
  "NON-VEG STARTERS — SEAFOODS": { file: "cat_seafood_starters_1791129054388.jpg", target: "/cat_seafood_starters.jpg" },
  "ARABIAN STARTERS": { file: "cat_arabian_starters_1791129077296.jpg", target: "/cat_arabian_starters.jpg" },
  "ARABIAN SPICY'S": { file: "cat_arabian_spicys_1791129091231.jpg", target: "/cat_arabian_spicys.jpg" },
  "PULAOS": { file: "cat_pulaos_1791129118252.jpg", target: "/cat_pulaos.jpg" },
  "BIRIYANI'S": { file: "cat_biriyanis_1791129131643.jpg", target: "/cat_biriyanis.jpg" },
  "FAMILY PACK — ONLY PARCEL": { file: "cat_family_pack_1791129145114.jpg", target: "/cat_family_pack.jpg" },
  "CHETTINADU MASALAS": { file: "cat_chettinadu_masalas_1791129160267.jpg", target: "/cat_chettinadu_masalas.jpg" },
  "INDIAN GRAVY & MASALA": { file: "cat_indian_gravy_1791129213957.jpg", target: "/cat_indian_gravy.jpg" }
};

const unsplashMap = {
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
    // Copy files
    for (const [catName, data] of Object.entries(imageMap)) {
      const src = path.join(brainDir, data.file);
      const dest = path.join(publicDir, data.target.replace('/', ''));
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${data.file} to ${dest}`);
      } else {
        console.warn(`Source file not found: ${src}`);
      }
    }

    await client.connect();
    const db = client.db(DB_NAME);
    
    const categories = await db.collection("categories").find().toArray();
    
    let updatedCount = 0;
    for (const cat of categories) {
      if (cat.name === "SOUPS") continue; // skip SOUPS

      let imgUrl = null;
      if (imageMap[cat.name]) {
        imgUrl = imageMap[cat.name].target;
      } else if (unsplashMap[cat.name]) {
        imgUrl = unsplashMap[cat.name];
      }

      if (imgUrl) {
        // Update all items in this category
        const res = await db.collection("menuitems").updateMany(
          { categoryId: cat._id },
          { $set: { image: imgUrl } }
        );
        updatedCount += res.modifiedCount;
        console.log(`Assigned image for ${cat.name} to ${res.modifiedCount} items.`);
      } else {
        console.warn(`No image found for category: ${cat.name}`);
      }
    }
    
    console.log(`Successfully assigned images to ${updatedCount} items!`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
