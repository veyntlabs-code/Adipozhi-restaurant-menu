const fs = require('fs');
const mongoose = require('mongoose');

fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_prawnmasala_1791054231859.jpg', 'public/gen_prawnmasala.jpg');
fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_chillychicken_1791054242753.jpg', 'public/gen_chillychicken.jpg');
fs.copyFileSync('C:\\Users\\jaiwi\\.gemini\\antigravity-ide\\brain\\f9c1d0c5-b0cd-48b7-b84a-9140d5f2eda7\\gen_muttonkaridosa_1791054263618.jpg', 'public/gen_muttonkaridosa.jpg');

mongoose.connect('mongodb://localhost:27017/restaurant-menu').then(async () => {
  const db = mongoose.connection.db;
  await db.collection('menuitems').updateOne({ name: 'Prawn Masala' }, { $set: { image: '/gen_prawnmasala.jpg' } });
  await db.collection('menuitems').updateOne({ name: 'Chilly Chicken Gravy' }, { $set: { image: '/gen_chillychicken.jpg' } });
  await db.collection('menuitems').updateOne({ name: 'Mutton Kari Dosa' }, { $set: { image: '/gen_muttonkaridosa.jpg' } });
  console.log('Updated new images');
  process.exit(0);
});
