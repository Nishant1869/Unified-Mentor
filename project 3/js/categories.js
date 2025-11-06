/**
 * Categories and Floors Module
 * Handles category and floor management
 */

class CategoryService {
  constructor() {
    this.db = firebase.firestore();
  }

  /**
   * Get all categories
   */
  async getCategories() {
    try {
      const snapshot = await this.db.collection('categories').orderBy('name').get();
      const categories = [];
      snapshot.forEach(doc => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      await logger.info('Categories retrieved', 'CategoryService', { count: categories.length });
      return categories;
    } catch (error) {
      await logger.error('Failed to get categories', 'CategoryService', { error: error.message });
      throw error;
    }
  }

  /**
   * Create a category
   * @param {object} categoryData - Category data
   */
  async createCategory(categoryData) {
    try {
      const category = {
        ...categoryData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      const docRef = await this.db.collection('categories').add(category);
      await logger.info('Category created', 'CategoryService', { categoryId: docRef.id, categoryData });
      return docRef.id;
    } catch (error) {
      await logger.error('Failed to create category', 'CategoryService', { error: error.message });
      throw error;
    }
  }

  /**
   * Update a category
   * @param {string} categoryId - Category ID
   * @param {object} categoryData - Updated category data
   */
  async updateCategory(categoryId, categoryData) {
    try {
      await this.db.collection('categories').doc(categoryId).update(categoryData);
      await logger.info('Category updated', 'CategoryService', { categoryId, categoryData });
    } catch (error) {
      await logger.error('Failed to update category', 'CategoryService', { categoryId, error: error.message });
      throw error;
    }
  }

  /**
   * Delete a category
   * @param {string} categoryId - Category ID
   */
  async deleteCategory(categoryId) {
    try {
      await this.db.collection('categories').doc(categoryId).delete();
      await logger.info('Category deleted', 'CategoryService', { categoryId });
    } catch (error) {
      await logger.error('Failed to delete category', 'CategoryService', { categoryId, error: error.message });
      throw error;
    }
  }

  /**
   * Get all floors
   */
  async getFloors() {
    try {
      const snapshot = await this.db.collection('floors').orderBy('number').get();
      const floors = [];
      snapshot.forEach(doc => {
        floors.push({ id: doc.id, ...doc.data() });
      });
      await logger.info('Floors retrieved', 'CategoryService', { count: floors.length });
      return floors;
    } catch (error) {
      await logger.error('Failed to get floors', 'CategoryService', { error: error.message });
      throw error;
    }
  }

  /**
   * Create a floor
   * @param {object} floorData - Floor data
   */
  async createFloor(floorData) {
    try {
      const floor = {
        ...floorData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      const docRef = await this.db.collection('floors').add(floor);
      await logger.info('Floor created', 'CategoryService', { floorId: docRef.id, floorData });
      return docRef.id;
    } catch (error) {
      await logger.error('Failed to create floor', 'CategoryService', { error: error.message });
      throw error;
    }
  }

  /**
   * Update a floor
   * @param {string} floorId - Floor ID
   * @param {object} floorData - Updated floor data
   */
  async updateFloor(floorId, floorData) {
    try {
      await this.db.collection('floors').doc(floorId).update(floorData);
      await logger.info('Floor updated', 'CategoryService', { floorId, floorData });
    } catch (error) {
      await logger.error('Failed to update floor', 'CategoryService', { floorId, error: error.message });
      throw error;
    }
  }

  /**
   * Delete a floor
   * @param {string} floorId - Floor ID
   */
  async deleteFloor(floorId) {
    try {
      await this.db.collection('floors').doc(floorId).delete();
      await logger.info('Floor deleted', 'CategoryService', { floorId });
    } catch (error) {
      await logger.error('Failed to delete floor', 'CategoryService', { floorId, error: error.message });
      throw error;
    }
  }
}

// Create singleton instance
const categoryService = new CategoryService();

