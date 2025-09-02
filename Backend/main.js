//Importando datos
import fs, { Stats } from "fs";
let data = JSON.parse(fs.readFileSync("factbook_legal_clean.json","utf-8"));

//Lista de países
let listapaises = [
    "afghanistan",
    "albania",
    "algeria",
    "andorra",
    "angola",
    "antigua_and_barbuda",
    "argentina",
    "armenia",
    "australia",
    "austria",
    "azerbaijan",
    "bahamas_the",
    "bahrain",
    "bangladesh",
    "barbados",
    "belarus",
    "belgium",
    "belize",
    "benin",
    "bhutan",
    "bolivia",
    "bosnia_and_herzegovina",
    "botswana",
    "brazil",
    "brunei",
    "bulgaria",
    "burkina_faso",
    "burundi",
    "cabo_verde",
    "cambodia",
    "cameroon",
    "canada",
    "central_african_republic",
    "chad",
    "chile",
    "china",
    "colombia",
    "comoros",
    "congo_democratic_republic_of_the",
    "congo_republic_of_the",
    "costa_rica",
    "cote_d'_ivoire",
    "croatia",
    "cuba",
    "cyprus",
    "czechia",
    "denmark",
    "djibouti",
    "dominica",
    "dominican_republic",
    "ecuador",
    "egypt",
    "el_salvador",
    "equatorial_guinea",
    "eritrea",
    "estonia",
    "eswatini",
    "ethiopia",
    "fiji",
    "finland",
    "france",
    "gabon",
    "gambia_the",
    "georgia",
    "germany",
    "ghana",
    "greece",
    "grenada",
    "guatemala",
    "guinea",
    "guinea_bissau",
    "guyana",
    "haiti",
    "holy_see_vatican_city",
    "honduras",
    "hungary",
    "iceland",
    "india",
    "indonesia",
    "iran",
    "iraq",
    "ireland",
    "israel",
    "italy",
    "jamaica",
    "japan",
    "jordan",
    "kazakhstan",
    "kenya",
    "kiribati",
    "korea_north",
    "korea_south",
    "kosovo",
    "kuwait",
    "kyrgyzstan",
    "laos",
    "latvia",
    "lebanon",
    "lesotho",
    "liberia",
    "libya",
    "liechtenstein",
    "lithuania",
    "luxembourg",
    "madagascar",
    "malawi",
    "malaysia",
    "maldives",
    "mali",
    "malta",
    "marshall_islands",
    "mauritania",
    "mauritius",
    "mexico",
    "micronesia_federated_states_of",
    "moldova",
    "monaco",
    "mongolia",
    "montenegro",
    "morocco",
    "mozambique",
    "namibia",
    "nauru",
    "nepal",
    "netherlands",
    "new_zealand",
    "nicaragua",
    "niger",
    "nigeria",
    "north_macedonia",
    "norway",
    "oman",
    "pakistan",
    "palau",
    "panama",
    "papua_new_guinea",
    "paraguay",
    "peru",
    "philippines",
    "poland",
    "portugal",
    "qatar",
    "romania",
    "russia",
    "rwanda",
    "saint_kitts_and_nevis",
    "saint_lucia",
    "saint_vincent_and_the_grenadines",
    "samoa",
    "san_marino",
    "sao_tome_and_principe",
    "saudi_arabia",
    "senegal",
    "serbia",
    "seychelles",
    "sierra_leone",
    "singapore",
    "slovakia",
    "slovenia",
    "solomon_islands",
    "somalia",
    "south_africa",
    "south_sudan",
    "spain",
    "sri_lanka",
    "sudan",
    "suriname",
    "sweden",
    "switzerland",
    "syria",
    "taiwan",
    "tajikistan",
    "tanzania",
    "thailand",
    "timor_leste",
    "togo",
    "tonga",
    "trinidad_and_tobago",
    "tunisia",
    "turkey",
    "turkmenistan",
    "tuvalu",
    "uganda",
    "ukraine",
    "united_arab_emirates",
    "united_kingdom",
    "united_states",
    "uruguay",
    "uzbekistan",
    "vanuatu",
    "venezuela",
    "vietnam",
    "yemen",
    "zambia",
    "zimbabwe"
  ];
  


//Declarando funciones útiles

function contienedato(pais,dato) {
    if (traer(pais,dato) != undefined){
        return true;
    }
    else {
        return false;
    }
}

function traer(pais,dato) {
dato = dato.split(".");
return data[pais]?.[dato[0]]?.[dato[1]]?.[dato[2]];
}

function comparar(pais1,pais2,dato){
    if (traer(pais1,dato) > traer(pais2,dato)){
        return true;
    }
    else {
        return false;
    }
}

function paisrandom() {
 let numero = Math.round(Math.random() * listapaises.length);
 return listapaises[numero];
} //Por ahora la función solo da un entero al azar según cantidad de países.


function paisdiario() {

}

function datorandom(pais){

}
//console.log(comparar("uruguay","people.population.total"));
let i = 0;
while(i<listapaises.length){
let actual = listapaises[i];
if (!contienedato(actual,"people.population.total")){
    console.log(actual);
}
i++;}