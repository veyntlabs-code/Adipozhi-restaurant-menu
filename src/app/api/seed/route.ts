import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Restaurant from "@/models/Restaurant";
import AdminUser from "@/models/AdminUser";
import Category from "@/models/Category";
import MenuItem from "@/models/MenuItem";
import bcrypt from "bcryptjs";

// Only enable in development
export async function POST(_request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ success: false, error: "Seed not available in production" }, { status: 403 });
  }

  try {
    await connectDB();

    // Clear existing data
    await Restaurant.deleteMany({});
    await AdminUser.deleteMany({});
    await Category.deleteMany({});
    await MenuItem.deleteMany({});

    // Create restaurant
    const restaurant = await Restaurant.create({
      name: "Royal Restaurant",
      slug: "royal-restaurant",
      description: "Authentic Indian cuisine with rich flavors and traditional recipes passed down through generations.",
      phone: "+91 98765 43210",
      address: "123 Food Street, Cuisine Quarter, Mumbai - 400001",
      currency: "₹",
      isActive: true,
    });

    // Create admin user
    const passwordHash = await bcrypt.hash("Admin@123", 12);
    await AdminUser.create({
      name: "Restaurant Admin",
      email: "admin@royalrestaurant.com",
      passwordHash,
      restaurantId: restaurant._id,
      role: "ADMIN",
    });

    // Create categories
    const categoryNames = [
      { name: "Starters", description: "Begin your meal with our delicious appetizers", displayOrder: 1 },
      { name: "Biryani", description: "Aromatic rice dishes cooked with choice ingredients", displayOrder: 2 },
      { name: "Main Course", description: "Rich curries and gravies to satisfy your hunger", displayOrder: 3 },
      { name: "Desserts", description: "Sweet endings to a perfect meal", displayOrder: 4 },
      { name: "Beverages", description: "Refreshing drinks to complement your food", displayOrder: 5 },
    ];

    const categories = await Category.insertMany(
      categoryNames.map((c) => ({ ...c, restaurantId: restaurant._id, isActive: true }))
    );

    const [starters, biryani, mainCourse, desserts, beverages] = categories;

    // Create menu items
    await MenuItem.insertMany([
      {
        restaurantId: restaurant._id,
        categoryId: starters._id,
        name: "Chicken 65",
        description: "Crispy fried chicken marinated with traditional spices and herbs, served with mint chutney.",
        price: 180,
        foodType: "NON_VEG",
        isSpicy: true,
        isFeatured: true,
        isAvailable: true,
        displayOrder: 1,
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&h=600&fit=crop",
      },
      {
        restaurantId: restaurant._id,
        categoryId: starters._id,
        name: "Paneer Tikka",
        description: "Tender cottage cheese cubes marinated in yogurt and spices, grilled to perfection.",
        price: 160,
        foodType: "VEG",
        isSpicy: false,
        isFeatured: true,
        isAvailable: true,
        displayOrder: 2,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&h=600&fit=crop",
      },
      {
        restaurantId: restaurant._id,
        categoryId: biryani._id,
        name: "Chicken Biryani",
        description: "Aromatic basmati rice cooked with tender chicken and traditional spices in dum style.",
        price: 220,
        foodType: "NON_VEG",
        isSpicy: true,
        isFeatured: true,
        isAvailable: true,
        displayOrder: 1,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=600&fit=crop",
      },
      {
        restaurantId: restaurant._id,
        categoryId: biryani._id,
        name: "Mutton Biryani",
        description: "Premium mutton pieces slow-cooked with fragrant basmati rice and saffron.",
        price: 320,
        foodType: "NON_VEG",
        isSpicy: true,
        isFeatured: false,
        isAvailable: true,
        displayOrder: 2,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d7c8?w=800&h=600&fit=crop",
      },
      {
        restaurantId: restaurant._id,
        categoryId: mainCourse._id,
        name: "Paneer Butter Masala",
        description: "Soft paneer in rich, creamy tomato-based gravy with aromatic spices.",
        price: 200,
        foodType: "VEG",
        isSpicy: false,
        isFeatured: true,
        isAvailable: true,
        displayOrder: 1,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&h=600&fit=crop",
      },
      {
        restaurantId: restaurant._id,
        categoryId: desserts._id,
        name: "Gulab Jamun",
        description: "Soft milk-solid dumplings soaked in rose-flavored sugar syrup, served warm.",
        price: 80,
        foodType: "VEG",
        isSpicy: false,
        isFeatured: false,
        isAvailable: true,
        displayOrder: 1,
        image: "https://images.unsplash.com/photo-1666278008000-0999f2b2f16d?w=800&h=600&fit=crop",
      },
      {
        restaurantId: restaurant._id,
        categoryId: beverages._id,
        name: "Fresh Lime Soda",
        description: "Refreshing lemon juice with soda water, black salt, and your choice of sweet or salted.",
        price: 60,
        foodType: "VEG",
        isSpicy: false,
        isFeatured: false,
        isAvailable: true,
        displayOrder: 1,
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&h=600&fit=crop",
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Seed data created successfully",
      data: {
        restaurant: { name: restaurant.name, slug: restaurant.slug },
        adminCredentials: { email: "admin@royalrestaurant.com", password: "Admin@123" },
        publicUrl: `/menu/royal-restaurant`,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: "Seed failed: " + String(error) }, { status: 500 });
  }
}
