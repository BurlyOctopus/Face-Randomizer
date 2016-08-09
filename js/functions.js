$(document).ready(function() {
  var numOfTeam = 15,
    numOfTracks = 3,
    teamMembers = [],
    wrapperWidth = $('.sliderWrapper').width(),
    wrapperHeight = $('.sliderWrapper').width()/numOfTracks,
    slider = $('.sliderWrapper'),
    rowTop = $('.sliderTop'),
    rowMiddle= $('.sliderMiddle'),
    rowBottom = $('.sliderBottom');

 var teamImages =['https://s3-us-west-2.amazonaws.com/s.cdpn.io/276996/barry.jpg','https://s3-us-west-2.amazonaws.com/s.cdpn.io/276996/carl.jpg','https://s3-us-west-2.amazonaws.com/s.cdpn.io/276996/chris.jpg','https://s3-us-west-2.amazonaws.com/s.cdpn.io/276996/joanna.jpg','https://s3-us-west-2.amazonaws.com/s.cdpn.io/276996/joe.jpg','https://s3-us-west-2.amazonaws.com/s.cdpn.io/276996/kristy.jpg'];

function generateRowNumbers(min, max){
    //Function Gets a random number betweeen min and max.
   return Math.floor((Math.random() * max) + min)
  //Get the precentage of 100% that each item makes up... Mutiply it by random number.
  randNum();
}
function activateTeam(id,wrapper){
  console.log(id, wrapper);
    $('.active', wrapper).removeClass('active');
  $('[data-id="'+ id +'"]', wrapper).addClass('active');
}
function randomTeam(){
//   var randTop = generateRowNumbers(0, numOfTeam),
//       randMiddle = generateRowNumbers(0, numOfTeam),
//       randBottom = generateRowNumbers(0, numOfTeam);


//     // console.log(randTop, randMiddle, randBottom);
//     while (randTop == randMiddle || randTop == randBottom || randMiddle == randBottom) {
//       if(randTop == randMiddle){
//         randTop = generateRowNumbers(0, numOfTeam);
//         // console.log('New Top Number '+randTop);
//       }
//        if(randTop == randBottom){
//         randTop = generateRowNumbers(0, numOfTeam);
//         // console.log('New Top Number '+randTop);
//       }
//       if(randMiddle == randBottom){
//         randMiddle = generateRowNumbers(0, numOfTeam);
//         // console.log('New Middle Number '+randMiddle);
//       }
//       // console.log('New Numbers: '+ randTop, randMiddle, randBottom);
//     }
//       activateTeam(randTop, rowTop);
//       activateTeam(randMiddle, rowMiddle);
//       activateTeam(randBottom, rowBottom);
//       randTop = (100/parseInt(numOfTeam)) * randTop,
//       randMiddle = (100/parseInt(numOfTeam)) * randMiddle,
//       randBottom = (100/parseInt(numOfTeam)) * randBottom;

  for (var i = 0; i < numOfTracks; i++) {
    var randomNum = (generateRowNumbers(0, numOfTeam));
      activateTeam(randomNum, '.slider'+ i);
     $('.slider'+ i +' .sliderTrack').css('transform', 'translateY(-' + (wrapperHeight*i) + 'px) translateX(-' + (100/parseInt(numOfTeam)) * randomNum + '%)');
  }
}
function initializeSlider(){

   for (var i = 0; i < numOfTeam; i++) {
      teamMembers.push({
          id: i,
          image: 'https://api.adorable.io/avatars/1000/' + i + '.png',
          // image: teamImages[i],
      });
  }
  for (var i = 0; i < numOfTracks; i++) {
     $('.sliderWrapper').append('<div class="sliderPiece slider' + i + '"><div class="sliderTrack"></div></div>');

    for (var j = 0; j < numOfTeam; j++) {
      $('.slider' + i +' .sliderTrack').append('<img data-id="'+ teamMembers[j].id +'" src="'+teamMembers[j].image+'" />');
    }

  }


  $('.sliderTrack').width(numOfTeam * wrapperWidth);
  $('.sliderTrack img').width(wrapperWidth);
  $('.sliderPiece').height(wrapperHeight);
  randomTeam();
  $('.sliderPiece').append('<div class="prevBtn"></div><div class="nextBtn"></div>');
  setTimeout(function(){
    $('.loader').addClass('finished');
  }, 2000);

}
function goToTeamMember(id, parent){
  var translateNum = (100/parseInt(numOfTeam)) * parseInt(id);
  $('.active', slider).removeClass('active');
  for (var i = 0; i < numOfTracks; i++) {
      console.log('change' + i);
     $('.slider'+ i +' .sliderTrack').css('transform', 'translateY(-' + (wrapperHeight*i) + 'px) translateX(-' + translateNum + '%)');
  }
  $('img[data-id="'+ id +'"]').addClass('active');
}
initializeSlider();


$( window ).resize(function() {
  wrapperWidth = $('.sliderWrapper').width();
  wrapperHeight = $('.sliderTop').height();
  $('.sliderTrack').width(numOfTeam * wrapperWidth);
  $('.sliderTrack img').width(wrapperWidth);
  $('.sliderMiddle .sliderTrack').css('transform', 'translateY(-' + wrapperHeight + 'px)');
  $('.sliderBottom .sliderTrack').css('transform', 'translateY(-' + wrapperHeight * 2 + 'px)');
});

$('.random').click(function(){
   randomTeam();
});

$('.nextBtn').click(function(){
  var sliderTrack = $(this).siblings('.sliderTrack'),
      sliderTrackIndex = sliderTrack.parent().index() - 1,
      parent = $(this).parents('.sliderPiece'),
      activeSlide =   $('.active',sliderTrack),
      activeSlideId = $('.active',sliderTrack).attr('data-id'),
      translateNum = '';
  console.log(sliderTrackIndex);
  if(activeSlideId == (parseInt(numOfTeam) - 1)){
    console.log('last slide');
    activeSlide.removeClass('active');
    sliderTrack.children('img').first().addClass('active');
    translateNum = 0;
  } else{
    translateNum = (100/parseInt(numOfTeam)) * (parseInt(activeSlideId) + 1);
    activeSlide.removeClass('active').next().addClass('active');
  }
    sliderTrack.css('transform', 'translateY(-' + (wrapperHeight * sliderTrackIndex) + 'px) translateX(-' + translateNum + '%)');
});

$('.prevBtn').click(function(){
  var sliderTrack = $(this).siblings('.sliderTrack'),
      sliderTrackIndex = sliderTrack.parent().index() - 1,
      parent = $(this).parents('.sliderPiece'),
      activeSlide =   $('.active',sliderTrack),
      activeSlideId = $('.active',sliderTrack).attr('data-id'),
      translateNum = '';
  if(activeSlideId == 0){
    console.log('last slide');
    activeSlide.removeClass('active');
    sliderTrack.children('img').last().addClass('active');
    translateNum =(100/parseInt(numOfTeam)) * (numOfTeam - 1);
  } else{
    translateNum = (100/parseInt(numOfTeam)) * (parseInt(activeSlideId) - 1);
    activeSlide.removeClass('active').prev().addClass('active');
  }
    sliderTrack.css('transform', 'translateY(-' + (wrapperHeight * sliderTrackIndex) + 'px) translateX(-' + translateNum + '%)');
});

$('img').click(function(){
  console.log('click');
  var id = $(this).attr('data-id'),
      parent = $(this).parents('.sliderPiece');
  goToTeamMember(id,parent);
});
});
