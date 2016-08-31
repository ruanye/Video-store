$(function(){
    // var id=GetRequest().id;//商品id
	var id=2;//商品id
	var $container=$('.container');
    $.ajax({
        url: Constants.hostIp+'/weixin/activity/'+id,
        type: 'get',
        timeout: 5000,
        success: function(data,status) {
            console.log(data);
            if(status=='success'&& data.status==0){
            	var str=
                    "<div class=\"icon\"></div>"+
                    "<div class=\"detail\">"+
                        "<div class=\"title\">"+
                            "<div class=\"left-text\">板蓝根限时购活动</div>"+
                            "<div class=\"limit-icon\"></div>"+
                        "</div>"+
                        "<div class=\"content\">"+
                            "<div class=\"limit-money\">"+
                                "<div class=\"now-money\">限时价：9.9元</div>"+
                                "<div class=\"old-money\">原价:￥19.9</div>"+
                            "</div>"+
                            "<div class=\"limit-discribe\" >限时活动，逾期不候</div>"+
                            "<div class=\"people\">参与人数：20</div>"+
                            "<div class=\"date\">活动时间：<span class=\"time\">5月1日10:30-5月1日10:30</span></div>"+
                        "</div>"+
                    "</div>"+
                    "<div class=\"active-show\">"+
                        "<p class=\"p1\">活动介绍</p>"+
                        "<p class=\"text\">板蓝根，家中常备，实惠大牌，有备无患</p>"+
                    "</div>"+
                    "<div class=\"takein\">"+
                        "<div class=\"left\">"+
                            "<div class=\"text\">秒杀数量：</div>"+
                            "<div class=\"number\">22</div>"+
                        "</div>"+
                        "<div class=\"right\">立即抢购</div>"+
                    "</div>"
		           $container.html(str)
            }else{
            	alert('status！== 0')
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
})