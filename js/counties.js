const urlInitialMap =
	"https://raw.githubusercontent.com/GreatwoodSRG/superretro/master/regions.geojson";

export var counties = $.ajax({
	url: urlInitialMap,
	dataType: "json",
	success: console.log("County data successfully loaded."),
	error: function (xhr) {
		alert(xhr.statusText);
	}
});
