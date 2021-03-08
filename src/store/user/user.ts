import axios from 'axios';

interface User {
    userId: number;
    name: string;
    login: string;
    points: number;
    achievements: object;
}

interface AuthState {
  authUser: User | null;
}

const state: AuthState = {
    authUser: null,
};

const getters = {
    getUser() {
        return state.authUser;
    }
};

const actions = {
    async setUserInformations({commit}: any, userId: number) {
        const response = await axios.get("http://www.localhost:8080/api/user/" + userId);
        commit('setUserInformations', response.data);
    }
};

const mutations = {
    setUserInformations(state: AuthState, user: User) {
        state.authUser = user;
    }
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};