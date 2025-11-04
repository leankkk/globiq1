connect2Server();
let paisInicialNombre = document.getElementById("paisInicialNombre");
let paisInicialDato = document.getElementById("paisInicialDato");
let botonMayor = document.getElementById("btnMayor");
let botonMenor = document.getElementById("btnMenor");
let btnCambiarCategoria = document.getElementById("btnCambiarCategoria");
let rachaContador = document.getElementById("rachaContador");

//Para las stats
let infousuario;
let categoriasAcertadas = [];
let paisesAcertados = [];

let intentosCambiarCategoria = 3;
let paisInicial;
let labelpaisInicial;
let labelpais2;
let usuario = sessionStorage.getItem("usuario") ?? "Sin usuario" 
let pais2;
let dato;
let valorInicial;
let label;
let timer;
let paisDiario = "placeholder";
//esto está de repuesto. en realidad país diario se debería establkecer con la función

let racha = 0;
let puntaje = 0;
let paises = [];  

//FUNCIÓN DE STATS LISTAS CATEGORIAS Y PAISES
function compararListasAcertados(info,esCategoria){
//version para categorias
    if (esCategoria){
console.log(esCategoria,info)
let categoriasEnStats = info.stats.mayormenor.categoriasAcertadas;
//hasta aca td bien
for (let i = 0; i < categoriasAcertadas.length; i++){ //loop para ver cuales se repiten entre nuestra lista y la otra
    console.log("Se pasó a la categoría "+(i+1)+" de las acertadas actuales: ",categoriasAcertadas[i]);
    
    for (let c = 0; c < categoriasEnStats.length; c++){
        if (categoriasEnStats[c].dato === categoriasAcertadas[i].dato){
            categoriasEnStats[c].cantidad += categoriasAcertadas[i].cantidad;
            console.log(categoriasEnStats[c].cantidad);
        }
        console.log("c =",c)
    }

}
return categoriasEnStats;
}
}

function calcularPromedioRacha(stats){
    let sumatoria = 0;
    for (let i = 0; i < stats.stats.mayormenor.listaRachas.length; i++){
      sumatoria += stats.stats.mayormenor.listaRachas[i]
    }
    return sumatoria / stats.stats.mayormenor.listaRachas.length;
    }

function cambiarCategoria(){
    if (intentosCambiarCategoria > 0){
postEvent("cambiarCategoria",{paisInicial: paisInicial, 
    labelpaisInicial: labelpaisInicial,
        pais2: pais2,
        labelpais2: labelpais2,
        dato: dato,
        valorInicial: valorInicial,
        labelvalorInicial: labelvalorInicial,
        label: label,
        timer: timer},iniciarMayorMenor);
        intentosCambiarCategoria--;
        btnCambiarCategoria.innerText = "Cambiar de categoría (" + intentosCambiarCategoria + ")";
    }
    else if (intentosCambiarCategoria === 0) btnCambiarCategoria.disabled = "true";


}

function iniciarMayorMenor(data) {
    paisInicial = data.paisInicial; 
labelpaisInicial = data.labelpaisInicial;
    pais2 = data.pais2;
    labelpais2 = data.labelpais2;
    dato = data.dato;
    valorInicial = data.valorInicial;
    labelvalorInicial = data.labelvalorInicial;
    label = data.label;
    timer = data.timer;
    paisInicialNombre.innerText = labelpaisInicial;
    paisInicialDato.innerText = labelvalorInicial;
    pais2Nombre.innerText = labelpais2;
    categoriaNombre.innerText = label;
  }



  //STATS


  async function enviarstats(){
   // console.log("envio de stats iniciado")
postEvent("enviarStatsAlFront",{nombre:usuario},getStats);
}

function getStats(data){
 infousuario = data;
 //console.log(infousuario);
 infousuario.stats.mayormenor ??= {};
 //para la racha
 let racha = (Math.max(timer,infousuario.stats.mayormenor.racha)) ?? timer;
 infousuario.stats.mayormenor.racha = racha;
 //para listas categorias y eso
 let statpaisesAcertados = compararListasAcertados(infousuario,false) ?? paisesAcertados;
 let statcategoriasAcertadas = compararListasAcertados(infousuario,true) ?? categoriasAcertadas;
 infousuario.stats.mayormenor.categoriasAcertadas = statcategoriasAcertadas;
 infousuario.stats.mayormenor.paisesAcertados = statpaisesAcertados;
 infousuario.stats.mayormenor.listaRachas.push(timer);
 infousuario.stats.mayormenor.promedioRachas = calcularPromedioRacha(infousuario);
 

 //console.log(racha, timer, infousuario.stats.mayormenor.racha);
 //racha de dias

 postEvent("guardarStatsEnElBack",infousuario,guardarStats);
}

function guardarStats(){};



//

function evaluarResultado(data){
if (data.victoria) {
 paisInicial = data.paisInicial; 
    pais2 = data.pais2;
    dato = data.dato;
    labelvalorInicial = data.labelvalorInicial;
    timer = data.timer;
    paisInicialNombre.innerText = data.labelpaisInicial;
    paisInicialDato.innerText = data.labelvalorInicial;
    pais2Nombre.innerText = data.labelpais2;
    categoriaNombre.innerText = data.label;
    rachaContador.innerText = timer;

    if (categoriasAcertadas.some(p => p.dato === dato)){
        for (let i = 0; i < categoriasAcertadas.length; i++){
            if (categoriasAcertadas[i].dato === dato){
            categoriasAcertadas[i].cantidad++;
            break;
            } 
        }
        } else {
            categoriasAcertadas.push({dato:dato,cantidad:1});
        }  

if (paisesAcertados.some(p => p.pais === paisInicial)){
for (let i = 0; i < paisesAcertados.length; i++){
    if (paisesAcertados[i].pais === paisInicial){
    paisesAcertados[i].cantidad++;
    break;
    } 
}
} else {
    paisesAcertados.push({pais:paisInicial,cantidad:1});
}  
    
//console.log(paisesAcertados,categoriasAcertadas);


}
else {
mostrarPopUp(data.timer);
enviarstats();
pais2Nombre.innerText = data.labelPais2 + ": "+data.valorPais2;
//se muestra undefined en el nombre de pais 2. eso es porque en el backend se reemplaza labelpais2 por el nuevo pais y el viejo se pierde. agregar forma de arreglarlo. vincular con sist. de quemados
}

}


postEvent("iniciarMayorMenor",{}, iniciarMayorMenor); 


botonMayor.addEventListener("click", ()=> {
    postEvent("evaluarRespuesta", {input: false, timer: timer, paisInicial: paisInicial, labelpaisInicial: labelpaisInicial, pais2: pais2, labelpais2: labelpais2, dato: dato, valorInicial: valorInicial, }, evaluarResultado);
});

botonMenor.addEventListener("click", ()=> {
    postEvent("evaluarRespuesta", {input: true, timer: timer, paisInicial: paisInicial, labelpaisInicial: labelpaisInicial, pais2: pais2, labelpais2: labelpais2, dato: dato, valorInicial: valorInicial}, evaluarResultado);
});


let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let mensajeResultado = document.getElementById("mensajeResultado");
let btnJugar = document.getElementById("btnJugar");
let btnPrincipal = document.getElementById("btnPrincipal");


function mostrarPopUp(puntaje) {
    mensajeResultado.innerText = "¡Perdiste! Tu puntaje es: " + puntaje;
    modal.style.display = "block"; 
}


btnCambiarCategoria.addEventListener("click",cambiarCategoria);


let popupayuda = document.getElementById("popupayuda");
let cerrarayuda = document.getElementById("cerrarayuda");
let btnAyuda = document.getElementById("btnAyuda");

  cerrarayuda.onclick = () => {
    popupayuda.style.display = "none";
  };

  window.addEventListener("click", (e) => {
    if (e.target === popupayuda) {
      popupayuda.style.display = "none";
    }
  });

btnAyuda.addEventListener("click",()=>{
 popupayuda.style.display = "flex";
});

cerrarayuda.onclick = function() {
    popupayuda.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popupayuda) {
        popupayuda.style.display = "none";
    }
}


btnJugar.onclick = function() {
    modal.style.display = "none";


    location.reload();  
}


btnPrincipal.onclick = function() {
    window.location.href = "../home/index.html";  
}