

const fs = require('fs');

function responseInternalServerError(req,res) {
 
        var format = {
            message:'Erro ao realizar operação! Tente novamente mais tarde.'
        };
    
        res.status(500);
        res.json(format);
}

module.exports =  {
    responseInternalServerError:responseInternalServerError
}