$(function() {
    var $list = $('#list');
    var activeData = {
        pageNo: 1,
        pageSize: 100
    }
    $.ajax({
        url: Constants.hostIp + '/weixin/activity',
        type: 'get',
        timeout: 5000,
        // dataType:'json',
        data: activeData,
        success: function(data, status) {
            console.log(data);
            if (status == 'success' && data.status == 0) {
                if (data.lst.length > 0) {
                    var str = '';
                    data.lst.forEach(function(item) {
                        var domstr = domStr(item)
                        str += domstr;
                    })
                    $list.append(str)
                }else{
                    $list.append("<p style=\"margin-top:1rem;text-align:center;font-size:0.5rem;\">暂无活动信息</p>")
                }
            } else {
                console.log(data.msg)
            }
        },
        error: function(err) {
            console.log(err);
        }
    })

    function domStr(item) {
        var str = '';
        var icon=item.icon;
        if(!icon){
            icon='images/1/shop-icon.png'
        }
        // var startTime=new Date(item.createTime).format("yyyy-MM-dd hh:mm:ss").substr(5);
        // var endTime=new Date(item.endTime).format("yyyy-MM-dd hh:mm:ss").substr(5);
        if (item.type == 3) {
            str =
                "<div class=\"listItem limit\">" +
                "<a href=\"active-detail.html?id=" + item.id + "&type=" + item.type + "\" class=\"item-default\">" +
                "<div class=\"goods-icon\" style=\"background-image:url(" + icon + ")\"></div>" +
                "<div class=\"goods-detail\">" +
                "<div class=\"title\">" + item.title + "</div>" +
                "<div class=\"limit-money\">"+
                    "<div class=\"now-money\">限时价:"+item.price+"元</div>"+
                    "<div class=\"old-money\">原价:￥"+item.originalPrice+"元</div>"+
                "</div>"+
                "<div class=\"time\">活动时间：" + item.showCreateTime + "-" + item.showEndTime + "</div>" +
                "</div> " +
                "<div class=\"limit-icon\"></div>" +
                "</a>" +
                "</div> "

        } else if(item.type==2) {
            str =
                "<div class=\"listItem\">" +
                "<a href=\"active-detail.html?id=" + item.id + "&type=" + item.type + "\" class=\"item-default\">" +
                "<div class=\"goods-icon\" style=\"background-image:url(" + icon + ")\"></div>" +
                "<div class=\"goods-detail\">" +
                "<div class=\"title\">" + item.title + "</div>" +
                "<div class=\"price\">价格：<span>￥" + item.price + "</span></div>" +
                "<div class=\"time\">活动时间：" + item.showCreateTime + "-" + item.showEndTime + "</div>" +
                "</div> " +
                "</a>" +
                "</div> "
        }else if(item.type==1){
            str =
                "<div class=\"listItem\">" +
                "<a href=\"active-detail.html?id=" + item.id + "&type=" + item.type + "\" class=\"item-default\">" +
                "<div class=\"goods-icon\" style=\"background-image:url(" + icon + ")\"></div>" +
                "<div class=\"goods-detail\">" +
                "<div class=\"title\" style=\"margin-top:0.2rem;\">" + item.title + "</div>" +
                "<div class=\"time\" style=\"margin-top:0.5rem;\">活动时间：" + item.showCreateTime + "-" + item.showEndTime + "</div>" +
                "</div> " +
                "</a>" +
                "</div> "            
        }
        return str;
    }
})
