    $.ajax({
        url: Constants.hostIp + 'weixin/index/imgs',
        type: 'get',
        timeout: 5000,
         success: function(data) {
           
            if (data.status == 0) {
                
                 data.freeDelivery =data.freeDelivery||120;
                var str = '统一收取'+data.delivery+'元运费，满'+data.freeDelivery+'元免运费'
                $('.tip').html(str);
               

            }
      
        },
        error: function(err) {
       }
    })