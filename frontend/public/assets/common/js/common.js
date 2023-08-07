function GTranslateGetCurrentLang() {
    var keyValue = document['cookie'].match('(^|;) ?googtrans=([^;]*)(;|$)');
    return keyValue ? keyValue[2].split('/')[2] : null;
}

function GTranslateFireEvent(element, event) {
    try {
        if (document.createEventObject) {
            var evt = document.createEventObject();
            element.fireEvent('on' + event, evt)
        } else {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(event, true, true);
            element.dispatchEvent(evt)
        }
    } catch (e) {}
}

function doGTranslate(lang_pair) {
    if (lang_pair.value) lang_pair = lang_pair.value;
    if (lang_pair == '') return;
    var lang = lang_pair.split('|')[1];
    if (GTranslateGetCurrentLang() == null && lang == lang_pair.split('|')[0]) return;
    var teCombo;
    var sel = document.getElementsByTagName('select');
    for (var i = 0; i < sel.length; i++)
        if (/goog-te-combo/.test(sel[i].className)) {
            teCombo = sel[i];
            break;
        } if (document.getElementById('google_translate_element2') == null || document.getElementById('google_translate_element2').innerHTML.length == 0 || teCombo.length == 0 || teCombo.innerHTML.length == 0) {
        setTimeout(function () {
            doGTranslate(lang_pair)
        }, 500)
    } else {
        teCombo.value = lang;
        GTranslateFireEvent(teCombo, 'change');
        GTranslateFireEvent(teCombo, 'change')
    }
}

//*********************************************************************************
//ブラウザ判定
//*********************************************************************************	
var userAgent = window.navigator.userAgent.toLowerCase();
var browserIE = 0;//IE判定
var browser_v = 0;//IEバージョン番号
var browser_nm = "";//browser名

if (/*@cc_on!@*/false) {
	browserIE = 1;
	browser_nm = "IE";
}

//webkit判定
webKit = (userAgent.indexOf("webkit") > -1)? true : false;

//ブラウザ
if (navigator.userAgent.match(/MSIE (\d+\.\d+)/)){
	browser_v = parseFloat(RegExp.$1);
}else if (userAgent.indexOf("firefox") > -1) {
	browser_nm = "Firefox";
}else if(userAgent.indexOf("opr") > -1) {
	browser_nm = "Opera";
}else if(userAgent.indexOf("chrome") > -1){
	browser_nm = "Chrome";
}else if(userAgent.indexOf("safari") > -1){
	browser_nm = "Safari";
}else {
	browser_nm = "Unknown"
};

//*********************************************************************************
//スマホ判定
//*********************************************************************************	
var smp = (function(){
    var ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
        return 'smp';
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
        return 'pc';
    }else{
        return 'pc';
    }
})();


//####################################################################################################


//　全共通　////////////////////////////////////////////////////////////////////////////////////////
$(function() {
	
    
    //翻訳切り替え
    $(".select li").click(function() {
        var val = $(this).data('val');
        $("#gtranslate_selector").val(val).change();
        
        //クリックしたら消す
        if(smp == "pc"){
            //PC
            $('.lang').addClass('non');
        }else{
            //スマホ
            $('.hamburger span').removeClass('active');
            $('header.global').removeClass('open');
            $('nav.global').fadeOut(100);
            $('.lang').removeClass('show');
        }
        
	});
    $('.lang').hover(function() {
        $(this).removeClass('non');
    });
    
    
	//viewport振り分け
	if(smp == "pc"){
        $("html").addClass("pc");
        
        AOS.init({
            duration: 500,
            anchorPlacement:'top-bottom',
            easing:"ease-in-out",
        });
        
	} else {
        $("html").addClass("smp");
        
        //翻訳表示
        $('.lang .btm').on('click',function(){
            $('.lang').toggleClass('show');
        });
        
        AOS.init({
            duration: 400,
            anchorPlacement:'center-bottom',
            easing:"ease-in-out",
        });
        
	}
    
    
    //colorboxインライン表示（ソフトウェアのサンプルボイス）
    $(".iframe").colorbox({
        iframe:true,
        width:"450px",
        maxWidth:"90%",
        height:"200px",
        rel:'group',
        reposition:true,
        opacity: 0.7,
        onComplete:function(){
            if(smp == "smp"){
                var w = 480;
                var left = w/2 - $("#colorbox").width()/2;
                $("#colorbox").css("left",left+"px");
            }
        },
    });
    
    
	//バーのキラキラ
    for(var i=0;i<=30;i++){
        $("h1.title .bar").prepend('<div class="cut"></div>');
    }
    
	//スマホ用ハンバーガーメニュー
    $('.hamburger').on('click',function(){
        
        if($('header.global').hasClass("open")){
            //消す
            $('.hamburger span').removeClass('active');
            $('header.global').removeClass('open');
            $('nav.global').fadeOut(100);
            $('.lang').removeClass('show');
        }else{
            //表示
            $('.hamburger span').addClass('active');
            $('header.global').addClass('open');
            $('nav.global').fadeIn(100);
        }
        
    });
    
    
    //スクロールしてる間は「トップへ戻る」ボタンを表示
    var startPos = $("html").scrollTop();
    var winScrollTop = 0;
    $(window).on('scroll load', function() {
        //fixedの時の横スクロール（PCの時だけ）
        if(smp == "pc"){
            $("header.global").css("left", -$(window).scrollLeft());
        }
    });
    
    $(window).on('scroll', function() {
        
        //スマホのオープン時は動かさない
        if($('header.global').hasClass('open') == false){
            //上スクロールで表示
            winScrollTop = $(this).scrollTop();
            var showclass = $('header.global');
            $("header.global").css("transition","");
            
            if(winScrollTop > startPos) {
                if(winScrollTop >= 200){
                    showclass.addClass('hide');
                }
            } else {
                showclass.removeClass('hide');
            }
            startPos = winScrollTop;
        }
        
	});
    
    //$("header.global").stop().addClass('show').css("transition", "transform 0s ease,height .5s ease");
    
	//#backTopのクリック処理
	$('#backTop a').on("click",function() {
		$('body,html').stop().animate({scrollTop:1}, 1500, 'easeOutExpo');
		return false;
	});
	
    /*
	//スムーススクロール ---------------------------
	$('a[href^="#"]').click(function() {
		var speed = 800;
		var balance = -80;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top + balance;
		$(webKit ? 'body' : 'html').animate({scrollTop:position}, speed, 'easeOutExpo');
		return false;
    });
	*/
    
	
});






