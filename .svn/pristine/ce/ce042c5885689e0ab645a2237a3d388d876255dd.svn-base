$(function() {
    var urlObj = GetRequest();
    var $navBar = $('.info-content .nav-bar');
    var $navContent = $('.info-content .nav-content')
    var $info = $('.info-icon');
    var drugstoreName = ''
    var docDetail = {
        //医生id
        ajaxData: {
            doctorId: urlObj.id
        },
        //千万不要给我删了，
        resData: {

        },
        slelctInfo: {

        },
        init: function() {
            var _this = this;
            $navBar.on('click', '.nav-detail', function(e) {
                var $index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active')
                if ($index == 0) {
                    $navContent.find('.experience').addClass('active')
                    $navContent.find('.doctor-info').removeClass('active')
                } else {
                    $navContent.find('.experience').removeClass('active')
                    $navContent.find('.doctor-info').addClass('active')
                }
            })
            $navContent.find('.experience').on('click', '.item', function() {
                var $index = $(this).index();
                _this.slelctInfo.index = $index;
                drugstoreName = $(this).find('.date').data('id')
                console.log(drugstoreName);
                $(this).find('.select-icon').addClass('active').parent().siblings('.item').find('.select-icon').removeClass('active')
            })
            $.ajax({
                url: Constants.hostIp + 'weixin/doctor/detail',
                type: 'get',
                timeout: 5000,
                data: _this.ajaxData,
                success: function(data, status) {
                    _this.resData = data;
                    console.log(data)
                    var icon = data.doctor.icon;
                    if (!icon) {
                        icon = 'images/1/docutor-icon.png'
                    }
                    if (status == 'success' && data.status == 0) {
                        $info.find('.head-icon').css('background-image', "url(" + icon + ")")
                        $info.find('.info .name').text(data.doctor.name)
                        $info.find('.info .job .job-detail').text(data.doctor.job)
                        $info.find('.info .where .where-detail').text(data.doctor.drugstoreName)
                        $info.find('.info .charge .charge-money').text(data.doctor.price + '元')
                        var Str = '';
                        data.doctor.alist.forEach(function(item, index) {
                            var temp = _this.domStr(item);
                            Str += temp;
                        })
                        $navContent.find('.experience').append(Str)
                            //医生简介
                        if (data.doctor.summary != undefined) {
                            $navContent.find('.doctor-info').html(data.doctor.summary)
                        } else {
                            $navContent.find('.doctor-info').html('暂无')
                        }
                    } else {
                        console.log(data.msg)
                    }
                }.bind(this),
                error: function() {
                    // alert('err')
                }.bind(this)
            })
            $('.bottom-btn').find('.order').on('click', function(e) {
                e.preventDefault()
                var index = _this.slelctInfo.index
                islogin(function() {
                    if (index === undefined) {
                        $.alert({
                            title: "提示",
                            contentText: "请选择医生工作日历",
                            submitText: "确定",
                            submitClass: "btn-submit",
                            cancleText: "取消",
                            cancleClass: "btn-cancle",
                            callback: function() {},
                        })
                        return false;
                    }
                    var seq = _this.resData.doctor.alist[index]["seq"]
                    var workDate = _this.resData.doctor.alist[index]["workDate"]
                    var drugstoreId = _this.resData.doctor.alist[index]["storeId"]
                    location.href = "yuyueSure.html?id=" + urlObj.id + "&seq=" + seq + "&workDate=" + workDate + '&drugstoreId=' + drugstoreId + '&drugstoreName=' + drugstoreName
                })

            })
        },
        domStr: function(item) {
            var seq = function() {
                var str = '';
                if (item.seq == 1) {
                    str = '上午'
                }
                if (item.seq == 2) {
                    str = '下午'
                }
                if (item.seq == 3) {
                    str = '晚上'
                }
                return str;
            }(item)
            var str =
                "<div class=\"item\">" +
                "<div class=\"select-icon\"></div>" +
                "<div class=\"date\" data-id=\"" + item.drugstoreName + "\">" + item.showWorkDate + "（" + item.week + "）" + seq + " [" + item.drugstoreName + "]" + "</div>" +
                "</div>"
            return str
        }
    }
    docDetail.init()
})