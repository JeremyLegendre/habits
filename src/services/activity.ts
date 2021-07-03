import client from './apiClient';

export default {
    async getActivities(userId: number) {
        try {
            const response = await client().get(`/activities/${userId}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async postActivity(activity) {
        try {
            const response = await client().post('/activities/', activity);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}