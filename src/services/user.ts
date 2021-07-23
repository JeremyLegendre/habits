import client from './apiClient';

export default {
    async getTopUsers() {
        try {
            const response = await client().get('/users/?ranked=true');
            return response.data.slice(0, 3);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}