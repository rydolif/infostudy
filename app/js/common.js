$(function() {

$(".preloader").delay(1000).fadeOut();


  $('.tabs ul a:first').addClass('active');

  $('.tabs ul a').click(function(event){
    $('.tabs ul a').removeClass('active');
    $(this).addClass('active');
  });

//-------tabs----------

  $('.footer__tabs').hide();
  $('.footer__tabs:first').show();
  $('.footer__list a:first').addClass('active');

  $('.footer__list a').click(function(event){
    event.preventDefault();
    $('.footer__list a').removeClass('active');
    $(this).addClass('active');
    $('.footer__tabs').hide();

    var selectTab = $(this).attr('href');
    $(selectTab).fadeIn();
  });

//-------------checkbox-----------------
  $('.checkbox').on('change', function() {
    var btn = $('.request__container .btn--green');
    if ( btn.attr('disabled') ){
      btn.removeAttr("disabled");
      $('.label').addClass('label__active');
    }
    else{
      btn.attr("disabled", true);
      $('.label').removeClass('label__active');
    }
});

$('.modal').popup({ transition: 'all 0.3s' });


  

});

