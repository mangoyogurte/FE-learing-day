$(function(){

    //导航纵向二级菜单
    (function(){
        var oLi = $('.subli');
        var oDiv = $('.subli .subnav');
        var timer = null;

        oLi.each(function(index){
            $(this).hover(function(){
                oDiv.css('display','none').eq(index).css('display','block');
                clearInterval(timer);
            },function(){
                timer = setInterval(function(){
                    oDiv.eq(index).css('display','none');
                },500);
            });
        });

    })();


    //导航横向二级菜单
    (function (){
        var oLi = $('#nav .navLi');
        var oDiv = $('#nav .navLi .subnav');

        oLi.each(function(index){
            $(this).hover(function(){
                $(this).addClass('active').siblings().removeClass('active');
                oDiv.css('display','none').eq(index).css('display','block');
            });
        });

    })();

    //宝贝店铺tab切换
    (function (){
        var oLi = $('#searchbox li');

        oLi.each(function(){
            $(this).click(function(){
                $(this).addClass('active').siblings().removeClass('active');
            });
        });
    })();

    //下拉菜单
    (function (){
        var oBtn = $('.downbtn');
        var oDiv = $('.submenu');
        var oLi = $('.submenu li');

        oBtn.each(function(index){
            $(this).click(function(){
                if(oDiv.eq(index).hasClass('miss')){
                    oDiv.eq(index).removeClass('miss');
                }else{
                    oDiv.eq(index).addClass('miss');
                }
            });
        });

        oDiv.each(function(){
            $(this).click(function(){
                $(this).addClass('miss');
            });
        });
    })();

    //轮播图
    (function (){
        var oPicli = $('.slide .picture li');
        var oIndexli = $('.slide .index li');
        var oDiv = $('#slide');
        //记录当前显示的图的序号
        var iNum = 0;
        var timer = null;

        function doMove(num){
            //变更iNum
            if(num != null){
                iNum = num;
            }else{
                iNum = iNum==3 ? 0 : iNum+1;
            }

            oPicli.eq(iNum).fadeIn(1000).siblings().fadeOut(1000);
            //oPicli.fadeOut(1000).eq(iNum).fadeIn(1000);不行
            oIndexli.removeClass('now').eq(iNum).addClass('now');
        }

        timer = setInterval(doMove,2000);

        oDiv.hover(function(){
            clearInterval(timer);
        },function(){
            timer = setInterval(doMove,2000);
        });

        oIndexli.each(function(index){
            $(this).mouseover(function(){
                oPicli.stop();
                doMove(index);
            });
        });
    })();

    //阴影
    (function (){
        var oLi = $('.pic li');
        var oshadow = $('.pic li .shadow');

        oLi.each(function(index){
            $(this).hover(function(){
                oshadow.eq(index).stop();
                oshadow.eq(index).fadeOut(300);
            },function(){
                oshadow.eq(index).stop();
                oshadow.eq(index).fadeIn(300);
            });
        });
    })();

    //倒计时
    (function (){
        var oSpan = $('.span3');
        var h=23;
        var m=59;
        var s=59;
        var timer = null;
        oSpan.eq(0).text(h);
        oSpan.eq(1).text(m);
        oSpan.eq(2).text(s);

        //进行倒计时显示
        function run(){
            --s;
            if(s<0){
                --m;
                s=59;
            }
            if(m<0){
                --h;
                m=59
            }
            if(h<0){
                s=0;
                m=0;
            }
            oSpan.eq(0).text(h);
            oSpan.eq(1).text(m);
            oSpan.eq(2).text(s);
        }

        timer=setInterval(run,1000);
    })();

    //侧边栏
    (function (){
        var oDiv = $('.side1');
        var scrollTop;
        window.onscroll=function (){
            scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            if(scrollTop > 220){
                oDiv.css('top',10+scrollTop+'px');
            }else{
                oDiv.css('top',230+'px');
            }
        }
    })();
    



})