export interface MenuItem {
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
  name: "Adipozhi Restaurant",
  tagline: "Authentic cuisine with rich flavors and traditional recipes passed down through generations.",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  address: "123 Food Street, Cuisine Quarter",
  currency: "₹"
};

export const MENU_CATEGORIES: Category[] = [
  {
    "id": "all",
    "name": "All Dishes",
    "displayOrder": 0
  },
  {
    "id": "SOUPS",
    "name": "SOUPS",
    "displayOrder": 2
  },
  {
    "id": "EGG SPECIAL",
    "name": "EGG SPECIAL",
    "displayOrder": 1
  },
  {
    "id": "VEG STARTERS",
    "name": "VEG STARTERS",
    "displayOrder": 3
  },
  {
    "id": "NON-VEG STARTERS — CHICKEN",
    "name": "NON-VEG STARTERS — CHICKEN",
    "displayOrder": 4
  },
  {
    "id": "NON-VEG STARTERS — MUTTON",
    "name": "NON-VEG STARTERS — MUTTON",
    "displayOrder": 5
  },
  {
    "id": "NON-VEG STARTERS — BEEF",
    "name": "NON-VEG STARTERS — BEEF",
    "displayOrder": 6
  },
  {
    "id": "NON-VEG STARTERS — SEAFOODS",
    "name": "NON-VEG STARTERS — SEAFOODS",
    "displayOrder": 7
  },
  {
    "id": "ARABIAN STARTERS",
    "name": "ARABIAN STARTERS",
    "displayOrder": 8
  },
  {
    "id": "ARABIAN SPICY'S",
    "name": "ARABIAN SPICY'S",
    "displayOrder": 9
  },
  {
    "id": "PULAOS",
    "name": "PULAOS",
    "displayOrder": 10
  },
  {
    "id": "BIRIYANI'S",
    "name": "BIRIYANI'S",
    "displayOrder": 11
  },
  {
    "id": "FAMILY PACK — ONLY PARCEL",
    "name": "FAMILY PACK — ONLY PARCEL",
    "displayOrder": 12
  },
  {
    "id": "CHETTINADU MASALAS",
    "name": "CHETTINADU MASALAS",
    "displayOrder": 13
  },
  {
    "id": "INDIAN GRAVY & MASALA",
    "name": "INDIAN GRAVY & MASALA",
    "displayOrder": 14
  },
  {
    "id": "CHINESE RICE / NOODLES",
    "name": "CHINESE RICE / NOODLES",
    "displayOrder": 15
  },
  {
    "id": "INDIAN BREADS",
    "name": "INDIAN BREADS",
    "displayOrder": 16
  },
  {
    "id": "DOSA VARIETIES",
    "name": "DOSA VARIETIES",
    "displayOrder": 17
  },
  {
    "id": "PAROTTA VARIETIES",
    "name": "PAROTTA VARIETIES",
    "displayOrder": 18
  },
  {
    "id": "FRESH JUICE",
    "name": "FRESH JUICE",
    "displayOrder": 19
  },
  {
    "id": "MOJITO",
    "name": "MOJITO",
    "displayOrder": 20
  },
  {
    "id": "ICE CREAMS",
    "name": "ICE CREAMS",
    "displayOrder": 21
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    "id": "20f10775c8784267b1e438b3",
    "name": "Veg Clear Soup",
    "category": "SOUPS",
    "price": 60,
    "description": "Veg Clear Soup prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/01-soups/veg-clear-soup.png"
  },
  {
    "id": "404f09e52bcce13a94e7bb3f",
    "name": "Hot & Sour Veg Soup",
    "category": "SOUPS",
    "price": 80,
    "description": "Hot & Sour Veg Soup prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/01-soups/hot-and-sour-veg-soup.png"
  },
  {
    "id": "fe9070c9ebadd36bec55c6fb",
    "name": "Sweet Corn Veg Soup",
    "category": "SOUPS",
    "price": 80,
    "description": "Sweet Corn Veg Soup prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/01-soups/sweet-corn-veg-soup.png"
  },
  {
    "id": "4d4aaa23499b5f125967705e",
    "name": "Hot & Sour Chicken Soup",
    "category": "SOUPS",
    "price": 100,
    "description": "Hot & Sour Chicken Soup prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/01-soups/hot-and-sour-chicken-soup.png"
  },
  {
    "id": "49e01d957601c0c6a7c454a4",
    "name": "Sweet Corn Chicken Soup",
    "category": "SOUPS",
    "price": 100,
    "description": "Sweet Corn Chicken Soup prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/01-soups/sweet-corn-chicken-soup.png"
  },
  {
    "id": "3f215220206dbdfea84873e4",
    "name": "Chicken Manchow Soup",
    "category": "SOUPS",
    "price": 140,
    "description": "Chicken Manchow Soup prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/01-soups/chicken-manchow-soup.png"
  },
  {
    "id": "71b2dccad81929883db0b7de",
    "name": "Boiled Egg",
    "category": "EGG SPECIAL",
    "price": 15,
    "description": "Boiled Egg prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/02-egg-special/boiled-egg.png"
  },
  {
    "id": "930cb7d5793e02f42488a577",
    "name": "Omelette",
    "category": "EGG SPECIAL",
    "price": 25,
    "description": "Omelette prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/02-egg-special/omelette.png"
  },
  {
    "id": "e190cdbc329939e4f4781f18",
    "name": "Podi Mass",
    "category": "EGG SPECIAL",
    "price": 50,
    "description": "Podi Mass prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/02-egg-special/podi-mass.jpg"
  },
  {
    "id": "5fc99a86dbbbb84a16420beb",
    "name": "Kalakki",
    "category": "EGG SPECIAL",
    "price": 20,
    "description": "Kalakki prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/02-egg-special/kalakki.jpg"
  },
  {
    "id": "ed0bc22bc91b11ad7ca6bdb3",
    "name": "Egg Mass",
    "category": "EGG SPECIAL",
    "price": 50,
    "description": "Egg Mass prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/02-egg-special/egg-mass.jpg"
  },
  {
    "id": "49b255b570414e7015a7ff3e",
    "name": "Half Boil",
    "category": "EGG SPECIAL",
    "price": 20,
    "description": "Half Boil prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/02-egg-special/half-boil.png"
  },
  {
    "id": "62917b0e6b8edce802e389f8",
    "name": "Full Boil",
    "category": "EGG SPECIAL",
    "price": 20,
    "description": "Full Boil prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/02-egg-special/full-boil.png"
  },
  {
    "id": "b1e8ec95670a04c933ac2599",
    "name": "Gobi 65",
    "category": "VEG STARTERS",
    "price": 130,
    "description": "Gobi 65 prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/03-veg-starters/gobi-65.png"
  },
  {
    "id": "f8a6c17b374890c1bcf7c33e",
    "name": "Mushroom 65",
    "category": "VEG STARTERS",
    "price": 140,
    "description": "Mushroom 65 prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/03-veg-starters/mushroom-65.png"
  },
  {
    "id": "d8728ba4bcfdbbc2f04afe52",
    "name": "Paneer 65",
    "category": "VEG STARTERS",
    "price": 170,
    "description": "Paneer 65 prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/03-veg-starters/paneer-65.png"
  },
  {
    "id": "c6ec7468ec74abb0e24c9aa8",
    "name": "Gobi Pepper Fry",
    "category": "VEG STARTERS",
    "price": 160,
    "description": "Gobi Pepper Fry prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/03-veg-starters/gobi-pepper-fry.png"
  },
  {
    "id": "8f5084e4981cf370ffd87a3e",
    "name": "Gobi Manjurian Dry",
    "category": "VEG STARTERS",
    "price": 160,
    "description": "Gobi Manjurian Dry prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/03-veg-starters/gobi-manchurian-dry.png"
  },
  {
    "id": "c0c6ea427819852e94ada865",
    "name": "Mushroom Pepper Fry",
    "category": "VEG STARTERS",
    "price": 170,
    "description": "Mushroom Pepper Fry prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/03-veg-starters/mushroom-pepper-fry.png"
  },
  {
    "id": "d61c123667e4041150ddb7f0",
    "name": "French Fries",
    "category": "VEG STARTERS",
    "price": 80,
    "description": "French Fries prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/03-veg-starters/french-fries.png"
  },
  {
    "id": "a599d41f39665a12696229bb",
    "name": "Chicken 65 B",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 150,
    "description": "Chicken 65 B prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/chicken-65-b-b-l.png",
    "tags": [
      "Featured"
    ]
  },
  {
    "id": "f086c2259b7cbf4b0cb5667b",
    "name": "Chicken 65 B.L",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 190,
    "description": "Chicken 65 B.L prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/chicken-65-b-b-l.png"
  },
  {
    "id": "3c9f44f5a21228a842c7a12f",
    "name": "Kaadai 65",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 160,
    "description": "Kaadai 65 prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/kaadai-65.png"
  },
  {
    "id": "1030da15d58ccdc779d87def",
    "name": "Chicken Lollipop",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 200,
    "description": "Chicken Lollipop prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/chicken-lollipop.png"
  },
  {
    "id": "802f7733a33879b5b1c686fc",
    "name": "Chicken Chukka",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 170,
    "description": "Chicken Chukka prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/chicken-chukka.png"
  },
  {
    "id": "fa448b9766662c1be7ae0cb6",
    "name": "Kaadai Chukka",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 185,
    "description": "Kaadai Chukka prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/kaadai-chukka.png"
  },
  {
    "id": "231ffa0bef8db682732df9e2",
    "name": "Nattukozhi Chukka",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 210,
    "description": "Nattukozhi Chukka prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/nattukozhi-chukka.png"
  },
  {
    "id": "d0d13f62ebf6ea54322be5c4",
    "name": "Chilly Chicken Dry",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 230,
    "description": "Chilly Chicken Dry prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/chilly-chicken-dry.png",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "7bc291267a3f65d5000b1292",
    "name": "Chicken Manjurian Dry",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 230,
    "description": "Chicken Manjurian Dry prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/chicken-manchurian-dry.png"
  },
  {
    "id": "79bc9f870b63f4bf837e5739",
    "name": "Garlic Chicken Dry",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 240,
    "description": "Garlic Chicken Dry prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/garlic-chicken-dry.png"
  },
  {
    "id": "bd6f898f85755d54a67ca519",
    "name": "Ginger Chicken Dry",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 240,
    "description": "Ginger Chicken Dry prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/ginger-chicken-dry.png"
  },
  {
    "id": "4391487c6204d28caccc8df1",
    "name": "Dragon Chicken",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 250,
    "description": "Dragon Chicken prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/dragon-chicken.jpg",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "a35713f21eb989b6f8009aca",
    "name": "Lemon Chicken",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 250,
    "description": "Lemon Chicken prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/lemon-chicken.png"
  },
  {
    "id": "4efa411571187050f1d386a0",
    "name": "Honey Chicken",
    "category": "NON-VEG STARTERS — CHICKEN",
    "price": 260,
    "description": "Honey Chicken prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/04-non-veg-starters-chicken/honey-chicken.png"
  },
  {
    "id": "ee30111a76b18db2e9643fe1",
    "name": "Mutton Chukka",
    "category": "NON-VEG STARTERS — MUTTON",
    "price": 290,
    "description": "Mutton Chukka prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/05-non-veg-starters-mutton/mutton-chukka.png",
    "tags": [
      "Featured"
    ]
  },
  {
    "id": "26507ba1be987f41dfa7acb7",
    "name": "Mutton Varutha Kari",
    "category": "NON-VEG STARTERS — MUTTON",
    "price": 290,
    "description": "Mutton Varutha Kari prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/05-non-veg-starters-mutton/mutton-varutha-kari.png"
  },
  {
    "id": "5069ed751779538a921d13d7",
    "name": "Mutton Kola Urundai (2 Pcs)",
    "category": "NON-VEG STARTERS — MUTTON",
    "price": 80,
    "description": "Mutton Kola Urundai (2 Pcs) prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/05-non-veg-starters-mutton/mutton-kola-urundai-2-pcs.png"
  },
  {
    "id": "2e28f12deef558e3063c0110",
    "name": "Beef Chukka",
    "category": "NON-VEG STARTERS — BEEF",
    "price": 220,
    "description": "Beef Chukka prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/06-non-veg-starters-beef/beef-chukka.png"
  },
  {
    "id": "c6233d474c69a45f29cbfabe",
    "name": "Beef Tawa Fry",
    "category": "NON-VEG STARTERS — BEEF",
    "price": 210,
    "description": "Beef Tawa Fry prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/06-non-veg-starters-beef/beef-tawa-fry.png"
  },
  {
    "id": "1a5fac409439e1fa3137770b",
    "name": "Crispy Prawn",
    "category": "NON-VEG STARTERS — SEAFOODS",
    "price": 250,
    "description": "Crispy Prawn prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/07-non-veg-starters-seafood/crispy-prawn.jpg"
  },
  {
    "id": "35833c18257729db908a59d9",
    "name": "Prawn Pepper Fry",
    "category": "NON-VEG STARTERS — SEAFOODS",
    "price": 260,
    "description": "Prawn Pepper Fry prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/07-non-veg-starters-seafood/prawn-pepper-fry.png"
  },
  {
    "id": "bfdfdc7c99a2da24a10bdf69",
    "name": "Fish Finger",
    "category": "NON-VEG STARTERS — SEAFOODS",
    "price": 210,
    "description": "Fish Finger prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/07-non-veg-starters-seafood/fish-finger.png"
  },
  {
    "id": "cb1b8a7e7fa781fa36c57753",
    "name": "Crab Lollipop",
    "category": "NON-VEG STARTERS — SEAFOODS",
    "price": 230,
    "description": "Crab Lollipop prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/07-non-veg-starters-seafood/crab-lollipop.png"
  },
  {
    "id": "4f3b336c8b7049764008b057",
    "name": "Nethili Fish Fry",
    "category": "NON-VEG STARTERS — SEAFOODS",
    "price": 160,
    "description": "Nethili Fish Fry prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/07-non-veg-starters-seafood/nethili-fish-fry.png"
  },
  {
    "id": "6739c5eb1b90bcba605443a5",
    "name": "Kulambu Meen",
    "category": "NON-VEG STARTERS — SEAFOODS",
    "price": 150,
    "description": "Kulambu Meen prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/07-non-veg-starters-seafood/kulambu-meen.png"
  },
  {
    "id": "e3b195ec0b4a069d75e82953",
    "name": "Fish Tawa Fry",
    "category": "NON-VEG STARTERS — SEAFOODS",
    "price": 180,
    "description": "Fish Tawa Fry prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/07-non-veg-starters-seafood/fish-tawa-fry.png"
  },
  {
    "id": "527b364ed01b13dafe181847",
    "name": "Fish Fry",
    "category": "NON-VEG STARTERS — SEAFOODS",
    "price": 160,
    "description": "Fish Fry prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/07-non-veg-starters-seafood/fish-fry.png"
  },
  {
    "id": "ad896ad31a5f07698fda9455",
    "name": "Grill Q",
    "category": "ARABIAN STARTERS",
    "price": 140,
    "description": "Grill Q prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/grill-q-h-f.png"
  },
  {
    "id": "5a8e8d7acb6416e34a6d51d0",
    "name": "Grill H",
    "category": "ARABIAN STARTERS",
    "price": 250,
    "description": "Grill H prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/grill-q-h-f.png"
  },
  {
    "id": "061efdd15c35c47d8acf1859",
    "name": "Grill F",
    "category": "ARABIAN STARTERS",
    "price": 480,
    "description": "Grill F prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/grill-q-h-f.png"
  },
  {
    "id": "25fc4addd81852d103285ccd",
    "name": "Grill Pepper H",
    "category": "ARABIAN STARTERS",
    "price": 280,
    "description": "Grill Pepper H prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/grill-pepper-h-f.jpg"
  },
  {
    "id": "e2c066bc39fd79aa06cefa97",
    "name": "Grill Pepper F",
    "category": "ARABIAN STARTERS",
    "price": 540,
    "description": "Grill Pepper F prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/grill-pepper-h-f.jpg"
  },
  {
    "id": "66933c3ce20eb8c634688e17",
    "name": "Al-Faham H",
    "category": "ARABIAN STARTERS",
    "price": 260,
    "description": "Al-Faham H prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/al-faham-h-f.jpg"
  },
  {
    "id": "132b6b69cbcad6b3154d148b",
    "name": "Al-Faham F",
    "category": "ARABIAN STARTERS",
    "price": 500,
    "description": "Al-Faham F prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/al-faham-h-f.jpg"
  },
  {
    "id": "79cc7798439e549c64b96ecf",
    "name": "Peri Peri Al-Faham H",
    "category": "ARABIAN STARTERS",
    "price": 280,
    "description": "Peri Peri Al-Faham H prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/peri-peri-al-faham-h-f.jpg",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "867d04322446e33ab5748687",
    "name": "Peri Peri Al-Faham F",
    "category": "ARABIAN STARTERS",
    "price": 540,
    "description": "Peri Peri Al-Faham F prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/peri-peri-al-faham-h-f.jpg",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "791673c6616cbc5f433fbb9d",
    "name": "Tandoori Q",
    "category": "ARABIAN STARTERS",
    "price": 140,
    "description": "Tandoori Q prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/tandoori-q-h-f.jpg"
  },
  {
    "id": "7ebaceec2abd2fff7ded38fd",
    "name": "Tandoori H",
    "category": "ARABIAN STARTERS",
    "price": 250,
    "description": "Tandoori H prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/tandoori-q-h-f.jpg"
  },
  {
    "id": "5c1be008ddf51bce5ddd9c6c",
    "name": "Tandoori F",
    "category": "ARABIAN STARTERS",
    "price": 480,
    "description": "Tandoori F prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/tandoori-q-h-f.jpg"
  },
  {
    "id": "23740b54d6db532d8d2d56f8",
    "name": "BBQ Q",
    "category": "ARABIAN STARTERS",
    "price": 160,
    "description": "BBQ Q prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/bbq-q-h-f.png"
  },
  {
    "id": "879160233a1f0a6760a76a32",
    "name": "BBQ H",
    "category": "ARABIAN STARTERS",
    "price": 280,
    "description": "BBQ H prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/bbq-q-h-f.png"
  },
  {
    "id": "c214a33f3609dfd14abbec6e",
    "name": "BBQ F",
    "category": "ARABIAN STARTERS",
    "price": 530,
    "description": "BBQ F prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/bbq-q-h-f.png"
  },
  {
    "id": "db8c5d450219c02a1dffd026",
    "name": "BBQ Pepper Q",
    "category": "ARABIAN STARTERS",
    "price": 180,
    "description": "BBQ Pepper Q prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/bbq-pepper-q-h-f.png"
  },
  {
    "id": "c430f408fd962e7d415ba3f3",
    "name": "BBQ Pepper H",
    "category": "ARABIAN STARTERS",
    "price": 300,
    "description": "BBQ Pepper H prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/bbq-pepper-q-h-f.png"
  },
  {
    "id": "89a91a6088bd50ec10899801",
    "name": "BBQ Pepper F",
    "category": "ARABIAN STARTERS",
    "price": 550,
    "description": "BBQ Pepper F prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/08-arabian-starters/bbq-pepper-q-h-f.png"
  },
  {
    "id": "5ed2c6790e0f02ea224ce4c6",
    "name": "Paneer Tikka",
    "category": "ARABIAN SPICY'S",
    "price": 240,
    "description": "Paneer Tikka prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/09-arabian-spicy-specials/paneer-tikka.png"
  },
  {
    "id": "d79a963e4a884e61b9d75370",
    "name": "Chicken Tikka",
    "category": "ARABIAN SPICY'S",
    "price": 220,
    "description": "Chicken Tikka prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/09-arabian-spicy-specials/chicken-tikka.png"
  },
  {
    "id": "ce65e2bda0505a73b67b1f87",
    "name": "Hariyali Kabab",
    "category": "ARABIAN SPICY'S",
    "price": 260,
    "description": "Hariyali Kabab prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/09-arabian-spicy-specials/hariyali-kabab.png"
  },
  {
    "id": "2280841472f92563f5b9fe34",
    "name": "Kalimirich Tikka",
    "category": "ARABIAN SPICY'S",
    "price": 260,
    "description": "Kalimirich Tikka prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/09-arabian-spicy-specials/kalimirich-tikka.png"
  },
  {
    "id": "c59d081decd20cdc227a5538",
    "name": "Reshmi Kabab",
    "category": "ARABIAN SPICY'S",
    "price": 270,
    "description": "Reshmi Kabab prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/09-arabian-spicy-specials/reshmi-kabab.jpg"
  },
  {
    "id": "f11cce8c91fbb5421c06c913",
    "name": "Tangri Kabab",
    "category": "ARABIAN SPICY'S",
    "price": 270,
    "description": "Tangri Kabab prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/09-arabian-spicy-specials/tangri-kabab.jpg"
  },
  {
    "id": "9635d4659e1c70540443b4a4",
    "name": "Malai Chicken Tikka",
    "category": "ARABIAN SPICY'S",
    "price": 270,
    "description": "Malai Chicken Tikka prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/09-arabian-spicy-specials/malai-chicken-tikka.png"
  },
  {
    "id": "0614652b7478b9ddd7fc5f92",
    "name": "Acharya Chicken Tikka",
    "category": "ARABIAN SPICY'S",
    "price": 270,
    "description": "Acharya Chicken Tikka prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/09-arabian-spicy-specials/acharya-chicken-tikka.png",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "aea19220616141e7e0197ed8",
    "name": "Veg Pulao",
    "category": "PULAOS",
    "price": 160,
    "description": "Veg Pulao prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/10-pulaos/veg-pulao.png"
  },
  {
    "id": "455a01e6a934c186f736e797",
    "name": "Mushroom Pulao",
    "category": "PULAOS",
    "price": 200,
    "description": "Mushroom Pulao prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/10-pulaos/mushroom-pulao.png"
  },
  {
    "id": "ee5ca6ff9ba83cdac459100f",
    "name": "Chicken Pulao",
    "category": "PULAOS",
    "price": 220,
    "description": "Chicken Pulao prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/10-pulaos/chicken-pulao.jpg"
  },
  {
    "id": "3f84a363426324cc6869563f",
    "name": "Mutton Pulao",
    "category": "PULAOS",
    "price": 260,
    "description": "Mutton Pulao prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/10-pulaos/mutton-pulao.jpg"
  },
  {
    "id": "b201af1d3f23ff8fbfffc830",
    "name": "Egg Biriyani",
    "category": "BIRIYANI'S",
    "price": 160,
    "description": "Egg Biriyani prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/11-biriyanis/egg-biriyani.png"
  },
  {
    "id": "6000c61d1ee8059477b4ce06",
    "name": "Chicken Dum Briyani",
    "category": "BIRIYANI'S",
    "price": 200,
    "description": "Chicken Dum Briyani prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/11-biriyanis/chicken-dum-biriyani.png",
    "tags": [
      "Featured"
    ]
  },
  {
    "id": "5ecbfa559292513ac174a240",
    "name": "Naatukozhi Briyani",
    "category": "BIRIYANI'S",
    "price": 250,
    "description": "Naatukozhi Briyani prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/11-biriyanis/naatukozhi-biriyani.png"
  },
  {
    "id": "4568c52d161e40dc2ac5dfa0",
    "name": "Kaadai Briyani",
    "category": "BIRIYANI'S",
    "price": 250,
    "description": "Kaadai Briyani prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/11-biriyanis/kaadai-biriyani.png"
  },
  {
    "id": "c3cb0500280de21b4adaaa22",
    "name": "Chicken 65 Briyani",
    "category": "BIRIYANI'S",
    "price": 230,
    "description": "Chicken 65 Briyani prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/11-biriyanis/chicken-65-biriyani.png"
  },
  {
    "id": "ef8b35af63968f0d55d26b3b",
    "name": "Beef Biriyani",
    "category": "BIRIYANI'S",
    "price": 240,
    "description": "Beef Biriyani prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/11-biriyanis/beef-biriyani.png"
  },
  {
    "id": "ee93fe105fd1254322253c0f",
    "name": "Mutton Dum Briyani",
    "category": "BIRIYANI'S",
    "price": 290,
    "description": "Mutton Dum Briyani prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/11-biriyanis/mutton-dum-biriyani.png",
    "tags": [
      "Featured"
    ]
  },
  {
    "id": "514dcc2073e30ba7fa078e46",
    "name": "Plain Briyani",
    "category": "BIRIYANI'S",
    "price": 130,
    "description": "Plain Briyani prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/11-biriyanis/plain-biriyani-kuska.png"
  },
  {
    "id": "760f9debe9f12238714b3507",
    "name": "Half Bucket Chicken Briyani (1/4 KG 65 Free)",
    "category": "FAMILY PACK — ONLY PARCEL",
    "price": 1100,
    "description": "Half Bucket Chicken Briyani (1/4 KG 65 Free) prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/12-family-pack-only-parcel/half-bucket-chicken-biriyani.png",
    "isParcelOnly": true,
    "specialOffer": "Free Chicken 65 on Bucket parcel!"
  },
  {
    "id": "df95d8a6ac4ee4b6d7039a3e",
    "name": "Full Bucket Chicken Briyani (1/2 KG 65 Free)",
    "category": "FAMILY PACK — ONLY PARCEL",
    "price": 2200,
    "description": "Full Bucket Chicken Briyani (1/2 KG 65 Free) prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/12-family-pack-only-parcel/full-bucket-chicken-biriyani.png",
    "isParcelOnly": true,
    "specialOffer": "Free Chicken 65 on Bucket parcel!"
  },
  {
    "id": "1e7c33a59779a3730faf58db",
    "name": "Half Bucket Beef Briyani",
    "category": "FAMILY PACK — ONLY PARCEL",
    "price": 1300,
    "description": "Half Bucket Beef Briyani prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/12-family-pack-only-parcel/half-bucket-beef-biriyani.png",
    "isParcelOnly": true,
    "specialOffer": "Free Chicken 65 on Bucket parcel!"
  },
  {
    "id": "cce21508a7cdb97450fcd9a1",
    "name": "Full Bucket Beef Briyani",
    "category": "FAMILY PACK — ONLY PARCEL",
    "price": 2600,
    "description": "Full Bucket Beef Briyani prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/12-family-pack-only-parcel/full-bucket-beef-biriyani.png",
    "isParcelOnly": true,
    "specialOffer": "Free Chicken 65 on Bucket parcel!"
  },
  {
    "id": "21a07025387d963d1dc9b932",
    "name": "Half Bucket Mutton Briyani",
    "category": "FAMILY PACK — ONLY PARCEL",
    "price": 1600,
    "description": "Half Bucket Mutton Briyani prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/12-family-pack-only-parcel/half-bucket-mutton-biriyani.png",
    "isParcelOnly": true,
    "specialOffer": "Free Chicken 65 on Bucket parcel!"
  },
  {
    "id": "dd790ff54c57f5ea9997689c",
    "name": "Full Bucket Mutton Briyani",
    "category": "FAMILY PACK — ONLY PARCEL",
    "price": 3200,
    "description": "Full Bucket Mutton Briyani prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/12-family-pack-only-parcel/full-bucket-mutton-biriyani.png",
    "isParcelOnly": true,
    "specialOffer": "Free Chicken 65 on Bucket parcel!"
  },
  {
    "id": "aadca815ba242ff838c79724",
    "name": "Chicken Chettinadu Masala",
    "category": "CHETTINADU MASALAS",
    "price": 220,
    "description": "Chicken Chettinadu Masala prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/13-chettinadu-masalas/chicken-chettinadu-masala.png",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "59c5b3b8f1dad26ba207adec",
    "name": "Mutton Chettinadu Masala",
    "category": "CHETTINADU MASALAS",
    "price": 290,
    "description": "Mutton Chettinadu Masala prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/13-chettinadu-masalas/mutton-chettinadu-masala.png",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "4bbb29f39327ddcaa25e872d",
    "name": "Chicken Pepper Masala",
    "category": "CHETTINADU MASALAS",
    "price": 240,
    "description": "Chicken Pepper Masala prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/13-chettinadu-masalas/chicken-pepper-masala.png",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "ec21a59734745e47d3a1198d",
    "name": "Naatukozhi Masala",
    "category": "CHETTINADU MASALAS",
    "price": 270,
    "description": "Naatukozhi Masala prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/13-chettinadu-masalas/naatukozhi-masala.png"
  },
  {
    "id": "0e364a3cc6a47b89e4303872",
    "name": "Kaadai Masala",
    "category": "CHETTINADU MASALAS",
    "price": 230,
    "description": "Kaadai Masala prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/13-chettinadu-masalas/kaadai-masala.png"
  },
  {
    "id": "251a83b22fb8d5b378327e57",
    "name": "Prawn Masala",
    "category": "CHETTINADU MASALAS",
    "price": 270,
    "description": "Prawn Masala prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/13-chettinadu-masalas/prawn-masala.png"
  },
  {
    "id": "9efc65e3e3143f4bf9df576b",
    "name": "Beef Chettinadu Masala",
    "category": "CHETTINADU MASALAS",
    "price": 250,
    "description": "Beef Chettinadu Masala prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/13-chettinadu-masalas/beef-chettinadu-masala.png",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "f1a87512ccdbfef49fb3369d",
    "name": "Gobi Manjurian Gravy",
    "category": "INDIAN GRAVY & MASALA",
    "price": 170,
    "description": "Gobi Manjurian Gravy prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/14-indian-gravy-and-masala/gobi-manchurian-gravy-semi-dry.png"
  },
  {
    "id": "b1d7650a876b988a6b86af29",
    "name": "Mushroom Manjurian Gravy",
    "category": "INDIAN GRAVY & MASALA",
    "price": 180,
    "description": "Mushroom Manjurian Gravy prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/14-indian-gravy-and-masala/mushroom-manchurian-gravy-semi-dry.png"
  },
  {
    "id": "6dc243c553b11e07537507d4",
    "name": "Paneer Manjurian Gravy",
    "category": "INDIAN GRAVY & MASALA",
    "price": 210,
    "description": "Paneer Manjurian Gravy prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/14-indian-gravy-and-masala/paneer-manchurian-gravy-semi-dry.png"
  },
  {
    "id": "e2ee3732290a44d10b16b398",
    "name": "Gobi Masala",
    "category": "INDIAN GRAVY & MASALA",
    "price": 190,
    "description": "Gobi Masala prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/14-indian-gravy-and-masala/gobi-masala.png"
  },
  {
    "id": "f22e241ea280ce876a3b8a9a",
    "name": "Paneer Kadai Masala",
    "category": "INDIAN GRAVY & MASALA",
    "price": 250,
    "description": "Paneer Kadai Masala prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/14-indian-gravy-and-masala/paneer-kadai-masala.png"
  },
  {
    "id": "ae073d0bf72ad365d86bd750",
    "name": "Mushroom Kadai Masala",
    "category": "INDIAN GRAVY & MASALA",
    "price": 230,
    "description": "Mushroom Kadai Masala prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/14-indian-gravy-and-masala/mushroom-kadai-masala.png"
  },
  {
    "id": "5ed826dd84432c69d4ecaece",
    "name": "Mixed Veg Curry",
    "category": "INDIAN GRAVY & MASALA",
    "price": 250,
    "description": "Mixed Veg Curry prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/14-indian-gravy-and-masala/mixed-veg-curry.png"
  },
  {
    "id": "65e80b8494182650f2c7f817",
    "name": "Paneer Butter Masala",
    "category": "INDIAN GRAVY & MASALA",
    "price": 220,
    "description": "Paneer Butter Masala prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/14-indian-gravy-and-masala/paneer-butter-masala.jpg",
    "tags": [
      "Featured"
    ]
  },
  {
    "id": "39346ae4095c7daa48ee5184",
    "name": "Chilly Chicken Gravy",
    "category": "INDIAN GRAVY & MASALA",
    "price": 240,
    "description": "Chilly Chicken Gravy prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/14-indian-gravy-and-masala/chilly-chicken-gravy-semi-dry.png",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "afd6787c9c741ac62f07d683",
    "name": "Chicken Manjurian Gravy",
    "category": "INDIAN GRAVY & MASALA",
    "price": 240,
    "description": "Chicken Manjurian Gravy prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/14-indian-gravy-and-masala/chicken-manchurian-gravy-semi-dry.png"
  },
  {
    "id": "31535167c94da7498ceab6ea",
    "name": "Garlic Chicken Gravy",
    "category": "INDIAN GRAVY & MASALA",
    "price": 250,
    "description": "Garlic Chicken Gravy prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/14-indian-gravy-and-masala/garlic-chicken-gravy-semi-dry.png"
  },
  {
    "id": "3c3b457e2940c8e012168e61",
    "name": "Ginger Chicken Gravy",
    "category": "INDIAN GRAVY & MASALA",
    "price": 250,
    "description": "Ginger Chicken Gravy prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/14-indian-gravy-and-masala/ginger-chicken-gravy-semi-dry.jpg"
  },
  {
    "id": "266442dfe806a6a913600de7",
    "name": "Prawn Manjurian Gravy",
    "category": "INDIAN GRAVY & MASALA",
    "price": 260,
    "description": "Prawn Manjurian Gravy prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/14-indian-gravy-and-masala/prawn-manchurian-gravy-semi-dry.png"
  },
  {
    "id": "7c40a917e8554bf73de6e275",
    "name": "Butter Chicken Masala",
    "category": "INDIAN GRAVY & MASALA",
    "price": 270,
    "description": "Butter Chicken Masala prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/14-indian-gravy-and-masala/butter-chicken-masala.jpg",
    "tags": [
      "Featured"
    ]
  },
  {
    "id": "b8afcdf92ae2313d59cdaaa5",
    "name": "Chicken Tikka Masala",
    "category": "INDIAN GRAVY & MASALA",
    "price": 260,
    "description": "Chicken Tikka Masala prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/14-indian-gravy-and-masala/chicken-tikka-masala.jpg"
  },
  {
    "id": "60aef37f278801ad974e0d87",
    "name": "Kadai Chicken Masala",
    "category": "INDIAN GRAVY & MASALA",
    "price": 230,
    "description": "Kadai Chicken Masala prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/14-indian-gravy-and-masala/kadai-chicken-masala.jpg"
  },
  {
    "id": "ef1d8568cb63be82fdfdae2e",
    "name": "Murugai Chicken Masala",
    "category": "INDIAN GRAVY & MASALA",
    "price": 270,
    "description": "Murugai Chicken Masala prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/14-indian-gravy-and-masala/murugai-chicken-masala.jpg"
  },
  {
    "id": "5caa279ddf00520052f0967a",
    "name": "Veg Rice / Noodles",
    "category": "CHINESE RICE / NOODLES",
    "price": 150,
    "description": "Veg Rice / Noodles prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/15-chinese-rice-and-noodles/veg-rice-noodles.png"
  },
  {
    "id": "09d824808cf3f436124313b4",
    "name": "Paneer Rice / Noodles",
    "category": "CHINESE RICE / NOODLES",
    "price": 180,
    "description": "Paneer Rice / Noodles prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/15-chinese-rice-and-noodles/paneer-rice-noodles.png"
  },
  {
    "id": "09653215c95ca3f7dda2fba2",
    "name": "Mushroom Rice / Noodles",
    "category": "CHINESE RICE / NOODLES",
    "price": 170,
    "description": "Mushroom Rice / Noodles prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/15-chinese-rice-and-noodles/mushroom-rice-noodles.png"
  },
  {
    "id": "8bef23a403106187c1bc87b7",
    "name": "Egg Rice / Noodles",
    "category": "CHINESE RICE / NOODLES",
    "price": 160,
    "description": "Egg Rice / Noodles prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/15-chinese-rice-and-noodles/egg-rice-noodles.png"
  },
  {
    "id": "5c502349169b6cf225d381e5",
    "name": "Chicken Rice / Noodles",
    "category": "CHINESE RICE / NOODLES",
    "price": 180,
    "description": "Chicken Rice / Noodles prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/15-chinese-rice-and-noodles/chicken-rice-noodles.jpg"
  },
  {
    "id": "ee7f2560d781738a2c5fb7fc",
    "name": "Beef Rice / Noodles",
    "category": "CHINESE RICE / NOODLES",
    "price": 200,
    "description": "Beef Rice / Noodles prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/15-chinese-rice-and-noodles/beef-rice-noodles.jpg"
  },
  {
    "id": "d75fab1be9ec5acd0de11ff4",
    "name": "Mixed Rice / Noodles",
    "category": "CHINESE RICE / NOODLES",
    "price": 230,
    "description": "Mixed Rice / Noodles prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/15-chinese-rice-and-noodles/mixed-rice-noodles.jpg"
  },
  {
    "id": "bc62974185237e4e26b2b620",
    "name": "Schezwan Chicken Rice / Noodles",
    "category": "CHINESE RICE / NOODLES",
    "price": 195,
    "description": "Schezwan Chicken Rice / Noodles prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/15-chinese-rice-and-noodles/schezwan-chicken-rice-noodles.jpg",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "848834126bd1c1de507f002f",
    "name": "Schezwan Mixed Rice / Noodles",
    "category": "CHINESE RICE / NOODLES",
    "price": 235,
    "description": "Schezwan Mixed Rice / Noodles prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/15-chinese-rice-and-noodles/schezwan-mixed-rice-noodles.jpg",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "f7a5dbe92e6336bc30b66560",
    "name": "Jeera Rice",
    "category": "CHINESE RICE / NOODLES",
    "price": 170,
    "description": "Jeera Rice prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/15-chinese-rice-and-noodles/jeera-rice.png"
  },
  {
    "id": "b2901c07c61b583b1c9becbd",
    "name": "Naan",
    "category": "INDIAN BREADS",
    "price": 50,
    "description": "Naan prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/16-indian-breads/naan.jpg"
  },
  {
    "id": "761b65189fa3f2bb099a662f",
    "name": "Butter Naan",
    "category": "INDIAN BREADS",
    "price": 60,
    "description": "Butter Naan prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/16-indian-breads/butter-naan.jpg"
  },
  {
    "id": "7880e192b450104c5ccf78ea",
    "name": "Garlic Naan",
    "category": "INDIAN BREADS",
    "price": 70,
    "description": "Garlic Naan prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/16-indian-breads/garlic-naan.jpg"
  },
  {
    "id": "7cbd20a33f3c3e21918ae409",
    "name": "Mint Naan",
    "category": "INDIAN BREADS",
    "price": 70,
    "description": "Mint Naan prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/16-indian-breads/mint-naan.png"
  },
  {
    "id": "3b994f83b3768b4be4cb46cc",
    "name": "Rotti",
    "category": "INDIAN BREADS",
    "price": 60,
    "description": "Rotti prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/16-indian-breads/rotti.png"
  },
  {
    "id": "affa29e738fd7a28a49c0d2a",
    "name": "Butter Rotti",
    "category": "INDIAN BREADS",
    "price": 70,
    "description": "Butter Rotti prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/16-indian-breads/butter-rotti.png"
  },
  {
    "id": "c0a588636bf5dcc80d881e64",
    "name": "Methi Rotti",
    "category": "INDIAN BREADS",
    "price": 80,
    "description": "Methi Rotti prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/16-indian-breads/methi-rotti.png"
  },
  {
    "id": "58800393b46f67cc2ff7d05a",
    "name": "Pulkka (2 Pcs)",
    "category": "INDIAN BREADS",
    "price": 50,
    "description": "Pulkka (2 Pcs) prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/16-indian-breads/pulkka-2-pcs.png"
  },
  {
    "id": "b6fa7fefcb41256fe676da8f",
    "name": "Kulcha",
    "category": "INDIAN BREADS",
    "price": 70,
    "description": "Kulcha prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/16-indian-breads/kulcha.jpg"
  },
  {
    "id": "2e14f0053b5970290fb170a1",
    "name": "Butter Kulcha",
    "category": "INDIAN BREADS",
    "price": 80,
    "description": "Butter Kulcha prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/16-indian-breads/butter-kulcha.jpg"
  },
  {
    "id": "ae47bd149ec75051b92d5d77",
    "name": "Tandoori Parotta",
    "category": "INDIAN BREADS",
    "price": 60,
    "description": "Tandoori Parotta prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/16-indian-breads/tandoori-parotta.png"
  },
  {
    "id": "f35f7e26d6b7b5b85fce49bd",
    "name": "Stuffed Chicken Naan",
    "category": "INDIAN BREADS",
    "price": 130,
    "description": "Stuffed Chicken Naan prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/16-indian-breads/stuffed-chicken-naan.png"
  },
  {
    "id": "b2ac54171efee41dc65269ec",
    "name": "Stuffed Mutton Naan",
    "category": "INDIAN BREADS",
    "price": 150,
    "description": "Stuffed Mutton Naan prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/16-indian-breads/stuffed-mutton-naan.png"
  },
  {
    "id": "aac59a2096de0534493e9ec6",
    "name": "Roast",
    "category": "DOSA VARIETIES",
    "price": 70,
    "description": "Roast prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/17-dosa-varieties/roast.png"
  },
  {
    "id": "5ec158ccae2eef353214bbe7",
    "name": "Egg Dosa",
    "category": "DOSA VARIETIES",
    "price": 90,
    "description": "Egg Dosa prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/17-dosa-varieties/egg-dosa.png"
  },
  {
    "id": "125a43f05078781927c4a1a1",
    "name": "Ghee Roast",
    "category": "DOSA VARIETIES",
    "price": 90,
    "description": "Ghee Roast prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/17-dosa-varieties/ghee-roast.png"
  },
  {
    "id": "adbcc946d6d36a02e6be3b9e",
    "name": "Onion Roast",
    "category": "DOSA VARIETIES",
    "price": 90,
    "description": "Onion Roast prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/17-dosa-varieties/onion-roast.png"
  },
  {
    "id": "94abad0e678941eb94f01a12",
    "name": "Uthappam",
    "category": "DOSA VARIETIES",
    "price": 60,
    "description": "Uthappam prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/17-dosa-varieties/uthappam.png"
  },
  {
    "id": "5c6fef400ba6082f9f1c01a0",
    "name": "Egg Uthappam",
    "category": "DOSA VARIETIES",
    "price": 90,
    "description": "Egg Uthappam prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/17-dosa-varieties/egg-uthappam.png"
  },
  {
    "id": "6f76d2bb9d7d25571ac3900f",
    "name": "Onion Uthappam",
    "category": "DOSA VARIETIES",
    "price": 90,
    "description": "Onion Uthappam prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/17-dosa-varieties/onion-uthappam.png"
  },
  {
    "id": "b6cd9a57a57d19cd1cfd4f42",
    "name": "Podi Dosa",
    "category": "DOSA VARIETIES",
    "price": 90,
    "description": "Podi Dosa prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/17-dosa-varieties/podi-dosa.png"
  },
  {
    "id": "021cbdd3e29ff4f2fffae0cc",
    "name": "Chicken Kari Dosa",
    "category": "DOSA VARIETIES",
    "price": 140,
    "description": "Chicken Kari Dosa prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/17-dosa-varieties/chicken-kari-dosa.jpg"
  },
  {
    "id": "19f890efa553c4a8a6e39742",
    "name": "Mutton Kari Dosa",
    "category": "DOSA VARIETIES",
    "price": 180,
    "description": "Mutton Kari Dosa prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/17-dosa-varieties/mutton-kari-dosa.jpg"
  },
  {
    "id": "99e96e0c7616ce1f632fce6f",
    "name": "Beef Kari Dosa",
    "category": "DOSA VARIETIES",
    "price": 160,
    "description": "Beef Kari Dosa prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/17-dosa-varieties/beef-kari-dosa.jpg"
  },
  {
    "id": "4d0646926851126e8cb555cb",
    "name": "Kal Dosa Set",
    "category": "DOSA VARIETIES",
    "price": 50,
    "description": "Kal Dosa Set prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/17-dosa-varieties/kal-dosa-set.png"
  },
  {
    "id": "569b5161f03cd4ca031fe780",
    "name": "Parotta (1 Pc)",
    "category": "PAROTTA VARIETIES",
    "price": 15,
    "description": "Parotta (1 Pc) prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/18-parotta-varieties/parotta-1-pc.png"
  },
  {
    "id": "48976d09a1963dbbfbdb7b9d",
    "name": "Nool Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 35,
    "description": "Nool Parotta prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/18-parotta-varieties/nool-parotta.png"
  },
  {
    "id": "d0b5243281ea0fa28b389996",
    "name": "Bun Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 50,
    "description": "Bun Parotta prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/18-parotta-varieties/bun-parotta.jpg"
  },
  {
    "id": "b958c60a2fe9ce6faaf169d2",
    "name": "Chappathi (1 Pc)",
    "category": "PAROTTA VARIETIES",
    "price": 30,
    "description": "Chappathi (1 Pc) prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/18-parotta-varieties/chappathi-1-pc.png"
  },
  {
    "id": "bf7297424202508fc531eec2",
    "name": "Egg Kothu Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 130,
    "description": "Egg Kothu Parotta prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/18-parotta-varieties/egg-kothu-parotta.png"
  },
  {
    "id": "df98b3663289027b583e20cb",
    "name": "Chicken Kothu Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 160,
    "description": "Chicken Kothu Parotta prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/18-parotta-varieties/chicken-kothu-parotta.png"
  },
  {
    "id": "13305888302e35b23b3fb7f0",
    "name": "Beef Kothu Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 180,
    "description": "Beef Kothu Parotta prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/18-parotta-varieties/beef-kothu-parotta.png"
  },
  {
    "id": "5ded76f79f5377c75055df3a",
    "name": "Mutton Kothu Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 200,
    "description": "Mutton Kothu Parotta prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/18-parotta-varieties/mutton-kothu-parotta.png"
  },
  {
    "id": "fcfc7bd4b078332e5aba605c",
    "name": "Veechu Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 30,
    "description": "Veechu Parotta prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/18-parotta-varieties/veechu-parotta.jpg"
  },
  {
    "id": "0b75224c2e49ad16ab653b6c",
    "name": "Egg Veechu Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 50,
    "description": "Egg Veechu Parotta prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/18-parotta-varieties/egg-veechu-parotta.png"
  },
  {
    "id": "f520e520ce1d27afd544e205",
    "name": "Chilli Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 120,
    "description": "Chilli Parotta prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/18-parotta-varieties/chilli-parotta.png",
    "tags": [
      "Spicy"
    ]
  },
  {
    "id": "52f8d5a187586f7acea6c14c",
    "name": "Egg Lappa",
    "category": "PAROTTA VARIETIES",
    "price": 120,
    "description": "Egg Lappa prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/18-parotta-varieties/egg-lappa.jpg"
  },
  {
    "id": "3d208f51e6d831ba26f2aade",
    "name": "Chicken Lappa",
    "category": "PAROTTA VARIETIES",
    "price": 150,
    "description": "Chicken Lappa prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/18-parotta-varieties/chicken-lappa.png"
  },
  {
    "id": "52ebcc3b3284e3b52772e257",
    "name": "Mutton Lappa",
    "category": "PAROTTA VARIETIES",
    "price": 190,
    "description": "Mutton Lappa prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/18-parotta-varieties/mutton-lappa.jpg"
  },
  {
    "id": "4258cf1fab40e3f16d47d08c",
    "name": "Vaazhai Ilai Chicken Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 160,
    "description": "Vaazhai Ilai Chicken Parotta prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/18-parotta-varieties/vaazhai-ilai-chicken-parotta.jpg"
  },
  {
    "id": "634f3262c3fc3348311a715f",
    "name": "Vaazhai Ilai Beef Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 180,
    "description": "Vaazhai Ilai Beef Parotta prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/18-parotta-varieties/vaazhai-ilai-beef-parotta.jpg"
  },
  {
    "id": "d1705759a45d8f45874c7f0e",
    "name": "Vaazhai Ilai Mutton Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 200,
    "description": "Vaazhai Ilai Mutton Parotta prepared fresh with authentic ingredients.",
    "isVeg": false,
    "image": "/menu-items/18-parotta-varieties/vaazhai-ilai-mutton-parotta.jpg"
  },
  {
    "id": "5aeb50e347c059e07aad47b8",
    "name": "Nest Parotta",
    "category": "PAROTTA VARIETIES",
    "price": 160,
    "description": "Nest Parotta prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/18-parotta-varieties/nest-parotta.jpg"
  },
  {
    "id": "ee5743656d8fe0357a8fb39d",
    "name": "Lemon",
    "category": "FRESH JUICE",
    "price": 60,
    "description": "Lemon prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/19-fresh-juice/lemon.png"
  },
  {
    "id": "6de9db917dcdc32d68825012",
    "name": "Lemon Soda",
    "category": "FRESH JUICE",
    "price": 70,
    "description": "Lemon Soda prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/19-fresh-juice/lemon-soda.jpg"
  },
  {
    "id": "52cb31a9484cffeafd6028a3",
    "name": "Lemon Mint",
    "category": "FRESH JUICE",
    "price": 70,
    "description": "Lemon Mint prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/19-fresh-juice/lemon-mint.png"
  },
  {
    "id": "260430704b31b6645ad87cb4",
    "name": "Water Melon",
    "category": "FRESH JUICE",
    "price": 80,
    "description": "Water Melon prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/19-fresh-juice/water-melon.png"
  },
  {
    "id": "e044c87fcb9b9ca9d7f88d6b",
    "name": "Pine Apple",
    "category": "FRESH JUICE",
    "price": 90,
    "description": "Pine Apple prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/19-fresh-juice/pine-apple.png"
  },
  {
    "id": "08e52bcb294e5c9e14579805",
    "name": "Blue Curaçao",
    "category": "MOJITO",
    "price": 90,
    "description": "Blue Curaçao prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/20-mojito/blue-curacao.png"
  },
  {
    "id": "46706a11f73640b681f8f26b",
    "name": "Lemon Mint",
    "category": "MOJITO",
    "price": 90,
    "description": "Lemon Mint prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/20-mojito/lemon-mint.png"
  },
  {
    "id": "83843ba3bdb558de0d3fde54",
    "name": "Red Wine",
    "category": "MOJITO",
    "price": 90,
    "description": "Red Wine prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/20-mojito/red-wine.png"
  },
  {
    "id": "63f52b7dccb263fd29013aaa",
    "name": "Kiwi",
    "category": "MOJITO",
    "price": 100,
    "description": "Kiwi prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/20-mojito/kiwi.png"
  },
  {
    "id": "70d0f91fa505bbbaeade7ca6",
    "name": "Green Apple",
    "category": "MOJITO",
    "price": 110,
    "description": "Green Apple prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/20-mojito/green-apple.png"
  },
  {
    "id": "2b2f152d3b5461ce63873eb6",
    "name": "Vodka",
    "category": "MOJITO",
    "price": 120,
    "description": "Vodka prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/20-mojito/vodka.png"
  },
  {
    "id": "82c1eded017b29217671c089",
    "name": "Vanilla",
    "category": "ICE CREAMS",
    "price": 80,
    "description": "Vanilla prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/21-ice-creams/vanilla.png"
  },
  {
    "id": "8e98ea0828e3dac7aaacae53",
    "name": "Butterscotch",
    "category": "ICE CREAMS",
    "price": 100,
    "description": "Butterscotch prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/21-ice-creams/butterscotch.png"
  },
  {
    "id": "4acebaaf97bcefb108a4029b",
    "name": "Strawberry",
    "category": "ICE CREAMS",
    "price": 100,
    "description": "Strawberry prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/21-ice-creams/strawberry.png"
  },
  {
    "id": "182e5eced859bedc745d6cd7",
    "name": "Chocolate",
    "category": "ICE CREAMS",
    "price": 100,
    "description": "Chocolate prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/21-ice-creams/chocolate.png"
  },
  {
    "id": "1bf219317ffa41f1a2463bfe",
    "name": "Mango",
    "category": "ICE CREAMS",
    "price": 120,
    "description": "Mango prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/21-ice-creams/mango.png"
  },
  {
    "id": "14fb9e67e26f1beba76bcfc8",
    "name": "Black Current",
    "category": "ICE CREAMS",
    "price": 120,
    "description": "Black Current prepared fresh with authentic ingredients.",
    "isVeg": true,
    "image": "/menu-items/21-ice-creams/black-current.png"
  }
];
