$(document).ready(function(){
    
    $( document ).tooltip();
    
    $('.heart-icon').click(function(){
        
        console.log('Click');
        $(this).toggleClass('fa-heart-o').toggleClass('fa-heart');
        
    });
    
    var channels = ["ESL_SC2", "OgamingSC2", "cretetion","brunofin", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "comster404", "noobs2ninjas", "medrybw"]; 
    
    $(".section-title").click(function(){
        
        var arrowClass;
        
        if (window.innerWidth < 728){
            arrowClass = 'arrow-down-mobile';
        } else arrowClass = 'arrow-down';
        
        $(".selected").fadeOut();
        $($($('.selected')[0]).prev().children()[0]).toggleClass(arrowClass);
        $('.selected').toggleClass('selected');
        $($(this).next()).fadeIn();
        $($(this).next()).toggleClass('selected');
        $($($('.selected')[0]).prev().children()[0]).toggleClass(arrowClass);
        //$($($(this).parent().next().children()[0]).children()[0]).toggleClass('arrow-down');
        
        
    });
    

    for (var i = 0; i< channels.length; i++){
        
        $('#all-channels').append("<div class='col-lg-12 channel text-center'>"+channels[i]+"</div>");
        
        $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/streams/'+channels[i],
            headers: {
                'Client-ID': 'tj1wz5kv8cra9551xyfy82rhc0drzgq'
            },
            
            error: function(error){
                var url = this.url.split("/")
                
                var errorChannel = $('.col-lg-12.channel').filter(function(index){
                    //console.log($($('.col-lg-12.channel')[index]).text());
                    return $($('.col-lg-12.channel')[index]).text() == url[url.length-1];
                });

                $(errorChannel).html("<i class='fa fa-trash' aria-hidden='true' title='The channel does not exist'></i>"+"   "+$(errorChannel).text());
            },
            
            success: function(data) {
                
                //console.log(data);
                if (data.stream != null){
                    var html = "<a href='"+data.stream.channel.url+"'><div class='col-md-8 col-xs-8 channel'>"+data.stream.channel.display_name+"</div><div class='col-md-4 col-xs-4 channel logo-img'> <img src='"+data.stream.channel.logo+"' class='img-responsive img-thumbnail'></a>";

                    $('#online-channels').append(html);
                    
                }
            }
        }).done(function(){
            if (window.innerWidth < 728){
                $('.col-md-4.col-xs-4.channel.logo-img').css('display','none');
                $('.img-responsive.img-thumbnail').css('display','none');
            }
        });
    }
    
    if (window.innerWidth < 728){
        
        $('.section-title').css('font-size', '15px');
        $('.arrow-down').toggleClass('arrow-down-mobile').toggleClass('arrow-down');
        
    }
    
    
});