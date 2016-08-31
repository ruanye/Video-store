var page = 1;
(function($) {
    //分页和产品参数
    var goodsData = {
        goodTypeId: '',
        pageNo: page,
        pageSize: 10,
    }
    $.get(Constants.hostIp + 'weixin/goodsType', function(data) {
        for (var i = 0; i < data.lst.length; i++) {
            var result = data.lst[i];
            var str = '<a data-id="' + result.id + '" href="javascript:0" class="btn">' + result.name + '</a>'
            $('.btnbox').append(str)
        }
    });

    function getAjax(goodsData, callback) {
        $.get(Constants.hostIp + 'weixin/goods', goodsData, function(data) {
            if(!data.lst.length){
                  var str = '<li style="text-align:center;border-top: 0.0625rem solid #f3f3f3;font-size:0.5rem;padding-top:1rem">暂无商品</li>'
                 $('.listcontainer').html(str)
            }
            var Str = '';
            for (var i = 0; i < data.lst.length; i++) {
                var result = data.lst[i];
                var temp = domStr(result)
                Str += temp
            }
            $('.listcontainer').append(Str);
            if (data.pageNo == data.pages) {
                $(document.body).destroyInfinite();
            } else {
                $(document.body).infinite();
            }
            $('.weui-infinite-scroll').hide()
            callback && callback(data)
        });
    }
    getAjax(goodsData)

    function domStr(result) {
        var str =
            '<a href="shopdetail.html?id=' + result.id + '">' +
            '<li class="list">' +
            '<div class="imgbox">' +
            '<img src="' + result.icon + '" alt="">' +
            '</div>' +
            '<div class="text">' +
            '<h4>' + result.name + '</h4>' +
            '<p>规格:' + result.specification + '</p>' +
            '<p>厂商:' + result.firm + '</p>' +
            '<b>¥' + result.price + '</b>' +
            '</div>' +
            '</li>' +
            '</a>'
        return str;
    }
    $(document.body).infinite();
    var loading = false; //状态标记
    $(document.body).infinite().on("infinite", function() {
        if (loading) return;
        loading = true;
        $('.weui-infinite-scroll').show()
        goodsData.pageNo++;
        $(document.body).destroyInfinite();
        setTimeout(function() {
            
            getAjax(goodsData,function(){
                $('.weui-infinite-scroll').hide()
            });
            loading = false;
        }, 1500);

    });
    $('.myselect').click(function() {

        event.preventDefault();
        event.stopPropagation();
        $('.sellist').toggle();

    });
    $('.btnbox').on('click', '.btn', function() {
        event.preventDefault();
        event.stopPropagation();
        goodsData.goodsTypeId = $(this).data('id');
        $('.sellist').hide();
        $('.listcontainer').empty()

        getAjax(goodsData)
    });
    $(document).on('click', function(event) {
        $('.sellist').hide();
         });
})(window.jQuery);
