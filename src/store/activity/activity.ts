import axios from 'axios';

// interface Activity {
//     id: number;
//     parent: number;
//     icon: string;
//     name: string;
//     date: string;
//     endDate: string;
//     plannedTime: number;
//     passedTime: number;
// }

// interface ActivitiesState {
//     activities: Activity[]|null;
// }

const state = {
    activities: null
};

const getters = {
    getActivities() {
        return state.activities;
    },
    getActivitiesFromDate(date) {
        return state.activities.filter((activity) => {
            return activity.date == date;
        });
    }
};

const actions = {
    async getActivities({commit}: any, userId: number) {
        try {
            const response = await axios.get(`http://www.localhost:8080/api/activities/${userId}`);
            commit('setActivities', response.data);
        } catch (error) {
            console.log(error)
        }
    }
};

const mutations = {
    setActivities(activities): void {
        state.activities = activities;
    }
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};