import axios from 'axios';

interface Activity {
    id: number;
    parent: number;
    icon: string;
    name: string;
    date: number;
    endDate: number;
    plannedTime: number;
    passedTime: number;
}

interface ActivitiesState {
    activities: Activity[]|null;
}

const state: ActivitiesState = {
    activities: null
};

const getters = {
    getActivities: state =>  {
        return state.activities;
    },
    getActivitiesFromDate: (state) => (date) => {
        if (state.activities !== null && state.activities.length > 0) {
            return state.activities.filter((activity) => {
                const dateDiff = Math.abs(date-activity.date);
                return dateDiff < 86000;
            });
        } else {
            return false;
        }
    }
};

const actions = {
    async getActivities({commit}, userId: number) {
        try {
            const response = await axios.get(`http://www.localhost:8080/api/activities/${userId}`);
            commit('setActivities', response.data);
        } catch (error) {
            console.log(error)
        }
    }
};

const mutations = {
    setActivities(state, activities): void {
        activities.forEach(element => {
            element.endDate = element.endDate ? element.endDate : element.date + element.plannedTime;
        });

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