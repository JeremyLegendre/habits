import user from './user/user';
import {createStore} from 'vuex';
 
const store = createStore({
    modules:{
        user: user
    }
});
 
export default store;