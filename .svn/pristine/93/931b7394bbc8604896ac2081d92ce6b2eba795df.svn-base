$(function() {
    var $slideBox = $('.nav-bar');
    var $docList = $('.nav-content')
    var doctorObj = {
        ajaxData: {
            departmentName: '',
            seq: '',
            storeId: '',
            workDate: '',
            pageNo: 1,
            pages: 10
        },
        init: function() {
            var _this = this;
            $(document.body).infinite();
            var loading = false; //状态标记
            $(document.body).infinite().on("infinite", function() {
                if (loading) return;
                loading = true;
                $('.weui-infinite-scroll').show()
                _this.ajaxData.pageNo++;
                $(document.body).destroyInfinite()
                setTimeout(function() {
                    _this.ajaxGet();
                    $('.weui-infinite-scroll').hide()
                    loading = false;
                }, 1500); //模拟延迟
            });
            _this.ajaxGet(0) //初次加载所有医生列表
            _this.keshiGet() //加载科室列表
            _this.storeAjax()//加载门店
            dateList().forEach(function(item,index){
                $slideBox.find('.item3 .slide-box').append('<div class="slide">'+item+'</div> ')
            })

            $(document).on('click', function(e) {
                $slideBox.find('.item').removeClass('active')
            })
            $slideBox.on('click', '.item', function(e) {
                e.stopPropagation()
                $(this).toggleClass('active').siblings('.item').removeClass('active')
            })
            $slideBox.find('.item1 .slide-box').on('click', '.slide', function(e) {
                e.stopPropagation()
                var $storeId = $(this).data('id')
                var $name = $(this).text()
                $slideBox.find('.item1 .warnText').text($name)
                $slideBox.find('.item1').removeClass('active')
                _this.ajaxData.storeId = $storeId
                $(document.body).infinite();
                _this.ajaxData.pageNo = 1;
                _this.ajaxData.name = '';
                $('#searchName').val("")
                $docList.empty()
                _this.ajaxGet()
            })
            $slideBox.find('.item2 .slide-box').on('click', '.slide', function(e) {
                e.stopPropagation()
                var $index = $(this).index();
                var $name = $(this).text()
                $slideBox.find('.item2 .warnText').text($name)
                if ($index == 0) {
                    _this.ajaxData.departmentName = '';
                } else {
                    _this.ajaxData.departmentName = $(this).text();
                }
                $(document.body).infinite();
                _this.ajaxData.pageNo = 1;
                _this.ajaxData.name = '';
                $('#searchName').val("")
                $slideBox.find('.item2').removeClass('active');
                $docList.empty()
                _this.ajaxGet()
            })
            $slideBox.find('.item3 .slide-box').on('click', '.slide', function(e) {
                e.stopPropagation()
                var $index = $(this).index();
                var $name = $(this).text()
                $slideBox.find('.item3 .warnText').text($name)
                $slideBox.find('.item3').removeClass('active')
                _this.ajaxData.workDate = $(this).text();
                $(document.body).infinite();
                _this.ajaxData.pageNo = 1;
                _this.ajaxData.name = '';
                $('#searchName').val("")
                $docList.empty()
                _this.ajaxGet()
                console.log($index);
            })
            $slideBox.find('.item4 .slide-box').on('click', '.slide', function(e) {
                e.stopPropagation()
                var $index = $(this).index() + 1;
                var $name = $(this).text()
                $slideBox.find('.item4 .warnText').text($name)
                $slideBox.find('.item4').removeClass('active')
                _this.ajaxData.seq = $index;
                $(document.body).infinite();
                _this.ajaxData.pageNo = 1;
                _this.ajaxData.name = '';
                $('#searchName').val("")
                $docList.empty()
                _this.ajaxGet()
            })
            $('.search .close').on('click', function(e) {
                $('#searchName').val("")
            })
            $('#search').on('click', function(e) {
                var searchName = $('#searchName').val();
                if (!searchName) {
                    return false;
                }
                console.log(searchName)
                _this.ajaxData.name = searchName;
                $docList.empty()
                _this.ajaxGet()
            })
        },
        storeAjax: function() {
            $.ajax({
                url: Constants.hostIp + 'weixin/queueDrugstore',
                type: 'get',
                timeout: 5000,
                success: function(data, status) {
                    console.log(data);
                    var str = '';
                    data.lst.forEach(function(item, index) {
                        str += "<div data-id=\"" + item.id + "\" class=\"slide\">" + item.name + "</div>"
                    })
                    $slideBox.find('.item1 .slide-box').html(str)
                },
                error: function() {
                    console.log('门店加载err')
                }
            })
        },
        keshiGet: function() {
            $.ajax({
                url: Constants.hostIp + 'weixin/department/list',
                type: 'get',
                timeout: 5000,
                success: function(data, status) {
                    var str = '';
                    data.list.forEach(function(item, index) {
                        str += "<div class=\"slide\">" + item.name + "</div>"
                    })
                    $slideBox.find('.item2 .slide-box').html(str)
                },
                error: function() {
                    console.log('科室加载err')
                }
            })
        },
        ajaxGet: function(type) {
            var _this = this;
            if (type == 0) {
                _this.ajaxData = {
                    pageNo: 1,
                    pages: 10
                }
            }
            $.ajax({
                url: Constants.hostIp + 'weixin/doctor/search',
                type: 'get',
                timeout: 5000,
                data: _this.ajaxData,
                success: function(data, status) {
                    console.log(data);
                    if (status == 'success' && data.status == 0) {
                        // $docList.append(_this.domStr()) 
                        var Str = '';
                        if (data.lst.length > 0) {
                            data.lst.forEach(function(item, index) {
                                var temp = _this.domStr(item)
                                Str += temp;
                            })
                            $docList.append(Str)
                            $(document.body).infinite();
                        }else{
                            $docList.html("<p style=\"margin-top:1rem;text-align:center;font-size:0.5rem;\">暂无医生信息</p>")
                        }
                        if (data.pageNo>= data.pages) {
                            $(document.body).destroyInfinite()
                            $('.weui-infinite-scroll').hide()
                        }
                    } else {

                    }
                }.bind(this),
                error: function() {
                    console.log('err')
                }.bind(this)
            })
        },
        domStr: function(item) {
            var drugstoreName = '无';
            var introduction = '无';
            var icon = item.icon;
            if (item.drugstoreName !== undefined) {
                drugstoreName = item.drugstoreName
            }
            //introduction:简介 ,summary:详情
            if (item.introduction !== undefined) {
                introduction = item.introduction
            }
            if (!item.icon) {
                icon = 'images/1/docutor-icon.png'
            }
            var job=item.job?"（"+item.job+"）":''
            var str =
                "<div class=\"item item1\">" +
                "<a href=\"doctor_info.html?id=" + item.doctorId + "\" class=\"docutor-detail\">" +
                "<div class=\"left\" style=\"background-image:url(" + icon + ")\">" +
                // "<div class=\"docutor-icon\" ></div>" +
                "</div>" +
                "<div class=\"right\">" +
                "<div class=\"name\">" + item.name +job + "</div>" +
                // "<div class=\"store flex\">" +
                // "<div class=\"text\">医馆：</div>" +
                // "<div class=\"store-name\">" + drugstoreName + "</div>" +
                // "</div>" +
                "<div class=\"price flex\">" +
                "<div class=\"text\">挂号价格：</div>" +
                "<div class=\"store-name\">" + item.price + "元</div>" +
                "</div>" +
                "<div class=\"detail-docutor flex\">" +
                "<div class=\"text\">简介：</div>" +
                "<div class=\"text-show\">" + introduction + "</div>" +
                "</div>" +
                "</div>" +
                "</a>" +
                "</div> "
            return str
        }

    }
    doctorObj.init()
})
function dateList(){
    var dateArr=[];
    var date=new Date()
    var oneDay=24*60*60*1000;
    var n=1;
    for(var i=0;i<7;i++){
        var year=formate(new Date(date.getTime()+oneDay*n).getFullYear())+'';
        var month=formate(new Date(date.getTime()+oneDay*n).getMonth()+1)+'';
        var day=formate(new Date(date.getTime()+oneDay*n).getDate())+'';
        dateArr.push(year+month+day)
        n++;
    }  
    console.log(new Date(date.getTime()+oneDay*n).getMonth()+1); 
    return dateArr
    function formate(item){
        if(item<10){
            return '0'+item;
        }
        return item;
    } 
}