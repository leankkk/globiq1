
connect2Server();

let paisInicialNombre = document.getElementById("paisInicialNombre");
let paisInicialDato = document.getElementById("paisInicialDato");
let botonMayor = document.getElementById("btnMayor");
let botonMenor = document.getElementById("btnMenor");

let paisInicial;
let labelpaisInicial;
let labelpais2;
let pais2;
let dato;
let valorInicial;
let label;
let timer;
let paisDiario = "placeholder";  

let racha = 0;
let puntaje = 0;
let paises = [];  


function getCountryCode(nombrePais) {
    let codigos = {
        argentina: "ar",
        rumania: "ro",
        lituania: "lt",
        españa: "es",
        francia: "fr",
        alemania: "de",
        brasil: "br",
        chile: "cl",
        uruguay: "uy",
        mexico: "mx",
        estados_unidos: "us",
        canada: "ca",
        italia: "it",
        australia: "au",
        portugal: "pt",
        suiza: "ch",
        belgica: "be",
        suecia: "se",
        polonia: "pl",
        dinamarca: "dk",
        finlandia: "fi",
        noruega: "no",
        paises_bajos: "nl",
        austriaca: "at",
        irlanda: "ie",
        grecia: "gr",
        turquia: "tr",
        croacia: "hr",
        eslovaquia: "sk",
        hungria: "hu",
        chequia: "cz",
        eslovenia: "si",
        bielorrusia: "by",
        ucrania: "ua",
        rusia: "ru",
        india: "in",
        china: "cn",
        japon: "jp",
        surcorea: "kr",
        filipinas: "ph",
        indonesia: "id",
        tailandia: "th",
        vietnam: "vn",
        malasia: "my",
        singapur: "sg",
        pakistan: "pk",
        bangladesh: "bd",
        nepal: "np",
        sri_lanka: "lk",
        sudafrica: "za",
        egipto: "eg",
        marruecos: "ma",
        argelia: "dz",
        tunisia: "tn",
        israel: "il",
        arabia_saudi: "sa",
        emirat_árabe: "ae",
        irak: "iq",
        jordania: "jo",
        lebanon: "lb",
        palestina: "ps",
        qatar: "qa",
        kuwait: "kw",
        bahrein: "bh",
        oman: "om",
        yemen: "ye",
        libia: "ly",
        sudan: "sd",
        etopia: "et",
        kenia: "ke",
        nigeria: "ng",
        ghana: "gh",
        senegal: "sn",
        zambia: "zm",
        tanzania: "tz",
        botswana: "bw",
        lesoto: "ls",
        malawi: "mw",
        zimbabue: "zw",
        mozambique: "mz",
        angola: "ao",
        congo: "cg",
        republica_congo: "cd",
        guinea: "gn",
        liberia: "lr",
        sierra_leona: "sl",
        gambia: "gm",
        burkina_faso: "bf",
        mali: "ml",
        niger: "ne",
        chad: "td",
        camerun: "cm",
        nigeria: "ng",
        benin: "bj",
        togo: "tg",
        cabo_verde: "cv",
        seychelles: "sc",
        reunion: "re",
        madagascar: "mg",
        comoras: "km",
        mauricio: "mu",
        islas_falkland: "fk",
        bermudas: "bm",
        grenada: "gd",
        barbados: "bb",
        trinidad_y_tobago: "tt",
        san_cristobal_y_nieves: "kn",
        santa_lucia: "lc",
        dominica: "dm",
        san_vicente_y_granadinas: "vc",
        antigua_y_barbuda: "ag",
        san_martin: "mf",
        anguila: "ai",
        aruba: "aw",
        bonaire: "bq",
        curazao: "cw",
        saint_barthelemy: "bl",
        san_pedro_y_miquelon: "pm",
        isla_ascension: "ac",
        isla_tristán_da_cunha: "gs",
        groenlandia: "gl",
        saint_pierre_y_miquelon: "pm",
        isla_turks_y_caicos: "tc",
        dominica: "dm"
    };
    return codigos[nombrePais.toLowerCase()] || "us"; 
}


function iniciarMayorMenor(data) {
    paisInicial = data.paisInicial;
    labelpaisInicial = data.labelpaisInicial;
    pais2 = data.pais2;
    labelpais2 = data.labelpais2;
    dato = data.dato;
    valorInicial = data.valorInicial;
    timer = data.timer;
    label = data.label;

    let codigoPaisInicial = getCountryCode(paisInicial);
    let codigoPais2 = getCountryCode(pais2);

    paisInicialNombre.innerHTML = `<span class="flag-icon flag-icon-${codigoPaisInicial}"></span> ${labelpaisInicial}`;
    paisInicialDato.innerText = valorInicial;
    pais2Nombre.innerHTML = `<span class="flag-icon flag-icon-${codigoPais2}"></span> ${labelpais2}`;
    categoriaNombre.innerText = label;
}


function armarBloques() {}


function resultado(data) {
    if (data.victoria) {
        alert("Ganaste. Racha: " + data.timer);
        paisInicial = data.paisInicial; 
        pais2 = data.pais2;
        dato = data.dato;
        timer = data.timer;
        paisInicialNombre.innerText = data.labelpaisInicial;
        paisInicialDato.innerText = data.valorInicial;
        pais2Nombre.innerText = data.labelpais2;
        categoriaNombre.innerText = data.label;
    } else {
        alert("Perdiste. Puntaje: " + data.timer);
        pais2Nombre.innerText = data.labelPais2 + ": " + data.valorPais2;
        postEvent("iniciarMayorMenor", {}, iniciarMayorMenor); 
    }
}


botonMayor.addEventListener("click", () => {
    postEvent("respuesta", {input: false, timer: timer, paisInicial: paisInicial, labelpaisInicial: labelpaisInicial, pais2: pais2, labelpais2: labelpais2, dato: dato, valorInicial: valorInicial}, resultado);
});

botonMenor.addEventListener("click", () => {
    postEvent("respuesta", {input: true, timer: timer, paisInicial: paisInicial, labelpaisInicial: labelpaisInicial, pais2: pais2, labelpais2: labelpais2, dato: dato, valorInicial: valorInicial}, resultado);
});


let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let mensajeResultado = document.getElementById("mensajeResultado");
let botonJugar = document.getElementById("botonJugar");
let botonPrincipal = document.getElementById("botonPrincipal");

function mostrarPopUp(puntaje) {
    mensajeResultado.innerText = "¡Perdiste! Tu puntaje es: " + puntaje;
    modal.style.display = "block"; 
}


span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


botonJugar.onclick = function() {
    modal.style.display = "none";
    location.reload(); 
}

botonPrincipal.onclick = function() {
    window.location.href = "../home/index.html";  
}


postEvent("iniciarMayorMenor", {}, iniciarMayorMenor);
