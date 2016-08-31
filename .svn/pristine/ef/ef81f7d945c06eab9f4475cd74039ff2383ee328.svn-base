$(function() {
    var $orderList = $('.order-list')
    var listObj = {
        ajaxData: {
            customerId: LS.get('custormid'),
            // customerId: 54,
            pageNo: 1,
            pageSize: 10
        },
        init: function() {
            var _this = this;
            $orderList.on('click', '.order-btn', function(e) {
                var $queueId = $(this).data('queueid');
                var $state = $(this).data('state');
                var $docutorId = $(this).siblings('.docutor-name').data('id');
                console.log($docutorId)
                if ($state == 2) {
                    return false;
                } else if ($state == 3) {
                    location.href = "doctor_info.html?id=" + $docutorId;
                    return false;
                }
                $.alert({
                    title: "提示",
                    contentText: "确认要退号吗",
                    submitText: "确认",
                    submitClass: "btn-submit",
                    cancleText: "取消",
                    cancleClass: "btn-cancle",
                    callback: function(obj) {
                        if (obj.index == 0) {
                            return false;
                        } else if (obj.index == 1) {
                            _this.queueAjax($queueId)
                        }
                    },
                })
            })
            $.ajax({
                url: Constants.hostIp + 'weixin/plus/queue/list',
                type: 'get',
                timeout: 5000,
                data: _this.ajaxData,
                success: function(data) {
                    console.log(data);
                    if (data.status == 0) {
                        var Str = '';
                        if (data.lst.length > 0) {
                            data.lst.forEach(function(item, index) {
                                var temp = _this.domStr(item);
                                Str += temp;
                            })
                            $orderList.html(Str)
                        } else {
                            $orderList.html("<p style=\"margin-top:1rem;text-align:center;font-size:0.5rem;\">您还没有预约信息</p>")
                        }
                    }
                }.bind(this),
                error: function(err) {
                    console.log('err')
                }.bind(this)
            })
        },
        //退号请求
        queueAjax: function($queueId) {
            $.ajax({
                url: Constants.hostIp + 'weixin/plus/queue/back',
                type: 'get',
                timeout: 5000,
                data: {
                    queueId: $queueId,
                    customerId: LS.get('custormid')
                        // customerId: 126
                },
                success: function(data) {
                    console.log(data.status);
                    if (data.status == 0) {
                        $.alerts({
                            title: "提示",
                            contentText: "退号成功",
                            submitText: "提交",
                            submitClass: "btn-submit",
                            cancleText: "取消",
                            cancleClass: "btn-cancle",
                            callback: function(index, $modal) {
                                setTimeout(function() {
                                    $modal.remove()
                                    location.reload()
                                }, 1500)
                            },
                        })
                    } else {
                        $.alerts({
                            title: "提示",
                            contentText: data.msg,
                            submitText: "确认",
                            submitClass: "btn-submit",
                            cancleText: "取消",
                            cancleClass: "btn-cancle",
                            callback: function(index, item) {
                                setTimeout(function() {
                                    item.remove()
                                }, 1200)
                            }
                        })
                    }
                }.bind(this),
                error: function(err) {
                    // alert('err')
                }.bind(this)
            })
        },
        domStr: function(item) {
            var speailClass = ''
            var statusText = function() {
                if (item.state == 1) {
                    return '退号'
                }
                if (item.state == 2) {
                    speailClass = 'special'
                    return '已退号'
                }
                if (item.state == 3) {
                    return '再次预约'
                }
                if (item.state == 4) {
                    speailClass = 'special'
                    return '预约中'
                }
            }(item)
            var address = item.address || ''
            var str =
                "<div class=\"list-item\">" +
                "<div class=\"order-number\">预约号：" + item.queueCode + "</div>" +
                "<div class=\"docutor-name\" data-id=\"" + item.doctorId + "\">医生：" + item.doctorName + "</div>" +
                "<div class=\"price\">医馆：" + item.drugstoreName + "</div>" +
                "<div class=\"price\">价格：￥" + item.price + "</div>" +
                "<div class=\"time\">时间：" + item.showWorkDate + "（建议就诊时间：" + item.treatmentTips + "）</div>" +
                "<div class=\"time\">地址：" + address + "</div>" +
                "<div class=\"order-btn " + speailClass + "\" data-queueid=\"" + item.queueCode + "\" data-state=\"" + item.state + "\">" + statusText + "</div>" +
                "</div> "
            return str;
        }
    }
    listObj.init()
})