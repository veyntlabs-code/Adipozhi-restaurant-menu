const fs = require('fs');
const mongoose = require('mongoose');

fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_kothuparotta_1791054944525.jpg', 'public/gen_kothuparotta.jpg');
fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_chickenchettinadu_1791054956544.jpg', 'public/gen_chickenchettinadu.jpg');
fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_lemonmint_1791054967176.jpg', 'public/gen_lemonmint.jpg');

mongoose.connect('mongodb://localhost:27017/restaurant-menu').then(async () => {
  const db = mongoose.connection.db;
  await db.collection('menuitems').updateMany({ name: /Kothu Parotta/ }, { $set: { image: '/gen_kothuparotta.jpg' } });
  await db.collection('menuitems').updateOne({ name: 'Chicken Chettinadu Masala' }, { $set: { image: '/gen_chickenchettinadu.jpg' } });
  await db.collection('menuitems').updateMany({ name: /Lemon Mint/ }, { $set: { image: '/gen_lemonmint.jpg' } });
  console.log('Updated new images');
  process.exit(0);
});
