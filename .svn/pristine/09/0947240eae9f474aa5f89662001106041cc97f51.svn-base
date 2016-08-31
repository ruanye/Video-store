$(function() {
	var urlObj = GetRequest()
	var chufangObj = {
		ajaxData: {
			id: urlObj.id,//处方抓药id,
			customerId:LS.get('custormid')
			// customerId:126,
		},
		init: function() {
			var _this = this;
			//获取ip
	        $.post('http://synsunny.parsec.com.cn/Dorado/ip/address',function(data,status){
	            document.querySelector("#keleyivisitorip").innerHTML= data.host
	        })
			$('#payBtn').on('click', function(e) {
				e.preventDefault();
				_this.pay()
			})
			$.ajax({
				type: "get",
				url: Constants.hostIp + 'weixin/plus/recipe/detail',
				dataType: "json",
				data: _this.ajaxData,
				success: function(data) {
					console.log(data);
					if (data.status == 0) {
						_this.domStr(data.recipe)
					}
				}.bind(this),
				error: function(err) {
					console.log('err')
				}
			});
			$('.order-icon .icon .icon-box').on('click', function(e) {
				var imgArr = []
				$(this).find('.item').each(function(index, item) {
					imgArr.push($(this).find('img').attr('src'))
				})
				console.log(imgArr);
				wx.previewImage({
					current: '', // 当前显示图片的http链接
					urls: imgArr // 需要预览的图片http链接列表
				});
			})
		},
		pay: function() {
			var payObj = {
				ip: document.querySelector('#keleyivisitorip').innerHTML,
				id: urlObj.id,
				openid: LS.get(Constants.openid),
				customerId: LS.get('custormid')
			}
			$.ajax({
				url: Constants.hostIp + 'weixin/plus/recipe/pay',
				type: 'post',
				data: payObj,
				timeout: 5000,
				success: function(data) {
					console.log(data);
					if (data.status == 0) {
						js_params = data.object;
						// alert(data.msg)
						paybill(function(){
							location.reload()
						});
					} else {
						console.log(data.msg)
					}
				}.bind(this),
				error: function(err) {
					console.log('err')
				}
			})
		},
		domStr: function(item) {
			var remark=item.remark;
			var totalPrice=item.totalPrice||0
			if(item.state==2){
				$('#payBtn').show()
			}
			if(!item.remark){
				remark='无'
			}

			$('.order-status').find('.order-num .number').text(item.code)
			$('.order-status').find('.order-time .p1').text('订单状态：' + item.stateStr)
				.next().text('下单时间：' + item.showCreateTime);
			$('.info-detail').find('.money .number').text('￥'+totalPrice)
			$('.info-detail').find('.address-detail .item1 .right').text(item.deliveryStr)
			$('.info-detail').find('.address-detail .item2 .right').text(item.drugstoreName)
			if(item.delivery==1){
				$('.info-detail').find('.address-detail .item3').remove()
				$('.info-detail').find('.address-detail .item4').remove()
				$('.info-detail').find('.address-detail .item5').remove()
			}else{
				$('.info-detail').find('.address-detail .item3 .right').text(item.address)
				$('.info-detail').find('.address-detail .item4 .right').text(item.customerName)
				$('.info-detail').find('.address-detail .item5 .right').text(item.telphone);
			}
			$('.order-icon .text .left').text("共"+item.number+"付").next().text(item.tisaneMethodsStr)
			item.img.split(',').forEach(function(item){
				$('.order-icon .icon .icon-box').append(
					"<div class=\"item\">" +
					"<img src=\"" +Constants.host +item + "\">" +
					"</div>"
				)				
			})
			$('.warn-word').text("备注："+remark)
		}
	}
	chufangObj.init()
})