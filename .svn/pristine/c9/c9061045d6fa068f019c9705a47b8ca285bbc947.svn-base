~
(function($) {

    var urlData = GetRequest();
    var shopnumber = 1;

    function domStr(result) {

        var str1 =
            '<h4 class="weui_media_title text1" data-id = ' + result.id + '>' + result.name + '' +
            '<br>' +
            '<span><b>厂商：' + result.firm + '</span>' +
            '</h4>' +
            '<p class="weui_media_desc text2">' + result.introduction + '</p>';

        var str2 =
            '<p class="money">¥' + result.price + '</p>' +
            '<p class="kucun" data-kucun = "' + result.stock + '">库存：' + result.stock + '</p>' +
            '<p class="guige">规格：' + result.specification + '</p>' +
            '<p class="yunfei">运费:统一收取10元，满120元包邮</p>' +

            '<div class="mynum">' +
            '<span class ="myshuliang">数量</span>' +
            '<span class="red">-</span>' +
            '<input class="num" value ="' + shopnumber + '" type="number">' +
            '<span class="add">+</span>' +

            '</div>';
        return {
            str1: str1,
            str2: str2
        };
    }
    var canClick = true;
    $.get(Constants.hostIp + 'weixin/goods/' + urlData.id, function(data) {
        var result = data.obj;
        if (result.stock <= 0) {
            canClick = false;
            $('#addcar').html('库存不足');
            $('#buy').hide();
            $('#addcar').css('width', '10rem');
        };
        var strobj = domStr(result);
        $('.weui_media_box').append(strobj.str1);
        $('.price').append(strobj.str2);

        $('.xiangqing').append(result.summary)

        //轮播图片
        var images = data.obj.imgs.split(',');
        console.log(images.length);
        if (images.length == 1) {
            $('.swiper-pagination').hide();
            $('.swiper-wrapper').append('<img src="' + images[0] + '" alt="" style="width:100%;height:auto">');
        } else {
            for (var i = 0; i < images.length; i++) {

                $('.swiper-wrapper').append(
                    '<div class="swiper-slide">' +
                    '<img src="' + images[i] + '" alt="">' +
                    '</div>'
                );
            }
        }

        //输入数字逻辑
        $('.num').blur(function(event) {
            var stock = $('.kucun').attr('data-kucun');

            if (Number($(this).val()) > Number(stock)) {
                $(this).val(stock);
            }
            shopnumber = $(this).val();
            $(this).val(shopnumber);
        });
        $('.num').on('keyup', function(event) {
            var stock = $('.kucun').attr('data-kucun');

            if (Number($(this).val()) > Number(stock)) {
                $(this).val(stock);
            }
            shopnumber = $(this).val();
            $(this).val(shopnumber);

            event.preventDefault();
        });

        //加号逻辑
        $('.price').on('click', '.add', function(event) {
            var stock = $('.kucun').attr('data-kucun');
            stock = Number(stock);
            shopnumber < stock ? shopnumber++ : void(0);
            $(this).siblings('.num').val('' + shopnumber + '');
            event.preventDefault();
        });
        //减号逻辑
        $('.price').on('click', '.red', function(event) {
            shopnumber <= 1 ? shopnumber = 1 : shopnumber--;
            $(this).siblings('.num').val('' + shopnumber + '');

        });
        //初始化swiper插件
        var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            // If we need pagination
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
        //添加到购物车
        $('#addcar').on('click', function(event) {
            islogin();
            if (!canClick) {
                return;
            }
            var goodnum = Number($('.mynum .num').val());


            $.ajax({
                type: "post",
                url: Constants.hostIp + 'weixin/plus/shoppingCart',
                timeout: 5000,
                data: {
                    customerId: LS.get('custormid'),
                    goodsId: urlData.id,
                    goodsNum: goodnum
                },
                dataType: "json",
                success: function(data, textStatus, xhr) {
                    if (data.status == 0) {
                        $.alerts({
                            title: "提示",
                            contentText: "成功加入购物车",
                            callback: function() {
                                var timer = setTimeout(function() {
                                    $('.alert-mask').hide();
                                }, 1000)
                            },
                        });
                    } else {
                        $.alerts({
                            title: "提示",
                            contentText: dat.msg,
                            callback: function() {
                                var timer = setTimeout(function() {
                                    $('.alert-mask').hide();
                                }, 1000)
                            },
                        });
                    }

                },
                error: function(err) {
                    console.log(err)
                }
            });
            return false;
        });
        $('#buy').on('click', function(event) {
             // var goodnum = Number($('.mynum .num').val());
             // var urlhref = 'sureorder.html?id=' + urlData.id + '&goodnumber=' + goodnum;
             //    window.location.href = urlhref;
            event.preventDefault();
            islogin(function() {
                if (LS.get('custormid')) {
                    var goodnum = Number($('.mynum .num').val());
                    var urlhref = 'sureorder.html?id=' + urlData.id + '&goodnumber=' + goodnum;
                    window.location.href = urlhref;
                }
            });
            if (!canClick) {
                return;
            }
        });
    })
})(window.jQuery)