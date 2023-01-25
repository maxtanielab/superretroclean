import { kyCounties } from "./ky-counties.js";
let layerActived = false,
	dataItems = [],
	deptsData = [],
	newData = [],
	selectData = [],
	nums = [],
	countLayer = 0;

const urlDepartments =
	"https://raw.githubusercontent.com/GreatwoodSRG/superretro/master/departements.geojson";
export function openLayer(e) {
	// alert(this._leaflet_id)
	layerActived = true;
	var layers = e.target;
	console.log(`SECOND LAYER ${layers}`);
	// console.log(layers)
	var output = "";
	var outputsData = "";
	$(".controls").css({
		opacity: 1
	});

	$(".controls").click(() => {
		return onEachFeature();
	});

	// Return 1 specific data onclick marker
	dataItems.filter((data, index) => {
		const shopCodeShort = data.shopCode;
		let newShop = shopCodeShort.toString();
		newShop = newShop.substring(0, 2);
		return data.shop === layers.feature.properties.shop
			? $(".grid-content .info-panel .marker-rich-infos")
					.html(` <div class="map-item">
            <a href="${data.url}" class="title" target="_blank">${data.shop} (${newShop})</a><br/>
            <i class="qualification">${data.qualification}</i>
            <p class="adress">${data.adress}</p>
            <a href="${data.url}" target="_blank" class="see-shop"> > Voir fiche info </a>
            </div>
        `)
			: "";
	});

	if (
		layers.feature.geometry.type === "Polygon" ||
		layers.feature.geometry.type === "MultiPolygon" ||
		layers.feature.geometry.type === "Point"
	) {
		dataItems.filter((datas) => {
			return datas.nom === layers.feature.properties.nom;
		});
		output = dataItems.map((el) => {
			return el.nom == layers.feature.properties.nom
				? layers.feature.properties
				: "";
		});
		console.log(output);
	}
	const y = output.filter((data) => {
		return data !== "";
	});

	$(".grid-content .info-panel .context").html(
		`<h4>${layers.feature.properties.nom} (${y.length} Distributeur(s))</h4>`
	);

	nums = dataItems;
	if (
		layers.feature.geometry.type === "Polygon" ||
		layers.feature.geometry.type === "MultiPolygon"
	) {
		countLayer += 1;
		nums.filter((data, index) => {
			if (
				data.nom.includes(layers.feature.properties.nom) &&
				countLayer <= nums.length
			) {
				selectData.push(nums[index]);
			} else {
				countLayer = 1;
				selectData.splice(index);
			}
		});

		console.log(selectData);

		selectData.map((datas) => {
			const { shop, shopCode, adress, url, qualification } = datas;
			const shopCodeShort = shopCode;
			let newShop = shopCodeShort.toString();
			newShop = newShop.substring(0, 2);

			outputsData += `
          <div class="map-item">
          <a href="${url}" class="title" target="_blank">${shop}(${newShop})</a><br/>
          <i class="qualification">${qualification}</i>
          <p class="adress">${adress}</p>
          <a href="${url}" target="_blank" class="see-shop"> >Voir fiche info </a>
          </div>
          `;

			return $(".grid-content .info-panel .marker-rich-infos").html(
				outputsData
			);
		});
	}

	if (y.length === 0) {
		$(".grid-content .info-panel .marker-rich-infos").html("");
	}

	map.removeLayer(kyCounties);
	$("#box").css({
		zIndex: 2000
	});

	// Counties with all departments
	var countiesDepartments = $.ajax({
		url: urlDepartments,
		dataType: "json",
		success: console.log("County Regions data successfully loaded."),
		error: function (xhr) {
			alert(xhr.statusText);
		}
	});

	$.when(countiesDepartments).done(function () {
		var base = {
			Empty: L.tileLayer(""),
			OpenStreetMap: L.tileLayer(
				"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				{
					attribution: "Map data &copy; OpenStreetMap contributors"
				}
			)
		};

		const { nom } = e.target.feature.properties;

		var box = L.map("box", {
			center: [47.91166975698412, 2.48291015625],
			zoom: 7,
			maxZoom: 92,
			scrollWheelZoom: false,
			doubleClickZoom: false,
			tap: false,
			dragging: false,
			touchZoom: false,
			boxZoom: false,
			grab: false,
			keyboard: false,
			layers: [base.Empty]
		});

		function onEachFeature(feature, layer) {
			const coords = [];
			const { shop, shopCode, adress, url, nom, region } = feature.properties;
			var popupContent = `<h3>${shop}</h3>`;

			if (
				feature.geometry.type &&
				feature.properties.region === e.target.feature.properties.nom
			) {
				popupContent += feature.properties.popupContent;
				//  coords.push(feature.geometry.coordinates)
				//   L.Polygon(coords).addTo(box),
				// layer.bindPopup('<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>')
			} else {
				console.log("sorry");
			}
			layer.on({
				click: openLayer,
				zoomToFeature: zoomToFeature
			});

			if (
				feature.geometry.type === "Polygon" ||
				feature.geometry.type === "MultiPolygon" ||
				feature.geometry.type === "Point"
			) {
				layer.on("mouseover", function (e) {
					feature.properties.isActived === 1
						? layer.setStyle({
								fillColor: "#47b8e0"
						  })
						: "";
				});

				layer.on("click", function () {
					box.fitBounds(e.target.getBounds(49));
				});

				layer.on("mouseout", function (e) {
					feature.properties.isActived === 1
						? layer.setStyle({
								fillColor: e.target.feature.properties.fill
						  })
						: "";
				});
			}
			if (feature.geometry.type === "Point") {
				deptsData.push(feature.properties);

				layer.bindPopup(`<h3>${shop}</h3>`, {
					closeButton: false,
					offset: L.point(0, -5)
				});
				layer.on("mouseover", function (e) {
					layer.openPopup();
				});
				layer.on("mouseout", function () {
					layer.closePopup();
				});
			} else {
				feature.properties.isActived === 1
					? layer.setStyle({
							fillColor: e.target.feature.properties.fill
					  })
					: "";
				feature.properties.isActived === 1
					? layer.on("click")
					: layer.off("click");
			}
			//   if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
			//     layer.bindPopup(`<h3>${nom}</h3>`, { closeButton: false, offset: L.point(0, -5) });
			//  }
		}
		var departments = L.geoJSON(countiesDepartments.responseJSON, {
			filter: function (feature, layer) {
				console.log(layer);
				var output = "";
				if (
					feature.geometry.type === "Point" &&
					feature.properties.region === e.target.feature.properties.nom
				) {
					dataItems.push(feature.properties);

					dataItems = dataItems.filter(function (element) {
						return element !== undefined;
					});

					const vals = dataItems.map(function (data) {
						dataItems.sort((a, b) => {
							return a.shopCode - b.shopCode;
						});
						return data;
					});

					console.log(vals.length);

					for (var i = 0; i < vals.length; i++) {
						const { shop, shopCode, adress, url, qualification } = vals[i];

						const shopCodeShort = shopCode;
						let newShop = shopCodeShort.toString();
						newShop = newShop.substring(0, 2);

						output += `
              <div class="map-item">
              <a href="${url}" class="title target="_blank">${shop} (${newShop})</a><br/>
              <i class="qualification">${qualification}</i>
              <p class="adress">${adress}</p>
              <a href="${url}" target="_blank" class="see-shop"> > Voir fiche info </a>
              </div>`;
						$(".grid-content .info-panel .marker-rich-infos").html(output);
					}
				}
				if (
					feature.geometry &&
					feature.properties.region === e.target.feature.properties.nom
				) {
					// If the property "underConstruction" exists and is true, return false (don't render features under construction)
					const num = 0;
					var output = "";
					newData.push(feature.geometry.type);
					// console.log(newData)
					dataItems.push(feature.properties.region);

					newData.filter((datas) => {
						if (
							datas === "Polygon" ||
							datas === "Point" ||
							datas === "MultiPolygon"
						) {
							newData.pop();
							dataItems.pop();
							$(".grid-content .info-panel .context").html(
								`<h4>${feature.properties.region} (${
									feature.geometry.type === "Point"
										? `${dataItems.length} Distributeur(s)`
										: `${dataItems.length} Distributeur`
								})</h4>`
							);
						} else {
							return "";
						}
					});

					return feature.properties.underConstruction !== undefined
						? !feature.properties.underConstruction
						: true;
				} else {
					return null;
				}
			},
			style: style,
			click: zoomToFeature,
			onEachFeature: onEachFeature
		}).addTo(
			box.flyTo(
				nom === "Île-de-France"
					? new L.LatLng(48.6485, 2.5755)
					: "" || nom === "Centre-Val de Loire"
					? L.LatLng(48.0497, 2.1018)
					: "" || nom === "Bourgogne-Franche-Comté"
					? new L.LatLng(47.280513, 4.999437)
					: "" || nom === "Auvergne-Rhône-Alpes"
					? new L.LatLng(45.56342, 4.834277)
					: "" || nom === "Hauts-de-France"
					? new L.LatLng(50.0925, 3.037256)
					: "" || nom === "Grand Est"
					? new L.LatLng(48.9575, 6.365)
					: "" || nom === "Nouvelle-Aquitaine"
					? new L.LatLng(45.8353, 1.2625)
					: "" || nom === "Occitanie"
					? new L.LatLng(43.704, 2.44305)
					: "" || nom === "Provence-Alpes-Côte d'Azur" || nom === "Normandie"
					? new L.LatLng(43.99471817979828, 7.007371525764465)
					: ""
					? new L.LatLng(43.8408, 6.27178)
					: "" || nom === "Pays de la Loire"
					? new L.LatLng(47.7632836, -0.3299687)
					: "" || nom === "Bretagne"
					? new L.LatLng(48.202, -2.9326)
					: "" || nom === "Bretagne"
					? new L.LatLng(48.202, -2.9326)
					: "",
				nom === "Île-de-France" ? 8.5 : 7.5
			)
		);
			map.fitBounds(departments.getBounds());
	});

}
