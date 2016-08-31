    $("head").append('<link rel="stylesheet" type="text/css" href="css/topBar.css">');
    $("head").prepend('<meta name="format-detection" content="telephone=no" />');
    $('body').prepend(
        "<div id=\"topBar\">" +
        "<div class=\"item-box\">" +
        "<div class=\"item store-Icon\" id=\"store-Icon\" ></div>" +
        "<div class=\"item person-center\" id=\"person-center\"  >个人中心</div>" +
        "<div class=\"item shop-car\" id=\"shop-car\" ></div>" +
        "</div>" +
        "</div>"
    );
    var $topBar = $('#topBar');
   $(function(){
       $('#store-Icon').bind('click', function(e) {
           // alert($(this).attr('id'))
           window.location.href ='index.html';
           //top.window.location = 'index.html';
       });
       $('#person-center').bind('click', function(e) {
           window.location.href ='personal_center.html';
       });
       $('#shop-car').bind('click', function(e) {
           window.location.href ='shoppingcarlist.html';
       });
   });