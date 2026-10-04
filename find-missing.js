const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restaurant-menu').then(async () => {
  const db = mongoose.connection.db;
  const items = await db.collection('menuitems').find({ $or: [{ image: { $exists: false } }, { image: '' }, { image: null }] }).toArray();
  console.log('Items missing images:');
  items.forEach(i => console.log(i.name));
  process.exit(0);
}).catch(console.error);
