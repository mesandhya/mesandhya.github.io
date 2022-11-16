var Global = {
	provinceGeoJson:null, 
	districtGeoJson:null, 
    municipalityGeoJson:null, 
    allMunicipalityGeoJson:null,
	wardGeoJson:null,
	currentLayers: [],  
	currentFilter: null,
	currentFilterLevel: "municipality",
    currentGeoLevel: null,
    provinceSelected: 0,
    districtSelected:null,
    currentProvince: null,
    currentDistrict: null,
    currentParty: null,
    Provinces: [],
    Districts: [],
    currentFilterLegend: null,
    oldFilterLegend: null,
    boundLevel:  "Country", // Country, Province, District
	map: null,
	popup: L.popup(),
    mapLend: null,
    currentPalikaSelect: "All",
    currentSummaryTitle: "Summary",
    currentSummaryBody: {}
}

nepaliDigits = {
    "0": "०",
    "1": "१",
    "2": "२",
    "3": "३",
    "4": "४",
    "5": "५",
    "6": "६",
    "7": "७",
    "8": "८",
    "9": "९",
}

function toNepaliDigits(s){
    var final = ""
    var str = s.toString();
    if(!isNaN(s)){
        var x=s;
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
        var str = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    }
    for (var i = 0; i < str.toString().length; i++) {
        if(nepaliDigits[str[i]])
            final += nepaliDigits[str[i]];
        else
            final += str[i];
    }
    return final;
}

function toEnglishDigits(s){
    var final = ""
    var str = s.toString();
    for (var i = 0; i < str.toString().length; i++) {
        var v = Object.keys(nepaliDigits).find(key => nepaliDigits[key] === str[i]); 
        if(v)
            final += v;
        else
            final += str[i];
    }
    return final;
}

function regionFilter(OBJECTID_1){
    var ccode = Data.fidCodeMap[OBJECTID_1];
  
    if(Global.districtSelected){
        if(ccode.toString().substring(0,3) == Global.districtSelected){
            // console.log(lcode, Global.districtSelected)
            return true;

        }
        else return false;
    }
    else{
        if(Global.provinceSelected)
            if(ccode.toString().substring(0,1) == Global.provinceSelected)
                return true;
            else return false;
    }
    
    return true;

}

function sortByNepaliNumeric(obj){
    return Object.entries(obj).sort((a, b) => toEnglishDigits(b[1]) - toEnglishDigits(a[1]));
}

MapOptions= {
    center: [28.3, 84.4],
    zoom: L.Browser.mobile? 6:7.4,
    minZoom: L.Browser.mobile? 6:7.4,
    maxZoom:10,
    snapZoom:0.25,
    doubleClickZoom : false,
    inertia:true,
    inertiaDeceleration:500,
    scrollWheelZoom: false
    
}
