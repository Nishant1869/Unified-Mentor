# Quick Setup Guide
## Super Mall Web Application

### Prerequisites Checklist
- [ ] Node.js installed (v14 or higher)
- [ ] Firebase account created
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)

### Step-by-Step Setup

#### 1. Firebase Project Setup

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add project"
   - Enter project name (e.g., "super-mall")
   - Follow the setup wizard

2. **Enable Authentication**
   - In Firebase Console, go to "Authentication"
   - Click "Get started"
   - Enable "Email/Password" sign-in method
   - Save

3. **Create Firestore Database**
   - Go to "Firestore Database"
   - Click "Create database"
   - Start in "test mode" (we'll update rules later)
   - Choose a location close to your users

4. **Get Firebase Configuration**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Click web icon (</>)
   - Register app with a nickname
   - Copy the `firebaseConfig` object

#### 2. Configure Application

1. **Update Firebase Config**
   - Open `js/config.js`
   - Replace placeholder values with your Firebase config:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_ACTUAL_API_KEY",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

2. **Deploy Firestore Rules**
   ```bash
   firebase login
   firebase use --add  # Select your project
   firebase deploy --only firestore:rules
   ```

#### 3. Initialize Sample Data (Optional)

You can manually add sample data through Firebase Console or use this structure:

**Categories Collection:**
```json
{
  "name": "Electronics",
  "description": "Electronic items and gadgets"
}
```

**Floors Collection:**
```json
{
  "number": 1,
  "name": "Ground Floor",
  "description": "Main entrance floor"
}
```

#### 4. Create Admin User

1. Run the application locally
2. Go to `/login.html`
3. Click "Sign Up"
4. Enter email and password
5. **Important**: Select "Admin" role
6. Complete signup

**Note**: After creating the admin user, you can manage all data through the admin panel.

#### 5. Run Locally

**Option 1: Simple HTTP Server**
```bash
# Python 3
python -m http.server 8000

# Node.js (if you have http-server)
npx http-server -p 8000
```

**Option 2: Firebase Emulator (Recommended)**
```bash
firebase emulators:start
```

Then open `http://localhost:8000` in your browser.

#### 6. Deploy to Firebase Hosting

```bash
# Initialize hosting (if not done)
firebase init hosting

# Deploy
firebase deploy
```

Your app will be available at: `https://your-project-id.web.app`

### Troubleshooting

#### Issue: "Firebase: Error (auth/invalid-api-key)"
**Solution**: Make sure you've updated `js/config.js` with your actual Firebase configuration.

#### Issue: "Permission denied" errors
**Solution**: 
1. Make sure Firestore rules are deployed: `firebase deploy --only firestore:rules`
2. Verify user has correct role in Firestore `users` collection

#### Issue: Cannot access admin pages
**Solution**: 
1. Verify user role is set to "admin" in Firestore `users` collection
2. Sign out and sign back in
3. Check browser console for errors

#### Issue: Data not loading
**Solution**:
1. Check browser console for errors
2. Verify Firestore database is created
3. Check Firestore security rules
4. Verify Firebase config is correct

### Next Steps

1. **Add Sample Data**: Create shops, offers, categories, and floors through admin panel
2. **Customize**: Modify colors, branding, and content
3. **Test**: Run through test cases in `TEST_CASES.md`
4. **Deploy**: Deploy to Firebase Hosting for production

### Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review LLD.md for low-level design details
3. Check Architecture.md for system architecture
4. Review test cases in TEST_CASES.md

---

**Happy Coding! 🚀**

