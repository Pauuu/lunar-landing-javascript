//ENTORNO
var g = 1.622; //gravedad
var dt = 0.016683;
var timer = null;
var timerFuel = null;
var pause = false;
var nivel = 1;

//NAVE
var y = 10; //altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;	//velocidad de la nave
var c = 90; //cantidad combustible
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)

//MARCADORES
var velocidad = null; 
var altura = null;
var combustible = null;
var aterrizado = false;


//al cargar por completo la página...
window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");

	//definición de eventos:
	
	//pausar el juego con el boton del juego
	document.getElementById("botonPause").onclick = function(){
		if (pause == false){
			stop();
			pausa();
			pause = true;
		} 
	}
	
	//reanudar el juego
	document.getElementById("reanudar").onclick = function(){
		if (pause == true){
			reanudar();
			start();
			pause = false;
		}
	}

	//reinicar el juego
	document.getElementById("botonReinicio").onclick = function(){
		stop();		
		reinicio();
		start();
	}
	
	//uso de los distintos botones/opciones
	document.getElementById("info").onclick = function(){
		informacion();
	}

	document.getElementById("atras").onclick = function(){
		atras();
	}

	document.getElementById("dificultad").onclick = function(){
		stop();		
		dificultad();
	}

	document.getElementById("salir").onclick = function(){
		salir();
		
	}

	//al hacer click en cualquier parte de la pantalla 
	document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
	
	//encender/apagar al apretar/soltar una tecla cualquiera

	if (aterrizado == false){
		document.onkeydown = motorOn;
	}	
	document.onkeyup = motorOff;

	//Empezar a mover la nave justo después de cargar la página
	start();
}	//... fin window.onload

//Definición de funciones   

function pausa(){
	document.getElementById("menu").style.display="block";
	document.getElementById("pause").src="img/buttons/play.png";
}

function reanudar(){
	document.getElementById("menu").style.display="none";
	document.getElementById("pause").src="img/buttons/pause.png";
}

function informacion(){
	document.getElementById("submenu").style.display="none";
	document.getElementById("instrucciones").style.display="block";
}

function atras(){
	document.getElementById("submenu").style.display="block";
	document.getElementById("instrucciones").style.display="none";
}

function salir(){	//Pulsando la opción "About" se sale del juego o no
	var x = confirm("Estas a punto de salir del juego, seguro que quieres salir");
	if (x == true){
		alert("pulsado aceptar");
		window.location.href='https://github.com/Pauuu/LunarLander';
	} else {
		alert("pulsado cancelar");
		window.location.href="index.html";
	}
}

function indicadorFuel(){	//cambia el sprite del fuel
	if (c > 60){
		indicador = 1;
	} else if (c > 45){
		indicador = 2;
	} else if (c > 30){
		indicador = 3;
	} else if (c > 15){
		indicador = 4;
	} else if (c > 0){
		indicador = 5;
	} else if (c == 0){
		indicador = 6;
	}

	switch(indicador){
		case 1:
			document.getElementById("imgFuel").src="img/fuel"+indicador+".png";
			break;
		case 2:
			document.getElementById("imgFuel").src="img/fuel"+indicador+".png";
			break;
		case 3:
			document.getElementById("imgFuel").src="img/fuel"+indicador+".png";
			break;
		case 4:
			document.getElementById("imgFuel").src="img/fuel"+indicador+".png";
			break;
		case 5:
			document.getElementById("imgFuel").src="img/fuel"+indicador+".png";
			break;
		case 6:
			document.getElementById("imgFuel").src="img/fuel"+indicador+".png";
			break;
	}
}

function dificultad(){	 //cambia el nivel de combustible y reinicia

	nivel++;
	if(nivel > 3){
		nivel = 1;
	}

	switch (nivel){
		case 1:
			document.getElementById("dificultad").innerHTML="Facil"; 	//combustible y gravedad se mantienen con los niveles estándar		
			c = 100;		
			y = 5; 
			v = 0;
			g = 1.622;
			a = g;
			dt = 0.016683;
			break;

		case 2:
			document.getElementById("dificultad").innerHTML="Medio";	//la gravedad aumenta 10 veces
			c = 100;			
			y = 5; 
			v = 0;
			g = 10.622;
			a = g;
			dt = 0.016683;
			break;

		case 3:
			document.getElementById("dificultad").innerHTML="Dificil";	//la gravedad aumenta 10 veces y nivel de combustible es un 50% menor
			c = 50;			
			y = 5; 
			v = 0;
			g = 10.622;
			a = g;
			dt = 0.016683;
			break;
	}	
}

function reinicio(){

	//ENTORNO
	if (nivel < 3){	//dependiendo de la dificultad (nivel) el combustible será 100 o 50
		c = 100;
	} else {
		c = 50;
	}
	y = 5; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
	v = 0;
	g = 1.622;
	a = g;
	dt = 0.016683;

}



function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}     

function stop(){
	clearInterval(timer);
}

function moverNave(){
	
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	
	if(v>0){					//velocidad en valor absoluto
		velocidad.innerHTML=v.toFixed();
	} else {
		velocidad.innerHTML=-v.toFixed();
	}
	altura.innerHTML=70-y.toFixed();
	
	//mover hasta que top sea un 71% de la pantalla
	if (y<71){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();	//para cuadno la altura es mayor a un 70% de la pantalla      
		aterrizado = true;

		if(v < 5){
			alert("¡Has ganado!");
		}else{
			alert("Perdiste...");
		}
	}
}

function motorOn(){
	//el motor da aceleración a la nave
	if (aterrizado){
		motorOff();
	} else {	
		indicadorFuel();
		if (c > 0){
			a=-g;
		} 
		if (timerFuel==null){	//mientras el motor esté activado gasta combustible y aparece el gif del fuego
			timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
			document.getElementById("imgFire").style.display="block";
		}
	}
}

function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
	document.getElementById("imgFire").style.display="none";
}

function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-= 0.1;
	if (c <= 0 ) { 
		c = 0;
	}
}






