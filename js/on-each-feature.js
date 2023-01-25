import { openLayer } from "./open-layer.js";
export function onEachFeature(feature, layer) {
	const shopName = $("#shop_name");
	const { shop, shopCode, adress, url, nom, region, shops } =
		feature.properties;

	data.push(feature.geometry.type);

	data.filter((datas) => {
		if (datas === "Polygon" || datas === "Point" || datas === "MultiPolygon") {
			feature.properties.url ? shopMax.push(feature.properties) : shopMax;

			data.pop();
		}
	});

	shopMax.sort((a, b) => {
		return a.shopCode - b.shopCode;
	});

	// const b = dataMap.push(feature.geometry.type);
	// const filterData = dataMap.filter(datas => {
	//   return datas.type !== "Polygon" || datas.type !== "MultiPolygon"
	// })

	// console.log(filterData)
	var popupContent = `<h3>${nom}</h3>`;

	if (shopCode && shop) {
		data.push(shop);
		const shopLength = data.length;

		outputShops += `<option value="${url}">Greatwood ${shop}</option>
      `;
		$("#shop_name").html(outputShops);
	}
	if (feature.properties && feature.properties.popupContent) {
		popupContent += feature.properties.popupContent;
	}
	layer.on({
		click: openLayer
	});

	if (feature.geometry.type === "Point") {
		// const nameData = [
		// 	"Île-de-France",
		// 	"Bourgogne-Franche-Comté",
		// 	"Hauts-de-France"
		// ];
		console.log(layer);
		// for (var i = 0; i <= nameData.length; i++) {
		// 	feature.properties.region.includes(nameData[i])
		// 		? names.push(feature.properties.region)
		// 		: "";
		// }
		layer.off("click");
	} else {
		feature.properties.isActived === 1
			? console.log(feature.properties.nom)
			: "";
		feature.properties.isActived === 1
			? layer.bindPopup(
					`<div class="pink-color"><h3>${nom}</h3><p style="margin-top: -15px; font-size: 1.1em;">${
						shops <= 1 ? `${shops} Distributeur` : `${shops} Distributeurs`
					}</div>`,
					{
						closeButton: false,
						offset: L.point(30, -5)
					}
			  )
			: layer.off("click");
		layer.on("mouseover", function (e) {
			layer.openPopup();
			feature.properties.isActived === 1
				? layer.setStyle({
						fillColor: "#47b8e0"
				  })
				: "";
		});
		layer.on("mouseout", function (e) {
			layer.closePopup();
			feature.properties.isActived === 1
				? layer.setStyle({
						fillColor: e.target.feature.properties.fill
				  })
				: "";
		});
	}
}
