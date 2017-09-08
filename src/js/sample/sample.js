//demo 菜单控制
$(".demo-menu-one").click(function() {
    $(this).siblings("ul").hide();
    $(this).siblings("div").children('i').removeClass('current');
    $(this).next('ul').toggle();
    $(this).children('i').addClass('current');
});
$(document).ready(function() {
    loadTopMenu();
});

function loadTopMenu() {
    var pageName = document.getElementById('pageinfoTitle').innerText;
    // alert(typeof pageName);
    navTopMenu(pageName);
}

function navTopMenu(topName) {
    var topOneMenu = $(".demo-menu ul li a");
    for (var i = 0; i < topOneMenu.length; i++) {
        if (topOneMenu[i].innerText == topName) {
            $(topOneMenu).eq(i).parent().parent().show();
            $(topOneMenu).eq(i).addClass("current");
            $(topOneMenu).eq(i).parent().parent().prev().children(i).addClass("current");
        }
    }
}

//代码输出 菜单控制
var codeExplain = document.getElementById("codeExplain");
var tagText = document.getElementById("demoCode").innerHTML;

function HTMLEncode(html) {
    var temp = document.createElement("code");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    codeExplain.innerHTML = output;
}
HTMLEncode(tagText);