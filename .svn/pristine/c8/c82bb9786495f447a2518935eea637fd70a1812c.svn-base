//加载所有地址 
function addressList(cb) {
    /* body... */
    $.ajax({
        url: Constants.hostIp + 'weixin/plus/address/list',
        type: 'get',
        data: {
            customerId: LS.get('custormid')
        },
        timeout: 5000,
        success: function(data, status) {
            var results = data.lst;

            function domStr(result) {

                var allstr =
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
                    '<span class="right">' +
                    '<a href="javascript:0" class="ed">编辑</a>' +
                    '<a href="javascript:0"  class="del" dataid="' + result.id + '">删除</a>' +
                    '</span>' +
                    '</div>' +
                    '</li>';
                return allstr
            }

            var addstr = '';
            if (!results) {
                return;
            }
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                var temp = domStr(result);
                addstr += temp;
            }
            $('.listcontainer').html(addstr);

            $('.listcontainer').on('click', '.addtext', function(event) {
                $('.goods').show();
                // //获取中的地址id
                var needId = $(this).parents('.list').attr('data-id');

                var myAddressObj = {};
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    if (result.id == needId) {
                        myAddressObj = result;
                        break;
                    }
                }
                var name = $(this).find('.name').html(),
                    phone = $(this).find('.tel').html(),
                    address = $(this).find('.p2').html();
                var str =
                    '<img class="addicon" src="images/1/address-icon.png" alt="">' +
                    '<p class="ad n">' + name + '<span>' + phone + '</span></p>' +
                    '<p class="ad">' + address + '</p>';
                // $('.address').html(str);
                cb && cb(str, needId)
                $('.address').attr('defaultid', '' + myAddressObj.id + '');
                $('.onepage').show();
                $('.twopage').hide();
                event.preventDefault();
                event.stopPropagation();
            });
        },
        error: function(err) {
            console.log(err);
        }
    })
}


$('.threepage').append('<p class="errinfo"></p>')
//点击选择地址事件
$('#address').on('click', function(event) {
    $('.goods').hide();
    $('.twopage').show();
    event.preventDefault();
});
//删除地址事件 
$('.listcontainer').on('touchend', '.del', function(event) {
    id = Number($(this).parents('.list').attr('data-id'));

    var data = {
        id: id,
        customerId: LS.get('custormid')
        // customerId: 6

    }
    console.log(data);
    var that = $(this);
    $.ajax({
        url: Constants.hostIp + 'weixin/plus/address/delete',
        type: 'get',
        data: data,
        dataType: 'json',
        success: function(result) {
            console.log(result);
            that.parents('.list').remove()
        }
    });

    return false;
});
//编辑地址
var isDefault, id;
$('.listcontainer').on('click', '.ed', function(event) {

    event.preventDefault();
    event.stopPropagation();
    isDefault = $(this).parents('.list').attr('data-address');
    id = $(this).parents('.list').attr('data-id');

    $('.twopage').hide();
    $('.threepage').show();



});
var hasid;

$('#hrefadd').click(function(event) {
    $('.twopage').hide();
    $('.threepage').show();
    hasid = 'noid';

    event.preventDefault();
    event.stopPropagation();
});
//保存或者修改地址
var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
$('.btnform').click(function(event) {

    var linkphone = $('#linkphone').val(),
        inkman = $('#linkman').val(),
        content = $('#content').val();
    if (hasid == 'noid') {
        postdata = {
            content: content,
            customerId: LS.get('custormid'),
            // customerId: 6,
            isDefault: isDefault || 0,
            linkman: inkman,
            linkphone: linkphone
        };
    } else {
        postdata = {
            id: id,
            content: content,
            customerId: LS.get('custormid'),
            isDefault: isDefault || 0,
            linkman: inkman,
            linkphone: linkphone
        };
    }
    if (!$('#linkman').val()) {
        $('.errinfo').html('联系人不能为空');
        return;
    }
    if (!reg.test(linkphone)) {
        $('.errinfo').html('请输入正确的电话号码');
        return;
    }
    if (!$('#content').val()) {
        $('.errinfo').html('地址不能为空');
        return;
    }
    $.ajax({
        type: "post",
        url: Constants.hostIp + "weixin/plus/address/saveOrUpdate",
        data: postdata,
        dataType: "json",
        success: function(res) {
            if (res.status!=0) {
                $.alerts({
                    title: "提示",
                    contentText: res.msg,
                    callback: function() {
                        var timer = setTimeout(function() {
                            $('.alert-mask').hide();
                        }, 1000)
                    },
                });
            } else {
                $.alerts({
                    title: "提示",
                    contentText: "提交成功",
                    callback: function() {
                        var timer = setTimeout(function() {
                                addressList(function(str) {
                                    $('.address').html(str);
                                })
                            $('.alert-mask').hide();
                        }, 1000)
                    },
                });
            }
        }
    });
    $('.threepage').hide();
    $('.twopage').show();
    return false;
});
$('#returnbtn').on('click', function(event) {
    $('.twopage').hide();
    $('.onepage').show();
    event.preventDefault();

});