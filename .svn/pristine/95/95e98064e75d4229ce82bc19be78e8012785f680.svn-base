(function($) {
    var nameval = GetRequest()['name']
    var phoneval = GetRequest()['phone'];
    //跳转的源地址
    var targeturl = SS.get('targeturl');
    if (nameval) {
        nameval = decodeURI(nameval);
        $('.name').val(nameval);
    }
    if (phoneval) {
        $('.phone').val(phoneval);
    }
    //没有客户id，按钮文字显示为注册
    if(LS.get('custormid') ==''){
     $('.btn-save').html('注册')
   }
//获取个人信息
    $.ajax({
        url: Constants.hostIp + '/weixin/plus/customer/get',
        type: 'get',
        timeout: 5000,
        data: {
            openid: LS.get(Constants.openid)
        },
        success: function(data, status) {
            console.log(data);
            if (data.status == 0) {
                LS.set('custormid', data.customer.id)
                LS.set('userName', data.customer.name);
                LS.set('userTel', data.customer.phone);
            } else {
                LS.set('custormid', '')
                LS.set('userName', '');
                LS.set('userTel', '');
            }
        },
        error: function(err) {

        }
    })

    $('.btn-save').on('click', function(event) {
        var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        var name = $('.name').val();
        var phone = $('.phone').val();
        if (!name) {
            $('.errinfo').html('客户名称不能为空');
            return;
        };
        if (!reg.test(phone)) {
            $('.errinfo').html('请输入正确的电话号码');
           return;
       }
        if (LS.get('custormid') != '') {
            var data = {
                customerId: LS.get('custormid'),
                id: LS.get('custormid'),
                name: name,
                phone: phone,
                openid: LS.get(Constants.openid)
            };
            $.ajax({
                url: Constants.hostIp + 'weixin/plus/customer',
                type: 'post',
                timeout: 5000,
                data: data,
                success: function(data, status) {
                    if (status == "success" && data.status == 0) {
                        $.alerts({
                            title: "提示",
                            contentText: "成功",
                            callback: function() {
                                var timer = setTimeout(function() {
                                    $('.alert-mask').hide();
                                }, 1000)
                            },
                        });
                        var custormid = data.id;
                        var token = data.token;
                        LS.set('token', token);
                        LS.set('custormid', custormid);
                        LS.set('userName', data.name);
                        LS.set('userTel', data.phone);
                        setTimeout(function() {
                            window.location.href = 'personal_center.html'
                        }, 1000);
                    } else {
                        $.alerts({
                            title: "提示",
                            contentText: data.msg,
                            submitText: "确认",
                            submitClass: "btn-submit",
                            cancleText: "取消",
                            cancleClass: "btn-cancle",
                            callback: function(index, item) {
                                setTimeout(function() {
                                    item.remove()
                                }, 1500)
                            }
                        })
                    }
                },
                error: function(err) {
                  
                }
            })
        } else {
            //没有客户id。新用户注册
            var data = {
                name: name,
                phone: phone,
                openid: LS.get(Constants.openid)
            };
            $.ajax({
                url: Constants.hostIp + 'weixin/customer',
                type: 'post',
                timeout: 5000,
                data: data,
                success: function(data, status) {
                    if (status == "success" && data.status == 0) {
                        var custormid = data.id;
                        var token = data.token;
                        LS.set('token', token);
                        LS.set('custormid', custormid);
                        LS.set('userName', data.name);
                        LS.set('userTel', data.phone);
                        $.alerts({
                            title: "提示",
                            contentText: '注册成功',
                            submitText: "确认",
                            submitClass: "btn-submit",
                            cancleText: "取消",
                            cancleClass: "btn-cancle",
                            callback: function(index, item) {
                                setTimeout(function() {
                                    if(targeturl!=''){
                                        window.location.href = targeturl;                         
                                    }else{
                                        window.location.href = 'personal_center.html';                            
                                    }
                                    item.remove()
                                }, 1500)
                            }
                        })      
                    } else {
                        $.alerts({
                            title: "提示",
                            contentText: data.msg,
                            submitText: "确认",
                            submitClass: "btn-submit",
                            cancleText: "取消",
                            cancleClass: "btn-cancle",
                            callback: function(index, item) {
                                setTimeout(function() {
                                    item.remove()
                                }, 1500)
                            }
                        })                       
                    }
                },
                error: function(err) {
                   
                }
            })
        }
        event.preventDefault();
    });


})(window.jQuery)