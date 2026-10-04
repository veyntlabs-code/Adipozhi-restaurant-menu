const fs = require('fs');
const mongoose = require('mongoose');

fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_vegclearsoup_1791053921774.jpg', 'public/gen_vegclearsoup.jpg');
fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_watermelon_1791053932343.jpg', 'public/gen_watermelon.jpg');
fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_gobimanjurian_1791053945955.jpg', 'public/gen_gobimanjurian.jpg');

mongoose.connect('mongodb://localhost:27017/restaurant-menu').then(async () => {
  const db = mongoose.connection.db;
  await db.collection('menuitems').updateOne({ name: 'Veg Clear Soup' }, { $set: { image: '/gen_vegclearsoup.jpg' } });
  await db.collection('menuitems').updateOne({ name: 'Water Melon' }, { $set: { image: '/gen_watermelon.jpg' } });
  await db.collection('menuitems').updateMany({ name: /Gobi Manjurian/ }, { $set: { image: '/gen_gobimanjurian.jpg' } });
  console.log('Updated new images');
  process.exit(0);
});
