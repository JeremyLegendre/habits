import activityService from '../../services/activity';

interface Activity {
    id: number;
    category: number;
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
                return activity.date > date && activity.date < (date + 86400000);
            });
        } else {
            return false;
        }
    }
};

const actions = {
    async getActivities({commit}, userId: number) {
        try {
            const activities = await activityService.getActivities(userId);
            if (activities) {
                commit('setActivities', activities);
            }
        } catch (error) {
            console.log(error)
        }
    },
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