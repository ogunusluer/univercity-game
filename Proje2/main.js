
/*
.kirmizi {background:#E26464; } // 1
.mavi {background:#66ADE3; } // 2
.sari {background:#E2DE64; } // 3
.yesil {background:#86E264; } // 4
*/
$(function(){
  siralamaYenile();
});
$(document).on("click",".temizle",function(){
  localStorage.clear();
  siralamaYenile();
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function siralamaYenile(){
  var a=1;
  var b=1;
  var points=localStorage.users.split('"');
  for (var i = 2; i <= points.length; i+=2) {

    $("#points"+b).html(points[i].split(",")[1].split("]"));
    b++;
  }
  var name=localStorage.users.split('"');
  for (var i = 1; i <= name.length; i+=2) {

    $("#name"+a).html(name[i]);
    a++;
  }

}
var hucre = [];
var puan = 0;
function girisYapildi(){
  var kAdi=$("#kAdi").val();
  if( typeof(Storage) !== "undefined" ) {
        localStorage.setItem("isim", kAdi);
        $("#bilgiEkran").fadeOut();
        yeniOyun(kAdi);
  } else {
      // Üzgünüm! tarayıcın çok eski!
  }
}
function yeniOyun(user){

oyunBaslat();

time=15;
sureBaslat(user);
siralamaYenile();
}
function oyunBaslat(){




document.getElementById("puan").innerHTML = puan + " Puan";

var random1 = getRandomInt(1,5);
var random2 = getRandomInt(1,5);

while(random1 == random2){
random2 = getRandomInt(1,5);
}


var i = 1;
while(i<=4){
 renkDegistir(i, random1);
 i++;
 }


var randomHucre = getRandomInt(1,5);

  renkDegistir(randomHucre, random2);


	}


function renkDegistir(hucreID, renk){
		hucre[hucreID] = renk;
	document.getElementById("hucre"+hucreID).style.background = renkKodu(renk);
}
function sureBaslat(user){
  $("#clock").html("15 Saniye");
  var timer=setInterval(function(){
    $("#clock").html(time+" Saniye");
    if(time<=0){
      clearInterval(timer);
      oyunDurdur(user);
    }else{
      time=time-1;
$("#clock").html(time+" Saniye");
    }
  },1000);
}


function tikKontrol(hucreID){

var dogruHucre = 0;

	if(hucre[1] != hucre[2]){
		if(hucre[1] == hucre[3]){
		dogruHucre=2;
		}else{
		dogruHucre=1;
		}
	}else{
		if(hucre[1] == hucre[3]){
		dogruHucre=4;
		}else{
		dogruHucre=3;
		}
	}

	if(hucreID == dogruHucre){
	puan = puan + 10;
	oyunBaslat();
	}else{
	if(puan>0){
	if(puan == 10) { puan = 0;}else{
	puan = puan - 20;
	}
	}
	oyunBaslat();
	}


}

function oyunDurdur(user){
  $("#bilgiEkran").fadeIn();
  var myScore = new Array();
  myScore[0]=user;
  myScore[1]=puan;
  if(localStorage.users!="undefined"){
    localStorage.users=localStorage.users+","+JSON.stringify(myScore);
  }else{
    localStorage.users = JSON.stringify(myScore);
  }

siralamaYenile();
puan=0;
}


function renkKodu(renkID){
		if(renkID==1){
		return "#E26464";
		}else if(renkID==2){
		return "#66ADE3";
		}else if(renkID==3){
		return "#E2DE64";
		}else if(renkID==4){
		return "#86E264";
		}
}
