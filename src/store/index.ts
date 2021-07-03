import user from './user/user';
import activity from './activity/activity';
import {createStore} from 'vuex';

const store = createStore({
    modules:{
        user: user,
        activity: activity
    }
});

export default store;