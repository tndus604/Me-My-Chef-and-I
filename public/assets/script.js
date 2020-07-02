function checkFridge() {
    var fridgeItems = document.getElementById("fridgeItems");
    var openFridge = document.getElementById("openFridge");
    var closeFridge = document.getElementById("closeFridge");
    fridgeItems.style.display = "block";
    openFridge.style.display = "block";
    closeFridge.style.display = "none";
  }


$('.clickable').hover(function(){
    $('.selector').stop(true,true).fadeTo( 400 , 0.0, function() {
      $('.selector').css('background-image',"url('assets/fridge2.jpg')");
      });
  $('.selector').fadeTo( 400 , 1);
},
  function(){
      $('.selector').stop(false,true).fadeTo( 400 , 0.0, function() {
        $('.selector').css('background-image',"url('assets/img/pic.jpg')");
        });
    $('.selector').fadeTo( 400 , 1);
  }
);