
import USER from '../actions/user-action';

let initialState  = {
    user:null,
    username:'',
    password:'',
};

function UserReducer(state = initialState,action) {

    switch (action.type) {

        case USER.CREATE_USER.type:

            return state;
        break;

        case USER.LOGIN.type:

            state.username = action.username;
            state.password = action.password;
            
            return state;
        break;

        default:
         return state;
        break;
    }
}

export default UserReducer;