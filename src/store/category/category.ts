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
    getCategory: (state) => (categoryId) => {
        let category = null;
        if (state.categories && state.subCategories) {
            category = state.categories.filter(element => {
                return element.id == categoryId;
            });

            if (!category.length) {
                category = state.subCategories.filter(element => {
                    return element.id == categoryId;
                });
            }
        }

        return category ? category[0] : false;
    }
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
            return category.parent == 0;
        });

        state.subCategories = categories.filter((category) => {
            return category.parent != 0;
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};