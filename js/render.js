//Render methods

function renderMap(){
    // resetStyle();
    // removeAllLayer();

    renderLegend();
    renderSummary();
    renderLayer();
    fitBounds();
    highlightSelect();
    // renderConstituencyNames();
    renderDistrictNames();

}

function fitBounds()
{
    if(Global.boundLevel == "Country")
        Global.map.fitBounds(Global.provinceGeoJson.getBounds());
    else if(Global.boundLevel == "Province")
        Global.map.fitBounds(Global.currentProvince.getBounds());
    else if(Global.boundLevel == "District")
        Global.map.fitBounds(Global.currentDistrict.getBounds());
}

// function resetStyle()
// {
//     Global.currentLayers.forEach(function(layer){
//         console.log(layer.geoJson)
//         if(layer.style)
//             layer.geoJson.resetStyle(layer.geoJson);
//         layer.geoJson.addTo(Global.map);
        
//     }); 
// }
// function removeAllLayer()
// {
//     // Global.map.eachLayer(function (layer) {
//     //     // Global.map.removeLayer(layer);
//     //     Global.map.remove(layer);
//     //     // layer.remove(Global.map);

//     // });   
//     Global.map.remove();
//     Global.map = L.map('map', {
//         center: [28.3, 84.4],
//         zoom: 7
//     });
// }


function removeAllLayer()
{
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
        {
            geoJson: Global.municipalityGeoJson,
            style: null,
            id:"municipality"
        },
    ];
}

function renderLayer()
{
    Global.currentLayers.forEach(function(layer){
        if(layer.style)
            layer.geoJson.setStyle(layer.style);
        layer.geoJson.addTo(Global.map);

    }); 
}

function renderSummary(){
    
    $('#summaryTitle').html(Global.currentSummaryTitle);
    var div ="";
    if(Global.currentSummaryBody){
        Object.entries(Global.currentSummaryBody).forEach(
            ([key, value]) => {
                div+="<p>" + key + " : " + value;
            }
        );
        $('#summaryBody').html(div);
    }

    if(Global.currentFilter != "voters_count"){
        $('.summary_div>.card').attr("hidden", "true")
    }
    else{
        $('.summary_div>.card').removeAttr("hidden")

    }

}

// function renderConstituencyNames(){

//     GeoJsons.municipality.features.forEach(function(d){
//         var constCode = Data.fidCodeMap[d.properties.OBJECTID_1]
//         console.log(d.properties.OBJECTID_1)
//         var constuency = Data.ConstituencyNames[constCode]
//         var default_center = [  81.46982838917172, 29.271845521328405]
//         if(constuency){
//             centroid = getCenterPoint(d.geometry.coordinates[0])
//             console.log(d, centroid)
//             baseFont = 8;
//             if(Global.boundLevel == "Province")
//                 baseFont = 14;
//             else if(Global.boundLevel == "District")
//                 baseFont = 18;
//             if(isNaN(centroid[1]) || isNaN(centroid[0]) )
//             {
//                 centroid = default_center
//             }
//             L.marker([centroid[1]+constuency.Y , centroid[0]+constuency.X], {
//                 icon: L.divIcon({
//                     html: '<span style="font-size:'+(baseFont+parseInt(constuency.Font_size) )+'px;">'+constuency.Constituency+'</span>'
//                 }),
//                 opacity: 1,
//                 zIndexOffset: 10000     // Make appear above other map features
//             }).addTo(Global.map);
//         }
       
//     })
    
// }


function renderDistrictNames(){

    GeoJsons.district.features.forEach(function(d){
        var Lcode = Data.fidCodeDistrict[d.properties.fid]
        var districtname = Data.DistrictNames[Lcode]
        console.log(districtname)

        var default_center = [  81.46982838917172, 29.271845521328405]
        if(districtname){
            centroid = getCenterPoint(d.geometry.coordinates[0])
            console.log(d, centroid)
            baseFont = 10;
            if(Global.boundLevel == "Province")
                baseFont = 14;
            else if(Global.boundLevel == "District")
                baseFont = 18;
            if(isNaN(centroid[1]) || isNaN(centroid[0]) )
            {
                centroid = default_center
            }
            L.marker([centroid[1]+parseFloat(districtname.Y) , centroid[0]+parseFloat(districtname.X)], {
                icon: L.divIcon({
                    html: '<span style="font-weight:500; font-size:'+(baseFont+parseInt(districtname.Font_size) )+'px;">'+districtname.District+'</span>'
                }),
                opacity: 1,
                zIndexOffset: 10000     // Make appear above other map features
            }).addTo(Global.map);
        }
       
    })
    
}

function getCenterPoint(arr)
{

    var minX, maxX, minY, maxY;
    for (var i = 0; i < arr.length; i++)
    {
        minX = (arr[i][0] < minX || minX == null) ? arr[i][0] : minX;
        maxX = (arr[i][0] > maxX || maxX == null) ? arr[i][0] : maxX;
        minY = (arr[i][1] < minY || minY == null) ? arr[i][1] : minY;
        maxY = (arr[i][1] > maxY || maxY == null) ? arr[i][1] : maxY;
    }
    return [(minX + maxX) / 2, (minY + maxY) / 2];
}

function renderLegend()
{
    Global.currentLegendKeys = [];
    Legends.national_park.addTo(Global.map);
    $('#national_park_legend').parent().css('box-shadow',"none");

    if(Global.oldFilterLegend){
        Global.oldFilterLegend.remove(Global.map);
    }
    if(Global.currentFilterLegend){
        Global.currentFilterLegend.addTo(Global.map);
        Global.oldFilterLegend = Global.currentFilterLegend;

    }

}

function highlightSelect()
{
    if(Global.districtSelected){
        $('#districtSelect').parent().css("background-color","#f5c775");
    }
    else{
        $('#districtSelect').parent().css("background-color","#F5F5F5");
    }

    if(Global.provinceSelected){
        $('#provinceSelect').parent().css("background-color","#f5c775");
    }
    else{
        $('#provinceSelect').parent().css("background-color","#F5F5F5");
    }

    if(Global.currentPalikaSelect != "All"){
        $('#palikaSelect').parent().css("background-color","#f5c775");
    }
    else{
        $('#palikaSelect').parent().css("background-color","#F5F5F5");
    }

    if(Global.currentFilter == "voters_count"){
        $('#filter_select_2').parent().css("background-color","#f5c775");

        $('#c_mayor_select').parent().css("background-color","#F5F5F5");
        $('#c_filter_select_1').parent().css("background-color","#F5F5F5");
    }
    else{
        $('#filter_select_2').parent().css("background-color","#F5F5F5");
        $('#c_mayor_select').parent().css("background-color","#f5c775");
        $('#c_filter_select_1').parent().css("background-color","#f5c775");
    }
}