const searchDatas = document.querySelector("#search"),
	searchUserVal = document.querySelector(".search-user-val"),
	submitBtn = document.querySelector("#submit"),
  datasShopCode = [];
  

// Input filter
export let subs = submitBtn.addEventListener("click", () => {
  alert()
	const value = searchDatas.value;
	const element = value.toLowerCase();
	const newUser = datasShopCode[0].filter((datas) => {
		const newShopCode = datas.shopCode.toString();

		!value.includes(newShopCode)
			? null
			: (document.querySelector("#search-val").innerHTML = value) &&
			  value.includes(newShopCode)
			? (document.querySelector("#search-val").innerHTML = value)
			: (searchUserVal.innerHTML = "sorry");
		console.log(datas);
		return (
			datas.shop.toLowerCase().includes(element) ||
			datas.region.toLowerCase().includes(element) ||
			newShopCode.includes(value)
		);
	});

	// const regions = datasShopCode[0].map((el) => {
	// 	return el.region.toLowerCase();
	// });

	// const shopCodes = datasShopCode[0].map((el) => {
	// 	return el.shopCode.toString();
	// });

	// console.log(shopCodes);

	// const matchedRegions = (s) => {
	// 	const p = Array.from(s).reduce(
	// 		(a, v, i) => `${a}[^${s.substr(i)}]*?${v}`,
	// 		""
	// 	);
	// 	const re = RegExp(p);
	// 	return regions.filter((v) => v.match(re));
	// };

	// const matchedShopCodes = (s) => {
	// 	const p = Array.from(s).reduce(
	// 		(a, v, i) => `${a}[^${s.substr(i)}]*?${v}`,
	// 		""
	// 	);
	// 	const re = RegExp(p);
	// 	return shopCodes.filter((v) => v.match(re));
	// };

	// L.geoJSON(counties.responseJSON, {
	// 	filter: function (feature, layer) {
	// 		if (
	// 			feature.geometry.type === "Polygon" ||
	// 			feature.geometry.type === "MultiPolygon" ||
	// 			feature.geometry.type === "Point"
	// 		) {
	// 			map.eachLayer((layer) => {
	// 				if (typeof layer._latlngs !== "undefined") {
	// 					(layer.feature.properties.isActived === 1 &&
	// 						matchedRegions(element).includes(
	// 							layer.feature.properties.nom.toLowerCase()
	// 						)) ||
	// 					matchedRegions(element).includes(
	// 						layer.feature.properties.nom.toUpperCase()
	// 					)
	// 						? layer.setStyle({
	// 								fillColor: "#FF6B6B"
	// 						  })
	// 						: layer.setStyle({
	// 								fillColor: "#ffadad"
	// 						  });

	// 					//   matchedShopCodes(element).includes(
	// 					// 	layer.feature.properties.shopCode
	// 					// )
	// 					// 	? layer.setStyle({
	// 					// 			fillColor: "#FF6B6B"
	// 					// 	  })
	// 					// 	: layer.setStyle({
	// 					// 			fillColor: "#ffadad"
	// 					// 	  });

	// 					!matchedRegions(element).includes(
	// 						layer.feature.properties.nom.toLowerCase()
	// 					)
	// 						? layer.off("click")
	// 						: layer.on("click");

	// 					!matchedRegions(element).includes(
	// 						layer.feature.properties.nom.toLowerCase()
	// 					)
	// 						? layer.feature.properties.isActived === 0
	// 						: layer.feature.properties.isActived === 1;

	// 					!matchedRegions(element).includes(
	// 						layer.feature.properties.nom.toLowerCase()
	// 					)
	// 						? layer.on("mouseover", function (e) {
	// 								layer.closePopup();
	// 						  })
	// 						: layer.on("mouseover", function (e) {
	// 								layer.openPopup();
	// 								// layer.setStyle({
	// 								// 	fillColor: "#FF6B6B"
	// 								// });
	// 						  });

	// 					// matched(element).includes(layer.feature.properties.region)
	// 					// 	? console.log(layer.feature.properties.region)
	// 					// 	: console.log(layer.feature.properties.region);
	// 				}
	// 			});
	// 		}
	// 	}
	// });
	// if (layerActived === true && value == "") {
	// 	// $("#box").css({
	// 	// 	zIndex: 20000000
	// 	// });
	// 	return (window.location.href = "");
	// }

	function showUsersData() {
		value == ""
			? (document.querySelector(".context").innerHTML = null)
			: (document.querySelector(
					".context"
			  ).innerHTML = `Votre recherche <b>"${value}"</b> a retourné ${newUser.length} distributeur(s)`);
		showUsers(newUser);
	}

	layerActived === false ? showUsersData() : null;
});
