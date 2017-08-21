/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 17-5-14
 * Time: 上午11:18
 * To change this template use File | Settings | File Templates.
 */
function getByClass(oParent,cls){
    var aEle = oParent.getElementsByTagName('*');
    var arr=[];
    for(var i=0;i<aEle.length;i++){
        if(aEle[i].className==cls){
            arr.push(aEle[i]);
        }
    }

   return arr;
}


function getStyle(obj,attr){
   if(obj.currentStyle){
       return obj.currentStyle[attr];
   }else{
       return getComputedStyle(obj,false)[attr];
  }
}