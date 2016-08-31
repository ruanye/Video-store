$(function() {
    var $content = $('.content');
    var addressId='';
    var chufanObj = {
        ajaxdata: {
            addressId: '', //地址id
            customerId: LS.get('custormid'), //客户id
            delivery: '', //送药方式
            drugstoreId: '', //医馆id
            number: 1, //数量
            tisaneMethods: '', //煎药方式
            img: ''
        },
        imgUrl: [], //服务器返回的处方照片地址
        init: function() {
            var _this = this;
            //加载默认地址
            $.ajax({
                url: Constants.hostIp + 'weixin/plus/address/list',
                type: 'get',
                data: {
                    customerId: LS.get('custormid')
                },
                timeout: 5000,
                success: function(data, status) {
                	console.log(data)
                    var results = data.lst;
                    var defaultObj = {};
                    //拼接所有地址
                    if (!results) {
                        str = "<p class='noAddresss' style=\"text-indent:1rem;margin-top:0.5rem;\">暂无地址，请编辑</p>";
                         $('#address-box').html(str);
                        return
                    }

                    for (var i = 0; i < results.length; i++) {
                        var result = results[i];
                        if (result.isDefault == 1) {
                            defaultObj = result;
                            break;
                        } else {
                            defaultObj = results[0];
                        }
                    }
                    if (defaultObj.linkman || defaultObj.linkphone || defaultObj.content) {
                        var str =
                            '<img class="addicon" src="images/1/address-icon.png" alt="">' +
                            '<p class="ad n">' + defaultObj.linkman + '<span>' + defaultObj.linkphone + '</span></p>' +
                            '<p class="ad">' + defaultObj.content + '</p>';
                    } else {
                        str = "<p class='noAddresss' style=\"text-indent:1rem;margin-top:0.5rem;\">暂无地址，请编辑</p>";
                    }

                    $('#address-box').html(str);
                    $('.address').attr('defaultid', '' + defaultObj.id + '');
                    _this.ajaxdata.addressId = defaultObj.id;
                    addressId=defaultObj.id
                },
                error: function(err) {
                    console.log(err);
                }
            })
            addressList(function(item, needId) {
                $('#address-box').html(item);
                _this.ajaxdata.addressId = needId;
                console.log(_this.ajaxdata.addressId)
            });
            $content.find('.storeSelect').on('click', '.select-Parent', function(e) {
                var $index = $(this).index()
                $(this).find('.select-icon').addClass('active').html('&#xe602;').parent().siblings('.select-Parent').find('.select-icon').removeClass('active').html('&#xe616;')
                if ($index == 1) {
                    _this.ajaxdata.drugstoreId = 1 //门店id
                } else if ($index == 2) {
                    _this.ajaxdata.drugstoreId = 2
                }
            })
            $('#imgSubmit').on('click', function(e) {
                var localIdsImg;
                var ajaxMedia_id = [];
                wx.chooseImage({
                    count: 3, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function(res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        localIdsImg = res.localIds;
                        localIds.forEach(function(item) {
                            $('#imgSubmit').before(
                                "<div class=\"item\">" +
                                "<img src=\"" + item + "\" style=\"width:100%;height:100%;\">" +
                                "</div>"
                            )
                        })
                        var i = 0; 
                        var length = localIds.length;
                        var upload = function() {
                            wx.uploadImage({
                                localId:localIds[i],
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function(res) {
                                    $.ajax({
                                        type: "get",
                                        url: Constants.hostIp + 'api/loadFile',
                                        dataType: "json",
                                        data: {mediaids: res.serverId},
                                        success: function(data) {
                                            if (status == 0) {
                                                _this.imgUrl.push(data.urls);
                                            } 
                                            i++;
                                            if (i <=length-1) {
                                                upload();
                                            }
                                        }
                                    })

                                }
                            });                    
                        };
                        upload();
                    }
                });
            })
            $('#imgSubmit').on('click', function(e) {

            })
            $('.type').on('click', '.select-Parent', function(e) {
                var $index = $(this).index()
                $(this).find('.select-icon').addClass('active').html('&#xe602;').parent().siblings('.select-Parent').find('.select-icon').removeClass('active').html('&#xe616;')
                if ($index == 1) {
                    _this.ajaxdata.tisaneMethods = 1;
                } else if ($index == 2) {
                    _this.ajaxdata.tisaneMethods = 2;
                } else if ($index == 3) {
                    _this.ajaxdata.tisaneMethods = 3;
                }
            })
            $('.transport').on('click', '.select-Parent', function(e) {
                var $index = $(this).index()
                $(this).find('.select-icon').addClass('active').html('&#xe602;').parent().siblings('.select-Parent').find('.select-icon').removeClass('active').html('&#xe616;')
                if ($index == 1) {
                    _this.ajaxdata.delivery = 1;
                    addressId=_this.ajaxdata.addressId
                    _this.ajaxdata.addressId = '';
                    $('.wrap-page .address').hide()
                } else if ($index == 2) {
                    _this.ajaxdata.delivery = 2;
                    _this.ajaxdata.addressId = addressId;
                    $('.wrap-page .address').show()
                }
            })
            $('.submit .subtn').on('click', function(e) {
                    e.preventDefault();
                    _this.ajaxdata.number = $('#numbers').val()
                    _this.ajaxdata.remark = $('#textarea').val()
                    _this.ajaxdata.customerId = LS.get('custormid')
                    console.log(_this.ajaxdata)
                    var isChecked = function() {
                        // if (_this.ajaxdata.img=='') {
                        // 	_this.AlertShow('请上传图片')
                        // 	return false
                        // }						
                        if (!_this.ajaxdata.drugstoreId) {
                            _this.AlertShow('请选择医馆')
                            return false
                        }
                        if (_this.ajaxdata.number == 0) {
                            _this.AlertShow('处方数量必须大于0')
                            return false
                        }
                        if (!_this.ajaxdata.tisaneMethods) {
                            _this.AlertShow('请选择煎药方式')
                            return false
                        }
                        if (!_this.ajaxdata.delivery) {
                            _this.AlertShow('请选择送药方式')
                            return false
                        }
                        return true
                    }()
                    if (isChecked) {
                        _this.submit()
                    }
                })
                //加载抓药提示消息
            $.ajax({
                type: "get",
                url: Constants.hostIp + 'weixin/index/imgs',
                dataType: "json",
                data: _this.ajaxdata,
                success: function(data) {
                    if (data.status == 0) {
                        $('.warn .right').text(data.prescriptionTips)
                    } else {
                        console.log(data.msg)
                    }
                }.bind(this),
                error: function(err) {
                    console.log('err')
                }
            });
        },
        AlertShow: function(text) {
            $.alerts({
                title: "提示",
                contentText: text,
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
        },
        submit: function() {
            var _this = this;
            _this.ajaxdata.img = _this.imgUrl.join(',')
            $.ajax({
                type: "post",
                url: Constants.hostIp + 'weixin/plus/recipe/save',
                dataType: "json",
                data: _this.ajaxdata,
                success: function(data) {
                    console.log(data);
                    if (data.status == 0) {
                        $.alerts({
                            title: "提示",
                            contentText: '处方提交成功',
                            submitText: "确认",
                            submitClass: "btn-submit",
                            cancleText: "取消",
                            cancleClass: "btn-cancle",
                            callback: function(index, item) {
                                setTimeout(function() {
                                    location.href = "chufang-detail.html?id=" + data.id
                                }, 1500)
                            }
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
                                }, 1500)
                            },
                        })
                    }
                }.bind(this),
                error: function(err) {
                    console.log('err')
                }
            });
        }
    }
    //判断是否注册
    islogin(function(){
        //
        chufanObj.init()
    })
})
