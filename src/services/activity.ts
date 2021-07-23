import client from './apiClient';

export default {
    async getActivities(userId: number) {
        try {
            const response = await client().get(`/activities/${userId}`);

            // order response.data by date
            return response.data.sort((a, b) => a.date - b.date);
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async postActivity(params: any) {
        try {
            const response = await client().post('/activities/', params);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}