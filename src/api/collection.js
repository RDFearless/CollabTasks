import api from './axios.js';

export class CollectionService {
    async createCollection({ name, description, color }) {
        try {
            return await api.post("/collections/me", {
                name,
                description,
                color
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async getCollectionById(collectionId) {
        try {
            return await api.get(`/collections/${collectionId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async updateCollection({ name, description, color }, collectionId) {
        try {
            return await api.put(`/collections/me/${collectionId}`, {
                name,
                description,
                color
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async deleteCollection(collectionId) {
        try {
            return await api.delete(`/collections/me/${collectionId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async getMyCollections() {
        try {
            return await api.get("/collections/me");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async getCollectionsByUsername(username) {
        try {
            return await api.get(`/collections/user?username=${username}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async toggleCollectionVisibility(collectionId) {
        try {
            return await api.patch(`/collections/me/${collectionId}/privacy`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const collectionService = new CollectionService();
export default collectionService;