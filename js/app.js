/* targets */
const breedInput = document.querySelector("#breedInput");
const breedName = document.querySelector("#breedName");
const dogImage = document.querySelector("#dogImage");

const LIVEENV = true;
let currentBreed = {};

document.addEventListener("DOMContentLoaded", () => {
	fetchRandomImage().then((data) => {
		renderRandomImage(data);
	});
	fetchBreedList().then((data) => {
		renderBreedList(data);
	});
});

function fetchRandomImage(breed = null) {
	breedName.textContent = "Hang on";
	dogImage.src = "./images/loading1.gif";
	dogImage.alt = "Loading...";
	breedDetails.textContent = "Lemme fetch your favorite bud...";
	url = breed
		? `https://dog.ceo/api/breed/${breed}/images/random`
		: "https://dog.ceo/api/breeds/image/random";
	return axios.get(url).catch((err) => {
		console.log(err);
	});
}