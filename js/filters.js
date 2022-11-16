//Legends keys must be same as filter keys

var Filters = {
    generalProvince: generalProvince,
    generalDistrict: generalDistrict,
    nullProvince: nullProvince,
    nullDistrict: nullDistrict,
    generalMunicipality: generalMunicipality,

    population: {
        province: province_population,
        // district: district_population,
        // municipality: municipality_population
    },
    density: {
        province: province_density,
        // district: district_density,
        // municipality: municipality_density
    },
    party: {
        // province: province_party,
        // district: district_party,
        // municipality: municipality_party
    },
    c_mayor_name: {
        municipality: mayor_name
    },
    mayor_party: {
        municipality: mayor_party2
    },
    mayor_age: {
        municipality: mayor_age
    },
    mayor_gender: {
        municipality: mayor_gender
    },
    mayor_margin: {
        municipality: mayor_margin
    },

    vice_mayor_name: {
        municipality: vice_mayor_name
    },
    vice_mayor_party: {
        municipality: vice_mayor_party
    },
    vice_mayor_age: {
        municipality: vice_mayor_age
    },
    vice_mayor_gender: {
        municipality: vice_mayor_gender
    },
    vice_mayor_margin: {
        municipality: vice_mayor_margin
    },

    voters_count: {
        municipality: voters_count
    },

    c_mayor_candidate: {
        municipality: c_mayor_candidate
    },
    c_mayor_gender: {
        municipality: c_mayor_gender
    },
    c_mayor_age: {
        municipality: c_mayor_age
    },

    c_vice_mayor_candidate: {
        municipality: c_vice_mayor_candidate
    },
    c_vice_mayor_gender: {
        municipality: c_vice_mayor_gender
    },
    c_vice_mayor_age: {
        municipality: c_vice_mayor_age
    },

    ward_president_candidate: {
        municipality: ward_president_candidate
    },
    ward_president_gender: {
        municipality: ward_president_gender
    },
    ward_president_age: {
        municipality: ward_president_age
    },

}


function generalProvince(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: "#aaa",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: getProvinceColor(feature.properties.Province)
    };
}

function nullProvince(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: "#33333300",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: getProvinceColor(feature.properties.Province)
    };
}

function generalDistrict(feature) {
    return {
        weight: 3,
        opacity: 0.8,
        color: "#333",
        // dashArray: "1",
        fillOpacity: 1,
        fillColor: "#00000000"
    };
}

function nullDistrict(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: "#33333300",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: "#00000000"
    };
}


function generalMunicipality(feature) {
    // var color="#c7e0f5"
    // if (NationalParks[feature.properties.OBJECTID_1]) {
    //     color = checkNationalPark(feature.properties.OBJECTID_1);
    // }
    if (Data.fidCodeMap[feature.properties.OBJECTID_1] == 0) {

        color = "#e2f7e1";
        opacity = 0.3
    }
    else {


        color = "#c6d9ff"
        opacity = 0.3

    };
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    return {
        weight: 0.5,
        opacity: 0.5,
        color: "#333",
        // dashArray: "1",
        fillOpacity: 0.5,
        fillColor: color
    };
}

function mayor_party2(feature) {
   
    if (Data.fidCodeMap[feature.properties.OBJECTID_1] == 0) {

        color = "#e2f7e1";
        opacity = 0.3
    }
    else {

        var constcode = Data.fidCodeMap[feature.properties.OBJECTID_1]
        var provienceid = constcode.toString().substring(0,1)
        
        color = GeneralProvienceColor[provienceid]
        opacity = 1

    };
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    return {
        weight: 3,
        opacity: 0.3,
        color: "#333",
        // dashArray: "1",
        fillOpacity: 0.5,
        fillColor: color
    };
}

function getProvinceColor(Province) {
    return "#00000000";
}

function province_population(feature) {
    var Province_population = provincePopulation[feature.properties.Province - 1][1];
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: getProvinceColor_population(Province_population)
    };
}

function getProvinceColor_population(Province_population) {
    return Province_population > 6000000 ? '#08519c' :
        Province_population > 5000000 ? '#3182bd' :
            Province_population > 4000000 ? '#6baed6' :
                Province_population > 3000000 ? '#9ecae1' :
                    Province_population > 2000000 ? '#c6dbef' :
                        '#eff3ff';
}

function municipality_population(feature) {

}

function province_density(feature) {
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: getProvinceColor_popDensity(provincePopulation[feature.properties.Province - 1][2])
    };
}

function getProvinceColor_popDensity(Province_popDensity) {
    return Province_popDensity > 500 ? '#08519c' :
        Province_popDensity > 400 ? '#3182bd' :
            Province_popDensity > 300 ? '#6baed6' :
                Province_popDensity > 200 ? '#9ecae1' :
                    Province_popDensity > 100 ? '#c6dbef' :
                        '#eff3ff';
}

function voters_count(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getVoterCountColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };

}

function mayor_name(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getMayorNameColor(feature.properties.OBJECTID_1) : "#ffffff00");
    if (!regionFilter(feature.properties.OBJECTID_1))
        color = "#ffffff00";
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function mayor_party(feature) {
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    // pattern = /OBJECTID_1/i 

    // var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getMayorNameColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    var color = "red"

    color = DataLayer.getMayorNameColor(feature.properties.OBJECTID_1);
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";

    // if(NationalParks[feature.properties.OBJECTID_1]){
    //     color =  checkNationalPark(feature.properties.OBJECTID_1);
    // }
    if (Data.fidCodeMap[feature.properties.OBJECTID_1] == 0) {
        color = "#e2f7e1"
    }

    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function mayor_age(feature) {
    var opacity = 0.8
    var color = "red"

    color = DataLayer.getMayorAgeColor(feature.properties.OBJECTID_1);
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";

    // if(NationalParks[feature.properties.OBJECTID_1]){
    //     color =  checkNationalPark(feature.properties.OBJECTID_1);
    // }
    if (Data.fidCodeMap[feature.properties.OBJECTID_1] == 0) {
        color = "#e2f7e1"
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}
function mayor_gender(feature) {
    var opacity = 0.8
    var color = "red"

    color = DataLayer.getMayorGenderColor(feature.properties.OBJECTID_1);
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";

    // if(NationalParks[feature.properties.OBJECTID_1]){
    //     color =  checkNationalPark(feature.properties.OBJECTID_1);
    // }
    if (Data.fidCodeMap[feature.properties.OBJECTID_1] == 0) {
        color = "#e2f7e1"
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function mayor_margin(feature) {
    var opacity = 0.8
    var color = "red"

    color = DataLayer.getMayorMarginColor(feature.properties.OBJECTID_1);
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";

    // if(NationalParks[feature.properties.OBJECTID_1]){
    //     color =  checkNationalPark(feature.properties.OBJECTID_1);
    // }
    if (Data.fidCodeMap[feature.properties.OBJECTID_1] == 0) {
        color = "#e2f7e1"
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function vice_mayor_name(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getViceMayorNameColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function vice_mayor_party(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getViceMayorNameColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1])
        color = "#e2f7e1";
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function vice_mayor_age(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getViceMayorAgeColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}
function vice_mayor_gender(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getViceMayorGenderColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}
function vice_mayor_margin(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getViceMayorMarginColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}



function c_mayor_candidate(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getMayorCandidateColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function c_mayor_gender(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getMayorCandidateGenderColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function c_mayor_age(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getMayorCandidateAgeColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}



function c_vice_mayor_candidate(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getViceMayorCandidateColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function c_vice_mayor_gender(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getViceMayorCandidateGenderColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function c_vice_mayor_age(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getViceMayorCandidateAgeColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}


function ward_president_candidate(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getWardPresidentCandidateColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function ward_president_gender(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getWardPresidentCandidateGenderColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}

function ward_president_age(feature) {
    var color = NationalParks[feature.properties.OBJECTID_1] ? "#e2f7e1" : (palikaFilter(feature.properties.OBJECTID_1) ? DataLayer.getWardPresidentCandidateAgeColor(feature.properties.OBJECTID_1) : "#ffffff00");
    var opacity = 0.8
    if (!regionFilter(feature.properties.OBJECTID_1)) {
        color = "#ffffff00";
        opacity = 0.3
    }
    if (!Global.currentLegendKeys.includes(color.replace(/^\s+|\s+$/g, "").replace("#", "")))
        color = "#ffffff00";
    if (NationalParks[feature.properties.OBJECTID_1]) {
        color = checkNationalPark(feature.properties.OBJECTID_1);
    }
    return {
        weight: 0.5,
        opacity: opacity,
        color: "#333",
        dashArray: "1",
        fillOpacity: 1,
        fillColor: color
    };
}



function palikaFilter(fid) {
    var palika = DataLayer.getPalikaFromFid(fid);
    if (palika == "Nagarpalika" || palika == "Mahanagarpalika" || palika == "Upamahanagarpalika" || palika == "maha Nagarpalika") {
        if (Global.currentPalikaSelect == "Nagarpalika")
            return true;
    }
    if (palika == "Gaunpalika" || palika == "gaupaika")
        if (Global.currentPalikaSelect == "Gaunpalika")
            return true;
    if (Global.currentPalikaSelect == "All")
        return true;
    return false;
}

function checkNationalPark(fid) {
    var color = "#e2f7e1"
    if (Global.districtSelected) {
        // console.log(NationalParksDistrict[fid],NationalParksDistrict[fid].toString().substring(1,2), Global.districtSelected)
        if (parseInt(NationalParksDistrict[fid]) == parseInt(Global.districtSelected))
            color = "#e2f7e1";
        else
            color = "#ffffff00"
    }
    else if (Global.provinceSelected) {
        if (parseInt(NationalParksProvince[fid]) == parseInt(Global.provinceSelected))
            color = "#e2f7e1";
        else
            color = "#ffffff00"
    }
    else {
        color = "#e2f7e1"
    }
    return color;
}