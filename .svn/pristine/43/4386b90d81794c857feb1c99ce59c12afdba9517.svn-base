var postdata,
    contentVal = decodeURI(GetRequest()['content']),
    customerIdVal = decodeURI(GetRequest()['customerId']),
    idVal = decodeURI(GetRequest()['id'])
isDefaultVcal = decodeURI(GetRequest()['isDefault']),
    linkmanVal = decodeURI(GetRequest()['linkman']),
    linkphoneVal = decodeURI(GetRequest()['linkphone']);

if (GetRequest()['content']) {
    $('#linkman').val(linkmanVal),
        $('#linkphone').val(linkphoneVal),
        $('#content').val(contentVal);
}
var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
$('.btnform').click(function(event) {
    var linkphone = $('#linkphone').val(),
        linkman = $('#linkman').val(),
        content = $('#content').val();

    if (GetRequest()['content']) {

        postdata = {
            content: content,
            customerId:LS.get('custormid'),
            id: idVal,
            isDefault: isDefaultVcal,
            linkman: linkman,
            linkphone: linkphone
        }
    } else {
        postdata = {
            content: content,
            customerId:LS.get('custormid'),
            isDefault: 0,
            linkman: linkman,
            linkphone: linkphone
        }
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
            if (!!res.status) {
                
            } else {
                $.alerts({
                    title: "提示",
                    contentText: "保存成功",
                    callback: function() {
                        var timer = setTimeout(function() {
                            $('.alert-mask').hide();
                        }, 500)
                    },
                });
            }
            var timeurl = setTimeout(function() {
                window.location.href = 'addressManage.html';
                clearTimeout(timeurl);
            }, 1000)


        }
    });
    return false;
});
