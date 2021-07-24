import client from './apiClient';

export default {
  async getUser(userId) {
    try {
      const response = await client().get('/users/' + userId);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getTopUsers() {
    try {
      const response = await client().get('/users/?ranked=true');
      return response.data.slice(0, 3);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getUserPosition(userId) {
    try {
      const response = await client().get(`/users/${userId}/position`);
      return response.data.position;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}