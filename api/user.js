// User API Service
// Handles all user-related API calls to the backend

const USER_API_BASE = 'https://educational-datahub.onrender.com';

/**
 * User API Service - Handles CRUD operations for users
 */
const UserAPI = {
    /**
     * Create a new user
     * @param {Object} userData - User data to create
     * @returns {Promise<Object>} Created user data
     */
    async createUser(userData) {
        try {
            const response = await fetch(`${USER_API_BASE}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create user: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('User created successfully:', data);
            return data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    /**
     * Get user by phone number
     * @param {string} phoneNumber - Phone number to search (e.g., "+77474039869")
     * @returns {Promise<Object|null>} User data or null if not found
     */
    async getUserByPhone(phoneNumber) {
        try {
            const encodedPhone = encodeURIComponent(phoneNumber);
            const response = await fetch(`${USER_API_BASE}/api/users?phone=${encodedPhone}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.status === 404) {
                console.log('User not found for phone:', phoneNumber);
                return null;
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to get user: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('User retrieved successfully:', data);
            return data;
        } catch (error) {
            console.error('Error getting user:', error);
            throw error;
        }
    },

    /**
     * Update existing user
     * @param {Object} userData - User data to update (must include phoneNumber)
     * @returns {Promise<Object>} Updated user data
     */
    async updateUser(userData) {
        try {
            const response = await fetch(`${USER_API_BASE}/api/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update user: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('User updated successfully:', data);
            return data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    /**
     * Create or update user (upsert operation)
     * First tries to get user by phone, then creates or updates accordingly
     * @param {Object} userData - User data
     * @returns {Promise<Object>} User data
     */
    async upsertUser(userData) {
        try {
            if (!userData.phoneNumber) {
                throw new Error('Phone number is required');
            }

            // Check if user exists
            const existingUser = await this.getUserByPhone(userData.phoneNumber);
            
            if (existingUser) {
                // Merge existing data with new data
                const mergedData = {
                    ...existingUser,
                    ...userData,
                    // Deep merge documents
                    documents: {
                        ...(existingUser.documents || {}),
                        ...(userData.documents || {})
                    },
                    // Keep existing arrays if not provided
                    bookmarkedUniversities: userData.bookmarkedUniversities || existingUser.bookmarkedUniversities || [],
                    sentApplications: userData.sentApplications || existingUser.sentApplications || []
                };
                return await this.updateUser(mergedData);
            } else {
                return await this.createUser(userData);
            }
        } catch (error) {
            console.error('Error upserting user:', error);
            throw error;
        }
    },

    /**
     * Format phone number to standard format
     * @param {string} phone - Phone number input
     * @returns {string} Formatted phone number
     */
    formatPhoneNumber(phone) {
        // Remove all non-digit characters except +
        let cleaned = phone.replace(/[^\d+]/g, '');
        
        // If starts with 8, replace with +7 (Kazakhstan format)
        if (cleaned.startsWith('8') && cleaned.length === 11) {
            cleaned = '+7' + cleaned.slice(1);
        }
        
        // If doesn't start with +, assume Kazakhstan
        if (!cleaned.startsWith('+')) {
            if (cleaned.startsWith('7') && cleaned.length === 11) {
                cleaned = '+' + cleaned;
            } else if (cleaned.length === 10) {
                cleaned = '+7' + cleaned;
            }
        }
        
        return cleaned;
    },

    /**
     * Validate phone number format
     * @param {string} phone - Phone number to validate
     * @returns {boolean} True if valid
     */
    isValidPhoneNumber(phone) {
        const formatted = this.formatPhoneNumber(phone);
        // Kazakhstan phone: +7 followed by 10 digits
        return /^\+7\d{10}$/.test(formatted);
    },

    /**
     * Build document object for API
     * @param {string} docType - Document type (ielts, transcript, etc.)
     * @param {Object} docData - Document data from localStorage
     * @returns {Object} Formatted document object
     */
    buildDocumentObject(docType, docData) {
        return {
            fileName: docData.name,
            url: docData.url || `local://${docData.name}`, // In production, this would be S3/cloud URL
            uploadedAt: docData.uploadedAt || new Date().toISOString()
        };
    },

    /**
     * Build user payload from localStorage data
     * @returns {Object} User data formatted for API
     */
    buildUserPayload() {
        const personalInfo = JSON.parse(localStorage.getItem('personalInfo') || '{}');
        const uploadedDocuments = JSON.parse(localStorage.getItem('uploadedDocuments') || '{}');
        const bookmarkedUniversities = JSON.parse(localStorage.getItem('bookmarkedUniversities') || '[]');
        const sentApplications = JSON.parse(localStorage.getItem('sentApplications') || '[]');

        // Format documents for API
        const documents = {};
        Object.entries(uploadedDocuments).forEach(([type, data]) => {
            documents[type] = this.buildDocumentObject(type, data);
        });

        return {
            phoneNumber: this.formatPhoneNumber(personalInfo.phone || ''),
            firstName: personalInfo.firstName || '',
            lastName: personalInfo.lastName || '',
            email: personalInfo.email || '',
            documents: documents,
            bookmarkedUniversities: bookmarkedUniversities.map(uni => ({
                id: uni.id,
                name: uni.name,
                location: uni.location
            })),
            sentApplications: sentApplications.map(app => ({
                universityId: app.universityId,
                universityName: app.universityName,
                status: app.status || 'Pending',
                email: app.email,
                submittedAt: app.submittedAt
            }))
        };
    },

    /**
     * Sync local data to backend
     * @returns {Promise<Object>} Sync result
     */
    async syncToBackend() {
        const payload = this.buildUserPayload();
        
        if (!payload.phoneNumber || !this.isValidPhoneNumber(payload.phoneNumber)) {
            throw new Error('Valid phone number is required for sync');
        }

        return await this.upsertUser(payload);
    },

    /**
     * Load user data from backend to localStorage
     * @param {string} phoneNumber - Phone number to load
     * @returns {Promise<boolean>} True if data was loaded
     */
    async loadFromBackend(phoneNumber) {
        try {
            const formattedPhone = this.formatPhoneNumber(phoneNumber);
            const userData = await this.getUserByPhone(formattedPhone);
            
            if (!userData) {
                return false;
            }

            // Update localStorage with backend data
            const personalInfo = {
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
                phone: userData.phoneNumber || formattedPhone
            };
            localStorage.setItem('personalInfo', JSON.stringify(personalInfo));

            // Restore documents if available
            if (userData.documents) {
                const docs = {};
                Object.entries(userData.documents).forEach(([type, data]) => {
                    docs[type] = {
                        name: data.fileName,
                        url: data.url,
                        uploadedAt: data.uploadedAt
                    };
                });
                localStorage.setItem('uploadedDocuments', JSON.stringify(docs));
            }

            // Restore bookmarked universities
            if (userData.bookmarkedUniversities) {
                localStorage.setItem('bookmarkedUniversities', JSON.stringify(userData.bookmarkedUniversities));
            }

            // Restore sent applications
            if (userData.sentApplications) {
                localStorage.setItem('sentApplications', JSON.stringify(userData.sentApplications));
            }

            return true;
        } catch (error) {
            console.error('Error loading from backend:', error);
            return false;
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserAPI;
}

// Make available globally
window.UserAPI = UserAPI;

