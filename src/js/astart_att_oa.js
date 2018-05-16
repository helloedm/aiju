var ajaxProfix = '//acrm.ecbao.cn/staticApi/';

//一个简单的ajax实现
var ajaxHdFn = function (uri, dataStr, type, cb) {
    var getXmlHttpRequest = function () {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHttpRequest");
        }
    };

    var xhr = getXmlHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cb(xhr.responseText);
        }
    };

    xhr.open(type, uri, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhr.send(dataStr);
};

//.ecbao.cn
function aStart_setCookie(name, value, time, domain)
{
    var strsec = aStart_getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    var cookie_str = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    if (domain != '') {
        cookie_str += ";domain=" + domain + ";path=/";
    }
    document.cookie = cookie_str;
}
function aStart_getCookie(name)
{
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    return '';
}
function aStart_delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = aStart_getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}
function aStart_getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}
function aStart_request(name)
{
    new RegExp("(^|&)" + name + "=([^&]*)").exec(window.location.search.substr(1));
    return RegExp.$2
}
function aStart_host_profix() {
    var hostName = top.location.hostname.split('.');
    return hostName[0];
}
function aStart_host_main() {
    var host = top.location.hostname;
    var hostName = host.split('.');
    var length = hostName.length;
    if (length > 2 && host != '127.0.0.1') {
        var mainHost = '';
        for (var i = 1; i < length; i++) {
            mainHost += '.' + hostName[i];
        }
        return mainHost;
    } else {
        return host;
    }
}
function aStart_get_diff_second() {
    var d1 = new Date();
    var newTime = d1.getFullYear() + '/' + (d1.getMonth() + 1) + '/' + d1.getDate() + ' 23:59:59';
    return parseInt((new Date(newTime) - d1) / 1000);
}
function aStart_guser_id() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function astart_setLog(visit_id, user_id) {
    var userFrom = aStart_getCookie('ajtj_from_cookie');
    if (userFrom == '' || userFrom == '0') {
        userFrom = '199';
    }
    
    var appFrom = aStart_host_profix();
    var domain = aStart_host_main();
    var adv_date = aStart_getCookie('ajtj_from_date');

    ajaxHdFn(ajaxProfix + 'reg', 'appFrom=' + appFrom + '&userFrom=' + userFrom + '&visit_id=' + visit_id + '&user_id=' + user_id + '&adv_date=' + adv_date, 'post', function (resJson) {
//        aStart_setCookie('ajtj_reg_cookie', visit_id, 's300', domain);
    }); 

}

astart_setLog(visit_id, user_id);