import { map } from "./basemaps.js";
import { counties } from "./counties.js";
import { onEachFeature } from "./on-each-feature.js";

//Style of layer
function style(feature) {
	return {
		fillColor: feature.properties.isActived === 1 ? "#FF6B6B" : "#ffadad",
		weight: 3,
		color: "#fff",
		fill: "black",
		dashArray: "2",
		fillOpacity: 1,
		strokeOpacity: 1
	};
}

export var kyCounties = L.geoJSON(counties.responseJSON, {
	filter: function (feature, layer) {
		if (feature.properties) {
			// If the property "underConstruction" exists and is true, return false (don't render features under construction)
			// console.log(feature.properties.shopCode);
			return feature.properties.underConstruction !== undefined
				? !feature.properties.underConstruction
				: true;
		}
		return false;
	},

	style: style,
	pointToLayer: function (feature, latlng) {
		return new L.CircleMarker(
			latlng,
			{
				radius: 4,
				fillColor: "red",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.5
			},
			{ draggable: false }
		);
	},
	onEachFeature: onEachFeature
}).addTo(map);
