var provincePopulation = [
	  [1, 4972021,190],
	  [2, 6126288,630],
	  [3, 6084042,300],
	  [4, 2479745,120],
	  [5, 5124225,230],
	  [6, 1694889,61],
	  [7, 2711270,140]
	];

	// Legend

var mapLegend="none";

var legend_population = L.control({position: 'bottomleft'});
	
	
legend_population.onAdd = function (map) {
		
	  var div = L.DomUtil.create('div', 'info legend'),
	 
		labels = ['<strong>Population</strong>'],
		categories = [0, 2000000, 3000000, 4000000, 5000000, 6000000];
		div.innerHTML += labels+ '<br>';
		
		for (var i = 0; i < categories.length; i++) {
			div.innerHTML += '<i style="background:' + getProvinceColor_population(categories[i]+1) + '"></i>' + categories[i].toLocaleString() + (categories[i + 1] ? '&ndash;' + categories[i + 1].toLocaleString() + '<br>' : '+');

		
		
        }
		
		mapLegend="population";
		return div;
};

var legend_popDensity = L.control({position: 'bottomleft'});
	
	
legend_popDensity.onAdd = function (map) {
		
	  var div = L.DomUtil.create('div', 'info legend'),
	 
		labels = ['<strong>Population Density</strong>']+ '<br>';
		categories = [0, 100, 200, 300, 400, 500];
		div.innerHTML += labels;
		for (var i = 0; i < categories.length; i++) {
				div.innerHTML += '<i style="background:' + getProvinceColor_popDensity(categories[i]+1) + '"></i>' + categories[i].toLocaleString() + (categories[i + 1] ? '&ndash;' + categories[i + 1].toLocaleString() + '<br>' : '+');
		}
		mapLegend="popDensity";
		return div;
};


// Creates an info box on the map
var info = L.control();
info.onAdd = function (map) {

   var div = L.DomUtil.create('div', 'info');
  div.innerHTML = '<h4>Connecticut Town<br />Population density 2010</h4>' ;
  
  return div;
};

	
function startMap() {
	
	
	$('#districtCheck').prop('checked', true);
	$('#municipalityCheck').prop('checked', true);
	$('#wardCheck').prop('checked', true);
		 

	
	}
	
function resetMap(evt) {
	
	map.eachLayer(function (layer) {
        map.removeLayer(layer);
		});
	$('#provinceSelect').val("");
		
	
	$('#districtCheck').prop('checked', true);
	$('#municipalityCheck').prop('checked', true);
	$('#wardCheck').prop('checked', true);
		 
		 
	provinceGeoJson.addTo(map);
	districtGeoJson.addTo(map);
	municipalityGeoJson.addTo(map);
	// wardGeoJson.addTo(map);
	map.fitBounds(provinceGeoJson.getBounds());
	document.getElementById('map_info').style.visibility = 'hidden'; 

	
	}
	
	
function dropdownFilters() {
	
      var categoriesList = document.getElementById("categories_container");
  
      //       if (categoriesList.style.display == "block") {
      //           categoriesList.style.display = "none";
      //       } else {
      //           categoriesList.style.display = "block";
      //       }
      //   }
      //   window.onclick = function (event) {
			// 	if (!event.target.matches('.categories_dropdown')) {
			// 			document.getElementById('categories_container')
			// 			categoriesList.style.display = "none";
			// 	}
	}    
		
		
		
function applyMapfilter(mapfilterCategory){
	
	map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
	
	
	// if (mapLegend=="population"){
	// 	legend_population.removeFrom(map);	
	// }
	
	// else if (mapLegend=="popDensity"){
	// 	legend_popDensity.removeFrom(map);	
	// }
	
	provinceGeoJson.addTo(map);
	map.fitBounds(provinceGeoJson.getBounds());
	
	if (mapfilterCategory=="Population"){
	provinceGeoJson.setStyle(change_ProvinceStyle_population);
	legend_population.addTo(map);
	}
	
	if (mapfilterCategory=="PopDensity"){
	provinceGeoJson.setStyle(change_ProvinceStyle_popDensity);
	legend_popDensity.addTo(map);
	}
	
	
	
}
		
function ProvinceStyle(feature) {
  return {
    weight: 1.2,
    opacity: 1,
    color: "#333",
    dashArray: "1",
    fillOpacity: 0.8,
    fillColor: getProvinceColor(feature.properties.Province)
  };
}
		


function getProvinceColor(Province) {
    return Province == 1 ? '#cb758e' :
           Province == 2 ? '#31b061' :
           Province == 3 ? '#f6a357' :
           Province == 4 ? 'lightblue' :
           Province == 5 ? 'lightgreen' :
           Province == 6 ? '#51c2d0' :
           Province == 7 ? '#0b8461' :
                      '#FFEDA0';
}



function change_ProvinceStyle_population(feature) {
	
	var Province_population= provincePopulation[feature.properties.Province-1][1];
  return {
	weight: 1.2,
    opacity: 1,
    color: "#333",
    dashArray: "1",
    fillOpacity: 0.8,
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









function change_ProvinceStyle_popDensity(feature) {
  return {
	weight: 1.2,
    opacity: 1,
    color: "#333",
    dashArray: "1",
    fillOpacity: 0.8,
    fillColor: getProvinceColor_popDensity(provincePopulation[feature.properties.Province-1][2])
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

function addPopupToProvince(data, map) {}
	
	


function addProvinceToMap(data, map) {

	provinceGeoJson = L.geoJson(data,
				{ 
					style: ProvinceStyle, 
					onEachFeature: onEachProvinceFeature 
				}
			);
	provinceGeoJson.addTo(map);
	map.fitBounds(provinceGeoJson.getBounds());
	var provinces = [];
	data.features.forEach(element => {
		var d =  {"id":element.properties.Province, "data":L.geoJson(data, {
					style: ProvinceStyle,
					filter: function(feature, layer) {
						return feature.properties.Province == element.properties.Province;
				},			
		})}
			provinces.push(d);
	});
	return provinces;
}

function addDistrictToMap(data, map){
	districtGeoJson=L.geoJson( data, {
		onEachFeature: onEachDistrictFeature,
			style: function(feature){
			
				return { color: '#9c4228', weight: 0.3,  fillOpacity: 0 };
			}, 

		}).addTo(map);
		map.fitBounds(districtGeoJson.getBounds());
		var districts = [];
		data.features.forEach(element => {
			var d =  {"id":element.id, "data":L.geoJson(data, {
						// style: ProvinceStyle,
						filter: function(feature, layer) {
							return feature.id == element.id;
					},			
			})}
			districts.push(d);
	});
	return districts;
}

function addMunicipalitiesToMap(data, map){
	municipalityGeoJson=L.geoJson( data, {
		onEachFeature: onEachDistrictFeature,
			style: function(feature){
			
				return { color: '#9c4228', weight: 0.3,  fillOpacity: 0 };
			}, 

		}).addTo(map);
		map.fitBounds(municipalityGeoJson.getBounds());
		var municipalities = [];
		data.features.forEach(element => {
			var d =  {"id":element.id, "data":L.geoJson(data, {
						// style: ProvinceStyle,
						filter: function(feature, layer) {
							return feature.id == element.id;
					},			
			})}
			districts.push(d);
	});
	return districts;
}






function zoomToProvince(e) {
	
	
    province_number = e.target.feature.properties.Province;
	
	map.fitBounds(e.target.getBounds());
  
}

function selectMapLevel() {
	
	
	
	map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
	
	provinceGeoJson.addTo(map);
	
	var districtCheckBox = document.getElementById("districtCheck");
	
	var municipalityCheckBox = document.getElementById("municipalityCheck");
	var wardCheckBox = document.getElementById("wardCheck");
	
	
	
	if (districtCheckBox.checked == true){
		
		districtGeoJson.addTo(map);
	  } 
	  
	if (municipalityCheckBox.checked == true){
		
	   municipalityGeoJson.addTo(map);
	  }
	
	if(wardCheckBox.checked == true){
		
	  wardGeoJson.addTo(map);
	  }
	
  }
	





function addProvinceToSelect(data){
	data.features.forEach(element => {
		var province_name = element.properties.PR_NAME;
		var province_id = element.properties.Province;

		// var option = '<option value="'+element.properties.PR_NAME+'" >'+element.properties.PR_NAME+'</option>';
		// $('#provinceSelect').append(option);
		$('#provinceSelect').append($('<option>', {
				value: province_id,
				text: province_name
		}));
	});
}

