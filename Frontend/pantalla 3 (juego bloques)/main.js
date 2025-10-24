connect2Server();

function obtenerCodigoISO(nombre) {
    const mapa = {
      Afghanistan: "AF",
      Albania: "AL",
      Algeria: "DZ",
      Andorra: "AD",
      Angola: "AO",
      "Antigua and Barbuda": "AG",
      Argentina: "AR",
      Armenia: "AM",
      Australia: "AU",
      Austria: "AT",
      Azerbaijan: "AZ",
      Bahamas: "BS",
      Bahrain: "BH",
      Bangladesh: "BD",
      Barbados: "BB",
      Belarus: "BY",
      Belgium: "BE",
      Belize: "BZ",
      Benin: "BJ",
      Bhutan: "BT",
      Bolivia: "BO",
      "Bosnia and Herzegovina": "BA",
      Botswana: "BW",
      Brazil: "BR",
      Brunei: "BN",
      Bulgaria: "BG",
      "Burkina Faso": "BF",
      Burundi: "BI",
      Cambodia: "KH",
      Cameroon: "CM",
      Canada: "CA",
      "Cape Verde": "CV",
      "Central African Republic": "CF",
      Chad: "TD",
      Chile: "CL",
      China: "CN",
      Colombia: "CO",
      Comoros: "KM",
      "Democratic Republic of the Congo": "CD",
      "Republic of the Congo": "CG",
      "Costa Rica": "CR",
      Croatia: "HR",
      Cuba: "CU",
      Cyprus: "CY",
      "Czech Republic": "CZ",
      Denmark: "DK",
      Djibouti: "DJ",
      Dominica: "DM",
      "Dominican Republic": "DO",
      Ecuador: "EC",
      Egypt: "EG",
      "El Salvador": "SV",
      "Equatorial Guinea": "GQ",
      Eritrea: "ER",
      Estonia: "EE",
      Eswatini: "SZ",
      Ethiopia: "ET",
      Fiji: "FJ",
      Finland: "FI",
      France: "FR",
      Gabon: "GA",
      Gambia: "GM",
      Georgia: "GE",
      Germany: "DE",
      Ghana: "GH",
      Greece: "GR",
      Grenada: "GD",
      Guatemala: "GT",
      Guinea: "GN",
      "Guinea-Bissau": "GW",
      Guyana: "GY",
      Haiti: "HT",
      Honduras: "HN",
      Hungary: "HU",
      Iceland: "IS",
      India: "IN",
      Indonesia: "ID",
      Iran: "IR",
      Iraq: "IQ",
      Ireland: "IE",
      Israel: "IL",
      Italy: "IT",
      Jamaica: "JM",
      Japan: "JP",
      Jordan: "JO",
      Kazakhstan: "KZ",
      Kenya: "KE",
      Kiribati: "KI",
      "North Korea": "KP",
      "South Korea": "KR",
      Kuwait: "KW",
      Kyrgyzstan: "KG",
      Laos: "LA",
      Latvia: "LV",
      Lebanon: "LB",
      Lesotho: "LS",
      Liberia: "LR",
      Libya: "LY",
      Liechtenstein: "LI",
      Lithuania: "LT",
      Luxembourg: "LU",
      Madagascar: "MG",
      Malawi: "MW",
      Malaysia: "MY",
      Maldives: "MV",
      Mali: "ML",
      Malta: "MT",
      "Marshall Islands": "MH",
      Mauritania: "MR",
      Mauritius: "MU",
      Mexico: "MX",
      Micronesia: "FM",
      Moldova: "MD",
      Monaco: "MC",
      Mongolia: "MN",
      Montenegro: "ME",
      Morocco: "MA",
      Mozambique: "MZ",
      Myanmar: "MM",
      Namibia: "NA",
      Nauru: "NR",
      Nepal: "NP",
      Netherlands: "NL",
      "New Zealand": "NZ",
      Nicaragua: "NI",
      Niger: "NE",
      Nigeria: "NG",
      "North Macedonia": "MK",
      Norway: "NO",
      Oman: "OM",
      Pakistan: "PK",
      Palau: "PW",
      Panama: "PA",
      "Papua New Guinea": "PG",
      Paraguay: "PY",
      Peru: "PE",
      Philippines: "PH",
      Poland: "PL",
      Portugal: "PT",
      Qatar: "QA",
      Romania: "RO",
      Russia: "RU",
      Rwanda: "RW",
      "Saint Kitts and Nevis": "KN",
      "Saint Lucia": "LC",
      "Saint Vincent and the Grenadines": "VC",
      Samoa: "WS",
      "San Marino": "SM",
      "Sao Tome and Principe": "ST",
      "Saudi Arabia": "SA",
      Senegal: "SN",
      Serbia: "RS",
      Seychelles: "SC",
      "Sierra Leone": "SL",
      Singapore: "SG",
      Slovakia: "SK",
      Slovenia: "SI",
      "Solomon Islands": "SB",
      Somalia: "SO",
      "South Africa": "ZA",
      Spain: "ES",
      "Sri Lanka": "LK",
      Sudan: "SD",
      Suriname: "SR",
      Sweden: "SE",
      Switzerland: "CH",
      Syria: "SY",
      Taiwan: "TW",
      Tajikistan: "TJ",
      Tanzania: "TZ",
      Thailand: "TH",
      Togo: "TG",
      Tonga: "TO",
      "Trinidad and Tobago": "TT",
      Tunisia: "TN",
      Turkey: "TR",
      Turkmenistan: "TM",
      Tuvalu: "TV",
      Uganda: "UG",
      Ukraine: "UA",
      "United Arab Emirates": "AE",
      "United Kingdom": "GB",
      "United States": "US",
      Uruguay: "UY",
      Uzbekistan: "UZ",
      Vanuatu: "VU",
      Venezuela: "VE",
      Vietnam: "VN",
      Yemen: "YE",
      Zambia: "ZM",
      Zimbabwe: "ZW"
    };
  
    return mapa[nombre] || null;
  }

  
  let datosPaises = {};

fetch("factbook_clean.json")
  .then((res) => res.json())
  .then((data) => {
    datosPaises = data;
    console.log("Datos cargados correctamente");
  })
  .catch((err) => console.error("Error cargando JSON:", err));


const dropArea = document.getElementById("drop-area");
let bloquesSeleccionados = []; 

document.querySelectorAll(".bloque").forEach((bloque) => {
  bloque.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", JSON.stringify(bloque.dataset));
  });
});

dropArea.addEventListener("dragover", (e) => e.preventDefault());

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = JSON.parse(e.dataTransfer.getData("text"));
  bloquesSeleccionados.push(data);
  dropArea.innerHTML += `<div class="dropped">${Object.values(data)[0]}</div>`;

  if (bloquesSeleccionados.length === 3) {
    procesarRegla();
  }
});


function procesarRegla() {
  const atributo = bloquesSeleccionados.find((b) => b.atributo)?.atributo;
  const operador = bloquesSeleccionados.find((b) => b.operador)?.operador;
  const valor = parseFloat(bloquesSeleccionados.find((b) => b.valor)?.valor);

  if (!atributo || !operador || isNaN(valor)) {
    alert("Falta información en la regla.");
    return;
  }

  evaluarCondicion(atributo, operador, valor);
  bloquesSeleccionados = []; 
  dropArea.innerHTML = "Soltá acá los bloques";
}


function evaluarCondicion(atributo, operador, valor) {
  const svgDoc = document.getElementById("mapaSVG").contentDocument;
  if (!svgDoc) {
    console.error("El mapa SVG no está cargado todavía.");
    return;
  }

  for (let codigo in datosPaises) {
    const pais = datosPaises[codigo];
    let dato = obtenerDatoPais(pais, atributo);
    if (dato == null) continue;

    let cumple = false;
    if (operador === "mayor") cumple = dato > valor;
    if (operador === "menor") cumple = dato < valor;
    if (operador === "igual") cumple = dato === valor;

    pintarPais(svgDoc, codigo, cumple);
  }
}



function obtenerDatoPais(pais, atributo) {
  switch (atributo) {
    case "densidad":
      return pais.population?.density || pais.density || 0;
    case "pib":
      return pais.economy?.gdp?.value || pais.pib || 0;
    case "superficie":
      return pais.area?.total?.value || pais.superficie || 0;
    default:
      return null;
  }
}


function pintarPais(svgDoc, codigoISO, cumple) {
  const pais = svgDoc.getElementById(codigoISO.toUpperCase());
  if (!pais) return;

  if (cumple) pais.style.fill = "red";
  else pais.style.fill = "#999"; 
}


document.getElementById("mapaSVG").addEventListener("load", () => {
  const svgDoc = document.getElementById("mapaSVG").contentDocument;
  if (!svgDoc) return;

  
  svgDoc.querySelectorAll("path").forEach((p) => (p.style.fill = "#ccc"));
});













  