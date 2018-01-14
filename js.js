//ENTORNO
var g = 10.622; //gravedad
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var pause = false;

//NAVE
var y = 10; //altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;	//velocidad de la nave
var c = 1000; //cantidad combustible
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

	//mostrar menú móvil
    document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	
	//reiniciar el juego
	/*document.getElementById("botonReinicio").onclick = function(){
		reiniciar();
	}*/

	
	//reanudar/pausar el juego con el boton del juego
	document.getElementById("botonPause").onclick = function(){
		if (pause == false){
			stop();
			pausa();
			pause = true;
		} 
	}
	
	document.getElementById("botonReanudar").onclick = function(){
		if(pause == true){
			reanudar();
			start();
			pause = false;
		}
	}

	document.getElementById("botonInfo").onclick = function(){
		informacion();
	}

	document.getElementById("botonAtras").onclick = function(){
		atras();
	}

	document.getElementById("botonSalir").onclick = function(){
		salir();
	}

	




	//encender/apagar el motor al hacer click en la pantalla
	
/*	document.onclick = function () { 
		if (a==g){
			motorOn();
		} else {                                                 
			motorOff();
			alert();
		}
	} */
	
	//encender/apagar al apretar/soltar una tecla cualquiera

	document.onkeydown = motorOn; 
	document.onkeyup = motorOff;

	//Empezar a mover la nave justo después de cargar la página
	start();
}

                 
     






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

function salir(){
	alert("Estas a punto de salir del juego, seguro que quieres salir");
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
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();	//para cuadno la altura es mayor a un 70% de la pantalla      
		aterrizado = true;
	}
}

function motorOn(){
	//el motor da aceleración a la nave
	if (aterrizado){
		motorOff();
	} else {	
		if(c > 0){
			a=-g;
		} 

		//mientras el motor esté activado gasta combustible
		if (timerFuel==null)
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
	}
}

function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-= 0.1;
	if (c <= 0 ) { 
		c = 0;
	}
	combustible.innerHTML=c.toFixed();;
}






