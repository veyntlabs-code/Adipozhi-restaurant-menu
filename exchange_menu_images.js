const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, 'Adipozhi_Menu_Images_extracted', 'Adipozhi_Menu_Images', 'menu_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const catFolderMap = {
  'SOUPS': '01. Soups',
  'EGG SPECIAL': '02. Egg Special',
  'VEG STARTERS': '03. Veg Starters',
  'NON-VEG STARTERS — CHICKEN': '04. Non-Veg Starters - Chicken',
  'NON-VEG STARTERS — MUTTON': '05. Non-Veg Starters - Mutton',
  'NON-VEG STARTERS — BEEF': '06. Non-Veg Starters - Beef',
  'NON-VEG STARTERS — SEAFOODS': '07. Non-Veg Starters - Seafood',
  'ARABIAN STARTERS': '08. Arabian Starters',
  'ARABIAN SPICY\'S': '09. Arabian Spicy Specials',
  'PULAOS': '10. Pulaos',
  'BIRIYANI\'S': '11. Biriyanis',
  'FAMILY PACK — ONLY PARCEL': '12. Family Pack - Only Parcel',
  'CHETTINADU MASALAS': '13. Chettinadu Masalas',
  'INDIAN GRAVY & MASALA': '14. Indian Gravy & Masala',
  'CHINESE RICE / NOODLES': '15. Chinese Rice & Noodles',
  'INDIAN BREADS': '16. Indian Breads',
  'DOSA VARIETIES': '17. Dosa Varieties',
  'PAROTTA VARIETIES': '18. Parotta Varieties',
  'FRESH JUICE': '19. Fresh Juice',
  'MOJITO': '20. Mojito',
  'ICE CREAMS': '21. Ice Creams'
};

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[/]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const baseImagesDir = path.join(__dirname, 'Adipozhi_Menu_Images_extracted', 'Adipozhi_Menu_Images');
const publicMenuItemsDir = path.join(__dirname, 'public', 'menu-items');

function getManifestMatch(catName, itemName) {
  const folder = catFolderMap[catName];
  if (!folder) return null;
  const mCat = manifest.find(c => c.folderName === folder);
  if (!mCat) return null;

  const norm = (s) => s.toLowerCase().replace(/manjurian/g, 'manchurian').replace(/briyani/g, 'biriyani').replace(/[^a-z0-9]/g, '');
  const normItem = norm(itemName);

  // Exact name match
  let found = mCat.items.find(i => i.name.toLowerCase().trim() === itemName.toLowerCase().trim());
  if (found) return { folder, item: found };

  // Normalized alphanumeric match
  found = mCat.items.find(i => norm(i.name) === normItem);
  if (found) return { folder, item: found };

  // Category specific matching rules
  if (catName === 'NON-VEG STARTERS — CHICKEN') {
    if (itemName === 'Chicken 65 B' || itemName === 'Chicken 65 B.L') {
      const match = mCat.items.find(i => i.fileName.includes('Chicken 65'));
      return { folder, item: match };
    }
  }

  if (catName === 'ARABIAN STARTERS') {
    if (itemName.startsWith('Grill Pepper')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('Grill Pepper')) };
    if (itemName.startsWith('Grill')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('Grill Q')) };
    if (itemName.startsWith('Peri Peri Al-Faham')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('Peri Peri')) };
    if (itemName.startsWith('Al-Faham')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('Al-Faham')) };
    if (itemName.startsWith('Tandoori')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('Tandoori')) };
    if (itemName.startsWith('BBQ Pepper')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('BBQ Pepper')) };
    if (itemName.startsWith('BBQ')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('BBQ Q')) };
  }

  if (catName === 'BIRIYANI\'S') {
    if (itemName === 'Plain Briyani') return { folder, item: mCat.items.find(i => i.fileName.includes('Plain Biriyani')) };
  }

  if (catName === 'FAMILY PACK — ONLY PARCEL') {
    if (itemName.includes('Chicken')) {
      if (itemName.includes('Half')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('Half') && i.fileName.includes('Chicken')) };
      if (itemName.includes('Full')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('Full') && i.fileName.includes('Chicken')) };
    }
    if (itemName.includes('Beef')) {
      if (itemName.includes('Half')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('Half') && i.fileName.includes('Beef')) };
      if (itemName.includes('Full')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('Full') && i.fileName.includes('Beef')) };
    }
    if (itemName.includes('Mutton')) {
      if (itemName.includes('Half')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('Half') && i.fileName.includes('Mutton')) };
      if (itemName.includes('Full')) return { folder, item: mCat.items.find(i => i.fileName.startsWith('Full') && i.fileName.includes('Mutton')) };
    }
  }

  if (catName === 'INDIAN GRAVY & MASALA') {
    const strippedItem = normItem.replace(/semi|dry/g, '');
    found = mCat.items.find(i => norm(i.name).replace(/semi|dry/g, '') === strippedItem);
    if (found) return { folder, item: found };
  }

  found = mCat.items.find(i => {
    const mNorm = norm(i.name);
    return normItem.includes(mNorm) || mNorm.includes(normItem);
  });
  if (found) return { folder, item: found };

  return null;
}

// 1. Copy all 175 images from manifest into public/menu-items/<category-slug>/<file-slug>.<ext>
console.log('=== Copying 175 fresh images from ZIP archive to public/menu-items/ ===');
let copiedImagesCount = 0;
const copiedDestinations = new Map(); // sourceDiskPath -> targetRelPath

manifest.forEach(cat => {
  const catSlug = slugify(cat.folderName);
  const targetDir = path.join(publicMenuItemsDir, catSlug);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  cat.items.forEach(item => {
    const srcFile = path.join(baseImagesDir, cat.folderName, item.fileName);
    if (!fs.existsSync(srcFile)) {
      throw new Error(`Source image missing: ${srcFile}`);
    }

    const ext = path.extname(item.fileName);
    const baseName = path.basename(item.fileName, ext);
    const targetFile = slugify(baseName) + ext.toLowerCase();
    const destFile = path.join(targetDir, targetFile);

    fs.copyFileSync(srcFile, destFile);
    copiedImagesCount++;

    const relUrl = `/menu-items/${catSlug}/${targetFile}`;
    copiedDestinations.set(srcFile, relUrl);
  });
});
console.log(`Copied ${copiedImagesCount} images into category directories.`);

// 2. Map all 185 menu items in data.json
console.log('\n=== Updating menu items in data.json ===');
const catById = {};
data.categories.forEach(c => catById[c._id] = c);

let updatedItemCount = 0;
let overwrittenOldFilesCount = 0;

data.menuitems.forEach(m => {
  const cat = catById[m.categoryId];
  const match = getManifestMatch(cat.name, m.name);
  if (!match) {
    throw new Error(`Could not find manifest match for item: ${m.name} in category: ${cat.name}`);
  }

  const srcFile = path.join(baseImagesDir, match.folder, match.item.fileName);
  const newRelUrl = copiedDestinations.get(srcFile);
  if (!newRelUrl) {
    throw new Error(`No copied destination recorded for: ${srcFile}`);
  }

  const oldUrl = m.image;
  m.image = newRelUrl;
  m.updatedAt = new Date().toISOString();
  updatedItemCount++;

  // Backward compatibility: also overwrite the old file path on disk if it existed
  if (oldUrl && oldUrl.startsWith('/menu-items/')) {
    const oldFilePath = path.join(__dirname, 'public', oldUrl.replace(/^\//, ''));
    if (fs.existsSync(oldFilePath) && oldFilePath !== path.join(publicMenuItemsDir, newRelUrl.replace(/^\/menu-items\//, ''))) {
      try {
        fs.copyFileSync(srcFile, oldFilePath);
        overwrittenOldFilesCount++;
      } catch (err) {
        console.warn(`Could not overwrite old file ${oldFilePath}:`, err.message);
      }
    }
  }
});

console.log(`Updated ${updatedItemCount} menu items in data.json to point to new image paths.`);
console.log(`Overwrote ${overwrittenOldFilesCount} existing old image files with new image contents for backward compatibility.`);

// 3. Update category images in data.json for categories that used old /menu-items/...
console.log('\n=== Updating category images in data.json ===');
const categoryImageMap = {
  'FAMILY PACK — ONLY PARCEL': '/menu-items/12-family-pack-only-parcel/half-bucket-chicken-biriyani.png',
  'CHETTINADU MASALAS': '/menu-items/13-chettinadu-masalas/chicken-chettinadu-masala.png',
  'INDIAN GRAVY & MASALA': '/menu-items/14-indian-gravy-and-masala/paneer-butter-masala.jpg',
  'CHINESE RICE / NOODLES': '/menu-items/15-chinese-rice-and-noodles/chicken-rice-noodles.jpg',
  'INDIAN BREADS': '/menu-items/16-indian-breads/butter-naan.jpg',
  'DOSA VARIETIES': '/menu-items/17-dosa-varieties/roast.png',
  'PAROTTA VARIETIES': '/menu-items/18-parotta-varieties/parotta-1-pc.png',
  'FRESH JUICE': '/menu-items/19-fresh-juice/lemon-mint.png',
  'MOJITO': '/menu-items/20-mojito/blue-curacao.png',
  'ICE CREAMS': '/menu-items/21-ice-creams/butterscotch.png'
};

data.categories.forEach(c => {
  if (categoryImageMap[c.name]) {
    const oldCatImg = c.image;
    c.image = categoryImageMap[c.name];
    c.updatedAt = new Date().toISOString();
    console.log(`Updated category [${c.name}] image: ${oldCatImg} -> ${c.image}`);
  }
});

// 4. Write data.json
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log('\nSaved updated data.json successfully.');
