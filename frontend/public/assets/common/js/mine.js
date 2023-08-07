$(function() {

    //無限スクロール --------------------------------------
    var infScroll = new InfiniteScroll( '.container', { // 記事を挿入していく要素を指定
        append: '.post',             // 各記事の要素
        path: '.next_posts_link a',  // 次のページへのリンク要素を指定
        hideNav: '.next_posts_link', // 指定要素を非表示にする（ここは無くてもOK）
        button: '.view-more-button', // 記事を読み込むトリガーとなる要素を指定
        scrollThreshold: false,      // スクロールで読み込む：falseで機能停止（デフォルトはtrue）
        status: '.page-load-status', // ステータス部分の要素を指定
        history: 'false'             // falseで履歴に残さない
    });
    
    var page = 2;
    var pages = 17;
    if(pages==1){
        $(".more").hide();
    }
    
    $('.view-more-button').on("click",function() {
        if(page<pages){
            page++;
        }else{
            $(".more").hide();
        }
    });
    
});


// Add active class to the current button (highlight it)
var header = document.getElementById("myDIV");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
