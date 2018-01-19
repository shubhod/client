
console.log("postbox.js working");
$('.postbox').on('click',()=>{
    console.log("clicked");
});
$(window).scroll(function(){
    console.log("scrolled");
  $('.parentbox').children('div').each(function(){
    if(isScrolledIntoView($(this))){
      $(this).children('span').text('visible');
      console.log($(this).attr('class')+"visible");
    }
    else{
      $(this).children('span').text('invisible');
      console.log($(this).attr('class')+"invisble");
    }
  });
});

function isScrolledIntoView(element){
 var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

       
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
       
}