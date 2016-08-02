var ruch=0;
var nazwa_g1;
var nazwa_g2;
var punkty_g1=0;
var punkty_g2=0;
var kolej = 'x';
var remis=true;

function poczatek() {
	punkty_g1=0;
	punkty_g2=0;
	document.getElementById("wrap").innerHTML = '<div id="pocz"> <h1>Kółko i Krzyżyk</h1> <br /> Gracz1: <input id="gracz1" type="text" placeholder="Podaj nazwe" maxlength="14"><br />Gracz2: <input id="gracz2" type="text" placeholder="Podaj nazwe" maxlength="14"><br /> <input id="przycisk_start" type="submit" onClick="start()" value="Start!"> </div>';
}

function start() {
	nazwa_g1 = document.getElementById("gracz1").value;
	nazwa_g2 = document.getElementById("gracz2").value;
	if(nazwa_g1 == "")
		nazwa_g1 = "GRACZ1";
	if(nazwa_g2 == "")
		nazwa_g2 = "GRACZ2";
	
	stworz();
}

function stworz() {
	x = "";
	y = "";
	remis=true;
	var tabelka = "";
	var nr=0;
	document.getElementById("wrap").innerHTML = '<div id="gra"> <div class="boki"> <img src="img/1_1.png"  float="right" valign="middle"><span id="kolej_g1">' + nazwa_g1 + '</span></img><br/> <span class="punkty" >' + punkty_g1 + '</span></div><div id="plansza"></div><div class="boki"> <img src="img/2_1.png"  float="right" valign="middle" ><span id="kolej_g2">' + nazwa_g2 + '</span></img><br /> <span class="punkty" >' + punkty_g2 + '</span></div> <div style="clear:left; border:0px; margin:0;"></div> </div>';
	tabelka += "<table>";
	for( i = 1; i <= 3; i++ )
	{
		tabelka += "<tr>";
		for( j = 1; j <= 3; j++ )
		{
			tabelka += '<td class="kursor" id="p' + nr + '" onClick="zaznacz(' + nr + ')"></td>';
			nr++;
		}
		tabelka += "</tr>";
	}
	document.getElementById("plansza").innerHTML = tabelka + '</table>';
	if(kolej=='x')
	{
		ruch = 0;
		kolej='o';
		document.getElementById("kolej_g1").style.color = "#FFFF66";
		document.getElementById("kolej_g2").style.color = "white";
	}
	else
	{
		ruch = 1;
		kolej = 'x';
		document.getElementById("kolej_g1").style.color = "white";
		document.getElementById("kolej_g2").style.color = "#FFFF66";
		
	}
}

function wygrales() {
	var wygral;
	if(ruch%2!=0)
	{
		wygral = nazwa_g1;
		punkty_g1+=1;
	}
	else
	{
		wygral = nazwa_g2;
		punkty_g2+=1;
	}
	document.getElementById("wrap").innerHTML = '<div id="koniec">GRATULUJE ' + wygral + ' <br />WYGRAŁEŚ!! <br/> <p onClick="stworz()"><span  id="dalej">Dalej</span><img src="img/nowa2.png" valign="middle" float="left"></img></p><p onClick="poczatek()"><img src="img/nowa.png" valign="middle" float="left"><span  id="od_nowa">Od nowa</span></img></p></div>';
	
}

function sprawdz_remis() {
	if(remis==true && ((ruch==9 && kolej=='o') || (ruch==10 && kolej=='x')))
	{
		document.getElementById("wrap").innerHTML = '<div id="koniec">REMIS!! <p id="dalej" onClick="stworz()">Dalej<img src="img/nowa2.png" valign="middle" float="left"></img></p><p onClick="poczatek()" id="od_nowa"><img src="img/nowa.png" valign="middle" float="left">Od nowa</img></p></div>';
	}
}

function oznacz_wygrana(pole1,pole2,pole3) {
	document.getElementById("p"+pole1).style.backgroundColor = "green";
	document.getElementById("p"+pole2).style.backgroundColor = "green";
	document.getElementById("p"+pole3).style.backgroundColor = "green";
	for( i = 0; i <= 8; i++ )
		document.getElementById("p"+i).onclick = nic();
}

function sprawdz(tab) {
	for( i = 0; i < tab.length; i++)
	{
		
		if(tab.charAt(i) == 0)
		{
			for( a = 0; a < tab.length; a++)
			{
				if(tab.charAt(a)==1)
					for( b=0; b < tab.length; b++)
						if(tab.charAt(b)==2)
						{
							remis=false;
							oznacz_wygrana(0,1,2);
							setTimeout("wygrales()",1000);
						}
						
				if(tab.charAt(a)==3)
					for( c=0; c < tab.length; c++)
						if(tab.charAt(c)==6)
							{
								remis=false;
								oznacz_wygrana(0,3,6);
								setTimeout("wygrales()",1000);
							}
				if(tab.charAt(a)==4)
					for( d=0; d < tab.length; d++)
						if(tab.charAt(d)==8)
							{
								remis=false;
								oznacz_wygrana(0,4,8);
								setTimeout("wygrales()",1000);
							}
			}
		}
		
		else if(tab.charAt(i) == 1)
		{
			for( e = 0; e < tab.length; e++)
				if(tab.charAt(e)==4)
					for( f=0; f < tab.length; f++)
						if(tab.charAt(f)==7)
							{
								remis=false;
								oznacz_wygrana(1,4,7);
								setTimeout("wygrales()",1000);
							}
		}
		
		else if(tab.charAt(i) == 2)
		{
			for( g = 0; g < tab.length; g++)
			{
				if(tab.charAt(g)==4)
					for( h=0; h < tab.length; h++)
						if(tab.charAt(h)==6)
							{
								remis=false;
								oznacz_wygrana(2,4,6);
								setTimeout("wygrales()",1000);
							}
				if(tab.charAt(g)==5)
					for( j=0; j < tab.length; j++)
						if(tab.charAt(j)==8)
							{
								remis=false;
								oznacz_wygrana(2,5,8);
								setTimeout("wygrales()",1000);
							}
			}
		}
		
		else if(tab.charAt(i) == 3)
		{
			for( k = 0; k < tab.length; k++)
				if(tab.charAt(k)==4)
					for( l=0; l < tab.length; l++)
						if(tab.charAt(l)==5)
							{
								remis=false;
								oznacz_wygrana(3,4,5);
								setTimeout("wygrales()",1000);
							}
		}
		
		else if(tab.charAt(i) == 6)
		{
			for( k = 0; k < tab.length; k++)
				if(tab.charAt(k)==7)
					for( l=0; l < tab.length; l++)
						if(tab.charAt(l)==8)
							{
								remis=false;
								oznacz_wygrana(6,7,8);
								setTimeout("wygrales()",1000);
							}
		}
	}
	setTimeout("sprawdz_remis()",1000);
}

function nic() {
	/*nic nie robi bo jej sie nie chce :O 
		Użyłem ja do usnięcia problemu z zaznaczaniem kolejnych pól po wygranej i do klikania w to samo pole zeby nie zmianialo sie na przeciwny znak;
	*/
}

var x = "";
var y = "";
function zaznacz(nr) {
	var pole = "p"+nr;
	document.getElementById(pole).style.cursor = "default";
	if(ruch%2==0)
	{
		document.getElementById("kolej_g1").style.color = "white";
		document.getElementById("kolej_g2").style.color = "#FFFF66";
		document.getElementById(pole).innerHTML = "X";
		x = x + nr;
		sprawdz(x);
		
	}
	else if(ruch%2!=0)
	{
		document.getElementById("kolej_g1").style.color = "#FFFF66";
		document.getElementById("kolej_g2").style.color = "white";
		document.getElementById(pole).innerHTML = "O";
		y = y + nr;
		sprawdz(y);
	}
	document.getElementById(pole).onclick = nic();
	
	ruch++;
}


