// What are we doing in our app?

// create an app object
const artApp = {};

// save information which will be reused (eg API key) within properties on the app object
artApp.apiKey = "3KF48URp";
artApp.apiUrl = "https://www.rijksmuseum.nl/api/en/collection";

// make call to the API, get some data back
// take the data and put it on the page
artApp.getArt = function () {
	// format API endpoint
	const url = new URL(artApp.apiUrl);

	// format and add params to url
	url.search = new URLSearchParams({
		key: artApp.apiKey,
		q: "monkey",
		imgonly: true,
	});

	// make API call
	fetch(url)
		.then(function (res) {
			// take returned promise and parse it into json
			return res.json();
		})
		.then(function (jsonRes) {
			console.log(jsonRes.artObjects);
		});
};

artApp.displayArt = (jsonRes) => {};

// create an init method
artApp.init = function () {
	console.log("App is initialized");
	artApp.getArt();
};

// Call the init method
artApp.init();
