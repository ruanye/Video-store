~
(function($) {

    var content, id, isDefault, linkman, linkphone;

    function domStr(result) {
        var parame = 'content=' + result.content +'&isDefault=' + result.isDefault + '&id=' + result.id + '&linkman=' + result.linkman + '&linkphone=' + result.linkphone;
            parame = encodeURI(parame);
            hrefurl = 'addressEdit.html';
            var str =
            '<li class="list" data-address="' + result.isDefault + '"  data-customerId = "' + result.customerId + '"   data-id = "' + result.id + '">' +
            '<div class="addtext">' +
            '<p class="p1">' +
            '<img class="addressicon" src="images/shoplist/addressicon.jpg" alt="">' +
            '<span class="name">' + result.linkman + '</span>' +
            '<span class="tel">' + result.linkphone + '</span>' +
            '</p>' +
            '<p class="p2">' + result.content + '</p>' +
            '</div>' +
            '<div class="edit">' +
            '<label for="remberme" class="remberme" name="address">' +
            
            '<span class="icon icon-rember" data-address="' + result.isDefault + '" ><i class="iconfont quan">&#xe616;</i><i class="iconfont quan1">&#xe612;</i></span><address>默认地址</address>' +
            '</label>' +
            '<span class="right">' +
            '<a href="addressEdit.html?' + parame + '" class="ed">编辑</a>' +
            '<a href="javascript:0"  class="del" dataid="' + result.id + '">删除</a>' +
            '</span>' +
            '</div>' +
            '</li>'
        return str;
    }
    $.get(Constants.hostIp + 'weixin/plus/address/list', {customerId:LS.get('custormid')},function(data) {

        var data = data.lst;
       if (!data) {
            return;
       }
        var Str = '';
        for (var i = 0; i < data.length; i++) {
            var result = data[i];
            var temp = domStr(result);
            Str += temp;
        }
        $('.listcontainer').append(Str);
        

        //判断是否是默认地址
        $.each($('.icon'), function(index, val) {

              console.log($(this))
            if ($(this).attr('data-address')==1) {
                $(this).addClass('sel')
            }

        });

    });

    $('#hrefadd').on('click',function(event) {

          window.location.href ='addressEdit.html';
        event.preventDefault();
        /* Act on the event */
    });

    $('.listcontainer').on('click', 'label', function(event) {
        content = $(this).parents('.list').find('.p2').html();
         id = $(this).parents('.list').attr('data-id');
        isDefault = $(this).parents('.list').attr('data-address');
        linkman = $(this).parents('.list').find('.name').html();
        linkphone = $(this).parents('.list').find('.tel').html();
        if ($(this).children('.icon').hasClass('sel')) {

            $(this).parents('.list').attr('data-address', '0');

        } else {
           $(this).children('.icon').addClass('sel');
            $(this).parents('.list').attr('data-address', '1');
            postajax();


        }

        $(this).parents('.list').siblings().find('.icon').removeClass('sel');
        $(this).parents('.list').siblings().attr('data-address', '0');
        return false;


    });
    //保存默认地址ajax
    function postajax() {
        $.post(Constants.hostIp + '/weixin/plus/address/saveOrUpdate', {
            content: content,
            customerId: LS.get('custormid'),
            id: id,
            isDefault: 1,
            linkman: linkman,
            linkphone: linkphone
        }, function(data) {
           console.log(data);
        });
    }
    //删除地址
    $('.listcontainer').on('touchend', '.del', function(event) {
        id = Number($(this).parents('.list').attr('data-id'));
           
      
        console.log(id);
        var that = $(this);
        $.ajax({
            url: Constants.hostIp + 'weixin/plus/address/delete',
            type: 'get',
            data: {
                id: id,
                customerId: LS.get('custormid')
            },
            dataType: 'json',
            success: function(result) {
                
               
                that.parents('.list').remove()
            }
        });

        return false;
    });


})(window.jQuery)