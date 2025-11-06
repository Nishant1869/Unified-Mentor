/**
 * Logging Module
 * Handles client-side logging to console and Firebase Firestore
 */

class Logger {
  constructor() {
    this.db = firebase.firestore();
    this.userId = null;
  }

  /**
   * Set the current user ID for logging
   * @param {string} userId - The user ID
   */
  setUserId(userId) {
    this.userId = userId;
  }

  /**
   * Log an action to console and Firebase
   * @param {string} action - The action performed
   * @param {string} module - The module/component where action occurred
   * @param {object} details - Additional details about the action
   * @param {string} level - Log level (info, warning, error)
   */
  async log(action, module, details = {}, level = 'info') {
    const logEntry = {
      action,
      module,
      details,
      level,
      userId: this.userId || 'anonymous',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Console logging
    const consoleMethod = level === 'error' ? console.error : 
                         level === 'warning' ? console.warn : 
                         console.log;
    consoleMethod(`[${module}] ${action}`, details);

    // Firebase logging
    try {
      await this.db.collection('logs').add(logEntry);
    } catch (error) {
      console.error('Failed to log to Firebase:', error);
    }
  }

  /**
   * Log info level
   */
  info(action, module, details) {
    return this.log(action, module, details, 'info');
  }

  /**
   * Log warning level
   */
  warning(action, module, details) {
    return this.log(action, module, details, 'warning');
  }

  /**
   * Log error level
   */
  error(action, module, details) {
    return this.log(action, module, details, 'error');
  }
}

// Create singleton instance
const logger = new Logger();

