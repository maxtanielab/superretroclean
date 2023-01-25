export const showUsers = (arr) => {
	let output = "";

	arr.map((datas) => {
		const { shop, shopCode, adress, url, qualification } = datas;

		const shopCodeShort = shopCode;
		let newShop = shopCodeShort.toString();
		newShop = newShop.substring(0, 2);
		output += `
			                         <div class="map-item">
								<a href="${url}" class="title target="_blank">${shop} (${newShop})</a><br/>
								<i class="qualification">${qualification}</i>
								<p class="adress">${adress}</p>
								<a href="${url}" target="_blank" class="see-shop"> > Voir fiche info </a>
							</div>
			                             `;
	});
	$(".grid-content .info-panel .context").html(
		`<h4 class="title-shop">Distributeurs Greatwood</h4> <div class="shop-values"><b>France</b> <span>(${
			arr.length <= 1
				? `${arr.length} Distributeur"`
				: `${arr.length} Distributeurs"`
		})</span></div>`
	);
	$(".grid-content .info-panel .marker-rich-infos").html(output);
};
