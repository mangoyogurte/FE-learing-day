window.onload = function (){
    (function(){

        var oLi = document.getElementsByClassName('subli');

        var oDiv = document.getElementsByClassName('subnav');
        var timer = null;

        for(var i = 0 ; i<oLi.length ; i++){
            oLi[i].onmouseover = function(){

                for(var j = 0 ; j<oDiv.length ; j++){
                    oDiv[j].style.display = 'none';
                }
                clearInterval(timer);
                this.getElementsByClassName('subnav')[0].style.display = 'block';
            }
            oLi[i].onmouseout = function(){
                var that = this;
                timer = setInterval(function(){
                    that.getElementsByClassName('subnav')[0].style.display = 'none';
                },500);
            }
        }

    })()

};