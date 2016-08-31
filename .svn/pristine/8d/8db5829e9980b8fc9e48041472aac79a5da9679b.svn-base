$(function(){
	var $activeList=$('.activeList')
	var $container=$('.container');
    var listData={
        customerId:LS.get('custormid'),
        // customerId:54,
        pageNo:1,
        pageSize:10
    }

    $(document.body).infinite();
    var loading = false; //状态标记
    $(document.body).infinite().on("infinite", function() {
        if (loading) return;
        loading = true;
        $('.weui-infinite-scroll').show()
        listData.pageNo++;
        $(document.body).destroyInfinite()
        setTimeout(function() {
            ajaxGet();
            $('.weui-infinite-scroll').hide()
            loading = false;
        }, 1500); //模拟延迟
    });
    $activeList.on('click','.list-detail',function(e){
        var id=$(this).data('id')
        var type=$(this).data('type')
        // console.log('active-detail.html?id='+id+'&type='+type);
        location.href='active-detail.html?id='+id+'&type='+type
    })
    ajaxGet()
    function ajaxGet(){
        $.ajax({
            url: Constants.hostIp+'weixin/plus/activityMan',
            type: 'get',
            timeout: 5000,
            data:listData,
            success: function(data,status) {
                console.log(data);
                var Str='';
                if(status=='success'&& data.status==0){
                    if(data.lst.length>0){
                        data.lst.forEach(function(item,index){
                            var temp=domStr(item);
                            Str+=temp;
                        })
                        $activeList.append(Str)
                        if(data.pageNo>=data.pages){
                            $(document.body).destroyInfinite()
                            $('.weui-infinite-scroll').hide()
                        }else{
                            $(document.body).infinite();
                            $('.weui-infinite-scroll').hide()
                        }
                    }else{
                        $('.weui-infinite-scroll').hide()
                        $activeList.append("<p style=\"margin-top:1rem;text-align:center;font-size:0.5rem;\">您还没有报名参与活动</p>")
                    }
                }else{
                    $('.weui-infinite-scroll').hide()
                }
            },
            error: function(err) {
                console.log(err);
            }
        })
    }
    function domStr(item){
        var price=0.00;
        if(item.price!==undefined){
            price=item.price
        }
        // var startTime = new Date(item.createTime).format("yyyy-MM-dd hh:mm:ss").substr(5, 5).split("-");
        // var endTime = new Date(item.endTime).format("yyyy-MM-dd hh:mm:ss").substr(5, 5).split("-");
        // var start=startTime[0]+'月'+startTime[1]+'日'
        // var end=endTime[0]+'月'+endTime[1]+'日'
        var str=
            "<div class=\"list-detail type1\" data-id=\""+item.activity.id+"\" data-type=\""+item.type+"\">"+
                "<div class=\"active-status\">"+
                    "<div class=\"left\">状态：报名成功</div>"+
                    "<div class=\"right\">"+
                        // "<div class=\"total-price\">总价：</div>"+
                        // "<div class=\"number\">￥199.00</div>"+
                    "</div>"+
                "</div>"+
                "<div class=\"show\">"+
                    "<div class=\"left\" style=\"background-image:url("+item.icon+")\"></div>"+
                    "<div class=\"right\">"+
                        "<p class=\"title\">"+item.title+"</p>"+
                        "<div class=\"address\" >"+
                            "<div class=\"dizhi\">地址：</div>"+
                            "<div class=\"address-detail\">"+item.address+"</div>"+
                        "</div>"+
                        "<p class=\"time\">活动时间：<span class=\"active-time\">"+item.showCreateTime+"-"+item.showEndTime+"</span></p>"+
                        "<div class=\"price\">"+
                            "<div class=\"price-left\">价格：<span class=\"pricenum\">￥"+price+"</span></div>"+
                            "<div class=\"price-right\">数量：<span class=\"num\">"+item.number+"</span></div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
                // "<div class=\"user-detail\">"+
                //     "<div class=\"text\">报名人：</div>"+
                //     "<div class=\"name\">"+item.name+"</div>"+
                //     "<div class=\"tel\">"+item.telphone+"</div>"+
                // "</div>"+
            "</div>"
            return str;
    }
})