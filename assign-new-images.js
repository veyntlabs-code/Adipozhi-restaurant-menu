const fs = require('fs');
const mongoose = require('mongoose');

fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_chickentikka_1791053479425.jpg', 'public/gen_chickentikka.jpg');
fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_naan_1791053491128.jpg', 'public/gen_naan.jpg');
fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_paneerbutter_1791053502332.jpg', 'public/gen_paneerbutter.jpg');

mongoose.connect('mongodb://localhost:27017/restaurant-menu').then(async () => {
  const db = mongoose.connection.db;
  await db.collection('menuitems').updateOne({ name: 'Chicken Tikka Masala' }, { $set: { image: '/gen_chickentikka.jpg' } });
  await db.collection('menuitems').updateMany({ name: /Naan/ }, { $set: { image: '/gen_naan.jpg' } });
  await db.collection('menuitems').updateOne({ name: 'Paneer Butter Masala' }, { $set: { image: '/gen_paneerbutter.jpg' } });
  console.log('Updated 3 items');
  process.exit(0);
});
