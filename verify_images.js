const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

console.log('=== Checking data.json Menu Items ===');
let missingItemImages = 0;
let validItemImages = 0;
data.menuitems.forEach(m => {
  const p = path.join('public', m.image.replace(/^\//, ''));
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    if (stat.size > 0) validItemImages++;
    else missingItemImages++;
  } else {
    missingItemImages++;
    console.log('MISSING ITEM:', m.name, '->', m.image);
  }
});
console.log('Total menu items:', data.menuitems.length);
console.log('Valid non-empty images:', validItemImages);
console.log('Missing/empty images:', missingItemImages);

console.log('\n=== Checking data.json Categories ===');
let missingCatImages = 0;
let validCatImages = 0;
data.categories.forEach(c => {
  const p = path.join('public', c.image.replace(/^\//, ''));
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    if (stat.size > 0) validCatImages++;
    else missingCatImages++;
  } else {
    missingCatImages++;
    console.log('MISSING CAT:', c.name, '->', c.image);
  }
});
console.log('Total categories:', data.categories.length);
console.log('Valid non-empty images:', validCatImages);
console.log('Missing/empty images:', missingCatImages);

console.log('\n=== Checking src/data/restaurantData.ts ===');
const restDataContent = fs.readFileSync('src/data/restaurantData.ts', 'utf8');
const lines = restDataContent.split('\n').filter(l => l.includes('"image":'));
let restTotal = 0;
let restValid = 0;
let restMissing = 0;
lines.forEach(l => {
  restTotal++;
  const m = l.match(/"image":\s*"([^"]+)"/);
  if (m) {
    const p = path.join('public', m[1].replace(/^\//, ''));
    if (fs.existsSync(p) && fs.statSync(p).size > 0) {
      restValid++;
    } else {
      restMissing++;
      console.log('MISSING in restaurantData.ts:', m[1]);
    }
  }
});
console.log('Total image references in restaurantData.ts:', restTotal);
console.log('Valid non-empty images:', restValid);
console.log('Missing/empty images:', restMissing);
