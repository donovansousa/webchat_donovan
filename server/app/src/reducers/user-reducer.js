
import USER from '../actions/user-action';
import {IP as ip} from '../services/server-access-configuration';

let initialState  = {
    user:null,
    username:'',
    password:'',
    mail:'',
    callback:'',
};

function UserReducer(state = initialState,action) {

    switch (action.type) {

        case USER.CREATE_USER.type:

            state.username = action.User.username;
            state.password = action.User.password;
            state.mail = action.User.mail;

            var user = {
                name:state.username,
                password:state.password,
                mail:state.mail
            };

            var url = `${ip}/api-v1/users/`;

            var ajax = new XMLHttpRequest();
            ajax.open('POST',url,true);
            ajax.setRequestHeader('Content-Type','application/json');
            ajax.send(JSON.stringify(user));
    
            ajax.onreadystatechange = function () {
    
                if (ajax.readyState === 4) {
                    action.User.callback(ajax.status,ajax.responseText);
                }  
            };

            return state;
        break;

        case USER.LOGIN.type:

            state.username = action.username;
            state.password = action.password;

            var url = `${ip}/api-v1/users/${state.username}/${state.password}`;

            var ajax = new XMLHttpRequest();
            ajax.open('GET',url,true);
            ajax.setRequestHeader('Content-Type','text/plain');
            ajax.send();
    
            ajax.onreadystatechange = function () {
    
                if (ajax.readyState === 4) {
                    action.callback(ajax.status,ajax.responseText);
                }  
            };
          
            return state;
 
        break;

        default:
         return state;
        break;
    }
}

export default UserReducer;