$(function() {
    var urlObj = GetRequest(); //商品id
    var id = urlObj.id
    var $container = $('.container');
    var resData;
    $.ajax({
        url: Constants.hostIp + 'weixin/activity/' + id,
        type: 'get',
        timeout: 5000,
        data:{
            customerId:LS.get('custormid')
        },
        success: function(data, status) {
            console.log(data);
            resData = data;
            if (status == 'success' && data.status == 0) {
                var limitIcon = "<div class=\"p1\"></div>";
                var btnText = '立即参加';
                if (data.obj.type != 3) {
                    limitIcon = '';
                }
                var limitPrice = '';
                if (data.obj.type == 3) {
                    btnText = '立即抢购';
                    limitPrice =
                        "<div class=\"limit-money\">" +
                        "<div class=\"now-money\">限时价：" + data.obj.price + "元</div>" +
                        "<div class=\"old-money\">原价:￥" + data.obj.originalPrice + "元</div>" +
                        "</div>"
                }
                var str =
                    "<div class=\"icon\">" +
                    "<div class=\"swiper-container\">" +
                    "<div class=\"swiper-wrapper\">" +

                    "</div>" +
                    "<div class=\"swiper-pagination\"></div>" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"detail\">" +
                    "<div class=\"title\">" + data.obj.title + "</div>" +
                    "<div class=\"introduction\">" + data.obj.introduction + "</div>" +
                    limitIcon +
                    "<div class=\"content\">" +
                    limitPrice +
                    "<div class=\"people\">参与人数：" + data.obj.saleQuantity + "/" + data.obj.quantityLimit + "</div>" +
                    "<div class=\"address\">地址：" + data.obj.address + "</div>" +
                    "<div class=\"date\">活动时间：<span class=\"time\">" + data.obj.showCreateTime + "--" + data.obj.showEndTime + "</span></div>" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"active-show\">" +
                    "<p class=\"p1\">活动详情</p>" +
                    "<p class=\"text\"></p>" +
                    "</div>" +
                    "<div class=\"takein\">" +
                    "<div class=\"left\">" +
                    " <div class=\"text\">数量：</div>" +
                    "<div class=\"number\">" +
                    "<input type=\"text\" value=\"1\" id=\"inputNumber\">" +
                    "</div>" +
                    "</div>" +
                    "<button href=\"\" class=\"right takeIn-now\">" + btnText + "</button>" +
                    " </div>"
                $container.html(str)

                //富文本加载
                $container.find('.active-show .text').html(data.obj.summary)
                var imgs = data.obj.imgs.split(',');
                var swiperSlide = '';
                imgs.forEach(function(item) {
                    swiperSlide += "<div class=\"swiper-slide\"><img src=\"" + item + "\"/></div>"
                })
                $container.find('.icon .swiper-wrapper').html(swiperSlide)
                if (imgs.length > 1) {
                    var mySwiper = new Swiper('.swiper-container', {
                        autoplay: 2000, //可选选项，自动滑动
                        loop: true,
                        pagination: '.swiper-pagination'
                    })
                }
                //判断活动是否能参加
                if(data.obj.isStart==0){
                    if (data.obj.type==3){
                        btnText='抢购未开始';
                    }else{
                        btnText='报名未开始';
                    }
                    $container.find('.takein .takeIn-now').attr('disabled','disabled').text(btnText).css('background-color','#ddd')
                }else if(data.obj.isStart==1){
                    if (data.obj.type==3){
                        btnText='立即抢购';
                    }else{
                        btnText='立即参加';
                    }
                } 
                if(data.obj.state==2){
                    if (data.obj.type==3){
                        btnText='抢购结束';
                    }else{
                        btnText='报名结束';
                    }
                    $container.find('.takein .takeIn-now').attr('disabled','disabled').text(btnText).css('background-color','#ddd')
                }
                if (resData.obj.saleQuantity >= resData.obj.quantityLimit) {
                    var text = '报名结束';
                    if (resData.obj.type == 3) {
                        text = '抢购结束'
                    }
                    $container.find('.takein .takeIn-now').attr('disabled', 'disabled').text(text).css('background-color','#ddd')
                }
                if(resData.obj.isTake==1){
                    $container.find('.takein .takeIn-now').attr('disabled', 'disabled').text('已报名').css('background-color','#ddd')
                }
            } else {
                console.log(data.msg)
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
    $container.on('click', '.takeIn-now', function(e) {
        e.preventDefault();
        var goodsNumber = $('#inputNumber').val();
        islogin(function() {
            if (Number(goodsNumber) == 0) {
                $.alerts({
                    title: "提示",
                    contentText: "数量必须大于0",
                    submitText: "确认",
                    submitClass: "btn-submit",
                    cancleText: "取消",
                    cancleClass: "btn-cancle",
                    callback: function(index, item) {
                        setTimeout(function() {
                            item.remove()
                        }, 1200)
                    },
                })
                return false;
            }
            if (Number(goodsNumber) > (resData.obj.maxLimit - resData.obj.saleQuantity)) {
                $.alerts({
                    title: "提示",
                    contentText: "数量不得超过上限",
                    submitText: "确认",
                    submitClass: "btn-submit",
                    cancleText: "取消",
                    cancleClass: "btn-cancle",
                    callback: function(index, item) {
                        setTimeout(function() {
                            item.remove()
                        }, 1200)
                    },
                })
                return false;
            }
            if (resData.obj.type == 3) {
                //限时购属于商品。。。
                location.href = "sureorder.html?id=" + resData.obj.goodsId + "&goodnumber=" + goodsNumber+'&price='+resData.obj.price+'&activeId='+urlObj.id;
            } else {
                location.href = "active-sure.html?id=" + resData.obj.id + "&goodsNumber=" + goodsNumber;
            }
        })
    })
    $container.on('keyup', '#inputNumber', function(e) {
        this.value = this.value.replace(/\D/g, '')
    })
})
