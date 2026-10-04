const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restaurant-menu').then(async () => {
  const db = mongoose.connection.db;
  const items = await db.collection('menuitems').find({}).toArray();
  console.log('All Items and their images:');
  items.forEach(i => console.log(`${i.name} -> ${i.image}`));
  process.exit(0);
}).catch(console.error);
