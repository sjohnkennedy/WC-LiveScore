jQuery(function($){
    $(document).ready(function(){
        var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20cricket.scorecard.live&format=json&env=store%3A%2F%2F0TxIGQMQbObzvU4Apia0V0&callback=";
        
        function getData(){
            console.log('t');
            $.getJSON(url, function(data){
                if(data.query.results == null){
                    $(".score-container").slideUp(500, function(){
                        $(this).remove();
                        $('<div class="score-container"><div class="holder"><h2>No Matches Found</h2></div>').appendTo(".scrs").slideDown(500); 
                    });
                   
                }else{
                    $(".score-container").slideUp(500, function(){
                        $(this).remove();
                        if(data.query.count < 2){
                            var datavar = data.query.results;
                        }else{
                            var datavar = data.query.results.Scorecard;
                        }

                        $.each(datavar, function(key, val){
                            //console.log(this);
                            var THIS = this;
                            var is1, is2, t1, t2, i1, i2, wi;
                            t1 = this.teams[0].fn;
                            t2 = this.teams[1].fn;
                            i1 = this.teams[0].i;
                            i2 = this.teams[1].i;
                            if(THIS.series.series_name === "Cricket World Cup, 2015" || THIS.series.series_name === "World Cup Coverage"){

                                if(this.teams[0].i == this.toss.win && this.toss.bat == "1"){
                                    is1 = 0; is2 = 1;
                                }else if(this.teams[0].i == this.toss.win && this.toss.bat == "0"){
                                    is1 = 1; is2 = 0;
                                }else if(this.teams[1].i == this.toss.win && this.toss.bat == "1"){
                                    is1 = 1; is2 = 0;
                                }else if(this.teams[1].i == this.toss.win && this.toss.bat == "0"){
                                    is1 = 0; is2 = 1;
                                }
                                if(this.ms === "Match Ended"){
                                    if(this.result.winner == i1){
                                        wi = i1;
                                    }else{
                                        wi = i2
                                    }
                                    var str = this.teams[parseInt(wi)].fn + '  won by ' + this.result.by + ' '  + this.result.how;
                                    $('.match-stat').text(str);
                                }

                                if(typeof THIS.past_ings.length == "number"){
                                    if(THIS.past_ings.length == 2){
                                        $('<div class="score-container"><div class="holder"><h2>'+ THIS.teams[0].fn +' Vs '+ THIS.teams[1].fn +' - '+ THIS.ms + '</h2>'+
                                        '<div class="sides">'+ '<div class="sideA"><img class="imgA" src="'+ THIS.teams[1].logo.std +'"/>'+
                                        '<div class="score-cont-lt"><p class="score-set">' + THIS.past_ings[is1].s.a.r +' / '+ THIS.past_ings[is1].s.a.w +'</p>'+
                                           ' <p class="score-set">'+ THIS.past_ings[is1].s.a.o +' Overs</p></div></div>' + '<div class="sideB">'+
                                        '<img class="imgB" src="'+ THIS.teams[0].logo.std +'"/><div class="score-cont-rt">'+
                                            '<p class="score-set">' + THIS.past_ings[is2].s.a.r +' / '+ THIS.past_ings[is2].s.a.w +'</p>'+
                                           ' <p class="score-set">'+ THIS.past_ings[is2].s.a.o +' Overs</p></div></div>' +'</div>'+
                                          '<p class="match-stat">'+ THIS.ms + '</p>'+
                                          '</div></div>'
                                         ).appendTo(".scrs").slideDown(500);   
                                    }
                                }else{
                                    if(is1 == 1){
                                        $('<div class="score-container"><div class="holder"><h2>'+ THIS.teams[0].fn +' Vs '+ THIS.teams[1].fn +' - '+ THIS.ms + '</h2>'+
                                        '<div class="sides">'+ '<div class="sideA"><img class="imgA" src="'+ THIS.teams[0].logo.std +'"/>'+
                                        '<div class="score-cont-lt"><p class="score-set">' + 0 +' / '+ 0 +' (Yet to Bat)</p>'+
                                           ' <p class="score-set">'+ 0 +' Overs</p></div></div>' + '<div class="sideB">'+
                                        '<img class="imgB" src="'+ THIS.teams[1].logo.std +'"/><div class="score-cont-rt">'+
                                            '<p class="score-set">' + THIS.past_ings.s.a.r +' / '+ THIS.past_ings.s.a.w +'</p>'+
                                           ' <p class="score-set">'+ THIS.past_ings.s.a.o +' Overs</p></div></div>' +'</div>'+
                                          '<p class="match-stat">'+ THIS.ms + '</p>'+
                                          '</div></div>'
                                         ).appendTo(".scrs").slideDown(500);
                                    }else if(is2 == 1){
                                        $('<div class="score-container"><div class="holder"><h2>'+ THIS.teams[0].fn +' Vs '+ THIS.teams[1].fn +' - '+ THIS.ms + '</h2>'+
                                        '<div class="sides">'+ '<div class="sideA"><img class="imgA" src="'+ THIS.teams[0].logo.std +'"/>'+
                                        '<div class="score-cont-lt"><p class="score-set">' + THIS.past_ings.s.a.r +' / '+ THIS.past_ings.s.a.w +'</p>'+
                                           ' <p class="score-set">'+ THIS.past_ings.s.a.o +' Overs</p></div></div>' + '<div class="sideB">'+
                                        '<img class="imgB" src="'+ THIS.teams[1].logo.std +'"/><div class="score-cont-rt">'+
                                            '<p class="score-set">' + 0 +' / '+ 0 +' (Yet to Bat)</p>'+
                                           ' <p class="score-set">'+ 0 +' Overs</p></div></div>' +'</div>'+
                                          '<p class="match-stat">'+ THIS.ms + '</p>'+
                                          '</div></div>'
                                         ).appendTo(".scrs").slideDown(500);
                                    }
                                }

                            }

                        });
                    });
                }
            });
            if($('.score-container').length < 0){
                $('<div class="score-container"><div class="holder"><h2>No Matches Found</h2></div>').appendTo(".scrs").slideDown(500);
            }
        }
       
        var int = setInterval(getData, 20000);
    });
});
