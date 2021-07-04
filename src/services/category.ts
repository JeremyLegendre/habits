import client from './apiClient';

export default {
    async getCategories() {
        try {
            const response = await client().get(`/categories/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}