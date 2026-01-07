const products = [
  {
    productId: 1,
    title: "Wireless Headphones",
    price: 3299,
    discountPrice: 2799,
    rating: 4.5,
    description: "High-quality wireless headphones with noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    quantity: 1
  },
  {
    productId: 2,
    title: "Smart Watch",
    price: 4999,
    discountPrice: 4399,
    rating: 4.3,
    description: "Fitness tracking smartwatch with heart rate monitor.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Electronics",
    quantity: 1
  },
  {
    productId: 3,
    title: "Gaming Mouse",
    price: 1799,
    discountPrice: 1399,
    rating: 4.6,
    description: "Ergonomic RGB gaming mouse with programmable buttons.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    category: "Gaming",
    quantity: 1
  },
  {
    productId: 4,
    title: "Leather Wallet",
    price: 999,
    discountPrice: 749,
    rating: 4.1,
    description: "Classic men's leather wallet with multiple compartments.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    category: "Fashion",
    quantity: 1
  },
  {
    productId: 5,
    title: "Bluetooth Speaker",
    price: 2599,
    discountPrice: 1999,
    rating: 4.4,
    description: "Portable Bluetooth speaker with deep bass and stereo sound.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "Electronics",
    quantity: 1
  },
  {
    productId: 6,
    title: "Running Shoes",
    price: 3299,
    discountPrice: 2899,
    rating: 4.2,
    description: "Lightweight running shoes with breathable mesh fabric.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Sportswear",
    quantity: 1
  },
  {
    productId: 7,
    title: "Backpack",
    price: 1799,
    discountPrice: 1499,
    rating: 4.7,
    description: "Durable and waterproof backpack for travel and school.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    category: "Accessories",
    quantity: 1
  },
  {
    productId: 8,
    title: "Sunglasses",
    price: 1199,
    discountPrice: 899,
    rating: 4.3,
    description: "Stylish UV protection sunglasses for men and women.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
    category: "Fashion",
    quantity: 1
  },
  {
    productId: 9,
    title: "Laptop Stand",
    price: 1899,
    discountPrice: 1499,
    rating: 4.5,
    description: "Adjustable laptop stand for better posture and cooling.",
    image: "https://symplify.in/cdn/shop/products/Wooden-Laptop-Stand-Opt3-3_1024x1024.jpg?v=1658253933",
    category: "Office",
    quantity: 1
  },
  {
    productId: 10,
    title: "Desk Lamp",
    price: 1399,
    discountPrice: 1099,
    rating: 4.2,
    description: "LED desk lamp with adjustable brightness and USB charging.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQfvJvwHKxCIUWydFXNe2sEE31sgvAyC4kuQ&s",
    category: "Home",
    quantity: 1
  },
  {
    productId: 11,
    title: "Yoga Mat",
    price: 1299,
    discountPrice: 999,
    rating: 4.6,
    description: "Eco-friendly yoga mat with non-slip surface.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    category: "Fitness",
    quantity: 1
  },
  {
    productId: 12,
    title: "Water Bottle",
    price: 699,
    discountPrice: 499,
    rating: 4.3,
    description: "Insulated stainless steel water bottle, keeps drinks cold.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    category: "Fitness",
    quantity: 1
  },
  {
    productId: 13,
    title: "T-shirt",
    price: 799,
    discountPrice: 599,
    rating: 4.0,
    description: "100% cotton T-shirt available in multiple colors.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Fashion",
    quantity: 1
  },
  {
    productId: 14,
    title: "Mechanical Keyboard",
    price: 4599,
    discountPrice: 4099,
    rating: 4.8,
    description: "RGB mechanical keyboard with blue switches.",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a",
    category: "Gaming",
    quantity: 1
  },
  {
    productId: 15,
    title: "Cooking Pan Set",
    price: 3199,
    discountPrice: 2599,
    rating: 4.5,
    description: "Non-stick cooking pan set with heat-resistant handles.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
    category: "Home",
    quantity: 1
  },
  {
    productId: 16,
    title: "Smartphone Tripod",
    price: 1499,
    discountPrice: 1199,
    rating: 4.3,
    description: "Adjustable tripod stand for smartphones and cameras.",
    image: "https://m.media-amazon.com/images/I/71aHt8-6o2L.jpg",
    category: "Photography",
    quantity: 1
  },
  {
    productId: 17,
    title: "Bolt Power Bank",
    price: 1899,
    discountPrice: 1599,
    rating: 4.4,
    description: "10000mAh fast-charging power bank with dual USB output.",
    image: "https://www.neopackonline.com/cdn/shop/files/NPB10KBK_1_98285f15-aa49-41f1-a4ab-c259c557ecee.jpg?v=1733230528",
    category: "Electronics",
    quantity: 1
  },
  {
    productId: 18,
    title: "E-book Reader",
    price: 8299,
    discountPrice: 7499,
    rating: 4.7,
    description: "6-inch e-book reader with glare-free screen and WiFi.",
    image: "https://m.media-amazon.com/images/I/61VP9Rfv9TL.jpg",
    category: "Electronics",
    quantity: 1
  },
  {
    productId: 19,
    title: "Fitness Tracker",
    price: 2999,
    discountPrice: 2499,
    rating: 4.5,
    description: "Fitness tracker with sleep monitor and step counter.",
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288",
    category: "Fitness",
    quantity: 1
  },
  {
    productId: 20,
    title: "Portable Charger",
    price: 1499,
    discountPrice: 1199,
    rating: 4.6,
    description: "Slim and lightweight portable charger with fast output.",
    image: "https://m.media-amazon.com/images/I/51HQrceZonL.jpg",
    category: "Electronics",
    quantity: 1
  }
];

export default products;
