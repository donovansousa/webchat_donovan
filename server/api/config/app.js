
const express = require('express'),
        cors = require('cors'),
        methodOverride = require('method-override'),
        bodyParser = require('body-parser');


const NameSpaceApp =  function () {

    const app = express();

    // suportando put,delete,options,patch....
    app.use(methodOverride('X-HTTP-Method')) //          Microsoft
    app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
    app.use(methodOverride('X-Method-Override')) //      IBM

    // libera o access-control-allow-origin
    app.use(cors());
    app.use(bodyParser({extended:true}));

    // arquivos estáticos
    app.use(express.static('./public'));

    // configura o favicon no middleware
    app.use(function(req,res,next) {
    
        if (req.url.indexOf("favicon") > 0) {
            res.send(200);
        }

        // segue com a requisição
        next();
    });

    return  {
        express:express,
        app:app
    };

}();

module.exports = NameSpaceApp;