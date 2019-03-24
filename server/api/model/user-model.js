
const User = require('../config/models/user');

function UserModel() {};

UserModel.prototype.save = function (user,callback) {

    user.save().then(() => {
        callback();
    }).catch(function(ex) {
        callback(ex);
    })
};

UserModel.prototype.loginAndPasswordIsValid = function (name,password,callback) {

    User.find({name:name,password:password},function(err,data) {

        if (data.length == 0){
            callback();
        }
        else {
            callback(data);
        }
    });
};

module.exports = new UserModel();