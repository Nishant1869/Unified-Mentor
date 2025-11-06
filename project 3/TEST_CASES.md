# Test Cases Document
## Super Mall Web Application

### Test Case 1: User Authentication

#### TC-001: User Sign Up
**Objective**: Verify that a new user can successfully create an account

**Preconditions**: 
- User is on the login page
- Firebase is properly configured

**Test Steps**:
1. Navigate to `/login.html`
2. Click "Sign Up" button
3. Enter valid email address
4. Enter password (minimum 6 characters)
5. Select role (User or Admin)
6. Click "Sign Up" button

**Expected Result**: 
- User account is created successfully
- User is redirected to appropriate page (homepage for users, dashboard for admins)
- Success notification is displayed
- User document is created in Firestore `users` collection
- Log entry is created in `logs` collection

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

#### TC-002: User Login
**Objective**: Verify that an existing user can log in

**Preconditions**: 
- User account exists in Firebase
- User is on the login page

**Test Steps**:
1. Navigate to `/login.html`
2. Enter valid email address
3. Enter correct password
4. Click "Login" button

**Expected Result**: 
- User is authenticated successfully
- User is redirected to appropriate page based on role
- Success notification is displayed
- Log entry is created

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

#### TC-003: Invalid Login Credentials
**Objective**: Verify error handling for invalid credentials

**Test Steps**:
1. Navigate to `/login.html`
2. Enter invalid email or password
3. Click "Login" button

**Expected Result**: 
- Error message is displayed
- User remains on login page
- Error is logged to Firestore

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

### Test Case 2: Shop Management (Admin)

#### TC-004: Create Shop
**Objective**: Verify that admin can create a new shop

**Preconditions**: 
- User is logged in as admin
- At least one category and floor exist

**Test Steps**:
1. Navigate to `/admin/manage-shops.html`
2. Click "+ Add Shop" button
3. Fill in shop details:
   - Name: "Test Shop"
   - Description: "Test Description"
   - Category: Select existing category
   - Floor: Select existing floor
   - Contact: "123-456-7890"
   - Email: "test@shop.com"
4. Click "Save" button

**Expected Result**: 
- Shop is created successfully
- Success notification is displayed
- Shop appears in the shops list
- Shop is visible on homepage
- Log entry is created

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

#### TC-005: Edit Shop
**Objective**: Verify that admin can edit shop details

**Preconditions**: 
- At least one shop exists
- User is logged in as admin

**Test Steps**:
1. Navigate to `/admin/manage-shops.html`
2. Click "Edit" on an existing shop
3. Modify shop name
4. Click "Save" button

**Expected Result**: 
- Shop is updated successfully
- Changes are reflected in the shops list
- Updated information appears on homepage
- Log entry is created

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

#### TC-006: Delete Shop
**Objective**: Verify that admin can delete a shop

**Preconditions**: 
- At least one shop exists
- User is logged in as admin

**Test Steps**:
1. Navigate to `/admin/manage-shops.html`
2. Click "Delete" on an existing shop
3. Confirm deletion in the dialog

**Expected Result**: 
- Shop is deleted successfully
- Shop is removed from the list
- Shop no longer appears on homepage
- Log entry is created

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

### Test Case 3: Offer Management (Admin)

#### TC-007: Create Offer
**Objective**: Verify that admin can create a new offer

**Preconditions**: 
- User is logged in as admin
- At least one shop exists

**Test Steps**:
1. Navigate to `/admin/manage-offers.html`
2. Click "+ Add Offer" button
3. Fill in offer details:
   - Title: "Test Offer"
   - Description: "Test Description"
   - Shop: Select existing shop
   - Product Name: "Test Product"
   - Price: 100
   - Discount: 20
   - Valid Until: Future date
   - Features: "Feature 1, Feature 2"
4. Click "Save" button

**Expected Result**: 
- Offer is created successfully
- Success notification is displayed
- Offer appears in the offers list
- Offer is visible on shop details page
- Log entry is created

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

### Test Case 4: Shop Filtering (User)

#### TC-008: Filter Shops by Category
**Objective**: Verify that users can filter shops by category

**Preconditions**: 
- Multiple shops exist with different categories
- User is on homepage

**Test Steps**:
1. Navigate to `/index.html`
2. Select a category from the "Category" dropdown
3. Observe the shop list

**Expected Result**: 
- Only shops matching the selected category are displayed
- Filter is applied correctly
- Other shops are hidden

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

#### TC-009: Filter Shops by Floor
**Objective**: Verify that users can filter shops by floor

**Test Steps**:
1. Navigate to `/index.html`
2. Select a floor from the "Floor" dropdown
3. Observe the shop list

**Expected Result**: 
- Only shops on the selected floor are displayed
- Filter is applied correctly

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

#### TC-010: Clear Filters
**Objective**: Verify that users can clear applied filters

**Test Steps**:
1. Apply category and/or floor filters
2. Click "Clear Filters" button

**Expected Result**: 
- All filters are cleared
- All shops are displayed
- Filter dropdowns reset to default

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

### Test Case 5: Product Comparison

#### TC-011: Compare Products
**Objective**: Verify that users can compare products

**Preconditions**: 
- Multiple offers exist with product information
- User is on compare page

**Test Steps**:
1. Navigate to `/compare.html`
2. Select an offer from the dropdown
3. Observe the comparison table

**Expected Result**: 
- Selected offer is displayed
- Similar products are shown for comparison
- Price, discount, and features are displayed
- Comparison table is properly formatted

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

### Test Case 6: Shop Details

#### TC-012: View Shop Details
**Objective**: Verify that users can view detailed shop information

**Preconditions**: 
- At least one shop exists

**Test Steps**:
1. Navigate to `/index.html`
2. Click "View Details" on any shop
3. Observe the shop details page

**Expected Result**: 
- Shop information is displayed correctly
- Shop offers are listed
- All shop details (name, description, contact, etc.) are visible

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

### Test Case 7: Category and Floor Management

#### TC-013: Create Category
**Objective**: Verify that admin can create a category

**Preconditions**: 
- User is logged in as admin

**Test Steps**:
1. Navigate to `/admin/manage-category.html`
2. Click "+ Add Category" button
3. Enter category name and description
4. Click "Save"

**Expected Result**: 
- Category is created successfully
- Category appears in the list
- Category is available in shop creation form

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

#### TC-014: Create Floor
**Objective**: Verify that admin can create a floor

**Test Steps**:
1. Navigate to `/admin/manage-category.html`
2. Click "+ Add Floor" button
3. Enter floor number, name, and description
4. Click "Save"

**Expected Result**: 
- Floor is created successfully
- Floor appears in the list
- Floor is available in shop creation form

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

### Test Case 8: Logging System

#### TC-015: View System Logs
**Objective**: Verify that admin can view system logs

**Preconditions**: 
- User is logged in as admin
- Some actions have been performed (creating shops, offers, etc.)

**Test Steps**:
1. Navigate to `/admin/logs.html`
2. Observe the logs table

**Expected Result**: 
- Logs are displayed in chronological order
- Log details include action, module, user, timestamp
- Logs can be filtered by level and module
- Recent actions are visible

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

### Test Case 9: Access Control

#### TC-016: Admin Access to Admin Pages
**Objective**: Verify that only admins can access admin pages

**Preconditions**: 
- User is logged in as admin

**Test Steps**:
1. Navigate to `/admin/dashboard.html`
2. Try to access other admin pages

**Expected Result**: 
- Admin can access all admin pages
- No redirect occurs

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

#### TC-017: User Access to Admin Pages
**Objective**: Verify that regular users cannot access admin pages

**Preconditions**: 
- User is logged in as regular user (not admin)

**Test Steps**:
1. Try to navigate to `/admin/dashboard.html` directly

**Expected Result**: 
- User is redirected to homepage
- Access is denied
- Error is logged

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

### Test Case 10: Error Handling

#### TC-018: Network Error Handling
**Objective**: Verify that the application handles network errors gracefully

**Test Steps**:
1. Disconnect from internet
2. Try to perform an action (create shop, login, etc.)

**Expected Result**: 
- Error message is displayed to user
- Application doesn't crash
- Error is logged

**Actual Result**: [To be filled during testing]

**Status**: [ ] Pass [ ] Fail

---

## Test Summary

| Test Case ID | Description | Status | Notes |
|--------------|-------------|--------|-------|
| TC-001 | User Sign Up | [ ] | |
| TC-002 | User Login | [ ] | |
| TC-003 | Invalid Login | [ ] | |
| TC-004 | Create Shop | [ ] | |
| TC-005 | Edit Shop | [ ] | |
| TC-006 | Delete Shop | [ ] | |
| TC-007 | Create Offer | [ ] | |
| TC-008 | Filter by Category | [ ] | |
| TC-009 | Filter by Floor | [ ] | |
| TC-010 | Clear Filters | [ ] | |
| TC-011 | Compare Products | [ ] | |
| TC-012 | View Shop Details | [ ] | |
| TC-013 | Create Category | [ ] | |
| TC-014 | Create Floor | [ ] | |
| TC-015 | View Logs | [ ] | |
| TC-016 | Admin Access | [ ] | |
| TC-017 | User Access Control | [ ] | |
| TC-018 | Error Handling | [ ] | |

---

**Document Version**: 1.0  
**Last Updated**: 2024

