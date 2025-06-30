🛍️ VKStore – E-commerce Frontend (React + Vite)
VKStore is a full-featured e-commerce frontend built with React.js and Vite, designed for speed, responsiveness, and seamless user experience. Originally built on the MERN stack, VKStore has now been upgraded to integrate with a Java backend (Spring Boot + MySQL), giving it stronger scalability and backend capabilities.

🔄 What’s New in Version 2.0
✅ Switched backend to Spring Boot + MySQL

✅ Integrated Toast Notifications for actions like add-to-cart, signup, and error feedback

✅ Improved Cart & Wishlist logic using LocalStorage with real-time counter updates

✅ Polished UI/UX using Bootstrap and better responsive layouts

✅ Enhanced Checkout Page, quantity management, and product detail flow

🛠️ Tech Stack
Frontend

⚛️ React.js + Vite

🎨 Bootstrap 5

🔔 React Toastify

🧠 LocalStorage for cart/wishlist

🖼️ Lucide Icons

Backend (v2.0)

☕ Spring Boot

🗄️ MySQL

🌐 REST APIs

🚀 How to Run the Project
🧩 1. Clone the Repositories
bash
Copy
Edit
# Frontend
git clone https://github.com/trivikram-coder/ecommerce-frontend.git

# Backend
git clone https://github.com/trivikram-coder/ecommerce-java-server.git
💻 2. Run the Frontend (React + Vite)
bash
Copy
Edit
cd ecommerce-frontend   # or cd vkstore if you renamed the folder
npm install
npm run dev
✅ Frontend will start at: http://localhost:5173 (or your Vite configured port)

☕ 3. Run the Backend (Spring Boot + MySQL)
bash
Copy
Edit
cd ecommerce-java-server
# Ensure all dependencies are installed (via Maven)
mvn spring-boot:run
✅ Backend will run at: http://localhost:8080 (or your configured server port)

⚙️ 4. Ensure Both Are Running
Make sure the frontend is talking to the backend (adjust API URLs if needed).

Your browser should load the React app and interact with Spring Boot APIs correctly.


📷 Preview![Screenshot 2025-06-30 191124](https://github.com/user-attachments/assets/4bec6f07-c4bd-4fd2-abd0-c27b081331bc)
![Screenshot 2025-06-30 191112](https://github.com/user-attachments/assets/309dfac5-c31d-4780-ac97-25b67f46ac82)

Add screenshots or a demo GIF here to showcase the product page, cart, checkout, etc.

👨‍💻 About Me
After launching VK Store a couple of months ago with the MERN stack, I’ve now taken it a step further by integrating a Java backend using Spring Boot and MySQL.
This version helped me sharpen full-stack development skills — especially backend integration, RESTful services, and frontend logic synchronization.

📌 Next plans: Add order history, payment gateway (Razorpay/Stripe).
