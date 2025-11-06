# Super Mall Web Application

A complete full-stack web application for managing a shopping mall with admin panel and user features. Built with HTML, CSS (Tailwind), JavaScript, and Firebase.

## 🎯 Features

### Admin Panel
- **Authentication**: Secure login/logout using Firebase Auth
- **Shop Management**: Create, read, update, and delete shops
- **Offer Management**: Manage special offers and promotions
- **Category & Floor Management**: Organize shops by categories and floors
- **Activity Logs**: View all system actions and user activities

### User Side
- **Shop Browsing**: View all available shops in the mall
- **Filtering**: Filter shops by category or floor
- **Product Comparison**: Compare products by cost and features
- **Offer Viewing**: Browse current offers and promotions
- **Shop Details**: View detailed information about each shop

## 🏗️ Architecture

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **Logging**: Client-side logging to Firebase Firestore
- **Modular Design**: Separated concerns with service modules

## 📁 Project Structure

```
super-mall/
├── index.html              # Homepage (shop list + offers)
├── login.html              # Authentication page
├── shop-details.html       # Shop details and offers
├── compare.html            # Product comparison page
├── admin/
│   ├── dashboard.html      # Admin dashboard
│   ├── manage-shops.html   # Shop CRUD operations
│   ├── manage-offers.html  # Offer CRUD operations
│   ├── manage-category.html # Category & floor management
│   └── logs.html           # System logs viewer
├── js/
│   ├── config.js           # Firebase configuration
│   ├── logger.js           # Logging service
│   ├── auth.js             # Authentication service
│   ├── shops.js            # Shop service
│   ├── offers.js           # Offer service
│   ├── categories.js       # Category & floor service
│   └── utils.js            # Utility functions
├── firebase.json           # Firebase hosting configuration
├── firestore.rules         # Firestore security rules
├── firestore.indexes.json  # Firestore indexes
├── package.json            # Project dependencies
├── README.md               # This file
├── LLD.md                  # Low-Level Design document
└── Architecture.md         # Architecture document
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js and npm installed
- Firebase account
- Firebase CLI installed (`npm install -g firebase-tools`)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd super-mall
```

### Step 2: Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Firestore database

2. **Configure Firebase**
   - Open `js/config.js`
   - Replace the placeholder values with your Firebase project configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

3. **Deploy Firestore Rules**
   ```bash
   firebase login
   firebase init firestore
   firebase deploy --only firestore:rules
   ```

### Step 3: Initialize Firebase Hosting (Optional)
```bash
firebase init hosting
```

### Step 4: Run Locally

#### Option 1: Firebase Emulator (Recommended for Development)
```bash
firebase emulators:start
```

#### Option 2: Simple HTTP Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

### Step 5: Deploy to Firebase Hosting
```bash
firebase deploy
```

## 📖 Usage

### Admin Access

1. **Sign Up as Admin**
   - Navigate to `/login.html`
   - Click "Sign Up"
   - Select "Admin" role
   - Create your account

2. **Admin Dashboard**
   - Access at `/admin/dashboard.html`
   - View statistics and recent activity
   - Navigate to management pages

3. **Manage Data**
   - **Shops**: Add, edit, or delete shops
   - **Offers**: Create and manage special offers
   - **Categories**: Organize shops by categories
   - **Floors**: Manage mall floors
   - **Logs**: View system activity logs

### User Access

1. **Browse Shops**
   - Visit the homepage (`/index.html`)
   - View all available shops
   - Filter by category or floor

2. **View Shop Details**
   - Click "View Details" on any shop
   - See shop information and offers

3. **Compare Products**
   - Navigate to `/compare.html`
   - Select an offer to compare similar products
   - Compare prices, discounts, and features

## 🧪 Testing

### Test Cases

1. **Authentication Test**
   - Test user signup and login
   - Verify admin role assignment
   - Test logout functionality

2. **Shop Management Test**
   - Create a new shop
   - Edit shop details
   - Delete a shop
   - Verify shop appears on homepage

3. **Offer Management Test**
   - Create an offer with product details
   - Edit offer information
   - Delete an offer
   - Verify offer appears in shop details

4. **Filtering Test**
   - Filter shops by category
   - Filter shops by floor
   - Clear filters
   - Verify correct shops are displayed

5. **Comparison Test**
   - Select an offer
   - Verify similar products are shown
   - Compare prices and features

### Manual Testing Steps

See `TEST_CASES.md` for detailed test scenarios.

## 🔒 Security

- Firebase Authentication for user management
- Firestore security rules for data access control
- Role-based access control (Admin vs User)
- Input validation on forms
- Secure password requirements (minimum 6 characters)

## 📝 Firebase Collections

- `users` - User accounts and roles
- `shops` - Shop information
- `offers` - Special offers and promotions
- `categories` - Shop categories
- `floors` - Mall floors
- `logs` - System activity logs

## 🛠️ Technologies Used

- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6+)
- **Backend**: Firebase (Firestore, Authentication)
- **Hosting**: Firebase Hosting
- **Version Control**: Git

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.

## 🎉 Acknowledgments

- Firebase for backend services
- Tailwind CSS for styling
- All contributors and testers

---

**Note**: Remember to configure your Firebase project settings in `js/config.js` before running the application.

