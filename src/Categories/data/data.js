
const products = [
  // Electronics Category
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    discountPrice: 1099,
    rating: 4.8,
    description: "The most advanced iPhone yet with titanium design, A17 Pro chip, and professional camera system.",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    discountPrice: 1199,
    rating: 4.7,
    description: "Premium Android smartphone with S Pen, 200MP camera, and AI-powered features.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 3,
    name: "MacBook Pro 16-inch",
    price: 2499,
    discountPrice: 2299,
    rating: 4.9,
    description: "Powerful laptop with M3 Pro chip, stunning Liquid Retina XDR display, and all-day battery life.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Headphones",
    price: 399,
    discountPrice: 349,
    rating: 4.6,
    description: "Industry-leading noise canceling wireless headphones with exceptional sound quality.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 5,
    name: "iPad Pro 12.9-inch",
    price: 1099,
    discountPrice: 999,
    rating: 4.8,
    description: "Most advanced iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 6,
    name: "Dell XPS 13 Laptop",
    price: 1199,
    discountPrice: 1099,
    rating: 4.5,
    description: "Ultra-thin laptop with 13th Gen Intel Core processor and stunning InfinityEdge display.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 7,
    name: "Apple Watch Series 9",
    price: 399,
    discountPrice: 369,
    rating: 4.7,
    description: "Advanced smartwatch with health monitoring, GPS, and cellular connectivity.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQohdaiXAqJ00ZHF7fNSr0or8w-zoMpnCFhcg&s",
    category: "electronics"
  },
  {
    id: 8,
    name: "Nintendo Switch OLED",
    price: 349,
    discountPrice: 319,
    rating: 4.6,
    description: "Hybrid gaming console with vibrant OLED screen and versatile play modes.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR97lhNnOqUx8OCGFfuJOkXvubSuNbkAkJH6w&s",
    category: "electronics"
  },
  {
    id: 9,
    name: "Samsung 65-inch 4K TV",
    price: 899,
    discountPrice: 799,
    rating: 4.4,
    description: "Crystal UHD 4K Smart TV with HDR and built-in streaming apps.",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 10,
    name: "Canon EOS R5 Camera",
    price: 3899,
    discountPrice: 3699,
    rating: 4.8,
    description: "Professional mirrorless camera with 45MP sensor and 8K video recording.",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 11,
    name: "AirPods Pro 2nd Gen",
    price: 249,
    discountPrice: 229,
    rating: 4.7,
    description: "Active noise cancelling earbuds with adaptive transparency and spatial audio.",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 12,
    name: "Google Pixel 8 Pro",
    price: 999,
    discountPrice: 899,
    rating: 4.5,
    description: "AI-powered Android phone with advanced camera features and pure Google experience.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 13,
    name: "PlayStation 5",
    price: 499,
    discountPrice: 479,
    rating: 4.8,
    description: "Next-generation gaming console with ultra-fast SSD and ray tracing support.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 14,
    name: "Microsoft Surface Pro 9",
    price: 999,
    discountPrice: 899,
    rating: 4.4,
    description: "2-in-1 laptop tablet with Intel Core processor and versatile design.",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 15,
    name: "JBL Charge 5 Speaker",
    price: 179,
    discountPrice: 159,
    rating: 4.6,
    description: "Portable Bluetooth speaker with powerful sound and 20-hour battery life.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 16,
    name: "Kindle Paperwhite",
    price: 139,
    discountPrice: 119,
    rating: 4.5,
    description: "Waterproof e-reader with glare-free display and weeks of battery life.",
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 17,
    name: "GoPro Hero 12",
    price: 399,
    discountPrice: 369,
    rating: 4.7,
    description: "Action camera with 5.3K video, enhanced stabilization, and rugged design.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop",
    category: "electronics"
  },

  // Clothing Category
  {
    id: 18,
    name: "Classic Denim Jacket",
    price: 89,
    discountPrice: 69,
    rating: 4.4,
    description: "Timeless denim jacket with vintage wash and comfortable fit.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 19,
    name: "Leather Biker Jacket",
    price: 299,
    discountPrice: 249,
    rating: 4.6,
    description: "Premium genuine leather jacket with asymmetrical zipper and quilted details.",
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 20,
    name: "Cotton White T-Shirt",
    price: 25,
    discountPrice: 19,
    rating: 4.3,
    description: "Essential white tee made from 100% organic cotton with perfect fit.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 21,
    name: "Slim Fit Black Jeans",
    price: 79,
    discountPrice: 59,
    rating: 4.5,
    description: "Modern slim-fit jeans with stretch fabric and versatile black wash.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 22,
    name: "Wool Blend Sweater",
    price: 129,
    discountPrice: 99,
    rating: 4.7,
    description: "Cozy wool blend sweater with ribbed texture and comfortable fit.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 23,
    name: "Floral Summer Dress",
    price: 89,
    discountPrice: 69,
    rating: 4.4,
    description: "Light and airy summer dress with beautiful floral print and flowing silhouette.",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 24,
    name: "Business Blazer",
    price: 199,
    discountPrice: 159,
    rating: 4.6,
    description: "Professional blazer with tailored fit and premium fabric blend.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 25,
    name: "Running Sneakers",
    price: 149,
    discountPrice: 119,
    rating: 4.5,
    description: "High-performance running shoes with advanced cushioning and breathable mesh.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 26,
    name: "Casual Hoodie",
    price: 69,
    discountPrice: 49,
    rating: 4.3,
    description: "Comfortable cotton hoodie with kangaroo pocket and relaxed fit.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 27,
    name: "Formal Dress Shirt",
    price: 79,
    discountPrice: 59,
    rating: 4.4,
    description: "Classic white dress shirt with spread collar and French cuffs.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 28,
    name: "Yoga Leggings",
    price: 59,
    discountPrice: 45,
    rating: 4.6,
    description: "High-waisted leggings with moisture-wicking fabric and four-way stretch.",
    image: "https://images.unsplash.com/photo-1506629905607-c28fdb635f8f?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 29,
    name: "Winter Coat",
    price: 259,
    discountPrice: 199,
    rating: 4.7,
    description: "Warm winter coat with down insulation and water-resistant exterior.",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 30,
    name: "Silk Scarf",
    price: 89,
    discountPrice: 69,
    rating: 4.5,
    description: "Luxurious silk scarf with elegant pattern and soft texture.",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 31,
    name: "Chino Pants",
    price: 89,
    discountPrice: 69,
    rating: 4.4,
    description: "Classic chino pants with straight leg and versatile styling options.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 32,
    name: "Polo Shirt",
    price: 49,
    discountPrice: 39,
    rating: 4.3,
    description: "Classic polo shirt with ribbed collar and comfortable cotton blend.",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 33,
    name: "Maxi Dress",
    price: 119,
    discountPrice: 89,
    rating: 4.6,
    description: "Elegant maxi dress with flowing fabric and adjustable straps.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=500&fit=crop",
    category: "clothing"
  },
  {
    id: 34,
    name: "Cardigan Sweater",
    price: 99,
    discountPrice: 79,
    rating: 4.5,
    description: "Soft cardigan sweater with button front and ribbed trim details.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    category: "clothing"
  },

  // Jewelry Category
  {
    id: 35,
    name: "Diamond Solitaire Ring",
    price: 2999,
    discountPrice: 2499,
    rating: 4.9,
    description: "Stunning 1-carat diamond solitaire ring in 14k white gold setting.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 36,
    name: "Pearl Necklace",
    price: 599,
    discountPrice: 499,
    rating: 4.7,
    description: "Classic freshwater pearl necklace with sterling silver clasp.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 37,
    name: "Gold Tennis Bracelet",
    price: 899,
    discountPrice: 749,
    rating: 4.8,
    description: "Elegant 14k gold tennis bracelet with brilliant cut diamonds.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 38,
    name: "Silver Hoop Earrings",
    price: 89,
    discountPrice: 69,
    rating: 4.5,
    description: "Sterling silver hoop earrings with polished finish and secure clasp.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 39,
    name: "Emerald Pendant",
    price: 1299,
    discountPrice: 1099,
    rating: 4.6,
    description: "Exquisite emerald pendant with diamond accents in white gold.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 40,
    name: "Rose Gold Watch",
    price: 799,
    discountPrice: 649,
    rating: 4.7,
    description: "Luxury rose gold watch with diamond markers and leather strap.",
    image: "https://images.unsplash.com/photo-1523170335258-f5c6c6bd6eaf?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 41,
    name: "Sapphire Ring",
    price: 1899,
    discountPrice: 1599,
    rating: 4.8,
    description: "Royal blue sapphire ring with halo diamond setting in platinum.",
    image: "https://images.unsplash.com/photo-1617038260628-ea1d226ebeb5?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 42,
    name: "Men's Gold Chain",
    price: 599,
    discountPrice: 499,
    rating: 4.4,
    description: "Heavy 14k gold chain necklace with secure lobster clasp.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 43,
    name: "Crystal Chandelier Earrings",
    price: 199,
    discountPrice: 149,
    rating: 4.5,
    description: "Glamorous crystal chandelier earrings perfect for special occasions.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 44,
    name: "Vintage Brooch",
    price: 299,
    discountPrice: 249,
    rating: 4.3,
    description: "Antique-style brooch with intricate filigree work and gemstone center.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 45,
    name: "Infinity Bracelet",
    price: 159,
    discountPrice: 129,
    rating: 4.6,
    description: "Delicate infinity symbol bracelet in sterling silver with adjustable chain.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 46,
    name: "Ruby Stud Earrings",
    price: 899,
    discountPrice: 749,
    rating: 4.7,
    description: "Brilliant ruby stud earrings set in 18k yellow gold with secure backs.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 47,
    name: "Charm Bracelet",
    price: 229,
    discountPrice: 189,
    rating: 4.4,
    description: "Sterling silver charm bracelet with heart, star, and flower charms.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 48,
    name: "Men's Signet Ring",
    price: 399,
    discountPrice: 329,
    rating: 4.5,
    description: "Classic men's signet ring in 14k gold with customizable engraving.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 49,
    name: "Layered Gold Necklace",
    price: 179,
    discountPrice: 149,
    rating: 4.6,
    description: "Trendy layered necklace set with multiple chain lengths and pendant styles.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 50,
    name: "Diamond Tennis Necklace",
    price: 3999,
    discountPrice: 3499,
    rating: 4.9,
    description: "Luxurious diamond tennis necklace with perfectly matched stones in platinum.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 51,
    name: "Wireless Gaming Mouse",
    price: 129,
    discountPrice: 99,
    rating: 4.5,
    description: "High-precision wireless gaming mouse with RGB lighting and programmable buttons.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    category: "electronics"
  },
  {
    id: 52,
    name: "Cocktail Ring",
    price: 449,
    discountPrice: 379,
    rating: 4.4,
    description: "Statement cocktail ring with large center stone and intricate band design.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
    category: "jewellery"
  },
  {
    id: 53,
    name: "Casual Sneakers",
    price: 99,
    discountPrice: 79,
    rating: 4.3,
    description: "Comfortable casual sneakers with memory foam insole and breathable upper.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    category: "clothing"
  }
]
export default products;