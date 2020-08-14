$(document).ready(function(){
  var scrnW = $(document.body).width(),
      scrnH = $(document.body).height(),
      slovoW = $('.slovo').width(),
      slovoH = $('.slovo').height(),
      max = scrnW - (slovoW * 1.2),
      min = slovoW / 2.5,
      rndPos,
      br = -1,
      brUhvacene = 0,
      rukavice = $('#rukavice'),
      rukaviceTop = $('#rukavice').offset().top,
      rukaviceH = $('#rukavice').height(),
      rukaviceW = $('#rukavice').width(),
      indexi = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
      uhvacene = [],
      l_in,
      preloadIzgovor = [],
      izgovor,
      noga1 = $('#noga1'),
      noga2 = $('#noga2'),
      lopta1 = $('#lopta1'),
      lopta2 = $('#lopta2'),
      lopta3 = $('#lopta3'),
      ruka1 = $('#ruka1'),
      ruka2 = $('#ruka2'),
      acc1 = $('#acc1'),
      acc2 = $('#acc2'),
      o = 0,
      animeEnd = rukaviceTop - slovoH;

  //preventovati drag i highlight slika
  $('img').bind('dragstart', function(){return false;}).css("userSelect", "none");

  //preloadovanje fajlova za izgovor
  for(i =0; i < 30; i++){
    var ime = i + 1;
    preloadIzgovor[i] = new Audio("audio/A-SH/"+ ime + ".mp3");
    preloadIzgovor[i].load();
  };

  //poozicioniranje slova
  function pozicioniranje(){
    //random pozicioniranje
    $('.slovo').each(function(i){
      rndPos = Math.ceil(Math.random() * (max - min) + min);
      $('.slovo:eq('+ i +')').css({"left":rndPos,"top":-slovoH}).fadeIn();
    });
  };

  //ponovno  upisivanje velicina i pozicionirranje u slucaju promene velicine prozora
  $(window).resize(function(){
    rukaviceTop = $('#rukavice').offset().top;
    rukaviceH = $('#rukavice').height();
    rukaviceW = $('#rukavice').width();
    scrnW = $(document.body).width();
    scrnH = $(document.body).height();
    slovoW = $('.slovo').width();
    slovoH = $('.slovo').height();
    max = scrnW - (slovoW * 1.2);
    min = slovoW / 2.5;
    animeEnd = rukaviceTop - slovoH;
    rukavice.css({"left":scrnW / 2});
    pozicioniranje();
  });


  $('button').click(function(){
    pozicioniranje();
  });

  //random pozicioniranje na startu
  $('.slovo').each(function(i){
    rndPos = Math.ceil(Math.random() * (max - min) + min);
    $('.slovo:eq('+ i +')').css({"left":rndPos,"top":-slovoH});
  });


  //pomeranje rukavica
  $(document.body).bind('mousemove touchmove',function(event){
    var pos = event.pageX - (rukaviceW / 2);
    rukavice.css({"left":pos});
  });


//izgradnja sneska
function izgradnja(){
  o ++;//koeficijent mnozenja sa procentom opacity-ja
  if (uhvacene.length < 5){noga1.fadeTo(600,(o * 0.25));if(o==4){noga1.effect('shake','slow');};};
  if (uhvacene.length > 4 & uhvacene.length < 9){noga2.fadeTo(600,(o * 0.25));if(o==4){noga2.effect('shake','slow');};};
  if (uhvacene.length > 8 & uhvacene.length < 13){lopta1.fadeTo(600,(o * 0.25));if(o==4){lopta1.effect('bounce','slow');};};
  if (uhvacene.length > 12 & uhvacene.length < 17){lopta2.fadeTo(600,(o * 0.25));if(o==4){lopta2.effect('bounce','slow');};};
  if (uhvacene.length > 16 & uhvacene.length < 21){lopta3.fadeTo(600,(o * 0.25));if(o==4){lopta3.effect('bounce','slow');};};
  if (uhvacene.length > 20 & uhvacene.length < 25){ruka1.fadeTo(600,(o * 0.25));if(o==4){ruka1.effect('pulsate','slow');};};
  if (uhvacene.length > 24 & uhvacene.length < 29){ruka2.fadeTo(600,(o * 0.25));if(o==4){ruka2.effect('pulsate','slow');};};
  if (uhvacene.length == 29){acc1.fadeTo(1000,1);};
  if (uhvacene.length == 30){acc2.fadeTo(1000,1); $('#novaigra').show(1000); $('#snesko img').css("zIndex","8002");};
  if(o==4){o=0;};//reset koeficijenta kad dodje na 4
};


  //animacija slika sa slovima
  $(function() {
    setInterval(function(){
      //konstatno uvecanje indexa
      br ++;
      $('.slovo:not(animated):eq('+ indexi[br] +')').animate({top:animeEnd},7000,"linear", function(){
        var rukaviceLeft = $('#rukavice').offset().left,
            desnaGranica = $(this).offset().left < (rukaviceLeft + rukaviceW),
            levaGranica = ($(this).offset().left + (slovoW * 0.85)) > rukaviceLeft;
        //ako je uhvaceno
        if(desnaGranica & levaGranica){
          var k = $('.slovo').index($(this));
          uhvacene[uhvacene.length] = k;
          console.log(uhvacene.length);
          $(this).fadeOut(500);
          rukavice.effect('shake','fast');
          izgovor = preloadIzgovor[k];
          izgovor.play();
          izgradnja();
          //provera da li je poslednje slovo iz trenutnog niza
          if ($('.slovo').index($(this)) == indexi[indexi.length - 1]) {
            $(uhvacene).each(function(i){
              indexi = $.grep(indexi, function(n){
                return n !== uhvacene[i];
              });
            });
            console.log(indexi);
            br = -1;
            pozicioniranje();
          }
        //ako nije
        } else {
          $(this).fadeOut(1000);
          //provera da li je poslednje slovo iz trenutnog niza
          if ($('.slovo').index($(this)) == indexi[indexi.length - 1] ) {
            $(uhvacene).each(function(i){
              indexi = $.grep(indexi, function(n){
                return n !== uhvacene[i];
              });
            });
            console.log(indexi);
            br = -1;
            pozicioniranje();
          }
        }
      });
    },1500);
  });


  //nova igra
  $('#novaigra').click(function(){
    noga1.fadeTo(1000,0);
    noga2.fadeTo(1000,0);
    lopta1.fadeTo(1000,0);
    lopta2.fadeTo(1000,0);
    lopta3.fadeTo(1000,0);
    ruka1.fadeTo(1000,0);
    ruka2.fadeTo(1000,0);
    acc1.fadeTo(1000,0);
    acc2.fadeTo(1000,0);
    $(this).hide(1000);
    indexi = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
    br = -1;
    uhvacene = [];
    o = 0;
  });

});
