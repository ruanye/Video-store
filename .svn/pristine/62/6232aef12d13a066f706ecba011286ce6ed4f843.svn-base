$(function() {
    $('.information-address').on('click', function(e) {
        location.href = 'addressManage.html'
    })
    $('.commodity-detail').eq(0).on('click', function(e) {
        location.href = 'shoppingcarlist.html'
    })
    $('.commodity-detail').eq(1).on('click', function(e) {
        location.href = 'myshoplist.html'
    })
    $('.commodity-detail').eq(2).on('click', function(e) {
        location.href = 'prescriptionorder_list.html'
    })
    $('.activity-detail').eq(0).on('click', function(e) {
        location.href = 'my-yuyue.html'
    })
    $('.activity-detail').eq(1).on('click', function(e) {
        location.href = 'my-activeList.html'
    })

});
 islogin();
(function($) {
    //获取个人信息
    $.ajax({
        url: Constants.hostIp + '/weixin/plus/customer/get',
        type: 'get',
        timeout: 5000,
        data: {
            openid: LS.get(Constants.openid)
        },
        success: function(data, status) {
          if (data.status == 0) {
                var resultStr = domStr(data);
                LS.set('custormid', data.customer.id)
                LS.set('userName', data.customer.name);
                LS.set('userTel', data.customer.phone);

                function domStr(result) {
                    var str = '<p class="information-p">' + data.customer.name + '</p>' +
                        '<p class="information-p">' + data.customer.phone + '</p>' +
                        '<div class="information-icon"></div>'
                    return str;
                }
                $('.information-detail').append(resultStr);
                $('.information-detail').on('click', function(e) {
                    var parameurl = encodeURI('personal_information.html?name=' + data.customer.name + '&phone=' + data.customer.phone)
                    location.href = parameurl;
                })
            } else {
                LS.set('custormid', '')
                LS.set('userName', '');
                LS.set('userTel', '');
               
            }
        },
        error: function(err) {

        }
    })
})(window.jQuery)
