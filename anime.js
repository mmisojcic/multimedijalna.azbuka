
mainAnimation();

function mainAnimation(){
  var elems = [];
  for (i=0;i<30;i++){
    var start = setPosition();
    var elem = $(document.createElement('img'));
    elem.attr({id:i, src:'img/A-SH/'+(i+1)+'.jpg'})
    .addClass('box-small')
    .css({"top": start[0], "left": start[1]})
    .appendTo('#box-anime');
    elems.push(elem);
  }
    var endTop,endLeft;//kraj animacije top/left pozicije
    var nextLeft = ($('#box-anime').width()/6);//sledeca left pozicija za element
    var nextTop = ($('#box-anime').height()/5);//sledeca top pozicija za element
    var c = 0;//brojac elementa u redu
    var r = 0;//brojac redova
    for(j=0;j<30;j++){
      if(j==0){endTop=0;endLeft=0};
      $(elems[j]).animate({opacity:1, top:endTop, left:endLeft, width:"15.266666667%", height:"18.6%" }, 3000);
      endLeft = endLeft + nextLeft;
      c++;
      if(c == 6){
        r ++;
        endTop = nextTop * r;
        endLeft = 0;
        c = 0;
      }
      if(j==29){
        //aktivacija animacije za tekst
        $('#text').delay(2500).fadeIn(1500);
        $('#text').delay(1000).fadeOut(1000, function(){
          $('#main-anime-box').fadeOut(2600);
          for(i=0;i<30;i++){
            var end = setPosition();
            $(elems[i]).animate({top:end[0], left:end[1], width:0, height:0, opacity:0}, 2500, function(){
              this.remove();
              $('#main-anime-box').remove();
            });
          }
        });
      }
    }
}


function setPosition(){
  // dimenzije box-anime
  var boxH = $('#box-anime').height() - 50;
  var boxW = $('#box-anime').width() - 50;

  var nboxH = Math.floor(Math.random() * boxH);
  var nboxW = Math.floor(Math.random() * boxW);

  return [nboxH,nboxW];
}
