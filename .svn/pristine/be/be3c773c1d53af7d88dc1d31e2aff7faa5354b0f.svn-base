/**
 * Created by zpj on 15/11/18.
 */
/**
 * 准备微信JS支付所必须的参数
 */

/**
 * 发起JS支付
 * @param url 请求url
 */
 var js_params;
function paybill(cb,cp) {
    //if (!pay_ok)
    //    return;
    // if (pay_ok) {
    // wx.chooseWXPay({
    // timestamp : js_params.timestamp, //
    // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    // nonceStr : js_params.nonce_str, // 支付签名随机串，不长于 32 位
    // package : js_params.package, //
    // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
    // signType : 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    // paySign : js_params.paySign, // 支付签名
    // success : function(res) {
    // // 支付成功后的回调函数
    // WX.alertMsg('支付成功');
    // }
    // });
    // }

    WeixinJSBridge.invoke('getBrandWCPayRequest', {
        "appId" : jsticket.appId, // 公众号名称，由商户传入
        "timeStamp" : js_params.timestamp, // 时间戳，自1970年以来的秒数
        "nonceStr" : js_params.nonce_str, // 随机串
        "package" : js_params.package,
        "signType" : "MD5", // 微信签名方式:
        "paySign" : js_params.paySign
        // 微信签名
    }, function(res) {
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
        if (res.err_msg == "get_brand_wcpay_request:ok") {
            //支付成功
            cb&&cb()
        }else{
            cp&&cp()
        }
    });
}
