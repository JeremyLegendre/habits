import userService from '../../services/user';

interface User {
    userId: number;
    name: string;
    login: string;
    points: number;
    achievements: object;
}

interface AuthState {
    user: User | null;
}

const state: AuthState = {
    user: null,
};

const getters = {
    getUser() {
        return state.user;
    }
};

const actions = {
    async setUserInformations({commit}: any, userId: number) {
        const response = await userService.getUser(userId);
        commit('setUserInformations', response);
    }
};

const mutations = {
    setUserInformations(state: AuthState, user: User) {
        state.user = user;
    }
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};