// What are we doing in our app?

// create an app object
const artApp = {};

// save information which will be reused (eg API key) within properties on the app object
artApp.apiKey = "3KF48URp";
artApp.apiUrl = "https://www.rijksmuseum.nl/api/en/collection";

// make call to the API, get some data back
// take the data and put it on the page
artApp.getArt = function (userChoice) {
	// format API endpoint
	const url = new URL(artApp.apiUrl);

	// format and add params to url
	url.search = new URLSearchParams({
		key: artApp.apiKey,
		q: userChoice,
		imgonly: true,
	});

	// make API call
	fetch(url)
		.then(function (res) {
			// take returned promise and parse it into json
			return res.json();
		})
		.then(function (jsonRes) {
			// display the art
			artApp.displayArt(jsonRes.artObjects);
		});
};

// create a method which will take the API data and display it on our page
artApp.displayArt = function (artArray) {
	// Empty everything out
	const ulElement = document.getElementById("artwork");
	ulElement.innerHTML = "";

	// iterate through each object and get relevant info, construct an element
	artArray.forEach(function (artwork) {
		// console.log(artwork);

		// extract important data from API, save within variables
		const artworkTitle = artwork.title;
		const artworkImage = artwork.webImage.url;
		const artist = artwork.principalOrFirstMaker;
		const altText = artwork.longTitle;

		// create an li element with a class of piece in which this info will be added
		const listElement = document.createElement("li");
		listElement.classList.add("piece");

		// create an h2 to hold the art title
		const heading = document.createElement("h2");
		heading.textContent = artworkTitle;

		// create an img to hold the artwork picture

		const image = document.createElement("img");

		// element node has src and alt properties which we can use
		image.alt = altText;
		image.src = artworkImage;

		// create a p  with a class of artist to hold artist name
		const paragraphElement = document.createElement("p");
		paragraphElement.classList.add("artist");
		paragraphElement.textContent = artist;

		// take the elements we have created and add them to the li
		listElement.appendChild(heading);
		listElement.appendChild(image);
		listElement.appendChild(paragraphElement);

		// add the li to the ul so that the data is finally in the DOM

		ulElement.appendChild(listElement);

		// console.log(artworkTitle, artworkImage, artist, altText);
	});
};

// Create a method which will update the heading of the page
artApp.updateAnimalHeading = function (value) {
	document.querySelector(
		"#page-title span"
	).textContent = `${value.toUpperCase()}S!`;
};

// create a method that sets up all of the event listeners within this app
artApp.eventListenerSetUp = function () {
	const selectElement = document.querySelector("select");
	// 1st event listener on the select element [whenever the user selects a different option]
	selectElement.addEventListener("change", function (e) {
		// This will give us back the object which owns the currently executing code (AKA when the animal choice changes - get me art related to the new animal)
		artApp.getArt(this.value);
		artApp.updateAnimalHeading(this.value);
	});
};

// Create an init method
artApp.init = function () {
	console.log("App is initialized.");
	// Set up our event listeners so that they are ready to go as the user moves through the app
	artApp.eventListenerSetUp();
	// Make our initial call
	artApp.getArt("bear");
};

// Call the init method and start the app
artApp.init();
