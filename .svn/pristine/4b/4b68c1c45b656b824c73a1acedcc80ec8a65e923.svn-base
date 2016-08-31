var urlData = GetRequest();
var shopArrays = SS.getObj('sureshoporderlist');
var goodArrayId = [];
addressList(function(str) {
    $('.address').html(str);
})


//获取默认地址
$.ajax({
    url: Constants.hostIp + 'weixin/plus/address/list',
    type: 'get',
    data: {
        customerId: LS.get('custormid')
    },
    timeout: 5000,
    success: function(data, status) {
        var results = data.lst;
        var defaultObj = {};
        //拼接所有地址
        if (!results) {
            str = "<p class='noAddresss'>暂无地址，请编辑</p>";
            $('.address').append(str);
            return
        }

        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            if (result.isDefault == 1) {
                defaultObj = result;
                break;
            } else {
                defaultObj = results[0];
            }
        }
        if (defaultObj.linkman || defaultObj.linkphone || defaultObj.content) {
            var str =
                '<img class="addicon" src="images/1/address-icon.png" alt="">' +
                '<p class="ad n">' + defaultObj.linkman + '<span>' + defaultObj.linkphone + '</span></p>' +
                '<p class="ad">' + defaultObj.content + '</p>';
        } else {
            str = "<p class='noAddresss'>暂无地址，请编辑</p>";
        }

        $('.address').append(str);
        $('.address').attr('defaultid', '' + defaultObj.id + '');

    },
    error: function(err) {
        console.log(err);
    }
})
if (urlData.id) {

    //id存在
    var tatalPrice; //定义总价

    function domStr(result) {
        if (urlData.price) {
            lastprice = urlData.price;
        } else {
            lastprice = result.price
        }

        var str =
            '<div class="goods">' +
            '<div class="gimg">' +
            '<img src="' + result.icon + '" alt="">' +
            '</div>' +
            '<div class="gtext">' +
            '<p class="title">' + result.name + '</p>' +
            '<p>' + result.introduction + '</p>' +
            '</div>' +
            '<div class="gtext rtext">' +
            '<p class="title" >¥' + lastprice + '</p>' +
            '<p style="text-align:right">×' + urlData.goodnumber + '</p>' +
            '</div> ' +
            '</div>'
        return str;
    }
    $.ajax({
        type: "get",
        url: Constants.hostIp + 'weixin/goods/' + urlData.id,
        dataType: "json",
        success: function(res) {
            var result = res.obj;
            $('.list').append(domStr(result));
            if (urlData.price) {
                tatalPrice = urlData.goodnumber * urlData.price;
            } else {
                tatalPrice = urlData.goodnumber * result.price;
            }

            var str = '共' + urlData.goodnumber + '件商品&nbsp;&nbsp;&nbsp;&nbsp;总金额 <span>¥' + tatalPrice + '</span>';
            $('#total').html(str);
            $('.moneyi .one').html('￥' + tatalPrice + '');
            var yunfei = parseFloat($('#yunfei').html());
            var zongji = tatalPrice + yunfei;
            zongji = Number(zongji);
            zongji = toDecimal2(zongji)

            $('.allprice span').html('￥' + '' + zongji + '')
            goodArrayId = [{
                goodsId: urlData.id,
                number: urlData.goodnumber
            }];

            //获取默认配置
            //获取缓存的运费
            var yunfeiHtml = SS.get('ssyunfei');
            var myf = SS.get('smyufei');
            console.log(tatalPrice);
            var myunfei = SS.get('smyufei');

            if (tatalPrice >= myf) {
                yunfeiHtml = 0;
            }

            $('#yunfei').html('' + yunfeiHtml + '');
            zongji = Number(yunfeiHtml) + Number(tatalPrice);
            zongji = Number(zongji);
            zongji = toDecimal2(zongji);
            $('.allprice span').html('￥' + '' + zongji + '')
                //获取结束
        }
    });



} else {
    //id不存在
    var tatalPrice; //定义总价
    function domStrmy(shopArray) {
        var str =
            '<div class="goods">' +
            '<div class="gimg"><img src="' + shopArray.icon + '" alt=""></div>' +
            '<div class="gtext">' +
            '<p class="title">' + shopArray.name + '</p>' +
            '<p>规格：' + shopArray.guige + '</p>' +
            '</div>' +
            '<div class="gtext rtext">' +
            '<p class="title">¥' + shopArray.oprice + '</p>' +
            '<p style="text-align:right">×' + shopArray.shopnumber + '</p>' +
            '</div> ' +
            '</div>'
        return str;
    }
    var nstr = '';
    var allnum = [];
    var allopricarray = [];
    if (shopArrays && shopArrays.length) {
        for (var i = 0; i < shopArrays.length; i++) {
            var shopArray = shopArrays[i];

            var goodid = shopArray.id;
            var shopnumber = shopArray.shopnumber;
            var alloprice = parseFloat(shopArray.shopnumber * shopArray.oprice).toFixed(2);
            alloprice = Number(alloprice);
            allnum.push(shopnumber);
            allopricarray.push(alloprice);

            var dataobj = {
                goodsId: goodid,
                number: shopnumber
            }


            goodArrayId.push(dataobj);
            var temp = domStrmy(shopArray);
            nstr += temp
        }

        $('.list').append(nstr);
    };
    //获取缓存的运费
    var tatalPrice = eval(allopricarray.join('+'));
    var yunfeiHtml = SS.get('ssyunfei');
    var myf = SS.get('smyufei');

    var myunfei = SS.get('smyufei');
    if (tatalPrice > myf) {
        yunfeiHtml = 0;
    }
    $('#yunfei').html('' + yunfeiHtml + '');
    zongji = Number(yunfeiHtml) + Number(tatalPrice);
    zongji = Number(zongji);
    zongji = toDecimal2(zongji);
    $('.allprice span').html('￥' + '' + zongji + '')
        //获取结束

    //获取默认配置

    $.ajax({
        url: Constants.hostIp + 'weixin/index/imgs',
        type: 'get',
        timeout: 5000,
        success: function(data) {

            if (data.status == 0) {

                data.delivery = data.delivery || 10;
                data.delivery = toDecimal2(data.delivery);
                freeDelivery = data.freeDelivery;
                $('#yunfei').html(data.delivery);
                var yunfei = data.delivery;

                //html显示总价 商品件数
                var allnumvarl = eval(allnum.join('+')) || 0;
                var tatalPrice = eval(allopricarray.join('+'));
                tatalPrice = Number(parseFloat(tatalPrice).toFixed(2)) || 0;
                var str = '共' + allnumvarl + '件商品&nbsp;&nbsp;&nbsp;&nbsp;总金额 <span>¥' + tatalPrice + '</span>';
                $('#total').html(str);
                $('.moneyi .one').html('￥' + tatalPrice + '');
                if (tatalPrice >= freeDelivery) {
                    yunfei = 0;
                    $('#yunfei').html('0.00');
                }
                var zongji = Number(yunfei) + Number(tatalPrice);
                zongji = Number(zongji);
                zongji = toDecimal2(zongji);

                $('.allprice span').html('￥' + '' + zongji + '')

            }

        },
        error: function(err) {}
    })
}
var payflag = false;
if (urlData.activeId) {
    activityId = urlData.activeId
} else {
    activityId = null;
}
//获取ip
$.post('http://synsunny.parsec.com.cn/Dorado/ip/address', function(data, status) {
    document.querySelector("#keleyivisitorip").innerHTML = data.host
})
$('#sureorder').on('click', function(event) {

    if (payflag) {
        return;
    }
    if ($('.address').attr('defaultid') == 'undefined') {
        $.alerts({
            title: "提示",
            contentText: "请先添加地址后再购买",
            callback: function() {
                var timer = setTimeout(function() {
                    $('.alert-mask').hide();
                }, 1000)
            },
        });
        return;
    }
    var remark = $('.Remark input').val();
    var cusAddressId = $('.address').attr('defaultid');
    var mytype;
    if (urlData.price) {
        mytype = 1;
    } else {
        mytype = 2;
    }

    var data = {
        cusAddressId: cusAddressId,
        customerId: LS.get('custormid'),
        goodslists: goodArrayId,
        ip: document.querySelector('#keleyivisitorip').innerHTML,
        openid: LS.get(Constants.openid),
        remark: remark,
        type: mytype,
        activityId: activityId
    };

    var data = JSON.stringify(data);

    $.ajax({
        type: "post",
        contentType: 'application/json; charset=utf-8',
        url: Constants.hostIp + 'weixin/plus/order',
        data: data,
        dataType: "json",
        success: function(data, status) {
            console.log(data);
            if (data.status != 0) {
                var msg = data.msg;
                $.alerts({
                    title: "提示",
                    contentText: msg,
                    callback: function() {
                        var timer = setTimeout(function() {
                            $('.alert-mask').hide();
                        }, 1000)
                    },
                });
            }

            deleteSelectShop(); //删除购物车的商品
            console.log(data);
            var orderId = data.object.id;
            js_params = data.object;

            paybill(function() {
                payflag = true;
                window.location.href = 'orderdetail.html?id=' + orderId;
            }, function() {
                payflag = true;
                if (mytype == 2) {
                    window.location.href = 'orderdetail.html?id=' + orderId;
                }
            });

        }.bind(this),
        error: function(err) {
            // alert('err')
        }
    });
});

function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}
//购物车结算删除选中的商品
function deleteSelectShop() {
    var shoppingArray = SS.getObj('sureshoporderlist');
    console.log(shoppingArray);
    var idarray = [];
    if (shoppingArray == null) {

        return;

    } else {
        for (var i = 0; i < shoppingArray.length; i++) {
            idarray.push(shoppingArray[i].shopId);
        }
    }
    var data = {
        ids: idarray.join(','),
        customerId: LS.get('custormid')
    };
    $.ajax({
        url: Constants.hostIp + 'weixin/plus/delShoppingCart',
        type: 'GET',
        data: data,
        dataType: 'json',
        success: function(result) {
            if (result.status != 0) {
                $.alerts({
                    title: "提示",
                    contentText: result.msg,
                    callback: function() {
                        var timer = setTimeout(function() {
                            $('.alert-mask').hide();
                        }, 1000)
                    },
                });
            } else {
                console.log(result);
            }
        }
    });
}
