window.onload = function ()
{
    var oBox = get.byId("head3");
    var aImg = get.byTagName(oBox,"li");
    var aLeftIcon = get.byClass(oBox,"img","forward");
    var aRightIcon = get.byClass(oBox,"img","next");
    var timer = play = null;
    var i = index = 0;

    aLeftIcon[0].onclick = function (){
        index--;
        index <0 && (index = aImg.length-1);
        show(index);
    }

    aRightIcon[0].onclick = function (){
        index++;
        index >= aImg.length && (index = 0);
        show(index);
    }
    /*切换按钮
    for (i = 0; i < aNum.length; i++)
    {
        aNum[i].index = i;
        aNum[i].onmouseover = function ()
        {
            show(this.index)
        }
    }*/

    //鼠标划过关闭定时器
    oBox.onmouseover = function ()
    {
        aLeftIcon[0].style.display="block";
        aRightIcon[0].style.display="block";
        clearInterval(play);
    };

    //鼠标离开启动自动播放
    oBox.onmouseout = function ()
    {
        aLeftIcon[0].style.display="none";
        aRightIcon[0].style.display="none";
        autoPlay();
    };

    //自动播放函数
    function autoPlay ()
    {
        play = setInterval(function () {
            index++;
            index >= aImg.length && (index = 0);
            show(index);
        },2000);
    }
    autoPlay();//应用

    //图片切换, 淡入淡出效果
    function show (a)
    {
        index = a;
        var alpha = 0;
        //for (i = 0; i < aNum.length; i++)aNum[i].className = "";
        //aNum[index].className = "current";

        for (i = 0; i < aImg.length; i++)
        {
            fadeOut(aImg[i]);
        }
        fadeIn(aImg[index]);
    }





    //more
    function more(){
        var oShare = document.getElementById('right');
        var timer = null;

        var oDis =parseInt(getStyle(oShare,'right')) ;


        oShare.onmouseover = function(){
            clearInterval(timer);
            timer = setInterval(function(){
                var iSpeed = 2;
                if(oDis == -40){
                    clearInterval(timer);
                }
                else{
                    oDis += iSpeed;
                    oShare.style.right = oDis + 'px';
                }
            },5);

        }


        oShare.onmouseout = function(){

            clearInterval(timer);
            timer = setInterval(function(){
                var iSpeed = -2;
                if(oDis == -228){
                    clearInterval(timer);
                }
                else{
                    oDis += iSpeed;
                    oShare.style.right = oDis + 'px';
                }
            },5);

        }

    }

    more();


    // 页脚无缝滚动

    function moveAll(el,old,iTarget){
        // 防止，你上一个动没有结束，又执行下一个动作
        clearInterval(el.timer);
        el.timer = setInterval(function(){

            var iSpeed = (iTarget - old)/10;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if(iTarget == old){
                clearInterval(el.timer);
            }
            else{
                old += iSpeed;
                el.style.left = old + 'px';
            }

        },30);

    }

    function scroll(){
        var oCf = get.byId("main3");
        var ocPrev = get.byClass(oCf,"img","cn_prev")[0];
        var ocNext = get.byClass(oCf,"img","cn_next")[0];
        var oUl = get.byTagName(oCf,"ul")[0];
        var aLi = get.byTagName(oUl,"li");
        //alert(aLi.length);
        var iNow = 0;
        oUl.innerHTML +=oUl.innerHTML;//复制一份
        oUl.style.width =  aLi.length * aLi[0].offsetWidth + 'px';


        ocPrev.onclick = function(){
            if(iNow==0){   //0转5
                iNow=aLi.length/2;
                oUl.style.left = -oUl.offsetWidth/2 + 'px';
            }
            moveAll(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth)
            iNow--;
        };


        ocNext.onclick = function(){

            if(iNow == aLi.length/2){  //5转0
                iNow = 0;
                oUl.style.left = 0;
            }

            moveAll(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);

            iNow++;
        };

    }

    scroll();


    //模态窗口
    (function(){
        var oA = document.getElementById('signUp');
        var oDiv = document.getElementById('cover');
        var oForm = document.getElementById('register');
        var oReturn = document.getElementById('return');
        var oPromot = document.getElementById('promot');

        oA.onclick = function(){
            oPromot.style.display = 'none';
            oDiv.style.display = 'block';
            oForm.style.display = 'block';
            var y = document.body.scrollTop + document.documentElement.clientHeight/2 - oForm.offsetHeight/2;
            var x = document.body.scrollLeft + document.documentElement.offsetWidth/2 - oForm.offsetWidth/2;
            oForm.style.top = y+'px';
            oForm.style.left = x+'px';
        }

        oReturn.onclick = function(){
            oDiv.style.display = 'none';
            oForm.style.display = 'none';
        }

    })();


    //初始化页面时是否已登录
    (function () {
        var oSpan = document.getElementsByClassName('welcome')[0];
        var oBtn = document.getElementsByClassName('logout')[0];
        var account = localStorage.getItem("account");
        if(account){
            oSpan.innerHTML="欢迎你,"+account;
            oBtn.style.display = "block";
        }else{
            oSpan.innerHTML = "";
            oBtn.style.display = "none";
        }
    })();

    //点击登录
    (function () {
        var oBtn = document.getElementById('login');

        oBtn.onclick = function () {
            if(localStorage.getItem("account")){
                alert("您已登录!");
                return false;
            };
            var oAccount = document.getElementsByClassName('account')[0].value;
            var oPassword = document.getElementsByClassName('password')[0].value;
            var oSpan = document.getElementsByClassName('welcome')[0];

            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            xhr.open('get','login.php?account='+oAccount+"&password="+oPassword,true);
            xhr.send();

            xhr.onreadystatechange = function(){
                if(xhr.readyState==4){
                    data = xhr.responseText;
                    if(data != 0){
                        //由于json对象是用{}括起来的，在javascript中会被当成语句块处理，所以必须将其强制转换成表达式，所以在jsonStr的两边要加上()
                        var object = eval("("+data+")");
                        //将登录的用户名存入localstorage，方便以后使用
                        localStorage.setItem("account",object.count);
                        //将登录的用户名放入span中
                        oSpan.innerHTML="欢迎你,"+object.count;
                        window.location.reload();
                    }
                }

            }
        }
    })();

    //注销
    (function () {
        var oBtn = document.getElementsByClassName('logout')[0];
        oBtn.onclick = function () {
            localStorage.removeItem("account");
            window.location.reload();
        }
    })();


    //注册
    (function () {
        //用户名ajax提示
        var oInput = document.getElementById('account');
        var oPromot2 = document.getElementById('promot2');

        oInput.onblur = function () {
            var oAccount = oInput.value;

            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            xhr.open('get','repeat.php?account='+oAccount,true);
            xhr.send();

            xhr.onreadystatechange = function(){
                if(xhr.readyState==4){
                    data = xhr.responseText;
                    if(data != 0){
                        oPromot2.innerHTML = "*此用户名可以注册";
                    }else{
                        oPromot2.innerHTML = "*此用户名不能注册";
                    }
                }

            }
        }


        //点击注册
        var oBtn = document.getElementById('commit');
        var oPromot = document.getElementById('promot');

        oBtn.onclick = function () {
            var oAccount = oInput.value;
            var oPassword = document.getElementById('password').value;

            //如果用户名或密码为空
            if(!oAccount.value && oPassword.value){
                oPromot.style.display = 'block';
                return false;
            }

            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            xhr.open('get','register.php?account='+oAccount+"&password="+oPassword,true);
            xhr.send();

            xhr.onreadystatechange = function(){
                if(xhr.readyState==4){
                    data = xhr.responseText;
                    if(data != 0){
                        //若成功，直接登录
                        alert("注册成功！");
                        localStorage.setItem("account",oAccount);
                        window.location.reload();
                    }
                }

            }
        }
    })();


};