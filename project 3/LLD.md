# Low-Level Design (LLD) Document
## Super Mall Web Application

### 1. Overview

This document describes the low-level design of the Super Mall Web Application, including module structure, data flow, and implementation details.

### 2. System Architecture

#### 2.1 Module Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  (HTML Pages: index, login, shop-details, compare,      │
│   admin/dashboard, admin/manage-*, admin/logs)          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Service Layer                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐│
│  │  Auth    │  │  Shops   │  │  Offers  │  │Category ││
│  │ Service  │  │ Service  │  │ Service  │  │ Service ││
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘│
│  ┌──────────┐  ┌──────────┐                            │
│  │ Logger   │  │  Utils   │                            │
│  │ Service  │  │          │                            │
│  └──────────┘  └──────────┘                            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Firebase Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Firestore   │  │  Auth        │  │  Hosting     │ │
│  │  Database    │  │  Service     │  │  Service     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 3. Module Details

#### 3.1 Authentication Module (`js/auth.js`)

**Purpose**: Handle user authentication and authorization

**Key Classes/Functions**:
- `AuthService` class
  - `init()`: Initialize auth state listener
  - `signUp(email, password, role)`: Register new user
  - `signIn(email, password)`: Authenticate user
  - `signOut()`: Logout current user
  - `getCurrentUser()`: Get current authenticated user
  - `isAdmin()`: Check if user has admin role
  - `requireAuth()`: Redirect if not authenticated
  - `requireAdmin()`: Redirect if not admin

**Data Flow**:
1. User submits login/signup form
2. AuthService validates credentials
3. Firebase Auth authenticates user
4. User document created/updated in Firestore
5. Auth state listener updates UI
6. Logger records authentication action

**Error Handling**:
- Invalid credentials → Show error message
- Network errors → Log error and show notification
- Permission denied → Redirect to appropriate page

#### 3.2 Shop Service Module (`js/shops.js`)

**Purpose**: Manage shop-related operations

**Key Classes/Functions**:
- `ShopService` class
  - `getShops(filters)`: Retrieve shops with optional filters
  - `getShop(shopId)`: Get single shop by ID
  - `createShop(shopData)`: Create new shop
  - `updateShop(shopId, shopData)`: Update existing shop
  - `deleteShop(shopId)`: Delete shop

**Data Structure**:
```javascript
{
  name: string,
  description: string,
  category: string,
  floor: number,
  contact: string,
  email: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Filtering Logic**:
- Filter by category: `where('category', '==', category)`
- Filter by floor: `where('floor', '==', floor)`
- Combined filters use multiple where clauses

#### 3.3 Offer Service Module (`js/offers.js`)

**Purpose**: Manage offer-related operations

**Key Classes/Functions**:
- `OfferService` class
  - `getOffers(shopId)`: Get all offers or filter by shop
  - `getOffer(offerId)`: Get single offer
  - `createOffer(offerData)`: Create new offer
  - `updateOffer(offerId, offerData)`: Update offer
  - `deleteOffer(offerId)`: Delete offer

**Data Structure**:
```javascript
{
  title: string,
  description: string,
  shopId: string,
  productName: string,
  price: number,
  discount: number,
  features: string,
  validUntil: Timestamp,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### 3.4 Category Service Module (`js/categories.js`)

**Purpose**: Manage categories and floors

**Key Classes/Functions**:
- `CategoryService` class
  - Categories:
    - `getCategories()`: Get all categories
    - `createCategory(categoryData)`: Create category
    - `updateCategory(categoryId, categoryData)`: Update category
    - `deleteCategory(categoryId)`: Delete category
  - Floors:
    - `getFloors()`: Get all floors
    - `createFloor(floorData)`: Create floor
    - `updateFloor(floorId, floorData)`: Update floor
    - `deleteFloor(floorId)`: Delete floor

**Data Structures**:
```javascript
// Category
{
  name: string,
  description: string,
  createdAt: Timestamp
}

// Floor
{
  number: number,
  name: string,
  description: string,
  createdAt: Timestamp
}
```

#### 3.5 Logger Module (`js/logger.js`)

**Purpose**: Centralized logging system

**Key Classes/Functions**:
- `Logger` class
  - `setUserId(userId)`: Set current user for logging
  - `log(action, module, details, level)`: Main logging function
  - `info(action, module, details)`: Info level log
  - `warning(action, module, details)`: Warning level log
  - `error(action, module, details)`: Error level log

**Log Entry Structure**:
```javascript
{
  action: string,
  module: string,
  details: object,
  level: 'info' | 'warning' | 'error',
  userId: string,
  timestamp: Timestamp,
  userAgent: string,
  url: string
}
```

**Logging Strategy**:
1. Log to console for immediate debugging
2. Log to Firestore for persistence and analysis
3. Handle logging errors gracefully (don't break app flow)

#### 3.6 Utility Module (`js/utils.js`)

**Purpose**: Common helper functions

**Functions**:
- `formatDate(timestamp)`: Format Firestore timestamp to readable string
- `showNotification(message, type)`: Display toast notification
- `debounce(func, wait)`: Debounce function calls
- `isValidEmail(email)`: Validate email format
- `getUrlParameter(name)`: Extract URL parameter

### 4. Data Flow

#### 4.1 User Authentication Flow

```
User Input → AuthService.signIn() → Firebase Auth
                                    ↓
                            Success/Failure
                                    ↓
                            Update Auth State
                                    ↓
                            Logger.log()
                                    ↓
                            Redirect User
```

#### 4.2 Shop Creation Flow

```
Admin Input → Form Validation → ShopService.createShop()
                                        ↓
                                Firestore.add()
                                        ↓
                                Logger.log()
                                        ↓
                                Show Notification
                                        ↓
                                Reload Shop List
```

#### 4.3 Shop Filtering Flow

```
User Selects Filter → Update Filter State
                            ↓
                    ShopService.getShops(filters)
                            ↓
                    Firestore Query with Filters
                            ↓
                    Render Filtered Results
```

#### 4.4 Product Comparison Flow

```
User Selects Offer → OfferService.getOffers()
                            ↓
                    Find Similar Products
                            ↓
                    Load Shop Information
                            ↓
                    Render Comparison Table
```

### 5. Security Implementation

#### 5.1 Firestore Security Rules

```javascript
// Users: Read own data, admins read all
match /users/{userId} {
  allow read: if request.auth != null && 
    (request.auth.uid == userId || 
     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
  allow write: if request.auth != null && request.auth.uid == userId;
}

// Shops: Public read, admin write
match /shops/{shopId} {
  allow read: if true;
  allow write: if request.auth != null && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

#### 5.2 Client-Side Validation

- Email format validation
- Required field validation
- Password minimum length (6 characters)
- Number input validation for prices and discounts

### 6. Error Handling

#### 6.1 Error Types

1. **Authentication Errors**
   - Invalid credentials
   - Network failures
   - Permission denied

2. **Data Operation Errors**
   - Document not found
   - Validation errors
   - Network timeouts

3. **UI Errors**
   - Missing DOM elements
   - Invalid user input

#### 6.2 Error Handling Strategy

- Try-catch blocks around async operations
- User-friendly error messages
- Logging all errors to Firestore
- Graceful degradation (show empty states)

### 7. Performance Considerations

#### 7.1 Optimization Strategies

1. **Query Optimization**
   - Limit query results where appropriate
   - Use indexes for filtered queries
   - Cache frequently accessed data

2. **UI Optimization**
   - Debounce filter inputs
   - Lazy load images (if added)
   - Minimize DOM manipulations

3. **Firebase Optimization**
   - Batch operations where possible
   - Use pagination for large datasets
   - Implement offline support (future enhancement)

### 8. Testing Strategy

#### 8.1 Unit Testing (Future)

- Test individual service methods
- Mock Firebase calls
- Test utility functions

#### 8.2 Integration Testing

- Test complete user flows
- Test admin operations
- Test error scenarios

#### 8.3 Manual Testing

- Authentication flows
- CRUD operations
- Filtering and comparison
- Role-based access

### 9. Future Enhancements

1. **Offline Support**: Implement Firestore offline persistence
2. **Image Upload**: Add shop and product images
3. **Search Functionality**: Full-text search for shops and products
4. **Pagination**: Implement pagination for large lists
5. **Real-time Updates**: Use Firestore real-time listeners
6. **Email Notifications**: Notify users of new offers
7. **Analytics**: Track user behavior and popular shops
8. **Mobile App**: React Native or Flutter mobile app

### 10. Code Quality Standards

- **Modularity**: Separate concerns into service modules
- **Comments**: Document complex logic
- **Naming**: Use descriptive variable and function names
- **Error Handling**: Comprehensive error handling
- **Logging**: Log all major actions
- **Security**: Validate inputs and enforce permissions

---

**Document Version**: 1.0  
**Last Updated**: 2024

