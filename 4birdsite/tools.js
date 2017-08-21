/**获取元素方法
 * 和CSS选择器一样
 * **/

var $ = function(str) {
    return document.querySelector(str);
}
var $$ = function(str) {
    return document.querySelectorAll(str);
}


//document.get系列高配版，参数分别是123
var get = {
    byId: function(id) {
        return document.getElementById(id)
    },
    byTagName: function(parentObj,tagName){
        return parentObj?parentObj.getElementsByTagName(tagName):document.getElementsByTagName(tagName);
    },
    byClass: function(parentObj,tagName,className){
        var aEl = parentObj.getElementsByTagName(tagName);
        var arr = [];
        var arrClassName = [];
        for (var i = 0; i < aEl.length; i++) {
            arrClassName = aEl[i].className.split(' ');
            for (var j = 0; j < arrClassName.length; j++) {
                if(arrClassName[j] === className){
                    arr.push(aEl[i]);
                    break;
                }
            }
        }
        return arr;
    }
};

//获取对象样式
function getStyle(obj , attr){
    return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj ,null )[attr];
}

/**兼容的事件方法
 *

 */
function addEvent(ele, event, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(event, fn, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, fn);
    } else {
        ele['on' + event] = fn;
    }
}


/*这里如何给fn传参
function addEvent(ele, event, fn, name) {
    fn=function{
        fa(name);
    }
    if (ele.addEventListener) {
        ele.addEventListener(event, fn, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, fn);
    } else {
        ele['on' + event] = fn;
    }
}

function fa(name){
    alert(name + '你好!');
}
*/

function removeEvent(ele, event, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(event, fn, false);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + event, fn);
    } else {
        ele['on' + event] = null;
    }
}



   /*****
    *  插入节点 insertAfter
    * ********/

     function insertAfter(newNode,refNode){
        //找到父节点
        father = refNode.parentNode;
        if(refNode==father.lastChild){
            father.appendChild(newNode);
        }else{
            father.insertBefore(newNode,refNode.nextSibling);
        }
    }

   /**  完美判断是否为网址
    * 有个问题，w.4399.com这种网址不能访问，判定却为true????
    * **/

    function isURL(strUrl) {
        var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
        if (regular.test(strUrl)) {
            return true;
        }else {
            return false;
        }
    }

//查找数组是否存在某一个值
function arrIndexOf(arr , v){
    for (var i = 0; i < arr.length; i++) {
        if(arr[i] == v){
            return i;
        }
    }
    return -1;
}

//添加class
function addClass(obj,className){
    if(obj.className == ''){
        obj.className = className;
    }else{
        var arrClassName = obj.className.split(' ');
        var _index = arrIndexOf(arrClassName , className);
        if(_index == -1){
            obj.className += ' '+className;
        }
    }
}

//移除class
function removeClass(obj,className){
    if(obj.className != ''){
        var arrClassName = obj.className.split(' ');
        var _index = arrIndexOf(arrClassName, className);
        if(_index != -1){
            arrClassName.split(_index,1);
            obj.className = arrClassName.join(' ');
        }
    }
}

//移动函数
function hDoMove(obj , attr ,s ,target , endFn ){
    // 获取当前对象的的位置
    var pos = parseInt(getStyle(obj,attr));
    //如果目标点的位置 大于当前距离，那么 就是正向移动，否则就是负向移动
    s = target > pos ? s : -s;
    //清除上一个定时器
    clearInterval(obj.hDoMovetimer);
    //创建新的定时器
    obj.hDoMovetimer = setInterval(function(){
        //距离等于 当前对象的实时距离 +  每次要移动的距离
        var distance = parseInt(getStyle(obj,attr)) + s ;
        // 如果 上一步计算的距离大于 给定的目标点距离， 进行修正  =  目标距离
        if( distance > target && s > 0 || distance < target && s < 0){
            distance = target;
        }
        //  对象移动
        obj.style[attr] = distance + 'px';
        // 如果距离 已经到达目标点， 清除定时器，执行回调函数
        if( distance === target){
            clearInterval(obj.hDoMovetimer);
            // 回调函数是否是未定义？  不是则执行
            endFn && endFn();
        }
    },20)
}

//抖动函数
function hShake ( obj, attr, endFn ) {
    /*
     *   两种办法解决抖动函数隐患的问题：
     * 1. 进入函数先  进到一个if控制，永远不直接执行抖动函数的主体代码 ， 而是取当前 对象的位置和  50毫秒后的位置 ，  比较是否相等， 如果相等，
     *          则 说明对象当前抖动已经结束， 可以执行抖动效果！（有稍微的一点小BUG）
     * 2.   如果用一个变量开关来控制，也是挺好的， 但是， 变量开关不能函数开始被初始化也不能在函数结束后被清除。。 否则，每次触发这函数都可以
     *         顺利的往下执行抖动函数的主体代码，那就不能修复问题。  需要一个变量，他能存在的时间更长，  将变量挂在 window 的身上的时候 （win
     * dow.flag = false），每次就只能触发一次 对象进行抖动，下一个需要等到上一个抖动的对象抖动结束后，才能抖动， 这种效果，并不是想要
     * 的，所以  ， 将开关挂在 传递进来的 obj身上 是最好的选择， 每个对象身上的开关管理 各自身上的 抖动问题处理，而且obj.flag在函数执行结束后
     * 并没有被回收，因为，他是从函数外部传递进来的，生命期很长！！ 这样再次触发函数的时候，obj.flag = true，这个条件成立  if(obj.flag)
     * {return}  ，不往下执行了。。。除非抖动结束后， num ===  数组的最后一个值， 这时候才 赋值 为 false.
     * */
    if(obj.flag) {return} ; //初始化 未定义（false 不执行 return)，
    obj.flag = true; // 马上赋值 true，  这样再次触发 函数  上一个判断就为 真（obj.flag 是传递进来的对象的属性，而对象是从外部传进来的，所以 没有被回收）， 直接返回 ，不执行以下代码。

    var pos = parseInt( getStyle(obj, attr));    // 刚开始对象的位置

    //抖动函数运动轨迹数组
    var arr = [];            // 20, -20, 18, -18 ..... 0
    var num = 0;
    var timer = null;
    //自动生成一个运动轨迹的数组
    for ( var i=20; i>0; i-=2 ) {
        arr.push( i, -i );
    }
    arr.push(0);
    //先清除定时器
    clearInterval( obj.shake );

    obj.shake = setInterval(function (){
        obj.style[attr] = pos + arr[num] + 'px';
        num++;
        //如果已经运动到最后一个值，清除定时器，执行回调函数
        if ( num === arr.length ) {
            clearInterval( obj.shake );
            endFn && endFn();
            obj.flag = false;  //抖动结束后， 赋值false， 再次触发这个函数，会执行顶部的判断,就能再次抖动拉
        }
    }, 50);
}

/*
读取或者设置el元素的透明值，val取值为0-1
*/
function hOpacity(el,val) {
    var f=el.filters,s=el.style;
    if (arguments.length==1)
        return f?(f.alpha?(f.alpha.opacity/100):1):(s.opacity||1);
    s.zoom=1;
    s.filter="alpha(opacity="+parseInt(val*100)+")";
    s.opacity=val;
};

//透明度淡出函数
function hFadeOut(obj , time ,endFn){
    obj.iNum = 0;
    clearInterval(obj.hFadeTimer);
    obj.hFadeTimer = setInterval(function(){
        obj.iNum++;
        //使用设置和读取透明度函数
        hOpacity(obj,hOpacity(obj)-0.1);
        //处理有些浏览器透明度不能到零的问题。
        if(obj.iNum >= 10){
            obj.style.opacity = 0;
            obj.iNum = 0;
        }
        if(getStyle(obj, 'opacity') == 0){
            clearInterval(obj.hFadeTimer);
            endFn && endFn();
        }
    },time)
}


//获取当前并设置详细年月日期,设置第二个参数来确定获得的年月日详细情况
function hgetTime(iNum){
    var hTime ={};

    var myTime = new Date();

    var iYear = myTime.getFullYear();
    var iMonth = myTime.getMonth()+1;
    var iDate = myTime.getDate();
    var iWeek = myTime.getDay();
    var iHours = myTime.getHours();
    var iMin = myTime.getMinutes();
    var iSec = myTime.getSeconds();

    if( iWeek === 0 ) iWeek = '星期日';
    if( iWeek === 1 ) iWeek = '星期一';
    if( iWeek === 2 ) iWeek = '星期二';
    if( iWeek === 3 ) iWeek = '星期三';
    if( iWeek === 4 ) iWeek = '星期四';
    if( iWeek === 5 ) iWeek = '星期五';
    if( iWeek === 6 ) iWeek = '星期六';

    //默认显示所有的年月日星期等详细的信息
    if(iNum === 0 || typeof(iNum) == 'undefined'){
        hTime.str = iYear+ '年' +iMonth+'月'+iDate+'日 '+iWeek+' '+ toTwo(iHours)+' : '+ toTwo(iMin)+' : '+ toTwo(iSec);
    }else if(iNum === 1){
        hTime.str = toTwo(iHours)+' : '+ toTwo(iMin)+' : '+ toTwo(iSec);
    }else if(iNum === 2){
        hTime.str = toTwo(iHours)+toTwo(iMin)+toTwo(iSec);
    }

    function toTwo ( n ) {
        return n < 10 ?  '0' + n : '' + n;
    }
    //时间戳
    hTime.getTime = Math.floor( myTime.getTime()/1000 );
    hTime.Hours = iHours;
    hTime.Min = iMin;
    hTime.Sec = iSec;
    return hTime;
}


//倒计时函数  NewTime 为倒计时截止时间 格式为： 'November 27,2015 22:3:0'
function hCountDown(obj ,NewTime , endFn){
    /*
     * 月份取值：January、February、March、April、May、June、July、August、September、October、November、December
     * 时间转换公式:
     * 天：Math.floor(t/86400)
     *    时：Math.floor(t%86400/3600)
     *    分：Math.floor(t%86400%3600/60)
     *    秒：t%60
     *  获取时间对象：new Date()
    - getFullYear
    - getMonth
    - getDate
    - getDay
     - getHours
     - getMinutes
     - getSeconds
    - 时间戳：new Date().getTime()-返回从1970年1月1日到现在的毫秒数（UTC时间标准时间）
     * */
    var iNow = null;
    var t = 0;
    var str = '';
    var timer = null;

    iNew = new Date( NewTime );

    clearInterval( timer );

    timer = setInterval (function (){
        console.log(NewTime);
        iNow = new Date();
        t = Math.floor( ( iNew - iNow ) / 1000 );
        if ( t >= 0 ) {
            str = Math.floor(t/86400)+'天'+Math.floor(t%86400/3600)+'时'+Math.floor(t%86400%3600/60)+'分'+t%60+'秒';
            obj.innerHTML = str;
        } else {
            clearInterval( timer );
            endFn && endFn();
        }

    }, 1000);
}

//检查是否是数字
//charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
function hDetectNum(val){
    var str = '';
    for (var i = 0; i < val.length; i++) {
        str = val.charCodeAt(i);
        if(str < 47 || str > 57){
            return false;
        }
    }
    return true;
}

function hShow(obj){
    obj.style.display = 'block';
}
function hHide(obj){
    obj.style.display = 'none';
}

//查找和替换函数   iNum = 1 时候为替换模式，val2 为'' 的时候为删除 val1 中的内容。
function hReplace(str , val1 , val2 , iNum){
    var hReplace = {};
    hReplace.flag = true;
    hReplace.newStr = '';

    function strIndexOf(){
        if(str.indexOf(val1) === -1){
            hReplace.flag = false;
            return hReplace;
        }
    }
    if(typeof(val2) === 'undefined'){
        strIndexOf();
         hReplace.newStr = str.split(val1).join('<span style="background:yellow;">'+ val1 +'</span>');
    }else if(iNum === 1){
        strIndexOf();
        hReplace.newStr = str.split(val1).join('<span style="background:yellow;">'+ val2 +'</span>');
    }

    return hReplace;
}

//获取元素距离浏览器的距离
function hGetPos(obj){
    var pos = {left:0,top:0};
    while (obj){
        pos.left += obj.offsetLeft;
        pos.top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return pos;
}

//渐隐渐出
function fadeIn(obj){
    var iCur = getStyle(obj,'opacity');
    if(iCur==1){ return false;}

    var value = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = 5;
        if(value == 100){
            clearInterval(obj.timer);
        }
        else{
            value += iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpha(opacity='+value+')';
        }
    },30);

}

function fadeOut(obj){

    var iCur = getStyle(obj,'opacity');
    if(iCur==0){ return false; }

    var value = 100;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = -5;
        if(value == 0){
            clearInterval(obj.timer);
        }
        else{
            value += iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpha(opacity='+value+')';
        }
    },30);

}
