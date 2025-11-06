/**
 * Shops Module
 * Handles shop-related operations (CRUD)
 */

class ShopService {
  constructor() {
    this.db = firebase.firestore();
  }

  /**
   * Get all shops
   * @param {object} filters - Optional filters (category, floor)
   */
  async getShops(filters = {}) {
    try {
      let query = this.db.collection('shops');
      
      if (filters.category) {
        query = query.where('category', '==', filters.category);
      }
      
      if (filters.floor) {
        query = query.where('floor', '==', filters.floor);
      }
      
      const snapshot = await query.get();
      const shops = [];
      snapshot.forEach(doc => {
        shops.push({ id: doc.id, ...doc.data() });
      });
      
      await logger.info('Shops retrieved', 'ShopService', { count: shops.length, filters });
      return shops;
    } catch (error) {
      await logger.error('Failed to get shops', 'ShopService', { error: error.message });
      throw error;
    }
  }

  /**
   * Get a single shop by ID
   * @param {string} shopId - Shop ID
   */
  async getShop(shopId) {
    try {
      const doc = await this.db.collection('shops').doc(shopId).get();
      if (!doc.exists) {
        throw new Error('Shop not found');
      }
      await logger.info('Shop retrieved', 'ShopService', { shopId });
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      await logger.error('Failed to get shop', 'ShopService', { shopId, error: error.message });
      throw error;
    }
  }

  /**
   * Create a new shop
   * @param {object} shopData - Shop data
   */
  async createShop(shopData) {
    try {
      const shop = {
        ...shopData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      const docRef = await this.db.collection('shops').add(shop);
      await logger.info('Shop created', 'ShopService', { shopId: docRef.id, shopData });
      return docRef.id;
    } catch (error) {
      await logger.error('Failed to create shop', 'ShopService', { error: error.message });
      throw error;
    }
  }

  /**
   * Update a shop
   * @param {string} shopId - Shop ID
   * @param {object} shopData - Updated shop data
   */
  async updateShop(shopId, shopData) {
    try {
      const updateData = {
        ...shopData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      await this.db.collection('shops').doc(shopId).update(updateData);
      await logger.info('Shop updated', 'ShopService', { shopId, shopData });
    } catch (error) {
      await logger.error('Failed to update shop', 'ShopService', { shopId, error: error.message });
      throw error;
    }
  }

  /**
   * Delete a shop
   * @param {string} shopId - Shop ID
   */
  async deleteShop(shopId) {
    try {
      await this.db.collection('shops').doc(shopId).delete();
      await logger.info('Shop deleted', 'ShopService', { shopId });
    } catch (error) {
      await logger.error('Failed to delete shop', 'ShopService', { shopId, error: error.message });
      throw error;
    }
  }
}

// Create singleton instance
const shopService = new ShopService();

