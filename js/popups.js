var Popups = {
    generalProvince: generalProvince,
    generalDistrict: generalDistrict,
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
    mayor_name:{
        municipality: mayor_name
    },
    mayor_party:{
        municipality: mayor_party
    },
    mayor_age:{
        municipality: mayor_age
    },
    mayor_gender:{
        municipality: mayor_gender
    },
    mayor_margin:{
      municipality: mayor_margin
    },

    vice_mayor_name:{
        municipality: vice_mayor_name
    },
    vice_mayor_party:{
        municipality: vice_mayor_party
    },
    vice_mayor_age:{
        municipality: vice_mayor_age
    },
    vice_mayor_gender:{
        municipality: vice_mayor_gender
    },
    vice_mayor_margin:{
      municipality: vice_mayor_margin
    },
    voters_count:{
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



function highlightFeature(e) {
  if(Global.currentFilterLevel == "province"){
 
   var layer = e.target;
   var province_number = e.target.feature.properties.Province;
	
  layer.setStyle({
    weight: 2,   
  });
  
  layer.bindPopup("Province "+province_number+" : "+e.target.feature.properties.PR_NAME).openPopup();

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}
}


function resetHighlight(e) {
  // Global.provinceGeoJson.resetStyle(e.target);
}

//---District Map

function highlightDistrictFeature(e) {
 if(Global.currentFilterLevel == "district"){
  var layer = e.target;
 	
  layer.setStyle({
    weight: 2,   
  });
  
  layer.bindPopup("District :"+e.target.feature.properties.DISTRICT).openPopup();

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
 }
  
}

function resetDistrictHighlight(e) {
  e.target.setStyle({
    weight: 0.3,   
  });
}

//---Municipality Map



function highlightMunicipalityFeature(e) {
 if(regionFilter(e.target.feature.properties.OBJECTID_1)){
    var layer = e.target;
 	
    layer.setStyle({
      weight: 2,   
    });

    var text = "";
    
    if( Global.currentFilter)
      text = Popups[Global.currentFilter][Global.currentFilterLevel](e.target.feature);
    else
      text = e.target.feature.properties.NAME
      $('#info_div').html(text);
        // text_popup = $(text).find('h2').text();
      // alert(typeof $(text));
      // text_popup = $(text).find('h2').text();
      // alert(text_popup);
      // layer.bindPopup(text_popup).openPopup();

    // layer.bindPopup(text).openPopup();

    // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    //   layer.bringToFront();
    // }
  }
}

function highlightMunicipalityName(e) {
  layer.bindPopup(text).info["body"]["Constituency"];

}

function resetMunicipalityHighlight(e) {
  e.target.setStyle({
    weight: 0.3,   
  });
}


function mayor_party(feature){
  var info = DataLayer.getMayorInfo(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function mayor_age(feature){
  var info = DataLayer.getMayorInfo(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function mayor_gender(feature){
  var info = DataLayer.getMayorInfo(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function mayor_margin(feature){
  var info = DataLayer.getMayorInfo(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function vice_mayor_name(feature){
  var mayor = DataLayer.getViceMayorInfo(feature.properties.OBJECTID_1);
  var div = ""
  if(!mayor)
    div = "";
  else{
    div += '<p style="font-size:18px">';
    div += mayor.administrative_div1;
    div +="<br>";
    div += mayor.position1+": "+mayor.candidate1;
    div += "<br>";
    div += "पार्टी: "+Data.Parties[mayor.partycode1].party_nepali_name;
    div += "<br>";
    div += "भोट: "+ toNepaliDigits(mayor.acquired_vote1);
    div += "</p>";

  }
  if(NationalParks[feature.properties.OBJECTID_1])
  {
    div += '<p style="font-size:18px">';
    div += NationalParks[feature.properties.OBJECTID_1];
    div += "</p>";
  }
  return div;
}

function vice_mayor_age(feature){
  var mayor = DataLayer.getViceMayorInfo(feature.properties.OBJECTID_1);
  var div = ""
  if(!mayor)
    div = "";
  else{
    div += '<p style="font-size:18px">';
    div += mayor.administrative_div1 + " ( जिल्ला :  " + mayor.district +" )";
    div += "<br>";
    div += "<b>"+mayor.position1 + "</b> : " + mayor.candidate1 + " ( "+ Data.Parties[mayor.partycode1].party_nepali_name + " )";
    div += "<br>";
    div += "प्राप्त मत :" + toNepaliDigits(mayor.acquired_vote1)
    div += "<br>";
    div += "उमेर: "+ toNepaliDigits(mayor.age1) + " वर्ष" + " (उमेर समूह: " + toNepaliDigits(mayor.age_bracket1) + "   वर्ष)";
    div += "<br>";
    if(mayor.unopposed){
      div+= "( "+mayor.unopposed+" )";
    }
    else{
      div += "<b>उम्मेदवार: </b>" + mayor.candidate_name2 + " ( "+ Data.Parties[mayor.partycode2].party_nepali_name + " )";
      div += "<br>";
      div += "उमेर: "+ toNepaliDigits(mayor.age2) + " वर्ष" + " (उमेर समूह: " + toNepaliDigits(mayor.age_bracket2) + "   वर्ष)";
      div += "</p>";
    }

  }
  if(NationalParks[feature.properties.OBJECTID_1])
  {
    div += '<p style="font-size:18px">';
    div += NationalParks[feature.properties.OBJECTID_1];
    div += "</p>";
  }
  return div;
}

function vice_mayor_gender(feature){
  var mayor = DataLayer.getViceMayorInfo(feature.properties.OBJECTID_1);
  var div = "";
  if(!mayor)
    div = "";
  else{
    div += '<p style="font-size:18px">';
    div += mayor.administrative_div1 + " ( जिल्ला :  " + mayor.district +" )";
    div += "<br>";
    div += "<b>"+mayor.position1 + "</b> : " + mayor.candidate1 + " ( "+ Data.Parties[mayor.partycode1].party_nepali_name + " )";
    div += "<br>";
    div += "प्राप्त मत :" + toNepaliDigits(mayor.acquired_vote1)
    div += "<br>";
    div += "लिङ्ग: "+ (mayor.gender1=="M"?"पुरुस":"महिला");
    div += "<br>";
    if(mayor.unopposed){
      div+= "( "+mayor.unopposed+" )";
    }
    else{
      div += "<b>उम्मेदवार: </b>" + mayor.candidate_name2 + " ( "+ Data.Parties[mayor.partycode2].party_nepali_name + " )";
      div += "<br>";
      div += "लिङ्ग: "+ (mayor.gender2=="M"?"पुरुस":"महिला");
      div += "</p>";
    }

  }
  if(NationalParks[feature.properties.OBJECTID_1])
  {
    div += '<p style="font-size:18px">';
    div += NationalParks[feature.properties.OBJECTID_1];
    div += "</p>";
  }
  return div;
}

function vice_mayor_party(feature){
  var mayor = DataLayer.getViceMayorInfo(feature.properties.OBJECTID_1);
  var div = ""
  if(!mayor)
    div = "";
  else{
    div += '<p style="font-size:18px">';
    div += mayor.administrative_div1 + " ( जिल्ला :  " + mayor.district +" )";
    div += "<br>";
    div += "<b>"+mayor.position1 + "</b> : " + mayor.candidate1 + " ( "+ Data.Parties[mayor.partycode1].party_nepali_name + " )";
    div += "<br>";
    div += "प्राप्त मत :" + toNepaliDigits(mayor.acquired_vote1)
    div += "<br>";
    if(mayor.unopposed){
      div+= "( "+mayor.unopposed+" )";
    }
    else{
      div += "<b>उम्मेदवार: </b>" + mayor.candidate_name2 + " ( "+ Data.Parties[mayor.partycode2].party_nepali_name + " )";
      div += "</p>";
    }

  }
  if(NationalParks[feature.properties.OBJECTID_1])
  {
    div += '<p style="font-size:18px">';
    div += NationalParks[feature.properties.OBJECTID_1];
    div += "</p>";
  }
  return div;
}

function vice_mayor_margin(feature){
  var mayor = DataLayer.getViceMayorInfo(feature.properties.OBJECTID_1);
  var div = ""
  if(!mayor)
     div = "";
  else{
    div += '<p style="font-size:18px">';
    div += mayor.administrative_div1 + " ( जिल्ला :  " + mayor.district +" )";
    div += "<br>";
    div += "<b>"+mayor.position1 + "</b> : " + mayor.candidate1 + " ( "+ Data.Parties[mayor.partycode1].party_nepali_name + " )";
    div += "<br>";
    div += "प्राप्त मत :" + toNepaliDigits(mayor.acquired_vote1)
    div += "<br>";
    if(mayor.unopposed){
      div+= "( "+mayor.unopposed+" )";
    }
    else{
      div += "<b>उम्मेदवार: </b>" + mayor.candidate_name2 + " ( "+ Data.Parties[mayor.partycode2].party_nepali_name + " )";
      div += "<br>";
      div += "<b>मतान्तर: </b>" + toNepaliDigits(mayor.acquired_vote1 - mayor.acquired_vote2);
      div += "</p>";
    }
  }
  if(NationalParks[feature.properties.OBJECTID_1])
  {
    div += '<p style="font-size:18px">';
    div += NationalParks[feature.properties.OBJECTID_1];
    div += "</p>";
  }
  return div;
}


function c_mayor_candidate(feature){
  var info = DataLayer.getMayorCandidateInfo(feature.properties.OBJECTID_1);

  return getCandidatePopUpDiv(info,feature);
}

function c_mayor_age(feature){
  var info = DataLayer.getMayorCandidateAgeCount(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function c_mayor_gender(feature){
  var info = DataLayer.getMayorCandidateGenderCount(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function c_vice_mayor_candidate(feature){
  var info = DataLayer.getViceMayorCandidateInfo(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function c_vice_mayor_age(feature){
  var info = DataLayer.getViceMayorCandidateAgeCount(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function c_vice_mayor_gender(feature){
  var info = DataLayer.getViceMayorCandidateGenderCount(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function ward_president_candidate(feature){
  var info = DataLayer.getWardPresidentCandidateInfo(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function ward_president_age(feature){
  var info = DataLayer.getWardPresidentCandidateAgeCount(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function ward_president_gender(feature){
  var info = DataLayer.getWardPresidentCandidateGenderCount(feature.properties.OBJECTID_1);
  return getCandidatePopUpDiv(info,feature);
}

function voters_count(feature){
  var info = DataLayer.getRegisteredVotersInfo(feature.properties.OBJECTID_1)
  var div=""

  if(info){
    div += Templates[Global.currentFilter](info);
    if(NationalParks[feature.properties.OBJECTID_1])
    {
      div += '<p style="font-size:18px">';
      div += NationalParks[feature.properties.OBJECTID_1];
      div += "</p>";
    }
  }
  return div;
}

function getCandidatePopUpDiv(info, feature){
  var div = ""
  
  if(NationalParks[feature.properties.OBJECTID_1])
  {
    div += '<p style="font-size:18px">';
    div += NationalParks[feature.properties.OBJECTID_1];
    div += "</p>";
  }
  else{
    if(!info)
        div = "";
    else{
      data = {};
      data['body'] = info;
      data['header'] = DataLayer.getCandidateHeader(feature.properties.OBJECTID_1);
      div += Templates[Global.currentFilter](data);
    }
  }
  
  return div;
}

// $.getJSON("NepalGeoJSONFiles/Constituency.geojson",function(data){
//   L.getJSON(data,{
//     style: function (feature) {
//       return {
//         color: 'black',
//         fillColor: 'red'
//       };
//     }
//   }).bindPopup(function(layer){
//     return layer.feature.properties.DISTRICT;
//   }).addTo(map);
// })

// L.getJSON(geojson).bindPopup(function(layer){
//       return layer.feature.properties.DISTRICT;
//     }).addTo(map);

var layer = new L.GeoJSON(Constitution, { style: style,
  onEachFeature: function (feature, layer) {
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          this.bindTooltip("some text");
      }
      layer.on('mouseover', function () {
      this.setStyle({
        'fillColor': '#015270',
        'color': '#015270',
        'opacity': 0.8,
        'weight': 2
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
      }

},

    layer.on('mouseout', function () {
      this.setStyle(style);
      this.bringToBack();
      }));

    layer.on('click', function () {
    window.location = feature.properties.url;
      });   
  }
}).addTo(map);