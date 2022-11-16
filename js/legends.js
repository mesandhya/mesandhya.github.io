//Legends keys must be same as filter keys

var Legends = {
    population: L.control({position: 'bottomleft'}),
    density: L.control({position: 'bottomleft'}),
   
    mayor_name: L.control({position: 'bottomleft'}),
    mayor_party: L.control({position: 'bottomleft'}),
    mayor_age: L.control({position: 'bottomleft'}),
    mayor_gender: L.control({position: 'bottomleft'}),
    mayor_margin: L.control({position: 'bottomleft'}),
   
    vice_mayor_name: L.control({position: 'bottomleft'}),
    vice_mayor_party: L.control({position: 'bottomleft'}),
    vice_mayor_age: L.control({position: 'bottomleft'}),
    vice_mayor_gender: L.control({position: 'bottomleft'}),
    vice_mayor_margin: L.control({position: 'bottomleft'}),
    voters_count: L.control({position: 'bottomleft'}),

    c_mayor_candidate: L.control({position: 'bottomleft'}),
    c_mayor_age: L.control({position: 'bottomleft'}),
    c_mayor_gender: L.control({position: 'bottomleft'}),

    c_vice_mayor_candidate: L.control({position: 'bottomleft'}),
    c_vice_mayor_age: L.control({position: 'bottomleft'}),
    c_vice_mayor_gender: L.control({position: 'bottomleft'}),

    ward_president_candidate: L.control({position: 'bottomleft'}),
    ward_president_age: L.control({position: 'bottomleft'}),
    ward_president_gender: L.control({position: 'bottomleft'}),

    national_park: L.control({position: 'bottomleft'}),


}
Legends.national_park.onAdd = function (map) {
		
    var div = L.DomUtil.create('div', 'info legend'),
   
      labels = [''],

      categories = ["निकुञ्ज/"];
      div.innerHTML += labels;
      
      for (var i = 0; i < categories.length; i++) {
          div.innerHTML += '<i id="national_park_legend" style="background: #e2f7e1"></i> आरक्ष/निकुञ्ज';
      }
      
      return div;
};

Legends.population.onAdd = function (map) {
		
    var div = L.DomUtil.create('div', 'info legend'),
   
      labels = ['<strong>Population</strong>'],

      categories = [0, 2000000, 3000000, 4000000, 5000000, 6000000];
      div.innerHTML += '<p style="font-size:20px">';
      div.innerHTML += labels+ '<br>';
      
      for (var i = 0; i < categories.length; i++) {
          div.innerHTML += '<i style="background:' + getProvinceColor_population(categories[i]+1) + '"></i>' + categories[i].toLocaleString() + (categories[i + 1] ? '&ndash;' + categories[i + 1].toLocaleString() + '<br>' : '+');
      }
        div.innerHTML += '</p>';
      
      Global.mapLegend="population";
      return div;
};

Legends.density.onAdd = function (map) {
		
	  var div = L.DomUtil.create('div', 'info legend'),
	 
		labels = ['<strong>Population Density</strong>']+ '<br>';
        categories = [0, 100, 200, 300, 400, 500];
        div.innerHTML += '<p style="font-size:20px">';
        
		div.innerHTML += labels;
		for (var i = 0; i < categories.length; i++) {
				div.innerHTML += '<i style="background:' + getProvinceColor_popDensity(categories[i]+1) + '"></i>' + categories[i].toLocaleString() + (categories[i + 1] ? '&ndash;' + categories[i + 1].toLocaleString() + '<br>' : '+');
        }
        div.innerHTML += '</p>';
        
		Global.mapLegend="popDensity";
		return div;
};

Legends.mayor_name.onAdd = function (map) {
    Global.currentSummaryTitle = summaryText();

		
    return partyLegend();
};

Legends.mayor_party.onAdd = function (map) {
    Global.currentSummaryTitle = summaryText();

    return partyLegend();
};

Legends.mayor_gender.onAdd = function (map) {
    Global.currentSummaryTitle = summaryText();

    var div = L.DomUtil.create('div', 'info legend'),
   
    labels = ['<strong>लिङ्ग </strong>']+ '<br>';
    div.innerHTML += '<p style="font-size:20px">';

    div.innerHTML += labels;


    Object.keys(GenderColor).forEach(key => {
        var text = GenderColor[key].replace(/^\s+|\s+$/g,"").replace("#","");
        Global.currentLegendKeys.push(text);
        Global.currentSummaryBody[( key=="M" ? "पुरुस":"महिला")] = Summary[Global.currentFilter](key)
        div.innerHTML += '<div style="cursor:pointer" id="legend_option_'+text+'" onclick="legendClick(\''+text+'\')" ondblclick="legendDblClick(\''+text+'\')">'+'<i style="background:' + GenderColor[key] + '"></i>' +( key=="M" ? "पुरुस":"महिला") + "<br>" +"</div>" ;
    });
    div.innerHTML += '</p>';

    return div;
};

Legends.mayor_age.onAdd = function (map) {
    Global.currentSummaryTitle = summaryText();

    var div = L.DomUtil.create('div', 'info legend'),
   
    labels = ['<strong>उमेर समूह</strong>']+ '<br>';
    div.innerHTML += '<p style="font-size:20px">';

    div.innerHTML += labels;


    Object.keys(AgeBracketColor).forEach(key => {
        var text = AgeBracketColor[key].replace(/^\s+|\s+$/g,"").replace("#","");
            Global.currentLegendKeys.push(text); 
            Global.currentSummaryBody[toNepaliDigits(key)] = Summary[Global.currentFilter](key)
          div.innerHTML += '<div style="cursor:pointer" id="legend_option_'+text+'" onclick="legendClick(\''+text+'\')" ondblclick="legendDblClick(\''+text+'\')">'+'<i style="background:' + AgeBracketColor[key] + '"></i>' + key + "<br>"+"</div>";
    });
    div.innerHTML += '</p>';

    return div;
};

Legends.mayor_margin.onAdd = function (map) {
    Global.currentSummaryTitle = summaryText();

    var div = L.DomUtil.create('div', 'info legend'),
   
    labels = ['<strong>मतान्तर</strong>']+ '<br>';
    div.innerHTML += '<p style="font-size:20px">';
    div.innerHTML += labels;


    Object.keys(MarginColors).forEach(key => {
        var text = MarginColors[key].replace(/^\s+|\s+$/g,"").replace("#","");
        Global.currentLegendKeys.push(text); 
        Global.currentSummaryBody[toNepaliDigits(key)] = Summary[Global.currentFilter](key)
          div.innerHTML += '<div style="cursor:pointer" id="legend_option_'+text+'" onclick="legendClick(\''+text+'\')" ondblclick="legendDblClick(\''+text+'\')">'+'<i style="background:' + MarginColors[key] + '"></i>' + key + "<br>"+"</div>" ;
    });
    div.innerHTML += '</p>';


    return div;
};

Legends.vice_mayor_name.onAdd = function (map) {
    Global.currentSummaryTitle = summaryText();

    return partyLegend();
};

Legends.vice_mayor_party.onAdd = function (map) {
    Global.currentSummaryTitle = summaryText();
    return partyLegend();
};

Legends.vice_mayor_gender.onAdd = function (map) {
    Global.currentSummaryTitle = summaryText();

    var div = L.DomUtil.create('div', 'info legend'),
   
    labels = ['<strong>लिङ्ग </strong>']+ '<br>';
    div.innerHTML += '<p style="font-size:20px">';
    div.innerHTML += labels;


    Object.keys(GenderColor).forEach(key => {
        var text = GenderColor[key].replace(/^\s+|\s+$/g,"").replace("#","");
        Global.currentLegendKeys.push(text); 
        Global.currentSummaryBody[( key=="M" ? "पुरुस":"महिला")] = Summary[Global.currentFilter](key)
          div.innerHTML += '<div style="cursor:pointer" id="legend_option_'+text+'" onclick="legendClick(\''+text+'\')" ondblclick="legendDblClick(\''+text+'\')">'+'<i style="background:' + GenderColor[key] + '"></i>' +( key=="M" ? "पुरुस":"महिला") + "<br>"+"</div>" ;
    });
    div.innerHTML += '</p>';

    return div;
};

Legends.vice_mayor_age.onAdd = function (map) {
    Global.currentSummaryTitle = summaryText();

    var div = L.DomUtil.create('div', 'info legend'),
   
    labels = ['<strong>उमेर समूह</strong>']+ '<br>';
    div.innerHTML += '<p style="font-size:20px">';
    div.innerHTML += labels;

    Object.keys(AgeBracketColor).forEach(key => {
        var text = AgeBracketColor[key].replace(/^\s+|\s+$/g,"").replace("#","");
        Global.currentLegendKeys.push(text); 
        Global.currentSummaryBody[toNepaliDigits(key)] = Summary[Global.currentFilter](key)
          div.innerHTML += '<div style="cursor:pointer" id="legend_option_'+text+'" onclick="legendClick(\''+text+'\')" ondblclick="legendDblClick(\''+text+'\')">'+'<i style="background:' + AgeBracketColor[key] + '"></i>' + key + "<br>" +"</div>";
    });
    div.innerHTML += '</p>';

    return div;
};

Legends.vice_mayor_margin.onAdd = function (map) {
    Global.currentSummaryTitle = summaryText();

    var div = L.DomUtil.create('div', 'info legend');
   
    labels = ['<strong>मतान्तर</strong>']+ '<br>';
    div.innerHTML += '<p style="font-size:20px">';
    div.innerHTML += labels;
    Object.keys(MarginColors).forEach(key => {
            var text = MarginColors[key].replace(/^\s+|\s+$/g,"").replace("#","");
            Global.currentLegendKeys.push(text); 
            Global.currentSummaryBody[toNepaliDigits(key)] = Summary[Global.currentFilter](key)
          div.innerHTML += '<div style="cursor:pointer" id="legend_option_'+text+'" onclick="legendClick(\''+text+'\')" ondblclick="legendDblClick(\''+text+'\')">'+'<i style="background:' + MarginColors[key] + '"></i>' + key + "<br>"+"</div>" ;
    });
    div.innerHTML += "</p>";

    return div;
};

Legends.voters_count.onAdd = function (map) {
    Global.currentSummaryTitle = votersSummaryText();
    Global.currentSummaryBody = [];
    Global.currentSummaryBody["जम्मा संख्या"] = Summary["voters_count"]();
    var div = L.DomUtil.create('div', 'info legend'),
   
    labels = ['<span style="font-size:18px"> <strong>मतदाता</strong> </span>']+ '<br>';
    div.innerHTML += labels;

    Object.keys(VoterCountColors).forEach(key => {
            var text = VoterCountColors[key].replace(/^\s+|\s+$/g,"").replace("#","");
            Global.currentLegendKeys.push(text); 
          div.innerHTML += '<div style="cursor:pointer" id="legend_option_'+text+'" onclick="legendClick(\''+text+'\')" ondblclick="legendDblClick(\''+text+'\')">'+'<i style="opacity:1;background:' + VoterCountColors[key] + '"></i>' + '<span style="font-size:18px">'+key+"</span>" + "<br>" +"</div>";
    });
    // div.innerHTML += '<i style="background:' + VoterCountColors[key] + '"></i>' + '<span style="font-size:18px">'+key+"</span>" + "<br>" ;


    return div;
};

Legends.c_mayor_candidate.onAdd = function (map) {
    return getCandidateLegend("उम्मेदवारी संख्या", CandidateColors);
};

Legends.c_mayor_age.onAdd = function (map) {
    return getCandidateLegend("युवा उम्मेदवार संख्या", AgeCandidateColors);
};

Legends.c_mayor_gender.onAdd = function (map) {
    return getCandidateLegend("महिला उम्मेदवार संख्या", GenderCandidateColors);
};


Legends.c_vice_mayor_candidate.onAdd = function (map) {
    return getCandidateLegend("उम्मेदवारी संख्या", CandidateColors);
};

Legends.c_vice_mayor_age.onAdd = function (map) {
    return getCandidateLegend("युवा उम्मेदवार संख्या", AgeCandidateColors);
};

Legends.c_vice_mayor_gender.onAdd = function (map) {
    return getCandidateLegend("महिला उम्मेदवार संख्या", GenderCandidateColors);
};


Legends.ward_president_candidate.onAdd = function (map) {
    return getCandidateLegend("उम्मेदवारी संख्या", WardCandidateColors);
};

Legends.ward_president_age.onAdd = function (map) {
    return getCandidateLegend("युवा उम्मेदवार संख्या", AgeCandidateColors);
};

Legends.ward_president_gender.onAdd = function (map) {
    return getCandidateLegend("महिला उम्मेदवार संख्या", GenderCandidateColors);
};


function getCandidateLegend(label, Colors){
    Global.currentSummaryTitle = candidateSummaryText();
    var div = L.DomUtil.create('div', 'info legend'),
   
    labels = ['<span style="font-size:18px"> <strong>'+label+'</strong> </span>']+ '<br>';
    div.innerHTML += labels;

    Object.keys(Colors).forEach(key => {
            var text = Colors[key].replace(/^\s+|\s+$/g,"").replace("#","");
            Global.currentLegendKeys.push(text); 
            Global.currentSummaryBody[toNepaliDigits(key)] = Summary[Global.currentFilter](key)
          div.innerHTML += '<div style="cursor:pointer" id="legend_option_'+text+'" onclick="legendClick(\''+text+'\')" ondblclick="legendDblClick(\''+text+'\')">'+'<i style="opacity:1;background:' + Colors[key] + '"></i>' + '<span style="font-size:18px">'+key+"</span>" + "<br>" +"</div>";
    });
    // div.innerHTML += '<i style="background:' + VoterCountColors[key] + '"></i>' + '<span style="font-size:18px">'+key+"</span>" + "<br>" ;
    return div;
}

function partyLegend(){
    var div = L.DomUtil.create('div', 'info legend'),
   
    labels = ['<strong>राजनीतिक दल</strong>']+ '<br>';
    div.innerHTML += '<p style="font-size:20px">';
    div.innerHTML += labels;
    partyColors = [];
    partyCodes = [];
    Object.keys(Data.Parties).forEach(key=>{
        if(Data.Parties[key].color_code != "#D4E2F8"){
            partyColors[Data.Parties[key].color_code] = Data.Parties[key].party_nepali_name;
            Global.currentSummaryBody[Data.Parties[key].party_nepali_name] = Summary[Global.currentFilter](key)
        }
    })
    partyColors["#D4E2F8"] = "अन्य";
    Global.currentSummaryBody["अन्य"] = Summary[Global.currentFilter]("others");


    Object.keys(partyColors).forEach(key => {
        var text = key.replace(/^\s+|\s+$/g,"").replace("#","");
        Global.currentLegendKeys.push(text); 

        div.innerHTML += '<div style="cursor:pointer" id="legend_option_'+text+'" onclick="legendClick(\''+text+'\')" ondblclick="legendDblClick(\''+text+'\')">'+'<i class="test" style="background:' + key + '"></i>' + partyColors[key]+ "<br>"+'</div>';
        
    });
    div.innerHTML += '</p>';

    // console.log(Global.currentSummaryBody)
  //   for (var i = 0; i < partyColors.length; i++) {
  //         div.innerHTML += '<i style="background:' + partyColors + '"></i>' + ;
  //   }
  return div;
}

function legendClick(key){
    var total =  $('[id*="legend_option_"]').length;
    var black = $('[id*="legend_option_"]').filter(function(){
        return $(this).css('opacity') == "1";
    }).length;
    if(total == black){
        Global.currentLegendKeys.forEach(function(k){
            var index = Global.currentLegendKeys.indexOf(k);//get  "car" index
            $('#legend_option_'+k).css("color","grey");
            $('#legend_option_'+k).css("opacity","0.5");
        })
        Global.currentLegendKeys = [];
      
        Global.currentLegendKeys.push(key);
        $('#legend_option_'+key).css("color","black");
        $('#legend_option_'+key).css("opacity","1");
    }
    else{
        if(Global.currentLegendKeys.includes(key)){
            var index = Global.currentLegendKeys.indexOf(key);//get  "car" index
            Global.currentLegendKeys.splice(index,1);
            $('#legend_option_'+key).css("color","grey");
            $('#legend_option_'+key).css("opacity","0.5");
        }
        else{
            Global.currentLegendKeys.push(key);
            $('#legend_option_'+key).css("color","black");
            $('#legend_option_'+key).css("opacity","1");
        }
    }
    renderLayer();
}



function legendDblClick(key){
    Global.currentLegendKeys.forEach(function(k){
        var index = Global.currentLegendKeys.indexOf(k);//get  "car" index
        $('#legend_option_'+k).css("color","grey");
        $('#legend_option_'+k).css("opacity","0.5");
    })
    Global.currentLegendKeys = [];
  
    Global.currentLegendKeys.push(key);
    $('#legend_option_'+key).css("color","black");
    $('#legend_option_'+key).css("opacity","1");
    renderLayer();
}