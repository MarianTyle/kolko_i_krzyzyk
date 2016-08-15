var ruch = (function() {
		var a = 0;
		
		return {
			get: function(){
				return a;
			},
			ustaw: function(val) {
				a = val;
			},
			zwieksz: function() {
				a++;
			}
		};
} ());
	
var nazwa_g1 = (function() {
	var a = "";
	
	return {
		get: function() {
			return a;
		},
		ustaw: function(val) {
			a = val;
		},
	};
} ());

var nazwa_g2 = (function() {
	var a = "";
	
	return {
		get: function() {
			return a;
		},
		ustaw: function(val) {
			a = val;
		},
	};
} ());

var punkty_g1 = (function() {
	var a = 0;
	
	return {
		get: function() {
			return a;
		},
		zeruj: function() {
			a = 0;
		},
		zwieksz: function() {
			a++;
		}
	};
} ());

var punkty_g2 = (function() {
	var a = 0;
	
	return {
		get: function() {
			return a;
		},
		zeruj: function() {
			a = 0;
		},
		zwieksz: function() {
			a++;
		}
	};
} ());
	
var kolej = (function() {
	var a = 'x';
	
	return {
			get: function() {
				return a;
			},
			ustaw: function(val) {
				a = val;
			}
	};
} ());
	
var remis = (function() {
	var a = true;
	
	return {
		get: function() {
			return a;
		},
		ustaw: function(val) {
			a = val;
		}
	};
} ());

var x = (function(){
	var a = "";
	
	return {
		get: function() {
			return a;
		},
		zeruj: function() {
			a = "";
		},
		dodaj: function(val) {
			a = a + val;
		} 
	};
} ());

var y = (function() {
	var a = "";
	
	return {
		get: function() {
			return a;
		},
		zeruj: function() {
			a = "";
		},
		dodaj: function(val) {
			a = a + val;
		}
	};
} ());

function poczatek() {
	punkty_g1.zeruj();
	punkty_g2.zeruj();
	
	document.getElementById("koniec").style.display = "none";
	document.getElementById("pocz").style.display = "block";
	
}

function start() {
	nazwa_g1.ustaw(document.getElementById("gracz1").value);
	nazwa_g2.ustaw(document.getElementById("gracz2").value);
	if(nazwa_g1.get() == "")
		nazwa_g1.ustaw("GRACZ1");
	if(nazwa_g2.get() == "")
		nazwa_g2.ustaw("GRACZ2");
	
	stworz();
}

function stworz() {
	x.zeruj();
	y.zeruj();
	remis.ustaw(true);
	
	document.getElementById("koniec").style.display = "none";
	document.getElementById("pocz").style.display = "none";
	document.getElementById("gra").style.display = "block";
	
	document.getElementById("kolej_g1").innerHTML = nazwa_g1.get();
	document.getElementById("kolej_g2").innerHTML = nazwa_g2.get();
	
	document.getElementById("punkty_g1").innerHTML = punkty_g1.get();
	document.getElementById("punkty_g2").innerHTML = punkty_g2.get();
		
		for( r = 0; r<=8;r++)
		{
			document.getElementById("p"+r).style.backgroundColor = "rgba(0,0,0,0)";
			document.getElementById("p"+r).innerHTML = "";
			document.getElementById("p"+r).onclick = zaznacz.bind(this, r);
		}
			
		
	if(kolej.get() == 'x')
	{
		ruch.ustaw(0);
		kolej.ustaw('o');
		document.getElementById("kolej_g1").style.color = "#FFFF66";
		document.getElementById("kolej_g2").style.color = "white";
	}
	else
	{
		ruch.ustaw(1);
		kolej.ustaw('x');
		document.getElementById("kolej_g1").style.color = "white";
		document.getElementById("kolej_g2").style.color = "#FFFF66";
		
	}
}

function wygrales() {
	var wygral;
	if(ruch.get()%2!=0)
	{
		wygral = nazwa_g1.get();
		punkty_g1.zwieksz();
	}
	else
	{
		wygral = nazwa_g2.get();
		punkty_g2.zwieksz();
	}
	document.getElementById("gra").style.display = "none";
	document.getElementById("koniec").style.display = "block";
	document.getElementById("wiadomosc").innerHTML = 'GRATULUJE ' + wygral + '<br /> WYGRAŁEŚ!!! <br />';
	
}

function sprawdz_remis() {
	if(remis.get() == true && ((ruch.get()==9 && kolej.get() == 'o') || (ruch.get()==10 && kolej.get() == 'x')))
	{
		document.getElementById("gra").style.display = "none";
		document.getElementById("koniec").style.display = "block";
		document.getElementById("wiadomosc").innerHTML = 'REMIS!!';
	}
}

function oznacz_wygrana(pole1,pole2,pole3) {
	document.getElementById("p"+pole1).style.backgroundColor = "green";
	document.getElementById("p"+pole2).style.backgroundColor = "green";
	document.getElementById("p"+pole3).style.backgroundColor = "green";
	for( i = 0; i <= 8; i++ )
		document.getElementById("p"+i).onclick = null;
}

function sprawdz(tab) {
	var kombi_wygr = new Array(0,1,2,0,3,6,0,4,8,1,4,7,2,4,6,2,5,8,3,4,5,6,7,8);
	
	for( j = 0; j < 24; j+=3)
	{
		for( i = 0; i < tab.length; i++)
		{
			if(tab.charAt(i) == kombi_wygr[j])
			{
				for( e = 0; e < tab.length; e++)
					if(tab.charAt(e) == kombi_wygr[j+1])
						for( f=0; f < tab.length; f++)
							if(tab.charAt(f) == kombi_wygr[j+2])
								{
									remis.ustaw(false);
									oznacz_wygrana(kombi_wygr[j], kombi_wygr[j+1], kombi_wygr[j+2]);
									setTimeout( function(){ wygrales(); }, 1000);
								}
			}
		}
	}
	setTimeout( function(){ sprawdz_remis(); }, 1000);
}

function zaznacz(nr) {
	var pole = "p"+nr;
	
	document.getElementById(pole).style.cursor = "default";
	if(ruch.get()%2==0)
	{
		document.getElementById("kolej_g1").style.color = "white";
		document.getElementById("kolej_g2").style.color = "#FFFF66";
		document.getElementById(pole).innerHTML = "X";
		x.dodaj(nr);
		sprawdz(x.get());
		
	}
	else
	{
		document.getElementById("kolej_g1").style.color = "#FFFF66";
		document.getElementById("kolej_g2").style.color = "white";
		document.getElementById(pole).innerHTML = "O";
		y.dodaj(nr);
		sprawdz(y.get());
	}
	
	
	document.getElementById("p"+nr).onclick = null;
	
	
	ruch.zwieksz();
}
