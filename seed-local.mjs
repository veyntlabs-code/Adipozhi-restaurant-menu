import bcrypt from "bcryptjs";
import fs from "fs";
import crypto from "crypto";

const generateId = () => crypto.randomBytes(12).toString("hex");

const categories = [
  "SOUPS",
  "EGG SPECIAL",
  "VEG STARTERS",
  "NON-VEG STARTERS — CHICKEN",
  "NON-VEG STARTERS — MUTTON",
  "NON-VEG STARTERS — BEEF",
  "NON-VEG STARTERS — SEAFOODS",
  "ARABIAN STARTERS",
  "ARABIAN SPICY'S",
  "PULAOS",
  "BIRIYANI'S",
  "FAMILY PACK — ONLY PARCEL",
  "CHETTINADU MASALAS",
  "INDIAN GRAVY & MASALA",
  "CHINESE RICE / NOODLES",
  "INDIAN BREADS",
  "DOSA VARIETIES",
  "PAROTTA VARIETIES",
  "FRESH JUICE",
  "MOJITO",
  "ICE CREAMS",
];

const categoryDefaultImages = {
  "EGG SPECIAL": "/cat_egg_special.jpg",
  "VEG STARTERS": "/cat_veg_starters.jpg",
  "NON-VEG STARTERS — CHICKEN": "/cat_chicken_starters.jpg",
  "NON-VEG STARTERS — MUTTON": "/cat_mutton_starters.jpg",
  "NON-VEG STARTERS — BEEF": "/cat_beef_starters.jpg",
  "NON-VEG STARTERS — SEAFOODS": "/cat_seafood_starters.jpg",
  "ARABIAN STARTERS": "/cat_arabian_starters.jpg",
  "ARABIAN SPICY'S": "/cat_arabian_spicys.jpg",
  "PULAOS": "/cat_pulaos.jpg",
  "BIRIYANI'S": "/cat_biriyanis.jpg",
  "FAMILY PACK — ONLY PARCEL": "/cat_family_pack.jpg",
  "CHETTINADU MASALAS": "/cat_chettinadu_masalas.jpg",
  "INDIAN GRAVY & MASALA": "/cat_indian_gravy.jpg",
  "SOUPS": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
  "CHINESE RICE / NOODLES": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
  "INDIAN BREADS": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80",
  "DOSA VARIETIES": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80",
  "PAROTTA VARIETIES": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&q=80",
  "FRESH JUICE": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
  "MOJITO": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
  "ICE CREAMS": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&q=80",
};

const menuData = [
  // 1. SOUPS
  { cat: "SOUPS", name: "Veg Clear Soup", price: 60, type: "VEG", image: "/gen_vegclearsoup.jpg" },
  { cat: "SOUPS", name: "Hot & Sour Veg Soup", price: 80, type: "VEG" },
  { cat: "SOUPS", name: "Sweet Corn Veg Soup", price: 80, type: "VEG" },
  { cat: "SOUPS", name: "Hot & Sour Chicken Soup", price: 100, type: "NON_VEG" },
  { cat: "SOUPS", name: "Sweet Corn Chicken Soup", price: 100, type: "NON_VEG" },
  { cat: "SOUPS", name: "Chicken Manchow Soup", price: 140, type: "NON_VEG" },

  // 2. EGG SPECIAL
  { cat: "EGG SPECIAL", name: "Boiled Egg", price: 15, type: "EGG" },
  { cat: "EGG SPECIAL", name: "Omelette", price: 25, type: "EGG" },
  { cat: "EGG SPECIAL", name: "Podi Mass", price: 50, type: "EGG" },
  { cat: "EGG SPECIAL", name: "Kalakki", price: 20, type: "EGG" },
  { cat: "EGG SPECIAL", name: "Egg Mass", price: 50, type: "EGG" },
  { cat: "EGG SPECIAL", name: "Half Boil", price: 20, type: "EGG" },
  { cat: "EGG SPECIAL", name: "Full Boil", price: 20, type: "EGG" },

  // 3. VEG STARTERS
  { cat: "VEG STARTERS", name: "Gobi 65", price: 130, type: "VEG" },
  { cat: "VEG STARTERS", name: "Mushroom 65", price: 140, type: "VEG" },
  { cat: "VEG STARTERS", name: "Paneer 65", price: 170, type: "VEG" },
  { cat: "VEG STARTERS", name: "Gobi Pepper Fry", price: 160, type: "VEG" },
  { cat: "VEG STARTERS", name: "Gobi Manjurian Dry", price: 160, type: "VEG", image: "/gen_gobimanjurian.jpg" },
  { cat: "VEG STARTERS", name: "Mushroom Pepper Fry", price: 170, type: "VEG" },
  { cat: "VEG STARTERS", name: "French Fries", price: 80, type: "VEG" },

  // 4. NON-VEG STARTERS — CHICKEN
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Chicken 65 B", price: 150, type: "NON_VEG", image: "/gen_chicken65.jpg", featured: true },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Chicken 65 B.L", price: 190, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Kaadai 65", price: 160, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Chicken Lollipop", price: 200, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Chicken Chukka", price: 170, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Kaadai Chukka", price: 185, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Nattukozhi Chukka", price: 210, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Chilly Chicken Dry", price: 230, type: "NON_VEG", spicy: true },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Chicken Manjurian Dry", price: 230, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Garlic Chicken Dry", price: 240, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Ginger Chicken Dry", price: 240, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Dragon Chicken", price: 250, type: "NON_VEG", spicy: true },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Lemon Chicken", price: 250, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — CHICKEN", name: "Honey Chicken", price: 260, type: "NON_VEG" },

  // 5. NON-VEG STARTERS — MUTTON
  { cat: "NON-VEG STARTERS — MUTTON", name: "Mutton Chukka", price: 290, type: "NON_VEG", featured: true },
  { cat: "NON-VEG STARTERS — MUTTON", name: "Mutton Varutha Kari", price: 290, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — MUTTON", name: "Mutton Kola Urundai (2 Pcs)", price: 80, type: "NON_VEG" },

  // 6. NON-VEG STARTERS — BEEF
  { cat: "NON-VEG STARTERS — BEEF", name: "Beef Chukka", price: 220, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — BEEF", name: "Beef Tawa Fry", price: 210, type: "NON_VEG" },

  // 7. NON-VEG STARTERS — SEAFOODS
  { cat: "NON-VEG STARTERS — SEAFOODS", name: "Crispy Prawn", price: 250, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — SEAFOODS", name: "Prawn Pepper Fry", price: 260, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — SEAFOODS", name: "Fish Finger", price: 210, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — SEAFOODS", name: "Crab Lollipop", price: 230, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — SEAFOODS", name: "Nethili Fish Fry", price: 160, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — SEAFOODS", name: "Kulambu Meen", price: 150, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — SEAFOODS", name: "Fish Tawa Fry", price: 180, type: "NON_VEG" },
  { cat: "NON-VEG STARTERS — SEAFOODS", name: "Fish Fry", price: 160, type: "NON_VEG" },

  // 8. ARABIAN STARTERS
  { cat: "ARABIAN STARTERS", name: "Grill Q", price: 140, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "Grill H", price: 250, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "Grill F", price: 480, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "Grill Pepper H", price: 280, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "Grill Pepper F", price: 540, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "Al-Faham H", price: 260, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "Al-Faham F", price: 500, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "Peri Peri Al-Faham H", price: 280, type: "NON_VEG", spicy: true },
  { cat: "ARABIAN STARTERS", name: "Peri Peri Al-Faham F", price: 540, type: "NON_VEG", spicy: true },
  { cat: "ARABIAN STARTERS", name: "Tandoori Q", price: 140, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "Tandoori H", price: 250, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "Tandoori F", price: 480, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "BBQ Q", price: 160, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "BBQ H", price: 280, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "BBQ F", price: 530, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "BBQ Pepper Q", price: 180, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "BBQ Pepper H", price: 300, type: "NON_VEG" },
  { cat: "ARABIAN STARTERS", name: "BBQ Pepper F", price: 550, type: "NON_VEG" },

  // 9. ARABIAN SPICY'S
  { cat: "ARABIAN SPICY'S", name: "Paneer Tikka", price: 240, type: "VEG" },
  { cat: "ARABIAN SPICY'S", name: "Chicken Tikka", price: 220, type: "NON_VEG", image: "/gen_chickentikka.jpg" },
  { cat: "ARABIAN SPICY'S", name: "Hariyali Kabab", price: 260, type: "NON_VEG" },
  { cat: "ARABIAN SPICY'S", name: "Kalimirich Tikka", price: 260, type: "NON_VEG" },
  { cat: "ARABIAN SPICY'S", name: "Reshmi Kabab", price: 270, type: "NON_VEG" },
  { cat: "ARABIAN SPICY'S", name: "Tangri Kabab", price: 270, type: "NON_VEG" },
  { cat: "ARABIAN SPICY'S", name: "Malai Chicken Tikka", price: 270, type: "NON_VEG" },
  { cat: "ARABIAN SPICY'S", name: "Acharya Chicken Tikka", price: 270, type: "NON_VEG", spicy: true },

  // 10. PULAOS
  { cat: "PULAOS", name: "Veg Pulao", price: 160, type: "VEG" },
  { cat: "PULAOS", name: "Mushroom Pulao", price: 200, type: "VEG" },
  { cat: "PULAOS", name: "Chicken Pulao", price: 220, type: "NON_VEG" },
  { cat: "PULAOS", name: "Mutton Pulao", price: 260, type: "NON_VEG" },

  // 11. BIRIYANI'S
  { cat: "BIRIYANI'S", name: "Egg Biriyani", price: 160, type: "EGG" },
  { cat: "BIRIYANI'S", name: "Chicken Dum Briyani", price: 200, type: "NON_VEG", featured: true, image: "/gen_biryani.jpg" },
  { cat: "BIRIYANI'S", name: "Naatukozhi Briyani", price: 250, type: "NON_VEG" },
  { cat: "BIRIYANI'S", name: "Kaadai Briyani", price: 250, type: "NON_VEG" },
  { cat: "BIRIYANI'S", name: "Chicken 65 Briyani", price: 230, type: "NON_VEG" },
  { cat: "BIRIYANI'S", name: "Beef Biriyani", price: 240, type: "NON_VEG" },
  { cat: "BIRIYANI'S", name: "Mutton Dum Briyani", price: 290, type: "NON_VEG", featured: true },
  { cat: "BIRIYANI'S", name: "Plain Briyani", price: 130, type: "VEG" },

  // 12. FAMILY PACK — ONLY PARCEL
  { cat: "FAMILY PACK — ONLY PARCEL", name: "Half Bucket Chicken Briyani (1/4 KG 65 Free)", price: 1100, type: "NON_VEG" },
  { cat: "FAMILY PACK — ONLY PARCEL", name: "Full Bucket Chicken Briyani (1/2 KG 65 Free)", price: 2200, type: "NON_VEG" },
  { cat: "FAMILY PACK — ONLY PARCEL", name: "Half Bucket Beef Briyani", price: 1300, type: "NON_VEG" },
  { cat: "FAMILY PACK — ONLY PARCEL", name: "Full Bucket Beef Briyani", price: 2600, type: "NON_VEG" },
  { cat: "FAMILY PACK — ONLY PARCEL", name: "Half Bucket Mutton Briyani", price: 1600, type: "NON_VEG" },
  { cat: "FAMILY PACK — ONLY PARCEL", name: "Full Bucket Mutton Briyani", price: 3200, type: "NON_VEG" },

  // 13. CHETTINADU MASALAS
  { cat: "CHETTINADU MASALAS", name: "Chicken Chettinadu Masala", price: 220, type: "NON_VEG", spicy: true, image: "/gen_chickenchettinadu.jpg" },
  { cat: "CHETTINADU MASALAS", name: "Mutton Chettinadu Masala", price: 290, type: "NON_VEG", spicy: true },
  { cat: "CHETTINADU MASALAS", name: "Chicken Pepper Masala", price: 240, type: "NON_VEG", spicy: true },
  { cat: "CHETTINADU MASALAS", name: "Naatukozhi Masala", price: 270, type: "NON_VEG" },
  { cat: "CHETTINADU MASALAS", name: "Kaadai Masala", price: 230, type: "NON_VEG" },
  { cat: "CHETTINADU MASALAS", name: "Prawn Masala", price: 270, type: "NON_VEG", image: "/gen_prawnmasala.jpg" },
  { cat: "CHETTINADU MASALAS", name: "Beef Chettinadu Masala", price: 250, type: "NON_VEG", spicy: true },

  // 14. INDIAN GRAVY & MASALA
  { cat: "INDIAN GRAVY & MASALA", name: "Gobi Manjurian Gravy", price: 170, type: "VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Mushroom Manjurian Gravy", price: 180, type: "VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Paneer Manjurian Gravy", price: 210, type: "VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Gobi Masala", price: 190, type: "VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Paneer Kadai Masala", price: 250, type: "VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Mushroom Kadai Masala", price: 230, type: "VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Mixed Veg Curry", price: 250, type: "VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Paneer Butter Masala", price: 220, type: "VEG", featured: true, image: "/gen_paneerbutter.jpg" },
  { cat: "INDIAN GRAVY & MASALA", name: "Chilly Chicken Gravy", price: 240, type: "NON_VEG", spicy: true, image: "/gen_chillychicken.jpg" },
  { cat: "INDIAN GRAVY & MASALA", name: "Chicken Manjurian Gravy", price: 240, type: "NON_VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Garlic Chicken Gravy", price: 250, type: "NON_VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Ginger Chicken Gravy", price: 250, type: "NON_VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Prawn Manjurian Gravy", price: 260, type: "NON_VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Butter Chicken Masala", price: 270, type: "NON_VEG", featured: true },
  { cat: "INDIAN GRAVY & MASALA", name: "Chicken Tikka Masala", price: 260, type: "NON_VEG", image: "/gen_chickentikka.jpg" },
  { cat: "INDIAN GRAVY & MASALA", name: "Kadai Chicken Masala", price: 230, type: "NON_VEG" },
  { cat: "INDIAN GRAVY & MASALA", name: "Murugai Chicken Masala", price: 270, type: "NON_VEG" },

  // 15. CHINESE RICE / NOODLES
  { cat: "CHINESE RICE / NOODLES", name: "Veg Rice / Noodles", price: 150, type: "VEG" },
  { cat: "CHINESE RICE / NOODLES", name: "Paneer Rice / Noodles", price: 180, type: "VEG" },
  { cat: "CHINESE RICE / NOODLES", name: "Mushroom Rice / Noodles", price: 170, type: "VEG" },
  { cat: "CHINESE RICE / NOODLES", name: "Egg Rice / Noodles", price: 160, type: "EGG" },
  { cat: "CHINESE RICE / NOODLES", name: "Chicken Rice / Noodles", price: 180, type: "NON_VEG" },
  { cat: "CHINESE RICE / NOODLES", name: "Beef Rice / Noodles", price: 200, type: "NON_VEG" },
  { cat: "CHINESE RICE / NOODLES", name: "Mixed Rice / Noodles", price: 230, type: "NON_VEG" },
  { cat: "CHINESE RICE / NOODLES", name: "Schezwan Chicken Rice / Noodles", price: 195, type: "NON_VEG", spicy: true },
  { cat: "CHINESE RICE / NOODLES", name: "Schezwan Mixed Rice / Noodles", price: 235, type: "NON_VEG", spicy: true },
  { cat: "CHINESE RICE / NOODLES", name: "Jeera Rice", price: 170, type: "VEG" },

  // 16. INDIAN BREADS
  { cat: "INDIAN BREADS", name: "Naan", price: 50, type: "VEG", image: "/gen_naan.jpg" },
  { cat: "INDIAN BREADS", name: "Butter Naan", price: 60, type: "VEG", image: "/gen_naan.jpg" },
  { cat: "INDIAN BREADS", name: "Garlic Naan", price: 70, type: "VEG", image: "/gen_naan.jpg" },
  { cat: "INDIAN BREADS", name: "Mint Naan", price: 70, type: "VEG", image: "/gen_naan.jpg" },
  { cat: "INDIAN BREADS", name: "Rotti", price: 60, type: "VEG" },
  { cat: "INDIAN BREADS", name: "Butter Rotti", price: 70, type: "VEG" },
  { cat: "INDIAN BREADS", name: "Methi Rotti", price: 80, type: "VEG" },
  { cat: "INDIAN BREADS", name: "Pulkka (2 Pcs)", price: 50, type: "VEG" },
  { cat: "INDIAN BREADS", name: "Kulcha", price: 70, type: "VEG" },
  { cat: "INDIAN BREADS", name: "Butter Kulcha", price: 80, type: "VEG" },
  { cat: "INDIAN BREADS", name: "Tandoori Parotta", price: 60, type: "VEG" },
  { cat: "INDIAN BREADS", name: "Stuffed Chicken Naan", price: 130, type: "NON_VEG" },
  { cat: "INDIAN BREADS", name: "Stuffed Mutton Naan", price: 150, type: "NON_VEG" },

  // 17. DOSA VARIETIES
  { cat: "DOSA VARIETIES", name: "Roast", price: 70, type: "VEG", image: "/gen_dosa.jpg" },
  { cat: "DOSA VARIETIES", name: "Egg Dosa", price: 90, type: "EGG" },
  { cat: "DOSA VARIETIES", name: "Ghee Roast", price: 90, type: "VEG", image: "/gen_dosa.jpg" },
  { cat: "DOSA VARIETIES", name: "Onion Roast", price: 90, type: "VEG" },
  { cat: "DOSA VARIETIES", name: "Uthappam", price: 60, type: "VEG" },
  { cat: "DOSA VARIETIES", name: "Egg Uthappam", price: 90, type: "EGG" },
  { cat: "DOSA VARIETIES", name: "Onion Uthappam", price: 90, type: "VEG" },
  { cat: "DOSA VARIETIES", name: "Podi Dosa", price: 90, type: "VEG" },
  { cat: "DOSA VARIETIES", name: "Chicken Kari Dosa", price: 140, type: "NON_VEG" },
  { cat: "DOSA VARIETIES", name: "Mutton Kari Dosa", price: 180, type: "NON_VEG", image: "/gen_muttonkaridosa.jpg" },
  { cat: "DOSA VARIETIES", name: "Beef Kari Dosa", price: 160, type: "NON_VEG" },
  { cat: "DOSA VARIETIES", name: "Kal Dosa Set", price: 50, type: "VEG" },

  // 18. PAROTTA VARIETIES
  { cat: "PAROTTA VARIETIES", name: "Parotta (1 Pc)", price: 15, type: "VEG", image: "/gen_parotta.jpg" },
  { cat: "PAROTTA VARIETIES", name: "Nool Parotta", price: 35, type: "VEG" },
  { cat: "PAROTTA VARIETIES", name: "Bun Parotta", price: 50, type: "VEG" },
  { cat: "PAROTTA VARIETIES", name: "Chappathi (1 Pc)", price: 30, type: "VEG" },
  { cat: "PAROTTA VARIETIES", name: "Egg Kothu Parotta", price: 130, type: "EGG", image: "/gen_kothuparotta.jpg" },
  { cat: "PAROTTA VARIETIES", name: "Chicken Kothu Parotta", price: 160, type: "NON_VEG", image: "/gen_kothuparotta.jpg" },
  { cat: "PAROTTA VARIETIES", name: "Beef Kothu Parotta", price: 180, type: "NON_VEG", image: "/gen_kothuparotta.jpg" },
  { cat: "PAROTTA VARIETIES", name: "Mutton Kothu Parotta", price: 200, type: "NON_VEG", image: "/gen_kothuparotta.jpg" },
  { cat: "PAROTTA VARIETIES", name: "Veechu Parotta", price: 30, type: "VEG" },
  { cat: "PAROTTA VARIETIES", name: "Egg Veechu Parotta", price: 50, type: "EGG" },
  { cat: "PAROTTA VARIETIES", name: "Chilli Parotta", price: 120, type: "VEG", spicy: true },
  { cat: "PAROTTA VARIETIES", name: "Egg Lappa", price: 120, type: "EGG" },
  { cat: "PAROTTA VARIETIES", name: "Chicken Lappa", price: 150, type: "NON_VEG" },
  { cat: "PAROTTA VARIETIES", name: "Mutton Lappa", price: 190, type: "NON_VEG" },
  { cat: "PAROTTA VARIETIES", name: "Vaazhai Ilai Chicken Parotta", price: 160, type: "NON_VEG" },
  { cat: "PAROTTA VARIETIES", name: "Vaazhai Ilai Beef Parotta", price: 180, type: "NON_VEG" },
  { cat: "PAROTTA VARIETIES", name: "Vaazhai Ilai Mutton Parotta", price: 200, type: "NON_VEG" },
  { cat: "PAROTTA VARIETIES", name: "Nest Parotta", price: 160, type: "VEG" },

  // 19. FRESH JUICE
  { cat: "FRESH JUICE", name: "Lemon", price: 60, type: "VEG" },
  { cat: "FRESH JUICE", name: "Lemon Soda", price: 70, type: "VEG" },
  { cat: "FRESH JUICE", name: "Lemon Mint", price: 70, type: "VEG", image: "/gen_lemonmint.jpg" },
  { cat: "FRESH JUICE", name: "Water Melon", price: 80, type: "VEG", image: "/gen_watermelon.jpg" },
  { cat: "FRESH JUICE", name: "Pine Apple", price: 90, type: "VEG" },

  // 20. MOJITO
  { cat: "MOJITO", name: "Blue Curaçao", price: 90, type: "VEG", image: "/gen_mojito.jpg" },
  { cat: "MOJITO", name: "Lemon Mint", price: 90, type: "VEG", image: "/gen_lemonmint.jpg" },
  { cat: "MOJITO", name: "Red Wine", price: 90, type: "VEG" },
  { cat: "MOJITO", name: "Kiwi", price: 100, type: "VEG" },
  { cat: "MOJITO", name: "Green Apple", price: 110, type: "VEG" },
  { cat: "MOJITO", name: "Vodka", price: 120, type: "VEG" },

  // 21. ICE CREAMS
  { cat: "ICE CREAMS", name: "Vanilla", price: 80, type: "VEG" },
  { cat: "ICE CREAMS", name: "Butterscotch", price: 100, type: "VEG" },
  { cat: "ICE CREAMS", name: "Strawberry", price: 100, type: "VEG" },
  { cat: "ICE CREAMS", name: "Chocolate", price: 100, type: "VEG" },
  { cat: "ICE CREAMS", name: "Mango", price: 120, type: "VEG" },
  { cat: "ICE CREAMS", name: "Black Current", price: 120, type: "VEG" }
];

async function seed() {
  try {
    const data = {
      restaurants: [],
      adminusers: [],
      categories: [],
      menuitems: []
    };

    const restaurantId = generateId();
    data.restaurants.push({
      _id: restaurantId,
      name: "Adipozhi Restaurant",
      slug: "adipozhi",
      description: "Authentic cuisine with rich flavors and traditional recipes passed down through generations.",
      phone: "+91 98765 43210",
      address: "123 Food Street, Cuisine Quarter",
      currency: "₹",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const passwordHash = await bcrypt.hash("Admin@123", 12);
    
    data.adminusers.push({
      _id: generateId(),
      name: "Restaurant Admin",
      email: "admin@royalrestaurant.com",
      passwordHash,
      restaurantId,
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    data.adminusers.push({
      _id: generateId(),
      name: "Adipozhi Admin",
      email: "admin@adipozhi.com",
      passwordHash,
      restaurantId,
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const catMap = {};
    let catOrder = 1;
    for (const cName of categories) {
      const id = generateId();
      data.categories.push({
        _id: id,
        restaurantId,
        name: cName,
        displayOrder: catOrder++,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      catMap[cName] = id;
    }

    let itemOrder = 1;
    for (const item of menuData) {
      const fallbackImg = categoryDefaultImages[item.cat] || null;
      const img = item.image || fallbackImg;

      data.menuitems.push({
        _id: generateId(),
        restaurantId,
        categoryId: catMap[item.cat],
        name: item.name,
        description: `${item.name} prepared fresh with authentic ingredients.`,
        price: item.price,
        foodType: item.type,
        isSpicy: item.spicy || false,
        isFeatured: item.featured || false,
        image: img,
        isAvailable: true,
        displayOrder: itemOrder++,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2), "utf8");
    console.log("Local database 'data.json' seeded successfully!");
  } catch (err) {
    console.error("Seed error:", err);
  }
}

seed();
