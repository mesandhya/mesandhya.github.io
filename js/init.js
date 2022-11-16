// This file consists of all the initializations, 
// init() method is called at the beginning. 
init();
async function init()
{
    initMap();
    await initGeoJsons();
    await initData();
    $('#map').removeAttr("hidden");
    $("#loading").hide();
    Global.currentLayers = [
        {
            geoJson: Global.provinceGeoJson,
            style: null,
            id:"province"
        },
        {
            geoJson: Global.districtGeoJson,
            style: null,
            id:"district"
        },
        // {
        //     geoJson: await getGlobalMunicipalityGeoJson(),
        //     style: Filters.generalMunicipality,
        //     id:"municipality"
        // },
        {
            geoJson: Global.municipalityGeoJson,
            style: null,
            id:"municipality"
        },
        
    ];
    // Global.map.on('click', onMapClick);
    resetMap();
    resetGeoJsons();
    applyMapfilter('mayor_party');
    renderMap();
    $('.leaflet-control-attribution.leaflet-control').hide();
   
    // resetToKTM();
}

function initMap()
{
    Global.map = L.map('map', MapOptions);
}

async function initGeoJsons()
{
    await $.getJSON("NepalGeoJSONFiles/newdistricts.json",function(data){
        GeoJsons.district = data;
        Global.districtGeoJson=L.geoJson( data, {
            onEachFeature: onEachDistrictFeature,
                style: function(feature){
                    return { color: '#000', weight: 0.3,  fillOpacity: 0 };
                }, 
            });
        // Global.allDistrictGeoJson=L.geoJson( data, {
        //     onEachFeature: onEachDistrictFeature,
        //         style: function(feature){
        //             return { color: '#666', weight: 0.3,  fillOpacity: 0 };
        //         }, 
        //     });
        Global.Districts = addDistrictToMap(data, Global.map);
        // addDistrictToSelect(data);
    });
  
    await $.getJSON("NepalGeoJSONFiles/Constituency.geojson",function(data){
        GeoJsons.municipality = data;
        Global.municipalityGeoJson=L.geoJson( data, {
            onEachFeature: onEachMunicipalityFeature,
                style: function(feature){
                    return { color: '#2296bd', weight: 0.3,  fillOpacity: 0 };
                }, 
            })
        Global.allMunicipalityGeoJson=L.geoJson( data, {
            onEachFeature: onEachMunicipalityFeature,
                style: function(feature){
                    return { color: '#2296bd', weight: 0.3,  fillOpacity: 0 };
                }, 
            })
    });

    await $.getJSON("NepalGeoJSONFiles/newprovince.json", function(data) {
        GeoJsons.province = data;
        Global.Provinces = addProvinceToMap(data, Global.map);
        addProvinceToSelect(data);

    });
}

async function initData(){
    await $.getJSON("json/newparties.json",function(data){
        data.forEach(function(d){
            Data.PartiesById[d.party_id] = d;
            Data.Parties[d.party_code] = d;
        });
    });

    await $.getJSON("json/constituency_page_link.json",function(data){
        data.forEach(function(d){
            Data.PhotoLinkPage[d.ConstCode] = d;
        });
    });

    await $.ajax("csv/federal_candidate.csv", {
        success: function(data) {
            data = $.csv.toObjects(data);
           data.forEach(function(d){
                Data.Mayors[d.ConstCode] = d;
            });
        },
        error: function() {
            alert("error")
        }
    });

    await $.ajax("csv/ConstituencyLinks.csv", {
        success: function(data) {
            data = $.csv.toObjects(data);
           data.forEach(function(d){
                Data.ConstituencyNames[d.ConstCode] = d;
            });
        },
        error: function() {
            alert("error")
        }
    });

    await $.ajax("csv/lcodedistrictmap1.csv", {
        success: function(data) {
            data = $.csv.toObjects(data);
           data.forEach(function(d){
                Data.DistrictNames[d.Lcode] = d;
            });
        },
        error: function() {
            alert("error")
        }
    });
 
    await $.getJSON("json/objectid_constcode.json",function(data){
        data.forEach(function(d){
            Data.fidCodeMap[d.OBJECTID_1] = d.ConstCode;
        });
    });
    

    await $.getJSON("json/fidcodedistrict.json",function(data){
        data.forEach(function(d){
            Data.fidCodeDistrict[d.fid] = d.Lcode;
        });
    });

    await $.getJSON("json/districtnepaliname.json",function(data){
        data.forEach(function(d){
            Data.districtNepaliName[d.Lcode] = d.D_np;
        });
    });

    await $.ajax("csv/lcodemap.csv", {
        success: function(data) {
            data = $.csv.toObjects(data);
           data.forEach(function(d){
                Data.Municipalities[d.lcode] = d.municipality;
            });
        },
        error: function() {
            alert("error")
        }
    });

    await $.ajax("csv/lcodedistrictmap.csv", {
        success: function(data) {
            data = $.csv.toObjects(data);
           data.forEach(function(d){
                Data.Districts[d.Lcode] = d.D_np;
            });
        },
        error: function() {
            alert("error")
        }
    });
    
}


function addProvinceToMap(data, map) {

	Global.provinceGeoJson = L.geoJson(data,
				{ 
					style: Filters.generalProvince, 
					onEachFeature: onEachProvinceFeature 
				}
            );
	var provinces = [];
	data.features.forEach(element => {
		var d =  {"id":element.properties.Province, "data":L.geoJson(data, {
					style: null,
					filter: function(feature, layer) {
						return feature.properties.Province == element.properties.Province;
				},			
		})}
			provinces.push(d);
	});
	return provinces;
}

function addProvinceToSelect(data){
	data.features.forEach(element => {
		var province_name = element.properties.PR_NAME;
		var province_id = element.properties.Province;

		// var option = '<option value="'+element.properties.PR_NAME+'" >'+element.properties.PR_NAME+'</option>';
		// $('#provinceSelect').append(option);
		$('#provinceSelect').append($('<option>', {
				value: province_id,
				text: ProvinceNepaliName[province_id]
		}));
	});
}

function addDistrictToMap(data, map){
	Global.districtGeoJson=L.geoJson( data, {
		onEachFeature: onEachDistrictFeature,
			style: function(feature){
			
				return { color: '#00000000', weight: 0.3,  fillOpacity: 0 };
			}, 

		}).addTo(map);
		map.fitBounds(Global.districtGeoJson.getBounds());
		var districts = [];
		data.features.forEach(element => {
			var d =  {"id":element.properties.fid, "data":L.geoJson(data, {
						style: Filters.generalProvince,
						filter: function(feature, layer) {
							return feature.properties.fid == element.properties.fid;
					},			
			})}
			districts.push(d);
	});
	return districts;
}

function addDistrictToSelect(data){
	data.features.forEach(element => {
		var district = element.properties.DISTRICT;
		var district_id = element.id;
		// var option = '<option value="'+element.properties.PR_NAME+'" >'+element.properties.PR_NAME+'</option>';
		// $('#provinceSelect').append(option);
		$('#districtSelect').append($('<option>', {
			value: district_id,
			text: district
	}));
	});
}

function addMunicipalitiesToMap(data, map){
	Global.municipalityGeoJson=L.geoJson( data, {
		onEachFeature: onEachMunicipalitiesFeature,
			style: function(feature){
			
				return { color: '#9c4228', weight: 0.3,  fillOpacity: 0 };
			}, 

		}).addTo(map);
		map.fitBounds(Global.municipalityGeoJson.getBounds());
		var municipalities = [];
		data.features.forEach(element => {
			var d =  {"id":element.id, "data":L.geoJson(data, {
						style: Filters.generalProvince,
						filter: function(feature, layer) {
							return feature.id == element.id;
					},			
			})}
			districts.push(d);
	});
	return districts;
}

function onEachProvinceFeature(feature, layer) {
  if(Global.currentFilterLevel == "province")
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToProvince
    });
    
}

function onEachDistrictFeature(feature, layer) {
    if(Global.currentFilterLevel == "district")
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToProvince
        });
    
}

function onEachMunicipalityFeature(feature, layer) {
    if(Global.currentFilterLevel == "municipality")
        layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToProvince
        });
    
}
  
function onMapClick(e) {
    // alert("hello");
    //     Global.popup.setContent("You clicked me " )
    //         .openOn(Global.map);
}

function zoomToProvince(e) {
	
	
    province_number = e.target.feature.properties.Province;
	
	map.fitBounds(e.target.getBounds());
  
}

function resetToKTM(){
    Global.currentLayers[2].geoJson.eachLayer(function (layer) {

        // Mimick event object because highlightFeature and resetHighlight
        // expect an object with the layer as target property
        layer = {'target': layer};

        if(layer.target.feature.properties.OBJECTID_1 == 295)
            highlightMunicipalityFeature(layer);
    
        // Up the delay amount
    });
}