var urlData = GetRequest();
//我的商品订单列表
data1 = {
    customerId:LS.get('custormid'),
    pageNo: 1,
    pageSize: 10,
}

function getAjax(data1) {
    $.ajax({
        url: Constants.hostIp + 'weixin/plus/order',
        type: 'get',
        data: data1,
        timeout: 5000,
        success: function(data) {
            // 判断是否有订单存在
            if (data.lst && !data.lst.length) {
                var str = '<li style="text-align:center;border-top: 0.0625rem solid #f3f3f3;margin-top:1rem;font-size:0.5rem">您还没有商品订单</li>'
                $('#queryone').html(str);
            }
            if (data.status != 0) {
                var str = '<li style="text-align:center;border-top: 0.0625rem solid #f3f3f3;margin-top:1rem;font-size:0.5rem">您还没有商品订单</li>'
                $('#queryone').html(str);
            }
            //滚动加载
            if (data.pageNo == data.pages) {
                $(document.body).destroyInfinite();
            } else {
                $(document.body).infinite();
            }
            $('.weui-infinite-scroll').hide()

            function domStr(result) {
                var instr = '';
                switch (result.state) {
                    case 1:
                        instr = '待付款';

                        break;
                    case 2:
                        instr = '待发货';
                        break
                    case 3:
                        instr = '待收货 ';
                        break;
                    case 4:
                        instr = '已完成 ';
                        break;
                    case 5:
                        instr = '已退单 ';
                        break; 
                    case 6:
                        instr = '已失效';
                        break;
                }
                var str =
                    '<li class="list" data-state = "' + result.state + '"  data-id = "' + result.id + '">' +
                    '<div class="status_bar">' +
                    '<div class="bartext">' +
                    '<p>状态：<span class="zt">' + instr + '</span></p>' +
                    '<p>总价：<span class="nprice">￥' + result.totalFee + '</span></p>' +
                    '</div>' +
                    '<span class="barstaus">付款</span>' +
                    '</div>' +
                    '<div class="gooodlist1">' + '' + shopstri + ''
                '</div>' +
                    '</li>';
                return str;
            }
            var data = data.lst;
            if (!data) {
                return
            }
            var Stri = '';
            for (var i = 0; i < data.length; i++) {
                var shoplists = data[i].goodslists;

                var shopstri = '';
                for (var j = 0; j < shoplists.length; j++) {
                    var shoplist = shoplists[j];
                    var temp = shopstr(shoplist);
                    shopstri += temp;
                }


                var temp = domStr(data[i]);
                Stri += temp;

            }

            $('#queryone').append(Stri);
            //商品列表
            function shopstr(shoplist) {
                var shopstr =
                    '<div class="goods">' +
                    '<div class="gimg"><img src="' + shoplist.goodsIcon + '" alt=""></div>' +
                    '<div class="gtext" style="margin-left:0;margin-top:0">' +
                    '<p class="title" style="margin-left:0.5rem">' + shoplist.goodsName + '</p>' +
                    '<p style="margin-left:0.5rem">' +
                    '<span class="timetext" style="margin-left:0">' + shoplist.number + '件</span>' +
                    '<span class="timetext">单价</span>' +
                    '<span class="timetext">¥' + shoplist.dealPrice + '</span>' +
                    '</p>' +
                    '</div>' +
                    '</div>';
                return shopstr
            };
            //显示付款按钮
            var list = $('#queryone .list');
            $.each(list, function(index, val) {
                if ($(this).attr('data-state') == 1) {
                    $(this).find('.barstaus').css('display', 'block')
                }
            });

        },
        error: function(err) {
            console.log(err);
        }
    })
}
getAjax(data1);
$(document.body).infinite();
var loading = false; //状态标记

$(document.body).infinite().on("infinite", function() {
    if (loading) return;
    loading = true;
    $('.weui-infinite-scroll').show()
    data1.pageNo++;
    $(document.body).destroyInfinite();
    setTimeout(function() {
        getAjax(data1, function() {
            $('.weui-infinite-scroll').hide()
        });
        loading = false;
    }, 1500);

});


var data2 = {
    customerId: LS.get('custormid'),
    pageNo: 1,
    pageSize: 10,
    state: 1

}

//未付款定单
function getAjax2(data2) {
    $.ajax({
        url: Constants.hostIp + 'weixin/plus/order',
        type: 'get',
        data: data2,
        timeout: 5000,
        success: function(data) {
            // 判断是否有订单存在
            if (data.lst && !data.lst.length) {
                var str = '<li style="text-align:center;border-top: 0.0625rem solid #f3f3f3;margin-top:1rem;font-size:0.5rem">您还没有商品订单</li>'
                $('#querytwo').html(str);
            };
            if (data.status != 0) {
                var str = '<li style="text-align:center;border-top: 0.0625rem solid #f3f3f3;margin-top:1rem;font-size:0.5rem">您还没有商品订单</li>'
                $('#querytwo').html(str);
            }
            //滚动加载条件
            if (data.pageNo == data.pages) {
                $(document.body).destroyInfinite();
            } else {
                $(document.body).infinite();
            }
            $('.weui-infinite-scroll').hide();

            function domStrone(result) {

                var str =
                    '<li class="list" data-state = "' + result.state + '"  data-id = "' + result.id + '">' +
                    '<div class="status_bar">' +
                    '<div class="bartext">' +
                    '<p>状态：<span class="zt">待付款</span></p>' +
                    '<p>总价：<span class="nprice">￥' + result.totalFee + '</span></p>' +
                    '</div>' +
                    '<span class="barstaus" style ="display:block">付款</span>' +
                    '</div>' +
                    '<div class="gooodlist2">' + '' + shopstri + ''
                '</div>' +
                    '</li>';
                return str;

            }
            var data = data.lst;
            var Strione = '';
            if (!data) {
                return
            }
            for (var i = 0; i < data.length; i++) {
                var result = data[i];
                var shoplists = result.goodslists;

                var shopstri = '';
                for (var j = 0; j < shoplists.length; j++) {
                    var shoplist = shoplists[j];
                    var temp = shopstr(shoplist);
                    shopstri += temp;
                }

                var temp = domStrone(data[i]);
                Strione += temp;
            }
            $('#querytwo').append(Strione);
            //商品列表
            function shopstr(shoplist) {
                var shopstr =
                    '<div class="goods">' +
                    '<div class="gimg"><img src="' + shoplist.goodsIcon + '" alt=""></div>' +
                    '<div class="gtext" style="margin-left:0;margin-top:0">' +
                    '<p class="title" style="margin-left:0.5rem">' + shoplist.goodsName + '</p>' +
                    '<p style="margin-left:0.5rem">' +
                    '<span class="timetext" style="margin-left:0">' + shoplist.number + '件</span>' +
                    '<span class="timetext">单价</span>' +
                    '<span class="timetext">¥' + shoplist.dealPrice + '</span>' +
                    '</p>' +
                    '</div>' +
                    '</div>';
                return shopstr
            }

        },
        error: function(err) {
            console.log(err);
        }
    })
}
getAjax2(data2);
$(document.body).infinite();
var loading = false; //状态标记

$(document.body).infinite().on("infinite", function() {
    if (loading) return;
    loading = true;
    $('.weui-infinite-scroll').show()
    data2.pageNo++;
    $(document.body).destroyInfinite();
    setTimeout(function() {
        getAjax(data2, function() {
            $('.weui-infinite-scroll').hide()
        });
        loading = false;
    }, 1500);

});
// 全部订单跳转到详情
$('.boxquery').on('click', '.gooodlist1', function(event) {

    var id = $(this).parents('.list').attr('data-id');
    var locltionurl = 'orderdetail.html?id=' + id;

    window.location.href = locltionurl;
    return false;
    /* Act on the event */
});
//未付款订单点击跳转到详情
$('.boxquery').on('click', '.gooodlist2', function(event) {

    var id = $(this).parents('.list').attr('data-id');
    var locltionurl = 'orderdetail.html?id=' + id;

    window.location.href = locltionurl;
    return false;
    /* Act on the event */
});
//获取ip
$.post('http://synsunny.parsec.com.cn/Dorado/ip/address',function(data,status){
    document.querySelector("#keleyivisitorip").innerHTML= data.host
})
//未支付成功的订单,重新支付
var payflag = false;
$('.boxquery').on('click', '.barstaus', function(event) {
    console.log(payflag)
    var id = $(this).parents('.list').attr('data-id');
    var data = {
        id: id,
        ip: document.querySelector('#keleyivisitorip').innerHTML,
        openid: LS.get(Constants.openid),
        customerId: LS.get('custormid')
    }
    if (payflag) {
        return;
    }
    payflag = true;
    $.ajax({
        url: Constants.hostIp + 'weixin/plus/order/pay',
        type: 'post',
        data: data,
        timeout: 5000,
        success: function(data, status) {
            if (data.status != 0) {
                $.alerts({
                    title: "提示",
                    contentText: data.msg,
                    callback: function() {
                        var timer = setTimeout(function() {
                            $('.alert-mask').hide();
                        }, 1500)
                    },
                });
            } else {
                var data = data;
                var orderId = data.id;
                js_params = data;
                paybill(function() {
                    location.reload();
                }, function() {
                   payflag =false;
                });
            }


        },
        error: function(err) {
            console.log(err);
        }
    })
});