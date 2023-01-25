import { showUsers } from "./initial-map.js";

const searchDatas = document.querySelector("#search"),
	searchUserVal = document.querySelector(".search-user-val"),
	submitBtn = document.querySelector("#submit"),
	datasShopCode = [];
const urlInitialMap =
	"https://raw.githubusercontent.com/GreatwoodSRG/superretro/master/regions.geojson";

export function filterList() {
	const fetchInitialMap = () => {
		fetch(urlInitialMap)
			.then((res) => {
				res
					.json()
					.then((res) => {
						//My users array = now to my object of all users
						users = res;
						//Sort alphabetically
						// users.sort((a,b) => a.login.localeCompare(b.login));
						//Show all user inside my function showUsers

						const filterPointValues = users.features.filter((datas) => {
							return datas.geometry.type === "Point";
						});

						const Dataproperties = filterPointValues.map((datas) => {
							return datas.properties;
						});

						datasShopCode.push(Dataproperties);

						const allDatas = datasShopCode[0].sort((a, b) => {
							return a.shopCode - b.shopCode;
						});

						showUsers(allDatas);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	// Input filter
	submitBtn.addEventListener("click", (e) => {
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
	document.addEventListener("DOMContentLoaded", fetchInitialMap, showUsers);
}
