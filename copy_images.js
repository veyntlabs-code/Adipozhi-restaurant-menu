const fs=require('fs');
const path=require('path');
if(!fs.existsSync('public/categories'))fs.mkdirSync('public/categories');
const srcDir='C:/Users/jaiwi/.gemini/antigravity-ide/brain/179bccfd-b92d-4d15-aeb2-8402bf4d726f';
const files=fs.readdirSync(srcDir);
const map={
  'cat_soups':'SOUPS',
  'cat_egg':'EGG SPECIAL',
  'cat_veg_start':'VEG STARTERS',
  'cat_chicken_start':'NON-VEG STARTERS — CHICKEN',
  'cat_mutton_start':'NON-VEG STARTERS — MUTTON',
  'cat_beef_start':'NON-VEG STARTERS — BEEF',
  'cat_seafood_start':'NON-VEG STARTERS — SEAFOODS',
  'cat_arabian_start':'ARABIAN STARTERS',
  'cat_arabian_spicy':'ARABIAN SPICY\'S',
  'cat_pulao':'PULAOS',
  'cat_biriyani':'BIRIYANI\'S'
};
let data=JSON.parse(fs.readFileSync('data.json'));
files.forEach(f=>{
  for(let k in map){
    if(f.startsWith(k) && f.endsWith('.jpg')){
      fs.copyFileSync(path.join(srcDir,f),'public/categories/'+k+'.jpg');
      const cat=data.categories.find(c=>c.name===map[k]);
      if(cat)cat.image='/categories/'+k+'.jpg';
    }
  }
});
fs.writeFileSync('data.json',JSON.stringify(data,null,2));
