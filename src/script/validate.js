'use strict';
exports.validate = {

    Email :/^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/,//比选项（返回 true为必选，返回false 为可选）
    
    Phone :/^(((d{3}))|(d{3}-))?((0d{2,3})|0d{2,3}-)?[1-9]d{6,7}$/,//电话格式验证
    
    // Mobile :/^(((d{3}))|(d{3}-))?13d{9}$/,//电话号码格式验证
    
    Mobile :/(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^1[0-9]{10}$)/,//电话号码格式验证                                  
    
    Url :/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,//页面地址格式
    
    IdCard :/^d{15}(d{2}[A-Za-z0-9])?$/,//卡号验证
    
    Currency :/^d{1,4}(.d{1,2})?$/,//价格验证
    
    Number :/^d+$/,//编号
    
    Zip :/^[1-9]d{5}$/,//邮政编码判断
    
    QQ :/^[1-9]d{4,8}$/,//qq格式判断
    
    Integer :/^[-+]?d+$/,//只能输入整形
    
    Double :/^[-+]?d+(.d+)?$/,//只能输入浮点型
    
    English :/^[A-Za-z]+$/,//只能输入英语啊
    
    Chinese :/^[u0391-uFFE5]+$/,///只能输入汉字
    
    EnglishOrChinese :/^(w|[u4E00-u9FA5])*$/, 
    
    EngOrChnOrInt :/.*$/, 
    
    Ip :/^((((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).)((([d])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).){2}((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))))~((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).)((([d])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).){2}((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4]))))))|(((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).)((([d])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).){2}((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))))))(;((((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).)((([d])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).){2}((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4]))))))|(((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).)((([d])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).){2}((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))))~((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).)((([d])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4])))).){2}((([1-9])|([1-9]d)|((1d{2})|(2([0-4]d)|2(5[0-4]))))))))*[;]?$/,
    
    MulticastIp :/^(22[4-9]|23[0-9])(.(d{1,2}|1dd|2[0-4]d|25[0-5])){3}$/,
    
    MulticastPort :/^([0-9]|[1-5]d{1,4}|[6-9]d{1,3}|6553[0-6]|655[0-2]d|65[0-4]d{2}|6[0-4]d{3})$/,
    
    Mac :/^((([A-Fd]{2}-){5}[A-Fd]{2}~([A-Fd]{2}-){5}[A-Fd]{2})|(([A-Fd]{2}-){5}[A-Fd]{2}))(;((([A-Fd]{2}-){5}[A-Fd]{2})|(([A-Fd]{2}-){5}[A-Fd]{2}~([A-Fd]{2}-){5}[A-Fd]{2})))*[;]?$/,
    
    UnSafe :/^(([A-Z]*|[a-z]*|d*|[-_~!@#$%^&*.()[]{}<>?\/'"]*)|.{0,5})$|s/,
    
    //NumOrString :/^[A-Za-z0-9]+$/,
    
    NumOrString :/^(w) | (W)$/ ,                                                               
    
    zipType :/.zip$/, //判断格式是ZIP格式
    
    imgType :/.(jpg|png|gif)$/,
    
    jpgType :/.(jpg)$/,
    
    time :/^((0?d|1[0-9]|2[0-3])|((0?d|1[0-9]|2[0-3]):(0?d|[0-5]d)(:(0?d|[0-5]d)){0,1}))$/,
    
    Port :/^[1-9]d{0,4}$/,
    
    Age :/^[1-9]d{3}$/,//验证年代 
    
    ErrorItem : [ document.forms[0] ],
    
    Password:/^[wW]{6,}$/,//至少6位字符
    
    Notnull:/^[wW]{1,}$/,//至少1位字符
}