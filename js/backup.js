var legend = L.control({position: 'bottomright'});
	legend.onAdd = function (map) {
		alert("hey");
	  var div = L.DomUtil.create('div', 'info legend'),
	 
		
		labels = ['<strong>Population</strong>'],
		categories = ['A','B','C','D','E'];
		
		
		from, to;
		 for (var i = 0; i < 5; i++) {
alert("hey2");
				div.innerHTML += 
				labels.push(
					'<i  style="background:' + getColor(categories[i]) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));

			}
			div.innerHTML = labels.join('<br>');
			 
		return div;
};



	function resetMap(evt) {
	
	
	map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
	
	provinceGeoJson.addTo(map);
	map.fitBounds(provinceGeoJson.getBounds());
	document.getElementById('map_info').style.visibility = 'hidden'; 
	
	}