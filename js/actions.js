$(document).ready(function()
{

    $('#provinceSelect').on('change', function(e) {
        // console.log(Global.currentLayers)
        Global.districtSelected = null;
        focusProvince(e, e.target.value);
        setDistrictDropdown(e.target.value);

    });
    $('#districtSelect').on('change', function(e) {

        focusDistrict(e, e.target.value);
    });

    $('#palikaSelect').on('change', function(e) {
        Global.currentPalikaSelect = e.target.value;
        // focusDistrict(e, e.target.value);
        renderMap();
    });
    // $('#mayor_filter').on('change',function(e){
    //     applyMapfilter(e.target.value);
    // });
    // $('#vice_mayor_filter').on('change',function(e){
    //     applyMapfilter(e.target.value);
    // });
    $('#mayor_select').on('change',function(e){
        Global.currentFilter=$('#mayor_select').val()+"_"+$('#filter_select_1').val()
        applyMapfilter(Global.currentFilter);
    });

    $('#filter_select').click(function(){
        Global.currentFilter=$('#filter_select').val()
        applyMapfilter(Global.currentFilter);
    });

    // add
    $('.btn_filter_select').click(function(){
        // var mySVG = document.getElementByClassName('leaflet-zoom-animated');
        // alert(mySVG);
        // alert($(this).val())
        applyMapfilter($(this).val());
        
    // mySVG.setAttribute("scale", "1.5");
    // mySVG.setAttribute("viewBox", "0 0 100 100");
    });

    $('#filter_select_1').on('change',function(e){
        Global.currentFilter=$('#mayor_select').val()+"_"+$('#filter_select_1').val()
        applyMapfilter(Global.currentFilter);
    });

    $('#c_mayor_select').on('change',function(e){
        Global.currentFilter=$('#c_mayor_select').val()+"_"+$('#c_filter_select_1').val()
        applyMapfilter(Global.currentFilter);
    });
    $('#c_filter_select_1').on('change',function(e){
        Global.currentFilter=$('#c_mayor_select').val()+"_"+$('#c_filter_select_1').val()
        applyMapfilter(Global.currentFilter);
    });

    $('#filter_select_2').on('change',function(e){
        Global.currentFilter=$('#filter_select_2').val();
        applyMapfilter(Global.currentFilter);
    });

    $('#filter_select_2').click(function(){
        Global.currentFilter=$('#filter_select_2').val();
        applyMapfilter(Global.currentFilter);
    })


    $('#reset').on('click',function(){
        $('#filter_select').val("mayor_party");
        $('#mayor_select').val("mayor");
        $('#filter_select_1').val("party");

        $('#c_mayor_select').val("c_mayor");
        $('#c_filter_select_1').val("candidate");
        $('#provinceSelect').val("");
        $('#districtSelect').empty();
        $("#districtSelect").append(new Option("जिल्ला",""));
        $('#palikaSelect').val("");


        Global.districtSelected = null;
        Global.provinceSelected = null;

        Global.currentPalikaSelect = "All";
        Global.currentFilter= "mayor_party";
        resetGeoJsons();
        Global.boundLevel = "Country"
        applyMapfilter(Global.currentFilter);
    });
    $('.test').click(function(){
        console.log("ASD")
    })
    $('.summaryTitle').click(function(){
       if($('.accicon').hasClass('rotated')){
            $('.accicon').removeClass('rotated')
       } 
       else{
            $('.accicon').addClass('rotated')
       }
    })
});

function applyMapfilter(filter){
    // removeAllLayer();   
    resetMap();
    Global.map.closePopup();

    Global.currentFilter = filter;
    var lastLayer = Global.currentLayers[Global.currentLayers.length - 1];
    
    Global.currentLayers[Global.currentLayers.length - 1].style = Filters[filter][lastLayer.id];
    Global.currentFilterLegend =  Legends[filter];
    // Global.currentLayers[0].style = Filters[filter]["province"];
    Global.currentFilterLevel = lastLayer.id;
    // resetToKTM();

    renderMap();
}

function resetGeoJsons()
{
    Global.municipalityGeoJson=L.geoJson( GeoJsons.municipality, {
        onEachFeature: onEachMunicipalitiesFeature,
            style: function(feature){
            
                return { color: '#9c4228', weight: 0.3,  fillOpacity: 0 };
            }, 

    });
}

async function resetMap(evt) {
	// $('#provinceSelect').val("");
	// $('#districtCheck').prop('checked', true);
	// $('#municipalityCheck').prop('checked', true);
    // $('#wardCheck').prop('checked', true);

    Global.map.remove();
    Global.map = L.map('map', MapOptions);

    // Global.currentFilterLevel = "province";
    
    Global.currentLayers = [
        {
            geoJson: Global.provinceGeoJson,
            style: Filters.generalProvince,
            id:"province"
        },
        {
            geoJson: Global.districtGeoJson,
            style: Filters.generalDistrict,
            id:"district"
        },
        // {
        //     geoJson: await getGlobalMunicipalityGeoJson(),
        //     style: null,
        //     id:"municipality"
        // },
        {
            geoJson: Global.municipalityGeoJson,
            style: null,
            id:"municipality"
        },
    ];
    // Global.boundLevel = c;
    document.getElementById('map_info').style.visibility = 'hidden'; 
    // renderMap();
    $('.leaflet-control-attribution.leaflet-control').hide();
    Global.currentSummaryBody = {};


}

function getGlobalMunicipalityGeoJson(){
   return L.geoJson( GeoJsons.municipality, {
        onEachFeature: onEachMunicipalityFeature,
            style: function(feature){
                return { color: '#2296bd', weight: 0.3,  fillOpacity: 0 };
            }, 
        })
}

async function focusProvince(evt, provinceNumber) {
    resetMap();

    Global.provinceSelected=provinceNumber;
    Global.currentProvince = Global.Provinces.find(x => x.id == provinceNumber).data;

    // console.log(Global.currentProvince);
    Global.boundLevel = "Province";
    // if(Global.currentLayers.filter(x => x.id=="province").length > 0){
    //     Global.currentLayers.filter(x => x.id=="province")[0].geoJson = L.geoJson(GeoJsons.province, {
    //         style: null,
    //         filter: function(feature, layer) {
    //             // console.log(feature.properties.Province);
    //             return feature.properties.Province == provinceNumber;
    //         },			
    // });
    // }

    // data = await filterMunicipalityByProvince(GeoJsons.municipality, provinceNumber);
    // Global.municipalityGeoJson = L.geoJson(data, {
    //     style: null,		
    //     onEachFeature: onEachMunicipalitiesFeature,
    // });
    Global.currentLayers.filter(x => x.id=="municipality")[0].geoJson = Global.municipalityGeoJson
    Global.currentLayers.filter(x => x.id=="province")[0].style = Filters["generalProvince"];
    Global.currentLayers.filter(x => x.id=="district")[0].style = Filters["nullDistrict"];
    
    // console.log(Global.currentLayers);
    var lastLayer = Global.currentLayers[Global.currentLayers.length - 1].id;
    if(Global.currentFilter)
        Global.currentLayers[Global.currentLayers.length - 1].style=Filters[Global.currentFilter][lastLayer];

    // console.log(Global.currentFilterLevel)
    
    renderMap();
}
function onEachMunicipalitiesFeature(feature, layer) {
  
    layer.on({
      mouseover: highlightMunicipalityFeature,
      mouseout: resetMunicipalityHighlight,
    });
  
  }

async function focusDistrict(evt, id) {
    resetMap();

    Global.currentDistrict = Global.Districts.find(x => Data.fidCodeDistrict[x.id] == id).data;
    Global.districtSelected = id;
    Global.boundLevel = "District";
    // data = await filterMunicipalityByDistrict(GeoJsons.municipality, id);
    // Global.municipalityGeoJson = L.geoJson(data, {
    //     style: null,		
    //     onEachFeature: onEachMunicipalitiesFeature,
    // });
    Global.currentLayers.filter(x => x.id=="province")[0].style = Filters["nullProvince"];
    Global.currentLayers.filter(x => x.id=="district")[0].style = Filters["generalDistrict"];
    
  
    Global.currentLayers.filter(x => x.id=="municipality")[0].geoJson = Global.municipalityGeoJson
    var lastLayer = Global.currentLayers[Global.currentLayers.length - 1].id;
    if(Global.currentFilter)
        Global.currentLayers[Global.currentLayers.length - 1].style=Filters[Global.currentFilter][lastLayer];

    renderMap();
}

function filterGeoJsons(){

}

function filterMunicipalityByProvince(d, province){
    data = Object.assign({}, d); 
    data["features"] = data["features"].filter(function(d){
        if(NationalParksProvince[d.properties.OBJECTID_1]){
            if( NationalParksProvince[d.properties.OBJECTID_1] == province)
                return true;
            else
                return false;
        }
        return Data.fidCodeMap[d.properties.OBJECTID_1].toString().charAt(0) == province;
    })
    return data;
}

function filterMunicipalityByDistrict(d, district){
    data = Object.assign({}, d); 
    data["features"] = data["features"].filter(function(d){
        if(NationalParksDistrict[d.properties.OBJECTID_1]){
            if( NationalParksDistrict[d.properties.OBJECTID_1] == district)
                return true;
            else
                return false;
        }
        // if(NationalParks[d.properties.OBJECTID_1])
        //     return true
        return Data.fidCodeMap[d.properties.OBJECTID_1].toString().substring(0,3) == district;
    })
    return data;
}

function setDistrictDropdown(id){
    $('#districtSelect').empty();
    $('#districtSelect').append('<option value="" disabled selected>जिल्ला</option>');
    for (const [key, value] of Object.entries(Data.fidCodeDistrict)) {

        if( (parseInt(value) >= parseInt(id)*100) && (parseInt(value) < (parseInt(id)+1)*100)){
            $('#districtSelect').append(new Option(Data.districtNepaliName[value], value));

        }
    }
}

function getDistrictFromGeoJson(fid){
    // console.log(fid)
    return GeoJsons.district.features.filter(function(feature){
        return feature.properties.fid == fid
    })[0].properties.DISTRICT;
}

