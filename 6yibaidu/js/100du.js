/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 17-6-24
 * Time: 上午9:51
 * To change this template use File | Settings | File Templates.
 */

$(function(){

    (function($){
        var oLi = $('#search ul li');
        var oTxt = $('#search .form .text')
        var iNow = 0;
        var arrTxt=[
            '例如11111111111111',
            '例如22222222',
            '例如333333333',
            '例如444444444444',
            '例如555555555'
        ];
        // 确定第一个状态
        oTxt.val(arrTxt[iNow]);

        // 点击以后的变化

        oLi.each(function(index){

            $(this).click(function(){
                oLi.removeClass();
                $(this).addClass('active').siblings().addClass('gradient');

                //alert(index);
                //alert($(this).index())

                oTxt.val(arrTxt[index]);
            })
        })

    })(jQuery);


    // update文字更新

    (function($){

       // arr=[{},{},{}]

        var oDiv=$('.update');
        var oUl = oDiv.find('ul');
        var iH = 0;
        var arrData = [
			{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.maomao.com/2013/' },
			{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.maomao.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.maomao.com/2013/#about' },
			{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.maomao.com/2013/#message' },
			{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.maomao.com/2013/' },
			{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.maomao.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.maomao.com/2013/#about' },
			{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.maomao.com/2013/#message' }
		];
        var oBtnUp =$('#updateUpBtn');
        var oBtnDown =$('#updateDownBtn');
        var iNow = 0;
        var str='';
        var timer = null;

        for(var i=0;i<arrData.length;i++){
            str+='<li><a href="'+ arrData[i].url+'"><strong>'+arrData[i].name+'</strong><span>'+
                arrData[i].time+'分钟前</span>写了一篇新文章：'+ arrData[i].title+'...</a></li>'
        }

        oUl.html(str);  // 把内容装进 ul中
        iH =oUl.find('li').height();

        // 自动滚动
        function autoPlay(){
            timer=setInterval(function(){
                doMove(-1);
            },3500)
        }
        autoPlay();

        function doMove(num){
           iNow+=num;
           if(Math.abs(iNow)>arrData.length-1){
               iNow = 0;
           }
           if(iNow>0){
               iNow = -(arrData.length-1);
           }
           oUl.animate({'top':iH*iNow},2200,'easeBoth');
        }
        oBtnUp.click(function(){
            doMove(-1)
        })
        oBtnDown.click(function(){
            doMove(1)
        })
        oDiv.hover(function(){
            clearInterval(timer)
        },autoPlay);

    })(jQuery);


    //  选项卡切换


      (function($){
          function dTab(oLis,aCon,sEvent){
               aLi = oLis.children();
               aCon.hide().eq(0).show();

              aLi.each(function(index){
                  $(this).on(sEvent,function(){
                      aLi.removeClass('active').addClass('gradient');
                      $(this).removeClass('gradient').addClass('active');
                      aLi.find('a').attr("class",'triangle_down_gray');
                      $(this).find('a').attr('class','triangle_down_red');
                      aCon.hide().eq(index).show();

                  })
              })
          }
          dTab($('.tabNav1'),$('.tabCon1'),'click');
          dTab($('.tabNav2'),$('.tabCon2'),'click');
          dTab($('.tabNav3'),$('.tabCon3'),'mouseover');
          dTab($('.tabNav4'),$('.tabCon4'),'mouseover');

      })(jQuery);



      // 自动焦点图播放
    (function($){
         // 找对象
        var oDiv = $('#fade');
        var aUlLi = oDiv.find('ul li');
        var aOlLi = oDiv.find('ol li');
        var oP = oDiv.find('p')
        var arrTxt = ['爸爸去啊里了','人们在学习中成长','美丽大方'];
        var iNow = 0;
        var timer = null;

        fadePlay();
        aOlLi.click(function(){
            iNow = $(this).index();
            fadePlay()

        })
        oDiv.hover(function(){
                clearInterval(timer)},
                autoPlay

        )
        function autoPlay(){
            timer=setInterval(function(){
                iNow++;
                iNow%=arrTxt.length;
                //if(iNow>=arrTxt.length-1)iNow=0;
                fadePlay()
            },2000)
        }
        autoPlay();
        
        function fadePlay(){
            aUlLi.each(function(ind){
                if(ind != iNow){
                    aUlLi.eq(ind).fadeOut().css('zIndex',1)
                    aOlLi.eq(ind).removeClass('active')
                }else{
                    aUlLi.eq(ind).fadeIn().css('zIndex',2);
                    aOlLi.eq(ind).addClass('active');
                }
            })
            oP.text(arrTxt[iNow]);
        }

    })(jQuery);

    (function($){
         var aSpan = $('.calendar h3 span');
         var aImg = $('.calendar .img');
         var oTips = $('.today_info');
         var oImg = oTips.find('img');
         var oStrong = oTips.find('strong');
         var oP = oTips.find('p');

         aImg.hover(function(){
                var iTop = $(this).parent().position().top-30;
                var iLeft = $(this).parent().position().left+55;
                var index = $(this).parent().index()%aSpan.size();
                 oImg.attr("src",$(this).attr("src"));
                 oTips.show().css({'left':iLeft,'top':iTop});
                 oP.text($(this).attr('info'));
                 oStrong.text(aSpan.eq(index).text());
                 //oTips.show();
             },
             function(){
             oTips.hide();
         })

    })(jQuery);

    // BBS的高亮显示
    (function($){

        $('.bbs ol li').mouseover(function(){
            $('.bbs ol li').removeClass('active').eq($(this).index()).addClass('active');
        })

    })(jQuery);


    // HOT鼠示提示

    (function($){
          var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];

       $('.hot_area li').mouseover(function(){
            if($(this).index()==0) return;
            $('.hot_area li p').remove();

           $(this).append('<p style=width:'+ ($(this).width()-12)+'px;height:' + ($(this).height()-12)+'px;>'+ arr[$(this).index()]+'</p>');

       })

    })(jQuery)

})