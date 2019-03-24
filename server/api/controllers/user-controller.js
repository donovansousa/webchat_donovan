
const UserModel = require('../model/user-model');
const User = require('../config/models/user');
const fs = require('fs');
const util = require('../config/util');

function UserController() {};

UserController.prototype.insert = function (req,res) {

    try {

        if (!req.body.name || !req.body.password || !req.body.mail) {
            res.status(400);
            res.send('Corpo da requisição inválido!');
            return;
       }   

        // verifica se o login existe
        let userExists =  new Promise(function(resolve,reject) {

            User.find({name:req.body.name},function(err,data) {

                if (data.length == 0) {
                    resolve();
                }
                else {
                  reject('Usuário já utilizado. Tente outro!');
                }  
            });
        });

        // verifica se o e-mail existe
        let mailExists =  new Promise(function(resolve,reject) {

            User.find({mail:req.body.mail},function(err,data) {

                if (data.length == 0) {
                    resolve();
                }
                else {
                  reject('E-mail já utilizado. Tente outro!');
                }  
            });
        });

        // se todas as promises estiverem ok, entao salvo usuario.
        Promise.all([userExists,mailExists]).then(function() {

            const user = new User({
                name:req.body.name,
                password:req.body.password,
                mail: req.body.mail
            });

            UserModel.save(user,function(data) {

                if (data != null) {
                     throw new Error(data);
                }
                else {
                    res.status(201);
                    res.send();
                }

            });

        }).catch((ex) => {
            res.status(422);
            res.send(ex); 
        });
    }
    catch(ex) {
        util.responseInternalServerError(req,res);
    }
};

UserController.prototype.loginAndPasswordIsValid = function (req,res) {

    try {

        UserModel.loginAndPasswordIsValid(req.params.name,req.params.password,function(result) {

            if (!result) {
                
                res.status(404);
                res.send('Usuário/Senha inválido!');
            }
            else {
                res.status(200);
                res.send();
            };

        });
    }
    catch(ex) {
        util.responseInternalServerError(req,res);
    }    
};

module.exports = new UserController();