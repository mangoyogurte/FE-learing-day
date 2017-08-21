/**
 *  1.代码第一次写出来，肯定大部分是面向过程的，也就是想到什么写什么。所以肯定需要重构
 *  2.重构的时候，把公有成分提取出来成为函数，这样代码就更清晰更易读
 *  3.去掉那些独特的东西，提升代码的可重用性，也就是说放在哪里都可以直接用（只需要修改下DOM获取操作就行）
 */

$(function(){

    // 切换搜索框
    (function (){
        var oLi = $('#menu li');
        var oText = $('#search form .text');
        var arrText = [
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        var iNow = 0;

        oLi.each(function(index){
            $(this).click(function(){
                $(this).attr("class","active").siblings().attr("class","gradient");
                oText.val(arrText[index]);
                iNow = index;
            });
        });

        oText.focus(function (){
            if( $(this).val() == arrText[iNow] ) {
                $(this).val('');
            }
        });
        oText.blur(function (){
            if( $(this).val() == '' ) {
                oText.val(arrText[iNow]);
            }
        });

    })();

    // update文字弹性滑动
    (function (){
        var oUl = $('.update .wrap ul');
        var oDiv = $('.update');
        var oUpBtn = $('#updateUpBtn');
        var oDownBtn = $('#updateDownBtn');
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

        //先填充ul
        var str = "";
        for(var i = 0;i<arrData.length;i++){
            str += '<li><a href="'+ arrData[i].url +'"><strong>'+ arrData[i].name +'</strong> <span>'+ arrData[i].time +'分钟前</span> 写了一篇新文章：'+ arrData[i].title +'…</a></li>';
        }
        oUl.append(str);

        //记录位置
        var iNow = 0;
        var timer = null;
        //li的高度
        var iH = oUl.find('li').height();

        function doMove(num){
            iNow += num;
            if(iNow > arrData.length-1){
                iNow = 0;
            }
            if(iNow < 0){
                iNow = arrData.length-1;
            }
            oUl.animate({top: -iH*iNow+'px'},800);
        }

        //自动播放
        function autoPlay(){
            timer = setInterval(function(){doMove(1);},1000);
        }

        autoPlay();

        //mouseover、mouseout
        oDiv.hover(function(){
            clearInterval(timer);
        },autoPlay);

        //点击事件
        oUpBtn.click(function(){
            oUl.stop();
            doMove(1);
        });

        oDownBtn.click(function(){
            oUl.stop();
            doMove(-1);
        });
          
    })();

    // options 选项卡切换
    (function(){
        var oNavli1 = $('.tabNav1 li');
        var oCon1 = $('.tabCon1');
        var oNavli2 = $('.tabNav2 li');
        var oCon2 = $('.tabCon2');
        var oNavli3 = $('.tabNav3 li');
        var oCon3 = $('.tabCon3');
        var oNavli4 = $('.tabNav4 li');
        var oCon4 = $('.tabCon4');

        function fnTab(oNavli,oCon,event){
            oCon.css("display","none").eq(0).css("display","block");
            oNavli.each(function(index){
                $(this).on(event,function(){
                    $(this).removeClass("gradient").addClass("active").siblings().removeClass("active").addClass("gradient");
                    oNavli.find('a').attr('class', 'triangle_down_gray');
                    $(this).find('a').attr('class', 'triangle_down_red');
                    oCon.css("display","none").eq(index).css("display","block");
                });
            });
        }

        fnTab(oNavli1,oCon1,'mouseover');
        fnTab(oNavli2,oCon2,'mouseover');
        fnTab(oNavli3,oCon3,'mouseover');
        fnTab(oNavli4,oCon4,'mouseover');

    })();


    // 自动播放的焦点图
    (function(){
        var oLi = $('#fade ul li');
        var oOlli = $('#fade ol li');
        var oP = $('#fade p');
        var oDiv = $('#fade');

        $(oLi[0]).siblings().css("display","none");

        //当前播放的图的序号，从1开始播放(从0开始消失)
        var iNum = 0;
        var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
        var timer;


        function change(num){
            if(num != null){
                iNum = num;
            }else{
                iNum = iNum==2 ? 0 : iNum+1;
            }
            $(oLi[iNum]).fadeIn(800).siblings().fadeOut(800);
            $(oOlli[iNum]).addClass("active").siblings().removeClass();
            oP.text(arr[iNum]);
        }

        //自动播放
        function autoPlay(){
            timer = setInterval(change,1000);
        }
        autoPlay();

        //事件
        oOlli.each(function(index){
            $(this).mouseover(function(){
                oLi.stop();
                change(index);
            });
        });

        //mouseover、mouseout
        oDiv.hover(function(){
            clearInterval(timer);
        },autoPlay);

    })();


    //日历提示说明
    (function(){
        var oImg = $('.calendar ol .img');
        var oDiv = $('.today_info');
        var aImg = oDiv.find('img');
        var oStrong = oDiv.find('strong');
        var oP = oDiv.find('p');
        var oSpan = $('.calendar h3 span');

        oImg.each(function(index){
            $(this).hover(function(){
                var iTop = $(this).parent().position().top - 30;
                var iLeft = $(this).parent().position().left + 55;
                oDiv.show().css({'top': iTop , 'left': iLeft});
                aImg.attr('src',oImg.eq(index).attr('src'));
                oP.text($(this).attr('info'));
                //得到星期数
                var iNow = $(this).parent().index()%oSpan.size();
                oStrong.text(oSpan.eq(iNow).text());
            },function(){
                oDiv.hide();
            });
        });

    })();


    // BBS高亮显示
    (function(){
        var oLi = $('.bbs li');
        oLi.each(function(){
            $(this).mouseover(function(){
                $(this).addClass('active').siblings().removeClass();
            });
        });
    })();


    // HOT鼠标提示效果
    (function(){
        var arrText = [
            {"name":1 ,  "area":1 , "hots":1},
            {"name":2 ,  "area":1 , "hots":1},
            {"name":"性感宝贝" ,  "area":"朝阳CBD" , "hots":124987},
            {"name":3 ,  "area":1 , "hots":1},
            {"name":4 ,  "area":1 , "hots":1},
            {"name":5 ,  "area":1 , "hots":1},
            {"name":6 ,  "area":1 , "hots":1},
            {"name":7 ,  "area":1 , "hots":1},
            {"name":8 ,  "area":1 , "hots":1},
            {"name":9 ,  "area":1 , "hots":1},
            {"name":10 ,  "area":1 , "hots":1}
		];

        var oLi = $('.hot_area li');

        oLi.each(function(index){
            $(this).hover(function(){
                var str = "<p>用户名：" + arrText[index].name+"<br>区域：" + arrText[index].area + "<br>人气：" + arrText[index].hots + "</p>";
                $(this).append(str);
            },function(){
                $(this).find('p').remove();
            });
        });
    })();


    //登录ajax
    (function () {
        var oBtn = $('#login');


        oBtn.click(function() {
            var oAccount = $('.account').val();
            var oPassword = $('.password').val();
            $.ajax({
                type: "GET",
                url: "login.php",
                data: "account="+oAccount+"&password="+oPassword,
                success : function(data){
                    if(data != 0){
                        alert("欢迎你："+data);
                        //将登录的用户id存入localstorage，方便以后使用
                        localStorage.setItem("id",data);
                    }
                }
            });
        });
    })();


});