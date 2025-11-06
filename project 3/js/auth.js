/**
 * Authentication Module
 * Handles Firebase authentication and user management
 */

class AuthService {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.currentUser = null;
  }

  /**
   * Initialize auth state listener
   */
  init() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          this.currentUser = user;
          // Get user role from Firestore
          const userDoc = await this.db.collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            this.currentUser.role = userDoc.data().role || 'user';
          } else {
            // Create user document if it doesn't exist
            await this.db.collection('users').doc(user.uid).set({
              email: user.email,
              role: 'user',
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            this.currentUser.role = 'user';
          }
          logger.setUserId(user.uid);
          logger.info('User authenticated', 'AuthService', { userId: user.uid, role: this.currentUser.role });
        } else {
          this.currentUser = null;
          logger.setUserId(null);
        }
        resolve(this.currentUser);
      });
    });
  }

  /**
   * Sign up a new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} role - User role (default: 'user')
   */
  async signUp(email, password, role = 'user') {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      await this.db.collection('users').doc(userCredential.user.uid).set({
        email,
        role,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      await logger.info('User signed up', 'AuthService', { email, role });
      return userCredential.user;
    } catch (error) {
      await logger.error('Sign up failed', 'AuthService', { error: error.message });
      throw error;
    }
  }

  /**
   * Sign in an existing user
   * @param {string} email - User email
   * @param {string} password - User password
   */
  async signIn(email, password) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      await logger.info('User signed in', 'AuthService', { email });
      return userCredential.user;
    } catch (error) {
      await logger.error('Sign in failed', 'AuthService', { error: error.message });
      throw error;
    }
  }

  /**
   * Sign out current user
   */
  async signOut() {
    try {
      await logger.info('User signed out', 'AuthService', { userId: this.currentUser?.uid });
      await this.auth.signOut();
      this.currentUser = null;
      logger.setUserId(null);
    } catch (error) {
      await logger.error('Sign out failed', 'AuthService', { error: error.message });
      throw error;
    }
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Check if user is admin
   */
  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  /**
   * Require authentication - redirect if not authenticated
   */
  requireAuth() {
    if (!this.currentUser) {
      window.location.href = '/login.html';
      return false;
    }
    return true;
  }

  /**
   * Require admin role - redirect if not admin
   */
  requireAdmin() {
    if (!this.requireAuth()) return false;
    if (!this.isAdmin()) {
      window.location.href = '/index.html';
      return false;
    }
    return true;
  }
}

// Create singleton instance
const authService = new AuthService();

