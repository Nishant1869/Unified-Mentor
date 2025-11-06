/**
 * Offers Module
 * Handles offer-related operations (CRUD)
 */

class OfferService {
  constructor() {
    this.db = firebase.firestore();
  }

  /**
   * Get all offers
   * @param {string} shopId - Optional shop ID filter
   */
  async getOffers(shopId = null) {
    try {
      let query = this.db.collection('offers');
      
      if (shopId) {
        query = query.where('shopId', '==', shopId);
      }
      
      const snapshot = await query.get();
      const offers = [];
      snapshot.forEach(doc => {
        offers.push({ id: doc.id, ...doc.data() });
      });
      
      await logger.info('Offers retrieved', 'OfferService', { count: offers.length, shopId });
      return offers;
    } catch (error) {
      await logger.error('Failed to get offers', 'OfferService', { error: error.message });
      throw error;
    }
  }

  /**
   * Get a single offer by ID
   * @param {string} offerId - Offer ID
   */
  async getOffer(offerId) {
    try {
      const doc = await this.db.collection('offers').doc(offerId).get();
      if (!doc.exists) {
        throw new Error('Offer not found');
      }
      await logger.info('Offer retrieved', 'OfferService', { offerId });
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      await logger.error('Failed to get offer', 'OfferService', { offerId, error: error.message });
      throw error;
    }
  }

  /**
   * Create a new offer
   * @param {object} offerData - Offer data
   */
  async createOffer(offerData) {
    try {
      const offer = {
        ...offerData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      const docRef = await this.db.collection('offers').add(offer);
      await logger.info('Offer created', 'OfferService', { offerId: docRef.id, offerData });
      return docRef.id;
    } catch (error) {
      await logger.error('Failed to create offer', 'OfferService', { error: error.message });
      throw error;
    }
  }

  /**
   * Update an offer
   * @param {string} offerId - Offer ID
   * @param {object} offerData - Updated offer data
   */
  async updateOffer(offerId, offerData) {
    try {
      const updateData = {
        ...offerData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      await this.db.collection('offers').doc(offerId).update(updateData);
      await logger.info('Offer updated', 'OfferService', { offerId, offerData });
    } catch (error) {
      await logger.error('Failed to update offer', 'OfferService', { offerId, error: error.message });
      throw error;
    }
  }

  /**
   * Delete an offer
   * @param {string} offerId - Offer ID
   */
  async deleteOffer(offerId) {
    try {
      await this.db.collection('offers').doc(offerId).delete();
      await logger.info('Offer deleted', 'OfferService', { offerId });
    } catch (error) {
      await logger.error('Failed to delete offer', 'OfferService', { offerId, error: error.message });
      throw error;
    }
  }
}

// Create singleton instance
const offerService = new OfferService();

