window.onload = function () {
    
    //无缝轮播图
    (function () {
        var oImg = document.getElementById('content').children[0];
        var oNum = document.getElementById('index').children[0].children;
        var oDiv = document.getElementById('carousel');

        //这次要移动到的位置
        var iScroll=0;
        //标记事件开始时的iScroll
        var iStartX=0;
        //触摸开始时触摸点的X坐标
        var iStartPageX=0;
        //0,1,2，这次要移动到的序号
        var iNow=0;
        var oTimer=0;
        var iWidth = oDiv.clientWidth;

        //无缝必定会复制
        oImg.innerHTML += oImg.innerHTML;
        //oImg.style.width = oImg.clientWidth*2 + 'px';
        
        function autoPlay() {
            oTimer = setInterval(function () {
                iNow++;
                next();
            },2000)
        }
        autoPlay();

        function next() {
            iScroll=-iNow*iWidth;
            //需不需要重置
            var flag = false;
            //处理iNow
            if(iNow >= oNum.length){
                iNow = iNow%oNum.length;
                flag = true;
            }
            //变序号
            for(var i=0;i<oNum.length;i++){
                oNum[i].className="";
            }
            oNum[iNow].className="on";
            //变图（无缝）
            if(flag){
                //先运动再回调重置，必须回调重置，不能直接重置
                tweenMove(oImg,{translateX:iScroll},300,"easeOut",function () {
                    iScroll=-iNow*iWidth;
                    css(oImg,"translateX",iScroll);
                });
            }else{
                tweenMove(oImg,{translateX:iScroll},300,"easeOut");
            }
        }

        oImg.addEventListener('touchstart',fnStart,false);
        function fnStart(e) {
            //机制：先结束之前的动画
            clearInterval(oTimer);
            iScroll=-iNow*iWidth;
            css(oImg,"translateX",iScroll);
            //机制
            if(iNow <= 0){
                iNow+=oNum.length;
                iScroll=-iNow*iWidth;
                css(oImg,"translateX",iScroll);
            }
            iStartPageX = e.changedTouches[0].pageX;
            iStartX = iScroll;
        }

        oImg.addEventListener('touchmove',fnMove,false);
        function fnMove(e) {
            //iDis为正数即是右滑，负数即是左滑
            var iDis = e.changedTouches[0].pageX - iStartPageX;
            iScroll = iStartX + iDis;
            css(oImg,"translateX",iScroll);
        }
        
        oImg.addEventListener('touchend',fnEnd,false);
        function fnEnd(e) {
            var iDis = e.changedTouches[0].pageX-iStartPageX;
            //-1:右移一张,1,0
            var iNum = Math.round(iDis/iWidth);
            iNow -= iNum;
            next();
            autoPlay();
        }
    })();


    //分享按钮

};