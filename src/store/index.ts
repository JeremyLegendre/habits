import user from './user/user';
import activity from './activity/activity';
import category from './category/category';
import {createStore} from 'vuex';

const store = createStore({
    modules:{
        user: user,
        activity: activity,
        category: category
    }
});

export default store;