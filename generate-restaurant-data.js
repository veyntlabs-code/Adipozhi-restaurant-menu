const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));
const r = data.restaurants[0];

const catMap = {};
data.categories.forEach(c => { catMap[c._id] = c.name; });

const categoriesList = [
  { id: 'all', name: 'All Dishes', displayOrder: 0 },
  ...data.categories.map(c => ({
    id: c.name,
    name: c.name,
    displayOrder: c.displayOrder || 0
  }))
];

const menuItemsList = data.menuitems.map(m => {
  const catName = catMap[m.categoryId] || m.categoryId;
  const isParcel = catName.toUpperCase().includes('PARCEL') || (m.description && m.description.toUpperCase().includes('PARCEL'));
  const isBucket = m.name.toUpperCase().includes('BUCKET');
  return {
    id: m._id,
    name: m.name,
    category: catName,
    price: m.price,
    description: m.description || '',
    isVeg: m.foodType === 'VEG',
    image: m.image,
    isParcelOnly: isParcel || undefined,
    specialOffer: isBucket ? 'Free Chicken 65 on Bucket parcel!' : undefined,
    tags: m.isSpicy ? ['Spicy'] : (m.isFeatured ? ['Featured'] : undefined)
  };
});

const fileContent = `export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number | string;
  priceDisplay?: string;
  isSeasonalPrice?: boolean;
  priceVariants?: { label: string; price: number | string }[];
  portion?: string;
  description: string;
  isVeg: boolean;
  image?: string;
  isParcelOnly?: boolean;
  tags?: string[];
  specialOffer?: string;
}

export interface Category {
  id: string;
  name: string;
  displayOrder: number;
}

export const RESTAURANT_INFO = {
  name: ${JSON.stringify(r.name)},
  tagline: ${JSON.stringify(r.description || 'Authentic cuisine with rich flavors and traditional recipes passed down through generations.')},
  phone: ${JSON.stringify(r.phone || '+91 98765 43210')},
  phoneRaw: ${JSON.stringify((r.phone || '+919876543210').replace(/\s+/g, ''))},
  address: ${JSON.stringify(r.address || 'Bus stand Entrance Arch, Monday Market')},
  currency: ${JSON.stringify(r.currency || '₹')}
};

export const MENU_CATEGORIES: Category[] = ${JSON.stringify(categoriesList, null, 2)};

export const MENU_ITEMS: MenuItem[] = ${JSON.stringify(menuItemsList, null, 2)};
`;

const dir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'restaurantData.ts'), fileContent, 'utf-8');
console.log('restaurantData.ts generated successfully!');
