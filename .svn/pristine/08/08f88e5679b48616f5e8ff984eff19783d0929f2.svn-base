$(function() {
	var urlData = GetRequest();
	var $container = $('.container');
	var departmentName='';//请求参数
	$('#userName').val(LS.get('userName')); //LS中读取默认联系人信息
	$('#userTel').val(LS.get('userTel'));
	var $top=$container.height()-$container.find('.sure').height()-$('.detail-content',$container).height()-$('.person-detail',$container).height();
	$container.find('.sure').css('margin-top',$top-77).show()
	var preObj = {
		init: function() {
			var _this = this;
			//获取ip
	        $.post('http://synsunny.parsec.com.cn/Dorado/ip/address',function(data,status){
	            document.querySelector("#keleyivisitorip").innerHTML= data.host
	        })
			$.ajax({
				url: Constants.hostIp + 'weixin/doctor/detail',
				type: 'get',
				timeout: 5000,
				data: {
					doctorId: urlData.id
				},
				success: function(data, status) {
					console.log(data);
					departmentName=data.doctor.departmentName
					_this.domStr(data)
				}.bind(this),
				error: function() {
					console.log('err')
				}.bind(this)
			})
			$container.find('.sure .sure-btn').on('click', function(e) {
				e.preventDefault()
				_this.pay()//支付
			})
		},
		pay: function() {
			var userName = $('#userName').val()
			var userTel = $('#userTel').val()
			//判断是否注册，base封装方法
			var isLogin = islogin(function() {
				SS.set('targeturl', location.href)
			})
			if (!isLogin) {
				return false;
			}
			//用户名验证
			if (userName.length<2) {
				$.alerts({
					title: "提示",
					contentText: "用户名必须大于2位",
					submitText: "确认",
					submitClass: "btn-submit",
					cancleText: "取消",
					cancleClass: "btn-cancle",
					callback: function(index,item) {
						setTimeout(function(){
							item.remove()
						},1200)					
					},
				})
				return false;
			}else if(userName.length>10){
				$.alerts({
					title: "提示",
					contentText: "用户名不得大于10位",
					submitText: "确认",
					submitClass: "btn-submit",
					cancleText: "取消",
					cancleClass: "btn-cancle",
					callback: function(index,item) {
						setTimeout(function(){
							item.remove()
						},1200)					
					},
				})
				return false;			
			}	
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
			if(!myreg.test(userTel)){ 
				$.alerts({
					title: "提示",
					contentText: "请输入有效的手机号码！",
					submitText: "确认",
					submitClass: "btn-submit",
					cancleText: "取消",
					cancleClass: "btn-cancle",
					callback: function(index,item) {
						setTimeout(function(){
							item.remove()
						},1200)
					},
				}) 
			    return false; 
			} 	
			$container.find('.sure .sure-btn').attr('disabled','disabled').text('预约中...').css('background-color','#ccc')	
			var takeData = {
				customerId: LS.get('custormid'),
				doctorId: urlData.id,
				ip: document.querySelector('#keleyivisitorip').innerHTML,
				openid: LS.get(Constants.openid),
				seq: urlData.seq,
				workDate: urlData.workDate,
				drugstoreId:urlData.drugstoreId,
				patientName:$('#userName').val(),
				patientPhone:$('#userTel').val(),
				departmentName:departmentName
			}
			console.log(takeData);
			$.ajax({
				url: Constants.hostIp + 'weixin/plus/queue/add',
				type: 'post',
				data: takeData,
				timeout: 5000,
				success: function(data) {
					console.log(data);
					if (data.status == 0) {
						js_params = data.object;
						paybill(function(){
							setTimeout(function(){
								location.href='my-yuyue.html';
							},1500)
						},function(){
							$container.find('.sure .sure-btn').removeAttr('disabled').text('确认预约').css('background-color','#40b952')
						});
					} else {
						$container.find('.sure .sure-btn').removeAttr('disabled').text('确认预约').css('background-color','#40b952')
						$.alert({
							title: "提示",
							contentText:data.msg ,
							submitText: "确认",
							submitClass: "btn-submit",
							cancleText: "取消",
							cancleClass: "btn-cancle",
							callback: function(index,item) {
								
							}
						}) 
					}
				}.bind(this),
				error: function(err) {
					console.log('err')
				}
			})
		},
		domStr: function(data) {
			var icon = data.doctor.icon;
            if (!icon) {
                icon = 'images/1/docutor-icon.png'
            }
            var seq = function(urlData) {
                var str = '';
                if (urlData.seq == 1) {
                    str = '上午'
                }
                if (urlData.seq == 2) {
                    str = '下午'
                }
                if (urlData.seq == 3) {
                    str = '晚上'
                }
                return str;
            }(urlData)
			$container.find('.detail-content .left').css('background-image', "url("+icon+")")
			$container.find('.detail-content .right .p1').text(data.doctor.name)
			$container.find('.detail-content .right .p2').text("职位：" + data.doctor.job)
			$container.find('.detail-content .right .p3').text("医馆：" + decodeURIComponent(urlData.drugstoreName))
			$container.find('.person-detail .yuyue-time .number').text(urlData.workDate+' '+seq)
			$container.find('.person-detail .price .number').text(data.doctor.price + '元')
		}
	}
	preObj.init()
})
