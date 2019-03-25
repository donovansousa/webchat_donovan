
import loading from '../assets/imgs/loading.gif';
import '../assets/css/loading.scss';

var $ = require('jquery');

function showLoading() {

    var img = new Image();
    img.src = loading;
    img.className = 'loading';

    var div = $("<div/>");
    div.addClass("divLoading-container");
    div.append(img);
    div.attr('id','divLoading');

    $("body").append(div);
};

function closeLoading() {
    $("div#divLoading").animate({"opacity":"0"},500,function() {
        $(this).detach();
    });
}

 var obj =   {
    showLoading:showLoading,
    closeLoading:closeLoading
}

export default obj;