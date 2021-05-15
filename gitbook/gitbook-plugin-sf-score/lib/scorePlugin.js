require(["gitbook", "jquery"], function(gitbook, $) {
    gitbook.events.bind("page.change", function() {
        var appendStr = '<div class="sf-pingfen">\n' +
            '    <div class="sf-ontent">\n' +
            '        <div class="sf-stars">\n' +
            '            以上内容是否对您有帮助：\n' +
            '            <span></span>\n' +
            '            <span></span>\n' +
            '            <span></span>\n' +
            '            <span></span>\n' +
            '            <span></span>\n' +
            '        </div>\n' +
            '        <div class="sf-info">优秀</div>\n' +
            '    </div>\n' +
            '</div>'

        $("section .page-footer-ex").append(appendStr);

        var stars=document.querySelectorAll('.sf-stars span');
        var info=document.querySelector('.sf-info');
        var grades = ["非常不满意","不满意","一般","比较满意","非常满意"];
        var active=-1;   //记录当前点击的是哪颗星星

        for(var i=0;i<stars.length;i++){
            stars[i].index=i;
            stars[i].onmouseover=function(){setStar(this.index);};
            stars[i].onmouseout=function(){setStar(active);};
            stars[i].onclick=setClick;
        }

        function setStar(nub){
            var name='';
            name= nub<2?'sf-show':'sf-show2';
            for(var i=0;i<stars.length;i++){
                stars[i].className= i<=nub?name:'';
            }
            info.style.display= nub<0? 'none':'block';
            info.innerHTML=grades[nub];
        }

        function setClick(){
            active=this.index;
        }
    });
});
