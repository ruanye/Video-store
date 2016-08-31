var allprice = [];
var alln = [];
var clickflag;
var allcheckshop = [];~

(function($) {

    function getshopcarlist() {
        $.get(Constants.hostIp + 'weixin/plus/shoppingCart', {
            customerId:LS.get('custormid'),
            pageSize: 10,
            pageNo: 1
        }, function(data) {
            var data = data.lst;
            if (!data || data.length == 0) {
                var str = '<li style="text-align:center;border-top: 0.0625rem solid #f3f3f3;margin-top:1rem;color:#333;font-size:0.5rem">您还没有选购商品</li>'
                $('.listcontainer').html(str)
                clickflag = true;
                $('.settlement').css('background', '#d3d3d3');
                return;
            }

            for (var i = 0; i < data.length; i++) {
                var mydata = data[i];
               $('.listcontainer').append(
                    '<li class="list" data-id ="' + mydata.goodsId + '"  data-myid ="' + mydata.id + '" data-kucun="' + mydata.stock + '">' +
                    '<div class="checkbox">' +
                    '<span class="check_x " ck="true"><i class = "iconfont i1">&#xe61f;</i><i class = "iconfont i2">&#xe620;</i></span>' +
                    '</div>' +
                    '<a href="shopdetail.html?id=' + mydata.goodsId + '">' +
                    '<div class="imgbox"><img src="' + mydata.icon + '" alt=""></div>' +
                    '</a>' +
                    '<div class="text">' +
                    '<h4 class="name">' + mydata.goodsName + '</h4>' +
                    '<p class = "guige">规格:' + mydata.specification + '</p>' +
                    '<div class="mynum">' +
                    '<span class="red">-</span>' +
                    '<input class="num" value= "' + mydata.goodsNum + '">' +
                    '<span class="add">+</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="right">' +
                    '<p class="price">￥<span class="oneprice" data-price = "' + mydata.price + '">' + mydata.price + '</span></p>' +
                    '<p class="del">删除</p>' +
                    '</div>' +
                    '</li>');
            }
        });
    }
    getshopcarlist();

    function demo() {

        function alter_alter() {
            $(".num").each(function() {
                var check_ck = $(this).parent().parent().siblings(".checkbox").children(".check_x").attr('ck');
                if (check_ck == 'true') {
                    var money_money = $(this).parent().parent().siblings(".right").children(".price").children(".oneprice").attr('data-price');
                    var shuliang = $(this).val();
                    var sum_money = parseFloat(money_money * shuliang);
                    $(".allvalue-number").text(parseFloat($(".allvalue-number").text()) + sum_money);
                }

            });
        };
        alter_alter();

        function for_for() {
            $(".allvalue-number").text('0.00');
            alter_alter();
        }
        for_for()

        function check_check() {

            $("#allcheck").attr('check', 'true');

            function load_load() {
                $(".check_x").each(function() {
                    if ($(this).attr('ck') == 'false') {
                        $("#allcheck").attr('check', 'false');
                        $("#allcheck").addClass('hassel');

                    };

                });

                if ($("#allcheck").attr('check') == 'true') {
                    $("#allcheck").attr('ck', 'true');
                    $("#allcheck").removeClass('hassel');
                };
            };
            load_load();
        };
        //输入数字逻辑
        $('.num').blur(function(event) {
            var stock = $('.list').attr('data-kucun');

            if (Number($(this).val()) > Number(stock)) {
                $(this).val(stock);
            }
            shopnumber = $(this).val();
            $(this).val(shopnumber);
        });
        $('.num').on('keyup', function(event) {
            var stock = $('.list').attr('data-kucun');

            if (Number($(this).val()) > Number(stock)) {
                $(this).val(stock);
            }
            shopnumber = $(this).val();
            $(this).val(shopnumber);

            event.preventDefault();
        });


        $(".red").click(function() {
            var num_money = $(this).siblings(".num").val();
            var jg_money = $(this).parent().parent().siblings(".right").children(".price").children(".oneprice").attr('data-price');
            if (num_money != 1) {
                $(this).siblings(".num").val(num_money - 1);
                var sum_sum = jg_money * $(this).siblings(".num").val();
                $(this).siblings(".num").attr('luck', sum_sum);
                for_for();
            }
        });

        $(".add").click(function() {
            var jg_money = $(this).parent().parent().siblings(".right").children(".price").children(".oneprice").attr('data-price');
            var num_money = $(this).siblings(".num").val();
            var kucun = $(this).parents('.list').attr('data-kucun') - 1;
            console.log(kucun);
            if (num_money > kucun) {
                num_money = kucun;
            }
            $(this).siblings(".num").val(1 + parseInt(num_money));
            var sum_sum = jg_money * $(this).siblings(".num").val();;
            $(this).siblings(".num").attr('luck', sum_sum);
            for_for();
        });

        $(".check_x").click(function() {

            if ($(this).attr('ck') == 'true') {


                $(this).addClass('hassel');
                $(this).attr('ck', 'false');
                $("#allcheck").attr('ck', 'false');
                check_check();

            } else {
                $(this).removeClass('hassel');
                $(this).attr('ck', 'true');
                check_check();
            }

            for_for()
        });

        $("#allcheck").click(function() {
            if ($(this).attr('ck') == 'true') {

                $(".check_x").addClass('hassel');
                $(this).addClass('hassel');
                $(this).attr('ck', 'flase');
                $(".check_x").attr('ck', 'false');
                for_for()
            } else {
                $(".check_x").removeClass('hassel');
                $(this).removeClass('hassel');
                $(this).attr('ck', 'true');
                $(".check_x").attr('ck', 'true');
                for_for()
            }
        });

        //购物车删除
        $('.listcontainer').on('touchend', '.del', function(event) {
            var num = $(this).parents('.list').find('.num').val();
            var one = $(this).parents('.list').find('.oneprice').html();
            var all = parseFloat(num * one).toFixed(2);
            all = Number(all);

            var allvaluenumber = parseFloat($('.allvalue-number').html()).toFixed(2);
            allvaluenumber = Number(allvaluenumber);
            distance = parseFloat(allvaluenumber - all).toFixed(2);
            distance = Number(distance);
            $('.allvalue-number').html(distance);


            var that = $(this);
            var goodid = $(this).parents('.list').attr('data-myid');
            data = {
                ids: goodid,
                customerId: LS.get('custormid')

            }

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
                        that.parents('.list').remove();
                    }


                }
            });

            return false;
        });


    };
    setTimeout(demo, 500);

    //去结算按钮
    $('.settlement').on('click', function(event) {

        islogin();
        if (clickflag) {
            return;
        }
        //遍历复选框 看选中的商品
        var oneprice = $('.check_x');
        $.each(oneprice, function(index, val) {
            var index = index;
            var id = $(this).parents('.list').attr('data-id');
            icon = $(this).parents('.list').find('img').attr('src');
            name = $(this).parents('.list').find('.name').html();
            shopnumber = $(this).parents('.list').find('.num').val();
            guige = $(this).parents('.list').find('.guige').html();
            oprice = $(this).parents('.list').find('.oneprice').attr('data-price');
            shopId = $(this).parents('.list').attr('data-myid');
            shopobj = {
                id: id,
                icon: icon,
                name: name,
                oprice: oprice,
                shopnumber: shopnumber,
                guige: guige,
                shopId: shopId
            };
            if ($(this).attr('ck') == 'true') {
                allcheckshop.push(shopobj);
            }
            SS.setObj('sureshoporderlist', allcheckshop);


        });


        if ($('.listcontainer .list').length == 0 || !SS.getObj('sureshoporderlist')[0]) {
            $.alerts({
                title: "提示",
                contentText: "您还没有选中任何商品",
                callback: function() {
                    var timer = setTimeout(function() {
                        $('.alert-mask').hide();
                    }, 1000)
                },
            });
            return;
        }


        //跳转到结算页
        window.location.href = 'sureorder.html';

        event.preventDefault();
    });



})(window.jQuery);
