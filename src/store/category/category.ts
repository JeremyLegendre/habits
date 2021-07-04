import categoryService from '../../services/category';

const state = {
    categories: null,
    subCategories: null,
};

const getters = {
    getCategories: state =>  {
        return state.categories;
    },
    getSubCategories: state =>  {
        return state.subCategories;
    },
};

const actions = {
    async getCategories({commit}) {
        try {
            const categories = await categoryService.getCategories();
            if (categories) {
                commit('setCategories', categories);
            }
        } catch (error) {
            console.log(error)
        }
    },
};

const mutations = {
    setCategories(state, categories): void {
        // this type of treatment should be done by dbb
        state.categories = categories.filter((category) => {
            return category.parent == 0 ? true : false
        });

        state.suCategories = categories.filter((category) => {
            return category.parent !== 0 ? true : false
        })
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};